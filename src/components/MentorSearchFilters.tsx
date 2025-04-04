
import React, { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, X, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";

interface MentorSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedSpecialization: string | null;
  setSelectedSpecialization: (value: string | null) => void;
  selectedLanguage: string | null;
  setSelectedLanguage: (value: string | null) => void;
  specializations: string[];
  languages: string[];
  handleSearch: () => void;
  resetFilters: () => void;
  isSearching?: boolean;
}

const MentorSearchFilters: React.FC<MentorSearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedSpecialization,
  setSelectedSpecialization,
  selectedLanguage,
  setSelectedLanguage,
  specializations,
  languages,
  handleSearch,
  resetFilters,
  isSearching = false
}) => {
  const { t } = useLanguage();
  
  // Handle Enter key press in search input
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <motion.div 
      className="bg-card/80 backdrop-blur-sm border border-primary/10 rounded-xl p-5 mb-8 shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search by name, expertise or keywords..."
            className="pl-10 bg-white/70 border-primary/20 focus-visible:ring-primary/30 transition-all duration-300 hover:bg-white/90"
          />
          <Search className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 h-6 w-6 transition-transform hover:rotate-90"
              onClick={() => setSearchTerm("")}
            >
              <X size={14} />
            </Button>
          )}
        </div>
        
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <Select
            value={selectedSpecialization || "all_specializations"}
            onValueChange={(value) => setSelectedSpecialization(value === "all_specializations" ? null : value)}
          >
            <SelectTrigger className="min-w-[150px] bg-white/70 border-primary/20 hover:bg-white/90 transition-colors duration-300">
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_specializations">All Specializations</SelectItem>
              {specializations.map(spec => (
                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={selectedLanguage || "all_languages"}
            onValueChange={(value) => setSelectedLanguage(value === "all_languages" ? null : value)}
          >
            <SelectTrigger className="min-w-[150px] bg-white/70 border-primary/20 hover:bg-white/90 transition-colors duration-300">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_languages">All Languages</SelectItem>
              {languages.map(lang => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={handleSearch} 
            className="flex-shrink-0 transition-transform hover:translate-y-[-2px]"
            disabled={isSearching}
          >
            {isSearching ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Filter className="mr-2 h-4 w-4" />
            )}
            Apply Filters
          </Button>
          
          <Button 
            variant="outline" 
            onClick={resetFilters} 
            className="flex-shrink-0 transition-all duration-300 hover:bg-primary/10"
            disabled={isSearching}
          >
            Reset
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MentorSearchFilters;
