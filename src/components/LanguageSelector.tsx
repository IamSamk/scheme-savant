
import React from "react";
import { Globe, Volume2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const languages = [
  { code: "en", name: "English", voice: "en-US" },
  { code: "hi", name: "हिंदी", voice: "hi-IN" },
  { code: "ta", name: "தமிழ்", voice: "ta-IN" },
  { code: "te", name: "తెలుగు", voice: "te-IN" },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value);

    // Test speech synthesis with the new language
    if ('speechSynthesis' in window) {
      const selectedLang = languages.find(lang => lang.code === value);
      if (selectedLang) {
        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        const utterance = new SpeechSynthesisUtterance("Language changed");
        utterance.lang = selectedLang.voice;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Find the currently selected language
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[130px] h-8 text-xs border-none focus:ring-1">
                <div className="flex items-center">
                  <Globe className="mr-2 h-3.5 w-3.5" />
                  <SelectValue placeholder="Language" />
                </div>
              </SelectTrigger>
              <SelectContent align="end">
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center justify-between w-full">
                      <span>{lang.name}</span>
                      {lang.code === language && (
                        <Volume2 className="h-3 w-3 ml-2 text-primary" />
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TooltipTrigger>
          <TooltipContent>
            <p>Current language: {currentLanguage.name}</p>
            <p className="text-xs text-muted-foreground">Voice: {currentLanguage.voice}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default LanguageSelector;
