import React, { useState, useEffect } from 'react';

interface LoginViewProps {
  onLogin: (username: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [existingUsers, setExistingUsers] = useState<string[]>([]);

  useEffect(() => {
    try {
      const users = Object.keys(window.localStorage)
        .filter(key => key.endsWith('_app-settings'))
        .map(key => key.replace('_app-settings', ''));
      setExistingUsers(users);
    } catch (error) {
        console.error("Could not access localStorage to find existing users.", error);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="max-w-sm w-full bg-white dark:bg-slate-800 p-8 rounded-lg shadow-2xl">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">SmartBudget</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 mb-8">Log in to manage your finances.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
            />
          </div>
          <button 
            type="submit" 
            disabled={!username.trim()}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-semibold transition-colors disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            Log In / Create Profile
          </button>
        </form>

        {existingUsers.length > 0 && (
          <>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">Or use an existing profile</span>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {existingUsers.map(user => (
                <button
                  key={user}
                  onClick={() => onLogin(user)}
                  className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 font-medium transition-colors"
                >
                  {user}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginView;
