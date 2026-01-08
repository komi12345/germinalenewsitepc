# Requirements Document

## Introduction

Page de détails d'une collection affichée lorsqu'un utilisateur clique sur "Voir la collection" depuis une carte de collection. Cette page présente les informations complètes de la collection, ses livres inclus, et des suggestions de collections similaires.

## Glossary

- **Collection_Detail_Page**: Page affichant les détails complets d'une collection spécifique
- **Collection_Hero**: Section principale avec image, titre, description et actions d'achat
- **Book_Grid**: Grille affichant les livres inclus dans la collection
- **Related_Collections**: Section présentant des collections similaires
- **Breadcrumb**: Navigation fil d'Ariane pour situer l'utilisateur
- **Price_Badge**: Affichage du prix avec réduction éventuelle
- **Share_Button**: Bouton permettant de partager la collection

## Requirements

### Requirement 1: Header et Navigation

**User Story:** As a user, I want to see the same header as on other pages, so that I have a consistent navigation experience.

#### Acceptance Criteria

1. THE Page SHALL use the existing Header component from the homepage for visual consistency
2. THE Page SHALL display a Breadcrumb below the header showing "Accueil / Collections / [Nom de la collection]"
3. WHEN a user clicks on "Accueil" in breadcrumb, THE System SHALL navigate to the homepage
4. WHEN a user clicks on "Collections" in breadcrumb, THE System SHALL navigate to the collections listing page
5. THE Breadcrumb SHALL use text-gray-500 for links and text-neutral-text for current page

### Requirement 2: Section Héro de la Collection

**User Story:** As a user, I want to see the collection details prominently, so that I can understand what the collection offers.

#### Acceptance Criteria

1. THE Collection_Hero SHALL display the collection cover image on the left side with rounded corners
2. THE Collection_Hero SHALL display a "COLLECTION PREMIUM" badge with green background and white text
3. IF the collection has a badge "Édition Limitée", THEN THE System SHALL display it on the image
4. THE Collection_Hero SHALL display the collection name as h1 with font-serif styling
5. THE Collection_Hero SHALL display the full description text
6. WHEN a price reduction exists, THE Price_Badge SHALL show original price crossed out, current price, and percentage discount
7. THE Collection_Hero SHALL display "Livraison gratuite à partir de 25.000 FCFA" message with truck icon

### Requirement 3: Actions d'Achat

**User Story:** As a user, I want to purchase the collection or share it, so that I can buy books or recommend them.

#### Acceptance Criteria

1. THE System SHALL display a primary "Acheter toute la collection" button with cart icon
2. THE System SHALL display a secondary "Partager" button with share icon
3. WHEN a user clicks "Acheter toute la collection", THE System SHALL add the collection to cart
4. WHEN a user clicks "Partager", THE System SHALL open native share dialog or copy link

### Requirement 4: Section Livres de la Collection

**User Story:** As a user, I want to see all books in the collection, so that I can browse individual titles.

#### Acceptance Criteria

1. THE Book_Grid SHALL display section title "Les livres de la collection"
2. THE Book_Grid SHALL display subtitle with book count "[N] chefs-d'œuvre inclus dans ce coffret"
3. THE Book_Grid SHALL display a "Voir tous les détails →" link aligned right
4. THE Book_Grid SHALL display books in a 4-column grid on desktop, 2 columns on tablet, 1 on mobile
5. WHEN displaying a book, THE System SHALL show cover image, title, author, price, and "Acheter seul" link
6. THE Book_Grid SHALL use aspect-[3/4] for book cover images

### Requirement 5: Section Collections Similaires

**User Story:** As a user, I want to discover similar collections, so that I can explore more content.

#### Acceptance Criteria

1. THE Related_Collections SHALL display section title "Vous aimerez aussi"
2. THE Related_Collections SHALL display 3 collection cards in a horizontal row
3. WHEN displaying a related collection, THE System SHALL show image with overlay, "COLLECTION" label, name, and "Découvrir →" link
4. THE Related_Collections SHALL use aspect-[16/9] for collection images with gradient overlay

### Requirement 6: Responsive Design

**User Story:** As a user, I want the page to work on all devices, so that I can browse on mobile or desktop.

#### Acceptance Criteria

1. WHEN viewport is mobile, THE Collection_Hero SHALL stack image above content vertically
2. WHEN viewport is tablet or larger, THE Collection_Hero SHALL display image and content side by side
3. THE Book_Grid SHALL adapt columns: 1 on mobile, 2 on tablet, 4 on desktop
4. THE Related_Collections SHALL adapt: 1 column on mobile, 3 on tablet and desktop

### Requirement 7: Footer

**User Story:** As a user, I want to see footer information, so that I can access legal links and contact.

#### Acceptance Criteria

1. THE Page SHALL use the existing FooterSimple component for visual consistency
2. THE FooterSimple SHALL display "Editions Germinale" logo and copyright
3. THE FooterSimple SHALL display links: "Mentions Légales", "Confidentialité", "Contact"
4. THE FooterSimple SHALL display social media icons
