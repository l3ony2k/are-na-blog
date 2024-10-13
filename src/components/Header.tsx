import React from 'react';
import { BookOpen, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  channelTitle: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ channelTitle, isDarkMode, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-2">
          <BookOpen size={24} className="text-black dark:text-white" />
          <h1 className="text-xl font-semibold text-black dark:text-white">
            Leon's Journal
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium text-black dark:text-white">
            {channelTitle}
          </h2>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;