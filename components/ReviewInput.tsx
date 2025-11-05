import React from 'react';

interface ReviewInputProps {
  review: string;
  setReview: (review: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  t: {
    reviewInputLabel: string;
    reviewInputPlaceholder: string;
    generatingButton: string;
    generateButton: string;
  };
}

export const ReviewInput: React.FC<ReviewInputProps> = ({ 
  review, 
  setReview, 
  onGenerate, 
  isLoading,
  t
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <label htmlFor="review-input" className="block text-lg font-semibold mb-2 text-gray-700">
        {t.reviewInputLabel}
      </label>
      <textarea
        id="review-input"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder={t.reviewInputPlaceholder}
        className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition duration-200 resize-y"
        disabled={isLoading}
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={onGenerate}
          disabled={isLoading || !review.trim()}
          className="flex items-center justify-center px-8 py-3 bg-brand-secondary text-white font-bold rounded-md hover:bg-brand-primary transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.generatingButton}
            </>
          ) : (
            t.generateButton
          )}
        </button>
      </div>
    </div>
  );
};
