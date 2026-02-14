import { motion } from "framer-motion";
import { ArrowRight, Shield, Globe, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-medical.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern medical facility in a tropical destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep/90 via-teal-deep/60 to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-teal-glow/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-coral/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container relative mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 mb-8">
              <Globe className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-primary-foreground/90">
                Trusted by 10,000+ patients worldwide
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6"
          >
            World-Class Care,
            <br />
            <span className="text-gradient-hero">Up to 70% Less.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-primary-foreground/70 max-w-xl mb-10 leading-relaxed"
          >
            Compare transparent pricing from accredited hospitals worldwide.
            Get a personalized treatment plan in hours, not months.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/questionnaire">
              <Button
                size="lg"
                className="bg-accent-gradient text-accent-foreground shadow-elevated hover:opacity-90 hover:shadow-glow px-8 py-6 text-base font-semibold"
              >
                Start Your Free Quote
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-base"
              >
                See How It Works
              </Button>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 mt-14"
          >
            {[
              { icon: Shield, text: "HIPAA Compliant" },
              { icon: Globe, text: "200+ Hospitals" },
              { icon: TrendingDown, text: "Save Up to 70%" },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-primary-foreground/60">
                <badge.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
