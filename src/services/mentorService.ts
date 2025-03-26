
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
    phone: "+917892345610",
    email: "aisha.sharma@example.com",
    bioDetails: "Dr. Aisha Sharma has dedicated her career to helping farmers and rural communities access government support programs. With a Ph.D. in Agricultural Economics and extensive fieldwork across northern India, she has helped over 500 farmers successfully navigate complex subsidy applications and rural development schemes. Her approach combines practical knowledge with academic expertise, making government programs accessible to those who need them most.",
    education: [
      "Ph.D. in Agricultural Economics, Punjab Agricultural University",
      "M.Sc. in Rural Development, Delhi University",
      "B.Sc. in Agriculture, Haryana Agricultural University"
    ],
    certifications: [
      "Certified Agricultural Finance Specialist",
      "Government Schemes Implementation Expert",
      "Rural Development Program Manager"
    ],
    testimonials: [
      {
        id: "t1",
        name: "Rajinder Singh",
        text: "Dr. Sharma helped me navigate the PM-KISAN scheme application process. My family received crucial financial support that helped us invest in better seeds and equipment.",
        rating: 5
      },
      {
        id: "t2",
        name: "Geeta Devi",
        text: "Without Dr. Sharma's guidance, I would never have known about the special provisions for women farmers. Her expertise changed my life.",
        rating: 5
      },
      {
        id: "t3",
        name: "Mohinder Pal",
        text: "Very knowledgeable about agricultural subsidies. Helped me get funding for drip irrigation.",
        rating: 4
      }
    ]
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
    phone: "+919876543210",
    email: "rajesh.kumar@example.com",
    bioDetails: "Rajesh Kumar has been helping students from disadvantaged backgrounds access education funding for over a decade. After working in the Ministry of Education for 8 years, he now dedicates his time to guiding students through the complex landscape of scholarships, grants, and educational loans. His insider knowledge of government processes has helped thousands of students pursue their educational dreams.",
    education: [
      "M.Ed. in Educational Administration, University of Delhi",
      "B.Ed. from Osmania University",
      "B.A. in Public Administration, Hyderabad Central University"
    ],
    certifications: [
      "Certified Educational Financial Advisor",
      "Career Counseling Certification",
      "National Scholarship Portal Expert"
    ],
    testimonials: [
      {
        id: "t1",
        name: "Priya Sharma",
        text: "Mr. Kumar helped me secure a full scholarship for my engineering degree. His guidance was invaluable throughout the application process.",
        rating: 5
      },
      {
        id: "t2",
        name: "Arjun Reddy",
        text: "Thanks to Mr. Kumar, I could navigate the complex scholarship application process and focus on my studies instead of worrying about finances.",
        rating: 4
      }
    ]
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
    phone: "+918756342198",
    email: "priya.nair@example.com",
    bioDetails: "Dr. Priya Nair combines her medical expertise with an in-depth understanding of healthcare policy to help patients navigate India's complex healthcare system. With 18 years of experience as both a practicing physician and a policy advisor, she specializes in connecting patients with government health programs, insurance schemes, and welfare benefits. Her work focuses particularly on ensuring healthcare access for economically disadvantaged communities across southern India.",
    education: [
      "MBBS, Medical College Trivandrum",
      "MD in Community Medicine, Christian Medical College Vellore",
      "Diploma in Health Policy and Management, TISS Mumbai"
    ],
    certifications: [
      "Certified Healthcare Policy Specialist",
      "Ayushman Bharat Implementation Expert",
      "Public Health Program Evaluator"
    ],
    testimonials: [
      {
        id: "t1",
        name: "Lakshmi Iyer",
        text: "Dr. Nair helped my elderly parents access the Ayushman Bharat scheme, which covered my father's heart surgery. Her knowledge saved us from financial ruin.",
        rating: 5
      },
      {
        id: "t2",
        name: "Joseph Thomas",
        text: "When I lost my job during the pandemic, Dr. Nair guided me through applying for healthcare support. Her compassion and expertise were exactly what I needed.",
        rating: 5
      },
      {
        id: "t3",
        name: "Meena Krishnan",
        text: "Very thorough understanding of healthcare schemes. Made the complex process much easier to navigate.",
        rating: 5
      }
    ]
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
    phone: "+917654321098",
    email: "amit.patel@example.com",
    bioDetails: "Amit Patel is a former banker who now specializes in helping entrepreneurs navigate government funding opportunities. With 10 years of experience in business finance, including 5 years dedicated to MSME development, he has helped over 200 businesses secure government loans, grants, and subsidies. His expertise spans the Startup India initiative, MSME support schemes, and various industry-specific funding programs.",
    education: [
      "MBA in Finance, IIM Ahmedabad",
      "B.Com from Gujarat University"
    ],
    certifications: [
      "Certified Financial Consultant",
      "MSME Funding Specialist",
      "Startup India Mentor"
    ],
    testimonials: [
      {
        id: "t1",
        name: "Vikram Mehta",
        text: "Amit's guidance helped me secure a PMEGP loan for my manufacturing business. His knowledge of the application process was exceptional.",
        rating: 5
      },
      {
        id: "t2",
        name: "Neha Shah",
        text: "As a first-time entrepreneur, I was lost in the sea of funding options. Amit helped me identify and apply for the right government schemes for my tech startup.",
        rating: 4
      }
    ]
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
    phone: "+919123456780",
    email: "lakshmi.reddy@example.com",
    bioDetails: "Lakshmi Reddy has spent 14 years empowering women through government schemes and self-help group initiatives. Starting as a grassroots organizer in rural Andhra Pradesh, she has since helped establish over 150 women's self-help groups and connected them with government support programs. Her expertise in microfinance, vocational training schemes, and women-focused subsidies has transformed thousands of lives across southern India.",
    education: [
      "M.A. in Rural Development, NIRD Hyderabad",
      "B.A. in Sociology, Andhra University"
    ],
    certifications: [
      "Certified Microfinance Trainer",
      "Self-Help Group Development Expert",
      "Gender and Development Specialist"
    ],
    testimonials: [
      {
        id: "t1",
        name: "Sunita Devi",
        text: "Lakshmi helped our village women form a self-help group and access government funds for our handicraft business. Our income has tripled since working with her.",
        rating: 5
      },
      {
        id: "t2",
        name: "Anamma K.",
        text: "Without Lakshmi's guidance, I would never have known about the special schemes for women entrepreneurs. She helped me apply for and receive a subsidized loan.",
        rating: 5
      },
      {
        id: "t3",
        name: "Padma Lakshmi",
        text: "Lakshmi's workshops on government schemes for women in business changed my perspective. Her practical approach makes complex government programs accessible.",
        rating: 5
      }
    ]
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
