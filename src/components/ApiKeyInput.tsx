
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    GEMINI_API_KEY?: string;
  }
}

export const ApiKeyInput: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    // Check if API key is already set
    const storedKey = localStorage.getItem("gemini_api_key");
    if (storedKey) {
      window.GEMINI_API_KEY = storedKey;
      setHasKey(true);
    } else {
      // Open dialog if no API key is found
      setIsOpen(true);
    }
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("gemini_api_key", apiKey.trim());
      window.GEMINI_API_KEY = apiKey.trim();
      setHasKey(true);
      setIsOpen(false);
    }
  };

  const handleResetKey = () => {
    localStorage.removeItem("gemini_api_key");
    window.GEMINI_API_KEY = undefined;
    setApiKey("");
    setHasKey(false);
    setIsOpen(true);
  };

  return (
    <>
      {hasKey && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setIsOpen(true)}
          >
            <Key size={14} />
            AI Settings
          </Button>
        </div>
      )}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gemini API Key Required</DialogTitle>
            <DialogDescription>
              Enter your Gemini API key to enable AI-powered mentor suggestions
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This is a demo app. In a production environment, API keys should be handled securely on the server.
              </AlertDescription>
            </Alert>
            
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza..."
              type="password"
            />
            
            <p className="mt-2 text-xs text-muted-foreground">
              You can get your API key from{" "}
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>
          
          <DialogFooter>
            {hasKey && (
              <Button 
                variant="outline" 
                onClick={handleResetKey}
              >
                Reset Key
              </Button>
            )}
            <Button 
              onClick={handleSaveKey}
              disabled={!apiKey.trim()}
            >
              Save API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
