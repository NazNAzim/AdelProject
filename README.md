# Adel V6 complète

Version propre et complète pour Netlify.

## Fichiers
- index.html
- manifest.webmanifest
- sw.js
- package.json
- netlify.toml
- netlify/functions/family-data.mjs

## Déploiement
Remplacez l'ancienne application par tous les fichiers de ce dossier, puis commit/push vers GitLab. Supprimez les anciens fichiers hotfix.

Le service worker met en cache uniquement l'enveloppe statique de l'application et exclut `/.netlify/functions/` pour ne pas mettre en cache la synchronisation familiale.
