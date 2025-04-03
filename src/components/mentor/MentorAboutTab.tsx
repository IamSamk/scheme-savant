
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AIMentorSuggestions } from "@/components/AIMentorSuggestions";

interface MentorAboutTabProps {
  mentorId: string;
  bioDetails?: string;
  description: string;
  specialization: string[];
}

const MentorAboutTab: React.FC<MentorAboutTabProps> = ({ 
  mentorId, 
  bioDetails, 
  description,
  specialization
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-3">Biography</h2>
          <p className="text-muted-foreground">{bioDetails || description}</p>
        </CardContent>
      </Card>
      
      <AIMentorSuggestions mentorId={mentorId} specialization={specialization} />
    </div>
  );
};

export default MentorAboutTab;
