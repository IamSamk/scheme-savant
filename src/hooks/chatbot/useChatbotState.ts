
import { useState, useRef } from "react";
import { Message } from "@/types/chatbot";

export const useChatbotState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);

  return {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    message,
    setMessage,
    messages,
    setMessages,
    isThinking,
    setIsThinking,
    isSpeaking,
    setIsSpeaking,
    isMuted,
    setIsMuted,
    isListening,
    setIsListening,
    messagesEndRef,
    audioRef,
    recognitionRef
  };
};
