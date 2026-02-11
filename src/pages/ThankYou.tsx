import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-8"
        >
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
          Thank You!
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Your quote request has been received. Our team will match you with accredited hospitals and send personalized pricing within <strong className="text-foreground">24 hours</strong>.
        </p>

        <div className="p-6 rounded-2xl bg-secondary border border-border mb-8">
          <h3 className="font-display font-semibold text-foreground mb-2">What happens next?</h3>
          <ul className="text-sm text-muted-foreground space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              We review your questionnaire and match you with the best hospitals.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              You'll receive detailed pricing from 2-3 accredited options via email.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              A dedicated coordinator will help you compare and decide.
            </li>
          </ul>
        </div>

        <Link to="/">
          <Button variant="outline" size="lg">
            Back to Home
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ThankYou;
