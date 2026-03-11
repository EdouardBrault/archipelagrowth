-- Fix admin_users table security vulnerability
-- Create a function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    AND is_active = true
  );
$function$;

-- Drop the vulnerable policy that allows all authenticated users to read admin emails
DROP POLICY IF EXISTS "Allow authenticated users to read admin_users" ON public.admin_users;

-- Create a secure policy that only allows admin users to read admin_users table
CREATE POLICY "Only admin users can read admin_users" 
ON public.admin_users 
FOR SELECT 
USING (public.is_current_user_admin());

-- Also create a policy for admins to manage other admin users
CREATE POLICY "Admin users can insert admin_users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Admin users can update admin_users" 
ON public.admin_users 
FOR UPDATE 
USING (public.is_current_user_admin())
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Admin users can delete admin_users" 
ON public.admin_users 
FOR DELETE 
USING (public.is_current_user_admin());