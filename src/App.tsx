import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import BlogCard from './components/BlogCard';
import Modal from './components/Modal';
import ThemeSwitcher from './components/ThemeSwitcher';
import { ArenaChannel, ArenaBlock } from './types';
import { Loader2 } from 'lucide-react';
import Masonry from 'react-masonry-css';

const CHANNEL_SLUG = 'journaling-and-healing';

function App() {
  const [channel, setChannel] = useState<ArenaChannel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<ArenaBlock | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axios.get(`https://api.are.na/v2/channels/${CHANNEL_SLUG}?per=100`);
        const sortedContents = response.data.contents.sort((a: ArenaBlock, b: ArenaBlock) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setChannel({ ...response.data, contents: sortedContents });
      } catch (err) {
        setError('Failed to fetch channel data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
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

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-900 dark:text-white" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header channelTitle={channel?.title || 'Journaling and Healing'} />
      <ThemeSwitcher isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
      <main className="container mx-auto py-8 px-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-white dark:bg-gray-900"
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