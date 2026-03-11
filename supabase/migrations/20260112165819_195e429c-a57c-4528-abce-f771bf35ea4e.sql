INSERT INTO public.admin_users (email, is_active)
VALUES ('nathan@archipelmarketing.com', true)
ON CONFLICT (email) DO UPDATE SET is_active = true;