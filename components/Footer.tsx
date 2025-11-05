import React from 'react';

interface FooterProps {
    t: { footerText: string };
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-white mt-auto py-4 border-t">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} - {t.footerText}</p>
      </div>
    </footer>
  );
};
