
import React from "react";

declare global {
  interface Window {
    GEMINI_API_KEY?: string;
  }
}

// Default Gemini API key
const DEFAULT_API_KEY = "AIzaSyD6dZ2uK1OMCjC4X8g-LMa4q7t-8pD1LqI";

export const ApiKeyInput: React.FC = () => {
  React.useEffect(() => {
    // Set the default API key silently without showing popup
    if (!localStorage.getItem("gemini_api_key")) {
      localStorage.setItem("gemini_api_key", DEFAULT_API_KEY);
      window.GEMINI_API_KEY = DEFAULT_API_KEY;
    }
  }, []);

  return null; // No UI rendered
};
