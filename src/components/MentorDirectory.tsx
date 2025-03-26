import React, { useState } from "react";
import { Search, Filter, User, Calendar, MessageCircle, Video, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  specialization: string[];
  experience: number;
  languages: string[];
  rating: number;
  availability: string[];
  description: string;
  phone?: string;
}

const mockMentors: Mentor[] = [
  {
    id: "m1",
    name: "Dr. Aisha Sharma",
    avatar: "https://i.pravatar.cc/150?img=29",
    specialization: ["Agriculture", "Rural Development", "Subsidies"],
    experience: 15,
    languages: ["English", "Hindi", "Punjabi"],
    rating: 4.8,
    availability: ["Mon-Wed", "10:00 AM - 4:00 PM"],
    description: "Expert in agricultural subsidies and rural development programs with 15 years of experience helping farmers access government benefits.",
    phone: "+917892345610"
  },
  {
    id: "m2",
    name: "Rajesh Kumar",
    avatar: "https://i.pravatar.cc/150?img=70",
    specialization: ["Education", "Scholarships", "Student Loans"],
    experience: 12,
    languages: ["English", "Hindi", "Telugu"],
    rating: 4.6,
    availability: ["Tue-Thu", "1:00 PM - 7:00 PM"],
    description: "Education finance expert specializing in scholarship applications and government education schemes.",
    phone: "+919876543210"
  },
  {
    id: "m3",
    name: "Dr. Priya Nair",
    avatar: "https://i.pravatar.cc/150?img=5",
    specialization: ["Healthcare", "Medical Insurance", "Welfare Schemes"],
    experience: 18,
    languages: ["English", "Malayalam", "Tamil"],
    rating: 4.9,
    availability: ["Wed-Sat", "9:00 AM - 3:00 PM"],
    description: "Healthcare policy expert with deep knowledge of medical insurance and welfare schemes for disadvantaged groups.",
    phone: "+918756342198"
  },
  {
    id: "m4",
    name: "Amit Patel",
    avatar: "https://i.pravatar.cc/150?img=12",
    specialization: ["Business", "Startup Funding", "MSME Loans"],
    experience: 10,
    languages: ["English", "Gujarati", "Hindi"],
    rating: 4.7,
    availability: ["Mon-Fri", "4:00 PM - 8:00 PM"],
    description: "Business finance advisor specializing in government funding programs for startups and small businesses.",
    phone: "+917654321098"
  },
  {
    id: "m5",
    name: "Lakshmi Reddy",
    avatar: "https://i.pravatar.cc/150?img=23",
    specialization: ["Women Empowerment", "Self Help Groups", "Microfinance"],
    experience: 14,
    languages: ["English", "Telugu", "Kannada"],
    rating: 4.9,
    availability: ["Tue-Sat", "11:00 AM - 5:00 PM"],
    description: "Specialist in women-focused government schemes and self-help group formation and management.",
    phone: "+919123456780"
  }
];

const MentorDirectory: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>(mockMentors);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const specializations = Array.from(new Set(mockMentors.flatMap(mentor => mentor.specialization)));
  const languages = Array.from(new Set(mockMentors.flatMap(mentor => mentor.languages)));

  const handleSearch = () => {
    let filtered = mockMentors;
    
    if (searchTerm) {
      filtered = filtered.filter(mentor => 
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
        mentor.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSpecialization) {
      filtered = filtered.filter(mentor => 
        mentor.specialization.includes(selectedSpecialization)
      );
    }
    
    if (selectedLanguage) {
      filtered = filtered.filter(mentor => 
        mentor.languages.includes(selectedLanguage)
      );
    }
    
    setFilteredMentors(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSpecialization(null);
    setSelectedLanguage(null);
    setFilteredMentors(mockMentors);
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

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
          />
        ))}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">{t("mentors.title") || "Expert Mentors & Advisors"}</h2>
        <p className="text-muted-foreground mt-2">
          {t("mentors.subtitle") || "Connect with experienced professionals for personalized guidance"}
        </p>
      </div>
      
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.length > 0 ? (
          filteredMentors.map(mentor => (
            <Card key={mentor.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-secondary">
                    <img 
                      src={mentor.avatar} 
                      alt={mentor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{mentor.name}</h3>
                    <div className="mt-1">{renderRating(mentor.rating)}</div>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <User size={14} />
                      <span>{mentor.experience} years exp.</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {mentor.specialization.map(spec => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {mentor.description}
                  </p>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Calendar size={12} className="shrink-0" />
                    <span>{mentor.availability.join(" • ")}</span>
                  </div>
                  
                  <div className="mt-2">
                    <h4 className="text-xs font-medium mb-1">{t("mentors.languages") || "Languages"}</h4>
                    <div className="flex flex-wrap gap-1">
                      {mentor.languages.map(lang => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col gap-2">
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => handleBookConsultation(mentor.id, mentor.name)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {t("mentors.book_consultation") || "Book Consultation"}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {t("mentors.chat") || "Chat"}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Video className="mr-2 h-4 w-4" />
                      {t("mentors.video") || "Video"}
                    </Button>
                  </div>
                  
                  <a 
                    href={`tel:${mentor.phone}`}
                    className="w-full"
                    onClick={() => handleDirectCall(mentor.phone || "", mentor.name)}
                  >
                    <Button variant="secondary" className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      {t("mentors.call") || "Call Mentor"}
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          ))
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default MentorDirectory;
