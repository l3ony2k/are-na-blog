import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeSwitcherProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeSwitcher;