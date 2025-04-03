
import React from "react";
import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NoMentorsFoundProps {
  resetFilters: () => void;
}

const NoMentorsFound: React.FC<NoMentorsFoundProps> = ({ resetFilters }) => {
  const { t } = useLanguage();
  
  return (
    <div className="col-span-3 text-center py-16">
      <div className="mx-auto w-fit p-8 bg-secondary/40 rounded-full mb-6">
        <UserX size={40} className="text-primary/50" />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-primary">
        {t("mentors.no_results.title") || "No mentors found"}
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        {t("mentors.no_results.description") || "Try adjusting your search criteria or explore other categories to find mentors that match your requirements."}
      </p>
      <Button onClick={resetFilters} size="lg" className="animate-pulse-subtle">
        {t("mentors.filter.reset") || "Reset Filters"}
      </Button>
    </div>
  );
};

export default NoMentorsFound;
