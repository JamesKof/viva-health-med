
-- Donations: remove overly permissive public policies. Edge functions with service role bypass RLS.
DROP POLICY IF EXISTS "Allow public select for admin dashboard" ON public.donations;
DROP POLICY IF EXISTS "Donations can be created via webhook" ON public.donations;
DROP POLICY IF EXISTS "Donations can be updated via webhook" ON public.donations;

-- Newsletter subscribers: remove the always-true SELECT that exposed all emails.
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.newsletter_subscribers;

-- Ensure RLS remains enabled (default deny for public).
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;
