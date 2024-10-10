import React from 'react';
import { BookOpen } from 'lucide-react';

interface HeaderProps {
  channelTitle: string;
}

const Header: React.FC<HeaderProps> = ({ channelTitle }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen size={24} className="text-gray-900 dark:text-white" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Are.na Blog</h1>
        </div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">{channelTitle}</h2>
      </div>
    </header>
  );
};

export default Header;