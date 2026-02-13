import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-display font-bold text-foreground mb-8">Privacy Policy</h1>
          <div className="prose prose-sm text-muted-foreground space-y-6">
            <p>Last updated: February 2026</p>
            <h2 className="text-xl font-display font-semibold text-foreground">1. Information We Collect</h2>
            <p>We collect information you provide directly, such as your email address, medical questionnaire responses, and treatment preferences. We do not store detailed Protected Health Information (PHI) beyond what is necessary for lead management.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>Your information is used to connect you with accredited healthcare providers, provide personalized treatment quotes, and improve our platform experience.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">3. Data Sharing</h2>
            <p>We share your enquiry details only with hospitals you are matched with. We never sell your personal data to third parties.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">4. Data Security</h2>
            <p>We implement industry-standard security measures including encryption, role-based access control, and audit logging to protect your information.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. You may withdraw consent at any time by contacting us.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">6. Contact</h2>
            <p>For privacy-related enquiries, email us at privacy@medvoyage.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
