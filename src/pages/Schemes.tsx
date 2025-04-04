
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Check, Clock, Filter, Lightbulb, MapPin, Percent, Brain, Sparkles } from "lucide-react";

import SchemeCard from "@/components/SchemeCard";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/assets/animations";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SchemeResult {
  id: string;
  title: string;
  description: string;
  ministry: string;
  eligibility: string[];
  deadline?: string;
  location?: string;
  matchPercentage?: number;
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
    location: "All India"
  },
  {
    id: "2",
    title: "Startup India Seed Fund",
    description: "Financial assistance for startups for proof of concept, prototype development, product trials, and market entry.",
    ministry: "Commerce & Industry",
    eligibility: ["DPIIT recognized startups", "Less than 2 years old", "Not received more than ₹10 lakh funding"],
    deadline: "Dec 31, 2023",
    location: "All India"
  },
  {
    id: "3",
    title: "National Scholarship Portal",
    description: "Single-window electronic platform for students to apply for various scholarships.",
    ministry: "Education",
    eligibility: ["Students enrolled in recognized institutions", "Family income below ₹8 lakh per annum", "Minimum 60% marks in previous examination"],
    deadline: "Oct 31, 2023",
    location: "All India"
  },
  {
    id: "4",
    title: "Pradhan Mantri Awas Yojana",
    description: "Housing subsidy to help economically weaker sections for construction or enhancement of their houses.",
    ministry: "Housing & Urban Affairs",
    eligibility: ["EWS/LIG/MIG categories", "No house ownership in family", "First-time home buyers"],
    deadline: "Ongoing",
    location: "All India"
  },
  {
    id: "5",
    title: "Atal Innovation Mission",
    description: "Establishing Atal Tinkering Labs to foster creativity among students and promote innovation ecosystem.",
    ministry: "NITI Aayog",
    eligibility: ["Educational institutions", "Corporate entities", "Individuals with innovative ideas"],
    deadline: "Varies by program",
    location: "All India"
  },
  {
    id: "6",
    title: "Digital India Scheme",
    description: "Transform India into a digitally empowered society and knowledge economy.",
    ministry: "Electronics & IT",
    eligibility: ["Citizens", "Government departments", "Technology companies"],
    deadline: "Ongoing",
    location: "All India"
  }
];

// Category-specific schemes
const agricultureSchemes = allSchemes.filter(scheme => scheme.ministry === "Agriculture");
const educationSchemes = allSchemes.filter(scheme => scheme.ministry === "Education");
const healthcareSchemes = [
  {
    id: "7",
    title: "Ayushman Bharat",
    description: "Health insurance coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
    ministry: "Healthcare",
    eligibility: ["Poor and vulnerable families", "As per SECC database", "No existing health insurance"],
    deadline: "Ongoing",
    location: "All India"
  },
  {
    id: "8",
    title: "PM Jan Arogya Yojana",
    description: "Provides health coverage to economically disadvantaged citizens of India.",
    ministry: "Healthcare",
    eligibility: ["BPL families", "Identified occupational categories of workers", "Annual household income below ₹5 lakh"],
    deadline: "Ongoing",
    location: "All India"
  }
];
const businessSchemes = allSchemes.filter(scheme => scheme.ministry === "Commerce & Industry");

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
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 justify-center mb-2">
          <Sparkles className="text-amber-500" size={24} />
          <h1 className="text-3xl font-bold">Browse All Government Schemes</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore all available government schemes across different sectors. Filter by category to find schemes relevant to your needs.
        </p>
      </div>

      <Alert variant="success" className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border border-green-100">
        <Brain className="h-5 w-5 text-primary" />
        <AlertTitle>Get Personalized Recommendations</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            Take our eligibility test to discover schemes that match your profile and have a higher chance of approval.
          </p>
          <Button asChild size="sm" className="mt-2">
            <Link to="/eligibility-test" className="flex items-center gap-1">
              Take Eligibility Test
              <ArrowRight size={14} />
            </Link>
          </Button>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="all" className="w-full mb-8">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
              All Schemes
            </TabsTrigger>
            <TabsTrigger value="agriculture" onClick={() => setActiveTab("agriculture")}>
              Agriculture
            </TabsTrigger>
            <TabsTrigger value="education" onClick={() => setActiveTab("education")}>
              Education
            </TabsTrigger>
            <TabsTrigger value="healthcare" onClick={() => setActiveTab("healthcare")}>
              Healthcare
            </TabsTrigger>
            <TabsTrigger value="business" onClick={() => setActiveTab("business")}>
              Business
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme, index) => (
              <MotionDiv
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SchemeCard {...scheme} />
              </MotionDiv>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No schemes found</h3>
              <p className="mt-2 text-muted-foreground">
                There are currently no schemes available in this category. Please check back later or try another category.
              </p>
            </div>
          )}
        </div>
      </Tabs>
      
      <div className="bg-secondary/50 rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary shrink-0">
            <Lightbulb size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">Find Your Nearest Scheme Center</h3>
            <p className="text-muted-foreground mb-4">
              Visit a nearby scheme center for in-person assistance with applications and guidance on document requirements.
            </p>
            <Button asChild>
              <Link to="/scheme-locations" className="flex items-center gap-2">
                <MapPin size={16} />
                View Scheme Centers
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schemes;
