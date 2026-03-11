# Scripts LLM

## generate-llm-snapshots.mjs

Ce script génère des snapshots HTML statiques optimisés pour les LLM (ChatGPT, Claude, Perplexity, etc.).

### Utilisation

```bash
# Générer les snapshots manuellement
node scripts/generate-llm-snapshots.mjs

# Ou automatiquement lors du build (configuré dans vercel.json)
npm run build
```

### Fonctionnalités

- ✅ Page d'accueil statique avec présentation d'Archipel AI
- ✅ Page blog avec liste des articles
- ✅ Pages individuelles pour chaque article publié
- ✅ Contenu complet accessible sans JavaScript
- ✅ Métadonnées SEO optimisées
- ✅ FAQ incluses dans les articles

### Architecture

Les snapshots sont générés dans `dist/llm-snapshots/` :
- `index.html` - Page d'accueil
- `blog.html` - Liste des articles de blog
- `blog/[slug].html` - Articles individuels

### Configuration Vercel

Le fichier `vercel.json` est configuré pour détecter les LLM via leur User-Agent et servir automatiquement les snapshots statiques.

User-Agents détectés :
- ChatGPT/GPTBot
- Claude/ClaudeBot  
- Perplexity/PerplexityBot
- Anthropic
- OpenAI
- bingbot
- Googlebot

*Dernière mise à jour: 4 septembre 2025*