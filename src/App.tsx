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
import NotFound from "./pages/NotFound";
import TreatmentDetail from "./pages/TreatmentDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/treatment/:id" element={<TreatmentDetail />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
