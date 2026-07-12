
DROP POLICY IF EXISTS "Edge functions can insert logs" ON public.payment_logs;
-- Edge functions use service role which bypasses RLS; no public policy needed.
