
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
import { toast } from "sonner";

declare global {
  interface Window {
    GEMINI_API_KEY?: string;
  }
}

// Default Gemini API key
const DEFAULT_API_KEY = "AIzaSyD6dZ2uK1OMCjC4X8g-LMa4q7t-8pD1LqI";

export const ApiKeyInput: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [hasKey, setHasKey] = useState(true); // Set to true by default since we have a key

  useEffect(() => {
    // Set the default API key immediately
    localStorage.setItem("gemini_api_key", DEFAULT_API_KEY);
    window.GEMINI_API_KEY = DEFAULT_API_KEY;
    setHasKey(true);
    
    // Notify the user that the API key has been set
    toast.success("Gemini API key configured", {
      description: "AI features are ready to use"
    });
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("gemini_api_key", apiKey.trim());
      window.GEMINI_API_KEY = apiKey.trim();
      setHasKey(true);
      setIsOpen(false);
      
      toast.success("API key updated", {
        description: "Your new API key has been saved"
      });
    }
  };

  const handleResetKey = () => {
    // Reset to the default key instead of clearing
    localStorage.setItem("gemini_api_key", DEFAULT_API_KEY);
    window.GEMINI_API_KEY = DEFAULT_API_KEY;
    setApiKey(DEFAULT_API_KEY);
    setHasKey(true);
    setIsOpen(false);
    
    toast.success("API key reset to default", {
      description: "Using the system default API key"
    });
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
            <DialogTitle>Gemini API Key</DialogTitle>
            <DialogDescription>
              AI features are already configured with a default API key
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                A default API key is provided, but you can use your own if preferred.
              </AlertDescription>
            </Alert>
            
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza..."
              type="password"
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleResetKey}
            >
              Reset to Default
            </Button>
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
