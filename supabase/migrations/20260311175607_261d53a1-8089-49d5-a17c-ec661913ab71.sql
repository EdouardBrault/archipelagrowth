CREATE POLICY "Admin users can manage articles"
ON public.articles
FOR ALL
TO public
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());