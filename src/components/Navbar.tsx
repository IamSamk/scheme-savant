
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 glass-morphism shadow-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">SS</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">SchemeSavant</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/schemes" className="text-foreground/80 hover:text-foreground transition-colors">
              Schemes
            </Link>
            <Link to="/eligibility" className="text-foreground/80 hover:text-foreground transition-colors">
              Eligibility
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="flex md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search size={20} />
            </Button>
            
            <Button variant="outline" size="sm" className="hidden md:flex">
              <User size={16} className="mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-morphism animate-fade-in mt-2 mx-4 rounded-lg">
          <nav className="flex flex-col py-4">
            <Link to="/" className="px-4 py-2 hover:bg-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/schemes" className="px-4 py-2 hover:bg-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              Schemes
            </Link>
            <Link to="/eligibility" className="px-4 py-2 hover:bg-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              Eligibility
            </Link>
            <Link to="/about" className="px-4 py-2 hover:bg-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <div className="border-t border-border mt-2 pt-2 px-4">
              <Button variant="outline" size="sm" className="w-full">
                <User size={16} className="mr-2" />
                Sign In
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
