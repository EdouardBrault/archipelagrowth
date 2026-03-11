-- Remove RLS policies on storage.objects for archipel-blog-images bucket to allow uploads without authentication

-- Drop all existing policies on storage.objects for the archipel-blog-images bucket
DROP POLICY IF EXISTS "Give users access to own folder 1oj01fe_0" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder 1oj01fe_1" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder 1oj01fe_2" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder 1oj01fe_3" ON storage.objects;

-- Create new permissive policies for archipel-blog-images bucket
CREATE POLICY "Allow public read access to archipel-blog-images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'archipel-blog-images');

CREATE POLICY "Allow public insert to archipel-blog-images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'archipel-blog-images');

CREATE POLICY "Allow public update to archipel-blog-images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'archipel-blog-images');

CREATE POLICY "Allow public delete to archipel-blog-images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'archipel-blog-images');