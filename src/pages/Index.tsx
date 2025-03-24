
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RecommendationSection from "@/components/RecommendationSection";
import Chatbot from "@/components/Chatbot";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCcw, CheckCircle } from "lucide-react";

const Index = () => {
  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <RecommendationSection />
        
        {/* Features section */}
        <section className="py-16 px-4 bg-secondary/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                AI-Powered Features
              </div>
              <h2 className="text-3xl font-bold mb-4">How SchemeSavant Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cutting-edge AI technologies to connect you with the right government schemes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <RefreshCcw className="h-6 w-6 text-primary" />,
                  title: "Smart Search",
                  description: "Our AI understands your natural language queries and finds the most relevant schemes for you."
                },
                {
                  icon: <CheckCircle className="h-6 w-6 text-primary" />,
                  title: "Eligibility Check",
                  description: "Automatically verify your eligibility for various schemes based on your profile information."
                },
                {
                  icon: <ArrowRight className="h-6 w-6 text-primary" />,
                  title: "Application Assistance",
                  description: "Get step-by-step guidance and document verification for your scheme applications."
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Start discovering government schemes tailored for you
                </h2>
                <p className="text-muted-foreground mb-8">
                  Create your profile and let our AI find the perfect government schemes based on your needs and eligibility.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="font-medium">
                    Create Profile
                  </Button>
                  <Button variant="outline" size="lg" className="font-medium">
                    Explore Schemes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">SS</span>
                </div>
                <span className="font-semibold text-lg">SchemeSavant</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered platform to discover and apply for government schemes
              </p>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "How it works", "Pricing", "FAQs"]
              },
              {
                title: "Resources",
                links: ["Blog", "Support", "Documentation", "API"]
              },
              {
                title: "Company",
                links: ["About us", "Careers", "Contact us", "Privacy policy"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-medium mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} SchemeSavant. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <Chatbot />
    </div>
  );
};

export default Index;
