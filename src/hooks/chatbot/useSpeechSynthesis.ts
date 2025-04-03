
import { toast } from "sonner";
import { Message } from "@/types/chatbot";

export const useSpeechSynthesis = (
  isMuted: boolean,
  setIsSpeaking: (isSpeaking: boolean) => void,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  t: (key: string) => string,
  language: string
) => {
  // Text-to-Speech function using the Web Speech API
  const speakText = async (text: string, messageId?: string) => {
    if (isMuted) return;
    
    // If a message ID is provided, update only that message's speaking state
    if (messageId) {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === messageId 
            ? { ...msg, isSpeaking: true } 
            : msg
        )
      );
    } else {
      setIsSpeaking(true);
    }
    
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set language based on current app language
        utterance.lang = language;
        
        // Find a voice that matches the language if possible
        const voices = window.speechSynthesis.getVoices();
        const languageVoice = voices.find(voice => voice.lang.startsWith(language));
        if (languageVoice) {
          utterance.voice = languageVoice;
        }
        
        utterance.onend = () => {
          if (messageId) {
            setMessages(prevMessages => 
              prevMessages.map(msg => 
                msg.id === messageId 
                  ? { ...msg, isSpeaking: false } 
                  : msg
              )
            );
          } else {
            setIsSpeaking(false);
          }
        };
        
        speechSynthesis.speak(utterance);
      } else {
        toast.error(t("chatbot.tts.unsupported"));
        setIsSpeaking(false);
        
        if (messageId) {
          setMessages(prevMessages => 
            prevMessages.map(msg => 
              msg.id === messageId 
                ? { ...msg, isSpeaking: false } 
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("TTS error:", error);
      toast.error(t("chatbot.tts.error"));
      setIsSpeaking(false);
      
      if (messageId) {
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === messageId 
              ? { ...msg, isSpeaking: false } 
              : msg
          )
        );
      }
    }
  };

  const stopSpeaking = (messageId?: string) => {
    window.speechSynthesis.cancel();
    
    if (messageId) {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === messageId 
            ? { ...msg, isSpeaking: false } 
            : msg
        )
      );
    } else {
      setIsSpeaking(false);
    }
  };

  return { speakText, stopSpeaking };
};
