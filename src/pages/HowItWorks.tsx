import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HowItWorksSection from "@/components/landing/HowItWorksSection";

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
