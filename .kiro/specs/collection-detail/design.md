# Design Document: Collection Detail Page

## Overview

Cette page affiche les détails complets d'une collection lorsqu'un utilisateur clique sur "Voir la collection" depuis une carte de collection. La page réutilise les composants Header et FooterSimple existants pour maintenir la cohérence visuelle du site.

## Architecture

```mermaid
graph TD
    A[Page /collections/[slug]] --> B[Header existant]
    A --> C[Breadcrumb]
    A --> D[CollectionHero]
    A --> E[CollectionBooksSection]
    A --> F[RelatedCollections]
    A --> G[FooterSimple existant]
    
    D --> D1[Image Collection]
    D --> D2[Badge COLLECTION PREMIUM]
    D --> D3[Titre + Description]
    D --> D4[Prix avec réduction]
    D --> D5[Boutons Action]
    D --> D6[Message Livraison]
    
    E --> E1[Titre Section]
    E --> E2[CollectionBookCard x N]
    
    F --> F1[Titre Section]
    F --> F2[RelatedCollectionCard x 3]
```

## Components and Interfaces

### 1. Page Component

```typescript
// app/collections/[slug]/page.tsx
interface CollectionDetailPageProps {
  params: {
    slug: string;
  };
}
```

### 2. CollectionHero Component

```typescript
// src/components/collection/CollectionHero.tsx
interface CollectionHeroProps {
  collection: {
    id: string;
    name: string;
    slug: string;
    description: string;
    coverImage: string;
    price: number;
    originalPrice?: number; // Prix original si réduction
    discountPercent?: number; // Pourcentage de réduction
    isLimited?: boolean; // Badge "Édition Limitée"
    bookCount: number;
  };
  onAddToCart: () => void;
  onShare: () => void;
}
```

### 3. CollectionBookCard Component

```typescript
// src/components/collection/CollectionBookCard.tsx
interface CollectionBookCardProps {
  book: {
    id: string;
    title: string;
    slug: string;
    author: string;
    coverImage: string;
    price: number;
  };
}
```

### 4. CollectionBooksSection Component

```typescript
// src/components/collection/CollectionBooksSection.tsx
interface CollectionBooksSectionProps {
  books: Array<{
    id: string;
    title: string;
    slug: string;
    author: string;
    coverImage: string;
    price: number;
  }>;
  bookCount: number;
}
```

### 5. RelatedCollectionCard Component

```typescript
// src/components/collection/RelatedCollectionCard.tsx
interface RelatedCollectionCardProps {
  collection: {
    id: string;
    name: string;
    slug: string;
    coverImage: string;
  };
}
```

### 6. RelatedCollections Component

```typescript
// src/components/collection/RelatedCollections.tsx
interface RelatedCollectionsProps {
  collections: Array<{
    id: string;
    name: string;
    slug: string;
    coverImage: string;
  }>;
}
```

## Data Models

### Collection Detail (Extended)

```typescript
interface CollectionDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  isLimited?: boolean;
  bookCount: number;
  books: Book[];
}

interface Book {
  id: string;
  title: string;
  slug: string;
  author: string;
  coverImage: string;
  price: number;
}
```

### Mock Data Extension

```typescript
// Ajouter à src/lib/mockData.ts
interface CollectionWithBooks extends Collection {
  originalPrice?: number;
  discountPercent?: number;
  isLimited?: boolean;
  books: Book[];
}

const mockBooks: Book[] = [
  {
    id: "b1",
    title: "L'Aventure Ambiguë",
    slug: "aventure-ambigue",
    author: "Cheikh Hamidou Kane",
    coverImage: "/images/placeholder-book.svg",
    price: 4500,
  },
  // ... autres livres
];
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Breadcrumb displays collection name correctly

*For any* collection with a valid name, the breadcrumb SHALL display "Accueil / Collections / [collection.name]" where [collection.name] matches the actual collection name.

**Validates: Requirements 1.2**

### Property 2: Collection description is always displayed

*For any* collection with a description, the CollectionHero SHALL render the complete description text without truncation.

**Validates: Requirements 2.5**

### Property 3: Limited edition badge conditional rendering

*For any* collection where isLimited is true, the CollectionHero SHALL display the "Édition Limitée" badge on the image. *For any* collection where isLimited is false or undefined, the badge SHALL NOT be displayed.

**Validates: Requirements 2.3**

### Property 4: Price reduction display

*For any* collection with originalPrice and discountPercent defined, the Price_Badge SHALL display: the originalPrice crossed out, the current price, and the discountPercent as "-X%".

**Validates: Requirements 2.6**

### Property 5: Book count accuracy

*For any* collection with N books, the CollectionBooksSection SHALL display "[N] chefs-d'œuvre inclus dans ce coffret" where N equals the actual number of books.

**Validates: Requirements 4.2**

### Property 6: Book card completeness

*For any* book in the collection, the CollectionBookCard SHALL display: cover image, title, author name, price formatted in FCFA, and "Acheter seul" link.

**Validates: Requirements 4.5**

### Property 7: Related collection card completeness

*For any* related collection, the RelatedCollectionCard SHALL display: cover image with gradient overlay, "COLLECTION" label, collection name, and "Découvrir →" link.

**Validates: Requirements 5.3**

## Error Handling

### Collection Not Found

```typescript
// Si la collection n'existe pas
if (!collection) {
  notFound(); // Utilise la page 404 de Next.js
}
```

### Empty Books Array

```typescript
// Si la collection n'a pas de livres
if (collection.books.length === 0) {
  // Afficher un message "Aucun livre dans cette collection"
}
```

### Image Loading Errors

```typescript
// Utiliser un placeholder en cas d'erreur de chargement d'image
<Image
  src={collection.coverImage}
  alt={collection.name}
  onError={(e) => {
    e.currentTarget.src = "/images/placeholder-collection.svg";
  }}
