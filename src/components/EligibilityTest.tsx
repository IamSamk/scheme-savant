
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  Brain, 
  User, 
  BadgeDollarSign, 
  GraduationCap, 
  Target
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import DocumentVerification, { VerificationResult } from "@/components/DocumentVerification";

// Define types for icon properties
type IconType = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;

// Define the sections with proper typing for icons
const sections = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us about yourself so we can find relevant schemes for you.",
    icon: User as IconType
  },
  {
    id: "income",
    title: "Income & Employment",
    description: "Your financial information helps us match you with suitable financial assistance schemes.",
    icon: BadgeDollarSign as IconType
  },
  {
    id: "education",
    title: "Education",
    description: "Information about your education for scholarship and educational assistance schemes.",
    icon: GraduationCap as IconType
  },
  {
    id: "documents",
    title: "Document Verification",
    description: "Upload your documents for AI-based verification to speed up your application process.",
    icon: FileText as IconType
  },
  {
    id: "interests",
    title: "Interests & Goals",
    description: "Tell us about your goals so we can match you with relevant skill development schemes.",
    icon: Target as IconType
  }
];

// Define document verification type
interface DocumentVerificationState {
  aadhaar?: VerificationResult;
  pan?: VerificationResult;
  income?: VerificationResult;
  education?: VerificationResult;
  address?: VerificationResult;
}

