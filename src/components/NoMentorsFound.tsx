
import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NoMentorsFoundProps {
  resetFilters: () => void;
}

const NoMentorsFound: React.FC<NoMentorsFoundProps> = ({ resetFilters }) => {
  const { t } = useLanguage();
  
  return (
    <div className="col-span-3 text-center py-12">
      <div className="mx-auto w-fit p-6 bg-secondary/40 rounded-full mb-4">
        <User size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">
        {t("mentors.no_results.title") || "No mentors found"}
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-4">
        {t("mentors.no_results.description") || "Try adjusting your search criteria or explore other categories"}
      </p>
      <Button onClick={resetFilters}>
        {t("mentors.filter.reset") || "Reset Filters"}
      </Button>
    </div>
  );
};

export default NoMentorsFound;
