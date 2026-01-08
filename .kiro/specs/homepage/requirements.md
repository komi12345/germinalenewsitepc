# Requirements Document

## Introduction

Cette spécification définit les exigences pour la page d'accueil du site web Éditions Germinale, une plateforme de maison d'édition permettant la vente de livres numériques et collections. La page d'accueil doit présenter l'identité visuelle de la marque, mettre en avant les collections et livres populaires, expliquer le fonctionnement du service et encourager les auteurs à soumettre leurs manuscrits.

## Glossary

- **Homepage**: La page d'accueil principale du site Éditions Germinale
- **Header**: La barre de navigation supérieure contenant le logo, les liens de navigation et les actions utilisateur
- **Hero_Section**: La section principale en haut de page avec l'image de fond et le message d'accroche
- **Collection_Card**: Un composant carte affichant une collection de livres avec image et titre
- **Book_Card**: Un composant carte affichant un livre avec couverture, prix et titre
- **CTA_Button**: Un bouton d'appel à l'action (Call To Action)
- **Footer**: Le pied de page contenant les liens, informations et newsletter

## Requirements

### Requirement 1: Header Navigation

**User Story:** As a visitor, I want to see a clear navigation header, so that I can easily navigate to different sections of the website.

#### Acceptance Criteria

1. THE Header SHALL display the Éditions Germinale logo on the left side
2. THE Header SHALL display navigation links: "Accueil", "Collections", "Librairie", "Soumettre un manuscrit"
3. THE Header SHALL display a search icon button
4. THE Header SHALL display a "Mon Compte" button with user icon on the right side
5. THE Header SHALL have a white background with subtle shadow
6. WHEN a user hovers over a navigation link, THE Header SHALL display visual feedback with color change

### Requirement 2: Hero Section

**User Story:** As a visitor, I want to see an attractive hero section, so that I understand the purpose of the website immediately.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a background image of a library/bookshelf
2. THE Hero_Section SHALL display the main title "La littérature qui vous ressemble" in white text
3. THE Hero_Section SHALL display a subtitle describing the publishing house mission
4. THE Hero_Section SHALL display a CTA_Button "Découvrir nos collections" with arrow icon
5. THE Hero_Section SHALL have a dark overlay on the background image for text readability
6. THE CTA_Button SHALL have a white background with dark text and rounded corners

### Requirement 3: Collections Section

**User Story:** As a visitor, I want to browse featured collections, so that I can discover books organized by themes.

#### Acceptance Criteria

1. THE Homepage SHALL display a "Collections à la une" section with a heading
2. THE Homepage SHALL display a "Voir tout" link to view all collections
3. THE Homepage SHALL display exactly 4 Collection_Card components in a grid layout
4. WHEN displaying a Collection_Card, THE Homepage SHALL show the collection cover image
5. WHEN displaying a Collection_Card, THE Homepage SHALL show the collection name
6. WHEN displaying a Collection_Card, THE Homepage SHALL show a short description
7. THE Collection_Card components SHALL have rounded corners and subtle shadow on hover

### Requirement 4: Popular Books Section

**User Story:** As a visitor, I want to see popular books, so that I can discover trending titles.

#### Acceptance Criteria

1. THE Homepage SHALL display a "Livres populaires" section with a heading
2. THE Homepage SHALL display navigation arrows for carousel control
3. THE Homepage SHALL display at least 5 Book_Card components in a horizontal scrollable layout
4. WHEN displaying a Book_Card, THE Homepage SHALL show the book cover image
5. WHEN displaying a Book_Card, THE Homepage SHALL show the book price in FCFA with a badge
6. WHEN displaying a Book_Card, THE Homepage SHALL show the book title
7. WHEN displaying a Book_Card, THE Homepage SHALL show the author name
8. WHEN a user clicks the left arrow, THE Homepage SHALL scroll the carousel to the left
9. WHEN a user clicks the right arrow, THE Homepage SHALL scroll the carousel to the right

### Requirement 5: How It Works Section

**User Story:** As a visitor, I want to understand how the platform works, so that I can decide to use the service.

#### Acceptance Criteria

1. THE Homepage SHALL display a "Comment ça marche ?" section with a heading
2. THE Homepage SHALL display a subtitle explaining the simple process
3. THE Homepage SHALL display exactly 3 steps with icons
4. THE Homepage SHALL display Step 1 "Découvrez" with book/search icon and description
5. THE Homepage SHALL display Step 2 "Commandez" with cart icon and description
6. THE Homepage SHALL display Step 3 "Savourez" with reading icon and description
7. THE section SHALL have a light gray background to differentiate from other sections

