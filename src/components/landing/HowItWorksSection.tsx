import { motion } from "framer-motion";
import { ClipboardList, Search, MessageSquare, Plane } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Tell Us Your Needs",
    description: "Complete a quick questionnaire about your treatment, preferences, and travel requirements.",
    step: "01",
  },
  {
    icon: Search,
    title: "Compare Options",
    description: "Receive transparent pricing from accredited hospitals tailored to your condition.",
    step: "02",
  },
  {
    icon: MessageSquare,
    title: "Connect & Decide",
    description: "Speak directly with hospitals, ask questions, and review treatment plans in detail.",
    step: "03",
  },
  {
    icon: Plane,
    title: "Travel & Heal",
    description: "We coordinate travel, accommodation, and aftercare so you can focus on recovery.",
    step: "04",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From inquiry to recovery — we make every step transparent and stress-free.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-card-gradient border border-border shadow-soft hover:shadow-elevated transition-all duration-300 h-full">
                <span className="text-5xl font-display font-bold text-primary/10 absolute top-4 right-6">
                  {step.step}
                </span>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
