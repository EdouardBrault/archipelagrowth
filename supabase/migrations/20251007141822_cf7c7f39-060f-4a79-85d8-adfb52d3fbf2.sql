-- Suppression du compte admin existant pour thomas@archipelmarketing.com
-- Étape 1 : Supprimer de la table admin_users
DELETE FROM public.admin_users 
WHERE email = 'thomas@archipelmarketing.com';

-- Étape 2 : Supprimer de auth.users
DELETE FROM auth.users 
WHERE id = 'bcb5fe76-b4f6-4847-9879-9f15002b970d';

-- Note: Après cette migration, vous devrez recréer votre compte via l'interface
-- à /admin ou /archipel-dashboard avec :
-- Email: thomas@archipelmarketing.com
-- Mot de passe: Archipel2025?