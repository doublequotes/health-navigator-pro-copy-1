import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Testimonial = {
  id?: string;
  name: string;
  country?: string | null;
  treatment?: string | null;
  quote: string;
  rating?: number;
  created_at?: string;
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [countryFilter, setCountryFilter] = useState<string>('All');
  const [ratingFilter, setRatingFilter] = useState<number | 'All'>('All');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 3;

  // form state
  const [form, setForm] = useState<Testimonial>({ name: "", country: "", treatment: "", quote: "", rating: 5 });

  const fetchTestimonials = async (pageNum = page) => {
    setLoading(true);
    try {
      const from = (pageNum - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase.from("testimonials").select("*", { count: 'exact' }) as any;
      if (countryFilter !== 'All') query = query.eq('country', countryFilter);
      if (ratingFilter !== 'All') query = query.gte('rating', ratingFilter as number);

      query = query.order("created_at", { ascending: false }).range(from, to);

      const { data, error, count } = await query;
      setLoading(false);
      if (error) {
        console.error("Error fetching testimonials:", error.message);
        return;
      }
      setTestimonials((data as Testimonial[]) || []);
      setTotalCount(count || 0);
    } catch (err) {
      setLoading(false);
      console.error('Fetch testimonials failed', err);
    }
  };

  useEffect(() => {
    // when filters or page change, fetch
    fetchTestimonials(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, countryFilter, ratingFilter]);

  const countries = Array.from(new Set(testimonials.map(t => t.country).filter(Boolean))).sort();
  // When using server-side filters, `testimonials` already contains filtered results for the current page.
  const filteredTestimonials = testimonials;

  // stepper modal state
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const steps = ['Email', 'Name', 'Country', 'Treatment', 'Quote', 'Rating'];

  const canNext = () => {
    switch (step) {
      case 0: return Boolean(form && (form as any).email && (form as any).email.includes('@'));
      case 1: return Boolean(form.name && form.name.trim().length > 1);
      case 2: return Boolean(form.country && String(form.country).trim().length > 1);
      case 3: return Boolean(form.treatment && String(form.treatment).trim().length > 1);
      case 4: return Boolean(form.quote && form.quote.trim().length > 10);
      case 5: return true;
      default: return false;
    }
  };

  const openStepper = () => { setOpen(true); setStep(0); };

  const prevStep = () => setStep(s => Math.max(0, s - 1));
  const nextStep = () => setStep(s => Math.min(steps.length - 1, s + 1));

  const submitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name || "Anonymous",
        country: form.country || null,
        treatment: form.treatment || null,
        quote: form.quote,
        rating: form.rating || 5,
        email: (form as any).email || null,
      };
      const { error } = await (supabase.from("testimonials") as any).insert(payload);
      if (error) throw error;
      setForm({ name: "", country: "", treatment: "", quote: "", rating: 5 });
      // after submit go back to first page and refresh
      setPage(1);
      fetchTestimonials(1);
    } catch (err) {
      console.error("Failed to submit testimonial", err);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-3 mb-4">
            Real Stories, Real Savings
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hear from patients who transformed their lives through medical tourism.
          </p>
        </motion.div>

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <label className="text-sm">Country</label>
            <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="select">
              <option value="All">All</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <label className="text-sm">Min Rating</label>
            <select value={ratingFilter as any} onChange={(e) => setRatingFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))} className="select">
              <option value="All">All</option>
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}+</option>)}
            </select>
          </div>
          <div>
            <button onClick={openStepper} className="btn-netflix">Write a review</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {loading && <div className="text-center">Loading...</div>}
          {!loading && filteredTestimonials.map((t, i) => (
            <motion.div
              key={t.id || `${t.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative p-8 rounded-2xl card-netflix"
            >
              <Quote className="h-8 w-8 text-primary/15 mb-4" />
              <p className="text-foreground/80 leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <div>
                <p className="font-display font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.country} · {t.treatment}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: Math.max(1, Math.ceil(totalCount / PAGE_SIZE)) }).map((_, idx) => {
            const p = idx + 1;
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded ${p === page ? 'bg-primary text-white' : 'bg-muted-foreground/10'}`}>
                {p}
              </button>
            );
          })}
        </div>

        {/* Stepper modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-card rounded-xl p-6 w-full max-w-2xl card-netflix">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Share your story</h4>
                <div className="flex items-center gap-2">
                  {steps.map((s, idx) => (
                    <div key={s} className={`stepper-indicator ${idx === step ? 'bg-primary text-white' : 'bg-muted-foreground/10 text-muted-foreground'}`}>{idx+1}</div>
                  ))}
                </div>
              </div>
              <form onSubmit={async (e) => { e.preventDefault(); await submitTestimonial(e); setOpen(false); setStep(0); }}>
                <div className="min-h-[160px]">
                  {step === 0 && (
                    <div>
                      <label className="text-sm">Registered email</label>
                      <input className="input-netflix mt-2 w-full" value={(form as any).email || ''} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
                    </div>
                  )}
                  {step === 1 && (
                    <div>
                      <label className="text-sm">Name</label>
                      <input className="input-netflix mt-2 w-full" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" />
                    </div>
                  )}
                  {step === 2 && (
                    <div>
                      <label className="text-sm">Country</label>
                      <input className="input-netflix mt-2 w-full" value={form.country as string} onChange={(e) => setForm(f => ({ ...f, country: e.target.value }))} placeholder="Country" />
                    </div>
                  )}
                  {step === 3 && (
                    <div>
                      <label className="text-sm">Treatment</label>
                      <input className="input-netflix mt-2 w-full" value={form.treatment as string} onChange={(e) => setForm(f => ({ ...f, treatment: e.target.value }))} placeholder="Treatment" />
                    </div>
                  )}
                  {step === 4 && (
                    <div>
                      <label className="text-sm">Quote</label>
                      <textarea className="input-netflix mt-2 w-full h-28" value={form.quote} onChange={(e) => setForm(f => ({ ...f, quote: e.target.value }))} placeholder="Share what happened and any savings you experienced" />
                    </div>
                  )}
                  {step === 5 && (
                    <div>
                      <label className="text-sm">Rating</label>
                      <select className="input-netflix mt-2" value={form.rating} onChange={(e) => setForm(f => ({ ...f, rating: Number(e.target.value) }))}>
                        {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <button type="button" onClick={() => { setOpen(false); setStep(0); }} className="btn">Cancel</button>
                  </div>
                  <div className="flex items-center gap-2">
                    {step > 0 && <button type="button" onClick={prevStep} className="btn">Back</button>}
                    {step < steps.length - 1 && <button type="button" onClick={nextStep} disabled={!canNext()} className="btn-netflix">Next</button>}
                    {step === steps.length - 1 && <button type="submit" disabled={!canNext()} className="btn-netflix">Submit review</button>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;