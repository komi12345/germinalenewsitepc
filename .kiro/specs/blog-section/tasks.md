# Implementation Plan: Blog Section

## Overview

Implémentation de la section "Blog et Actualités" pour la page d'accueil d'Éditions Germinale. La section affiche 3 articles de blog avec image, catégorie, titre, extrait et informations de l'auteur, en respectant le code couleur noir/or/blanc du site.

## Tasks

- [x] 1. Créer le composant BlogSection avec les sous-composants
  - [x] 1.1 Créer le fichier BlogSection.tsx avec l'interface BlogArticle
    - Définir les types TypeScript pour BlogArticle et BlogSectionProps
    - Créer la structure de base du composant avec header et grille
    - Ajouter les données mock pour 3 articles
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1_

  - [x] 1.2 Implémenter le composant ArticleCard
    - Créer la carte avec image de couverture, badge catégorie, titre, extrait
    - Appliquer les styles Tailwind (rounded-2xl, bg-dark-light, hover:border-gold/30)
    - Ajouter les transitions hover (duration-200)
    - _Requirements: 2.5, 2.6, 3.1, 3.2, 3.3, 3.4, 3.5, 5.1, 5.3_

  - [x] 1.3 Implémenter le composant AuthorInfo
    - Afficher avatar circulaire, nom de l'auteur, séparateur (•), date
    - Gérer le fallback avatar avec initiales sur fond gold
    - Cas spécial pour "Éditions Germinale" avec initiales "EG"
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 1.4 Ajouter les attributs d'accessibilité
    - Ajouter data-testid="blog-section" sur la section
    - Ajouter alt descriptif sur les images de couverture
    - Ajouter aria-label sur le lien "Voir plus"
    - _Requirements: 6.1, 6.2, 6.4_

- [x] 2. Écrire les tests unitaires pour BlogSection
  - [x] 2.1 Tester le rendu de la section avec les données mock
    - Vérifier la présence du titre "Blog"
    - Vérifier la présence du sous-titre
    - Vérifier la présence du lien "Voir plus"
    - Vérifier le rendu de 3 cartes d'articles
    - _Requirements: 1.1, 1.2, 1.3, 2.1_

  - [x] 2.2 Tester le composant ArticleCard
    - Vérifier l'affichage de l'image, badge, titre, extrait
    - Vérifier les classes CSS appliquées
    - _Requirements: 3.1, 3.2, 3.4, 3.5_

  - [x] 2.3 Tester le composant AuthorInfo
    - Vérifier l'affichage du nom et de la date avec séparateur
    - Tester le fallback avatar avec initiales
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 3. Écrire les tests property-based
  - [x] 3.1 Write property test for Article Card Content Completeness
    - **Property 1: Article Card Content Completeness**
    - **Validates: Requirements 3.1, 3.2, 3.4, 3.5, 3.6**

  - [x] 3.2 Write property test for Author Info Completeness
    - **Property 2: Author Info Completeness**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4**

  - [x] 3.3 Write property test for Image Accessibility
    - **Property 3: Image Accessibility**
    - **Validates: Requirements 6.2**

- [x] 4. Intégrer BlogSection dans la page d'accueil
  - [x] 4.1 Ajouter l'import et le composant dans app/page.tsx
    - Importer BlogSection depuis src/components/home
    - Placer le composant entre TestimonialsSection et ContactSection
    - Passer les données mock articles
    - _Requirements: 1.5_

  - [x] 4.2 Ajouter les données mock dans mockData.ts
    - Créer le tableau mockBlogArticles avec 3 articles
    - Exporter les données pour utilisation dans la page
    - _Requirements: 2.1_

- [x] 5. Checkpoint - Vérification finale
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required for comprehensive implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
