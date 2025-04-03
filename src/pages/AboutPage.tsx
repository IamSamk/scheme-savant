
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">About GovScheme</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              GovScheme is committed to making government schemes accessible to everyone. 
              We leverage artificial intelligence to help citizens discover, understand, 
              and apply for government benefits they are eligible for.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>How We Help</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our platform combines advanced AI with a user-friendly interface to help you:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Find schemes you're eligible for</li>
              <li>Connect with mentors for guidance</li>
              <li>Simplify complex application processes</li>
              <li>Stay updated on new government initiatives</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center">
        <Button asChild size="lg">
          <Link to="/eligibility-test">Take Eligibility Test</Link>
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
