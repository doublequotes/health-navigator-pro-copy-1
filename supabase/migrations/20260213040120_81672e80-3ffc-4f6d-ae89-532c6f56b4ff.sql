-- Allow patients to view leads matching their email via profiles
CREATE POLICY "Patients can view leads by email"
ON public.leads
FOR SELECT
USING (
  email IN (
    SELECT p.email FROM public.profiles p WHERE p.user_id = auth.uid()
  )
);

-- Allow patients to withdraw (update status) their own leads
CREATE POLICY "Patients can update own leads"
ON public.leads
FOR UPDATE
USING (
  email IN (
    SELECT p.email FROM public.profiles p WHERE p.user_id = auth.uid()
  )
)
WITH CHECK (
  email IN (
    SELECT p.email FROM public.profiles p WHERE p.user_id = auth.uid()
  )
);