### Requirement 6: Author Call-to-Action Section

**User Story:** As an aspiring author, I want to see information about manuscript submission, so that I can submit my work.

#### Acceptance Criteria

1. THE Homepage SHALL display an "Appel aux auteurs" section
2. THE Homepage SHALL display the heading "Vous avez une histoire à raconter ?"
3. THE Homepage SHALL display a description encouraging manuscript submission
4. THE Homepage SHALL display a CTA_Button "Soumettre mon manuscrit" with arrow icon
5. THE CTA_Button SHALL have a white/light background with dark text
6. THE section SHALL have a dark green background matching the brand colors

### Requirement 10: Services Section

**User Story:** As a visitor, I want to see the services offered by the publishing house, so that I understand the value proposition for both authors and readers.

#### Acceptance Criteria

1. THE Homepage SHALL display a "Nos Services" section with a dark green header banner containing the title "Our Services"
2. THE Services_Section SHALL display a "For Authors" (Pour les Auteurs) subsection with label "PUBLISHING"
3. THE Services_Section SHALL display a heading "For Authors" with a descriptive subtitle about accompanying authors from first draft to final bookshelf
4. THE Services_Section SHALL display exactly 3 service cards for authors in a horizontal grid layout:
   - "Editorial Excellence" with document icon and description about manuscript evaluation, editing, and proofreading
   - "Branding & Promotion" with megaphone icon and description about cover design, social media kits, and marketing
   - "Global Distribution" with globe icon and description about digital and print distribution worldwide
5. THE Services_Section SHALL display a CTA_Button "Start Your Submission" with dark background below the author services
6. THE Services_Section SHALL display a "For Readers" (Pour les Lecteurs) subsection with label "DISCOVERY" on a light gray background
7. THE Services_Section SHALL display a heading "For Readers" with a descriptive subtitle about fostering connection and discovery
8. THE Services_Section SHALL display exactly 3 service cards for readers in a horizontal grid layout:
   - "Curated Collections" with list icon and description about hand-picked selections
   - "Seamless App" with mobile icon and description about enjoying catalog on any device
   - "Community Events" with users icon and description about virtual book clubs and author Q&As
9. THE Services_Section SHALL display a CTA_Button "Browse The Catalog" with orange outline style below the reader services
10. WHEN displaying a service card, THE card SHALL have rounded corners, subtle border, and contain an icon, title, and description
11. THE service card icons SHALL use the secondary color (orange #E8A87C) for author services and reader services

### Requirement 7: Footer

**User Story:** As a visitor, I want to access additional information and links in the footer, so that I can find contact info and legal pages.

#### Acceptance Criteria

1. THE Footer SHALL display the Éditions Germinale logo and tagline
2. THE Footer SHALL display social media icons (Facebook, Twitter, Instagram)
3. THE Footer SHALL display an "Explorer" column with links: Nouveautés, Meilleures ventes, Collections, Auteurs
4. THE Footer SHALL display an "À propos" column with links: Notre histoire, Services, Presse, Contact
5. THE Footer SHALL display a "Newsletter" section with email input and subscribe button
6. THE Footer SHALL display copyright text at the bottom
7. THE Footer SHALL display links to legal pages: Mentions légales, Politique de confidentialité, CGV
8. THE Footer SHALL have a dark background with light text

### Requirement 8: Responsive Design

**User Story:** As a mobile user, I want the homepage to be responsive, so that I can browse on any device.

#### Acceptance Criteria

1. WHEN the viewport width is less than 768px, THE Header SHALL display a mobile menu button
2. WHEN the viewport width is less than 768px, THE Collection_Card grid SHALL display 1-2 columns
3. WHEN the viewport width is less than 768px, THE Footer columns SHALL stack vertically
4. THE Homepage SHALL maintain readability and usability on all screen sizes

### Requirement 9: Visual Design Compliance

**User Story:** As a brand manager, I want the homepage to follow the brand guidelines, so that the visual identity is consistent.

#### Acceptance Criteria

1. THE Homepage SHALL use the primary color #2C5F4F (dark green) for main elements
2. THE Homepage SHALL use the secondary color #E8A87C (coral/peach) for accents
3. THE Homepage SHALL use #F8F6F2 (cream) for light backgrounds
4. THE Homepage SHALL use consistent border-radius of 12-20px for cards and buttons
5. THE Homepage SHALL use the specified typography with proper font weights
6. THE Homepage SHALL maintain consistent spacing using an 8px grid system
