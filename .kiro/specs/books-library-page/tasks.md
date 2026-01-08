# Implementation Plan: Books Library Page

## Overview

Ce plan implémente la page "Librairie" (Notre Librairie) qui affiche tous les livres disponibles. L'implémentation suit une approche incrémentale : d'abord les données, puis les composants, et enfin l'intégration.

## Tasks

- [x] 1. Extend mock data with book categories and badges
  - [x] 1.1 Add BookExtended interface to mockData.ts
    - Add `category: string` field for book category (LITTÉRATURE, POÉSIE, etc.)
    - Add `isNew?: boolean` field for "Nouveauté" badge
    - Add `isFeatured?: boolean` field for "Coup de cœur" badge
    - _Requirements: 4.2, 4.8, 4.9_

  - [x] 1.2 Create mockBooksExtended array with sample data
    - Create 12 books with varied categories
    - Mark some books as isNew (Nouveauté)
    - Mark some books as isFeatured (Coup de cœur)
    - Include categories: LITTÉRATURE, POÉSIE, ESSAI HISTORIQUE, ROMAN, SCIENCE-FICTION, BIOGRAPHIE
    - _Requirements: 4.2, 4.8, 4.9_

- [x] 2. Create LibraryBookCard component
  - [x] 2.1 Create LibraryBookCard.tsx with light theme design
    - White/cream background with rounded corners and shadow
    - Cover image with aspect-[4/3] (landscape format)
    - Category label in uppercase teal/green color
    - Title in dark serif font
    - Author in "Par [name]" format in gray
    - Price in FCFA format on left, "Voir le livre" link on right
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [x] 2.2 Add badge support to LibraryBookCard
    - "Nouveauté" badge in top-right corner (green background)
    - "Coup de cœur" badge in top-center (gold/orange background)
    - Badges only shown when isNew/isFeatured is true
    - _Requirements: 4.8, 4.9_

  - [x] 2.3 Write unit tests for LibraryBookCard
    - Test renders all required elements (image, category, title, author, price, link)
    - Test badge display based on isNew/isFeatured flags
    - Test author format "Par [name]"
    - Test price formatting
    - _Requirements: 4.1-4.9_

  - [x] 2.4 Write property test for badge display
    - **Property 5: Badge Display Consistency**
    - **Validates: Requirements 4.8, 4.9**

- [-] 3. Create BooksSearchAndFilters component
  - [x] 3.1 Create BooksSearchAndFilters.tsx
    - Search input with search icon on left
    - Placeholder "Titre, auteur, ISBN..."
    - Genre dropdown with chevron
    - Auteur dropdown with chevron
    - Prix dropdown with chevron
    - Trier par dropdown with sort icon
    - Responsive: stack vertically on mobile
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 7.2_

  - [ ] 3.2 Write unit tests for BooksSearchAndFilters
    - Test search input renders with correct placeholder
    - Test all filter dropdowns render
    - Test onChange handlers are called
    - _Requirements: 2.1-2.6_

- [ ] 4. Create BooksPageContent component
  - [ ] 4.1 Create BooksPageContent.tsx with state management
    - State for searchValue, selectedGenre, selectedAuthor, selectedPrice, selectedSort
    - State for currentPage
    - Filter books by search query (title or author, case-insensitive)
    - Paginate books (6 per page)
    - Reset page to 1 when filters change
    - _Requirements: 2.7, 2.8, 3.4_

  - [ ] 4.2 Create filterBooksBySearch utility function
    - Filter by title or author containing query
    - Case-insensitive matching
    - Return all books if query is empty
    - _Requirements: 2.7_

  - [ ] 4.3 Create paginateBooks utility function
    - Return books for current page
    - Respect BOOKS_PER_PAGE constant (6)
    - _Requirements: 3.4_

  - [ ] 4.4 Integrate BooksGrid with LibraryBookCard
    - 3 columns on desktop (lg:grid-cols-3)
    - 2 columns on tablet (sm:grid-cols-2)
    - 1 column on mobile (grid-cols-1)
    - Empty state when no books match
    - _Requirements: 3.1, 3.2, 3.3, 3.5_

  - [ ] 4.5 Write property test for search filter consistency
    - **Property 1: Search Filter Consistency**
    - **Validates: Requirements 2.7**

  - [ ] 4.6 Write property test for filter reset pagination
    - **Property 2: Filter Reset Pagination**
    - **Validates: Requirements 2.8**

  - [ ] 4.7 Write property test for books per page limit
    - **Property 3: Books Per Page Limit**
    - **Validates: Requirements 3.4**

- [ ] 5. Create Books page
  - [ ] 5.1 Create app/books/page.tsx
    - Server component with Header, Breadcrumb, Content, Footer
    - Breadcrumb: "Accueil / Notre Librairie"
    - Title: "Tous nos Livres" in gold serif font
    - Subtitle describing the catalog
    - Dark background consistent with site theme
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [ ] 5.2 Write unit tests for Books page
    - Test page renders Header and Footer
    - Test breadcrumb shows correct items
    - Test title and subtitle are displayed
    - _Requirements: 1.1-1.6_

- [ ] 6. Update PopularBooksSection with "Voir plus" link
  - [ ] 6.1 Add "Voir plus" link to PopularBooksSection
    - Link positioned next to section title
    - Gold color matching title
    - Links to /books page
    - Arrow icon or text indicator
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ] 6.2 Write unit test for "Voir plus" link
    - Test link is rendered
    - Test link href is "/books"
    - _Requirements: 6.1, 6.2_

- [ ] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Final integration and accessibility
  - [ ] 8.1 Add accessibility attributes
    - aria-label on search input
    - aria-labels on filter dropdowns
    - aria-labels on pagination buttons
    - alt text on book images
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [ ] 8.2 Write accessibility tests
    - Test aria-labels are present
    - Test keyboard navigation works
    - _Requirements: 8.1-8.5_

- [ ] 9. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required for complete implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The LibraryBookCard is intentionally different from the existing BookCard to match the design image
