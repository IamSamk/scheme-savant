
import { useState, useEffect, useRef } from "react";
import { Search, Mic, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useMentorAI } from "@/hooks/useMentorAI";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { generateSuggestions } = useMentorAI();
  const suggestionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use AI to generate suggestions with debounce
  useEffect(() => {
    // Clear any existing timeout
    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current);
    }
    
    const fetchSuggestions = async () => {
      if (query.trim().length > 2) {
        setIsLoading(true);
        try {
          if (!window.GEMINI_API_KEY) {
            setSuggestions(mockSuggestions.filter(item => 
              item.toLowerCase().includes(query.toLowerCase())
            ));
            return;
          }
          
          // This is just to get suggestions for the search bar
          // We'll use a minimal prompt for fast response
          const result = await generateSuggestions(
            `Generate search suggestions for: ${query}`, 
            ["General"]
          );
          
          if (result && result.length > 0) {
            setSuggestions(result.map(item => item.title));
          } else {
            setSuggestions(mockSuggestions.filter(item => 
              item.toLowerCase().includes(query.toLowerCase())
            ));
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions(mockSuggestions.filter(item => 
            item.toLowerCase().includes(query.toLowerCase())
          ));
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };
    
    // Only start a new timeout if the query is not empty
    if (query.trim().length > 2) {
      suggestionTimeoutRef.current = setTimeout(fetchSuggestions, 300);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
    
    // Cleanup when component unmounts
    return () => {
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current);
      }
    };
  }, [query, generateSuggestions]);

  // Mock suggestions as fallback
  const mockSuggestions = [
    "farmer subsidies",
    "education scholarship for girls",
    "startup funding program",
    "senior citizen pension scheme",
    "solar panel subsidy",
    "rural development scheme",
    "digital india program",
    "skill development initiative",
    "women empowerment program",
    "healthcare benefits for elderly"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    
    toast.success(`Searching for "${query}"`, {
      description: "Connecting to AI for personalized results...",
    });
    
    // Navigate to results page with the query
    navigate(`/scheme-results?query=${encodeURIComponent(query)}`);
    
    // Clear suggestions after search
    setSuggestions([]);
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    // Optional: automatically search when a suggestion is selected
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  const startListening = () => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window)) {
      toast.error("Voice search is not supported in your browser");
      return;
    }

    setIsListening(true);
    toast.info("Listening...", {
      description: "Speak clearly into your microphone",
    });

    try {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        toast.success("Voice recognized", {
          description: `We heard: ${transcript}`,
        });
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        toast.error("Couldn't understand, please try again");
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } catch (error) {
      console.error("Speech recognition error:", error);
      setIsListening(false);
      toast.error("Voice recognition failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-3xl relative">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-muted-foreground">
          <Search size={20} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Describe what you're looking for in simple words..."
          className="w-full py-3 pl-10 pr-24 rounded-full border border-input bg-background shadow-sm focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        
        <div className="absolute right-3 flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`rounded-full ${isListening ? 'text-primary animate-pulse' : ''}`}
            onClick={startListening}
          >
            <Mic size={18} />
          </Button>
          
          <Button
            type="button"
            size="sm"
            className="rounded-full px-3"
            onClick={handleSearch}
          >
            <span className="mr-1 hidden sm:inline">Search</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
      
      {/* Suggestions dropdown with loading state */}
      {suggestions.length > 0 && (
        <div className="absolute mt-1 w-full bg-background/95 backdrop-blur-sm rounded-lg py-2 shadow-lg z-10 animate-fade-in border border-border">
          <ul>
            {isLoading ? (
              <li className="px-4 py-2 text-center">
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Loading suggestions...</span>
                </div>
              </li>
            ) : (
              suggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  className="px-4 py-2 hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  <div className="flex items-center">
                    <Search size={14} className="mr-2 text-muted-foreground" />
                    {suggestion}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
