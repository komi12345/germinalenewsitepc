# Design Document: Collections Page

## Overview

La page "Nos Collections" est une page de listing qui affiche toutes les collections de livres disponibles. Elle permet aux utilisateurs de rechercher, filtrer et parcourir les collections avec une pagination. Le design suit la charte graphique d'Éditions Germinale avec les couleurs primaires vertes (#2C5F4F) et le fond neutre (#F8F6F2).

## Architecture

```
app/collections/page.tsx (Server Component)
├── Header (réutilisé)
├── CollectionsPageContent (Client Component)
│   ├── Breadcrumb
│   ├── PageHeader (titre + description)
│   ├── SearchAndFilters
│   │   ├── SearchInput
│   │   └── FilterDropdowns (Genre, Trier par, Prix)
│   ├── CollectionsGrid
│   │   └── CollectionListCard (x6 par page)
│   └── Pagination
└── FooterSimple (version simplifiée)
```

## Components and Interfaces

### 1. CollectionsPageContent

Composant client principal qui gère l'état de la recherche, des filtres et de la pagination.

```typescript
interface CollectionsPageContentProps {
  initialCollections: Collection[];
  totalPages: number;
}

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  price: number;
  bookCount: number;
  isNew?: boolean;
  isPopular?: boolean;
}
```

### 2. Breadcrumb

Composant simple affichant le fil d'Ariane.

```typescript
interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}
```

### 3. SearchAndFilters

Barre de recherche avec filtres dropdown.

```typescript
interface SearchAndFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedGenre: string;
  onGenreChange: (value: string) => void;
  selectedSort: string;
  onSortChange: (value: string) => void;
  selectedPrice: string;
  onPriceChange: (value: string) => void;
}
```

### 4. CollectionListCard

Carte de collection avec design spécifique pour la page listing.

```typescript
interface CollectionListCardProps {
  collection: Collection;
}
```

### 5. Pagination

Composant de pagination avec navigation.

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
```

### 6. FooterSimple

Version simplifiée du footer avec logo et copyright uniquement.

```typescript
// Pas de props, composant statique
```

## Data Models

### Collection (pour cette page)

```typescript
interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  price: number;        // Prix en FCFA
  bookCount: number;    // Nombre de livres dans la collection
  isNew?: boolean;      // Badge "Nouveau"
  isPopular?: boolean;  // Badge "Populaire"
}
```

### Filter Options

```typescript
const genreOptions = [
  { value: "all", label: "Tous les genres" },
  { value: "litterature", label: "Littérature" },
  { value: "poesie", label: "Poésie" },
  { value: "histoire", label: "Histoire" },
  { value: "romans", label: "Romans" },
  { value: "science-fiction", label: "Science-Fiction" },
  { value: "biographies", label: "Biographies" },
];

const sortOptions = [
  { value: "newest", label: "Plus récents" },
  { value: "oldest", label: "Plus anciens" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "name-asc", label: "A-Z" },
  { value: "name-desc", label: "Z-A" },
];

