
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchemesHeader from "@/components/schemes/SchemesHeader";
import SchemesList from "@/components/schemes/SchemesList";
import SchemeLocationsPromo from "@/components/schemes/SchemeLocationsPromo";
import { motion } from "framer-motion";
import { allSchemes, agricultureSchemes, educationSchemes, healthcareSchemes, businessSchemes } from "@/data/schemes";

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
