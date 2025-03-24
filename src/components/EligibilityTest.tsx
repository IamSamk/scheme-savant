import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, FileCheck, Upload, AlertTriangle, File, CheckCircle2 } from "lucide-react";

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
import { Alert, AlertDescription } from "@/components/ui/alert";
import DocumentUploader from "@/components/DocumentUploader";

const sections = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us about yourself so we can find relevant schemes for you."
  },
  {
    id: "income",
    title: "Income & Employment",
    description: "Your financial information helps us match you with suitable financial assistance schemes."
  },
  {
    id: "education",
    title: "Education",
    description: "Information about your education for scholarship and educational assistance schemes."
  },
  {
    id: "documents",
    title: "Document Verification",
    description: "Upload documents to verify your identity and eligibility for schemes."
  },
  {
    id: "interests",
    title: "Interests & Goals",
    description: "Tell us about your goals so we can match you with relevant skill development schemes."
  }
];

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
  
  // Documents
  documents: z.array(
    z.object({
      type: z.enum(["aadhaar", "pan", "income", "address", "education", "other"]),
      file: z.instanceof(File),
      verified: z.boolean().optional(),
      verificationStatus: z.enum(["pending", "verified", "rejected"]).optional(),
      extractedData: z.record(z.string()).optional(),
    })
  ).optional(),
  
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
  documents: [],
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

const documentTypes = [
  { id: "aadhaar", label: "Aadhaar Card", required: true },
  { id: "pan", label: "PAN Card", required: true },
  { id: "income", label: "Income Proof", required: false },
  { id: "address", label: "Address Proof", required: false },
  { id: "education", label: "Educational Certificates", required: false },
  { id: "other", label: "Other Documents", required: false },
];