const formSchema = z.object({
  // Personal Information
  fullName: z.string().min(3, { message: "Name must be at least 3 characters." }),
  age: z.coerce.number().min(18, { message: "You must be at least 18 years old." }).max(100),
  gender: z.enum(["male", "female", "other"]),
  location: z.string().min(2, { message: "Please enter a valid location." }),
  category: z.enum(["general", "obc", "sc", "st", "other"]),
  
  // Income & Employment
  employmentStatus: z.enum(["employed", "self-employed", "unemployed", "student"]),
  annualIncome: z.coerce.number().min(0),
  familySize: z.coerce.number().min(1).max(15),
  
  // Education
  educationLevel: z.enum(["primary", "secondary", "undergraduate", "graduate", "postgraduate", "doctorate"]),
  fieldOfStudy: z.string().optional(),
  
  // Interests & Goals
  interests: z.array(z.string()).optional(),
  goals: z.enum(["employment", "skill-development", "education", "entrepreneurship", "housing", "healthcare"]),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  gender: "male",
  category: "general",
  employmentStatus: "employed",
  annualIncome: 0,
  familySize: 1,
  educationLevel: "undergraduate",
  goals: "employment",
  interests: [],
};

const interestOptions = [
  { id: "agriculture", label: "Agriculture" },
  { id: "technology", label: "Technology" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "entrepreneurship", label: "Entrepreneurship" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "renewable-energy", label: "Renewable Energy" },
];

const EligibilityTest = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(20);
  const [aiAnalysisComplete, setAiAnalysisComplete] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState("");
  const [documentVerifications, setDocumentVerifications] = useState<DocumentVerificationState>({});
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  const nextSection = () => {
    const currentSectionId = sections[currentSection].id;
    
    // Validate the current section before proceeding
    switch (currentSectionId) {
      case "personal":
        if (!form.trigger(["fullName", "age", "gender", "location", "category"])) return;
        break;
      case "income":
        if (!form.trigger(["employmentStatus", "annualIncome", "familySize"])) return;
        break;
      case "education":
        if (!form.trigger(["educationLevel"])) return;
        break;
      case "documents":
        // Check if at least one document is verified
        if (Object.keys(documentVerifications).length === 0) {
          toast.warning("Please verify at least one document before proceeding");
          return;
        }
        break;
      case "interests":
        if (!form.trigger(["goals"])) return;
        break;
    }
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setProgress(((currentSection + 2) / sections.length) * 100);
    }
  };
  
  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setProgress(((currentSection) / sections.length) * 100);
    }
  };

  const handleDocumentVerification = (type: keyof DocumentVerificationState, result: VerificationResult) => {
    setDocumentVerifications(prev => ({
      ...prev,
      [type]: result
    }));

    // Run AI analysis if at least two documents are verified
    if (Object.keys(documentVerifications).length >= 1 || result.verified) {
      simulateAiAnalysis();
    }
  };

  const simulateAiAnalysis = () => {
    toast.info("AI is analyzing your profile and documents...");
    
    setTimeout(() => {
      const recommendations = [
        "Based on your income level and location, you have a 92% match with PM Kisan Samman Nidhi scheme.",
        "Your education profile indicates high eligibility for National Scholarship Portal schemes.",
        "With your entrepreneurship goals, we recommend applying for the Startup India Seed Fund.",
        "Your profile shows strong alignment with skill development programs under the Pradhan Mantri Kaushal Vikas Yojana."
      ];
      
      setAiRecommendation(recommendations[Math.floor(Math.random() * recommendations.length)]);
      setAiAnalysisComplete(true);
      
      toast.success("AI analysis complete! We've identified potential schemes for you.");
    }, 3000);
  };
  
  const onSubmit = (data: FormValues) => {
    // Show loading toast
    toast.loading("Processing your information...");
    
    // Simulate analysis (in a real app, this would be done on the server)
    setTimeout(() => {
      toast.dismiss();
      
      // This would typically be sent to an API for analysis
      console.log("Form submission:", data);
      console.log("Document verifications:", documentVerifications);
      
      const matchedSchemes = analyzeEligibility(data, documentVerifications);
      
      // Save matched schemes to sessionStorage
      sessionStorage.setItem("matchedSchemes", JSON.stringify(matchedSchemes));
      
      toast.success("Eligibility test completed!");
      
      // Redirect to results page
      navigate("/scheme-results");
    }, 2000);
  };
  
  // Enhanced eligibility analyzer with AI components
  const analyzeEligibility = (data: FormValues, documentData: DocumentVerificationState) => {
    const matchedSchemes = [];
    const verifiedIncome = documentData.income?.verified;
    const verifiedIdentity = documentData.aadhaar?.verified || documentData.pan?.verified;
    
    // Income-based schemes - higher confidence with verified documents
    if (data.annualIncome < 250000) {
      const confidenceBoost = verifiedIncome ? 8 : 0;
      matchedSchemes.push({
        id: "1",
        title: "PM Kisan Samman Nidhi",
        description: "Direct income support of ₹6,000 per year to farmer families across the country.",
        ministry: "Agriculture",
        eligibility: ["Small and marginal farmers", "Land ownership documentation required", "Valid bank account"],
        deadline: "Ongoing",
        location: "All India",
        matchPercentage: 92 + confidenceBoost
      });
    }
    
    // Education-based schemes - Always add education schemes regardless of education level
    const educationConfidenceBoost = documentData.education?.verified ? 5 : 0;
    matchedSchemes.push({
      id: "3",
      title: "National Scholarship Portal",
      description: "Single-window electronic platform for students to apply for various scholarships.",
      ministry: "Education",
      eligibility: ["Students enrolled in recognized institutions", "Family income below ₹8 lakh per annum", "Minimum 60% marks in previous examination"],
      deadline: "Oct 31, 2025",
      location: "All India",
      matchPercentage: 85 + educationConfidenceBoost
    });
    
    // Entrepreneurship schemes - Always add entrepreneurship schemes
    matchedSchemes.push({
      id: "2",
      title: "Startup India Seed Fund",
      description: "Financial assistance for startups for proof of concept, prototype development, product trials, and market entry.",
      ministry: "Commerce & Industry",
      eligibility: ["DPIIT recognized startups", "Less than 2 years old", "Not received more than ₹10 lakh funding"],
      deadline: "Dec 31, 2025",
      location: "All India",
      matchPercentage: 90
    });
    
    // Add housing schemes - Always add housing schemes
    const housingConfidenceBoost = verifiedIdentity ? 4 : 0;
    matchedSchemes.push({
      id: "4",
      title: "Pradhan Mantri Awas Yojana",
      description: "Housing subsidy to help economically weaker sections for construction or enhancement of their houses.",
      ministry: "Housing & Urban Affairs",
      eligibility: ["EWS/LIG/MIG categories", "No house ownership in family", "First-time home buyers"],
      deadline: "Ongoing",
      location: "All India",
      matchPercentage: 94 + housingConfidenceBoost
    });
    
    // Women-specific schemes
    if (data.gender === "female") {
      const confidenceBoost = verifiedIdentity ? 6 : 0;
      matchedSchemes.push({
        id: "7",
        title: "Mahila Shakti Kendra Scheme",
        description: "Empowerment of rural women through community participation and awareness generation.",
        ministry: "Women & Child Development",
        eligibility: ["Rural women", "Above 18 years of age"],
        deadline: "Ongoing",
        location: "All India",
        matchPercentage: 87 + confidenceBoost
      });
    }
    
    // Additional schemes for everyone
    matchedSchemes.push({
      id: "8",
      title: "Skill India Mission",
      description: "National initiative to train over 400 million people in different skills by 2022.",
      ministry: "Skill Development and Entrepreneurship",
      eligibility: ["Age group 15-59", "Indian citizens", "Willingness to enhance skills"],
      deadline: "Ongoing",
      location: "All India",
      matchPercentage: 88
    });
    
    matchedSchemes.push({
      id: "9",
      title: "Digital India Program",
      description: "Campaign to ensure government services are made available to citizens electronically.",
      ministry: "Electronics and Information Technology",
      eligibility: ["All citizens", "Digital literacy"],
      deadline: "Ongoing",
      location: "All India",
      matchPercentage: 95
    });
    
    matchedSchemes.push({
      id: "10",
      title: "Ayushman Bharat Yojana",
      description: "Health insurance scheme to provide coverage of up to ₹5 lakh per family per year.",
      ministry: "Health and Family Welfare",
      eligibility: ["Economically disadvantaged families", "Based on SECC database"],
      deadline: "Ongoing",
      location: "All India",
      matchPercentage: 91
    });
    
    // Sort schemes by match percentage
    return matchedSchemes.sort((a, b) => b.matchPercentage - a.matchPercentage);
  };
  
  const CurrentSectionIcon = sections[currentSection].icon;
  
  return (
    <div className="container max-w-3xl mx-auto py-10 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Eligibility Test</h1>
        <p className="text-muted-foreground">
          Answer a few questions to find government schemes that match your profile
        </p>
      </div>
      
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>Step {currentSection + 1} of {sections.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>
      
      <div className="bg-card border rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <CurrentSectionIcon className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">{sections[currentSection].title}</h2>
          </div>
          <p className="text-muted-foreground mt-2">{sections[currentSection].description}</p>
          <Separator className="mt-4" />
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            {currentSection === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex space-x-6">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <FormLabel htmlFor="male" className="font-normal cursor-pointer">Male</FormLabel>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <FormLabel htmlFor="female" className="font-normal cursor-pointer">Female</FormLabel>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="other" id="other" />
                                <FormLabel htmlFor="other" className="font-normal cursor-pointer">Other</FormLabel>
                              </div>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (State)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your state" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your state of residence helps us find location-specific schemes
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social Category</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          {[
                            { value: "general", label: "General" },
                            { value: "obc", label: "OBC" },
                            { value: "sc", label: "SC" },
                            { value: "st", label: "ST" },
                            { value: "other", label: "Other" },
                          ].map((category) => (
                            <div key={category.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={category.value} id={category.value} />
                              <FormLabel htmlFor={category.value} className="font-normal cursor-pointer">
                                {category.label}
                              </FormLabel>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        Some schemes are specifically designed for certain social categories
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            {/* Income & Employment Section */}
            {currentSection === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="employmentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          {[
                            { value: "employed", label: "Employed" },
                            { value: "self-employed", label: "Self-Employed" },
                            { value: "unemployed", label: "Unemployed" },
                            { value: "student", label: "Student" },
                          ].map((status) => (
                            <div key={status.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={status.value} id={status.value} />
                              <FormLabel htmlFor={status.value} className="font-normal cursor-pointer">
                                {status.label}
                              </FormLabel>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="annualIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Income (in ₹)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Many schemes have income-based eligibility criteria
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="familySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Family Members</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={15} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            {/* Education Section */}
            {currentSection === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="educationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education Level</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {[
                            { value: "primary", label: "Primary Education" },
                            { value: "secondary", label: "Secondary Education" },
                            { value: "undergraduate", label: "Undergraduate" },
                            { value: "graduate", label: "Graduate" },
                            { value: "postgraduate", label: "Postgraduate" },
                            { value: "doctorate", label: "Doctorate" },
                          ].map((level) => (
                            <div key={level.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={level.value} id={level.value} />
                              <FormLabel htmlFor={level.value} className="font-normal cursor-pointer">
                                {level.label}
                              </FormLabel>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fieldOfStudy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field of Study (if applicable)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Engineering, Medical, Arts" {...field} />
                      </FormControl>
                      <FormDescription>
                        Some scholarships are specific to certain fields of study
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Document Verification Section */}
            {currentSection === 3 && (
              <div className="space-y-6">
                <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                  <Brain className="h-4 w-4 text-blue-500" />
                  <AlertTitle>AI-Powered Document Verification</AlertTitle>
                  <AlertDescription>
                    Our AI system will analyze your documents to extract information, detect fraud, and speed up your application process. 
                    All uploads are encrypted and securely processed.
                  </AlertDescription>
                </Alert>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-md font-medium">Identity Documents</h3>
                    <DocumentVerification 
                      documentType="aadhaar" 
                      onVerificationComplete={(result) => handleDocumentVerification("aadhaar", result)} 
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-md font-medium">Income Proof</h3>
                    <DocumentVerification 
                      documentType="income" 
                      onVerificationComplete={(result) => handleDocumentVerification("income", result)} 
                    />
                  </div>

                  {form.watch("educationLevel") !== "primary" && (
                    <div className="space-y-3">
                      <h3 className="text-md font-medium">Education Certificate</h3>
                      <DocumentVerification 
                        documentType="education" 
                        onVerificationComplete={(result) => handleDocumentVerification("education", result)} 
                      />
                    </div>
                  )}
                </div>

                {aiAnalysisComplete && (
                  <Alert variant="success" className="mt-6">
                    <Brain className="h-4 w-4" />
                    <AlertTitle>AI Analysis Complete</AlertTitle>
                    <AlertDescription>
                      <p className="mb-2">{aiRecommendation}</p>
                      <p className="text-sm">This preliminary assessment is based on your profile and verified documents.</p>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
            
            {/* Interests & Goals Section */}
            {currentSection === 4 && (
              <>
                <FormField
                  control={form.control}
                  name="interests"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Areas of Interest</FormLabel>
                        <FormDescription>
                          Select all that apply to you
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {interestOptions.map((interest) => (
                          <FormField
                            key={interest.id}
                            control={form.control}
                            name="interests"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={interest.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(interest.id)}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || [];
                                        return checked
                                          ? field.onChange([...currentValue, interest.id])
                                          : field.onChange(
                                              currentValue.filter((value) => value !== interest.id)
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {interest.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Goal</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {[
                            { value: "employment", label: "Finding Employment" },
                            { value: "skill-development", label: "Skill Development" },
                            { value: "education", label: "Further Education" },
                            { value: "entrepreneurship", label: "Starting a Business" },
                            { value: "housing", label: "Housing Assistance" },
                            { value: "healthcare", label: "Healthcare Support" },
                          ].map((goal) => (
                            <div key={goal.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={goal.value} id={goal.value} />
                              <FormLabel htmlFor={goal.value} className="font-normal cursor-pointer">
                                {goal.label}
                              </FormLabel>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional information that might be relevant for scheme eligibility..."
                          className="resize-none h-20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            <div className="flex justify-between mt-8">
              {currentSection > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevSection}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Previous
                </Button>
              ) : (
                <div></div> // Empty div for spacing
              )}
              
              {currentSection < sections.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextSection}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex items-center gap-2"
                >
                  Submit
                  <ArrowRight size={16} />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EligibilityTest;
