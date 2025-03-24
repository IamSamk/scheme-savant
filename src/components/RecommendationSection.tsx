
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchemeCard from "./SchemeCard";

// Mock data for recommendation schemes
const recommendedSchemes = [
  {
    id: "1",
    title: "PM Kisan Samman Nidhi",
    description: "Direct income support of ₹6,000 per year to farmer families across the country.",
    ministry: "Agriculture",
    eligibility: ["Small and marginal farmers", "Land ownership documentation required", "Valid bank account"],
    deadline: "Ongoing",
    location: "All India",
    matchPercentage: 95
  },
  {
    id: "2",
    title: "Startup India Seed Fund",
    description: "Financial assistance for startups for proof of concept, prototype development, product trials, and market entry.",
    ministry: "Commerce & Industry",
    eligibility: ["DPIIT recognized startups", "Less than 2 years old", "Not received more than ₹10 lakh funding"],
    deadline: "Dec 31, 2023",
    location: "All India",
    matchPercentage: 88
  },
  {
    id: "3",
    title: "National Scholarship Portal",
    description: "Single-window electronic platform for students to apply for various scholarships.",
    ministry: "Education",
    eligibility: ["Students enrolled in recognized institutions", "Family income below ₹8 lakh per annum", "Minimum 60% marks in previous examination"],
    deadline: "Oct 31, 2023",
    location: "All India",
    matchPercentage: 82
  }
];

const popularSchemes = [
  {
    id: "4",
    title: "Pradhan Mantri Awas Yojana",
    description: "Housing subsidy to help economically weaker sections for construction or enhancement of their houses.",
    ministry: "Housing & Urban Affairs",
    eligibility: ["EWS/LIG/MIG categories", "No house ownership in family", "First-time home buyers"],
    deadline: "Ongoing",
    location: "All India",
    matchPercentage: 70
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

const RecommendationSection = () => {
  const [activeTab, setActiveTab] = useState("recommended");

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Discover Government Schemes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-powered recommendations based on your profile and interests
          </p>
        </div>

        <Tabs defaultValue="recommended" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="recommended" onClick={() => setActiveTab("recommended")}>
                Recommended For You
              </TabsTrigger>
              <TabsTrigger value="popular" onClick={() => setActiveTab("popular")}>
                Popular Schemes
              </TabsTrigger>
              <TabsTrigger value="new" onClick={() => setActiveTab("new")}>
                Newly Launched
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="recommended" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedSchemes.map((scheme) => (
                <SchemeCard key={scheme.id} {...scheme} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularSchemes.map((scheme) => (
                <SchemeCard key={scheme.id} {...scheme} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="animate-fade-in">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary text-xl font-semibold">!</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
              <p className="text-muted-foreground text-center max-w-md">
                We're gathering the latest government schemes. Check back in a few days to see the newest opportunities.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default RecommendationSection;
