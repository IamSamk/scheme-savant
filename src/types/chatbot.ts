
export interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isSpeaking?: boolean;
}

// Language to voice mapping for TTS
export const languageVoices = {
  en: "Roger", // English
  hi: "Aria",  // Hindi
  ta: "Sarah", // Tamil
  te: "Callum" // Telugu
};

// Predefined responses for better fuzzy matching
export const predefinedResponses = [
  {
    patterns: ["hello", "hi", "hey", "greetings", "howdy"],
    response: "Hello! I'm your AI assistant for government schemes. How can I help you today?"
  },
  {
    patterns: ["agriculture scheme", "farming scheme", "farm support", "farmer assistance"],
    response: "For agriculture, you might be eligible for PM-KISAN which provides income support to farmers, or the Agriculture Infrastructure Fund which offers subsidized loans for agriculture projects."
  },
  {
    patterns: ["education scholarship", "study grant", "school funding", "college fee"],
    response: "There are several education schemes you might qualify for, including the National Scholarship Portal schemes and the Post-Matric Scholarship for SC/ST students."
  },
  {
    patterns: ["business loan", "startup funding", "entrepreneur support", "msme credit"],
    response: "For business financing, check the Pradhan Mantri MUDRA Yojana for small business loans, or the Startup India Seed Fund scheme for new ventures."
  },
  {
    patterns: ["healthcare scheme", "medical insurance", "health coverage", "hospital benefit"],
    response: "You might be eligible for Ayushman Bharat which provides health insurance coverage, or the Pradhan Mantri Jan Arogya Yojana (PM-JAY) for hospital treatments."
  },
  {
    patterns: ["housing scheme", "home loan", "affordable housing", "property subsidy"],
    response: "For housing assistance, look into the Pradhan Mantri Awas Yojana (PMAY) which offers affordable housing, or the Credit Linked Subsidy Scheme for home loans."
  },
  {
    patterns: ["elderly scheme", "senior citizen", "old age benefit", "pension plan"],
    response: "Senior citizens can benefit from the National Pension Scheme, Pradhan Mantri Vaya Vandana Yojana, or the Indira Gandhi National Old Age Pension Scheme."
  },
  {
    patterns: ["women scheme", "female entrepreneur", "girl education", "women empowerment"],
    response: "Women-focused schemes include Mahila Shakti Kendra for empowerment, the Mahila E-Haat for business, and Beti Bachao Beti Padhao for girl child education."
  },
  {
    patterns: ["disability benefit", "differently abled", "special needs", "disability assistance"],
    response: "Persons with disabilities may qualify for the Assistance to Disabled Persons scheme, scholarships under the National Handicapped Finance and Development Corporation, or various accessible India campaign benefits."
  },
  {
    patterns: ["how to apply", "application process", "registration steps", "form submission"],
    response: "Most government schemes have online application processes. You'll typically need to create an account on the scheme's portal, fill out the application form, upload required documents, and submit. I can help with specific schemes if you name one."
  }
];
