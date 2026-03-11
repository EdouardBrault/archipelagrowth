-- Update the generate_canonical_url function to use the new domain
CREATE OR REPLACE FUNCTION public.generate_canonical_url()
RETURNS TRIGGER AS $function$
DECLARE
  base_url text := 'https://archipelmarketing.com';
  route text;
BEGIN
  IF TG_TABLE_NAME = 'Blog Archipel AI' THEN
    route := '/blog/';
  ELSE
    route := '/';
  END IF;

  IF NEW.canonical_url IS NULL OR NEW.canonical_url = '' OR 
     (TG_OP = 'UPDATE' AND OLD.slug IS DISTINCT FROM NEW.slug) THEN
    NEW.canonical_url := base_url || route || NEW.slug;
  END IF;

  RETURN NEW;
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update all existing canonical URLs from archipel-ai.com to archipelmarketing.com
UPDATE "Blog Archipel AI"
SET canonical_url = REPLACE(canonical_url, 'archipel-ai.com', 'archipelmarketing.com')
WHERE canonical_url LIKE '%archipel-ai.com%';