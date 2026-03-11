-- Fix critical RLS policies - replace overly permissive policies with proper admin-only access
-- First, drop the existing overly permissive policies
DROP POLICY IF EXISTS "Allow all delete" ON public."Blog Archipel AI";
DROP POLICY IF EXISTS "Allow all insert" ON public."Blog Archipel AI";
DROP POLICY IF EXISTS "Allow all select" ON public."Blog Archipel AI";
DROP POLICY IF EXISTS "Allow all update" ON public."Blog Archipel AI";

-- Create secure RLS policies for blog content
-- Public can read published articles
CREATE POLICY "Public can read published articles" 
ON public."Blog Archipel AI" 
FOR SELECT 
USING (status = 'published');

-- Only admin users can manage all articles
CREATE POLICY "Admin users can manage articles" 
ON public."Blog Archipel AI" 
FOR ALL
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());

-- Fix Bing submissions table - restrict to admin users only
DROP POLICY IF EXISTS "Allow all operations on bing_url_submissions" ON public.bing_url_submissions;

CREATE POLICY "Only admin users can manage bing submissions" 
ON public.bing_url_submissions 
FOR ALL
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());

-- Create a function to handle admin user creation from auth triggers
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create admin profile for specific email domains or specific emails
  -- This should be configured based on your admin email addresses
  IF NEW.email LIKE '%@archipel-ai.com' OR NEW.email IN (
    'admin@archipel-ai.com',
    'contact@archipel-ai.com'
  ) THEN
    INSERT INTO public.admin_users (email, is_active)
    VALUES (NEW.email, true)
    ON CONFLICT (email) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;