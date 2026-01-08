# Implementation Plan: Color Transformation

## Overview

Plan d'implémentation pour transformer le schéma de couleurs du site Éditions Germinale vers un design spirituel noir/or/blanc.

## Tasks

- [x] 1. Mettre à jour la configuration des couleurs
  - [x] 1.1 Modifier tailwind.config.ts avec les nouvelles couleurs (dark, gold, light)
    - Remplacer les couleurs primary, secondary, accent, neutral par dark, gold, light
    - Ajouter les variantes (dark-light, dark-lighter, gold-light, gold-dark, light-muted, light-dimmed)
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [x] 1.2 Modifier app/globals.css avec les nouvelles variables CSS
    - Mettre à jour les variables :root
    - Modifier les styles de base (body, headings, links)
    - Mettre à jour les classes utilitaires (.btn, .card, .section-*)
    - _Requirements: 1.1, 1.2, 1.3, 1.5_

- [x] 2. Transformer les composants de layout
  - [x] 2.1 Modifier Header.tsx
    - Changer bg-white en bg-dark
    - Changer text-primary en text-gold pour le logo
    - Changer text-neutral-text en text-light pour les liens
    - Ajouter hover:text-gold pour les liens
    - Modifier le bouton Mon Compte en bg-gold text-dark
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  - [x] 2.2 Modifier Footer.tsx
    - Changer bg-white en bg-dark
    - Changer text-primary en text-gold pour le logo et titres
    - Changer text-gray-600 en text-light-dimmed
    - Ajouter hover:text-gold pour les liens
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [x] 2.3 Modifier NewsletterForm.tsx
    - Changer les styles de l'input (bg-dark-light, border-dark-lighter, text-light)
    - Changer le bouton en bg-gold text-dark
    - _Requirements: 3.6, 3.7_
  - [x] 2.4 Modifier FooterSimple.tsx si existant
    - Appliquer les mêmes changements que Footer.tsx
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 3. Transformer les sections de la homepage
  - [x] 3.1 Modifier HeroSection.tsx
    - S'assurer que l'overlay est suffisamment sombre
    - Changer le titre en text-gold
    - Garder la description en text-white
    - Changer le bouton CTA en bg-gold text-dark hover:bg-gold-light
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [x] 3.2 Modifier CollectionsSection.tsx
    - Changer le fond en bg-dark
    - Changer le titre de section en text-gold
    - _Requirements: 6.1_
  - [x] 3.3 Modifier PopularBooksSection.tsx
    - Changer le fond en bg-dark ou bg-dark-light
    - Changer le titre de section en text-gold
    - _Requirements: 6.2_
  - [x] 3.4 Modifier HowItWorksSection.tsx
    - Changer le fond en bg-dark
    - Changer les titres en text-gold
    - Changer le texte en text-light
    - _Requirements: 6.3_
  - [x] 3.5 Modifier AuthorCTASection.tsx
    - Changer le fond en bg-dark-light
    - Changer le titre en text-gold
    - Changer la description en text-light
    - _Requirements: 6.4_
  - [x] 3.6 Modifier ServicesSection.tsx
    - Changer le fond en bg-dark
    - Changer les titres en text-gold
    - _Requirements: 6.5_
  - [x] 3.7 Modifier TestimonialsSection.tsx
    - Changer le fond en bg-dark-light
    - Changer les éléments d'accent en text-gold
    - _Requirements: 6.6_
  - [x] 3.8 Modifier ContactSection.tsx
    - Changer le fond en bg-dark
    - Changer le titre en text-gold
    - _Requirements: 6.7_

- [x] 4. Transformer les composants de livres
  - [x] 4.1 Modifier BookCard.tsx
    - Changer le fond de la carte en bg-dark-light
    - Changer le titre en text-gold
    - Changer la description en text-light-dimmed
    - Ajouter hover:border-gold pour l'effet hover
    - _Requirements: 5.1, 5.2, 5.3, 5.6_
  - [x] 4.2 Modifier BookCarousel.tsx
    - Mettre à jour les styles des flèches de navigation
    - S'assurer que le fond est cohérent
    - _Requirements: 5.1_