const priceOptions = [
  { value: "all", label: "Tous les prix" },
  { value: "0-3000", label: "Moins de 3 000 FCFA" },
  { value: "3000-5000", label: "3 000 - 5 000 FCFA" },
  { value: "5000-10000", label: "5 000 - 10 000 FCFA" },
  { value: "10000+", label: "Plus de 10 000 FCFA" },
];
```

## Visual Design Specifications

### Layout

- Max width: 1280px (max-w-7xl)
- Padding horizontal: 16px mobile, 24px tablet, 32px desktop
- Background: #F8F6F2 (neutral-light)

### Breadcrumb

- Font size: 14px
- Color: gray-600
- Separator: "/"
- Current page: non-cliquable, couleur plus foncée

### Page Title

- Font: Serif, bold
- Size: 48px desktop, 36px mobile
- Color: #2D2D2D (neutral-text)
- Margin bottom: 16px

### Subtitle

- Font size: 16px
- Color: gray-600
- Max width: 500px
- Margin bottom: 32px

### Search Input

- Width: 300px desktop, 100% mobile
- Height: 44px
- Border: 1px solid gray-300
- Border radius: 8px
- Placeholder: "Rechercher une collection..."
- Icon: Search (lucide) à gauche

### Filter Dropdowns

- Background: #2C5F4F (primary)
- Text: white
- Padding: 10px 16px
- Border radius: 8px
- Icon: ChevronDown à droite
- Gap entre filtres: 12px

### Collection Card

- Background: white
- Border radius: 16px (rounded-2xl)
- Shadow: subtle on hover
- Image aspect ratio: 4/3
- Image border radius: 12px

#### Card Content

- Book count: 14px, gray-600, avec icône livre
- Title: 18px, bold, neutral-text
- Description: 14px, gray-600, line-clamp-2
- Price: 16px, bold, primary (#2C5F4F)
- Link: 14px, primary, avec flèche →

#### Badges

- Position: absolute, top-right de l'image
- Background: #2C5F4F (primary)
- Text: white, 12px
- Padding: 4px 12px
- Border radius: 9999px (full)

### Pagination

- Container: flex, justify-center, gap-2
- Page button: 40px x 40px
- Border radius: 8px
- Active: bg-primary, text-white
- Inactive: bg-white, text-gray-600, border
- Arrows: ChevronLeft, ChevronRight

### Footer Simple

- Background: white
- Border top: 1px solid gray-200
- Padding: 24px
- Logo: left, primary color
- Copyright: right, gray-500

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Search Filter Consistency

*For any* search query entered by the user, all displayed collections SHALL have names that contain the search query (case-insensitive).

**Validates: Requirements 4.5**

### Property 2: Pagination Bounds

*For any* pagination state, the current page number SHALL be between 1 and totalPages inclusive, and navigation SHALL not allow going below 1 or above totalPages.

**Validates: Requirements 7.5, 7.6**

### Property 3: Grid Responsiveness

*For any* viewport width, the collections grid SHALL display the correct number of columns: 1 column for width < 640px, 2 columns for 640px-1024px, 3 columns for > 1024px.

**Validates: Requirements 5.1, 5.2, 5.3, 9.3**

### Property 4: Badge Display Logic

*For any* collection, if isNew is true, the "Nouveau" badge SHALL be displayed; if isPopular is true, the "Populaire" badge SHALL be displayed; both badges SHALL never appear simultaneously on the same card.

**Validates: Requirements 5.4, 5.5**

### Property 5: Price Formatting

*For any* collection price, the displayed price SHALL be formatted with space as thousand separator and "FCFA" suffix (e.g., "5 000 FCFA").

**Validates: Requirements 6.5**

## Error Handling

### Search Errors

- Si la recherche ne retourne aucun résultat, afficher un message "Aucune collection trouvée"
- Proposer de réinitialiser les filtres

### Loading States

- Afficher un skeleton loader pendant le chargement des collections
- Désactiver les filtres pendant le chargement

### Image Errors

- Utiliser une image placeholder si l'image de collection ne charge pas
- Image placeholder: /images/placeholder-collection.svg

## Testing Strategy

### Unit Tests

- Tester le composant Breadcrumb avec différentes configurations
- Tester le formatage des prix (formatPrice utility)
- Tester la logique de pagination (calcul des pages visibles)

### Property-Based Tests

- Property 1: Tester que la recherche filtre correctement avec des chaînes aléatoires
- Property 2: Tester les limites de pagination avec des nombres aléatoires
- Property 5: Tester le formatage des prix avec des valeurs aléatoires

### Integration Tests

- Tester le flux complet: recherche → filtrage → pagination
- Tester la navigation vers une collection individuelle

### Visual Tests

- Vérifier le responsive design sur différentes tailles d'écran
- Vérifier l'affichage des badges
- Vérifier les états hover des cartes
