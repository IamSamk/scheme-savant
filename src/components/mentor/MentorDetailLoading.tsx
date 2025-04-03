
import React from "react";

const MentorDetailLoading: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-32 w-32 bg-secondary rounded-full mb-4"></div>
        <div className="h-6 w-48 bg-secondary rounded mb-4"></div>
        <div className="h-4 w-64 bg-secondary rounded"></div>
      </div>
    </div>
  );
};

export default MentorDetailLoading;
