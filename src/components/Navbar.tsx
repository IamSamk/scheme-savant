
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import LanguageSelector from "./LanguageSelector";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavItems from "./navigation/NavItems";
import MobileNavItems from "./navigation/MobileNavItems";

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
      isScrolled ? "bg-background shadow-sm backdrop-blur-md" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mr-2 transition-all duration-300 group-hover:scale-110">
              <span className="text-xl font-bold text-primary">G</span>
            </div>
            <span className="text-xl font-bold group-hover:text-primary transition-colors duration-300">GovSchemes</span>
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
