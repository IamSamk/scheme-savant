
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mentor } from "@/types/mentor";
import MentorAboutTab from "./MentorAboutTab";
import MentorCredentialsTab from "./MentorCredentialsTab";
import MentorTestimonialsTab from "./MentorTestimonialsTab";

interface MentorDetailTabsProps {
  mentor: Mentor;
}

const MentorDetailTabs: React.FC<MentorDetailTabsProps> = ({ mentor }) => {
  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="w-full grid grid-cols-3 mb-6">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="credentials">Credentials</TabsTrigger>
        <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about">
        <MentorAboutTab 
          mentorId={mentor.id}
          bioDetails={mentor.bioDetails}
          description={mentor.description}
          specialization={mentor.specialization}
        />
      </TabsContent>
      
      <TabsContent value="credentials">
        <MentorCredentialsTab 
          education={mentor.education}
          certifications={mentor.certifications}
        />
      </TabsContent>
      
      <TabsContent value="testimonials">
        <MentorTestimonialsTab testimonials={mentor.testimonials} />
      </TabsContent>
    </Tabs>
  );
};

export default MentorDetailTabs;
