
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchemeCard from "./SchemeCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileSpreadsheet, Brain, Sparkles } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="text-amber-500" size={20} />
            <h2 className="text-3xl font-bold">{t("schemes.title")}</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("schemes.subtitle")}
          </p>
          
          <div className="mt-6 inline-flex items-center justify-center gap-4 bg-secondary/50 rounded-full px-6 py-3">
            <Brain className="text-primary" size={20} />
            <span className="text-sm">
              Want more personalized recommendations?
            </span>
            <Button asChild size="sm">
              <Link to="/eligibility-test" className="flex items-center gap-1">
                {t("schemes.takeTest")}
                <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <Alert variant="success" className="bg-gradient-to-r from-blue-50 to-green-50 border border-green-100">
            <Brain className="h-5 w-5 text-primary" />
            <AlertTitle>{t("schemes.alert.title")}</AlertTitle>
            <AlertDescription>
              {t("schemes.alert.description")}
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="recommended" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="recommended" onClick={() => setActiveTab("recommended")}>
                {t("schemes.tabs.recommended")}
              </TabsTrigger>
              <TabsTrigger value="popular" onClick={() => setActiveTab("popular")}>
                {t("schemes.tabs.popular")}
              </TabsTrigger>
              <TabsTrigger value="new" onClick={() => setActiveTab("new")}>
                {t("schemes.tabs.new")}
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
