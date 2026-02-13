import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { Shield, Globe, Heart, Users } from "lucide-react";

export default function Careers() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">Careers at MedVoyage</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are looking for passionate professionals to bridge the gap between world-class healthcare and international patients.            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {[
              { icon: Globe, title: "Build a Career Without Borders", desc: "Join a global team dedicated to making world-class healthcare accessible to everyone, everywhere." },
              { icon: Shield, title: "Our Mission: Why We Do It", desc: "Patient First as your #1 priority, followed by values like Resilience, Cultural Sensitivity, and Transparency." },
              { icon: Heart, title: "Employee Value Proposition", desc: " Opportunities for international training, certifications, and leadership development. A collaborative, inclusive environment where every team member is 'cared for like family'" },
              { icon: Users, title: "Diverse Career Paths", desc: "Patient Coordination: Facilitators who manage medical records, visa documentation, and hospital scheduling. Marketing & Creative: Writers and social media managers who translate complex medical jargon into patient-friendly guides" },
            ].map((item) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-xl p-8 shadow-soft border border-border">
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Open Positions</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              #Job 1: Patient Coordinator
              <br />
              An International Patient Coordinator (IPC) serves as the primary link between international patients and a network of world-class healthcare providers. This role is a hybrid of medical facilitation, logistics management, and compassionate advocacy, ensuring that the patient's cross-border medical journey is seamless from the initial inquiry to post-treatment follow-up
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              #Job 2: Marketing & Creative Specialist
              <br />
              A Marketing & Creative Specialist at MedVoyage is responsible for crafting compelling narratives that demystify the medical tourism experience. This role combines strategic marketing, content creation, and patient education to build trust and drive engagement among international patients seeking affordable, high-quality healthcare abroad.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              #Job 3: Language & Cultural Liaison
              <br />
              A Language & Cultural Liaison at MedVoyage plays a critical role in bridging communication and cultural gaps between international patients and healthcare providers. This position requires fluency in multiple languages and a deep understanding of diverse cultural norms to ensure that patients feel understood, respected, and supported throughout their medical journey abroad.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
