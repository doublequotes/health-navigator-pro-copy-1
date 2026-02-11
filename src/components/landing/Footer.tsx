import { Link } from "react-router-dom";

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

          {[
            {
              title: "Platform",
              links: ["How It Works", "Treatments", "Hospitals", "Pricing"],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Press"],
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Cookie Policy"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-background mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-background/50 hover:text-background/80 transition-colors cursor-pointer">
                      {link}
                    </span>
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
