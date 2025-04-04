
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

const NavItems = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
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
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={
                isActive("/schemes") || 
                isActive("/scheme-results") || 
                isActive("/scheme-locations") 
                  ? "bg-secondary text-secondary-foreground" 
                  : ""
              }
            >
              Schemes
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-1 p-2">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/schemes"
                      className="block p-2 hover:bg-accent rounded-md"
                    >
                      Browse All Schemes
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/scheme-results"
                      className="block p-2 hover:bg-accent rounded-md"
                    >
                      Personalized Matches
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/scheme-locations"
                      className="block p-2 hover:bg-accent rounded-md"
                    >
                      Scheme Locations
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/schemes?category=agriculture"
                      className="block p-2 hover:bg-accent rounded-md"
                    >
                      Agriculture
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/schemes?category=education"
                      className="block p-2 hover:bg-accent rounded-md"
                    >
                      Education
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/schemes?category=healthcare"
                      className="block p-2 hover:bg-accent rounded-md"
                    >
                      Healthcare
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/schemes?category=business"
                      className="block p-2 hover:bg-accent rounded-md"
                    >
                      Business
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

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
  );
};

export default NavItems;
