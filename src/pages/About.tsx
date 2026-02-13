import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { Shield, Globe, Heart, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">About MedVoyage</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We connect international patients with world-class healthcare providers, making quality medical care accessible and affordable for everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {[
              { icon: Globe, title: "Global Network", desc: "200+ accredited hospitals across 15+ countries, carefully vetted for quality and patient safety." },
              { icon: Shield, title: "Trust & Safety", desc: "HIPAA-compliant processes, transparent pricing, and verified hospital credentials." },
              { icon: Heart, title: "Patient First", desc: "Dedicated care coordinators guide you from initial consultation to post-treatment follow-up." },
              { icon: Users, title: "10,000+ Patients", desc: "Trusted by thousands of patients worldwide who have saved up to 70% on medical procedures." },
            ].map((item) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-xl p-8 shadow-soft border border-border">
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Medical tourism shouldn't be a maze of hidden costs, unverified providers, and uncertainty. MedVoyage was founded to bring transparency, trust, and technology to cross-border healthcare.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our platform enables patients to compare real prices from accredited hospitals, access personalized treatment plans, and make informed decisions — all from the comfort of their home.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
