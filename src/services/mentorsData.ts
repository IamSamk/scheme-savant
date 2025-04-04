
import { Mentor } from "@/types/mentor";

// Expanded mentor data with more entries
export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    specialization: ["Agriculture Schemes", "Rural Development"],
    experience: 12,
    languages: ["English", "Hindi", "Marathi"],
    rating: 4.9,
    availability: ["Mon-Fri, 10AM-5PM", "Sat, 10AM-1PM"],
    description: "Expert in agricultural policy and rural development schemes with over a decade of experience helping farmers access government benefits.",
    phone: "+91 98765 43210",
    email: "priya.sharma@example.com",
    bioDetails: "Dr. Sharma has helped over 5,000 farmers secure funding and subsidies through various government schemes. She specializes in sustainable agriculture initiatives and women farmer empowerment programs.",
    certifications: ["Ph.D in Agricultural Economics", "Certified Policy Advisor", "Rural Development Expert"],
    testimonials: [
      {
        id: "t1",
        name: "Rajesh Kumar",
        text: "Dr. Sharma helped my village access irrigation subsidies that transformed our farming practices. Highly recommended!",
        rating: 5
      },
      {
        id: "t2",
        name: "Meena Devi",
        text: "Thanks to her guidance, I was able to start my own business under the rural entrepreneurship scheme.",
        rating: 4.8
      }
    ],
    education: ["Ph.D in Agricultural Economics", "Masters in Rural Development", "B.Sc in Agriculture"]
  },
  {
    id: "2",
    name: "Vikram Mehta",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    specialization: ["Startup Funding", "MSME Schemes"],
    experience: 8,
    languages: ["English", "Hindi", "Gujarati"],
    rating: 4.7,
    availability: ["Mon-Fri, 9AM-6PM"],
    description: "Specializes in startup ecosystem schemes and MSME financing options with expertise in technology-driven businesses.",
    phone: "+91 98765 12345",
    email: "vikram.mehta@example.com",
    bioDetails: "Vikram has helped over 200 startups secure government funding and incentives. Previously worked with Startup India initiative and has extensive network in the entrepreneurship ecosystem.",
    certifications: ["Certified Financial Advisor", "Startup Mentor", "Business Plan Expert"],
    testimonials: [
      {
        id: "t3",
        name: "Aisha Khan",
        text: "Vikram's advice helped us navigate the complex DPIIT recognition process and secure seed funding.",
        rating: 4.5
      }
    ],
    education: ["MBA in Finance", "B.Tech in Computer Science"]
  },
  {
    id: "3",
    name: "Lakshmi Narayan",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    specialization: ["Education Scholarships", "Skill Development"],
    experience: 15,
    languages: ["English", "Tamil", "Telugu", "Malayalam"],
    rating: 4.8,
    availability: ["Tue-Sat, 11AM-7PM"],
    description: "Education policy expert specializing in scholarship programs and skill development initiatives for students and young professionals.",
    phone: "+91 98765 98765",
    email: "lakshmi.n@example.com",
    bioDetails: "Lakshmi has guided thousands of students through scholarship applications and skill development programs. She focuses on bridging the gap between education and employability through government initiatives.",
    certifications: ["Education Policy Advisor", "Career Counselor", "Skill Development Trainer"],
    testimonials: [
      {
        id: "t4",
        name: "Rohit Verma",
        text: "Ms. Narayan helped me secure a full scholarship for my postgraduate studies. Forever grateful!",
        rating: 5
      }
    ],
    education: ["Masters in Education Policy", "B.A in Sociology"]
  },
  {
    id: "4",
    name: "Dr. Anand Krishnan",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg",
    specialization: ["Healthcare Schemes", "Medical Insurance"],
    experience: 20,
    languages: ["English", "Hindi", "Bengali"],
    rating: 4.9,
    availability: ["Mon-Thu, 9AM-3PM"],
    description: "Healthcare policy expert with focus on Ayushman Bharat and other medical insurance schemes for underserved communities.",
    phone: "+91 99876 54321",
    email: "dr.anand@example.com",
    bioDetails: "Dr. Krishnan has worked extensively on healthcare access for marginalized communities. He has conducted over 100 workshops on medical insurance schemes and patient rights.",
    certifications: ["MD in Community Medicine", "Health Policy Advisor", "Public Health Specialist"],
    testimonials: [
      {
        id: "t5",
        name: "Sunita Devi",
        text: "Dr. Anand's guidance helped my entire family get enrolled in Ayushman Bharat. His knowledge is impressive.",
        rating: 4.9
      }
    ],
    education: ["MD in Community Medicine", "MBBS"]
  },
  {
    id: "5",
    name: "Rajiv Malhotra",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    specialization: ["Housing Schemes", "Urban Development"],
    experience: 14,
    languages: ["English", "Hindi", "Punjabi"],
    rating: 4.6,
    availability: ["Mon-Fri, 10AM-4PM", "Sat (Alternating), 10AM-1PM"],
    description: "Urban development expert specializing in affordable housing schemes and property-related government initiatives.",
    phone: "+91 98123 45678",
    email: "rajiv.m@example.com",
    bioDetails: "Rajiv has worked with multiple state governments on housing policy implementation. He specializes in PMAY and other affordable housing initiatives for urban and semi-urban areas.",
    certifications: ["Urban Planning Certification", "Real Estate Advisor", "Housing Policy Expert"],
    testimonials: [
      {
        id: "t6",
        name: "Prakash Singh",
        text: "Mr. Malhotra helped us navigate the complex PMAY application process and secure our first home.",
        rating: 4.7
      }
    ],
    education: ["Masters in Urban Planning", "B.Arch"]
  },
  {
    id: "6",
    name: "Sunita Joshi",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    specialization: ["Women Empowerment", "Microfinance"],
    experience: 10,
    languages: ["English", "Hindi", "Marathi", "Gujarati"],
    rating: 4.8,
    availability: ["Wed-Sun, 11AM-6PM"],
    description: "Specialist in women empowerment schemes, microfinance initiatives, and self-help group formation and management.",
    phone: "+91 97654 32109",
    email: "sunita.j@example.com",
    bioDetails: "Sunita has helped establish over 200 women's self-help groups across multiple states. She specializes in connecting women entrepreneurs with government schemes and microfinance opportunities.",
    certifications: ["Women Entrepreneurship Mentor", "Microfinance Specialist", "SHG Formation Expert"],
    testimonials: [
      {
        id: "t7",
        name: "Geeta Kumari",
        text: "Sunita's guidance transformed our small self-help group into a successful micro-enterprise. Her knowledge of schemes is exceptional.",
        rating: 4.8
      }
    ],
    education: ["MBA in Social Entrepreneurship", "BA in Economics"]
  },
  {
    id: "7",
    name: "Mohammad Hussain",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    specialization: ["Minority Schemes", "Education Scholarships"],
    experience: 12,
    languages: ["English", "Hindi", "Urdu", "Arabic"],
    rating: 4.7,
    availability: ["Mon-Fri, 2PM-8PM", "Sat, 10AM-2PM"],
    description: "Expert in minority welfare schemes, scholarships, and skill development programs for underrepresented communities.",
    phone: "+91 96543 21098",
    email: "mohammad.h@example.com",
    bioDetails: "Mohammad has guided thousands of students from minority communities to access educational scholarships and skill development opportunities. He conducts regular awareness workshops in underserved areas.",
    certifications: ["Minority Welfare Advisor", "Education Counselor", "Community Development Expert"],
    testimonials: [
      {
        id: "t8",
        name: "Salma Khan",
        text: "Mr. Hussain's guidance helped my children secure scholarships that made their education possible. Eternally grateful.",
        rating: 4.9
      }
    ],
    education: ["Masters in Social Work", "B.Com"]
  },
  {
    id: "8",
    name: "Dr. Kiran Bedi",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    specialization: ["Digital Literacy", "E-Governance"],
    experience: 18,
    languages: ["English", "Hindi", "Kannada"],
    rating: 4.5,
    availability: ["Mon-Thu, 10AM-6PM"],
    description: "Specializes in digital literacy initiatives, e-governance schemes, and technology adoption for rural communities.",
    phone: "+91 95432 10987",
    email: "dr.kiran@example.com",
    bioDetails: "Dr. Bedi has worked extensively on bridging the digital divide in rural India. She has implemented several digital literacy programs under various government initiatives and helps citizens access e-governance services.",
    certifications: ["Digital Transformation Expert", "E-Governance Specialist", "Ph.D in Information Technology"],
    testimonials: [
      {
        id: "t9",
        name: "Ramesh Patel",
        text: "Dr. Kiran helped our village get connected to digital services and taught us how to use them effectively.",
        rating: 4.6
      }
    ],
    education: ["Ph.D in Information Technology", "M.Tech in Computer Science", "B.Tech in Electronics"]
  }
];

// Helper functions for mentor data
export const getAllMentors = (): Mentor[] => {
  return mentors;
};

export const getMentorById = (id: string): Mentor | undefined => {
  return mentors.find(mentor => mentor.id === id);
};

export const getAllSpecializations = (): string[] => {
  const specializations = new Set<string>();
  mentors.forEach(mentor => {
    mentor.specialization.forEach(spec => {
      specializations.add(spec);
    });
  });
  return Array.from(specializations).sort();
};

export const getAllLanguages = (): string[] => {
  const languages = new Set<string>();
  mentors.forEach(mentor => {
    mentor.languages.forEach(lang => {
      languages.add(lang);
    });
  });
  return Array.from(languages).sort();
};

export const searchMentors = (
  searchTerm: string,
  specialization: string | null,
  language: string | null
): Mentor[] => {
  return mentors.filter(mentor => {
    const matchesSearch = !searchTerm || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.specialization.some(spec => 
        spec.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesSpecialization = !specialization || 
      mentor.specialization.some(spec => spec === specialization);
    
    const matchesLanguage = !language || 
      mentor.languages.some(lang => lang === language);
    
    return matchesSearch && matchesSpecialization && matchesLanguage;
  });
};
