-- Create update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create authors table
CREATE TABLE public.authors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

-- Public can read authors
CREATE POLICY "Public can read authors"
ON public.authors
FOR SELECT
USING (true);

-- Only admins can manage authors
CREATE POLICY "Admin users can manage authors"
ON public.authors
FOR ALL
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());

-- Create trigger for updated_at
CREATE TRIGGER update_authors_updated_at
BEFORE UPDATE ON public.authors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing authors
INSERT INTO public.authors (first_name, last_name) VALUES
  ('Michael', 'Abramczuk'),
  ('Nour', 'Ben Ismail'),
  ('Thomas', 'Bavery'),
  ('Edouard', 'Brault');