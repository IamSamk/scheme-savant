
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Award } from "lucide-react";

interface MentorCredentialsTabProps {
  education?: string[];
  certifications?: string[];
}

const MentorCredentialsTab: React.FC<MentorCredentialsTabProps> = ({ 
  education, 
  certifications 
}) => {
  return (
    <div className="space-y-6">
      {education && education.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Education</h2>
            </div>
            <ul className="space-y-2">
              {education.map((edu, index) => (
                <li key={index} className="pl-6 border-l-2 border-secondary py-1">
                  {edu}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {certifications && certifications.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Certifications</h2>
            </div>
            <ul className="space-y-2">
              {certifications.map((cert, index) => (
                <li key={index} className="pl-6 border-l-2 border-secondary py-1">
                  {cert}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MentorCredentialsTab;
