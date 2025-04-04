
import { useChatbotState } from "./useChatbotState";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useSpeechSynthesis } from "./useSpeechSynthesis";
import { useChatActions } from "./useChatActions";
import { useLanguage } from "@/contexts/LanguageContext";

export const useChatbot = () => {
  const { language, t } = useLanguage();
  const {
    isOpen, setIsOpen,
    isMinimized, setIsMinimized,
    message, setMessage,
    messages, setMessages,
    isThinking, setIsThinking,
    isSpeaking, setIsSpeaking,
    isMuted, setIsMuted,
    isListening, setIsListening,
    messagesEndRef,
    audioRef,
    recognitionRef
  } = useChatbotState();

  const { toggleListening } = useSpeechRecognition(
    recognitionRef, 
    setMessage, 
    setIsListening, 
    language
  );

  const { speakText, stopSpeaking } = useSpeechSynthesis(
    isMuted,
    setIsSpeaking,
    setMessages,
    t,
    language
  );

  const {
    handleSendMessage,
    handleKeyPress,
    handleVoiceInput,
    handleFileUpload,
    toggleChat: _toggleChat,
    toggleMinimize: _toggleMinimize,
    toggleMute: _toggleMute,
    formatTime
  } = useChatActions(
    message,
    setMessage,
    messages,
    setMessages,
    setIsThinking,
    isListening,
    toggleListening,
    t,
    messagesEndRef
  );

  // Wrap the functions that need current state
  const toggleChat = () => _toggleChat(isOpen, setIsOpen, isMinimized, setIsMinimized);
  const toggleMinimize = () => _toggleMinimize(isMinimized, setIsMinimized);
  const toggleMute = () => _toggleMute(isMuted, setIsMuted, isSpeaking, setIsSpeaking, setMessages);

  return {
    message,
    setMessage,
    messages,
    isOpen,
    isMinimized,
    isThinking,
    isSpeaking,
    isMuted,
    isListening,
    messagesEndRef,
    audioRef,
    handleSendMessage,
    handleKeyPress,
    handleVoiceInput,
    handleFileUpload,
    toggleChat,
    toggleMinimize,
    toggleMute,
    speakText,
    stopSpeaking,
    formatTime
  };
};
