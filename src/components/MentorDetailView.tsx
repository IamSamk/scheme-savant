
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMentorById } from "@/services/mentorService";
import { Mentor } from "@/types/mentor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, MessageCircle, Video, Phone, User, 
  Star, ArrowLeft, Award, BookOpen, MessageSquareQuote 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { AIMentorSuggestions } from "./AIMentorSuggestions";

const MentorDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const mentorData = getMentorById(id);
      setMentor(mentorData || null);
      setLoading(false);
    }
  }, [id]);

  const handleBookConsultation = () => {
    if (mentor) {
      toast.success(`Consultation request sent to ${mentor.name}`, {
        description: "You will receive a confirmation shortly",
      });
    }
  };

  const handleDirectCall = () => {
    if (mentor && mentor.phone) {
      toast.success(`Initiating call to ${mentor.name}`, {
        description: "Connecting you directly with the mentor",
      });
      window.location.href = `tel:${mentor.phone}`;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-secondary rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-secondary rounded mb-4"></div>
          <div className="h-4 w-64 bg-secondary rounded"></div>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Mentor not found</h2>
        <Button onClick={() => navigate("/mentors")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Mentors
        </Button>
      </div>
    );
  }

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
          />
        ))}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/mentors")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("mentors.back_to_directory") || "Back to Mentors"}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Mentor info */}
        <div className="md:col-span-1">
          <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-secondary mb-4">
                <img 
                  src={mentor.avatar} 
                  alt={mentor.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold mb-1">{mentor.name}</h1>
              <div className="mb-2">{renderRating(mentor.rating)}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <User size={14} />
                <span>{mentor.experience} years experience</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">{t("mentors.specialization") || "Expertise"}</h3>
                <div className="flex flex-wrap gap-1">
                  {mentor.specialization.map(spec => (
                    <Badge key={spec} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">{t("mentors.languages") || "Languages"}</h3>
                <div className="flex flex-wrap gap-1">
                  {mentor.languages.map(lang => (
                    <Badge key={lang} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">{t("mentors.availability") || "Availability"}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar size={14} className="shrink-0" />
                  <span>{mentor.availability.join(" • ")}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button 
                variant="default" 
                className="w-full"
                onClick={handleBookConsultation}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {t("mentors.book_consultation") || "Book Consultation"}
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("mentors.chat") || "Chat"}
                </Button>
                <Button variant="outline">
                  <Video className="mr-2 h-4 w-4" />
                  {t("mentors.video") || "Video"}
                </Button>
              </div>
              
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={handleDirectCall}
                disabled={!mentor.phone}
              >
                <Phone className="mr-2 h-4 w-4" />
                {t("mentors.call") || "Call Mentor"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right column - Detailed content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-3">Biography</h2>
                  <p className="text-muted-foreground">{mentor.bioDetails || mentor.description}</p>
                </CardContent>
              </Card>
              
              <AIMentorSuggestions mentorId={mentor.id} specialization={mentor.specialization} />
            </TabsContent>
            
            <TabsContent value="credentials" className="space-y-6">
              {mentor.education && mentor.education.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">Education</h2>
                    </div>
                    <ul className="space-y-2">
                      {mentor.education.map((edu, index) => (
                        <li key={index} className="pl-6 border-l-2 border-secondary py-1">
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              
              {mentor.certifications && mentor.certifications.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">Certifications</h2>
                    </div>
                    <ul className="space-y-2">
                      {mentor.certifications.map((cert, index) => (
                        <li key={index} className="pl-6 border-l-2 border-secondary py-1">
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="testimonials">
              {mentor.testimonials && mentor.testimonials.length > 0 ? (
                <div className="space-y-4">
                  {mentor.testimonials.map(testimonial => (
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MentorDetailView;
