# PRD — Page produit REFRAM™ (OVERKKAST × IDEALMODEL)

## Problème initial
L'utilisateur (OVERKKAST, www.overkkast.com) souhaite une page web à ajouter à son site, basée sur ses documents (trifold REFRAM™ IDEALMODEL + photos), dans le même esprit que les pages ow-grinding et ow-grinding-hub (style éditorial industriel sombre).

## Choix utilisateur
- Bilingue FR / EN (sélecteur de langue)
- CTA : formulaire de contact + numéro de téléphone
- Contenu : tout le PDF trifold REFRAM™
- Pas de vidéo, images uniquement
- Page autonome destinée à être liée depuis overkkast.com

## Architecture
- Frontend : React (CRA + craco), Tailwind, framer-motion, lenis (smooth scroll), sonner (toasts)
- Backend : FastAPI, endpoint POST /api/contact → envoi e-mail via Emergent managed Resend (EMAIL_FROM_NAME=OVERKKAST, OWNER_EMAIL=contact@overkkast.com) + archivage MongoDB (collection quote_requests)
- Assets : visuels extraits du PDF trifold + photos fournies par l'utilisateur (/app/frontend/public/img/)

## Sections implémentées (04/11/2026)
- Header glass sticky : logo SVG étoile (favicon identique), nav ancrée, FR/EN, tél 01 84 80 86 99, CTA devis
- Hero cinétique : reveal ligne par ligne masqué, parallaxe légère, stats (45+ ans, 60+ pays, 2 160 coups/min, ISO/CE)
- Marquee éditorial lent
- 01 — Pourquoi c'est critique : 2 paragraphes + 6 cartes bénéfices + coupe de lining
- 02 — Gamme : 4 onglets (mural / fond / grues / main), 10 produits (2WR, 3WR, 5WR, 1BR, OAF, LIF.A01, LIF.M01, HT, HC, SR)
- 03 — Performance : tableau technique complet (4 familles de pistons × 3 pressions)
- 04 — Automatisme PLC : 4 étapes du cycle + photos console PLC et tête de fond réelles
- 05 — Pièces détachées : chips + visuel pièces
- 06 — Devis : formulaire bilingue (envoi e-mail réel vers contact@overkkast.com) + coordonnées directes
- Footer : certifications ISO 9001/10002/14001/45001 + CE, liens

## Vérifié
- POST /api/contact : 3 envois réussis (202, email_id retournés), dont 1 via le formulaire navigateur (toast de succès)
- FR→EN instantané vérifié (titre hero en anglais)
- Responsive 375 / 768 / 1366 px vérifié par captures
- Une erreur transitoire 500 du proxy e-mail a été observée une fois, non reproduite ensuite

## Itérations
- 05/11/2026 : thème blanc (fond #F7F5F1, sections alternées #EFEDE6, texte #10151D) — les visuels produits et le footer restent sur fond sombre volontairement pour le contraste.
- 05/11/2026 : fiches détaillées par machine — modal au clic sur chaque carte produit (description, caractéristiques, options & accessoires, FR/EN) ; le bouton « Demander cette configuration » pré-remplit le champ « Équipement d'intérêt » du formulaire et y fait défiler.

- 05/11/2026 : couleur secondaire passée à un bleu neutre (#2563EB) sur toute la page (sous-titres header/footer, eyebrow du hero, numéros de section).
- 05/11/2026 : téléphone remplacé par +33 (0)7 49 70 73 89 partout (header, section contact, footer, lien tel:).
- 05/11/2026 : vrai logo OVERKKAST intégré (version sombre dans le header sur fond clair, version blanche dans le footer sombre) — l'étoile SVG supprimée ; favicon = rond doré du logo.

- 05/11/2026 : boutons passés en or Overkkast #C5B358 avec balayage lumineux au survol (classes .btn-gold / .btn-gold-outline) — CTA header, hero, fiches machines, onglets gamme, envoi formulaire, sélecteur de langue, en-tête du tableau.
- 05/11/2026 : typographie plus classique/professionnelle — titres Libre Franklin, texte Source Sans 3, labels IBM Plex Mono ; petites tailles de police augmentées partout (10-12px → 13-14px, 14px → 16px).
- 05/11/2026 : header agrandi (logo h-12, menu en text-sm, hauteur 96px) ; sous-titre « Distributeur France » retiré du header (conservé au footer) pour éviter le chevauchement du menu.

- 05/11/2026 : fix déformation logo header (flex-shrink + max-width écrasaient l'image : ratio 4,58 → 5,29 natif, shrink-0 sur bouton et image, max-w-none) ; lien « Télécharger la plaquette » du hero passé en bouton à contour doré (btn-gold-outline).

- 05/11/2026 : section « Film » ajoutée au milieu de la page (entre Performance et Automatisme) — vidéo de présentation IDEALMODEL 2025 (6 min, hébergée en local /video/presentation-2025.mp4), lecteur élégant avec affiche extraite de la vidéo, bouton lecture doré pulsant, contrôles natifs après le premier clic. Lecture vérifiée (currentTime > 0).

- 05/11/2026 : bouton « Être rappelé » dans la section contact — fenêtre avec le seul numéro de téléphone (+ consentement), endpoint POST /api/callback avec validation du numéro, e-mail envoyé à contact@overkkast.com avec lien tel:, archivage MongoDB (callback_requests). Testé : envoi réel réussi + numéro invalide rejeté.

- 05/11/2026 : bouton flottant « Être rappelé » en bas à droite pendant toute la visite (apparaît après le hero, se masque sur la section contact et quand la fenêtre est ouverte) ; la demande de rappel inclut désormais nom + prénom en plus du téléphone (backend, e-mail et MongoDB mis à jour).

- 05/11/2026 : SEO & cartes de partage — head complet (title 55c, description ~145c, OG + Twitter summary_large_image avec image absolue hébergée, locale fr_FR/en_US), JSON-LD Organization (tél/email/adresse confirmés), noscript riche, robots.txt (groupe IA explicite + Disallow /api/), llms.txt. Non émis volontairement en attendant l'URL de production de la page : canonical, og:url, sitemap.xml. À faire après déploiement : activer le toggle « Search Engine Crawling » et re-vérifier sur le domaine live.

- 06/11/2026 : lien « overkkast.com » ajouté au menu (desktop + mobile) vers le site principal ; header rééquilibré (menu complet dès 1280 px, burger en dessous, téléphone visible à partir de 1536 px) pour éviter tout débordement.

## Backlog priorisé
- P0 : déploiement + liaison depuis overkkast.com (menu/bouton)
- P1 : SEO (meta OG, sitemap dédié) si la page est indexée séparément
- P2 : section vidéo (MP4 de présentation fourni, actuellement non utilisé à la demande de l'utilisateur)
- P2 : fiches PDF par machine

## Prochaines tâches
- Deploy puis ajout du lien sur overkkast.com
- Option : réintégrer la vidéo de présentation si souhaité
