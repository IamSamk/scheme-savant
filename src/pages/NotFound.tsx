
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! We couldn't find the page you're looking for.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <HomeIcon size={18} />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
