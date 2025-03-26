
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
};

const defaultLanguage = "en";

// Map of language codes to speech synthesis voices
const languageVoiceMap: Record<string, string> = {
  "en": "en-US",
  "hi": "hi-IN",
  "ta": "ta-IN",
  "te": "te-IN"
};

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
  speakText: () => {},
  stopSpeaking: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>(() => {
    // Get from localStorage if available
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || defaultLanguage;
  });
  
  const [translations, setTranslations] = useState<Record<string, string>>({});

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationData = await import(`../translations/${language}.json`);
        setTranslations(translationData.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}`, error);
        // Fallback to English if translation file not found
        if (language !== defaultLanguage) {
          const englishTranslations = await import(`../translations/en.json`);
          setTranslations(englishTranslations.default);
        }
      }
    };

    loadTranslations();
    localStorage.setItem("language", language);
    
    // Set HTML lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  // Speech synthesis function
  const speakText = (text: string): void => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language based on current app language
      utterance.lang = languageVoiceMap[language] || 'en-US';
      
      // Try to find a voice that matches the language
      const voices = window.speechSynthesis.getVoices();
      const langVoices = voices.filter(voice => voice.lang.startsWith(languageVoiceMap[language]));
      
      if (langVoices.length > 0) {
        utterance.voice = langVoices[0];
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Stop speech synthesis
  const stopSpeaking = (): void => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, speakText, stopSpeaking }}>
      {children}
    </LanguageContext.Provider>
  );
};
