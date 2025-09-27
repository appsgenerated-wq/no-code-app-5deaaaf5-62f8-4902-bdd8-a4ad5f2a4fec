import React, { useState } from 'react';
import config from '../constants';
import { UserIcon, LockClosedIcon, AtSymbolIcon } from '@heroicons/react/24/solid';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password);
    }
  };

  const handleDemoLogin = () => {
    onLogin('demo@example.com', 'password');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-5xl font-extrabold text-gray-900">FlavorFusion</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your daily dose of culinary inspiration.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {isLoginView ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            {!isLoginView && (
              <div className="relative">
                <UserIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3" />
                <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="pl-10 w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your Name"/>
              </div>
            )}
            <div className="relative">
              <AtSymbolIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3" />
              <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Email address"/>
            </div>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3" />
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Password"/>
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150">
                {isLoginView ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
              {isLoginView ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
         <div className="flex justify-center space-x-4 mt-4">
          <button onClick={handleDemoLogin} className="bg-gray-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition duration-150">Try Demo</button>
          <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition duration-150">Admin Panel</a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
