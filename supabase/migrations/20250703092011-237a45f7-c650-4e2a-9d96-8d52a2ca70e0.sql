
-- Ajouter une colonne FAQ à la table Blog Archipel AI
ALTER TABLE "Blog Archipel AI" 
ADD COLUMN faq jsonb DEFAULT '[]'::jsonb;

-- Ajouter un commentaire pour documenter la structure attendue
COMMENT ON COLUMN "Blog Archipel AI".faq IS 'Array of FAQ items: [{"question": "string", "answer": "string"}]';
