
import { Mentor } from "@/types/mentor";

export const mockMentors: Mentor[] = [
  {
    id: "m1",
    name: "Dr. Aisha Sharma",
    avatar: "https://i.pravatar.cc/150?img=29",
    specialization: ["Agriculture", "Rural Development", "Subsidies"],
    experience: 15,
    languages: ["English", "Hindi", "Punjabi"],
    rating: 4.8,
    availability: ["Mon-Wed", "10:00 AM - 4:00 PM"],
    description: "Expert in agricultural subsidies and rural development programs with 15 years of experience helping farmers access government benefits.",
    phone: "+917892345610"
  },
  {
    id: "m2",
    name: "Rajesh Kumar",
    avatar: "https://i.pravatar.cc/150?img=70",
    specialization: ["Education", "Scholarships", "Student Loans"],
    experience: 12,
    languages: ["English", "Hindi", "Telugu"],
    rating: 4.6,
    availability: ["Tue-Thu", "1:00 PM - 7:00 PM"],
    description: "Education finance expert specializing in scholarship applications and government education schemes.",
    phone: "+919876543210"
  },
  {
    id: "m3",
    name: "Dr. Priya Nair",
    avatar: "https://i.pravatar.cc/150?img=5",
    specialization: ["Healthcare", "Medical Insurance", "Welfare Schemes"],
    experience: 18,
    languages: ["English", "Malayalam", "Tamil"],
    rating: 4.9,
    availability: ["Wed-Sat", "9:00 AM - 3:00 PM"],
    description: "Healthcare policy expert with deep knowledge of medical insurance and welfare schemes for disadvantaged groups.",
    phone: "+918756342198"
  },
  {
    id: "m4",
    name: "Amit Patel",
    avatar: "https://i.pravatar.cc/150?img=12",
    specialization: ["Business", "Startup Funding", "MSME Loans"],
    experience: 10,
    languages: ["English", "Gujarati", "Hindi"],
    rating: 4.7,
    availability: ["Mon-Fri", "4:00 PM - 8:00 PM"],
    description: "Business finance advisor specializing in government funding programs for startups and small businesses.",
    phone: "+917654321098"
  },
  {
    id: "m5",
    name: "Lakshmi Reddy",
    avatar: "https://i.pravatar.cc/150?img=23",
    specialization: ["Women Empowerment", "Self Help Groups", "Microfinance"],
    experience: 14,
    languages: ["English", "Telugu", "Kannada"],
    rating: 4.9,
    availability: ["Tue-Sat", "11:00 AM - 5:00 PM"],
    description: "Specialist in women-focused government schemes and self-help group formation and management.",
    phone: "+919123456780"
  }
];

export const getAllMentors = (): Mentor[] => {
  return mockMentors;
};

export const getMentorById = (id: string): Mentor | undefined => {
  return mockMentors.find(mentor => mentor.id === id);
};

export const searchMentors = (
  searchTerm: string = "", 
  specialization: string | null = null, 
  language: string | null = null
): Mentor[] => {
  let filtered = mockMentors;
  
  if (searchTerm) {
    filtered = filtered.filter(mentor => 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
      mentor.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  if (specialization) {
    filtered = filtered.filter(mentor => 
      mentor.specialization.includes(specialization)
    );
  }
  
  if (language) {
    filtered = filtered.filter(mentor => 
      mentor.languages.includes(language)
    );
  }
  
  return filtered;
};

export const getAllSpecializations = (): string[] => {
  return Array.from(new Set(mockMentors.flatMap(mentor => mentor.specialization)));
};

export const getAllLanguages = (): string[] => {
  return Array.from(new Set(mockMentors.flatMap(mentor => mentor.languages)));
};
