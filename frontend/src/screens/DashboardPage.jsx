import React, { useEffect, useState } from 'react';
import config from '../constants';
import { ClockIcon, UserGroupIcon, PlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, recipes, onLogout, onLoadRecipes, onCreateRecipe }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ title: '', description: '', prepTime: 0, ingredients: '', instructions: '', status: 'published' });

  useEffect(() => {
    onLoadRecipes();
  }, []);

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    try {
      await onCreateRecipe(newRecipe);
      setNewRecipe({ title: '', description: '', prepTime: 0, ingredients: '', instructions: '', status: 'published' });
      setShowCreateForm(false);
    } catch (err) {
      alert('Failed to create recipe.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FlavorFusion</h1>
            <p className="text-sm text-gray-500">Welcome back, {user?.name}!</p>
          </div>
          <div className="flex items-center space-x-4">
             <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-block text-sm font-medium text-gray-700 hover:text-indigo-600">Admin Panel</a>
            <button onClick={() => setShowCreateForm(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              New Recipe
            </button>
            <button onClick={onLogout} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showCreateForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10 flex justify-center items-start pt-10">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-semibold mb-4">Create a New Recipe</h2>
              <form onSubmit={handleCreateRecipe} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                <input type="text" placeholder="Recipe Title" value={newRecipe.title} onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})} required className="w-full p-2 border rounded-md" />
                <textarea placeholder="Short Description" value={newRecipe.description} onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})} className="w-full p-2 border rounded-md" />
                <input type="number" placeholder="Prep time (minutes)" value={newRecipe.prepTime} onChange={(e) => setNewRecipe({...newRecipe, prepTime: parseInt(e.target.value) || 0})} className="w-full p-2 border rounded-md" />
                <textarea placeholder="Ingredients (one per line)" value={newRecipe.ingredients} onChange={(e) => setNewRecipe({...newRecipe, ingredients: e.target.value})} rows={5} className="w-full p-2 border rounded-md" />
                <textarea placeholder="Instructions" value={newRecipe.instructions} onChange={(e) => setNewRecipe({...newRecipe, instructions: e.target.value})} rows={8} className="w-full p-2 border rounded-md" />
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowCreateForm(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Recipes</h2>
        {recipes.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="text-gray-500">No recipes found. Be the first to create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                 {recipe.photo ? (
                  <img src={recipe.photo.thumbnail.url} alt={recipe.title} className="w-full h-48 object-cover" />
                 ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                 )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                    <span className="flex items-center"><ClockIcon className="h-4 w-4 mr-1" /> {recipe.prepTime} mins</span>
                    <span className="font-medium text-gray-700">by {recipe.author?.name || 'Unknown'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
