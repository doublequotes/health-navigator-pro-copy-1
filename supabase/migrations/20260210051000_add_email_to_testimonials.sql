-- Add email column to testimonials
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS email TEXT;
