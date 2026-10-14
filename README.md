# Adel V6 - installation propre

Cette version remplace les anciens fichiers V5 et tous les hotfix.

## Structure attendue a la racine GitLab

- index.html
- package.json
- netlify.toml
- README.md
- netlify/functions/family-data.mjs

## Mise a jour recommandee

1. Conserver une copie du depot actuel si necessaire.
2. Remplacer les anciens fichiers de l'application par le contenu de ce dossier.
3. Supprimer hotfix-v5.1.js et hotfix-v5.2.js s'ils existent encore.
4. Commit et push vers GitLab.
5. Verifier que Netlify redeploie et que la Function family-data apparait.
6. Faire un rechargement complet du navigateur.
7. Ouvrir le bouton nuage et remettre le meme code famille sur les deux appareils si necessaire.

## Important sur les anciennes donnees

V6 utilise une nouvelle cle locale adel_v6 pour repartir proprement. Les donnees synchronisees existantes du code famille peuvent toutefois etre rechargees depuis Netlify lors de la premiere synchronisation.