const EligibilityTest = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(20);
  const [processingDocument, setProcessingDocument] = useState(false);
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
        // Only require documents if we've moved to that section
        const documents = form.getValues("documents") || [];
        if (documents.length === 0) {
          toast.error("Please upload at least one document");
          return;
        }
        break;
      case "interests":
        if (!form.trigger(["goals"])) return;
        break;
    }
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setProgress(progress + (100 / sections.length));
    }
  };
  
  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setProgress(progress - (100 / sections.length));
    }
  };
  
  const handleDocumentUpload = async (type: string, file: File) => {
    setProcessingDocument(true);
    
    try {
      // Simulate document processing with OCR and fraud detection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock document verification
      const verified = Math.random() > 0.2; // 80% chance of verification success
      
      // Extract data based on document type
      let extractedData = {};
      if (type === "aadhaar") {
        extractedData = {
          aadhaarNumber: "XXXX-XXXX-" + Math.floor(1000 + Math.random() * 9000),
          name: form.getValues("fullName"),
          dob: `${new Date().getFullYear() - form.getValues("age")}-01-01`,
        };
      } else if (type === "pan") {
        extractedData = {
          panNumber: "ABCDE" + Math.floor(1000 + Math.random() * 9000) + "F",
          name: form.getValues("fullName"),
        };
      } else if (type === "income") {
        extractedData = {
          income: form.getValues("annualIncome"),
          year: new Date().getFullYear() - 1,
        };
      }
      
      // Get current documents
      const currentDocuments = form.getValues("documents") || [];
      
      // Add new document
      const newDocument = {
        type: type as any,
        file,
        verified,
        verificationStatus: verified ? "verified" : "rejected",
        extractedData
      };
      
      // Update form
      form.setValue("documents", [...currentDocuments, newDocument]);
      
      if (verified) {
        toast.success(`${file.name} verified successfully`);
      } else {
        toast.error(`${file.name} verification failed`, {
          description: "The document may be unclear or tampered with. Please try uploading again.",
        });
      }
    } catch (error) {
      console.error("Document processing error:", error);
      toast.error("Failed to process document");
    } finally {
      setProcessingDocument(false);
    }
  };
  
  const getUploadedDocumentsByType = (type: string) => {
    const documents = form.getValues("documents") || [];
    return documents.filter(doc => doc.type === type);
  };
  
  const onSubmit = (data: FormValues) => {
    // AI-based eligibility assessment logic
    console.log("Form submission:", data);
    
    // Decide which algorithm to use based on user data
    const eligibilityAlgorithm = data.annualIncome < 500000 
      ? "financial-priority" 
      : data.educationLevel === "undergraduate" || data.educationLevel === "graduate"
        ? "education-priority"
        : "general-priority";
        
    console.log("Using eligibility algorithm:", eligibilityAlgorithm);
    
    // Analyze documents for compliance and fraud detection
    const documents = data.documents || [];
    const verifiedDocuments = documents.filter(doc => doc.verified);
    const documentComplianceScore = (verifiedDocuments.length / Math.max(documents.length, 1)) * 100;
    
    console.log("Document compliance score:", documentComplianceScore);
    
    // Use AI to generate personalized scheme matches
    const matchedSchemes = analyzeEligibility(data, eligibilityAlgorithm, documentComplianceScore);
    
    // Calculate success probability for each scheme
    const schemesWithProbability = matchedSchemes.map(scheme => ({
      ...scheme,
      successProbability: calculateSuccessProbability(data, scheme)
    }));
    
    // Save matched schemes to sessionStorage
    sessionStorage.setItem("matchedSchemes", JSON.stringify(schemesWithProbability));
    
    toast.success("Eligibility test completed!");
    
    // Redirect to results page
    navigate("/scheme-results");
  };
  
  // Enhanced eligibility analyzer with multiple algorithms
  const analyzeEligibility = (data: FormValues, algorithm: string, documentComplianceScore: number) => {
    // Base schemes that everyone might qualify for
    const baseSchemes = [
      {
        id: "4",
        title: "Pradhan Mantri Awas Yojana",
        description: "Housing subsidy to help economically weaker sections for construction or enhancement of their houses.",
        ministry: "Housing & Urban Affairs",
        eligibility: ["EWS/LIG/MIG categories", "No house ownership in family", "First-time home buyers"],
        deadline: "Ongoing",
        location: "All India",
        matchPercentage: 70 + (data.goals === "housing" ? 25 : 0)
      }
    ];
    
    // Algorithm specific schemes
    let algorithmSchemes = [];
    
    // Financial priority algorithm - for lower income groups
    if (algorithm === "financial-priority") {
      algorithmSchemes = [
        {
          id: "1",
          title: "PM Kisan Samman Nidhi",
          description: "Direct income support of ₹6,000 per year to farmer families across the country.",
          ministry: "Agriculture",
          eligibility: ["Small and marginal farmers", "Land ownership documentation required", "Valid bank account"],
          deadline: "Ongoing",
          location: "All India",
          matchPercentage: 80 + (data.interests?.includes("agriculture") ? 15 : 0)
        },
        {
          id: "5",
          title: "National Social Assistance Programme",
          description: "Financial assistance to elderly, widows and persons with disabilities in the form of pensions.",
          ministry: "Rural Development",
          eligibility: ["Below Poverty Line", "Age above 60 years (for old age pension)", "Valid identity proof"],
          deadline: "Ongoing",
          location: "All India",
          matchPercentage: 85
        }
      ];
    }
    
    // Education priority algorithm
    else if (algorithm === "education-priority") {
      algorithmSchemes = [
        {
          id: "3",
          title: "National Scholarship Portal",
          description: "Single-window electronic platform for students to apply for various scholarships.",
          ministry: "Education",
          eligibility: ["Students enrolled in recognized institutions", "Family income below ₹8 lakh per annum", "Minimum 60% marks in previous examination"],
          deadline: "Oct 31, 2023",
          location: "All India",
          matchPercentage: 90 - (data.annualIncome > 300000 ? 10 : 0)
        },
        {
          id: "6",
          title: "Prime Minister's Research Fellowship",
          description: "Fellowship program designed for direct admission to Ph.D programs in top institutes.",
          ministry: "Education",
          eligibility: ["Students from IITs, IISc, NITs, IISERs", "GATE/NET qualified", "Research proposal"],
          deadline: "Dec 31, 2023",
          location: "All India",
          matchPercentage: data.educationLevel === "postgraduate" ? 88 : 60
        }
      ];
    }
    
    // General priority algorithm
    else {
      algorithmSchemes = [
        {
          id: "2",
          title: "Startup India Seed Fund",
          description: "Financial assistance for startups for proof of concept, prototype development, product trials, and market entry.",
          ministry: "Commerce & Industry",
          eligibility: ["DPIIT recognized startups", "Less than 2 years old", "Not received more than ₹10 lakh funding"],
          deadline: "Dec 31, 2023",
          location: "All India",
          matchPercentage: (data.goals === "entrepreneurship" || (data.interests && data.interests.includes("entrepreneurship"))) ? 92 : 65
        },
        {
          id: "7",
          title: "Skill India Mission",
          description: "Skills training for youth to enhance employability and entrepreneurial abilities.",
          ministry: "Skill Development & Entrepreneurship",
          eligibility: ["Age 15-45 years", "Basic educational qualification (varies by course)"],
          deadline: "Ongoing",
          location: "All India",
          matchPercentage: (data.goals === "skill-development") ? 94 : 75
        }
      ];
    }
    
    // Category specific schemes
    const categorySchemes = [];
    if (data.category === "sc" || data.category === "st") {
      categorySchemes.push({
        id: "8",
        title: "National Scheduled Castes Finance & Development Corporation",
        description: "Credit financing and skill development for SC/ST entrepreneurs and professionals.",
        ministry: "Social Justice & Empowerment",
        eligibility: ["SC/ST category", "Annual family income below ₹3 lakh", "Valid caste certificate"],
        deadline: "Ongoing",
        location: "All India",
        matchPercentage: 96
      });
    }
    
    // Gender specific schemes
    const genderSchemes = [];
    if (data.gender === "female") {
      genderSchemes.push({
        id: "9",
        title: "Mahila Shakti Kendra Scheme",
        description: "Empowerment of rural women through community participation and awareness generation.",
        ministry: "Women & Child Development",
        eligibility: ["Rural women", "Above 18 years of age"],
        deadline: "Ongoing",
        location: "All India",
        matchPercentage: 93
      });
    }
    
    // Apply document compliance factor
    let allSchemes = [...baseSchemes, ...algorithmSchemes, ...categorySchemes, ...genderSchemes];
    
    // Adjust match percentage based on document compliance
    if (documentComplianceScore < 100) {
      allSchemes = allSchemes.map(scheme => ({
        ...scheme,
        matchPercentage: Math.round(scheme.matchPercentage * (0.5 + documentComplianceScore / 200))
      }));
    }
    
    // Sort by match percentage and limit to top 5
    return allSchemes.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 5);
  };
  
  // Calculate success probability based on historical data patterns
  const calculateSuccessProbability = (data: FormValues, scheme: any) => {
    // Base probability factors
    const baseProb = scheme.matchPercentage / 100;
    const docFactor = (data.documents?.filter(d => d.verified)?.length || 0) / 3; // Document factor
    const incomeFactor = Math.min(1, 500000 / (data.annualIncome || 1)); // Income factor (higher for lower incomes)
    
    // Calculate weighted probability
    let probability = (baseProb * 0.5) + (docFactor * 0.3) + (incomeFactor * 0.2);
    
    // Cap between 0.4 and 0.95
    probability = Math.min(0.95, Math.max(0.4, probability));
    
    return Math.round(probability * 100);
  };
  
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
          <h2 className="text-xl font-semibold">{sections[currentSection].title}</h2>
          <p className="text-muted-foreground">{sections[currentSection].description}</p>
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
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FileCheck className="text-primary" size={20} />
                    <h3 className="text-lg font-medium">Document Verification</h3>
                  </div>
                  
                  <Alert className="mb-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Uploading verified documents increases your chances of scheme approval.
                      We use AI to verify document authenticity and extract relevant information.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {documentTypes.map((docType) => {
                      const uploadedDocs = getUploadedDocumentsByType(docType.id);
                      return (
                        <div key={docType.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium flex items-center gap-2">
                                <File size={16} className="text-muted-foreground" />
                                {docType.label}
                                {docType.required && <span className="text-red-500">*</span>}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {docType.id === "aadhaar" && "Upload your Aadhaar card for identity verification"}
                                {docType.id === "pan" && "Upload your PAN card for tax verification"}
                                {docType.id === "income" && "Upload income proof (e.g., salary slip, Form 16)"}
                                {docType.id === "address" && "Upload address proof (e.g., utility bill)"}
                                {docType.id === "education" && "Upload your highest degree certificate"}
                                {docType.id === "other" && "Upload any other relevant documents"}
                              </p>
                            </div>
                          </div>
                          
                          {uploadedDocs.length > 0 ? (
                            <div className="space-y-2 mb-3">
                              {uploadedDocs.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-muted/50 rounded p-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded-full ${doc.verificationStatus === "verified" ? "bg-green-500" : "bg-red-500"}`}></div>
                                    <span className="truncate max-w-[150px]">{doc.file.name}</span>
                                  </div>
                                  {doc.verificationStatus === "verified" ? (
                                    <CheckCircle2 size={16} className="text-green-500" />
                                  ) : (
                                    <AlertTriangle size={16} className="text-red-500" />
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : null}
                          
                          <DocumentUploader
                            onUpload={(file) => handleDocumentUpload(docType.id, file)}
                            isProcessing={processingDocument}
                            accept=".jpg,.jpeg,.png,.pdf"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
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

