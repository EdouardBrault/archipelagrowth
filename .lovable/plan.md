

# Plan : Simplifier la création d'article en une seule page

## Constat

La création d'article utilise un wizard en 7 étapes (`CreateArticleForm.tsx` + `StepOne` à `StepSix`) alors que l'éditeur d'édition (`EditArticleForm.tsx`) est déjà sur une seule page avec des sections collapsibles. L'expérience est inutilement complexe pour la création.

## Approche

Remplacer `CreateArticleForm.tsx` par un formulaire single-page qui reprend exactement la structure de `EditArticleForm.tsx` (qui fonctionne déjà bien), avec les mêmes sections :

1. **Infos de base** — Titre, slug (auto-généré), auteur, résumé, contenu WYSIWYG
2. **Catégorie & Tags**
3. **Image mise en avant** (upload + alt text)
4. **Image article** (upload + alt text)
5. **FAQ** (éditeur existant)
6. **SEO** (meta title, meta description, aperçu Google)
7. **Publication** (statut draft/published, date)
8. **Bouton "Sauvegarder"** en bas

## Changements

### 1. Réécrire `CreateArticleForm.tsx`
- Supprimer le wizard (steps, progress bar, next/previous)
- Réutiliser les mêmes sous-composants que `EditArticleForm` : `BasicInfoSection`, `CategoryTagsSection`, `ImageUploadSection`, `ArticleImageSection`, `FaqEditor`, `SeoFieldsSection`, `PublicationSection`
- Conserver le hook `useArticleForm` pour le state et la logique de soumission
- Layout identique à `EditArticleForm` : sections en cartes blanches empilées verticalement

### 2. Supprimer les fichiers inutiles
- `ProgressBar.tsx`, `StepOne.tsx` à `StepSix.tsx`, `StepThreeB.tsx` — plus nécessaires

### 3. Adapter `useArticleForm`
- Supprimer `currentStep` / `setCurrentStep` (plus de wizard)
- Le reste (formData, uploadImage, submitArticle) reste identique

