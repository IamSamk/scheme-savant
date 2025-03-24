
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Check, Clock, Filter, Lightbulb, MapPin, Percent } from "lucide-react";

import SchemeCard from "@/components/SchemeCard";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/assets/animations";

interface SchemeResult {
  id: string;
  title: string;
  description: string;
  ministry: string;
  eligibility: string[];
  deadline?: string;
  location?: string;
  matchPercentage?: number;
}

const SchemeResults = () => {
  const [matchedSchemes, setMatchedSchemes] = useState<SchemeResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the matched schemes from sessionStorage
    const storedSchemes = sessionStorage.getItem("matchedSchemes");
    
    if (storedSchemes) {
      setMatchedSchemes(JSON.parse(storedSchemes));
    } else {
      // If no schemes are found, it means the user didn't complete the test
      navigate("/eligibility-test");
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleRetakeTest = () => {
    navigate("/eligibility-test");
  };

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Your Personalized Scheme Matches</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based on your profile, we've identified the following government schemes 
          that you may be eligible for.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20"></div>
            <div className="h-4 w-32 rounded bg-primary/20"></div>
          </div>
        </div>
      ) : matchedSchemes.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart className="text-primary" size={20} />
              <span className="font-medium">
                {matchedSchemes.length} schemes matched your profile
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleRetakeTest} className="flex items-center gap-2">
              <Filter size={14} />
              Retake Eligibility Test
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {matchedSchemes.map((scheme, index) => (
              <MotionDiv
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SchemeCard {...scheme} />
              </MotionDiv>
            ))}
          </div>
          
          <div className="bg-secondary/50 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary shrink-0">
                <Lightbulb size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                <p className="text-muted-foreground mb-4">
                  Click on any scheme to view more details and begin the application process. Our AI chatbot can also help answer any questions about these schemes.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
                    <Check size={12} />
                    <span>Eligibility Verified</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
                    <Clock size={12} />
                    <span>Application Timelines</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
                    <MapPin size={12} />
                    <span>Location-Based</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
                    <Percent size={12} />
                    <span>Match Percentage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-card rounded-xl p-8 border text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lightbulb className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-medium mb-2">No Matching Schemes Found</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            We couldn't find any schemes that match your current profile. Try adjusting your responses or explore all available schemes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleRetakeTest}>Retake Eligibility Test</Button>
            <Button variant="outline" onClick={() => navigate("/schemes")}>
              Browse All Schemes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemeResults;
