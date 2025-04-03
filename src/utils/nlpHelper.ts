
// NLP utility functions for the chatbot

// Keyword extraction for fuzzy matching
export const extractKeywords = (text: string): string[] => {
  // Remove common stop words and split into words
  const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "with", 
    "by", "about", "as", "of", "is", "are", "am", "was", "were", "be", "been", 
    "being", "do", "does", "did", "will", "would", "shall", "should", "can", 
    "could", "may", "might", "must", "have", "has", "had", "having"
  ]);
  
  // Convert to lowercase, remove punctuation, split into words
  const words = text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
  
  return words;
};

// Calculate similarity between two strings (fuzzy matching)
export const calculateSimilarity = (text1: string, text2: string): number => {
  const keywords1 = extractKeywords(text1);
  const keywords2 = extractKeywords(text2);
  
  if (keywords1.length === 0 || keywords2.length === 0) return 0;
  
  // Count matching keywords
  let matches = 0;
  for (const word1 of keywords1) {
    for (const word2 of keywords2) {
      if (levenshteinDistance(word1, word2) <= 2) { // Allow small differences
        matches++;
        break;
      }
    }
  }
  
  // Jaccard similarity: intersection / union
  return matches / (keywords1.length + keywords2.length - matches);
};

// Levenshtein distance calculation for fuzzy string matching
export const levenshteinDistance = (str1: string, str2: string): number => {
  const track = Array(str2.length + 1).fill(null).map(() => 
    Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator, // substitution
      );
    }
  }
  
  return track[str2.length][str1.length];
};

// Predefined schema categories and related terms for better matching
export const schemeCategories = {
  agriculture: [
    "farm", "farmer", "crop", "agriculture", "farming", "soil", "irrigation", 
    "seeds", "fertilizer", "harvest", "livestock", "dairy", "fishery", "horticulture"
  ],
  education: [
    "school", "college", "university", "education", "scholarship", "student", 
    "study", "learn", "academic", "degree", "course", "tuition", "fees", 
    "teacher", "professor", "research", "phd", "doctoral", "vocational", "skill"
  ],
  healthcare: [
    "health", "medical", "hospital", "doctor", "nurse", "treatment", "medicine", 
    "surgery", "patient", "disease", "illness", "disability", "insurance", 
    "checkup", "diagnostic", "clinic", "therapy", "mental", "dental", "maternity"
  ],
  business: [
    "business", "startup", "entrepreneur", "company", "enterprise", "msme", 
    "loan", "funding", "investment", "capital", "market", "trade", "export", 
    "import", "commerce", "industry", "manufacturing", "retail", "service"
  ],
  housing: [
    "house", "home", "apartment", "rent", "housing", "property", "real estate", 
    "mortgage", "loan", "construction", "building", "shelter", "residence"
  ],
  welfare: [
    "welfare", "poverty", "poor", "income", "pension", "retirement", "senior", 
    "elderly", "disability", "benefits", "assistance", "aid", "support", 
    "subsidy", "financial help", "social security", "allowance"
  ]
};

// Function to determine which category a query might belong to
export const categorizeQuery = (query: string): string[] => {
  const keywords = extractKeywords(query);
  const categories: {[key: string]: number} = {};
  
  // Check each category for matching keywords
  for (const [category, terms] of Object.entries(schemeCategories)) {
    let matches = 0;
    for (const keyword of keywords) {
      for (const term of terms) {
        if (levenshteinDistance(keyword, term) <= 2) {
          matches++;
          break;
        }
      }
    }
    if (matches > 0) {
      categories[category] = matches;
    }
  }
  
  // Sort categories by number of matches
  return Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);
};

// Get intent of the query
export const getQueryIntent = (query: string): string => {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes("how") || queryLower.includes("steps") || 
      queryLower.includes("process") || queryLower.includes("way to")) {
    return "howto";
  }
  
  if (queryLower.includes("eligible") || queryLower.includes("qualify") || 
      queryLower.includes("criteria") || queryLower.includes("requirement")) {
    return "eligibility";
  }
  
  if (queryLower.includes("deadline") || queryLower.includes("last date") || 
      queryLower.includes("when") || queryLower.includes("date")) {
    return "deadline";
  }
  
  if (queryLower.includes("document") || queryLower.includes("paper") || 
      queryLower.includes("certificate") || queryLower.includes("proof")) {
    return "documents";
  }
  
  if (queryLower.includes("benefit") || queryLower.includes("advantage") || 
      queryLower.includes("get") || queryLower.includes("receive")) {
    return "benefits";
  }
  
  return "general";
};
