import React from 'react';
import { ArenaBlock } from '../types';
import { format } from 'date-fns';
import { X, ExternalLink } from 'lucide-react';
import { decodeHtml } from '../utils/htmlDecoder';

interface ModalProps {
  block: ArenaBlock;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ block, onClose }) => {
  const hasExternalLink = block.source && block.source.url;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-black w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg border border-gray-200 dark:border-gray-800"  // Added border here
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            {block.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {format(new Date(block.created_at), 'MMMM d, yyyy')}
          </p>
          {block.image && (
            <img
              src={block.image.display.url}
              alt={block.title}
              className="w-full mb-4"  // Removed rounded-lg
            />
          )}
          <div 
            className="prose dark:prose-invert max-w-none text-black dark:text-white" 
            dangerouslySetInnerHTML={{ __html: decodeHtml(block.content_html) }}
          />
          {hasExternalLink && (
            <div className="mt-4">
              <a
                href={block.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
              >
                <ExternalLink size={16} className="mr-1" />
                View source
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
