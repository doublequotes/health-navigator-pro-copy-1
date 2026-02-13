import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-display font-bold text-foreground mb-8">Terms of Service</h1>
          <div className="prose prose-sm text-muted-foreground space-y-6">
            <p>Last updated: February 2026</p>
            <h2 className="text-xl font-display font-semibold text-foreground">1. Acceptance</h2>
            <p>By using MedVoyage, you agree to these Terms of Service. If you do not agree, please discontinue use of the platform.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">2. Services</h2>
            <p>MedVoyage connects patients with medical providers internationally. We facilitate introductions and pricing comparisons but are not a healthcare provider.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">3. User Responsibilities</h2>
            <p>You are responsible for providing accurate medical information in your questionnaires and maintaining the confidentiality of your account credentials.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">4. Limitation of Liability</h2>
            <p>MedVoyage is not responsible for medical outcomes, hospital performance, or treatment results. All medical decisions remain between you and your chosen provider.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">5. Modifications</h2>
            <p>We reserve the right to update these terms at any time. Continued use constitutes acceptance of any changes.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
