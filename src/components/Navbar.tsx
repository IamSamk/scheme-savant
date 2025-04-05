
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import LanguageSelector from "./LanguageSelector";
import { Menu, X, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavItems from "./navigation/NavItems";
import MobileNavItems from "./navigation/MobileNavItems";
import { motion } from "framer-motion";

const logoVariants = {
  hover: {
    scale: 1.05,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Add classes to make navbar transparent at top and solid on scroll
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${
        isScrolled ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/">
            <motion.div 
              className="flex items-center"
              whileHover="hover"
              variants={logoVariants}
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-md mr-2">
                <span className="text-xl font-bold text-primary-foreground">G</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  GovSchemes
                </span>
                <span className="text-[10px] leading-none text-muted-foreground -mt-1">
                  Find · Apply · Succeed
                </span>
              </div>
            </motion.div>
          </Link>
          
          {/* Desktop Menu */}
          {!isMobile && <NavItems />}
          
          {/* Right Side Controls */}
          <div className="flex items-center">
            <LanguageSelector />
            
            {/* Mobile Menu Toggle */}
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <motion.div
                  initial={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobile && isMenuOpen && <MobileNavItems />}
      </div>
    </motion.header>
  );
};

export default Navbar;
