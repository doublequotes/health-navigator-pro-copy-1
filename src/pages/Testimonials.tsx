import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

export default function Testimonials() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
