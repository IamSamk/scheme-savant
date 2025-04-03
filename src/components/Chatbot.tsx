
import React from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChatbot } from "@/hooks/useChatbot";
import ChatbotHeader from "./ChatbotHeader";
import ChatbotInput from "./ChatbotInput";
import ChatbotMessage from "./ChatbotMessage";

const Chatbot = () => {
  const { t } = useLanguage();
  const {
    message,
    setMessage,
    messages,
    isOpen,
    isMinimized,
    isThinking,
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
  } = useChatbot();

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 rounded-full shadow-lg w-14 h-14 p-0 animate-scale-in z-50 hover:scale-110 transition-transform"
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
      <ChatbotHeader 
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        toggleChat={toggleChat}
        toggleMute={toggleMute}
        isMuted={isMuted}
        title={t("chatbot.title")}
        subtitle={t("chatbot.subtitle")}
        muteTooltip={t("chatbot.mute")}
        unmuteTooltip={t("chatbot.unmute")}
      />

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="p-3 h-[calc(100%-108px)] overflow-y-auto">
            {messages.map((msg) => (
              <ChatbotMessage
                key={msg.id}
                message={msg}
                speakText={speakText}
                stopSpeaking={stopSpeaking}
                formatTime={formatTime}
                speakLabel={t("chatbot.speak_message")}
                stopSpeakingLabel={t("chatbot.stop_speaking")}
              />
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
          <ChatbotInput
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            handleVoiceInput={handleVoiceInput}
            handleFileUpload={handleFileUpload}
            isListening={isListening}
            placeholder={t("chatbot.input.placeholder")}
            uploadTooltip={t("chatbot.upload.title")}
            voiceTooltip={t("chatbot.stt.title")}
          />
        </>
      )}
      
      {/* Hidden audio element for TTS */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default Chatbot;
