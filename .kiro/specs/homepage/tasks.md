# Implementation Plan: Homepage Éditions Germinale

## Overview

Ce plan détaille les tâches pour implémenter la page d'accueil du site Éditions Germinale en suivant le design fourni. L'implémentation utilise Next.js 15 avec App Router, Tailwind CSS et les composants définis dans le design.

## Tasks

- [x] 1. Configuration initiale et utilitaires
  - [x] 1.1 Créer le fichier utilitaire `src/lib/utils.ts` avec la fonction `cn()` pour les classes Tailwind et `formatPrice()` pour le formatage FCFA
    - Utiliser clsx et tailwind-merge pour cn()
    - formatPrice: séparateur milliers espace, suffixe "FCFA"
    - _Requirements: 4.5, 9.6_

  - [x] 1.2 Configurer les couleurs de la marque dans `tailwind.config.ts`
    - primary: #2C5F4F
    - secondary: #E8A87C
    - accent: #D4A574
    - neutral-light: #F8F6F2
    - neutral-text: #2D2D2D
    - _Requirements: 9.1, 9.2, 9.3_

- [x] 2. Composant Header
  - [x] 2.1 Créer le composant `src/components/layout/Header.tsx`
    - Logo Éditions Germinale à gauche
    - Navigation: Accueil, Collections, Librairie, Soumettre un manuscrit
    - Icône recherche et bouton "Mon Compte" à droite
    - Background blanc avec shadow-sm
    - Responsive: menu hamburger sur mobile
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 8.1_

- [x] 3. Composant HeroSection
  - [x] 3.1 Créer le composant `src/components/home/HeroSection.tsx`
    - Image de fond bibliothèque avec overlay sombre
    - Titre "La littérature qui vous ressemble" en blanc
    - Sous-titre descriptif
    - Bouton CTA "Découvrir nos collections" blanc avec flèche
    - Hauteur responsive: h-[500px] md:h-[600px]
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 4. Composants Collection
  - [x] 4.1 Créer le composant `src/components/collection/CollectionCard.tsx`
    - Image de couverture aspect-[4/5]
    - Nom de la collection en gras
    - Description courte (line-clamp-2)
    - Coins arrondis et shadow au hover
    - Lien vers /collections/[slug]
    - _Requirements: 3.4, 3.5, 3.6, 3.7_

  - [x] 4.2 Créer la section Collections `src/components/home/CollectionsSection.tsx`
    - Titre "Collections à la une"
    - Lien "Voir tout" vers /collections
    - Grid 4 colonnes desktop, 2 tablette, 1 mobile
    - Affiche exactement 4 collections
    - _Requirements: 3.1, 3.2, 3.3, 8.2_

  - [x] 4.3 Écrire le test property pour CollectionCard
    - **Property 1: Collection Cards Display Required Fields**
    - **Validates: Requirements 3.4, 3.5, 3.6**

- [x] 5. Composants Book
  - [x] 5.1 Créer le composant `src/components/book/BookCard.tsx`
    - Image de couverture aspect-[3/4] avec coins arrondis
    - Badge prix en haut à droite (bg-primary)
    - Titre du livre
    - Nom de l'auteur en gris
    - Utiliser formatPrice() pour le prix
    - _Requirements: 4.4, 4.5, 4.6, 4.7_

  - [x] 5.2 Créer le composant carousel `src/components/book/BookCarousel.tsx` (Client Component)
    - Scroll horizontal avec snap-x
    - Boutons navigation gauche/droite
    - Affiche minimum 5 livres
    - Responsive: 2 mobile, 3 tablette, 5 desktop
    - _Requirements: 4.2, 4.3, 4.8, 4.9_

  - [x] 5.3 Créer la section Livres populaires `src/components/home/PopularBooksSection.tsx`
    - Titre "Livres populaires"
    - Intègre BookCarousel
    - _Requirements: 4.1_

  - [x] 5.4 Écrire le test property pour BookCard
    - **Property 2: Book Cards Display Required Fields**
    - **Validates: Requirements 4.4, 4.5, 4.6, 4.7**

  - [x] 5.5 Écrire le test property pour formatPrice
    - **Property 6: Price Formatting Consistency**
    - **Validates: Requirements 4.5**

- [x] 6. Section Comment ça marche
  - [x] 6.1 Créer le composant `src/components/home/HowItWorksSection.tsx`
    - Background gris clair (#F5F5F5)
    - Titre "Comment ça marche ?" centré
    - Sous-titre explicatif
    - 3 étapes: Découvrez, Commandez, Savourez
    - Icônes vertes pour chaque étape
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

  - [x] 6.2 Écrire le test property pour HowItWorksSection
    - **Property 5: Three Steps in How It Works**
    - **Validates: Requirements 5.3**

- [x] 7. Section Appel aux auteurs
  - [x] 7.1 Créer le composant `src/components/home/AuthorCTASection.tsx`
    - Background vert foncé (primary)
    - Label "Appel aux auteurs"
    - Titre "Vous avez une histoire à raconter ?"
    - Description encourageante
    - Bouton blanc "Soumettre mon manuscrit"
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [x] 8. Composant Footer
  - [x] 8.1 Créer le composant `src/components/layout/Footer.tsx`
    - 4 colonnes: Logo/Social, Explorer, À propos, Newsletter
    - Icônes réseaux sociaux
    - Input email + bouton S'inscrire
    - Copyright et liens légaux en bas
    - Background sombre
    - Responsive: colonnes empilées sur mobile
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 8.3_

- [x] 9. Checkpoint - Vérifier les composants
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Page Homepage principale
  - [x] 10.1 Mettre à jour `app/page.tsx` avec tous les composants
    - Server Component pour fetch des données
    - Intégrer Header, HeroSection, CollectionsSection, PopularBooksSection, HowItWorksSection, AuthorCTASection, Footer
    - Fetch collections et livres depuis Prisma (ou données mock si DB pas configurée)
    - _Requirements: 3.3, 4.3_

  - [x] 10.2 Créer le layout principal `app/layout.tsx`
    - Configurer les fonts (Inter ou similaire)
    - Importer globals.css
    - Metadata SEO pour la homepage
    - _Requirements: 9.5_

- [x] 11. Styles globaux
  - [x] 11.1 Mettre à jour `app/globals.css`
    - Variables CSS pour les couleurs
    - Styles de base pour typography
    - Classes utilitaires personnalisées si nécessaire
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 12. Assets et images
  - [x] 12.1 Ajouter les images placeholder dans `public/images/`
    - hero-library.jpg pour le hero
    - placeholder-book.jpg pour les livres sans image
    - placeholder-collection.jpg pour les collections
    - logo.svg pour le logo Éditions Germinale
    - _Requirements: 2.1_

- [x] 13. Final checkpoint - Tests et validation
  - Ensure all tests pass, ask the user if questions arise.
  - Vérifier le rendu responsive sur mobile/tablette/desktop
  - Vérifier la conformité avec le design fourni

## Notes

- Tous les tests sont obligatoires pour une couverture complète
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Les données peuvent être mockées si la base de données n'est pas encore configurée
