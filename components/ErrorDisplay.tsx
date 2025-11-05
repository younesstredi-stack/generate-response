import React from 'react';

interface ErrorDisplayProps {
  message: string;
  t: { errorTitle: string };
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, t }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-6 rounded-md" role="alert">
      <p className="font-bold">{t.errorTitle}</p>
      <p>{message}</p>
    </div>
  );
};
