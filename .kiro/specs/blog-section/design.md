# Design Document: Blog Section

## Overview

La section Blog et Actualités est un composant React qui affiche les derniers articles du blog sur la page d'accueil d'Éditions Germinale. Elle suit le design moderne avec le code couleur noir/or/blanc du site et présente 3 articles sous forme de cartes visuelles avec image, catégorie, titre, extrait et informations de l'auteur.

## Architecture

```
BlogSection (Server Component)
├── Header
│   ├── Title ("Blog")
│   ├── Subtitle (description)
│   └── ViewMoreLink ("Voir plus →")
└── ArticleGrid
    ├── ArticleCard (×3)
    │   ├── ImageContainer
    │   │   ├── CoverImage
    │   │   └── CategoryBadge
    │   ├── ContentArea
    │   │   ├── Title
    │   │   └── Excerpt
    │   └── AuthorInfo
    │       ├── Avatar
    │       ├── AuthorName
    │       └── PublishDate
```

## Components and Interfaces

### BlogSection Component

```typescript
// src/components/home/BlogSection.tsx

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string; // Format: "12 OCT 2023"
}

interface BlogSectionProps {
  articles?: BlogArticle[];
}

export function BlogSection({ articles }: BlogSectionProps): JSX.Element;
```

### ArticleCard Component

```typescript
// Composant interne à BlogSection

interface ArticleCardProps {
  article: BlogArticle;
}

function ArticleCard({ article }: ArticleCardProps): JSX.Element;
```

### CategoryBadge Component

```typescript
// Composant interne pour le badge de catégorie

interface CategoryBadgeProps {
  category: string;
}

function CategoryBadge({ category }: CategoryBadgeProps): JSX.Element;
```

### AuthorInfo Component

```typescript
// Composant interne pour les informations de l'auteur

interface AuthorInfoProps {
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
}

function AuthorInfo({ author, publishedAt }: AuthorInfoProps): JSX.Element;
```

## Data Models

### BlogArticle Type

```typescript
interface BlogArticle {
  id: string;           // Identifiant unique
  title: string;        // Titre de l'article
  slug: string;         // URL slug pour le lien
  excerpt: string;      // Extrait/description (max ~100 caractères)
  coverImage: string;   // URL de l'image de couverture
  category: string;     // Catégorie (DESIGN, INTERVIEW, TENDANCES, etc.)
  author: {
    name: string;       // Nom de l'auteur
    avatar?: string;    // URL de l'avatar (optionnel)
  };
  publishedAt: string;  // Date formatée (ex: "12 OCT 2023")
}
```

### Mock Data

```typescript
const mockBlogArticles: BlogArticle[] = [
  {
    id: "1",
    title: "L'art de la reliure numérique",
    slug: "art-reliure-numerique",
    excerpt: "Découvrez comment nous transformons les classiques en expériences modernes sans...",
    coverImage: "/images/placeholder-book.svg",
    category: "DESIGN",
    author: {
      name: "SOPHIE MARTIN",
      avatar: "/images/placeholder-book.svg",
    },
    publishedAt: "12 OCT 2023",
  },
  {
    id: "2",
    title: "Rencontre avec nos nouveaux auteurs",
    slug: "rencontre-nouveaux-auteurs",
    excerpt: "Trois plumes prometteuses rejoignent la maison Germinale cette saison. Entretien...",
    coverImage: "/images/placeholder-book.svg",
    category: "INTERVIEW",
    author: {
      name: "MARC DUBOIS",
      avatar: "/images/placeholder-book.svg",
    },
    publishedAt: "05 OCT 2023",
  },
  {
    id: "3",
    title: "Les tendances littéraires de 2024",
    slug: "tendances-litteraires-2024",
    excerpt: "Analyse des genres qui captiveront les lecteurs l'année prochaine. Le retour du...",
    coverImage: "/images/placeholder-book.svg",
    category: "TENDANCES",
    author: {
      name: "ÉDITIONS GERMINALE",
    },
    publishedAt: "28 SEPT 2023",
  },
];
```

