
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Suggestion {
  title: string;
  description: string;
  link?: string;
}

export const useMentorAI = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  
  const generateSuggestions = async (query: string, specializations: string[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!window.GEMINI_API_KEY) {
        throw new Error("API key not set. Please enter your Gemini API key in settings.");
      }
      
      // Format the specializations into a comma-separated string
      const specializationText = specializations.join(", ");
      
      // Create a prompt for the AI
      const prompt = `Given a user query about government schemes related to ${specializationText}, 
      provide helpful information. The user asked: "${query}".
      Return a JSON array with exactly 3 relevant government schemes or resources. Each scheme should 
      have a title and description field. Format as valid JSON without explanation or context.`;
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${window.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are an expert assistant specialized in government schemes and benefits. 
                  Provide concise, accurate information about relevant programs based on user queries.
                  
                  ${prompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1000,
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI suggestions. Please try again later.");
      }

      const data = await response.json();
      const content = data.candidates[0].content.parts[0].text;
      
      // Parse the JSON from the response
      let parsedData;
      try {
        // Extract JSON if it's wrapped in a code block
        const jsonMatch = content.match(/```json\n([\s\S]*)\n```/) || 
                         content.match(/```\n([\s\S]*)\n```/) || 
                         [null, content];
        
        const jsonContent = jsonMatch[1] || content;
        parsedData = JSON.parse(jsonContent);
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        throw new Error("Failed to parse AI response. Please try again.");
      }
      
      setSuggestions(parsedData);
    } catch (err) {
      console.error("Error generating AI suggestions:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    generateSuggestions,
    suggestions,
    isLoading,
    error
  };
};
