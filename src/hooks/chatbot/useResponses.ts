
import { predefinedResponses } from "@/types/chatbot";
import { calculateSimilarity, categorizeQuery, getQueryIntent } from "@/utils/nlpHelper";
import { Message } from "@/types/chatbot";
import { toast } from "sonner";

export const useResponses = (t: (key: string) => string) => {
  // Improved function to find the best matching predefined response
  const findBestResponse = (query: string): string | null => {
    let highestSimilarity = 0;
    let bestResponse = null;
    
    // Try to match against predefined patterns
    for (const item of predefinedResponses) {
      for (const pattern of item.patterns) {
        const similarity = calculateSimilarity(query, pattern);
        if (similarity > 0.3 && similarity > highestSimilarity) { // Threshold for matching
          highestSimilarity = similarity;
          bestResponse = item.response;
        }
      }
    }
    
    return bestResponse;
  };

  const getAIResponse = async (userMessageText: string): Promise<string> => {
    // Get query intent and categories for better prompting
    const queryIntent = getQueryIntent(userMessageText);
    const categories = categorizeQuery(userMessageText);
    
    try {
      // Use Gemini API with enhanced prompting
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
                  text: `You are an AI assistant for a government scheme discovery app. Provide concise and helpful responses about government schemes and benefits.
                  
                  User query: "${userMessageText}"
                  
                  Detected intent: ${queryIntent}
                  Relevant categories: ${categories.join(', ')}
                  
                  Based on this analysis, provide a helpful response about relevant government schemes. 
                  Keep your response conversational and under 120 words.
                  Mention 1-3 specific schemes by name if relevant.
                  If appropriate, suggest taking the eligibility test or connecting with a mentor.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error getting AI response:", error);
      throw error;
    }
  };

  const getFallbackResponse = (userMessageText: string): string => {
    const categories = categorizeQuery(userMessageText);
    let fallbackResponse = t("chatbot.responses.4"); // Default fallback
    
    // Select response based on detected categories
    if (categories.length > 0) {
      if (categories[0] === "agriculture") {
        fallbackResponse = t("chatbot.responses.1");
      } else if (categories[0] === "business") {
        fallbackResponse = t("chatbot.responses.2");
      } else if (categories[0] === "education") {
        fallbackResponse = t("chatbot.responses.3");
      }
    }
    
    return fallbackResponse;
  };

  return {
    findBestResponse,
    getAIResponse,
    getFallbackResponse
  };
};