## Visual Design Specifications

### Layout

- Section padding: `py-16 md:py-20 px-4`
- Max width container: `max-w-6xl mx-auto`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

### Colors (Tailwind Classes)

- Background section: `bg-dark`
- Card background: `bg-dark-light`
- Card border: `border border-dark-lighter`
- Card hover border: `hover:border-gold/30`
- Title: `text-gold`
- Subtitle: `text-light-dimmed`
- Article title: `text-light`
- Excerpt: `text-light-dimmed`
- Category badge bg: `bg-gold`
- Category badge text: `text-dark`
- Author name: `text-light`
- Date: `text-light-dimmed`

### Typography

- Section title: `text-2xl md:text-3xl lg:text-4xl font-serif font-bold`
- Article title: `text-lg font-semibold`
- Excerpt: `text-sm leading-relaxed`
- Category badge: `text-xs font-semibold uppercase`
- Author name: `text-sm font-medium`
- Date: `text-sm`

### Spacing

- Header margin bottom: `mb-12`
- Card padding: `p-0` (image full width) + content area `p-5`
- Image height: `h-48`
- Gap between cards: `gap-6`
- Author info margin top: `mt-4`

### Border Radius

- Card: `rounded-2xl`
- Image top: `rounded-t-2xl`
- Category badge: `rounded-md`
- Avatar: `rounded-full`

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Article Card Content Completeness

*For any* BlogArticle object passed to ArticleCard, the rendered output SHALL contain the article's title, excerpt, category badge, cover image, and author information.

**Validates: Requirements 3.1, 3.2, 3.4, 3.5, 3.6**

### Property 2: Author Info Completeness

*For any* author object with a name and publishedAt date, the AuthorInfo component SHALL render the author's avatar (or initials), name, separator (•), and date.

**Validates: Requirements 4.1, 4.2, 4.3, 4.4**

### Property 3: Image Accessibility

*For any* cover image rendered in ArticleCard, the image element SHALL have a non-empty alt attribute containing descriptive text.

**Validates: Requirements 6.2**

## Error Handling

### Missing Data Scenarios

1. **No articles provided**: Display section with empty state or hide section
2. **Missing cover image**: Use placeholder image `/images/placeholder-book.svg`
3. **Missing author avatar**: Display initials of author name on gold background
4. **Missing excerpt**: Display truncated title or empty string

### Fallback Values

```typescript
const defaultArticle: Partial<BlogArticle> = {
  coverImage: "/images/placeholder-book.svg",
  excerpt: "",
  category: "ARTICLE",
  author: {
    name: "Éditions Germinale",
  },
};
```

## Testing Strategy

### Unit Tests

- Test BlogSection renders with mock data
- Test ArticleCard displays all required elements
- Test CategoryBadge displays correct category text
- Test AuthorInfo displays author name and date with separator
- Test avatar fallback to initials when no avatar URL provided
- Test data-testid attribute presence

### Property-Based Tests

- **Property 1**: Generate random BlogArticle objects and verify all content elements are present in rendered output
- **Property 2**: Generate random author/date combinations and verify AuthorInfo renders all elements
- **Property 3**: Generate random image URLs and verify alt attributes are present and non-empty

### Test Configuration

- Framework: Jest with React Testing Library
- Property-based testing: fast-check
- Minimum 100 iterations per property test
- Tag format: **Feature: blog-section, Property N: [property_text]**

## Integration Notes

### Page Integration

Add BlogSection to `app/page.tsx` between TestimonialsSection and ContactSection:

```tsx
{/* Section Témoignages clients */}
<TestimonialsSection />

{/* Section Blog et Actualités */}
<BlogSection articles={mockBlogArticles} />

{/* Section Contact */}
<ContactSection />
```

### Future Enhancements

- Connect to Prisma database for real blog articles
- Add pagination or "Load more" functionality
- Implement article detail page `/blog/[slug]`
- Add search and filter by category
