
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const MobileNavItems = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
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
        
        <Accordion type="single" collapsible>
          <AccordionItem value="schemes" className="border-none">
            <AccordionTrigger className="py-2 px-4 rounded-md bg-outline hover:bg-secondary hover:no-underline">
              <span className={isActive("/schemes") || isActive("/scheme-results") || isActive("/scheme-locations") ? "text-primary" : ""}>
                Schemes
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="flex flex-col pl-4 space-y-2 mt-2">
                <Button
                  variant={isActive("/schemes") ? "secondary" : "outline"}
                  className="justify-start"
                  asChild
                >
                  <Link to="/schemes">Browse All Schemes</Link>
                </Button>
                
                <Button
                  variant={isActive("/scheme-results") ? "secondary" : "outline"}
                  className="justify-start"
                  asChild
                >
                  <Link to="/scheme-results">Personalized Matches</Link>
                </Button>
                
                <Button
                  variant={isActive("/scheme-locations") ? "secondary" : "outline"}
                  className="justify-start"
                  asChild
                >
                  <Link to="/scheme-locations">Scheme Locations</Link>
                </Button>
                
                <Button
                  variant="outline"
                  className="justify-start text-left"
                  asChild
                >
                  <Link to="/schemes?category=agriculture">Agriculture</Link>
                </Button>
                
                <Button
                  variant="outline"
                  className="justify-start text-left"
                  asChild
                >
                  <Link to="/schemes?category=education">Education</Link>
                </Button>
                
                <Button
                  variant="outline"
                  className="justify-start text-left"
                  asChild
                >
                  <Link to="/schemes?category=healthcare">Healthcare</Link>
                </Button>
                
                <Button
                  variant="outline"
                  className="justify-start text-left"
                  asChild
                >
                  <Link to="/schemes?category=business">Business</Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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
  );
};

export default MobileNavItems;
