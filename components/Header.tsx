import React from 'react';

// Pour personnaliser le logo, remplacez le contenu de ce composant SVG
// ou importez votre propre fichier image.
const Logo: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2 7L12 12M12 22V12M22 7L12 12M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface HeaderProps {
    language: 'fr' | 'en';
    setLanguage: (lang: 'fr' | 'en') => void;
    t: { headerTitle: string };
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {
    const buttonClasses = (lang: 'fr' | 'en') => 
    `px-3 py-1 text-sm font-medium rounded-md transition-colors ${
      language === lang 
        ? 'bg-white text-brand-primary' 
        : 'text-white hover:bg-brand-secondary'
    }`;

  return (
    <header className="bg-brand-primary shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
            <Logo />
            <h1 className="ml-4 text-xl md:text-2xl font-bold text-white tracking-wide">
                {t.headerTitle}
            </h1>
        </div>
        <div className="flex items-center space-x-1 bg-brand-accent p-1 rounded-lg">
          <button onClick={() => setLanguage('fr')} className={buttonClasses('fr')}>
            FR
          </button>
          <button onClick={() => setLanguage('en')} className={buttonClasses('en')}>
            EN
          </button>
        </div>
      </div>
    </header>
  );
};
