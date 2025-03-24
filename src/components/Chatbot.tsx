
import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, X, Maximize2, Minimize2, FileUp, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hello! I'm your AI assistant for government schemes. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      const botResponses = [
        "Based on your profile, you might be eligible for the PM Kisan Scheme which provides income support to farmers.",
        "There's a new Digital India Internship scheme that matches your interests. Would you like to know more about the eligibility criteria?",
        "I found 3 education scholarship programs for which you might qualify. Would you like me to check your eligibility for these?",
        "The Startup India Seed Fund scheme is currently accepting applications. This might be relevant for your business idea."
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
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    toast.info("Voice recognition activated", {
      description: "Speak clearly into your microphone"
    });
    
    // Simulate voice recognition
    setTimeout(() => {
      setMessage("What schemes are available for renewable energy?");
      toast.success("Voice recognized");
    }, 2000);
  };

  const handleFileUpload = () => {
    toast.info("Document upload feature", {
      description: "This feature will allow document uploading for AI analysis"
    });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
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
            <h3 className="font-medium text-sm">AI Assistant</h3>
            {!isMinimized && (
              <p className="text-xs text-muted-foreground">Ask about any government scheme</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
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
                  placeholder="Type your question..."
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
                  >
                    <FileUp size={14} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:text-primary"
                    onClick={handleVoiceInput}
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
    </div>
  );
};

export default Chatbot;
