# Design Document - Homepage Éditions Germinale

## Overview

Ce document décrit l'architecture et le design technique de la page d'accueil du site Éditions Germinale. La homepage est une page Server Component Next.js qui affiche les collections et livres depuis la base de données, avec des composants client pour les interactions (carousel, navigation mobile).

Le design visuel suit fidèlement la maquette fournie avec une esthétique moderne, épurée et chaleureuse utilisant la palette de couleurs de la marque.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    app/page.tsx (Server)                     │
│  - Fetch collections et livres depuis Prisma                │
│  - Render les sections statiques                            │
└────────────────┬────────────────────────────────────────────┘
                 │
    ┌────────────┼────────────┬────────────┐
    ↓            ↓            ↓            ↓
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  Header  │ │   Hero   │ │Collections│ │  Footer  │
│ (Client) │ │ (Server) │ │ (Server)  │ │ (Server) │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
                              │
                    ┌─────────┴─────────┐
                    ↓                   ↓
              ┌──────────┐        ┌──────────┐
              │BookCarousel│      │ HowItWorks│
              │ (Client)  │       │ (Server)  │
              └──────────┘        └──────────┘
```

## Components and Interfaces

### Header Component

```typescript
// components/layout/Header.tsx
"use client";

interface HeaderProps {
  // Pas de props, utilise le contexte auth
}

// Navigation items
const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Librairie", href: "/books" },
  { label: "Soumettre un manuscrit", href: "/submit-manuscript" },
];

// Comportement:
// - Logo cliquable vers homepage
// - Navigation desktop visible > 768px
// - Menu hamburger mobile < 768px
// - Icône recherche
// - Bouton "Mon Compte" avec icône utilisateur
// - Background blanc avec shadow-sm
```

### HeroSection Component

```typescript
// components/home/HeroSection.tsx
interface HeroSectionProps {
  // Pas de props, contenu statique
}

// Structure visuelle:
// - Background: image bibliothèque avec overlay sombre (bg-black/40)
// - Hauteur: h-[500px] md:h-[600px]
// - Titre: "La littérature qui vous ressemble" - text-4xl md:text-5xl font-serif text-white
// - Sous-titre: description mission - text-lg text-white/90
// - CTA: bouton blanc avec texte vert foncé et flèche
```

### CollectionCard Component

```typescript
// components/collection/CollectionCard.tsx
interface CollectionCardProps {
  collection: {
    id: string;
    name: string;
    slug: string;
    description: string;
    coverImage: string;
  };
}

// Structure visuelle (basée sur l'image):
// - Container: rounded-2xl overflow-hidden bg-white
// - Image: aspect-[4/5] object-cover
// - Contenu: p-4
// - Titre: font-semibold text-lg text-neutral-text
// - Description: text-sm text-gray-600 line-clamp-2
// - Hover: shadow-lg transition-shadow
```

### BookCard Component

```typescript
// components/book/BookCard.tsx
interface BookCardProps {
  book: {
    id: string;
    title: string;
    slug: string;
    author: string;
    coverImage: string;
    price: number; // en centimes FCFA
  };
}

// Structure visuelle (basée sur l'image):
// - Container: relative group
// - Image: aspect-[3/4] rounded-xl object-cover
// - Badge prix: absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-lg text-sm
// - Titre: font-medium text-neutral-text mt-3
// - Auteur: text-sm text-gray-500
// - Format prix: "X XXX FCFA" avec séparateur milliers
```

### BookCarousel Component

```typescript
// components/book/BookCarousel.tsx
"use client";

interface BookCarouselProps {
  books: Array<{
    id: string;
    title: string;
    slug: string;
    author: string;
    coverImage: string;
    price: number;
  }>;
}

// Comportement:
// - Scroll horizontal avec snap
// - Boutons navigation gauche/droite
// - Affiche 2 livres mobile, 3 tablette, 5 desktop
// - Animation smooth scroll
```

### HowItWorksSection Component

```typescript
// components/home/HowItWorksSection.tsx
interface Step {
  icon: "search" | "cart" | "book";
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: "search",
    title: "Découvrez",
    description: "Parcourez notre catalogue riche sur le web, par nos soins littéraires."
  },
  {
    icon: "cart", 
    title: "Commandez",
    description: "Une expérience d'achat facile avec FedaPay, adapté au format numérique moderne."
  },
  {
    icon: "book",
    title: "Savourez",
    description: "Plongez dans votre lecture et rejoignez notre communauté de passionnés."
  }
];

// Structure visuelle:
// - Background: bg-[#F5F5F5]
// - Titre centré: "Comment ça marche ?"
// - Sous-titre: description du processus
// - 3 colonnes avec icônes vertes, titres et descriptions
```

### AuthorCTASection Component

```typescript
// components/home/AuthorCTASection.tsx
interface AuthorCTASectionProps {
  // Pas de props, contenu statique
}

