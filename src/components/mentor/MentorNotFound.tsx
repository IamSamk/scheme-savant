
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MentorNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Mentor not found</h2>
      <Button onClick={() => navigate("/mentors")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Mentors
      </Button>
    </div>
  );
};

export default MentorNotFound;
