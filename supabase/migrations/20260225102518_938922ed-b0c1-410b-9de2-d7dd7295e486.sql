
-- Create user_roles system (secure role management)
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Legacy function used by AdminAuth component
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin users table (used by AdminManagement component)
CREATE TABLE public.admin_users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view admin_users"
ON public.admin_users FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage admin_users"
ON public.admin_users FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Authors table
CREATE TABLE public.authors (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name text NOT NULL,
    last_name text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read authors"
ON public.authors FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage authors"
ON public.authors FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Blog articles table (named "Blog Archipel AI" as used in code)
CREATE TABLE public."Blog Archipel AI" (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text,
    slug text,
    excerpt text,
    content text,
    author text DEFAULT 'Archipel AI',
    category text,
    tags text,
    reading_time integer DEFAULT 5,
    featured_image text,
    alt_text text,
    article_image text,
    article_image_alt text,
    meta_title text,
    meta_description text,
    status text DEFAULT 'draft',
    faq jsonb,
    faq_sections jsonb,
    published_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public."Blog Archipel AI" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published articles"
ON public."Blog Archipel AI" FOR SELECT
USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage articles"
ON public."Blog Archipel AI" FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Bing URL submissions table
CREATE TABLE public.bing_url_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_url text NOT NULL,
    urls_submitted text[] NOT NULL DEFAULT '{}',
    submission_date timestamptz NOT NULL DEFAULT now(),
    status text DEFAULT 'pending'
);

ALTER TABLE public.bing_url_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage bing submissions"
ON public.bing_url_submissions FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger to auto-grant admin role to @archipelmarketing.com emails
CREATE OR REPLACE FUNCTION public.handle_new_user_admin_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email LIKE '%@archipelmarketing.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
    INSERT INTO public.admin_users (email)
    VALUES (NEW.email)
    ON CONFLICT (email) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_admin_role();
