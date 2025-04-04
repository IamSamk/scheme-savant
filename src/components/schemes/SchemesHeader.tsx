
import { Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SchemesHeader: React.FC = () => {
  return (
    <>
      <motion.div 
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 justify-center mb-2">
          <Sparkles className="text-amber-500" size={24} />
          <h1 className="text-3xl font-bold">Browse All Government Schemes</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore all available government schemes across different sectors. Filter by category to find schemes relevant to your needs.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Alert variant="success" className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border border-green-100 hover:shadow-md transition-shadow duration-300">
          <Brain className="h-5 w-5 text-primary" />
          <AlertTitle>Get Personalized Recommendations</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              Take our eligibility test to discover schemes that match your profile and have a higher chance of approval.
            </p>
            <Button asChild size="sm" className="mt-2 transition-transform hover:translate-y-[-2px]">
              <Link to="/eligibility-test" className="flex items-center gap-1">
                Take Eligibility Test
                <ArrowRight size={14} />
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      </motion.div>
    </>
  );
};

export default SchemesHeader;
