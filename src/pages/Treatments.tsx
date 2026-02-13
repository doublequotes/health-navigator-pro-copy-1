import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import TreatmentsSection from "@/components/landing/TreatmentsSection";

export default function Treatments() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <TreatmentsSection />
      </main>
      <Footer />
    </div>
  );
}
