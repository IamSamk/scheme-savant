
import React from "react";
import { Button } from "@/components/ui/button";
import { Send, Mic, FileUp } from "lucide-react";

interface ChatbotInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleVoiceInput: () => void;
  handleFileUpload: () => void;
  isListening: boolean;
  placeholder: string;
  uploadTooltip: string;
  voiceTooltip: string;
}

const ChatbotInput: React.FC<ChatbotInputProps> = ({
  message,
  setMessage,
  handleSendMessage,
  handleKeyPress,
  handleVoiceInput,
  handleFileUpload,
  isListening,
  placeholder,
  uploadTooltip,
  voiceTooltip
}) => {
  return (
    <div className="p-3 border-t border-border">
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
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
              title={uploadTooltip}
            >
              <FileUp size={14} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`h-6 w-6 hover:text-primary ${isListening ? 'text-destructive animate-pulse' : ''}`}
              onClick={handleVoiceInput}
              title={voiceTooltip}
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
  );
};

export default ChatbotInput;
