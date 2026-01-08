# Requirements Document

## Introduction

Cette spécification définit la page "Librairie" (Notre Librairie) qui affiche tous les livres disponibles sur la plateforme Éditions Germinale. Cette page est accessible via le lien "Librairie" dans la navigation principale et via le bouton "Voir plus" de la section "Livres populaires" sur la homepage. Elle permet aux utilisateurs de parcourir, rechercher et filtrer l'ensemble du catalogue de livres.

## Glossary

- **Library_Page**: Page principale affichant tous les livres disponibles à l'achat
- **Book_Card**: Composant carte affichant un livre avec image, catégorie, titre, auteur, prix et lien
- **Search_Bar**: Champ de recherche permettant de filtrer les livres par titre, auteur ou ISBN
- **Filter_Dropdown**: Menu déroulant permettant de filtrer par genre, auteur, prix ou tri
- **Pagination**: Composant de navigation entre les pages de résultats
- **Badge**: Étiquette visuelle indiquant un statut spécial (Nouveauté, Coup de cœur)
- **Breadcrumb**: Fil d'Ariane indiquant la position dans la navigation

## Requirements

### Requirement 1: Structure de la page

**User Story:** As a user, I want to access a dedicated library page, so that I can browse all available books.

#### Acceptance Criteria

1. THE Library_Page SHALL display the same Header as the homepage
2. THE Library_Page SHALL display a Breadcrumb showing "Accueil / Notre Librairie"
3. THE Library_Page SHALL display a main title "Tous nos Livres" in gold color with serif font
4. THE Library_Page SHALL display a subtitle describing the catalog in dimmed white color
5. THE Library_Page SHALL display the same Footer as the homepage
6. THE Library_Page SHALL have a dark background (bg-dark) consistent with the site theme

### Requirement 2: Search and Filters Section

**User Story:** As a user, I want to search and filter books, so that I can find specific books quickly.

#### Acceptance Criteria

1. THE Search_Bar SHALL display a search input with placeholder "Titre, auteur, ISBN..."
2. THE Search_Bar SHALL have a search icon on the left side
3. THE Library_Page SHALL display a "Genre" Filter_Dropdown with chevron icon
4. THE Library_Page SHALL display an "Auteur" Filter_Dropdown with chevron icon
5. THE Library_Page SHALL display a "Prix" Filter_Dropdown with chevron icon
6. THE Library_Page SHALL display a "Trier par" Filter_Dropdown with sort icon
7. WHEN a user types in the Search_Bar, THE Library_Page SHALL filter books by title or author (case-insensitive)
8. WHEN filters are applied, THE Library_Page SHALL reset pagination to page 1

### Requirement 3: Books Grid Display

**User Story:** As a user, I want to see books displayed in a grid, so that I can easily browse the catalog.

#### Acceptance Criteria

1. THE Library_Page SHALL display books in a 3-column grid on desktop (> 1024px)
2. THE Library_Page SHALL display books in a 2-column grid on tablet (640px - 1024px)
3. THE Library_Page SHALL display books in a 1-column grid on mobile (< 640px)
4. THE Library_Page SHALL display 6 books per page
5. WHEN no books match the search criteria, THE Library_Page SHALL display an empty state message

### Requirement 4: Book Card Design

**User Story:** As a user, I want to see book information clearly, so that I can make informed decisions.

#### Acceptance Criteria

1. THE Book_Card SHALL display a cover image with aspect ratio 4:3 (landscape) and rounded corners
2. THE Book_Card SHALL display a category label in uppercase green/teal color above the title
3. THE Book_Card SHALL display the book title in dark text with serif font
4. THE Book_Card SHALL display "Par [author name]" in gray text below the title
5. THE Book_Card SHALL display the price in FCFA format on the left side of the footer
6. THE Book_Card SHALL display a "Voir le livre" link on the right side of the footer
7. THE Book_Card SHALL have a white/cream background with subtle shadow
8. WHEN a book is new, THE Book_Card SHALL display a "Nouveauté" Badge in the top-right corner
9. WHEN a book is featured, THE Book_Card SHALL display a "Coup de cœur" Badge in the top-center

### Requirement 5: Pagination

**User Story:** As a user, I want to navigate between pages of books, so that I can browse the entire catalog.

#### Acceptance Criteria

1. THE Pagination SHALL display page numbers with the current page highlighted
2. THE Pagination SHALL display previous and next navigation arrows
3. THE Pagination SHALL display ellipsis (...) when there are many pages
4. WHEN a user clicks a page number, THE Library_Page SHALL display the corresponding books
5. WHEN a user clicks the previous arrow, THE Library_Page SHALL go to the previous page
6. WHEN a user clicks the next arrow, THE Library_Page SHALL go to the next page
7. THE previous arrow SHALL be disabled on the first page
8. THE next arrow SHALL be disabled on the last page

### Requirement 6: Homepage Integration

**User Story:** As a user, I want to access the library from the homepage, so that I can easily find more books.

#### Acceptance Criteria

1. THE PopularBooksSection SHALL display a "Voir plus" link next to the section title
2. WHEN a user clicks "Voir plus", THE system SHALL navigate to the Library_Page
3. THE "Voir plus" link SHALL have gold color matching the section title

### Requirement 7: Responsive Design

**User Story:** As a user, I want the page to work on all devices, so that I can browse books anywhere.

#### Acceptance Criteria

1. THE Library_Page SHALL be fully responsive from 320px to 1920px viewport width
2. THE Search_Bar and Filter_Dropdowns SHALL stack vertically on mobile
3. THE Book_Card layout SHALL adapt to the available width
4. THE Pagination SHALL remain usable on mobile devices

### Requirement 8: Accessibility

**User Story:** As a user with accessibility needs, I want the page to be accessible, so that I can use it effectively.

#### Acceptance Criteria

1. THE Search_Bar SHALL have an appropriate aria-label
2. THE Filter_Dropdowns SHALL have appropriate aria-labels
3. THE Book_Cards SHALL be keyboard navigable
4. THE Pagination buttons SHALL have appropriate aria-labels
5. THE images SHALL have appropriate alt text
