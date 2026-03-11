-- Phase 1 : Préparation de la base de données pour IndexNow

-- Étape 1.1 : Ajouter la colonne canonical_url
ALTER TABLE "Blog Archipel AI"
ADD COLUMN IF NOT EXISTS canonical_url TEXT;

-- Étape 1.2 : Créer la fonction generate_canonical_url()
CREATE OR REPLACE FUNCTION public.generate_canonical_url()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  base_url text := 'https://archipel-ai.com';
  route text;
BEGIN
  -- Détermine la route en fonction de la table
  IF TG_TABLE_NAME = 'Blog Archipel AI' THEN
    route := '/blog/';
  ELSE
    route := '/';
  END IF;

  -- Génère l'URL canonique si elle n'existe pas ou si le slug a changé
  IF NEW.canonical_url IS NULL OR NEW.canonical_url = '' OR 
     (TG_OP = 'UPDATE' AND OLD.slug IS DISTINCT FROM NEW.slug) THEN
    NEW.canonical_url := base_url || route || NEW.slug;
  END IF;

  RETURN NEW;
END;
$function$;

-- Étape 1.3 : Créer le trigger generate_canonical_url_blog
DROP TRIGGER IF EXISTS generate_canonical_url_blog ON "Blog Archipel AI";
CREATE TRIGGER generate_canonical_url_blog
  BEFORE INSERT OR UPDATE OF slug, canonical_url
  ON "Blog Archipel AI"
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_canonical_url();

-- Étape 1.4 : Peupler les URLs canoniques existantes
UPDATE "Blog Archipel AI"
SET canonical_url = 'https://archipel-ai.com/blog/' || slug
WHERE canonical_url IS NULL OR canonical_url = '';