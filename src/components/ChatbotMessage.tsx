
import React from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { Message } from "@/types/chatbot";

interface ChatbotMessageProps {
  message: Message;
  speakText: (text: string, messageId: string) => void;
  stopSpeaking: (messageId: string) => void;
  formatTime: (date: Date) => string;
  speakLabel: string;
  stopSpeakingLabel: string;
}

const ChatbotMessage: React.FC<ChatbotMessageProps> = ({
  message,
  speakText,
  stopSpeaking,
  formatTime,
  speakLabel,
  stopSpeakingLabel
}) => {
  return (
    <div
      className={`mb-3 flex ${
        message.type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] rounded-lg p-3 ${
          message.type === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        <div className="flex justify-between items-start mb-1">
          <p className="text-sm break-words">{message.text}</p>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 ml-2 mt-[-4px] shrink-0"
            onClick={() => message.isSpeaking ? stopSpeaking(message.id) : speakText(message.text, message.id)}
            title={message.isSpeaking ? stopSpeakingLabel : speakLabel}
          >
            {message.isSpeaking ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </Button>
        </div>
        <p className="text-[10px] mt-1 opacity-70 text-right">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatbotMessage;
