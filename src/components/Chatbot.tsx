
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
}

// Language to voice mapping for TTS
const languageVoices = {
  en: "Roger", // English
  hi: "Aria",  // Hindi (using a neutral voice)
  ta: "Sarah", // Tamil (using a neutral voice)
  te: "Callum" // Telugu (using a neutral voice)
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Text-to-Speech function using mock implementation
  const speakText = async (text: string) => {
    if (isMuted) return;
    
    setIsSpeaking(true);
    
    try {
      // In a real implementation, this would be an API call to a TTS service like ElevenLabs
      // For now, we'll simulate TTS with the browser's built-in Speech Synthesis API
      if ('speechSynthesis' in window) {
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
          setIsSpeaking(false);
        };
        
        speechSynthesis.speak(utterance);
      } else {
        toast.error(t("chatbot.tts.unsupported"));
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error("TTS error:", error);
      toast.error(t("chatbot.tts.error"));
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = () => {
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

    // Simulate AI response after a delay
    setTimeout(() => {
      // Translated responses based on current language
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
      setIsThinking(false);
      
      // Speak the response if not muted
      if (!isMuted) {
        speakText(randomResponse);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Speech-to-Text implementation
  const handleVoiceInput = () => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window)) {
      toast.error(t("chatbot.stt.unsupported"));
      return;
    }

    toast.info(t("chatbot.stt.listening"), {
      description: t("chatbot.stt.speak_clearly")
    });
    
    // Using the Web Speech API for speech recognition
    // Note: In a production app, you might want to use a more robust solution
    try {
      //@ts-ignore - webkitSpeechRecognition is not in the TypeScript types
      const recognition = new webkitSpeechRecognition();
      recognition.lang = language; // Set language based on app's current language
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        toast.success(t("chatbot.stt.recognized"));
      };
      
      recognition.onerror = () => {
        toast.error(t("chatbot.stt.error"));
      };
      
      recognition.start();
    } catch (error) {
      console.error("STT error:", error);
      toast.error(t("chatbot.stt.error"));
    }
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
    if (isSpeaking && !isMuted) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
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
                  <p className="text-sm">{msg.text}</p>
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
            {isSpeaking && (
              <div className="flex justify-center mb-3">
                <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs animate-pulse">
                  {t("chatbot.speaking")}
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
                    className="h-6 w-6 hover:text-primary"
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
