-- Phase 3 : Infrastructure de notification IndexNow
-- Extension pg_net pour les requêtes HTTP asynchrones

-- Activer pg_net
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Fonction qui notifie IndexNow via l'Edge Function
CREATE OR REPLACE FUNCTION public.notify_indexnow()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  payload jsonb;
  request_id bigint;
BEGIN
  -- Notifie seulement si le contenu est publié
  IF (TG_OP = 'UPDATE' AND NEW.status = 'published') OR 
     (TG_OP = 'INSERT' AND NEW.status = 'published') THEN

    payload := jsonb_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'record', jsonb_build_object(
        'id', NEW.id,
        'slug', NEW.slug,
        'status', NEW.status,
        'canonical_url', NEW.canonical_url
      )
    );

    -- Appel HTTP vers l'Edge Function
    SELECT net.http_post(
      url := 'https://zsxfldgmtlfrhfnjgekz.supabase.co/functions/v1/notify-indexnow',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzeGZsZGdtdGxmcmhmbmpnZWt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NjE4NzksImV4cCI6MjA2NzAzNzg3OX0.F68bDHPEocPlNAaQJaGOa-bk-cuztgjsdVTvhAZOH1c"}'::jsonb,
      body := payload
    ) INTO request_id;

    RAISE LOG 'IndexNow notification queued with request_id: %', request_id;
  END IF;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Failed to notify IndexNow: %', SQLERRM;
    RETURN NEW;
END;
$function$;

-- Trigger sur la table Blog Archipel AI
-- S'exécute APRÈS generate_canonical_url pour avoir l'URL correcte
DROP TRIGGER IF EXISTS trigger_notify_indexnow_blog ON "Blog Archipel AI";
CREATE TRIGGER trigger_notify_indexnow_blog
  AFTER INSERT OR UPDATE OF status, slug, title, content
  ON "Blog Archipel AI"
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_indexnow();