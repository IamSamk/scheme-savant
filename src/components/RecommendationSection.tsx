
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchemeCard from "./SchemeCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileSpreadsheet, Brain, Sparkles } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

// Enhanced mock data for recommendation schemes with more schemes and images
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
    title: "Ayushman Bharat Yojana",
    description: "Health insurance coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
    ministry: "Health",
    eligibility: ["Families listed in SECC database", "No existing health insurance", "Low-income households"],
    deadline: "Ongoing",
    location: "All India",
    matchPercentage: 79,
    imageUrl: "/scheme-images/healthcare.jpg"
  },
  {
    id: "5",
    title: "MUDRA Loan Scheme",
    description: "Financial support up to ₹10 lakh for non-corporate, non-farm small/micro enterprises.",
    ministry: "Finance",
    eligibility: ["Small business owners", "Self-employed individuals", "Manufacturing, trading, or service sector entities"],
    deadline: "Ongoing",
    location: "All India",
    matchPercentage: 76,
    imageUrl: "/scheme-images/startup.jpg"
  },
  {
    id: "6",
    title: "PM SVANidhi",
    description: "Microcredit facility for street vendors providing working capital loan up to ₹10,000.",
    ministry: "Housing & Urban Affairs",
    eligibility: ["Street vendors", "Operating in urban areas", "Possessing Certificate of Vending"],
    deadline: "Ongoing",
    location: "Urban Areas",
    matchPercentage: 74,
    imageUrl: "/scheme-images/housing.jpg"
  }
];

// Enhanced popular schemes with more schemes and images
const popularSchemes = [
  {
    id: "7",
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
    id: "8",
    title: "Atal Innovation Mission",
    description: "Establishing Atal Tinkering Labs to foster creativity among students and promote innovation ecosystem.",
    ministry: "NITI Aayog",
    eligibility: ["Educational institutions", "Corporate entities", "Individuals with innovative ideas"],
    deadline: "Varies by program",
    location: "All India",
    imageUrl: "/scheme-images/education.jpg"
  },
  {
    id: "9",
    title: "Digital India Scheme",
    description: "Transform India into a digitally empowered society and knowledge economy.",
    ministry: "Electronics & IT",
    eligibility: ["Citizens", "Government departments", "Technology companies"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/digital.jpg"
  },
  {
    id: "10",
    title: "PM Jan Dhan Yojana",
    description: "National mission for financial inclusion to ensure access to financial services for all households in the country.",
    ministry: "Finance",
    eligibility: ["Indian citizens", "No existing bank account", "Valid KYC documents"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/digital.jpg"
  },
  {
    id: "11",
    title: "Swachh Bharat Mission",
    description: "Campaign to eliminate open defecation and improve solid waste management in urban and rural areas.",
    ministry: "Jal Shakti",
    eligibility: ["Municipalities", "Urban local bodies", "Rural households"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/housing.jpg"
  },
  {
    id: "12",
    title: "PM Ujjwala Yojana",
    description: "Providing LPG connections to women from Below Poverty Line (BPL) households.",
    ministry: "Petroleum & Natural Gas",
    eligibility: ["Women from BPL households", "No existing LPG connection", "Valid identity proof"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/rural.jpg"
  }
];

// New schemes with images
const newSchemes = [
  {
    id: "13",
    title: "PM Vishwakarma Scheme",
    description: "Comprehensive skills enhancement program for traditional artisans and craftspeople.",
    ministry: "Skill Development",
    eligibility: ["Traditional artisans", "Craftspeople", "Valid artisan ID card"],
    deadline: "Dec 31, 2025",
    location: "All India",
    imageUrl: "/scheme-images/rural.jpg"
  },
  {
    id: "14",
    title: "UDYAM Registration Portal",
    description: "New online system for MSME registration with simplified process and benefits.",
    ministry: "MSME",
    eligibility: ["Micro enterprises", "Small enterprises", "Medium enterprises"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/startup.jpg"
  },
  {
    id: "15",
    title: "PM Formalization of Micro Food Processing Enterprises",
    description: "Financial, technical and business support for existing micro food processing enterprises.",
    ministry: "Food Processing Industries",
    eligibility: ["Food processing units", "Self-help groups", "Farmer producer organizations"],
    deadline: "2025",
    location: "All India",
    imageUrl: "/scheme-images/agriculture.jpg"
  },
  {
    id: "16",
    title: "National Digital Health Mission",
    description: "A complete digital health ecosystem with unique health ID for every citizen and digitized health records.",
    ministry: "Health",
    eligibility: ["All Indian citizens", "Healthcare providers", "Health insurance providers"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/healthcare.jpg"
  },
  {
    id: "17",
    title: "PM e-VIDYA",
    description: "Multi-mode access to digital/online education with e-content for all grades.",
    ministry: "Education",
    eligibility: ["Students", "Teachers", "Educational institutions"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/education.jpg"
  },
  {
    id: "18",
    title: "Production Linked Incentive Scheme",
    description: "Financial incentives to boost domestic manufacturing in various sectors.",
    ministry: "Commerce & Industry",
    eligibility: ["Manufacturers in specified sectors", "Minimum investment threshold", "Revenue growth criteria"],
    deadline: "Varies by sector",
    location: "All India",
    imageUrl: "/scheme-images/startup.jpg"
  }
];

const staggerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const RecommendationSection = () => {
  const [activeTab, setActiveTab] = useState("recommended");
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="text-amber-500 animate-pulse-subtle" size={20} />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{t("schemes.title")}</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("schemes.subtitle")}
          </p>
          
          <motion.div 
            className="mt-6 inline-flex items-center justify-center gap-4 bg-secondary/50 rounded-full px-6 py-3"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <Brain className="text-primary" size={20} />
            <span className="text-sm">
              Want more personalized recommendations?
            </span>
            <Button asChild size="sm" className="animate-pulse-subtle">
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
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Alert variant="success" className="bg-gradient-to-r from-blue-50 to-green-50 border border-green-100 hover:shadow-md transition-all duration-300">
            <Brain className="h-5 w-5 text-primary" />
            <AlertTitle>{t("schemes.alert.title")}</AlertTitle>
            <AlertDescription>
              {t("schemes.alert.description")}
            </AlertDescription>
          </Alert>
        </motion.div>

        <Tabs defaultValue="recommended" className="w-full">
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          </div>

          <TabsContent value="recommended" className="animate-fade-in">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerAnimation}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {recommendedSchemes.map((scheme) => (
                <motion.div key={scheme.id} variants={itemAnimation}>
                  <SchemeCard {...scheme} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="popular" className="animate-fade-in">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerAnimation}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {popularSchemes.map((scheme) => (
                <motion.div key={scheme.id} variants={itemAnimation}>
                  <SchemeCard {...scheme} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="new" className="animate-fade-in">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerAnimation}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {newSchemes.map((scheme) => (
                <motion.div key={scheme.id} variants={itemAnimation}>
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
