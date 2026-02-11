-- Create testimonials table and seed defaults
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  country TEXT,
  treatment TEXT,
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read testimonials
CREATE POLICY "Anyone can view testimonials" ON public.testimonials
  FOR SELECT USING (true);

-- Allow anyone (anonymous) to insert testimonials (for public submissions)
CREATE POLICY "Anyone can create testimonials" ON public.testimonials
  FOR INSERT WITH CHECK (true);

-- Seed some default testimonials
INSERT INTO public.testimonials (name, country, treatment, quote, rating) VALUES
  ('Sarah M.', 'United States', 'Dental Implants', 'I saved over $12,000 on dental implants in Turkey. The hospital was more modern than anything back home, and the care was exceptional.', 5),
  ('James L.', 'United Kingdom', 'Hip Replacement', 'After 18 months on the NHS waiting list, I had my hip replaced in India within 2 weeks. Best decision I ever made.', 5),
  ('Maria K.', 'Canada', 'IVF Treatment', 'We went through 2 failed IVF cycles at home. Our third attempt in Spain was successful — and cost a fraction of what we'd paid before.', 5);
