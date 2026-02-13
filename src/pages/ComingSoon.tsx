import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ComingSoon from "@/components/landing/ComingSoon";

export default function CommingSoon() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <ComingSoon />
      </main>
      <Footer />
    </div>
  );
}
