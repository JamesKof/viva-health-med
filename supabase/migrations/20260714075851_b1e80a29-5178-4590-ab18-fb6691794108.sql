
-- Newsletter subscribers: require valid email format
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
TO public
WITH CHECK (
  email IS NOT NULL
  AND length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

-- Event registrations: require valid inputs
DROP POLICY IF EXISTS "Anyone can register for events" ON public.event_registrations;
CREATE POLICY "Anyone can register for events"
ON public.event_registrations
FOR INSERT
TO public
WITH CHECK (
  event_id IS NOT NULL
  AND full_name IS NOT NULL AND length(btrim(full_name)) BETWEEN 1 AND 200
  AND email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

-- Member onboardings: require valid inputs
DROP POLICY IF EXISTS "Anyone can create member onboardings" ON public.member_onboardings;
CREATE POLICY "Anyone can create member onboardings"
ON public.member_onboardings
FOR INSERT
TO public
WITH CHECK (
  full_name IS NOT NULL AND length(btrim(full_name)) BETWEEN 1 AND 200
  AND email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND contact IS NOT NULL AND length(btrim(contact)) BETWEEN 3 AND 50
  AND place_of_abode IS NOT NULL AND length(btrim(place_of_abode)) BETWEEN 1 AND 200
);
