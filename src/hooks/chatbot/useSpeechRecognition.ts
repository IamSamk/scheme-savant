
import { useEffect } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export const useSpeechRecognition = (
  recognitionRef: React.MutableRefObject<any>,
  setMessage: (message: string) => void,
  setIsListening: (isListening: boolean) => void,
  language: string
) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = 
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = language;

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map((result: SpeechRecognitionResult) => result[0].transcript)
            .join("");
          setMessage(transcript);
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
          toast.error(t("chatbot.stt.error"));
        };

        recognitionRef.current.onend = () => setIsListening(false);
      }
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [language, t, recognitionRef, setMessage, setIsListening]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error(t("chatbot.stt.unsupported"));
      return;
    }

    if (recognitionRef.current.listening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast.info(t("chatbot.stt.listening"), {
        description: t("chatbot.stt.speak_clearly")
      });
    }
  };

  return { toggleListening };
};