- [x] 5. Transformer les composants de collections
  - [x] 5.1 Modifier CollectionCard.tsx
    - Changer le fond en bg-dark-light
    - Changer le titre en text-gold
    - Changer la description en text-light-dimmed
    - _Requirements: 5.4, 5.6_
  - [x] 5.2 Modifier CollectionListCard.tsx
    - Appliquer le même schéma de couleurs
    - _Requirements: 5.5, 5.6_
  - [x] 5.3 Modifier CollectionHero.tsx
    - Changer le fond/overlay en noir
    - Changer le titre en text-gold
    - _Requirements: 7.2_
  - [x] 5.4 Modifier CollectionBooksSection.tsx
    - Changer le fond en bg-dark
    - Changer le titre en text-gold
    - _Requirements: 7.2_
  - [x] 5.5 Modifier CollectionBookCard.tsx
    - Appliquer le schéma noir/or/blanc
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 5.6 Modifier CollectionDetailContent.tsx
    - S'assurer de la cohérence des couleurs
    - _Requirements: 7.2_
  - [x] 5.7 Modifier RelatedCollections.tsx et RelatedCollectionCard.tsx
    - Appliquer le schéma de couleurs cohérent
    - _Requirements: 7.2_

- [x] 6. Transformer la page Collections
  - [x] 6.1 Modifier CollectionsPageContent.tsx
    - Changer le fond en bg-dark
    - Mettre à jour les titres et textes
    - _Requirements: 7.1_
  - [x] 6.2 Modifier SearchAndFilters.tsx
    - Changer les inputs en bg-dark-light border-dark-lighter text-light
    - Changer les boutons de filtre
    - _Requirements: 8.2_

- [x] 7. Transformer les composants UI
  - [x] 7.1 Modifier Breadcrumb.tsx
    - Changer le texte en text-light
    - Ajouter hover:text-gold
    - _Requirements: 8.3_
  - [x] 7.2 Modifier Pagination.tsx
    - Changer l'état actif en bg-gold text-dark
    - Changer l'état inactif en text-light
    - _Requirements: 8.1_

- [x] 8. Transformer la page de soumission de manuscrit
  - [x] 8.1 Modifier ManuscriptForm.tsx
    - Changer le fond en bg-dark-light
    - Mettre à jour les styles des inputs
    - _Requirements: 7.3, 7.4_
  - [x] 8.2 Modifier PersonalInfoSection.tsx
    - Appliquer le schéma de couleurs
    - _Requirements: 7.3, 7.4_
  - [x] 8.3 Modifier WorkDetailsSection.tsx
    - Appliquer le schéma de couleurs
    - _Requirements: 7.3, 7.4_
  - [x] 8.4 Modifier PdfUploadSection.tsx
    - Appliquer le schéma de couleurs
    - _Requirements: 7.3, 7.4_
  - [x] 8.5 Modifier TrustIndicators.tsx
    - Changer les icônes/accents en gold
    - _Requirements: 7.3_

- [x] 9. Mettre à jour les pages principales
  - [x] 9.1 Modifier app/page.tsx (Homepage)
    - S'assurer que le fond global est bg-dark
    - _Requirements: 7.1_
  - [x] 9.2 Modifier app/collections/page.tsx
    - S'assurer que le fond est bg-dark
    - _Requirements: 7.1_
  - [x] 9.3 Modifier app/collections/[slug]/page.tsx
    - S'assurer que le fond est bg-dark
    - _Requirements: 7.2_
  - [x] 9.4 Modifier app/submit-manuscript/page.tsx
    - S'assurer que le fond est bg-dark
    - _Requirements: 7.3_
  - [x] 9.5 Modifier app/layout.tsx
    - S'assurer que le body a bg-dark par défaut
    - _Requirements: 1.5_

- [x] 10. Checkpoint - Vérification visuelle
  - Vérifier que toutes les pages ont un fond noir uniforme
  - Vérifier que tous les titres sont en or
  - Vérifier que tout le texte est en blanc
  - Vérifier les états hover
  - Tester sur mobile et desktop
  - Demander confirmation à l'utilisateur

## Notes

- Toutes les tâches sont requises pour une transformation complète
- L'ordre des tâches est important : commencer par la configuration, puis les layouts, puis les composants
- Chaque composant doit être testé visuellement après modification
- Les tests unitaires existants devront peut-être être mis à jour pour refléter les nouvelles classes CSS
