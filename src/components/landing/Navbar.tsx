import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Treatments", href: "/treatments" },
  { label: "Savings", href: "/savings" },
  { label: "Testimonials", href: "/testimonials" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-hero flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-lg">M</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground">MedVoyage</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/auth">
            <Button variant="outline">Connect</Button>
          </Link>
          <Link to="/questionnaire">
            <Button className="bg-accent-gradient text-accent-foreground shadow-soft hover:shadow-elevated">
              Get Free Quote
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-secondary"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border bg-card px-6 py-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link to="/auth" onClick={() => setIsOpen(false)}>
            <Button variant="outline" className="w-full mt-3">Connect</Button>
          </Link>
          <Link to="/questionnaire" onClick={() => setIsOpen(false)}>
            <Button className="w-full mt-3 bg-accent-gradient text-accent-foreground">
              Get Free Quote
            </Button>
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
