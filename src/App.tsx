
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EligibilityTest from "./components/EligibilityTest";
import SchemeResults from "./pages/SchemeResults";
import MentorDirectory from "./components/MentorDirectory";
import MentorDetailView from "./components/MentorDetailView";
import Chatbot from "./components/Chatbot";
import { ApiKeyInput } from "./components/ApiKeyInput";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ApiKeyInput />
        <Chatbot />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/eligibility-test" element={<EligibilityTest />} />
            <Route path="/scheme-results" element={<SchemeResults />} />
            <Route path="/mentors" element={<MentorDirectory />} />
            <Route path="/mentors/:id" element={<MentorDetailView />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
