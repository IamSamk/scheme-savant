
import { useState, useEffect } from "react";
import { Message } from "@/types/chatbot";
import { useResponses } from "./useResponses";

export const useChatActions = (
  message: string,
  setMessage: (message: string) => void,
  messages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsThinking: (isThinking: boolean) => void,
  isListening: boolean,
  toggleListening: () => void,
  t: (key: string) => string,
  messagesEndRef: React.RefObject<HTMLDivElement>
) => {
  const { findBestResponse, getAIResponse, getFallbackResponse } = useResponses(t);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message in current language
  useEffect(() => {
    setMessages([{
      id: "1",
      type: "bot",
      text: t("chatbot.welcome"),
      timestamp: new Date()
    }]);
  }, [t, setMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: message,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsThinking(true);

    try {
      // First check if we have a predefined response match
      const matchedResponse = findBestResponse(userMessage.text);
      
      if (matchedResponse) {
        // Use the matched response
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: matchedResponse,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botMessage]);
      } else if (window.GEMINI_API_KEY) {
        const botResponse = await getAIResponse(userMessage.text);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: botResponse,
          timestamp: new Date()
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Fallback to predefined responses with categories
        const fallbackResponse = getFallbackResponse(userMessage.text);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: fallbackResponse,
          timestamp: new Date()
        };

        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Fallback response on error
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: t("chatbot.error") || "I'm having trouble connecting to AI services. Please try again later.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleChat = (isOpen: boolean, setIsOpen: (isOpen: boolean) => void, setIsMinimized: (isMinimized: boolean) => void) => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = (isMinimized: boolean, setIsMinimized: (isMinimized: boolean) => void) => {
    setIsMinimized(!isMinimized);
  };

  const toggleMute = (
    isMuted: boolean, 
    setIsMuted: (isMuted: boolean) => void, 
    isSpeaking: boolean,
    setIsSpeaking: (isSpeaking: boolean) => void,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ) => {
    setIsMuted(!isMuted);
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      
      // Reset all message speaking states
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.isSpeaking ? { ...msg, isSpeaking: false } : msg
        )
      );
    }
  };

  const handleVoiceInput = () => {
    toggleListening();
  };

  const handleFileUpload = () => {
    toast.info(t("chatbot.upload.title"), {
      description: t("chatbot.upload.description")
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return {
    handleSendMessage,
    handleKeyPress,
    handleVoiceInput,
    handleFileUpload,
    toggleChat,
    toggleMinimize,
    toggleMute,
    formatTime
  };
};

// This is required for the toast import
import { toast } from "sonner";