// Structure visuelle:
// - Background: bg-primary (vert foncé #2C5F4F)
// - Label: "Appel aux auteurs" - text-sm text-white/80
// - Titre: "Vous avez une histoire à raconter ?" - text-3xl text-white font-serif
// - Description: texte encourageant - text-white/90
// - CTA: bouton blanc "Soumettre mon manuscrit" avec flèche
```

### Footer Component

```typescript
// components/layout/Footer.tsx
interface FooterProps {
  // Pas de props
}

// Structure visuelle (4 colonnes):
// Colonne 1: Logo + tagline + icônes sociales
// Colonne 2: "Explorer" - Nouveautés, Meilleures ventes, Collections, Auteurs
// Colonne 3: "À propos" - Notre histoire, Services, Presse, Contact
// Colonne 4: "Newsletter" - input email + bouton S'inscrire

// Bottom bar: Copyright + liens légaux
// Background: bg-[#1a1a1a] ou similaire foncé
```

## Data Models

Les données sont récupérées depuis Prisma (déjà défini dans le schema):

```typescript
// Types pour la homepage
interface HomepageData {
  featuredCollections: Collection[];
  popularBooks: Book[];
}

// Requête Prisma dans page.tsx
const featuredCollections = await prisma.collection.findMany({
  where: { isActive: true },
  take: 4,
  orderBy: { createdAt: "desc" },
});

const popularBooks = await prisma.book.findMany({
  where: { isActive: true },
  take: 10,
  orderBy: { createdAt: "desc" },
});
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Collection Cards Display Required Fields

*For any* Collection_Card rendered on the homepage, the card SHALL contain a visible cover image, collection name, and description text.

**Validates: Requirements 3.4, 3.5, 3.6**

### Property 2: Book Cards Display Required Fields

*For any* Book_Card rendered on the homepage, the card SHALL contain a visible cover image, price badge in FCFA format, book title, and author name.

**Validates: Requirements 4.4, 4.5, 4.6, 4.7**

### Property 3: Exactly Four Collections Displayed

*For any* valid set of active collections in the database, the homepage SHALL display exactly 4 Collection_Card components (or fewer if less than 4 exist).

**Validates: Requirements 3.3**

### Property 4: Minimum Five Books in Carousel

*For any* valid set of active books in the database, the homepage SHALL display at least 5 Book_Card components in the carousel (or all books if fewer than 5 exist).

**Validates: Requirements 4.3**

### Property 5: Three Steps in How It Works

*For any* render of the HowItWorksSection, exactly 3 step cards SHALL be displayed with icons, titles, and descriptions.

**Validates: Requirements 5.3**

### Property 6: Price Formatting Consistency

*For any* book price displayed, the format SHALL be "{amount} FCFA" where amount uses space as thousands separator (e.g., "15 000 FCFA").

**Validates: Requirements 4.5**

### Property 7: Brand Colors Usage

*For any* primary action button or heading, the primary color #2C5F4F SHALL be used. *For any* accent element, the secondary color #E8A87C SHALL be used.

**Validates: Requirements 9.1, 9.2**

## Error Handling

### Data Fetching Errors

```typescript
// Dans page.tsx
try {
  const collections = await prisma.collection.findMany({...});
  const books = await prisma.book.findMany({...});
} catch (error) {
  console.error("Erreur chargement homepage:", error);
  // Afficher un état d'erreur gracieux
  return <HomepageError />;
}
```

### Empty States

- Si aucune collection: afficher message "Aucune collection disponible"
- Si aucun livre: masquer la section carousel
- Images manquantes: utiliser placeholder image

### Image Loading

```typescript
// Utiliser next/image avec fallback
<Image
  src={collection.coverImage}
  alt={collection.name}
  fill
  className="object-cover"
  onError={(e) => {
    e.currentTarget.src = "/images/placeholder-book.jpg";
  }}
/>
```

## Testing Strategy

### Unit Tests

Les tests unitaires vérifient les composants individuels:

1. **Header Tests**
   - Vérifie la présence du logo
   - Vérifie les liens de navigation
   - Vérifie le bouton Mon Compte

2. **CollectionCard Tests**
   - Vérifie le rendu avec données valides
   - Vérifie le lien vers la page collection

3. **BookCard Tests**
   - Vérifie le formatage du prix
   - Vérifie le rendu de tous les champs

4. **BookCarousel Tests**
   - Vérifie la navigation gauche/droite
   - Vérifie le scroll behavior

### Property-Based Tests

Configuration: Jest + fast-check, minimum 100 itérations par test.

1. **Test Property 1 & 2**: Générer des collections/livres aléatoires, vérifier que tous les champs requis sont rendus.

2. **Test Property 6**: Générer des prix aléatoires (1-1000000 FCFA), vérifier le format de sortie.

### Integration Tests

1. **Homepage Load Test**: Vérifier que la page charge avec données mock
2. **Responsive Test**: Vérifier le layout à différentes tailles d'écran

### Visual Regression Tests

Utiliser des snapshots pour détecter les changements visuels non intentionnels.
