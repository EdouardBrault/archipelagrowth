
-- ÉTAPE 1: Fonctions DB

CREATE OR REPLACE FUNCTION public.is_current_user_admin()
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) AND is_active = true);
$$;

CREATE OR REPLACE FUNCTION public.is_admin_user(user_email text)
 RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE email = user_email AND is_active = true);
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NEW.email LIKE '%@archipel-ai.com' OR NEW.email LIKE '%@archipelmarketing.com'
     OR NEW.email IN ('admin@archipel-ai.com','contact@archipel-ai.com','thomas@archipelmarketing.com') THEN
    INSERT INTO public.admin_users (email, is_active) VALUES (NEW.email, true) ON CONFLICT (email) DO NOTHING;
  END IF;
  RETURN NEW;
END; $$;

CREATE OR REPLACE FUNCTION public.generate_canonical_url()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE base_url text := 'https://archipelmarketing.com'; route text;
BEGIN
  IF TG_TABLE_NAME = 'Blog Archipel AI' THEN route := '/blog/'; ELSE route := '/'; END IF;
  IF NEW.canonical_url IS NULL OR NEW.canonical_url = '' OR (TG_OP = 'UPDATE' AND OLD.slug IS DISTINCT FROM NEW.slug) THEN
    NEW.canonical_url := base_url || route || NEW.slug;
  END IF;
  RETURN NEW;
END; $$;

-- ÉTAPE 2: Colonnes manquantes
ALTER TABLE public."Blog Archipel AI" ADD COLUMN IF NOT EXISTS canonical_url text;
ALTER TABLE public."Blog Archipel AI" ADD COLUMN IF NOT EXISTS word_count integer;
ALTER TABLE public."Blog Archipel AI" ADD COLUMN IF NOT EXISTS structured_data jsonb;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
ALTER TABLE public.bing_url_submissions ADD COLUMN IF NOT EXISTS bing_response jsonb;
ALTER TABLE public.bing_url_submissions ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Set default for faq/faq_sections if not already
ALTER TABLE public."Blog Archipel AI" ALTER COLUMN faq SET DEFAULT '[]'::jsonb;
ALTER TABLE public."Blog Archipel AI" ALTER COLUMN faq_sections SET DEFAULT '[]'::jsonb;

-- ÉTAPE 3: Drop old RLS policies and create new ones
DROP POLICY IF EXISTS "Anyone can read published articles" ON public."Blog Archipel AI";
DROP POLICY IF EXISTS "Admins can manage articles" ON public."Blog Archipel AI";
DROP POLICY IF EXISTS "Admin users can manage articles" ON public."Blog Archipel AI";
DROP POLICY IF EXISTS "Public can read published articles" ON public."Blog Archipel AI";

CREATE POLICY "Admin users can manage articles" ON public."Blog Archipel AI" FOR ALL USING (is_current_user_admin()) WITH CHECK (is_current_user_admin());
CREATE POLICY "Public can read published articles" ON public."Blog Archipel AI" FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Admins can view admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can manage admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Only admin users can read admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can insert admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can update admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can delete admin_users" ON public.admin_users;

CREATE POLICY "Only admin users can read admin_users" ON public.admin_users FOR SELECT USING (is_current_user_admin());
CREATE POLICY "Admin users can insert admin_users" ON public.admin_users FOR INSERT WITH CHECK (is_current_user_admin());
CREATE POLICY "Admin users can update admin_users" ON public.admin_users FOR UPDATE USING (is_current_user_admin()) WITH CHECK (is_current_user_admin());
CREATE POLICY "Admin users can delete admin_users" ON public.admin_users FOR DELETE USING (is_current_user_admin());

DROP POLICY IF EXISTS "Anyone can read authors" ON public.authors;
DROP POLICY IF EXISTS "Admins can manage authors" ON public.authors;
DROP POLICY IF EXISTS "Admin users can manage authors" ON public.authors;
DROP POLICY IF EXISTS "Public can read authors" ON public.authors;

CREATE POLICY "Admin users can manage authors" ON public.authors FOR ALL USING (is_current_user_admin()) WITH CHECK (is_current_user_admin());
CREATE POLICY "Public can read authors" ON public.authors FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage bing submissions" ON public.bing_url_submissions;
DROP POLICY IF EXISTS "Only admin users can manage bing submissions" ON public.bing_url_submissions;

CREATE POLICY "Only admin users can manage bing submissions" ON public.bing_url_submissions FOR ALL USING (is_current_user_admin()) WITH CHECK (is_current_user_admin());

-- ÉTAPE 4: Triggers
DROP TRIGGER IF EXISTS set_updated_at ON public."Blog Archipel AI";
DROP TRIGGER IF EXISTS set_updated_at_admin ON public.admin_users;
DROP TRIGGER IF EXISTS set_updated_at_authors ON public.authors;
DROP TRIGGER IF EXISTS generate_canonical_url_trigger ON public."Blog Archipel AI";
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public."Blog Archipel AI" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_admin BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_authors BEFORE UPDATE ON public.authors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER generate_canonical_url_trigger BEFORE INSERT OR UPDATE ON public."Blog Archipel AI" FOR EACH ROW EXECUTE FUNCTION generate_canonical_url();
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_admin_user();

-- ÉTAPE 5: Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('archipel-blog-images', 'archipel-blog-images', true) ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies
CREATE POLICY "Public can read blog images" ON storage.objects FOR SELECT USING (bucket_id = 'archipel-blog-images');
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'archipel-blog-images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update blog images" ON storage.objects FOR UPDATE USING (bucket_id = 'archipel-blog-images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete blog images" ON storage.objects FOR DELETE USING (bucket_id = 'archipel-blog-images' AND auth.role() = 'authenticated');
