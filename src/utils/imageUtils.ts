
// Collection of Unsplash images for different categories
export const categoryImages = {
  "Agriculture": "https://images.unsplash.com/photo-1628352081566-6c361fd5a595?auto=format&fit=crop&q=80",
  "Education": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80",
  "Healthcare": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
  "Health": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
  "Commerce & Industry": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80",
  "Housing & Urban Affairs": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
  "NITI Aayog": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
  "Electronics & IT": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
  "Finance": "https://images.unsplash.com/photo-1565514020179-026b92b4a5b0?auto=format&fit=crop&q=80",
  "Skill Development": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
  "MSME": "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?auto=format&fit=crop&q=80",
  "Food Processing Industries": "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80",
  "Petroleum & Natural Gas": "https://images.unsplash.com/photo-1629085264858-186e425cf660?auto=format&fit=crop&q=80",
  "Jal Shakti": "https://images.unsplash.com/photo-1468421870903-4df1664ac249?auto=format&fit=crop&q=80"
};

// Default image to use as a fallback
export const defaultImage = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80";

// For mentor avatars
export const mentorImages = [
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80"
];

// Helper function to get an image based on category
export const getImageForCategory = (category: string): string => {
  return categoryImages[category as keyof typeof categoryImages] || defaultImage;
};
