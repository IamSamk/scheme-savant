
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import SchemeTabContent from "./schemes/SchemeTabContent";
import RecommendationAlert from "./schemes/RecommendationAlert";
import { recommendedSchemes, popularSchemes, newSchemes } from "@/data/recommendations";

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

        <RecommendationAlert />

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
            <SchemeTabContent schemes={recommendedSchemes} />
          </TabsContent>

          <TabsContent value="popular" className="animate-fade-in">
            <SchemeTabContent schemes={popularSchemes} />
          </TabsContent>

          <TabsContent value="new" className="animate-fade-in">
            <SchemeTabContent schemes={newSchemes} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default RecommendationSection;
