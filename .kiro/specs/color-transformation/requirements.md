# Requirements Document

## Introduction

Transformation complète du schéma de couleurs du site Éditions Germinale vers un design simple, modeste et spirituel utilisant uniquement trois couleurs : noir (fond), or (titres et accents), et blanc (texte courant).

## Glossary

- **Color_System**: Le système de couleurs Tailwind CSS et les variables CSS définissant les couleurs du site
- **Background_Color**: Couleur de fond principale du site (noir #0A0A0A ou similaire)
- **Gold_Color**: Couleur or pour les titres et éléments d'accent (#D4AF37 ou similaire)
- **White_Color**: Couleur blanche pour le texte courant et certains éléments (#FFFFFF)
- **Component**: Un fichier React/TSX contenant des éléments d'interface utilisateur

## Requirements

### Requirement 1: Configuration des couleurs de base

**User Story:** En tant que développeur, je veux configurer le nouveau système de couleurs dans Tailwind et CSS, afin que toutes les pages utilisent les trois couleurs définies.

#### Acceptance Criteria

1. THE Color_System SHALL define a primary background color as black (#0A0A0A)
2. THE Color_System SHALL define a gold accent color (#D4AF37) for titles and highlights
3. THE Color_System SHALL define white (#FFFFFF) for body text and secondary elements
4. THE Color_System SHALL remove all previous color definitions (primary, secondary, accent, neutral-light)
5. WHEN the site loads, THE Background_Color SHALL be applied to the body element

### Requirement 2: Transformation du Header

**User Story:** En tant qu'utilisateur, je veux voir un header avec le nouveau schéma de couleurs, afin d'avoir une expérience visuelle cohérente et spirituelle.

#### Acceptance Criteria

1. THE Header SHALL have a black background color
2. THE Header logo text SHALL be displayed in gold color
3. THE Header navigation links SHALL be displayed in white color
4. WHEN a user hovers over a navigation link, THE link SHALL change to gold color
5. THE Header "Mon Compte" button SHALL have a gold background with black text
6. THE Header mobile menu SHALL have a black background with white text

### Requirement 3: Transformation du Footer

**User Story:** En tant qu'utilisateur, je veux voir un footer avec le nouveau schéma de couleurs, afin de maintenir la cohérence visuelle sur tout le site.

#### Acceptance Criteria

1. THE Footer SHALL have a black background color
2. THE Footer logo text SHALL be displayed in gold color
3. THE Footer section titles SHALL be displayed in gold color
4. THE Footer links and body text SHALL be displayed in white color
5. WHEN a user hovers over a footer link, THE link SHALL change to gold color
6. THE Footer newsletter input SHALL have a dark border with white text
7. THE Footer newsletter button SHALL have a gold background with black text

### Requirement 4: Transformation de la Hero Section

**User Story:** En tant qu'utilisateur, je veux voir une section hero avec le nouveau schéma de couleurs, afin d'avoir une première impression spirituelle et élégante.

#### Acceptance Criteria

1. THE HeroSection SHALL have a black background (or dark overlay on image)
2. THE HeroSection main title SHALL be displayed in gold color
3. THE HeroSection subtitle/description SHALL be displayed in white color
4. THE HeroSection CTA button SHALL have a gold background with black text
5. WHEN a user hovers over the CTA button, THE button SHALL have a lighter gold shade

### Requirement 5: Transformation des cartes et composants

**User Story:** En tant qu'utilisateur, je veux voir toutes les cartes et composants avec le nouveau schéma de couleurs, afin d'avoir une expérience cohérente sur toutes les pages.

#### Acceptance Criteria

1. THE BookCard component SHALL have a black or very dark background
2. THE BookCard title SHALL be displayed in gold color
3. THE BookCard description and metadata SHALL be displayed in white color
4. THE CollectionCard component SHALL follow the same color pattern as BookCard
5. THE CollectionListCard component SHALL follow the same color pattern
6. WHEN a user hovers over a card, THE card SHALL have a subtle gold border or glow effect

### Requirement 6: Transformation des sections de page

**User Story:** En tant qu'utilisateur, je veux voir toutes les sections de page avec le nouveau schéma de couleurs, afin de naviguer dans un site visuellement unifié.

#### Acceptance Criteria

1. THE CollectionsSection SHALL have a black background with gold section title
2. THE PopularBooksSection SHALL have a black background with gold section title
3. THE HowItWorksSection SHALL have a black background with gold titles and white text
4. THE AuthorCTASection SHALL have a black background with gold title and white description
5. THE ServicesSection SHALL have a black background with gold titles
6. THE TestimonialsSection SHALL have a black background with gold and white text
7. THE ContactSection SHALL have a black background with gold title

### Requirement 7: Transformation des pages spécifiques

**User Story:** En tant qu'utilisateur, je veux voir toutes les pages du site avec le nouveau schéma de couleurs, afin d'avoir une expérience spirituelle cohérente.

#### Acceptance Criteria

1. THE Collections page SHALL have a black background throughout
2. THE Collection detail page SHALL have a black background throughout
3. THE Submit manuscript page SHALL have a black background throughout
4. THE form inputs on all pages SHALL have dark backgrounds with white text and gold focus borders
5. THE buttons on all pages SHALL follow the gold/black color scheme
6. THE breadcrumbs SHALL be displayed in white with gold hover state

### Requirement 8: Transformation des éléments UI

**User Story:** En tant qu'utilisateur, je veux voir tous les éléments d'interface avec le nouveau schéma de couleurs, afin d'interagir avec un design cohérent.

#### Acceptance Criteria

1. THE Pagination component SHALL have gold active state and white inactive state
2. THE SearchAndFilters component SHALL have dark inputs with white text
3. THE Breadcrumb component SHALL have white text with gold hover
4. THE form error messages SHALL be displayed in a muted red that complements the scheme
5. THE loading states SHALL use gold color for spinners or indicators
