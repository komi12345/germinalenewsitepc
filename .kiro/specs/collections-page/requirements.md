# Requirements Document

## Introduction

Page "Nos Collections" qui s'affiche lorsque l'utilisateur clique sur le bouton "Voir plus" de la section Collections à la une de la page d'accueil. Cette page présente toutes les collections disponibles avec des fonctionnalités de recherche, filtrage et pagination.

## Glossary

- **Collections_Page**: Page listant toutes les collections de livres disponibles
- **Collection_Card**: Carte affichant une collection avec image, nombre de livres, titre, description, prix et lien
- **Search_Bar**: Champ de recherche pour filtrer les collections par nom
- **Filter_Dropdown**: Menu déroulant pour filtrer par genre, tri ou prix
- **Pagination**: Système de navigation entre les pages de résultats
- **Breadcrumb**: Fil d'Ariane indiquant la position dans le site

## Requirements

### Requirement 1: Header de la page

**User Story:** As a user, I want to see a consistent header with navigation, so that I can navigate to other sections of the site.

#### Acceptance Criteria

1. THE Collections_Page SHALL display the same Header component as the homepage
2. WHEN the user is on the Collections page, THE Header SHALL highlight "Collections" in the navigation

### Requirement 2: Breadcrumb Navigation

**User Story:** As a user, I want to see a breadcrumb showing my location, so that I can understand where I am in the site hierarchy.

#### Acceptance Criteria

1. THE Collections_Page SHALL display a breadcrumb showing "Accueil / Nos Collections"
2. WHEN the user clicks on "Accueil" in the breadcrumb, THE System SHALL navigate to the homepage

### Requirement 3: Page Title and Description

**User Story:** As a user, I want to see a clear title and description, so that I understand the purpose of the page.

#### Acceptance Criteria

1. THE Collections_Page SHALL display the title "Nos Collections" in large serif font
2. THE Collections_Page SHALL display a subtitle "Une sélection d'ouvrages élégants et inspirants, curatée avec passion pour les amoureux des mots."

### Requirement 4: Search and Filter Bar

**User Story:** As a user, I want to search and filter collections, so that I can find collections that interest me.

#### Acceptance Criteria

1. THE Collections_Page SHALL display a search input with placeholder "Rechercher une collection..."
2. THE Collections_Page SHALL display a "Genre" dropdown filter with chevron icon
3. THE Collections_Page SHALL display a "Trier par" dropdown filter with chevron icon
4. THE Collections_Page SHALL display a "Prix" dropdown filter with chevron icon
5. WHEN the user types in the search input, THE System SHALL filter collections by name
6. THE Filter_Dropdown buttons SHALL have a dark green background (#2C5F4F) with white text

### Requirement 5: Collections Grid

**User Story:** As a user, I want to see collections displayed in a grid, so that I can browse available collections easily.

#### Acceptance Criteria

1. THE Collections_Page SHALL display collections in a 3-column grid on desktop
2. THE Collections_Page SHALL display collections in a 2-column grid on tablet
3. THE Collections_Page SHALL display collections in a 1-column grid on mobile
4. WHEN a collection is new, THE Collection_Card SHALL display a "Nouveau" badge in green
5. WHEN a collection is popular, THE Collection_Card SHALL display a "Populaire" badge in green

### Requirement 6: Collection Card Design

**User Story:** As a user, I want to see detailed information about each collection, so that I can decide which one interests me.

#### Acceptance Criteria

1. THE Collection_Card SHALL display a cover image with rounded corners (rounded-2xl)
2. THE Collection_Card SHALL display the number of books with a book icon (e.g., "12 Livres")
3. THE Collection_Card SHALL display the collection name in bold
4. THE Collection_Card SHALL display a short description (2 lines max)
5. THE Collection_Card SHALL display the price in FCFA with green color
6. THE Collection_Card SHALL display a "Voir la collection →" link aligned to the right
7. THE Collection_Card SHALL have a light gray background (#F8F6F2) with subtle shadow on hover

### Requirement 7: Pagination

**User Story:** As a user, I want to navigate between pages of collections, so that I can see all available collections.

#### Acceptance Criteria

1. THE Collections_Page SHALL display pagination controls at the bottom
2. THE Pagination SHALL show previous arrow, page numbers, ellipsis, and next arrow
3. THE Pagination SHALL highlight the current page with green background
4. WHEN the user clicks a page number, THE System SHALL display that page of collections
5. WHEN the user is on the first page, THE previous arrow SHALL be disabled
6. WHEN the user is on the last page, THE next arrow SHALL be disabled

### Requirement 8: Footer

**User Story:** As a user, I want to see a consistent footer, so that I can access additional links and information.

#### Acceptance Criteria

1. THE Collections_Page SHALL display the same Footer component as the homepage
2. THE Footer SHALL display "Editions Germinale" logo on the left
3. THE Footer SHALL display copyright "© 2024 Editions Germinale. Tous droits réservés." on the right

### Requirement 9: Responsive Design

**User Story:** As a user, I want the page to work well on all devices, so that I can browse collections on mobile, tablet, or desktop.

#### Acceptance Criteria

1. THE Collections_Page SHALL be fully responsive from 320px to 1920px width
2. THE Search_Bar and filters SHALL stack vertically on mobile
3. THE Collection_Card grid SHALL adapt to screen size (1/2/3 columns)
