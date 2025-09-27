import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import { testBackendConnection } from './services/apiService.js';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest();

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);
      
      if (result.success) {
        console.log('✅ [APP] Backend connection successful. Checking user session...');
        try {
          const user = await manifest.from('User').me();
          if (user) {
            setCurrentUser(user);
            setCurrentScreen('dashboard');
            console.log('✅ [APP] User session found:', user.email);
          }
        } catch (error) {
          console.log('ℹ️ [APP] No active user session.');
          setCurrentUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', result.error);
      }
    };
    
    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const user = await manifest.from('User').me();
      setCurrentUser(user);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      await manifest.from('User').signup({ name, email, password });
      await handleLogin(email, password);
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. The email might already be in use.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setCurrentUser(null);
    setCurrentScreen('landing');
  };

  const loadRecipes = async () => {
    if (!backendConnected) return;
    try {
      const response = await manifest.from('Recipe').find({
        include: ['author'],
        filter: { status: 'published' },
        sort: { createdAt: 'desc' }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    }
  };

  const createRecipe = async (recipeData) => {
    try {
      const newRecipe = await manifest.from('Recipe').create(recipeData);
      // To display it immediately, we might need to re-fetch or add it manually
      // For simplicity, we just reload all recipes
      await loadRecipes();
      return newRecipe;
    } catch (error) {
      console.error('Failed to create recipe:', error);
      throw error;
    }
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-xs font-medium text-gray-600">{backendConnected ? 'Backend Connected' : 'Disconnected'}</span>
      </div>
      
      {currentScreen === 'landing' ? (
        <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
      ) : (
        <DashboardPage 
          user={currentUser} 
          recipes={recipes} 
          onLogout={handleLogout} 
          onLoadRecipes={loadRecipes}
          onCreateRecipe={createRecipe}
        />
      )}
    </>
  );
}

export default App;
