
import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, X, Maximize2, Minimize2, FileUp, Bot, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isSpeaking?: boolean;
}

// Language to voice mapping for TTS
const languageVoices = {
  en: "Roger", // English
  hi: "Aria",  // Hindi
  ta: "Sarah", // Tamil
  te: "Callum" // Telugu
};

const Chatbot = () => {
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
      if (window.GEMINI_API_KEY) {
        // Use Gemini API for chatbot responses
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
                    text: `You are an AI assistant for a government scheme discovery app. Provide concise and helpful responses. 
                    The user message is: "${message}".
                    Keep your response conversational and under 100 words.
                    If the query is about government schemes, mention 1-2 relevant schemes.`
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
        // Fallback to predefined responses
        const botResponses = [
          t("chatbot.responses.1"),
          t("chatbot.responses.2"),
          t("chatbot.responses.3"),
          t("chatbot.responses.4"),
        ];

        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: randomResponse,
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

  // Speech-to-Text implementation
  const handleVoiceInput = () => {
    toggleListening();
  };

  const handleFileUpload = () => {
    toast.info(t("chatbot.upload.title"), {
      description: t("chatbot.upload.description")
    });
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 rounded-full shadow-lg w-14 h-14 p-0 animate-scale-in"
      >
        <Bot size={24} />
      </Button>
    );
  }

  return (
    <div
      className={`fixed bottom-5 right-5 glass-morphism rounded-2xl shadow-lg overflow-hidden z-50 transition-all duration-300 animate-scale-in ${
        isMinimized ? "w-72 h-16" : "w-80 sm:w-96 h-[500px] max-h-[80vh]"
      }`}
    >
      {/* Header */}
      <div className="bg-primary/10 p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-sm">{t("chatbot.title")}</h3>
            {!isMinimized && (
              <p className="text-xs text-muted-foreground">{t("chatbot.subtitle")}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {!isMinimized && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={toggleMute}
              title={isMuted ? t("chatbot.unmute") : t("chatbot.mute")}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={toggleMinimize}
          >
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:text-destructive"
            onClick={toggleChat}
          >
            <X size={14} />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="p-3 h-[calc(100%-108px)] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    msg.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm break-words">{msg.text}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-2 mt-[-4px] shrink-0"
                      onClick={() => msg.isSpeaking ? stopSpeaking(msg.id) : speakText(msg.text, msg.id)}
                      title={msg.isSpeaking ? t("chatbot.stop_speaking") : t("chatbot.speak_message")}
                    >
                      {msg.isSpeaking ? <VolumeX size={12} /> : <Volume2 size={12} />}
                    </Button>
                  </div>
                  <p className="text-[10px] mt-1 opacity-70 text-right">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start mb-3">
                <div className="bg-secondary text-secondary-foreground max-w-[85%] rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-primary/60 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={t("chatbot.input.placeholder")}
                  className="w-full p-2 pr-10 rounded-md border border-input bg-background text-sm min-h-[40px] max-h-[100px] focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
                  rows={1}
                />
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:text-primary"
                    onClick={handleFileUpload}
                    title={t("chatbot.upload.title")}
                  >
                    <FileUp size={14} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={`h-6 w-6 hover:text-primary ${isListening ? 'text-destructive animate-pulse' : ''}`}
                    onClick={handleVoiceInput}
                    title={t("chatbot.stt.title")}
                  >
                    <Mic size={14} />
                  </Button>
                </div>
              </div>
              <Button
                type="button"
                size="icon"
                className="h-10 w-10 rounded-md shrink-0"
                onClick={handleSendMessage}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </>
      )}
      
      {/* Hidden audio element for TTS */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default Chatbot;
