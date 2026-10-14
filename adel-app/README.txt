ADEL V5 - DEPLOIEMENT NETLIFY AVEC SYNCHRONISATION

IMPORTANT
La synchronisation entre deux navigateurs utilise Netlify Functions et Netlify Blobs.
Il faut donc faire un deploiement avec build, idealement depuis GitHub/GitLab. Un simple glisser-deposer statique ne construit pas les dependances de la Function.

DEPLOIEMENT RECOMMANDE
1. Decompresser cette archive dans un depot GitHub ou GitLab.
2. Dans Netlify : Add new site > Import an existing project.
3. Selectionner le depot. Netlify lira automatiquement netlify.toml.
4. Publier le site.
5. Dans l'application, ouvrir Parametres et saisir un code famille prive d'au moins 10 caracteres.
6. Saisir exactement le meme code sur le navigateur de Papa et celui de Maman.
7. Cliquer sur Synchroniser maintenant sur chaque appareil.

DONNEES
- Synchronisation automatique apres chaque modification et lecture toutes les 10 secondes.
- Copie locale conservee pour permettre l'utilisation temporaire hors connexion.
- Strategie actuelle : la derniere modification enregistree gagne en cas de modifications simultanees.
- Utiliser l'export JSON comme sauvegarde periodique.

CONFIDENTIALITE
Le code famille donne acces aux donnees. Utiliser un code long et difficile a deviner, ne pas le publier.
