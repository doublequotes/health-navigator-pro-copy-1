import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTASection from "@/components/landing/CTASection";

export default function Savings() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
