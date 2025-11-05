import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './icons/ActionIcons';


interface ResponseCardProps {
  title: string;
  text: string;
  t: {
    copiedButton: string;
    copyButton: string;
    copyTitle: string;
  };
}

export const ResponseCard: React.FC<ResponseCardProps> = ({ title, text, t }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  }, [text]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-1">
      <h3 className="text-xl font-bold text-brand-primary mb-3">{title}</h3>
      <div className="relative group flex-grow">
        <p className="text-gray-700 pr-10">{text}</p>
        <button
          onClick={handleCopy}
          title={isCopied ? t.copiedButton : t.copyTitle}
          aria-label={isCopied ? t.copiedButton : t.copyTitle}
          className={`absolute top-0 right-0 flex items-center justify-center h-8 w-8 rounded-full transition-all duration-200 ease-in-out
            ${isCopied
              ? 'bg-green-100 text-green-700 opacity-100'
              : 'bg-brand-light text-brand-secondary opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 hover:bg-brand-accent hover:text-white focus:opacity-100 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2'
            }`}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    </div>
  );
};
