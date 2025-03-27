
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const textVariants = [
    "farmer subsidies",
    "education scholarships",
    "startup funding",
    "healthcare benefits",
    "housing assistance"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prevIndex => 
        prevIndex === textVariants.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-10 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/5 animate-pulse-subtle"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            AI-Powered Government Scheme Discovery
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-foreground">
            Discover the Right Government 
            <br className="hidden sm:block" /> Schemes for You
          </h1>
          
          <div className="h-16 flex justify-center items-center mb-3">
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Instantly find government schemes for{" "}
              <span className="relative inline-block text-primary">
                <motion.span
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {textVariants[currentTextIndex]}
                </motion.span>
              </span>
            </p>
          </div>
        </div>
        
        <div className="w-full flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <SearchBar />
        </div>

        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2"
              onClick={() => navigate('/mentors')}
            >
              <Users size={18} />
              Connect with Expert Mentors
            </Button>
            
            <Button 
              variant="default" 
              size="lg" 
              className="gap-2"
              onClick={() => navigate('/eligibility-test')}
            >
              Take Eligibility Test
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <p className="text-sm text-muted-foreground mb-4">Popular searches</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Startup India", "PM Kisan", "Skill Development", "MSME Loans", "Educational Scholarships"].map((item, index) => (
              <div 
                key={index}
                className="px-4 py-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all"
                onClick={() => navigate(`/scheme-results?query=${encodeURIComponent(item)}`)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
