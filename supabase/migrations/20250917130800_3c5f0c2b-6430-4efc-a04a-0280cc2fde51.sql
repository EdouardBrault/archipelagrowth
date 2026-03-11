-- Add article image columns to the "Blog Archipel AI" table
ALTER TABLE "Blog Archipel AI" 
ADD COLUMN article_image text,
ADD COLUMN article_image_alt text;