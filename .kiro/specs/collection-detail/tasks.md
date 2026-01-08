# Implementation Plan: Collection Detail Page

## Overview

Implémentation de la page de détails d'une collection accessible via `/collections/[slug]`. Cette page réutilise les composants Header et FooterSimple existants et ajoute de nouveaux composants pour afficher les détails de la collection, ses livres et des suggestions.

## Tasks

- [x] 1. Étendre les données mock et créer les types
  - [x] 1.1 Ajouter les types Book et CollectionWithBooks dans mockData.ts
    - Créer l'interface Book avec id, title, slug, author, coverImage, price
    - Étendre Collection avec originalPrice, discountPercent, isLimited, books
    - _Requirements: 2.6, 4.5_

  - [x] 1.2 Ajouter les données mock des livres pour les collections
    - Créer mockBooks avec 8-10 livres de la littérature africaine
    - Associer les livres aux collections existantes
    - Ajouter une collection avec réduction pour tester l'affichage
    - _Requirements: 4.2, 4.5_

- [x] 2. Créer le composant CollectionHero
  - [x] 2.1 Implémenter CollectionHero avec image et informations
    - Image à gauche avec rounded-2xl et aspect ratio
    - Badge "COLLECTION PREMIUM" en haut à droite du contenu
    - Badge "Édition Limitée" sur l'image si isLimited
    - Titre h1 avec font-serif
    - Description complète
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x] 2.2 Implémenter l'affichage des prix avec réduction
    - Prix actuel en gras vert
    - Prix original barré si réduction
    - Badge pourcentage de réduction
    - _Requirements: 2.6_

  - [x] 2.3 Implémenter les boutons d'action
    - Bouton "Acheter toute la collection" avec icône panier
    - Bouton "Partager" avec icône share
    - Message livraison gratuite avec icône camion
    - _Requirements: 3.1, 3.2, 2.7_

  - [x] 2.4 Écrire les tests unitaires pour CollectionHero
    - Tester l'affichage du badge Édition Limitée conditionnel
    - Tester l'affichage des prix avec/sans réduction
    - **Property 3: Limited edition badge conditional rendering**
    - **Property 4: Price reduction display**
    - **Validates: Requirements 2.3, 2.6**

- [x] 3. Créer le composant CollectionBookCard
  - [x] 3.1 Implémenter CollectionBookCard
    - Image de couverture aspect-[3/4] avec rounded-xl
    - Titre du livre
    - Nom de l'auteur en gris
    - Prix formaté en FCFA
    - Lien "Acheter seul" aligné à droite
    - _Requirements: 4.5, 4.6_

  - [x] 3.2 Écrire les tests unitaires pour CollectionBookCard
    - Tester que tous les champs sont affichés
    - Tester le formatage du prix
    - **Property 6: Book card completeness**
    - **Validates: Requirements 4.5**

- [x] 4. Créer le composant CollectionBooksSection
  - [x] 4.1 Implémenter CollectionBooksSection
    - Titre "Les livres de la collection"
    - Sous-titre avec compteur de livres
    - Lien "Voir tous les détails →" aligné à droite
    - Grille responsive de CollectionBookCard
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 4.2 Écrire les tests unitaires pour CollectionBooksSection
    - Tester le compteur de livres
    - **Property 5: Book count accuracy**
    - **Validates: Requirements 4.2**

- [x] 5. Créer les composants RelatedCollections
  - [x] 5.1 Implémenter RelatedCollectionCard
    - Image avec aspect-[16/9] et gradient overlay
    - Label "COLLECTION" en petit
    - Nom de la collection
    - Lien "Découvrir →"
    - _Requirements: 5.3, 5.4_

  - [x] 5.2 Implémenter RelatedCollections section
    - Titre "Vous aimerez aussi"
    - Grille de 3 RelatedCollectionCard
    - Responsive: 1 colonne mobile, 3 colonnes desktop
    - _Requirements: 5.1, 5.2, 6.4_

  - [x] 5.3 Écrire les tests unitaires pour RelatedCollections
    - Tester l'affichage des 3 collections
    - **Property 7: Related collection card completeness**
    - **Validates: Requirements 5.3**

- [x] 6. Créer la page de détails collection
  - [x] 6.1 Créer la structure de la page /collections/[slug]
    - Créer app/collections/[slug]/page.tsx
    - Importer Header et FooterSimple existants
    - Ajouter Breadcrumb avec navigation
    - Intégrer tous les composants créés
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 7.1_

  - [x] 6.2 Implémenter la logique de récupération des données
    - Fonction getCollectionBySlug pour trouver la collection
    - Fonction getRelatedCollections pour suggestions
    - Gestion du cas collection non trouvée (404)
    - _Requirements: 5.2_

  - [x] 6.3 Écrire les tests pour la page
    - Tester le breadcrumb avec le nom de collection
    - **Property 1: Breadcrumb displays collection name correctly**
    - **Property 2: Collection description is always displayed**
    - **Validates: Requirements 1.2, 2.5**

- [x] 7. Checkpoint - Vérification complète
  - Ensure all tests pass, ask the user if questions arise.
  - Vérifier le responsive design sur mobile/tablet/desktop
  - Vérifier la cohérence visuelle avec le design fourni

## Notes

- All tasks are required for complete implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Les composants Header et FooterSimple existants sont réutilisés
- Le composant Breadcrumb existant est réutilisé
