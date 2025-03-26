
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, BookOpen, BrainCircuit } from "lucide-react";
import { useMentorAI } from "@/hooks/useMentorAI";

interface AIMentorSuggestionsProps {
  mentorId: string;
  specialization: string[];
}

export const AIMentorSuggestions: React.FC<AIMentorSuggestionsProps> = ({ 
  mentorId, 
  specialization 
}) => {
  const [query, setQuery] = useState("");
  const { generateSuggestions, suggestions, isLoading, error } = useMentorAI();

  const handleAskAI = () => {
    if (query.trim()) {
      generateSuggestions(query, specialization);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">AI-Assisted Support</h2>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Ask about government schemes relevant to this mentor's expertise.
        </p>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Ask a question about relevant schemes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleAskAI} 
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing
              </>
            ) : (
              "Ask AI"
            )}
          </Button>
        </div>
        
        {error && (
          <div className="text-sm text-destructive mb-4">
            {error}
          </div>
        )}
        
        {suggestions && suggestions.length > 0 && (
          <div className="space-y-3 mt-4">
            <h3 className="text-sm font-medium">Relevant Schemes & Resources:</h3>
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="p-3 bg-secondary/30 rounded-md border border-border"
              >
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium">{suggestion.title}</h4>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
