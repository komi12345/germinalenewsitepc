# Implementation Plan: Collections Page

## Overview

Implémentation de la page "Nos Collections" accessible via `/collections`. Cette page affiche toutes les collections avec recherche, filtres et pagination. Le design réutilise le Header existant et crée un Footer simplifié.

## Tasks

- [x] 1. Create utility components and helpers
  - [x] 1.1 Create Breadcrumb component
    - Create `src/components/ui/Breadcrumb.tsx`
    - Accept items array with label and optional href
    - Style with gray text, "/" separator
    - _Requirements: 2.1, 2.2_

  - [x] 1.2 Create FooterSimple component
    - Create `src/components/layout/FooterSimple.tsx`
    - Display logo on left, copyright on right
    - White background with top border
    - _Requirements: 8.1, 8.2, 8.3_

- [x] 2. Create CollectionListCard component
  - [x] 2.1 Create CollectionListCard component
    - Create `src/components/collection/CollectionListCard.tsx`
    - Display image with aspect-[4/3] and rounded corners
    - Show book count with icon, title, description (line-clamp-2)
    - Display price in FCFA format and "Voir la collection →" link
    - Support "Nouveau" and "Populaire" badges
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 5.4, 5.5_

  - [x] 2.2 Write property test for badge display logic
    - **Property 4: Badge Display Logic**
    - Test that isNew shows "Nouveau" badge, isPopular shows "Populaire" badge
    - **Validates: Requirements 5.4, 5.5**

- [x] 3. Create SearchAndFilters component
  - [x] 3.1 Create SearchAndFilters component
    - Create `src/components/collections/SearchAndFilters.tsx`
    - Search input with search icon and placeholder
    - Three dropdown buttons: Genre, Trier par, Prix
    - Green background (#2C5F4F) for dropdown buttons
    - Responsive: stack on mobile
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.6, 9.2_

- [x] 4. Create Pagination component
  - [x] 4.1 Create Pagination component
    - Create `src/components/ui/Pagination.tsx`
    - Display prev/next arrows and page numbers
    - Show ellipsis for many pages
    - Highlight current page with green background
    - Disable prev on first page, next on last page
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [x] 4.2 Write property test for pagination bounds
    - **Property 2: Pagination Bounds**
    - Test that navigation respects bounds (1 to totalPages)
    - **Validates: Requirements 7.5, 7.6**

- [x] 5. Create Collections page
  - [x] 5.1 Create CollectionsPageContent client component
    - Create `src/components/collections/CollectionsPageContent.tsx`
    - Manage search, filter, and pagination state
    - Filter collections based on search query
    - Display collections in responsive grid (1/2/3 columns)
    - _Requirements: 4.5, 5.1, 5.2, 5.3, 9.1, 9.3_

  - [x] 5.2 Create collections page route
    - Create `app/collections/page.tsx`
    - Server component that fetches initial collections
    - Include Header, CollectionsPageContent, FooterSimple
    - Add breadcrumb, title, and subtitle
    - _Requirements: 1.1, 1.2, 2.1, 3.1, 3.2_

  - [x] 5.3 Write property test for search filter consistency
    - **Property 1: Search Filter Consistency**
    - Test that all displayed collections contain search query in name
    - **Validates: Requirements 4.5**

- [x] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Add mock data and final integration
  - [x] 7.1 Create mock collections data
    - Create mock data matching the design (6 collections)
    - Include: Littérature Classique, Poésie Contemporaine, Histoire & Essais, Romans Policiers, Science-Fiction, Biographies
    - Set appropriate prices, book counts, and badges
    - _Requirements: 6.2, 6.3, 6.5_

  - [x] 7.2 Final visual verification
    - Verify responsive layout on all breakpoints
    - Verify hover states and transitions
    - Verify badge display
    - _Requirements: 9.1, 9.2, 9.3_

- [x] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required for complete implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Reuse existing Header component from homepage
- Create new FooterSimple component (simpler than main Footer)
