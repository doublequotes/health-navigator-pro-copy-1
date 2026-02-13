import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, ArrowRight } from "lucide-react";

const destinations = [
  {
    id: "india",
    flag: "🇮🇳",
    name: "India",
    tagline: "Save 60–80% on cardiac, orthopaedic & dental procedures",
    highlights: ["40+ JCI-accredited hospitals", "2M+ international patients/year", "World-class cardiac surgery"],
  },
  {
    id: "thailand",
    flag: "🇹🇭",
    name: "Thailand",
    tagline: "Save 50–75% on cosmetic, dental & cardiac procedures",
    highlights: ["Home to Bumrungrad International", "#1 for cosmetic surgery in Asia", "3.5M+ medical tourists/year"],
  },
];

const DestinationsSection = () => {
  return (
    <section id="destinations" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-4">
            <TrendingDown className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Compare & Save</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Top Global Destinations
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See how leading medical tourism destinations compare against EMEA pricing (Europe, Middle East, and Africa).
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link to={`/destination/${dest.id}`}>
                <Card className="h-full shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-border">
                  <CardContent className="p-8">
                    <div className="text-5xl mb-4">{dest.flag}</div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                      {dest.name} vs EMEA
                    </h3>
                    <p className="text-muted-foreground mb-5">{dest.tagline}</p>
                    <ul className="space-y-2 mb-6">
                      {dest.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      View Full Comparison <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
