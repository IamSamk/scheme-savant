
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";

interface DocumentUploaderProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
  accept?: string;
}

const DocumentUploader = ({ onUpload, isProcessing, accept = ".jpg,.jpeg,.png,.pdf" }: DocumentUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUpload(files[0]);
      
      // Reset the input value so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onUpload(files[0]);
    }
  };
  
  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-input hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center py-2">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
            <p className="text-sm text-muted-foreground">Verifying document...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center py-2">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">
              Click or drag & drop to upload
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supported formats: JPG, PNG, PDF
            </p>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
        disabled={isProcessing}
      />
    </div>
  );
};

export default DocumentUploader;
