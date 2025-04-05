
export interface SchemeRecommendation {
  id: string;
  title: string;
  description: string;
  ministry: string;
  eligibility: string[];
  deadline?: string;
  location?: string;
  matchPercentage?: number;
  imageUrl?: string;
}

// Mock data for recommendation schemes
export const recommendedSchemes = [
  {
    id: "1",
    title: "PM Kisan Samman Nidhi",
    description: "Direct income support of ₹6,000 per year to farmer families across the country.",
    ministry: "Agriculture",
    eligibility: ["Small and marginal farmers", "Land ownership documentation required", "Valid bank account"],
    deadline: "Ongoing",
    location: "All India",
    matchPercentage: 95,
    imageUrl: "/scheme-images/agriculture.jpg"
  },
  {
    id: "2",
    title: "Startup India Seed Fund",
    description: "Financial assistance for startups for proof of concept, prototype development, product trials, and market entry.",
    ministry: "Commerce & Industry",
    eligibility: ["DPIIT recognized startups", "Less than 2 years old", "Not received more than ₹10 lakh funding"],
    deadline: "Dec 31, 2023",
    location: "All India",
    matchPercentage: 88,
    imageUrl: "/scheme-images/startup.jpg"
  },
  {
    id: "3",
    title: "National Scholarship Portal",
    description: "Single-window electronic platform for students to apply for various scholarships.",
    ministry: "Education",
    eligibility: ["Students enrolled in recognized institutions", "Family income below ₹8 lakh per annum", "Minimum 60% marks in previous examination"],
    deadline: "Oct 31, 2023",
    location: "All India",
    matchPercentage: 82,
    imageUrl: "/scheme-images/education.jpg"
  },
  {
    id: "4",
    title: "Jan Aushadhi Yojana",
    description: "Quality generic medicines at affordable prices for all citizens through dedicated outlets.",
    ministry: "Healthcare",
    eligibility: ["All citizens", "No specific eligibility criteria", "Available at designated Jan Aushadhi Kendras"],
    deadline: "Ongoing",
    location: "All India",
    matchPercentage: 78,
    imageUrl: "/scheme-images/healthcare.jpg"
  }
];

export const popularSchemes = [
  {
    id: "5",
    title: "Pradhan Mantri Awas Yojana",
    description: "Housing subsidy to help economically weaker sections for construction or enhancement of their houses.",
    ministry: "Housing & Urban Affairs",
    eligibility: ["EWS/LIG/MIG categories", "No house ownership in family", "First-time home buyers"],
    deadline: "Ongoing",
    location: "All India",
    matchPercentage: 70,
    imageUrl: "/scheme-images/housing.jpg"
  },
  {
    id: "6",
    title: "Atal Innovation Mission",
    description: "Establishing Atal Tinkering Labs to foster creativity among students and promote innovation ecosystem.",
    ministry: "NITI Aayog",
    eligibility: ["Educational institutions", "Corporate entities", "Individuals with innovative ideas"],
    deadline: "Varies by program",
    location: "All India",
    imageUrl: "/scheme-images/education.jpg"
  },
  {
    id: "7",
    title: "Digital India Scheme",
    description: "Transform India into a digitally empowered society and knowledge economy.",
    ministry: "Electronics & IT",
    eligibility: ["Citizens", "Government departments", "Technology companies"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/digital.jpg"
  },
  {
    id: "8",
    title: "PM Mudra Yojana",
    description: "Financial support for micro-entrepreneurs and small businesses to expand their ventures.",
    ministry: "Finance",
    eligibility: ["Small business owners", "Self-help groups", "Individuals starting micro-enterprises"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/startup.jpg"
  }
];

export const newSchemes = [
  {
    id: "9",
    title: "PM Vishwakarma Yojana",
    description: "Support for traditional artisans and craftspeople with financial assistance and skill upgradation.",
    ministry: "Skill Development",
    eligibility: ["Traditional artisans and craftspeople", "Family involved in traditional craft for generations", "Valid identity proof"],
    deadline: "March 31, 2024",
    location: "All India",
    imageUrl: "/scheme-images/rural.jpg"
  },
  {
    id: "10",
    title: "National Rural Livelihood Mission",
    description: "Creating sustainable livelihood opportunities for rural communities through skill development and financial inclusion.",
    ministry: "Rural Development",
    eligibility: ["Rural women", "BPL families", "Self-help groups"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/rural.jpg"
  },
  {
    id: "11",
    title: "Mahila Shakti Kendra",
    description: "Empowering rural women through community participation and creating an environment for positive change.",
    ministry: "Women & Child Development",
    eligibility: ["Rural women", "Women entrepreneurs", "Women's self-help groups"],
    deadline: "Ongoing",
    location: "All India",
    imageUrl: "/scheme-images/women-empowerment.jpg"
  },
  {
    id: "12",
    title: "PM Garib Kalyan Anna Yojana",
    description: "Free food grains to poor families to ensure food security during challenging times.",
    ministry: "Consumer Affairs, Food & Public Distribution",
    eligibility: ["Economically vulnerable families", "Registered under National Food Security Act", "Valid ration card holders"],
    deadline: "December 2023",
    location: "All India",
    imageUrl: "/scheme-images/rural.jpg"
  }
];
