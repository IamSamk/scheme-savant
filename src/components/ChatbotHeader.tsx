
import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, X, Maximize2, Minimize2, Volume2, VolumeX } from "lucide-react";

interface ChatbotHeaderProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
  toggleChat: () => void;
  toggleMute: () => void;
  isMuted: boolean;
  title: string;
  subtitle: string;
  muteTooltip: string;
  unmuteTooltip: string;
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({
  isMinimized,
  toggleMinimize,
  toggleChat,
  toggleMute,
  isMuted,
  title,
  subtitle,
  muteTooltip,
  unmuteTooltip
}) => {
  return (
    <div className="bg-primary/10 p-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Bot size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          {!isMinimized && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
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
            title={isMuted ? unmuteTooltip : muteTooltip}
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
  );
};

export default ChatbotHeader;
