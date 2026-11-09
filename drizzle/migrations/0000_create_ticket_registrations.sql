CREATE TABLE public.ticket_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_reference text NOT NULL UNIQUE,
  tier text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  unit_price numeric NOT NULL,
  total_amount numeric NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  organization text,
  guest_names text,
  payment_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.ticket_registrations TO service_role;
ALTER TABLE public.ticket_registrations ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_ticket_registrations_updated_at BEFORE UPDATE ON public.ticket_registrations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();