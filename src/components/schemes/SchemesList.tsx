
import { useEffect, useState } from "react";
import { MotionDiv } from "@/assets/animations";
import SchemeCard from "@/components/SchemeCard";
import { Lightbulb } from "lucide-react";

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

interface SchemesListProps {
  schemes: SchemeResult[];
}

const SchemesList: React.FC<SchemesListProps> = ({ schemes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {schemes.length > 0 ? (
        schemes.map((scheme, index) => (
          <MotionDiv
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
            }}
          >
            <SchemeCard {...scheme} />
          </MotionDiv>
        ))
      ) : (
        <div className="col-span-3 text-center py-10">
          <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No schemes found</h3>
          <p className="mt-2 text-muted-foreground">
            There are currently no schemes available in this category. Please check back later or try another category.
          </p>
        </div>
      )}
    </div>
  );
};

export default SchemesList;
