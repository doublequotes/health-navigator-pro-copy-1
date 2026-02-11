-- Add color/icon/image fields to treatment_categories and seed categories + treatments

ALTER TABLE public.treatment_categories
  ADD COLUMN IF NOT EXISTS color TEXT,
  ADD COLUMN IF NOT EXISTS bg_color TEXT,
  ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Seed categories (insert or ignore existing by slug)
INSERT INTO public.treatment_categories (id, name, slug, icon, description, color, bg_color, image_url)
VALUES
  (gen_random_uuid(), 'Cardiac Surgery', 'cardiac', '🫀', 'Heart and cardiovascular procedures', '#ff3b30', 'rgba(255,59,48,0.08)', 'https://images.example.com/cardiac.jpg'),
  (gen_random_uuid(), 'Orthopedics', 'orthopedics', '🦴', 'Joint replacement, spine surgery, and bone procedures', '#ff9500', 'rgba(255,149,0,0.08)', 'https://images.example.com/orthopedics.jpg'),
  (gen_random_uuid(), 'Ophthalmology', 'ophthalmology', '👁️', 'Eye surgery including LASIK and cataract removal', '#34c759', 'rgba(52,199,89,0.08)', 'https://images.example.com/ophthalmology.jpg'),
  (gen_random_uuid(), 'Dental Care', 'dental', '🦷', 'Dental implants, veneers, and oral surgery', '#ffd60a', 'rgba(255,214,10,0.08)', 'https://images.example.com/dental.jpg'),
  (gen_random_uuid(), 'Fertility', 'fertility', '👶', 'IVF, IUI, and reproductive treatments', '#ff2d55', 'rgba(255,45,85,0.08)', 'https://images.example.com/fertility.jpg'),
  (gen_random_uuid(), 'Neurology', 'neurology', '🧠', 'Brain and nervous system procedures', '#5ac8fa', 'rgba(90,200,250,0.08)', 'https://images.example.com/neurology.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample treatments linked to categories (use slug lookups)
INSERT INTO public.treatments (id, category_id, name, description, is_active)
VALUES
  (gen_random_uuid(), (SELECT id FROM public.treatment_categories WHERE slug='cardiac' LIMIT 1), 'Coronary Artery Bypass Grafting (CABG)', 'CABG description...', true),
  (gen_random_uuid(), (SELECT id FROM public.treatment_categories WHERE slug='orthopedics' LIMIT 1), 'Total Hip Replacement', 'Hip replacement description...', true),
  (gen_random_uuid(), (SELECT id FROM public.treatment_categories WHERE slug='ophthalmology' LIMIT 1), 'Cataract Surgery', 'Cataract surgery description...', true),
  (gen_random_uuid(), (SELECT id FROM public.treatment_categories WHERE slug='dental' LIMIT 1), 'Dental Implants', 'Dental implants description...', true),
  (gen_random_uuid(), (SELECT id FROM public.treatment_categories WHERE slug='fertility' LIMIT 1), 'IVF Cycle', 'IVF description...', true),
  (gen_random_uuid(), (SELECT id FROM public.treatment_categories WHERE slug='neurology' LIMIT 1), 'Deep Brain Stimulation', 'DBS description...', true)
ON CONFLICT DO NOTHING;
