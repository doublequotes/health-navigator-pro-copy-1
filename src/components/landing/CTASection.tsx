import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section id="savings" className="py-24 bg-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-teal-glow/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-coral/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-primary-foreground mb-6">
            Ready to Save Thousands on
            <br />
            Your Treatment?
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-10">
            Join thousands of patients who've already discovered world-class care at a fraction of the cost. Your personalized quote is just minutes away.
          </p>
          <Link to="/questionnaire">
            <Button
              size="lg"
              className="bg-accent-gradient text-accent-foreground shadow-elevated hover:opacity-90 hover:shadow-glow px-10 py-7 text-lg font-semibold"
            >
              Get Your Free Quote Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-primary-foreground/50 mt-6">
            No credit card required · Free consultation · Responses within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
