import React, { useState } from 'react';

interface ExamplesProps {
    t: {
        showExamples: string;
        hideExamples: string;
        examplesTitle: string;
        responseCardTitles: {
            directe: string;
            comprehensive: string;
            rassurante: string;
        }
    };
    language: 'fr' | 'en';
}

const frExamples = [
    {
        review: "Le service était impeccable et le café délicieux ! Ambiance super chaleureuse, je reviendrai c'est certain.",
        responses: {
            directe: "Merci beaucoup ! Au plaisir de vous revoir.",
            comprehensive: "Nous sommes ravis que vous ayez apprécié le service et l'ambiance. Merci pour votre visite !",
            rassurante: "Un grand merci pour vos bons mots ! C'est toujours un plaisir de savoir nos clients satisfaits."
        }
    },
    {
        review: "J'ai attendu 20 minutes pour un simple espresso et le personnel semblait complètement perdu. Très déçu.",
        responses: {
            directe: "Nous sommes sincèrement désolés pour cette expérience. Merci de nous l'avoir signalé.",
            comprehensive: "Nous vous présentons nos excuses pour l'attente inacceptable. Votre commentaire est important pour nous.",
            rassurante: "Bonjour, nous sommes navrés d'apprendre votre mauvaise expérience. Ce n'est pas notre standard de service. N'hésitez pas à nous contacter pour que nous puissions rectifier la situation."
        }
    }
];

const enExamples = [
    {
        review: "The service was impeccable and the coffee was delicious! Super warm atmosphere, I will definitely be back.",
        responses: {
            directe: "Thank you very much! We look forward to seeing you again.",
            comprehensive: "We're delighted you enjoyed the service and atmosphere. Thanks for visiting!",
            rassurante: "A big thank you for your kind words! It's always a pleasure to know our customers are satisfied."
        }
    },
    {
        review: "I waited 20 minutes for a simple espresso and the staff seemed completely lost. Very disappointed.",
        responses: {
            directe: "We are sincerely sorry for this experience. Thank you for bringing it to our attention.",
            comprehensive: "We apologize for the unacceptable wait. Your feedback is important in helping us improve.",
            rassurante: "Hello, we are sorry to hear about your poor experience. This is not our standard of service. Please feel free to contact us so we can make things right."
        }
    }
];

export const Examples: React.FC<ExamplesProps> = ({ t, language }) => {
    const [isOpen, setIsOpen] = useState(false);
    const examples = language === 'fr' ? frExamples : enExamples;

    return (
        <div className="mt-8">
            <div className="text-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-brand-secondary hover:text-brand-primary font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center mx-auto"
                    aria-expanded={isOpen}
                >
                    {isOpen ? t.hideExamples : t.showExamples}
                    <svg
                        className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="mt-6 bg-white/50 p-6 rounded-lg shadow-inner">
                    <h2 className="text-2xl font-bold text-center text-brand-primary mb-6">{t.examplesTitle}</h2>
                    <div className="space-y-8">
                        {examples.map((example, index) => (
                            <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                <h4 className="font-semibold text-gray-600 mb-2">Avis Client :</h4>
                                <blockquote className="p-3 bg-gray-100 rounded-md italic text-gray-800 border-l-4 border-brand-accent">
                                    "{example.review}"
                                </blockquote>
                                <div className="mt-4 grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                                    <div className="bg-white p-4 rounded-md shadow-sm">
                                        <h5 className="font-bold text-brand-secondary">{t.responseCardTitles.directe}</h5>
                                        <p className="text-sm text-gray-700 mt-1">{example.responses.directe}</p>
                                    </div>
                                     <div className="bg-white p-4 rounded-md shadow-sm">
                                        <h5 className="font-bold text-brand-secondary">{t.responseCardTitles.comprehensive}</h5>
                                        <p className="text-sm text-gray-700 mt-1">{example.responses.comprehensive}</p>
                                    </div>
                                     <div className="bg-white p-4 rounded-md shadow-sm">
                                        <h5 className="font-bold text-brand-secondary">{t.responseCardTitles.rassurante}</h5>
                                        <p className="text-sm text-gray-700 mt-1">{example.responses.rassurante}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
