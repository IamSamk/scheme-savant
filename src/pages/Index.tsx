
import Hero from "@/components/Hero";
import RecommendationSection from "@/components/RecommendationSection";
import Chatbot from "@/components/Chatbot";
import NearbySchemes from "@/components/NearbySchemes";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCcw, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const Index = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        
        <RecommendationSection />
        
        {/* Features section */}
        <section className="py-16 px-4 bg-secondary/50">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                AI-Powered Features
              </div>
              <h2 className="text-3xl font-bold mb-4">{t("features.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("features.subtitle")}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <RefreshCcw className="h-6 w-6 text-primary" />,
                  titleKey: "features.1.title",
                  descriptionKey: "features.1.description"
                },
                {
                  icon: <CheckCircle className="h-6 w-6 text-primary" />,
                  titleKey: "features.2.title",
                  descriptionKey: "features.2.description"
                },
                {
                  icon: <ArrowRight className="h-6 w-6 text-primary" />,
                  titleKey: "features.3.title",
                  descriptionKey: "features.3.description"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{t(feature.descriptionKey)}</p>
                  <Button variant="link" className="p-0 h-auto text-primary group">
                    Learn more 
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Scheme Centers Map */}
        <NearbySchemes />
        
        {/* CTA section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-8 md:p-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {t("cta.title")}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t("cta.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="font-medium transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    {t("cta.button.create")}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="font-medium transition-all duration-300 hover:bg-primary/5"
                  >
                    {t("cta.button.explore")}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Chatbot />
    </div>
  );
};

export default Index;
