
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, BookOpen, BrainCircuit } from "lucide-react";
import { useMentorAI } from "@/hooks/useMentorAI";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AIMentorSuggestionsProps {
  mentorId: string;
  specialization: string[];
}

interface FormValues {
  query: string;
}

export const AIMentorSuggestions: React.FC<AIMentorSuggestionsProps> = ({ 
  mentorId, 
  specialization 
}) => {
  const { generateSuggestions, suggestions, isLoading, error } = useMentorAI();
  const [aiEnabled, setAiEnabled] = useState(!!window.GEMINI_API_KEY);
  const form = useForm<FormValues>({
    defaultValues: {
      query: ""
    }
  });

  const handleAskAI = async (data: FormValues) => {
    if (!window.GEMINI_API_KEY) {
      toast.error("AI features require a Gemini API key", {
        description: "Please add your API key in settings to use this feature",
        action: {
          label: "Settings",
          onClick: () => document.querySelector('[aria-label="AI Settings"]')?.dispatchEvent(
            new MouseEvent('click', { bubbles: true })
          )
        }
      });
      return;
    }
    
    if (data.query.trim()) {
      await generateSuggestions(data.query, specialization);
    }
  };

  React.useEffect(() => {
    // Check if API key changes while component is mounted
    const checkApiKey = () => setAiEnabled(!!window.GEMINI_API_KEY);
    window.addEventListener('storage', checkApiKey);
    
    return () => window.removeEventListener('storage', checkApiKey);
  }, []);

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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAskAI)} className="space-y-4">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ask a question about relevant schemes..."
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={isLoading || !form.watch("query").trim()}
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
          </form>
        </Form>
        
        {error && (
          <div className="text-sm text-destructive mt-4 p-3 bg-destructive/10 rounded-md">
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
                    {suggestion.link && (
                      <a 
                        href={suggestion.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-1 inline-block"
                      >
                        Learn more →
                      </a>
                    )}
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
