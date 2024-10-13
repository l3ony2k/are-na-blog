import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import BlogCard from './components/BlogCard';
import Modal from './components/Modal';
import { ArenaChannel, ArenaBlock } from './types';
import { Loader2 } from 'lucide-react';
import Masonry from 'react-masonry-css';

const CHANNEL_SLUG = 'journaling-and-healing';

function App() {
  const [channel, setChannel] = useState<ArenaChannel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<ArenaBlock | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axios.get(`https://api.are.na/v2/channels/${CHANNEL_SLUG}?per=100`);
        const sortedContents = response.data.contents.sort((a: ArenaBlock, b: ArenaBlock) => 
          b.position - a.position
        );
        setChannel({ ...response.data, contents: sortedContents });
      } catch (err) {
        setError('Failed to fetch channel data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();

    // Listen for changes in system color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const openModal = (block: ArenaBlock) => {
    setSelectedBlock(block);
  };

  const closeModal = () => {
    setSelectedBlock(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-black dark:text-white" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Header channelTitle={channel?.title || 'Journaling and Healing'} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="container mx-auto py-8 px-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-white dark:bg-black"
        >
          {channel?.contents.map((block: ArenaBlock) => (
            <BlogCard key={block.id} block={block} onClick={() => openModal(block)} />
          ))}
        </Masonry>
      </main>
      {selectedBlock && (
        <Modal block={selectedBlock} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;