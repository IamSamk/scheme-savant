
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareQuote, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

interface MentorTestimonialsTabProps {
  testimonials?: Testimonial[];
}

const MentorTestimonialsTab: React.FC<MentorTestimonialsTabProps> = ({ 
  testimonials 
}) => {
  return (
    <>
      {testimonials && testimonials.length > 0 ? (
        <div className="space-y-4">
          {testimonials.map(testimonial => (
            <Card key={testimonial.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <MessageSquareQuote className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="italic mb-3">{testimonial.text}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{testimonial.name}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.floor(testimonial.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No testimonials available yet.</p>
        </div>
      )}
    </>
  );
};

export default MentorTestimonialsTab;
