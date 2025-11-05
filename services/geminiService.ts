import { GoogleGenAI, Type } from '@google/genai';
import type { GeneratedResponses } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateResponses = async (reviewText: string, language: 'fr' | 'en'): Promise<GeneratedResponses> => {
  const isFrench = language === 'fr';

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      directe: {
        type: Type.STRING,
        description: isFrench ? "La réponse la plus courte possible. Un simple remerciement chaleureux." : "The shortest possible response. A simple, warm thank you."
      },
      comprehensive: {
        type: Type.STRING,
        description: isFrench ? "Une réponse qui montre une compréhension de l'essentiel du message sans le reformuler." : "A response that shows understanding of the core message without rephrasing it."
      },
      rassurante: {
        type: Type.STRING,
        description: isFrench ? "Si négatif, une réponse qui rassure et propose une solution. Si positif, une invitation à revenir." : "If negative, a response that reassures and offers a solution. If positive, an invitation to return."
      },
    },
    required: ['directe', 'comprehensive', 'rassurante'],
  };

  const prompt = isFrench 
    ? `
        Tu es un assistant expert en communication pour les petits commerces du Québec. Ton ton est professionnel, chaleureux et surtout, authentique.

        **Règles Clés :**
        - Pour les avis **positifs**, sois **extrêmement concis**. L'objectif est un remerciement sincère, pas une longue phrase. Souvent, "Merci beaucoup, au plaisir de vous revoir !" est suffisant. Évite à tout prix de reformuler ce que le client a aimé.
        - Pour les avis **négatifs**, sois empathique, présente des excuses sincères et propose une solution ou un moyen de te contacter. Ici, la réponse peut être plus détaillée si nécessaire.
        - Chaque réponse doit rester sous la barre des 40 mots.

        Avis client : "${reviewText}"
        
        Génère les trois types de réponses suivants en français :
        1.  **Directe** : La plus courte et simple possible. Un remerciement.
        2.  **Compréhensive** : Montre que tu as compris l'essentiel (bon ou mauvais) sans répéter.
        3.  **Rassurante** : Si négatif, excuse-toi et propose un suivi. Si positif, renforce simplement l'expérience (ex: "Nous sommes ravis que ça vous ait plu !").
      `
    : `
        You are an expert communication assistant for small businesses. Your tone is professional, warm, and above all, authentic.

        **Key Rules:**
        - For **positive** reviews, be **extremely concise**. The goal is a sincere thank you, not a long sentence. Often, "Thanks so much, we hope to see you again!" is enough. Absolutely avoid rephrasing what the customer liked.
        - For **negative** reviews, be empathetic, offer a sincere apology, and provide a solution or a way to get in touch. Here, the response can be more detailed if necessary.
        - Each response must remain under 40 words.

        Customer review: "${reviewText}"
        
        Generate the following three types of responses in English:
        1.  **Direct**: The shortest and simplest possible. A thank you.
        2.  **Comprehensive**: Show you understood the gist (good or bad) without repeating.
        3.  **Reassuring**: If negative, apologize and offer a follow-up. If positive, simply reinforce the experience (e.g., "We're so glad you enjoyed it!").
      `;
  
  const model = 'gemini-2.5-flash';
  const contents = [{ parts: [{ text: prompt }] }];

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    return parsedResponse as GeneratedResponses;

  } catch (error) {
    console.error("Erreur de l'API Gemini:", error);
    throw new Error("La génération de la réponse a échoué.");
  }
};