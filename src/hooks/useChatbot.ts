
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Message, predefinedResponses } from "@/types/chatbot";
import { calculateSimilarity, categorizeQuery, getQueryIntent } from "@/utils/nlpHelper";

export const useChatbot = () => {
  const { language, t } = useLanguage();
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

  // Initialize with welcome message in current language
  useEffect(() => {
    setMessages([{
      id: "1",
      type: "bot",
      text: t("chatbot.welcome"),
      timestamp: new Date()
    }]);
  }, [language, t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
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
  }, [language, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error(t("chatbot.stt.unsupported"));
      return;
    }

    if (isListening) {
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

  // Improved function to find the best matching predefined response
  const findBestResponse = (query: string): string | null => {
    let highestSimilarity = 0;
    let bestResponse = null;
    
    // Try to match against predefined patterns
    for (const item of predefinedResponses) {
      for (const pattern of item.patterns) {
        const similarity = calculateSimilarity(query, pattern);
        if (similarity > 0.3 && similarity > highestSimilarity) { // Threshold for matching
          highestSimilarity = similarity;
          bestResponse = item.response;
        }
      }
    }
    
    return bestResponse;
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
        // Get query intent and categories for better prompting
        const queryIntent = getQueryIntent(userMessage.text);
        const categories = categorizeQuery(userMessage.text);
        
        // Use Gemini API with enhanced prompting
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${window.GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `You are an AI assistant for a government scheme discovery app. Provide concise and helpful responses about government schemes and benefits.
                    
                    User query: "${userMessage.text}"
                    
                    Detected intent: ${queryIntent}
                    Relevant categories: ${categories.join(', ')}
                    
                    Based on this analysis, provide a helpful response about relevant government schemes. 
                    Keep your response conversational and under 120 words.
                    Mention 1-3 specific schemes by name if relevant.
                    If appropriate, suggest taking the eligibility test or connecting with a mentor.`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 300,
            }
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get AI response");
        }

        const data = await response.json();
        const botResponse = data.candidates[0].content.parts[0].text;
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: botResponse,
          timestamp: new Date()
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Fallback to predefined responses with categories
        const categories = categorizeQuery(userMessage.text);
        let fallbackResponse = t("chatbot.responses.4"); // Default fallback
        
        // Select response based on detected categories
        if (categories.length > 0) {
          if (categories[0] === "agriculture") {
            fallbackResponse = t("chatbot.responses.1");
          } else if (categories[0] === "business") {
            fallbackResponse = t("chatbot.responses.2");
          } else if (categories[0] === "education") {
            fallbackResponse = t("chatbot.responses.3");
          }
        }
        
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
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleMute = () => {
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
