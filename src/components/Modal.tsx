import React from 'react';
import { ArenaBlock } from '../types';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ModalProps {
  block: ArenaBlock;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ block, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{block.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
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
              className="w-full mb-4"
            />
          )}
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-4">{children}</p>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic mb-4">{children}</blockquote>,
                a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{children}</a>,
              }}
            >
              {block.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;