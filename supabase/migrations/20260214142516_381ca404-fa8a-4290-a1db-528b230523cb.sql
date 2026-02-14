
-- Add new columns to leads table for the additional questionnaire fields
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS full_name text,
  ADD COLUMN IF NOT EXISTS date_of_birth date,
  ADD COLUMN IF NOT EXISTS passport_country text,
  ADD COLUMN IF NOT EXISTS translation_language text,
  ADD COLUMN IF NOT EXISTS virtual_consultation text,
  ADD COLUMN IF NOT EXISTS allergies_conditions text[],
  ADD COLUMN IF NOT EXISTS prescription_url text;

-- Create storage bucket for prescriptions
INSERT INTO storage.buckets (id, name, public)
VALUES ('prescriptions', 'prescriptions', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload prescriptions (anonymous lead capture)
CREATE POLICY "Anyone can upload prescriptions"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'prescriptions');

-- Allow anyone to read prescriptions
CREATE POLICY "Anyone can read prescriptions"
ON storage.objects FOR SELECT
USING (bucket_id = 'prescriptions');
