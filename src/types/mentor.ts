
export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  specialization: string[];
  experience: number;
  languages: string[];
  rating: number;
  availability: string[];
  description: string;
  phone?: string;
}
