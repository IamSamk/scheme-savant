
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Building, Globe, Clock } from 'lucide-react';
import NearbySchemesFix from '@/components/NearbySchemesFix';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const locationTypes = [
  {
    title: "Government Offices",
    description: "Visit central government offices to get assistance with your applications",
    icon: <Building className="h-8 w-8 text-blue-500" />,
    image: "https://images.unsplash.com/photo-1552664688-cf412ec27db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Common Service Centers",
    description: "Digital service centers to help rural and remote citizens access government schemes",
    icon: <Globe className="h-8 w-8 text-green-500" />,
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Panchayat Offices",
    description: "Local government institutions in villages offering application assistance",
    icon: <Clock className="h-8 w-8 text-amber-500" />,
    image: "https://images.unsplash.com/photo-1598901886321-4985c5af7fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  }
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Delhi",
    text: "The centers map helped me locate the nearest CSC center to apply for PM Kisan. Saved me hours of travel!",
    image: "/scheme-images/testimonial1.jpg"
  },
  {
    name: "Priya Sharma",
    location: "Bangalore",
    text: "I found the perfect center to complete my scholarship application. The directions feature was very helpful.",
    image: "/scheme-images/testimonial2.jpg"
  },
  {
    name: "Mohan Singh",
    location: "Chandigarh",
    text: "The application process was much easier once I found the correct center through this service.",
    image: "/scheme-images/testimonial3.jpg"
  }
];

const SchemeLocations: React.FC = () => {
  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Add a specific style to fix the z-index issue with the map
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-container, .leaflet-control, .leaflet-pane {
        z-index: 10 !important;
      }
      .leaflet-top, .leaflet-bottom {
        z-index: 20 !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="container max-w-6xl mx-auto py-16 px-4">
      <motion.div 
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="inline-flex items-center gap-2 justify-center mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MapPin className="text-primary animate-pulse-subtle" size={24} />
          <h1 className="text-3xl font-bold text-gradient">Scheme Centers Near You</h1>
        </motion.div>
        <motion.p 
          className="text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Find government scheme centers near your location and get directions to visit them. Our interactive map shows you the most convenient centers for your applications.
        </motion.p>
      </motion.div>

      <motion.div 
        className="mb-8 bg-card rounded-lg p-6 border shine"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              className="bg-blue-100 p-3 rounded-full"
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <Navigation className="text-primary" size={24} />
            </motion.div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Interactive Directions</h2>
              <p className="text-muted-foreground">
                Our map now features directions that show you the optimal route from your location to any scheme center.
              </p>
            </div>
          </div>
          <Button className="whitespace-nowrap btn-hover-lift gradient-shift text-white">
            Allow Location Access
          </Button>
        </div>
      </motion.div>

      <div className="relative z-10">
        <NearbySchemesFix />
      </div>

      <motion.div
        className="my-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Types of Government Scheme Centers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locationTypes.map((type, index) => (
            <motion.div
              key={index}
              className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={type.image} 
                  alt={type.title}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  {type.icon}
                  <h3 className="font-semibold text-lg">{type.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{type.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="my-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">User Experiences</h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="border border-border hover:border-primary/30 transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary">
                        <img 
                          src={testimonial.image || `/mentor-images/indian-${index % 2 ? 'woman' : 'man'}-${(index % 5) + 1}.jpg`} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                    <p className="text-sm italic flex-1">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-4 bg-background border border-border" />
            <CarouselNext className="-right-4 bg-background border border-border" />
          </div>
        </Carousel>
      </motion.div>

      <motion.div
        className="mt-16 mb-10 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Common Questions</h2>
        
        <div className="space-y-4">
          {[
            {
              question: "What documents do I need to bring to a scheme center?",
              answer: "Most centers require your Aadhaar card, proof of address, income certificate, and scheme-specific documents. Check the scheme details page for specific requirements."
            },
            {
              question: "How accurate is the location data?",
              answer: "Our location data is refreshed weekly and verified by government sources. In rural areas, there might be slight variations in exact locations."
            },
            {
              question: "Can I book an appointment at these centers?",
              answer: "Some centers offer appointment booking through their official websites. We provide contact information so you can call ahead and check availability."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="bg-card border rounded-lg p-5 hover:border-primary/40 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 5 }}
            >
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SchemeLocations;
