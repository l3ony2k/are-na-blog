import React from 'react';
import { ArenaBlock } from '../types';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { ExternalLink } from 'lucide-react';

interface BlogCardProps {
  block: ArenaBlock;
  onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ block, onClick }) => {
  const hasExternalLink = block.content.includes('http://') || block.content.includes('https://');

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300 cursor-pointer mb-4 relative" onClick={onClick}>
      {block.image && (
        <img
          src={block.image.display.url}
          alt={block.title}
          className="w-full object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{block.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {format(new Date(block.created_at), 'MMMM d, yyyy')}
        </p>
        <div className="text-gray-700 dark:text-gray-300 line-clamp-3 prose dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2">{children}</p>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic">{children}</blockquote>,
            }}
          >
            {block.content}
          </ReactMarkdown>
        </div>
      </div>
      {hasExternalLink && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
          <ExternalLink size={16} />
        </div>
      )}
    </div>
  );
};

export default BlogCard;