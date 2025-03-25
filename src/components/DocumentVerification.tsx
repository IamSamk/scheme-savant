
import { useState } from "react";
import { FileUp, CheckCircle, AlertCircle, FileCheck, FileX } from "lucide-react";
import { toast } from "sonner";

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
}

const DocumentVerification = ({ 
  onVerificationComplete,
  documentType
}: DocumentVerificationProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setVerificationResult(null);
    }
  };

  const simulateOCRAndVerification = async () => {
    if (!file) return;

    setIsVerifying(true);
    setVerificationProgress(0);

    // Simulate document processing steps
    await simulateProgress(25, "Scanning document...");
    await simulateProgress(50, "Extracting information...");
    await simulateProgress(75, "Checking for fraud indicators...");
    await simulateProgress(90, "Validating extracted data...");
    
    // Mock verification result based on document type
    const result = mockVerificationResult(documentType);
    setVerificationResult(result);
    setVerificationProgress(100);
    
    // Notify parent component
    onVerificationComplete(result);
    
    // Show toast notification
    if (result.verified) {
      toast.success("Document verified successfully!");
    } else {
      toast.error("Document verification failed. Please try again with a clearer image.");
    }
    
    setIsVerifying(false);
  };

  const simulateProgress = async (targetProgress: number, message: string) => {
    toast.info(message);
    
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
    // In a real implementation, this would come from actual document analysis
    // For demo purposes, we'll randomly succeed or fail with some probability
    const verified = Math.random() > 0.3; // 70% success rate
    
    const extractedData: Record<string, string> = {};
    const confidenceScore = verified ? 0.7 + (Math.random() * 0.3) : 0.3 + (Math.random() * 0.4);
    
    switch (type) {
      case "aadhaar":
        extractedData.name = "John Doe";
        extractedData.aadhaarNumber = "XXXX XXXX 1234";
        extractedData.dob = "01-01-1990";
        extractedData.gender = "Male";
        break;
      case "pan":
        extractedData.name = "John Doe";
        extractedData.panNumber = "ABCDE1234F";
        break;
      case "income":
        extractedData.annualIncome = "₹450,000";
        extractedData.assessmentYear = "2022-23";
        break;
      case "education":
        extractedData.qualification = "Bachelor of Technology";
        extractedData.university = "IIT Delhi";
        extractedData.yearOfCompletion = "2018";
        break;
      case "address":
        extractedData.address = "123 Main St, New Delhi, 110001";
        break;
      default:
        extractedData.documentType = "Other";
    }
    
    return {
      verified,
      documentType: type,
      extractedData,
      confidenceScore
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
          Upload {documentType.charAt(0).toUpperCase() + documentType.slice(1)} Document
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
          Verify Document
        </Button>
      )}

      {isVerifying && (
        <div className="space-y-2">
          <Progress value={verificationProgress} />
          <p className="text-sm text-muted-foreground text-center">
            Verifying document... {verificationProgress}%
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
                <p>We couldn't verify this document. Please ensure:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>The document is clear and readable</li>
                  <li>All corners of the document are visible</li>
                  <li>There's good lighting and no glare</li>
                </ul>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DocumentVerification;
