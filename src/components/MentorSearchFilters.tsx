
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  resetFilters
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("mentors.search_placeholder") || "Search by name, expertise or keywords..."}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
        </div>
        
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <select
            value={selectedSpecialization || ""}
            onChange={(e) => setSelectedSpecialization(e.target.value || null)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">{t("mentors.filter.specialization") || "Specialization"}</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          
          <select
            value={selectedLanguage || ""}
            onChange={(e) => setSelectedLanguage(e.target.value || null)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">{t("mentors.filter.language") || "Language"}</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          
          <Button onClick={handleSearch}>
            <Filter className="mr-2 h-4 w-4" />
            {t("mentors.filter.apply") || "Apply"}
          </Button>
          
          <Button variant="outline" onClick={resetFilters}>
            {t("mentors.filter.reset") || "Reset"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentorSearchFilters;
