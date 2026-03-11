
-- Créer une table pour les utilisateurs autorisés du back-office
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insérer les utilisateurs autorisés
INSERT INTO public.admin_users (email) VALUES 
  ('edouard@archipelmarketing.com'),
  ('michael@archipelmarketing.com'),
  ('nour@archipelmarketing.com'),
  ('thomas@archipelmarketing.com');

-- Activer RLS sur la table admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated users to read admin_users" 
  ON public.admin_users 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Fonction pour vérifier si un utilisateur est admin
CREATE OR REPLACE FUNCTION public.is_admin_user(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = user_email AND is_active = true
  );
$$;
