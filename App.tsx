import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ReviewInput } from './components/ReviewInput';
import { ResponseCard } from './components/ResponseCard';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Examples } from './components/Examples';
import { generateResponses } from './services/geminiService';
import type { GeneratedResponses } from './types';

const translations = {
  fr: {
    headerTitle: "Générateur de Réponses aux Avis",
    appDescription: "Collez l'avis d'un client et notre IA vous proposera trois options de réponse.",
    loadingMessage: "Génération des réponses en cours...",
    reviewInputLabel: "Avis du client",
    reviewInputPlaceholder: "Collez ici l'avis de votre client...",
    generateButton: "Générer les réponses",
    generatingButton: "Génération...",
    copyButton: "Copier",
    copiedButton: "Copié!",
    copyTitle: "Copier le texte",
    responseCardTitles: {
      directe: "Réponse Directe",
      comprehensive: "Réponse Compréhensive",
      rassurante: "Réponse Rassurante",
    },
    errorTitle: "Erreur",
    errorEmptyReview: "Veuillez entrer un avis avant de générer une réponse.",
    errorGeneric: "Une erreur est survenue lors de la génération des réponses. Veuillez réessayer.",
    footerText: "Créé pour les commerces du Québec.",
    showExamples: "Voir des exemples",
    hideExamples: "Masquer les exemples",
    examplesTitle: "Exemples d'utilisation",
  },
  en: {
    headerTitle: "Review Response Generator",
    appDescription: "Paste a customer review and our AI will suggest three response options.",
    loadingMessage: "Generating responses...",
    reviewInputLabel: "Customer Review",
    reviewInputPlaceholder: "Paste your customer's review here...",
    generateButton: "Generate Responses",
    generatingButton: "Generating...",
    copyButton: "Copy",
    copiedButton: "Copied!",
    copyTitle: "Copy text",
    responseCardTitles: {
      directe: "Direct Response",
      comprehensive: "Comprehensive Response",
      rassurante: "Reassuring Response",
    },
    errorTitle: "Error",
    errorEmptyReview: "Please enter a review before generating a response.",
    errorGeneric: "An error occurred while generating responses. Please try again.",
    footerText: "Created for Quebec businesses.",
    showExamples: "Show Examples",
    hideExamples: "Hide Examples",
    examplesTitle: "Usage Examples",
  }
};

type Language = 'fr' | 'en';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [review, setReview] = useState<string>('');
  const [responses, setResponses] = useState<GeneratedResponses | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];

  const handleGenerate = useCallback(async () => {
    if (!review.trim()) {
      setError(t.errorEmptyReview);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponses(null);

    try {
      const result = await generateResponses(review, language);
      setResponses(result);
    } catch (err) {
      console.error(err);
      setError(t.errorGeneric);
    } finally {
      setIsLoading(false);
    }
  }, [review, language, t]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Header language={language} setLanguage={setLanguage} t={t} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-lg text-gray-600 mb-8">
            {t.appDescription}
          </p>

          <ReviewInput
            review={review}
            setReview={setReview}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            t={t}
          />

          <Examples t={t} language={language} />

          {error && <ErrorDisplay message={error} t={t} />}
          
          {isLoading && (
            <div className="flex justify-center items-center mt-10">
              <LoadingSpinner />
              <p className="ml-4 text-brand-secondary">{t.loadingMessage}</p>
            </div>
          )}

          {responses && (
            <div className="mt-12 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              <ResponseCard title={t.responseCardTitles.directe} text={responses.directe} t={t} />
              <ResponseCard title={t.responseCardTitles.comprehensive} text={responses.comprehensive} t={t} />
              <ResponseCard title={t.responseCardTitles.rassurante} text={responses.rassurante} t={t} />
            </div>
          )}
        </div>
      </main>
      <Footer t={t} />
    </div>
  );
};

export default App;