/>
```

## Testing Strategy

### Unit Tests

- Tester le rendu du Breadcrumb avec différents noms de collection
- Tester l'affichage conditionnel du badge "Édition Limitée"
- Tester le formatage des prix avec et sans réduction
- Tester le comptage des livres dans la section

### Property-Based Tests

Utiliser **fast-check** pour les tests property-based:

- Générer des collections aléatoires et vérifier que le breadcrumb affiche toujours le bon nom
- Générer des collections avec/sans réduction et vérifier l'affichage correct des prix
- Générer des listes de livres et vérifier que le compteur est toujours exact

### Integration Tests

- Tester la navigation depuis la page collections vers la page détail
- Tester le bouton "Acheter toute la collection" avec le store panier
- Tester les liens vers les pages de livres individuels

## Visual Design Specifications

### CollectionHero Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Accueil / Collections / La Pléiade Africaine        │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────────┐  ┌────────────────────────────────────────┐│
│ │                  │  │ ● COLLECTION PREMIUM                   ││
│ │                  │  │                                        ││
│ │   Cover Image    │  │ La Pléiade Africaine                   ││
│ │   (rounded-2xl)  │  │ (h1, font-serif, text-4xl)             ││
│ │                  │  │                                        ││
│ │                  │  │ Description text...                    ││
│ │  ┌────────────┐  │  │                                        ││
│ │  │Éd. Limitée│  │  │ 45.000 FCFA  52.000 FCFA  -15%         ││
│ │  └────────────┘  │  │                                        ││
│ └──────────────────┘  │ [🛒 Acheter toute la collection]       ││
│                       │ [↗ Partager]                           ││
│                       │                                        ││
│                       │ 🚚 Livraison gratuite à partir de...   ││
│                       └────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### CollectionBooksSection Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Les livres de la collection          Voir tous les détails →   │
│ 4 chefs-d'œuvre inclus dans ce coffret                         │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                │
│ │  Cover  │ │  Cover  │ │  Cover  │ │  Cover  │                │
│ │ (3/4)   │ │ (3/4)   │ │ (3/4)   │ │ (3/4)   │                │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘                │
│ Titre       Titre       Titre       Titre                       │
│ Auteur      Auteur      Auteur      Auteur                      │
│ Prix  Lien  Prix  Lien  Prix  Lien  Prix  Lien                  │
└─────────────────────────────────────────────────────────────────┘
```

### RelatedCollections Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Vous aimerez aussi                                              │
├─────────────────────────────────────────────────────────────────┤
│ ┌───────────────────┐ ┌───────────────────┐ ┌─────────────────┐│
│ │ Image (16/9)      │ │ Image (16/9)      │ │ Image (16/9)    ││
│ │ ┌───────────────┐ │ │ ┌───────────────┐ │ │ ┌─────────────┐ ││
│ │ │ COLLECTION    │ │ │ │ COLLECTION    │ │ │ │ COLLECTION  │ ││
│ │ │ Nom           │ │ │ │ Nom           │ │ │ │ Nom         │ ││
│ │ │ Découvrir →   │ │ │ │ Découvrir →   │ │ │ │ Découvrir → │ ││
│ │ └───────────────┘ │ │ └───────────────┘ │ │ └─────────────┘ ││
│ └───────────────────┘ └───────────────────┘ └─────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Color Specifications

| Element | Color | Tailwind Class |
|---------|-------|----------------|
| Badge COLLECTION PREMIUM | Green bg, white text | `bg-primary text-white` |
| Badge Édition Limitée | Dark overlay | `bg-neutral-text/80 text-white` |
| Prix actuel | Primary green | `text-primary font-bold` |
| Prix barré | Gray | `text-gray-400 line-through` |
| Badge réduction | Red/Orange | `text-red-500` ou `text-secondary` |
| Bouton principal | Primary green | `bg-primary text-white` |
| Bouton secondaire | Outline | `border border-gray-300 text-neutral-text` |
| Lien "Acheter seul" | Gray | `text-gray-500 hover:text-primary` |

### Spacing Specifications

| Element | Spacing | Tailwind Class |
|---------|---------|----------------|
| Page padding | 16px mobile, 24px desktop | `px-4 lg:px-6` |
| Section gap | 64px | `py-16` |
| Hero grid gap | 32px | `gap-8` |
| Book grid gap | 24px | `gap-6` |
| Related cards gap | 24px | `gap-6` |
