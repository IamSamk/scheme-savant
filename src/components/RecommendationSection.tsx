
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchemeCard from "./SchemeCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileSpreadsheet, Brain, Sparkles } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

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
    matchPercentage: 95,
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
    matchPercentage: 88,
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
    matchPercentage: 82,
    imageUrl: "/scheme-images/education.jpg"
  },
  {
    id: "4",
    title: "Jan Aushadhi Yojana",
    description: "Quality generic medicines at affordable prices for all citizens through dedicated outlets.",
    ministry: "Healthcare",
    eligibility: ["All citizens", "No specific eligibility criteria", "Available at designated Jan Aushadhi Kendras"],
    deadline: "Ongoing",
    location: "All India",
    matchPercentage: 78,
    imageUrl: "/scheme-images/healthcare.jpg"
  }
];

const popularSchemes = [
  {
    id: "5",
    title: "Pradhan Mantri Awas Yojana",
    description: "Housing subsidy to help economically weaker sections for construction or enhancement of their houses.",
    ministry: "Housing & Urban Affairs",
    eligibility: ["EWS/LIG/MIG categories", "No house ownership in family", "First-time home buyers"],
    deadline: "Ongoing",
    location: "All India",
    matchPercentage: 70,
    imageUrl: "/scheme-images/housing.jpg"
  },
  {
    id: "6",
    title: "Atal Innovation Mission",
    description: "Establishing Atal Tinkering Labs to foster creativity among students and promote innovation ecosystem.",
    ministry: "NITI Aayog",
    eligibility: ["Educational institutions", "Corporate entities", "Individuals with innovative ideas"],
    deadline: "Varies by program",
    location: "All India",
    imageUrl: "/scheme-images/education.jpg"
  },
  {
    id: "7",
    title: "Digital India Scheme",
    description: "Transform India into a digitally empowered society and knowledge economy.",
    ministry: "Electronics & IT",
    eligibility: ["Citizens", "Government departments", "Technology companies"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/digital.jpg"
  },
  {
    id: "8",
    title: "PM Mudra Yojana",
    description: "Financial support for micro-entrepreneurs and small businesses to expand their ventures.",
    ministry: "Finance",
    eligibility: ["Small business owners", "Self-help groups", "Individuals starting micro-enterprises"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/startup.jpg"
  }
];

const newSchemes = [
  {
    id: "9",
    title: "PM Vishwakarma Yojana",
    description: "Support for traditional artisans and craftspeople with financial assistance and skill upgradation.",
    ministry: "Skill Development",
    eligibility: ["Traditional artisans and craftspeople", "Family involved in traditional craft for generations", "Valid identity proof"],
    deadline: "March 31, 2024",
    location: "All India",
    imageUrl: "/scheme-images/rural.jpg"
  },
  {
    id: "10",
    title: "National Rural Livelihood Mission",
    description: "Creating sustainable livelihood opportunities for rural communities through skill development and financial inclusion.",
    ministry: "Rural Development",
    eligibility: ["Rural women", "BPL families", "Self-help groups"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/rural.jpg"
  },
  {
    id: "11",
    title: "Mahila Shakti Kendra",
    description: "Empowering rural women through community participation and creating an environment for positive change.",
    ministry: "Women & Child Development",
    eligibility: ["Rural women", "Women entrepreneurs", "Women's self-help groups"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/women-empowerment.jpg"
  },
  {
    id: "12",
    title: "PM Garib Kalyan Anna Yojana",
    description: "Free food grains to poor families to ensure food security during challenging times.",
    ministry: "Consumer Affairs, Food & Public Distribution",
    eligibility: ["Economically vulnerable families", "Registered under National Food Security Act", "Valid ration card holders"],
    deadline: "December 2023",
    location: "All India",
    imageUrl: "/scheme-images/rural.jpg"
  }
];

const RecommendationSection = () => {
  const [activeTab, setActiveTab] = useState("recommended");
  const { t } = useLanguage();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Sparkles className="text-amber-500" size={20} />
            </motion.div>
            <h2 className="text-3xl font-bold">{t("schemes.title")}</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("schemes.subtitle")}
          </p>
          
          <motion.div 
            className="mt-6 inline-flex items-center justify-center gap-4 bg-secondary/50 rounded-full px-6 py-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <Brain className="text-primary" size={20} />
            <span className="text-sm">
              Want more personalized recommendations?
            </span>
            <Button asChild size="sm" className="btn-hover-lift">
              <Link to="/eligibility-test" className="flex items-center gap-1">
                {t("schemes.takeTest")}
                <ArrowRight size={14} />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Alert variant="success" className="bg-gradient-to-r from-blue-50 to-green-50 border border-green-100">
            <Brain className="h-5 w-5 text-primary" />
            <AlertTitle>{t("schemes.alert.title")}</AlertTitle>
            <AlertDescription>
              {t("schemes.alert.description")}
            </AlertDescription>
          </Alert>
        </motion.div>

        <Tabs defaultValue="recommended" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
              <TabsTrigger 
                value="recommended" 
                onClick={() => setActiveTab("recommended")}
                className="transition-all duration-300 data-[state=active]:bg-primary/10"
              >
                {t("schemes.tabs.recommended")}
              </TabsTrigger>
              <TabsTrigger 
                value="popular" 
                onClick={() => setActiveTab("popular")}
                className="transition-all duration-300 data-[state=active]:bg-primary/10"
              >
                {t("schemes.tabs.popular")}
              </TabsTrigger>
              <TabsTrigger 
                value="new" 
                onClick={() => setActiveTab("new")}
                className="transition-all duration-300 data-[state=active]:bg-primary/10"
              >
                {t("schemes.tabs.new")}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="recommended" className="animate-fade-in">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {recommendedSchemes.map((scheme) => (
                <motion.div key={scheme.id} variants={item} className="h-full">
                  <SchemeCard {...scheme} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="popular" className="animate-fade-in">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {popularSchemes.map((scheme) => (
                <motion.div key={scheme.id} variants={item} className="h-full">
                  <SchemeCard {...scheme} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="new" className="animate-fade-in">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {newSchemes.map((scheme) => (
                <motion.div key={scheme.id} variants={item} className="h-full">
                  <SchemeCard {...scheme} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default RecommendationSection;
