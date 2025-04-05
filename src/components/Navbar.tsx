
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import LanguageSelector from "./LanguageSelector";
import { Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavItems from "./navigation/NavItems";
import MobileNavItems from "./navigation/MobileNavItems";
import { motion } from "framer-motion";

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
    <header className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${
      isScrolled ? "bg-background/95 shadow-sm backdrop-blur-md" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div 
              className="flex items-center justify-center h-11 w-11 rounded-full bg-gradient-to-br from-primary/80 to-primary mr-2 transition-all duration-300 group-hover:scale-110 shadow-md"
              whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
            >
              <motion.span 
                className="text-xl font-bold text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                G
              </motion.span>
              <motion.div 
                className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-400 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>
            <div className="flex flex-col">
              <motion.span 
                className="text-xl font-bold group-hover:text-primary transition-colors duration-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                GovSchemes
              </motion.span>
              <motion.span 
                className="text-xs text-muted-foreground -mt-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.8, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Empowering Citizens
              </motion.span>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          {!isMobile && <NavItems />}
          
          {/* Right Side Controls */}
          <div className="flex items-center">
            <LanguageSelector />
            
            {/* Mobile Menu Toggle */}
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="btn-hover-expand">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobile && isMenuOpen && <MobileNavItems />}
      </div>
    </header>
  );
};

export default Navbar;
