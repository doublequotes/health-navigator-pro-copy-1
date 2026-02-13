import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingDown, Award, Star, Building2, Stethoscope } from "lucide-react";

const destinationData: Record<string, {
  name: string;
  flag: string;
  tagline: string;
  savings: string;
  procedures: { name: string; emea: string; local: string; saving: string }[];
  facilities: string[];
  achievements: string[];
  successStories: { patient: string; treatment: string; quote: string }[];
}> = {
  india: {
    name: "India",
    flag: "🇮🇳",
    tagline: "World-class healthcare at a fraction of the cost",
    savings: "60–80%",
    procedures: [
      { name: "Heart Bypass (CABG)", emea: "$70,000–$130,000", local: "$5,000–$9,000", saving: "85%" },
      { name: "Hip Replacement", emea: "$30,000–$50,000", local: "$6,000–$9,000", saving: "78%" },
      { name: "Dental Implants (per tooth)", emea: "$2,500–$5,000", local: "$500–$900", saving: "80%" },
      { name: "IVF Treatment", emea: "$10,000–$15,000", local: "$3,000–$5,000", saving: "65%" },
    ],
    facilities: [
      "40+ JCI-accredited hospitals",
      "Globally trained surgeons with 15+ years experience",
      "State-of-the-art robotic surgery facilities",
      "Dedicated international patient departments",
      "Post-operative rehabilitation centres",
    ],
    achievements: [
      "India performs 15,000+ organ transplants annually",
      "Top destination for cardiac and orthopaedic surgery",
      "Fastest growing medical tourism market globally",
      "Over 2 million international patients annually",
    ],
    successStories: [
      { patient: "Sarah M., UK", treatment: "Cardiac Bypass", quote: "I saved £60,000 and received exceptional care at Medanta Hospital. The surgeons were world-class." },
      { patient: "Ahmad R., UAE", treatment: "Knee Replacement", quote: "From consultation to recovery, the entire experience in India was seamless and professional." },
      { patient: "Lisa K., Germany", treatment: "Dental Implants", quote: "Got 6 implants for the price of 1 back home. The clinic in Delhi was better equipped than anything I've seen in Europe." },
    ],
  },
  thailand: {
    name: "Thailand",
    flag: "🇹🇭",
    tagline: "The hospitality capital of medical tourism",
    savings: "50–75%",
    procedures: [
      { name: "Heart Bypass (CABG)", emea: "$70,000–$130,000", local: "$12,000–$18,000", saving: "78%" },
      { name: "Hip Replacement", emea: "$30,000–$50,000", local: "$12,000–$16,000", saving: "62%" },
      { name: "Cosmetic Surgery (Facelift)", emea: "$15,000–$25,000", local: "$3,500–$6,000", saving: "75%" },
      { name: "Dental Crown", emea: "$1,000–$2,500", local: "$200–$500", saving: "78%" },
    ],
    facilities: [
      "Bumrungrad International — one of the world's most renowned hospitals",
      "60+ internationally accredited facilities",
      "World-leading cosmetic & reconstructive surgery",
      "Luxury recovery resorts with medical supervision",
      "Multilingual medical concierge services",
    ],
    achievements: [
      "Bumrungrad treats 1.1 million patients/year from 190+ countries",
      "#1 destination for cosmetic surgery in Asia",
      "Thailand's medical tourism worth $4.7 billion annually",
      "Over 3.5 million medical tourists per year",
    ],
    successStories: [
      { patient: "James P., Australia", treatment: "Cosmetic Surgery", quote: "The results exceeded my expectations. The recovery resort was like a 5-star hotel with nurses on call 24/7." },
      { patient: "Maria C., Italy", treatment: "Dental Work", quote: "I had a full smile makeover in Bangkok for less than a single veneer costs in Milan. Incredible quality." },
      { patient: "David W., Canada", treatment: "Cardiac Procedure", quote: "Bumrungrad felt like stepping into the future. The technology and care team were extraordinary." },
    ],
  },
};

export default function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const dest = destinationData[id || ""];

  if (!dest) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-28 pb-20 text-center">
          <p className="text-muted-foreground">Destination not found.</p>
          <Link to="/" className="text-primary mt-4 inline-block">Back to Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <Link to="/#destinations" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Destinations
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-2">
              {dest.flag} {dest.name} vs EMEA
            </h1>
            <p className="text-xl text-muted-foreground">{dest.tagline}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 font-semibold">
              <TrendingDown className="h-4 w-4" /> Save {dest.savings} compared to EMEA
            </div>
          </motion.div>

          {/* Price Comparison */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <TrendingDown className="h-6 w-6 text-primary" /> Price Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 pr-4 text-sm font-medium text-muted-foreground">Procedure</th>
                    <th className="py-3 px-4 text-sm font-medium text-muted-foreground">EMEA Price</th>
                    <th className="py-3 px-4 text-sm font-medium text-muted-foreground">{dest.name} Price</th>
                    <th className="py-3 pl-4 text-sm font-medium text-muted-foreground">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {dest.procedures.map((p) => (
                    <tr key={p.name} className="border-b border-border/50">
                      <td className="py-4 pr-4 font-medium text-foreground">{p.name}</td>
                      <td className="py-4 px-4 text-muted-foreground line-through">{p.emea}</td>
                      <td className="py-4 px-4 font-semibold text-primary">{p.local}</td>
                      <td className="py-4 pl-4">
                        <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-sm font-semibold">
                          {p.saving}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Facilities */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" /> Medical Facilities & Advancements
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {dest.facilities.map((f) => (
                <Card key={f} className="shadow-soft">
                  <CardContent className="flex items-start gap-3 p-5">
                    <Stethoscope className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-foreground">{f}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" /> Achievements
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {dest.achievements.map((a) => (
                <div key={a} className="flex items-start gap-3 bg-secondary rounded-xl p-5">
                  <Award className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" /> Success Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {dest.successStories.map((s) => (
                <Card key={s.patient} className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">{s.patient}</CardTitle>
                    <p className="text-sm text-primary">{s.treatment}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm italic">"{s.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link to="/questionnaire">
              <Button size="lg" className="bg-accent-gradient text-accent-foreground shadow-soft hover:shadow-elevated">
                Get Your Free Quote Now
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
