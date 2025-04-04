
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import MentorCard from "./MentorCard";
import MentorSearchFilters from "./MentorSearchFilters";
import NoMentorsFound from "./NoMentorsFound";
import { 
  getAllMentors, 
  getAllSpecializations, 
  getAllLanguages,
  searchMentors
} from "@/services/mentorService";
import { Mentor } from "@/types/mentor";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const MentorDirectory: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>(getAllMentors());
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const isMobile = useIsMobile();

  const specializations = getAllSpecializations();
  const languages = getAllLanguages();

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      const filtered = searchMentors(searchTerm, selectedSpecialization, selectedLanguage);
      setFilteredMentors(filtered);
      setIsSearching(false);
      
      // Show toast with result count
      toast.success(
        filtered.length > 0 
          ? `Found ${filtered.length} mentor${filtered.length === 1 ? '' : 's'}`
          : "No mentors found. Try adjusting filters."
      );
    }, 600); // Add a slight delay for effect
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSpecialization(null);
    setSelectedLanguage(null);
    setFilteredMentors(getAllMentors());
    toast.success("Filters reset", {
      description: "Showing all available mentors"
    });
  };

  const handleBookConsultation = (mentorId: string, mentorName: string) => {
    toast.success(`Consultation request sent to ${mentorName}`, {
      description: "You will receive a confirmation shortly",
    });
  };

  const handleDirectCall = (mentorPhone: string, mentorName: string) => {
    toast.success(`Initiating call to ${mentorName}`, {
      description: "Connecting you directly with the mentor",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/80 z-0"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0 transition-opacity duration-1000 hover:opacity-15" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')" }}
      ></div>
      
      <div className="container mx-auto py-12 px-4 relative z-10">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Expert Mentors & Advisors
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Connect with experienced professionals for personalized guidance on government schemes, benefits, and applications.
          </p>
        </motion.div>
        
        <MentorSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSpecialization={selectedSpecialization}
          setSelectedSpecialization={setSelectedSpecialization}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          specializations={specializations}
          languages={languages}
          handleSearch={handleSearch}
          resetFilters={resetFilters}
          isSearching={isSearching}
        />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isSearching ? (
            // Show loading skeletons during search
            Array.from({ length: 6 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-card/50 animate-pulse rounded-xl h-64"></div>
            ))
          ) : filteredMentors.length > 0 ? (
            filteredMentors.map(mentor => (
              <motion.div
                key={mentor.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <MentorCard
                  mentor={mentor}
                  onBookConsultation={handleBookConsultation}
                  onDirectCall={handleDirectCall}
                />
              </motion.div>
            ))
          ) : (
            <NoMentorsFound resetFilters={resetFilters} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MentorDirectory;
