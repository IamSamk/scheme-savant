
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchemesHeader from "@/components/schemes/SchemesHeader";
import SchemesList from "@/components/schemes/SchemesList";
import SchemeLocationsPromo from "@/components/schemes/SchemeLocationsPromo";
import { motion } from "framer-motion";

interface SchemeResult {
  id: string;
  title: string;
  description: string;
  ministry: string;
  eligibility: string[];
  deadline?: string;
  location?: string;
  matchPercentage?: number;
  imageUrl?: string;
}

// Mock data for all schemes
const allSchemes = [
  {
    id: "1",
    title: "PM Kisan Samman Nidhi",
    description: "Direct income support of ₹6,000 per year to farmer families across the country.",
    ministry: "Agriculture",
    eligibility: ["Small and marginal farmers", "Land ownership documentation required", "Valid bank account"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/agriculture.jpg"
  },
  {
    id: "2",
    title: "Startup India Seed Fund",
    description: "Financial assistance for startups for proof of concept, prototype development, product trials, and market entry.",
    ministry: "Commerce & Industry",
    eligibility: ["DPIIT recognized startups", "Less than 2 years old", "Not received more than ₹10 lakh funding"],
    deadline: "Dec 31, 2023",
    location: "All India",
    imageUrl: "/scheme-images/startup.jpg"
  },
  {
    id: "3",
    title: "National Scholarship Portal",
    description: "Single-window electronic platform for students to apply for various scholarships.",
    ministry: "Education",
    eligibility: ["Students enrolled in recognized institutions", "Family income below ₹8 lakh per annum", "Minimum 60% marks in previous examination"],
    deadline: "Oct 31, 2023",
    location: "All India",
    imageUrl: "/scheme-images/education.jpg"
  },
  {
    id: "4",
    title: "Pradhan Mantri Awas Yojana",
    description: "Housing subsidy to help economically weaker sections for construction or enhancement of their houses.",
    ministry: "Housing & Urban Affairs",
    eligibility: ["EWS/LIG/MIG categories", "No house ownership in family", "First-time home buyers"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/housing.jpg"
  },
  {
    id: "5",
    title: "Atal Innovation Mission",
    description: "Establishing Atal Tinkering Labs to foster creativity among students and promote innovation ecosystem.",
    ministry: "NITI Aayog",
    eligibility: ["Educational institutions", "Corporate entities", "Individuals with innovative ideas"],
    deadline: "Varies by program",
    location: "All India",
    imageUrl: "/scheme-images/education.jpg"
  },
  {
    id: "6",
    title: "Digital India Scheme",
    description: "Transform India into a digitally empowered society and knowledge economy.",
    ministry: "Electronics & IT",
    eligibility: ["Citizens", "Government departments", "Technology companies"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/digital.jpg"
  },
  {
    id: "7",
    title: "PM Vishwakarma Yojana",
    description: "Support for traditional artisans and craftspeople with financial assistance and skill upgradation.",
    ministry: "Skill Development",
    eligibility: ["Traditional artisans and craftspeople", "Family involved in traditional craft for generations", "Valid identity proof"],
    deadline: "March 31, 2024",
    location: "All India",
    imageUrl: "/scheme-images/rural.jpg"
  },
  {
    id: "8",
    title: "National Rural Livelihood Mission",
    description: "Creating sustainable livelihood opportunities for rural communities through skill development and financial inclusion.",
    ministry: "Rural Development",
    eligibility: ["Rural women", "BPL families", "Self-help groups"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/rural.jpg"
  },
  {
    id: "9",
    title: "Mahila Shakti Kendra",
    description: "Empowering rural women through community participation and creating an environment for positive change.",
    ministry: "Women & Child Development",
    eligibility: ["Rural women", "Women entrepreneurs", "Women's self-help groups"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/women-empowerment.jpg"
  }
];

// Category-specific schemes
const agricultureSchemes = allSchemes.filter(scheme => scheme.ministry === "Agriculture");
const educationSchemes = allSchemes.filter(scheme => 
  scheme.ministry === "Education" || scheme.ministry === "NITI Aayog"
);
const healthcareSchemes = [
  {
    id: "10",
    title: "Ayushman Bharat",
    description: "Health insurance coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
    ministry: "Healthcare",
    eligibility: ["Poor and vulnerable families", "As per SECC database", "No existing health insurance"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/healthcare.jpg"
  },
  {
    id: "11",
    title: "PM Jan Arogya Yojana",
    description: "Provides health coverage to economically disadvantaged citizens of India.",
    ministry: "Healthcare",
    eligibility: ["BPL families", "Identified occupational categories of workers", "Annual household income below ₹5 lakh"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/healthcare.jpg"
  },
  {
    id: "12",
    title: "National Health Mission",
    description: "Comprehensive healthcare including preventive, promotive, and curative services.",
    ministry: "Healthcare",
    eligibility: ["All citizens", "Focus on rural areas and urban slums", "Special emphasis on vulnerable groups"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/healthcare.jpg"
  }
];
const businessSchemes = allSchemes.filter(scheme => 
  scheme.ministry === "Commerce & Industry" || scheme.ministry === "Electronics & IT"
);

const Schemes = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredSchemes, setFilteredSchemes] = useState(allSchemes);
  
  useEffect(() => {
    // Filter schemes based on the active tab
    switch (activeTab) {
      case "agriculture":
        setFilteredSchemes(agricultureSchemes);
        break;
      case "education":
        setFilteredSchemes(educationSchemes);
        break;
      case "healthcare":
        setFilteredSchemes(healthcareSchemes);
        break;
      case "business":
        setFilteredSchemes(businessSchemes);
        break;
      default:
        setFilteredSchemes(allSchemes);
    }
  }, [activeTab]);

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <SchemesHeader />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Tabs defaultValue="all" className="w-full mb-8">
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TabsList className="bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setActiveTab("all")}
                  className="transition-all duration-300 data-[state=active]:bg-primary/10"
                >
                  All Schemes
                </TabsTrigger>
                <TabsTrigger 
                  value="agriculture" 
                  onClick={() => setActiveTab("agriculture")}
                  className="transition-all duration-300 data-[state=active]:bg-primary/10"
                >
                  Agriculture
                </TabsTrigger>
                <TabsTrigger 
                  value="education" 
                  onClick={() => setActiveTab("education")}
                  className="transition-all duration-300 data-[state=active]:bg-primary/10"
                >
                  Education
                </TabsTrigger>
                <TabsTrigger 
                  value="healthcare" 
                  onClick={() => setActiveTab("healthcare")}
                  className="transition-all duration-300 data-[state=active]:bg-primary/10"
                >
                  Healthcare
                </TabsTrigger>
                <TabsTrigger 
                  value="business" 
                  onClick={() => setActiveTab("business")}
                  className="transition-all duration-300 data-[state=active]:bg-primary/10"
                >
                  Business
                </TabsTrigger>
              </TabsList>
            </motion.div>
          </div>

          <SchemesList schemes={filteredSchemes} />
        </Tabs>
      </motion.div>
      
      <SchemeLocationsPromo />
    </div>
  );
};

export default Schemes;
