import React from 'react';
import { ArenaBlock } from '../types';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import { decodeHtml } from '../utils/htmlDecoder';

interface BlogCardProps {
  block: ArenaBlock;
  onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ block, onClick }) => {
  const hasExternalLink = block.source && block.source.url;

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-300 cursor-pointer mb-4 relative" onClick={onClick}>
      {block.image && (
        <img
          src={block.image.display.url}
          alt={block.title}
          className="w-full object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">{block.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {format(new Date(block.created_at), 'MMMM d, yyyy')}
        </p>
        <div 
          className="text-gray-700 dark:text-gray-300 line-clamp-3 prose dark:prose-invert max-w-none" 
          dangerouslySetInnerHTML={{ __html: decodeHtml(block.content_html) }}
        />
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