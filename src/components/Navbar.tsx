
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
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
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${
      isScrolled ? "bg-background shadow-sm" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mr-2">
              <span className="text-xl font-bold text-primary">G</span>
            </div>
            <span className="text-xl font-bold">GovSchemes</span>
          </Link>
          
          {/* Desktop Menu */}
          {!isMobile && (
            <nav className="flex items-center space-x-1">
              <Button
                variant={isActive("/") ? "secondary" : "ghost"}
                asChild
              >
                <Link to="/">Home</Link>
              </Button>
              
              <Button
                variant={isActive("/eligibility-test") ? "secondary" : "ghost"}
                asChild
              >
                <Link to="/eligibility-test">Eligibility</Link>
              </Button>
              
              <div className="relative group">
                <Button
                  variant={
                    isActive("/scheme-results") || isActive("/scheme-locations") 
                      ? "secondary" 
                      : "ghost"
                  }
                  className="inline-flex items-center"
                >
                  <span>Schemes</span>
                  <ChevronDown size={16} className="ml-1" />
                </Button>
                
                <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white border border-gray-200 hidden group-hover:block z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      to="/scheme-results"
                      className="block px-4 py-2 text-sm hover:bg-accent"
                    >
                      Browse All Schemes
                    </Link>
                    <Link
                      to="/scheme-locations"
                      className="block px-4 py-2 text-sm hover:bg-accent"
                    >
                      Scheme Locations
                    </Link>
                    <Link
                      to="/scheme-results?category=agriculture"
                      className="block px-4 py-2 text-sm hover:bg-accent"
                    >
                      Agriculture
                    </Link>
                    <Link
                      to="/scheme-results?category=education"
                      className="block px-4 py-2 text-sm hover:bg-accent"
                    >
                      Education
                    </Link>
                    <Link
                      to="/scheme-results?category=healthcare"
                      className="block px-4 py-2 text-sm hover:bg-accent"
                    >
                      Healthcare
                    </Link>
                    <Link
                      to="/scheme-results?category=business"
                      className="block px-4 py-2 text-sm hover:bg-accent"
                    >
                      Business
                    </Link>
                  </div>
                </div>
              </div>

              <Button
                variant={isActive("/mentors") ? "secondary" : "ghost"}
                asChild
              >
                <Link to="/mentors">Mentors</Link>
              </Button>
              
              <Button
                variant={isActive("/about") ? "secondary" : "ghost"}
                asChild
              >
                <Link to="/about">About</Link>
              </Button>
            </nav>
          )}
          
          {/* Right Side Controls */}
          <div className="flex items-center">
            <LanguageSelector />
            
            {/* Mobile Menu Toggle */}
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="mt-4 pb-2 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Button
                variant={isActive("/") ? "secondary" : "outline"}
                className="justify-start"
                asChild
              >
                <Link to="/">Home</Link>
              </Button>
              
              <Button
                variant={isActive("/eligibility-test") ? "secondary" : "outline"}
                className="justify-start"
                asChild
              >
                <Link to="/eligibility-test">Eligibility</Link>
              </Button>
              
              <Button
                variant={isActive("/scheme-results") ? "secondary" : "outline"}
                className="justify-start"
                asChild
              >
                <Link to="/scheme-results">Schemes</Link>
              </Button>
              
              <Button
                variant={isActive("/scheme-locations") ? "secondary" : "outline"}
                className="justify-start text-left pl-8"
                asChild
              >
                <Link to="/scheme-locations">- Scheme Locations</Link>
              </Button>

              <Button
                variant={isActive("/mentors") ? "secondary" : "outline"}
                className="justify-start"
                asChild
              >
                <Link to="/mentors">Mentors</Link>
              </Button>
              
              <Button
                variant={isActive("/about") ? "secondary" : "outline"}
                className="justify-start"
                asChild
              >
                <Link to="/about">About</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
