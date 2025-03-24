
import { ArrowRight, CheckCircle, User, Calendar, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SchemeCardProps {
  id: string;
  title: string;
  description: string;
  ministry: string;
  eligibility: string[];
  deadline?: string;
  location?: string;
  matchPercentage?: number;
  imageUrl?: string;
}

const SchemeCard = ({
  id,
  title,
  description,
  ministry,
  eligibility,
  deadline,
  location,
  matchPercentage,
  imageUrl,
}: SchemeCardProps) => {
  return (
    <div className="rounded-xl overflow-hidden border border-border hover:border-primary/30 bg-card transition-all duration-300 hover:shadow-lg group animate-scale-in">
      <div className="relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-40 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
            <span className="text-lg text-primary font-medium">{ministry}</span>
          </div>
        )}

        {matchPercentage && (
          <div className="absolute top-3 right-3 rounded-full glass-morphism px-2 py-1 text-xs font-semibold">
            {matchPercentage}% Match
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {ministry}
          </Badge>
          
          {deadline && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Calendar size={12} />
              {deadline}
            </Badge>
          )}
        </div>

        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="mb-4">
          <div className="text-xs text-muted-foreground mb-2">Eligibility:</div>
          <div className="space-y-1">
            {eligibility.slice(0, 2).map((item, index) => (
              <div key={index} className="flex items-start gap-2 text-xs">
                <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
            {eligibility.length > 2 && (
              <div className="text-xs text-primary/80">+{eligibility.length - 2} more criteria</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {location && (
              <div className="flex items-center gap-1">
                <Map size={14} />
                <span>{location}</span>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary hover:bg-primary/10 group-hover:translate-x-1 transition-transform"
          >
            View Details
            <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;
