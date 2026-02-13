import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Questionnaire from "./pages/Questionnaire";
import ThankYou from "./pages/ThankYou";
import Auth from "./pages/Auth";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Leads from "./pages/admin/Leads";
import Hospitals from "./pages/admin/Hospitals";
import HospitalLayout from "./components/hospital/HospitalLayout";
import HospitalDashboard from "./pages/hospital/Dashboard";
import HospitalLeads from "./pages/hospital/Leads";
import HospitalPricing from "./pages/hospital/Pricing";
import PatientLayout from "./components/patient/PatientLayout";
import PatientDashboard from "./pages/patient/Dashboard";
import NotFound from "./pages/NotFound";
import TreatmentDetail from "./pages/TreatmentDetail";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Treatments from "./pages/Treatments";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import HIPAA from "./pages/HIPAA";
import DestinationDetail from "./pages/DestinationDetail";
import Testimonials from "./pages/Testimonials";
import Savings from "./pages/Savings";
import ComingSoon from "./components/landing/ComingSoon";
import Careers from "./pages/Careers";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToTop/>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/treatment/:id" element={<TreatmentDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/hipaa" element={<HIPAA />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="hospitals" element={<Hospitals />} />
            </Route>
            <Route path="/hospital" element={<HospitalLayout />}>
              <Route index element={<HospitalDashboard />} />
              <Route path="leads" element={<HospitalLeads />} />
              <Route path="pricing" element={<HospitalPricing />} />
            </Route>
            <Route path="/patient" element={<PatientLayout />}>
              <Route index element={<PatientDashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
