import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Treatments", href: "/treatments" },
      { label: "Hospitals", href: "/coming-soon" },
      { label: "Pricing", href: "/savings" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      // { label: "Blog", href: "/about" },
      // { label: "Press", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "HIPAA Compliance", href: "/hipaa" },
      { label: "Cookie Policy", href: "/privacy" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold">M</span>
              </div>
              <span className="font-display font-bold text-lg text-background">MedVoyage</span>
            </div>
            <p className="text-sm text-background/50 leading-relaxed">
              Connecting patients with world-class healthcare providers at transparent, affordable prices.
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-background mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/50 hover:text-background/80 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-background/40">© 2026 MedVoyage. All rights reserved.</p>
          <p className="text-xs text-background/40 mt-2 sm:mt-0">Made with care for patients worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
