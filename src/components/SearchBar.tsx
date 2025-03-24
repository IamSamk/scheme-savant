
import { useState } from "react";
import { Search, Mic, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Mock suggestions - would be replaced with API calls
  const mockSuggestions = [
    "farmer subsidies",
    "education scholarship for girls",
    "startup funding program",
    "senior citizen pension scheme",
    "solar panel subsidy",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Mock suggestion logic
    if (value.length > 2) {
      const filtered = mockSuggestions.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    
    // This would be replaced with actual search functionality
    toast.success(`Searching for "${query}"`, {
      description: "Connecting to AI for personalized results...",
    });
    
    // Clear suggestions after search
    setSuggestions([]);
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

    // Mock voice recognition
    setTimeout(() => {
      setIsListening(false);
      setQuery("agriculture subsidy for organic farming");
      toast.success("Voice recognized", {
        description: "We heard: agriculture subsidy for organic farming",
      });
    }, 2000);
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
      
      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute mt-1 w-full glass-morphism rounded-lg py-2 shadow-lg z-10 animate-fade-in">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                className="px-4 py-2 hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => {
                  setQuery(suggestion);
                  setSuggestions([]);
                }}
              >
                <div className="flex items-center">
                  <Search size={14} className="mr-2 text-muted-foreground" />
                  {suggestion}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
