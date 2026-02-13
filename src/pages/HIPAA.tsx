import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Shield } from "lucide-react";

export default function HIPAA() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-display font-bold text-foreground">HIPAA Compliance</h1>
          </div>
          <div className="prose prose-sm text-muted-foreground space-y-6">
            <p>MedVoyage follows HIPAA-friendly data handling patterns to ensure your health information is protected.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">Our Approach</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Minimal PHI storage — we only collect what's necessary for matching you with providers</li>
              <li>Encrypted data transmission and storage</li>
              <li>Role-based access control ensuring only authorized personnel access patient data</li>
              <li>Comprehensive audit logging for all sensitive data operations</li>
              <li>GDPR-aligned consent model for international compliance</li>
            </ul>
            <h2 className="text-xl font-display font-semibold text-foreground">Data Access Controls</h2>
            <p>Patient data is only shared with assigned hospitals after explicit consent. Admin access is restricted and audited. All database operations are protected by row-level security policies.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">Questions?</h2>
            <p>Contact our compliance team at compliance@medvoyage.com for more details.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
