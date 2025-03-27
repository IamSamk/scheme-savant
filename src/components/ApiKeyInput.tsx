
import React, { useEffect } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    GEMINI_API_KEY?: string;
  }
}

// Default Gemini API key
const DEFAULT_API_KEY = "AIzaSyD6dZ2uK1OMCjC4X8g-LMa4q7t-8pD1LqI";

export const ApiKeyInput: React.FC = () => {
  useEffect(() => {
    // Set the default API key immediately
    localStorage.setItem("gemini_api_key", DEFAULT_API_KEY);
    window.GEMINI_API_KEY = DEFAULT_API_KEY;
    
    // Notify the user that the API key has been set
    toast.success("Gemini API key configured", {
      description: "AI features are ready to use"
    });
  }, []);

  return null; // No UI rendered
};
