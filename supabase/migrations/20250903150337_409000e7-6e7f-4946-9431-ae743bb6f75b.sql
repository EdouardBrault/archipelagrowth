
-- Add faq_sections column for multi-section FAQs
ALTER TABLE public."Blog Archipel AI"
ADD COLUMN IF NOT EXISTS faq_sections jsonb DEFAULT '[]'::jsonb;
