-- Ajouter manuellement thomas@archipelmarketing.com à admin_users
INSERT INTO public.admin_users (email, is_active)
VALUES ('thomas@archipelmarketing.com', true)
ON CONFLICT (email) 
DO UPDATE SET is_active = true;

-- Mettre à jour la fonction pour reconnaître @archipelmarketing.com
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Only create admin profile for specific email domains or specific emails
  IF NEW.email LIKE '%@archipel-ai.com' 
     OR NEW.email LIKE '%@archipelmarketing.com'
     OR NEW.email IN (
       'admin@archipel-ai.com',
       'contact@archipel-ai.com',
       'thomas@archipelmarketing.com'
     ) THEN
    INSERT INTO public.admin_users (email, is_active)
    VALUES (NEW.email, true)
    ON CONFLICT (email) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$function$;