import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for theme in localStorage first
    if (typeof window !== 'undefined') {
        const savedTheme = window.localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
        return savedTheme;
        }
        // If no theme in storage, check for system preference
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return userPrefersDark ? 'dark' : 'light';
    }
    // Default theme for server-side rendering or non-browser environments
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Save the current theme to localStorage
    try {
        window.localStorage.setItem('theme', theme);
    } catch (error) {
        console.error("Failed to save theme to localStorage", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
}