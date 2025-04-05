
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Sparkles } from "lucide-react";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-10 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            initial={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0.5
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-300/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      <motion.div 
        className="container mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
          >
            <motion.span 
              className="inline-flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Sparkles size={16} className="text-yellow-500" />
              AI-Powered Government Scheme Discovery
            </motion.span>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-foreground"
            variants={itemVariants}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            >
              Discover
            </motion.span>{" "}
            the Right Government 
            <br className="hidden sm:block" /> Schemes for You
          </motion.h1>
          
          <motion.div 
            className="h-16 flex justify-center items-center mb-3"
            variants={itemVariants}
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Instantly find government schemes for{" "}
              <span className="relative inline-block text-primary">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTextIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {textVariants[currentTextIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="w-full flex justify-center"
          variants={itemVariants}
        >
          <SearchBar />
        </motion.div>

        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 shadow-sm"
                onClick={() => navigate('/mentors')}
              >
                <Users size={18} />
                Connect with Expert Mentors
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="default" 
                size="lg" 
                className="gap-2 shadow-md"
                onClick={() => navigate('/eligibility-test')}
              >
                Take Eligibility Test
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          variants={itemVariants}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-muted-foreground mb-4">Popular searches</p>
          <motion.div 
            className="flex flex-wrap justify-center gap-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {["Startup India", "PM Kisan", "Skill Development", "MSME Loans", "Educational Scholarships"].map((item, index) => (
              <motion.div 
                key={index}
                className="px-4 py-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all"
                onClick={() => navigate(`/scheme-results?query=${encodeURIComponent(item)}`)}
                whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
