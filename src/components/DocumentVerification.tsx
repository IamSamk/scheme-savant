
import { useState } from "react";
import { FileUp, CheckCircle, AlertCircle, FileCheck, FileX, Scan, Brain } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface DocumentVerificationProps {
  onVerificationComplete: (result: VerificationResult) => void;
  documentType: "aadhaar" | "pan" | "income" | "education" | "address" | "other";
}

export interface VerificationResult {
  verified: boolean;
  documentType: string;
  extractedData: Record<string, string>;
  confidenceScore: number;
  fraudIndicators?: string[];
  qualityScore?: number;
}

const DocumentVerification = ({ 
  onVerificationComplete,
  documentType
}: DocumentVerificationProps) => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setVerificationResult(null);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set the language based on current app language
      utterance.lang = document.documentElement.lang;
      
      // Add event listeners
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => {
        setSpeaking(false);
        toast.error(t("chatbot.tts.error"));
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error(t("chatbot.tts.unsupported"));
    }
  };

  const simulateOCRAndVerification = async () => {
    if (!file) return;

    setIsVerifying(true);
    setVerificationProgress(0);

    // Simulate document processing steps
    await simulateProgress(25, t("document.verification.scanning"));
    await simulateProgress(50, t("document.verification.extracting"));
    await simulateProgress(75, t("document.verification.fraud_check"));
    await simulateProgress(90, t("document.verification.validating"));
    
    // Enhanced mock verification result based on document type
    const result = mockVerificationResult(documentType);
    setVerificationResult(result);
    setVerificationProgress(100);
    
    // Notify parent component
    onVerificationComplete(result);
    
    // Show toast notification and speak the result
    if (result.verified) {
      const successMessage = t("document.verification.success");
      toast.success(successMessage);
      speakText(successMessage);
    } else {
      const errorMessage = t("document.verification.error");
      toast.error(errorMessage);
      speakText(errorMessage);
    }
    
    setIsVerifying(false);
  };

  const simulateProgress = async (targetProgress: number, message: string) => {
    toast.info(message);
    speakText(message);
    
    return new Promise<void>(resolve => {
      const interval = setInterval(() => {
        setVerificationProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= targetProgress) {
            clearInterval(interval);
            resolve();
            return targetProgress;
          }
          return newProgress;
        });
      }, 100);
    });
  };

  const mockVerificationResult = (type: string): VerificationResult => {
    // Advanced AI simulation with fraud detection and quality analysis
    const randomQuality = Math.random();
    const qualityScore = 0.5 + (randomQuality * 0.5); // Range from 0.5 to 1.0
    
    // Higher chance of verification for higher quality images
    const verified = randomQuality > 0.3; // 70% success rate
    
    const confidenceScore = verified ? 
      0.7 + (Math.random() * 0.3) : // 0.7 to 1.0 for verified docs
      0.3 + (Math.random() * 0.4);  // 0.3 to 0.7 for unverified docs
    
    // Potential fraud indicators
    const fraudIndicators: string[] = [];
    if (!verified) {
      const possibleIndicators = [
        "Inconsistent font patterns",
        "Abnormal document dimensions",
        "Digital manipulation detected",
        "Missing security features",
        "Unusual color patterns"
      ];
      
      // Add 1-3 random fraud indicators
      const numIndicators = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numIndicators; i++) {
        const indicator = possibleIndicators[Math.floor(Math.random() * possibleIndicators.length)];
        if (!fraudIndicators.includes(indicator)) {
          fraudIndicators.push(indicator);
        }
      }
    }
    
    const extractedData: Record<string, string> = {};
    
    switch (type) {
      case "aadhaar":
        extractedData.name = "John Doe";
        extractedData.aadhaarNumber = "XXXX XXXX 1234";
        extractedData.dob = "01-01-1990";
        extractedData.gender = "Male";
        extractedData.address = "123 Main St, New Delhi";
        break;
      case "pan":
        extractedData.name = "John Doe";
        extractedData.panNumber = "ABCDE1234F";
        extractedData.fatherName = "Richard Doe";
        extractedData.dob = "01-01-1990";
        break;
      case "income":
        extractedData.annualIncome = "₹450,000";
        extractedData.assessmentYear = "2022-23";
        extractedData.taxpayerName = "John Doe";
        extractedData.taxIdentificationNumber = "TIN12345678";
        break;
      case "education":
        extractedData.qualification = "Bachelor of Technology";
        extractedData.university = "IIT Delhi";
        extractedData.yearOfCompletion = "2018";
        extractedData.registrationNumber = "IITD/BT/2018/1234";
        break;
      case "address":
        extractedData.fullAddress = "123 Main St, New Delhi, 110001";
        extractedData.state = "Delhi";
        extractedData.pinCode = "110001";
        break;
      default:
        extractedData.documentType = "Other";
    }
    
    return {
      verified,
      documentType: type,
      extractedData,
      confidenceScore,
      fraudIndicators: verified ? [] : fraudIndicators,
      qualityScore
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="file"
          id={`document-upload-${documentType}`}
          className="hidden"
          accept="image/*, application/pdf"
          onChange={handleFileChange}
          disabled={isVerifying}
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById(`document-upload-${documentType}`)?.click()}
          disabled={isVerifying}
          className="flex-1"
        >
          <FileUp className="mr-2 h-4 w-4" />
          {documentType.charAt(0).toUpperCase() + documentType.slice(1)} Document
        </Button>
      </div>

      {file && (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <FileCheck className="h-4 w-4" />
          Selected: {file.name}
        </div>
      )}

      {file && !isVerifying && !verificationResult && (
        <Button onClick={simulateOCRAndVerification} className="w-full">
          <Scan className="mr-2 h-4 w-4" />
          Verify Document
        </Button>
      )}

      {isVerifying && (
        <div className="space-y-2">
          <Progress value={verificationProgress} />
          <p className="text-sm text-muted-foreground text-center">
            {verificationProgress < 25 ? t("document.verification.scanning") : 
             verificationProgress < 50 ? t("document.verification.extracting") :
             verificationProgress < 75 ? t("document.verification.fraud_check") :
             t("document.verification.validating")} {verificationProgress}%
          </p>
        </div>
      )}

      {verificationResult && (
        <Alert variant={verificationResult.verified ? "success" : "warning"}>
          {verificationResult.verified ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {verificationResult.verified ? "Document Verified" : "Verification Failed"}
          </AlertTitle>
          <AlertDescription>
            {verificationResult.verified ? (
              <div className="space-y-2">
                <p>Document verification successful with {(verificationResult.confidenceScore * 100).toFixed(0)}% confidence.</p>
                <div className="mt-1 bg-green-50 p-2 rounded text-xs">
                  <p className="font-medium text-green-800">Quality Score: {(verificationResult.qualityScore || 0 * 100).toFixed(0)}%</p>
                </div>
                {Object.entries(verificationResult.extractedData).length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Extracted Information:</p>
                    <ul className="mt-1 text-sm">
                      {Object.entries(verificationResult.extractedData).map(([key, value]) => (
                        <li key={key} className="flex justify-between">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="font-medium">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="mb-2 bg-amber-50 p-2 rounded text-xs">
                  <p className="font-medium text-amber-800">
                    Quality Score: {(verificationResult.qualityScore || 0 * 100).toFixed(0)}%
                  </p>
                  {verificationResult.fraudIndicators && verificationResult.fraudIndicators.length > 0 && (
                    <div className="mt-1">
                      <p className="text-red-700">Potential issues detected:</p>
                      <ul className="mt-0.5 list-disc list-inside">
                        {verificationResult.fraudIndicators.map((indicator, index) => (
                          <li key={index} className="text-red-700">{indicator}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <p>{t("document.verification.error")}</p>
                <div className="mt-2">
                  <p className="font-medium">{t("document.verification.tips.title")}:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>{t("document.verification.tips.clear")}</li>
                    <li>{t("document.verification.tips.corners")}</li>
                    <li>{t("document.verification.tips.lighting")}</li>
                  </ul>
                </div>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DocumentVerification;
