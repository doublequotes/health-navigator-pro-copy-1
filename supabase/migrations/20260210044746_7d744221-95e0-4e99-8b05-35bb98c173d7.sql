-- Tighten audit_logs insert: only authenticated users or service role
DROP POLICY "System can insert audit logs" ON public.audit_logs;
CREATE POLICY "Authenticated users can insert audit logs" ON public.audit_logs
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- The "Anyone can create leads" policy stays WITH CHECK (true) intentionally
-- because anonymous website visitors must be able to submit questionnaire leads