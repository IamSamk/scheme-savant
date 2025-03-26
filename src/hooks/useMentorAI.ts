
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
      if (!window.PERPLEXITY_API_KEY) {
        throw new Error("API key not set. Please enter your Perplexity API key in settings.");
      }
      
      // Format the specializations into a comma-separated string
      const specializationText = specializations.join(", ");
      
      // Create a prompt for the AI
      const prompt = `Given a user query about government schemes related to ${specializationText}, 
      provide helpful information. The user asked: "${query}".
      Return a JSON array with exactly 3 relevant government schemes or resources. Each scheme should 
      have a title and description field. Format as valid JSON without explanation or context.`;
      
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${window.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are an expert assistant specialized in government schemes and benefits. Provide concise, accurate information about relevant programs based on user queries.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI suggestions. Please try again later.");
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
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
