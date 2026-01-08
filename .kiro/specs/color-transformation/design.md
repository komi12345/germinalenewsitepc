# Design Document: Color Transformation

## Overview

Ce document décrit l'architecture technique pour transformer le schéma de couleurs du site Éditions Germinale vers un design spirituel et minimaliste utilisant uniquement trois couleurs : noir, or et blanc.

## Architecture

### Approche de transformation

La transformation sera effectuée en deux phases :
1. **Phase 1** : Mise à jour des fichiers de configuration (Tailwind + CSS global)
2. **Phase 2** : Mise à jour de tous les composants pour utiliser les nouvelles classes de couleurs

### Fichiers de configuration à modifier

```
tailwind.config.ts     → Définition des nouvelles couleurs
app/globals.css        → Variables CSS et styles de base
```

### Composants à modifier

```
src/components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── FooterSimple.tsx
│   └── NewsletterForm.tsx
├── home/
│   ├── HeroSection.tsx
│   ├── CollectionsSection.tsx
│   ├── PopularBooksSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── AuthorCTASection.tsx
│   ├── ServicesSection.tsx
│   ├── TestimonialsSection.tsx
│   └── ContactSection.tsx
├── book/
│   ├── BookCard.tsx
│   └── BookCarousel.tsx
├── collection/
│   ├── CollectionCard.tsx
│   ├── CollectionListCard.tsx
│   ├── CollectionHero.tsx
│   ├── CollectionBooksSection.tsx
│   ├── CollectionBookCard.tsx
│   ├── CollectionDetailContent.tsx
│   ├── RelatedCollections.tsx
│   └── RelatedCollectionCard.tsx
├── collections/
│   ├── CollectionsPageContent.tsx
│   └── SearchAndFilters.tsx
├── manuscript/
│   ├── ManuscriptForm.tsx
│   ├── PersonalInfoSection.tsx
│   ├── WorkDetailsSection.tsx
│   ├── PdfUploadSection.tsx
│   └── TrustIndicators.tsx
└── ui/
    ├── Breadcrumb.tsx
    └── Pagination.tsx
```

## Components and Interfaces

### Nouveau système de couleurs Tailwind

```typescript
// tailwind.config.ts
const config: Config = {
  theme: {
    extend: {
      colors: {
        // Couleur de fond principale
        dark: {
          DEFAULT: "#0A0A0A",
          light: "#1A1A1A",
          lighter: "#2A2A2A",
        },
        // Couleur or pour accents et titres
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E5C158",
          dark: "#B8962E",
        },
        // Blanc pour texte
        light: {
          DEFAULT: "#FFFFFF",
          muted: "#E5E5E5",
          dimmed: "#A0A0A0",
        },
      },
    },
  },
};
```

### Variables CSS globales

```css
:root {
  /* Couleurs principales */
  --background: #0A0A0A;
  --foreground: #FFFFFF;
  
  /* Couleur or */
  --gold: #D4AF37;
  --gold-light: #E5C158;
  --gold-dark: #B8962E;
  
  /* Nuances de noir */
  --dark: #0A0A0A;
  --dark-light: #1A1A1A;
  --dark-lighter: #2A2A2A;
  
  /* Nuances de blanc */
  --light: #FFFFFF;
  --light-muted: #E5E5E5;
  --light-dimmed: #A0A0A0;
}
```

### Mapping des anciennes classes vers les nouvelles

| Ancienne classe | Nouvelle classe |
|-----------------|-----------------|
| `bg-white` | `bg-dark` |
| `bg-neutral-light` | `bg-dark-light` |
| `bg-primary` | `bg-gold` |
| `bg-secondary` | `bg-gold` |
| `text-primary` | `text-gold` |
| `text-neutral-text` | `text-light` |
| `text-gray-600` | `text-light-dimmed` |
| `hover:text-primary` | `hover:text-gold` |
| `border-gray-200` | `border-dark-lighter` |

## Data Models

Aucun changement de modèle de données requis - cette transformation est purement visuelle.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Color consistency across components

*For any* component in the application, the background color SHALL be either dark (#0A0A0A), dark-light (#1A1A1A), or dark-lighter (#2A2A2A).

**Validates: Requirements 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1**

### Property 2: Title color consistency

*For any* title element (h1, h2, h3, h4, h5, h6) or logo text, the color SHALL be gold (#D4AF37).

**Validates: Requirements 2.2, 3.2, 3.3, 4.2, 5.2, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7**

### Property 3: Body text color consistency

*For any* body text, description, or paragraph element, the color SHALL be white (#FFFFFF) or light-dimmed (#A0A0A0).

**Validates: Requirements 2.3, 3.4, 4.3, 5.3**

### Property 4: Interactive element hover state

*For any* interactive element (link, button), when hovered, the element SHALL change to gold color or have a gold accent.

**Validates: Requirements 2.4, 3.5, 5.6, 7.6, 8.3**

### Property 5: Button color scheme

*For any* primary button, the background SHALL be gold (#D4AF37) and the text SHALL be black (#0A0A0A).

**Validates: Requirements 2.5, 3.7, 4.4, 7.5**

## Error Handling

### Fallback colors

Si une image de fond ne charge pas, le fond noir sera affiché comme fallback :

```css
.hero-section {
  background-color: #0A0A0A;
  background-image: url('/images/hero-library.jpg');
}
```

### Contraste et accessibilité

Le ratio de contraste entre :
- Or (#D4AF37) sur noir (#0A0A0A) = 8.5:1 ✓ (WCAG AAA)
- Blanc (#FFFFFF) sur noir (#0A0A0A) = 19.6:1 ✓ (WCAG AAA)

## Testing Strategy

### Tests visuels manuels

1. Vérifier que chaque page a un fond noir uniforme
2. Vérifier que tous les titres sont en or
3. Vérifier que tout le texte courant est en blanc
4. Vérifier les états hover sur tous les éléments interactifs
5. Vérifier le contraste et la lisibilité sur différents écrans

### Tests unitaires existants

Les tests existants devront être mis à jour pour refléter les nouvelles classes CSS :
- Mettre à jour les assertions qui vérifient les classes de couleur
- S'assurer que les tests de rendu passent avec les nouvelles couleurs

### Checklist de validation par page

- [ ] Homepage : Hero, Collections, Livres populaires, How it works, CTA Auteur
- [ ] Page Collections : Liste, Filtres, Pagination
- [ ] Page Détail Collection : Hero, Livres, Collections liées
- [ ] Page Soumission Manuscrit : Formulaire complet
- [ ] Header : Logo, Navigation, Bouton compte
- [ ] Footer : Logo, Liens, Newsletter
