
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const RecommendationAlert: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <Alert variant="success" className="bg-gradient-to-r from-blue-50 to-green-50 border border-green-100">
        <Brain className="h-5 w-5 text-primary" />
        <AlertTitle>{t("schemes.alert.title")}</AlertTitle>
        <AlertDescription>
          {t("schemes.alert.description")}
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};

export default RecommendationAlert;
