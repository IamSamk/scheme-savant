
import { Lightbulb, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SchemeLocationsPromo: React.FC = () => {
  return (
    <motion.div 
      className="bg-secondary/50 rounded-xl p-6 md:p-8 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary shrink-0">
          <Lightbulb size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">Find Your Nearest Scheme Center</h3>
          <p className="text-muted-foreground mb-4">
            Visit a nearby scheme center for in-person assistance with applications and guidance on document requirements.
          </p>
          <Button asChild className="transition-all duration-300 hover:translate-y-[-2px]">
            <Link to="/scheme-locations" className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="relative inline-block">
                View Scheme Centers
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/70 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SchemeLocationsPromo;
