# 📘 DOCUMENT DE PILOTAGE TECHNIQUE - EDITION GERMINALE

**Version** : 1.0  
**Date** : 30 Décembre 2025  
**Projet** : Plateforme Web de Maison d'Édition avec Dashboard Administrateur  
**Agent IA** : Kiro (Claude Opus 4.5)  
**Langage** : Français

---

## 🎯 OBJECTIF DE CE DOCUMENT

Ce document constitue le guide complet et autoritaire pour le développement de la plateforme **Edition Germinale**. Chaque section doit être suivie rigoureusement pour garantir un code propre, fonctionnel, sécurisé et sans erreurs.

**RÈGLES ABSOLUES** :
- ❌ AUCUN code mort (code non utilisé)
- ❌ AUCUNE hallucination technique
- ✅ TOUS les designs fournis doivent être respectés pixel par pixel
- ✅ TOUTES les fonctionnalités doivent être testées et fonctionnelles
- ✅ TOUS les points de sécurité doivent être implémentés
- ✅ Code commenté en français pour les parties complexes

---

## 📋 TABLE DES MATIÈRES

1. [Vue d'ensemble du projet](#1-vue-densemble-du-projet)
2. [Architecture technique](#2-architecture-technique)
3. [Stack technologique](#3-stack-technologique)
4. [Structure du projet](#4-structure-du-projet)
5. [Base de données (Supabase)](#5-base-de-données-supabase)
6. [Authentification et sécurité](#6-authentification-et-sécurité)
7. [Système de paiement (FedaPay)](#7-système-de-paiement-fedapay)
8. [Gestion des fichiers et uploads](#8-gestion-des-fichiers-et-uploads)
9. [Système d'envoi d'emails](#9-système-denvoi-demails)
10. [Fonctionnalités Frontend](#10-fonctionnalités-frontend)
11. [Dashboard Administrateur](#11-dashboard-administrateur)
12. [Lecteur de livres PDF](#12-lecteur-de-livres-pdf)
13. [Respect des designs](#13-respect-des-designs)
14. [Tests et validations](#14-tests-et-validations)
15. [Déploiement](#15-déploiement)
16. [Checklist finale](#16-checklist-finale)

---

## 1. VUE D'ENSEMBLE DU PROJET

### 1.1 Description
**Edition Germinale** est une plateforme web moderne permettant :
- La vente de livres numériques individuels
- La vente de collections thématiques de livres
- La lecture en ligne des livres achetés
- La soumission de manuscrits par des auteurs
- Un dashboard administrateur complet pour la gestion

### 1.2 Utilisateurs cibles
1. **Lecteurs** : Achètent et lisent des livres en ligne
2. **Auteurs** : Soumettent leurs manuscrits
3. **Administrateurs** : Gèrent le contenu et les utilisateurs

### 1.3 Devise
Tous les prix sont en **FCFA (Francs CFA)**

### 1.4 Zones géographiques
Principalement l'Afrique francophone (Togo, Bénin, Côte d'Ivoire, Sénégal, etc.)

---

## 2. ARCHITECTURE TECHNIQUE

### 2.1 Architecture globale
```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 15)                     │
│  - Pages publiques (SSR)                                     │
│  - Dashboard Admin (CSR avec protection)                     │
│  - Lecteur PDF (CSR)                                         │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓
┌────────────────────────────────────────────────────────────┐
│              API ROUTES (Next.js Route Handlers)            │
│  - /api/auth/* (NextAuth)                                   │
│  - /api/books/*                                             │
│  - /api/collections/*                                       │
│  - /api/payment/*                                           │
│  - /api/manuscripts/*                                       │
│  - /api/admin/*                                             │
└────────────────┬───────────────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    ↓            ↓            ↓
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Supabase │ │ FedaPay  │ │  Resend  │
│   (DB)   │ │(Paiement)│ │ (Email)  │
└──────────┘ └──────────┘ └──────────┘
```

### 2.2 Principes architecturaux
- **Separation of Concerns** : UI, Business Logic, Data séparés
- **Server Components par défaut** : Utiliser Client Components seulement si nécessaire
- **API Routes sécurisées** : Validation des données + authentification
- **Gestion d'état minimale** : Zustand uniquement pour panier et préférences utilisateur

---

## 3. STACK TECHNOLOGIQUE

### 3.1 Technologies obligatoires

| Catégorie | Technologie | Version | Justification |
|-----------|------------|---------|---------------|
| **Framework** | Next.js | 15.x (App Router) | SSR, SEO, Performance |
| **Langage** | TypeScript | 5.x | Type safety |
| **Styling** | Tailwind CSS | 3.x | Respect des designs |
| **Base de données** | Supabase | Latest | PostgreSQL + Auth + Storage |
| **Auth** | NextAuth.js | 5.x | Compatible Supabase |
| **ORM** | Prisma | 6.x | Type-safe queries |
| **Paiement** | FedaPay | Latest SDK | Paiements Afrique (FCFA) |
| **Email** | Resend | Latest | Emails transactionnels |
| **Upload** | Supabase Storage | - | PDFs + Images |
| **PDF Viewer** | react-pdf | 9.x | Lecture livres |
| **État global** | Zustand | 4.x | Panier, préférences |
| **Formulaires** | React Hook Form + Zod | Latest | Validation robuste |
| **UI Components** | Radix UI | Latest | Accessibilité |
| **Icônes** | Lucide React | Latest | Cohérence visuelle |
| **Charts** | Recharts | 2.x | Graphiques admin |
| **Notifications** | Sonner | Latest | Toasts élégants |

### 3.2 Variables d'environnement requises

Créer `.env.local` avec :

```bash
# Database (Supabase)
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB]?pgbouncer=true"
DIRECT_URL="postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB]"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."

# NextAuth
NEXTAUTH_SECRET="[GÉNÉRER avec: openssl rand -base64 32]"
NEXTAUTH_URL="http://localhost:3000"

# FedaPay
FEDAPAY_SECRET_KEY="sk_sandbox_..."
FEDAPAY_PUBLIC_KEY="pk_sandbox_..."
NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY="pk_sandbox_..."

# Resend (Email)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@editiongerminale.com"

# URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 4. STRUCTURE DU PROJET

### 4.1 Arborescence complète

```
edition-germinale/
├── prisma/
│   ├── schema.prisma              # Schéma de base de données
│   └── seed.ts                    # Données de test
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-books.jpg
│   │   └── placeholders/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (public)/
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── collections/
│   │   │   │   ├── page.tsx          # Liste collections
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # Détail collection
│   │   │   ├── books/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # Détail livre
│   │   │   └── submit-manuscript/
│   │   │       └── page.tsx
│   │   ├── (protected)/
│   │   │   ├── library/
│   │   │   │   └── page.tsx          # Bibliothèque utilisateur
│   │   │   ├── reader/
│   │   │   │   └── [bookId]/
│   │   │   │       └── page.tsx      # Lecteur PDF
│   │   │   └── checkout/
│   │   │       └── page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx            # Layout admin avec sidebar
│   │   │   ├── page.tsx              # Dashboard overview
│   │   │   ├── books/
│   │   │   │   ├── page.tsx          # Liste livres
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   ├── collections/
│   │   │   │   └── (same structure)
│   │   │   ├── manuscripts/
│   │   │   │   └── page.tsx
│   │   │   └── users/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── books/
│   │   │   │   ├── route.ts          # GET (liste), POST (create)
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts      # GET, PUT, DELETE
│   │   │   ├── collections/
│   │   │   │   └── (same structure)
│   │   │   ├── payment/
│   │   │   │   ├── create-checkout/
│   │   │   │   │   └── route.ts
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts
│   │   │   ├── manuscripts/
│   │   │   │   └── route.ts
│   │   │   └── upload/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                       # Composants Radix UI
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── select.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx           # Pour admin
│   │   │   └── MobileMenu.tsx
│   │   ├── book/
│   │   │   ├── BookCard.tsx
│   │   │   ├── BookGrid.tsx
│   │   │   └── BookDetail.tsx
│   │   ├── collection/
│   │   │   ├── CollectionCard.tsx
│   │   │   └── CollectionGrid.tsx
│   │   ├── cart/
│   │   │   ├── CartButton.tsx
│   │   │   └── CartDrawer.tsx
│   │   ├── reader/
│   │   │   ├── PdfViewer.tsx
│   │   │   └── ReaderControls.tsx
│   │   └── admin/
│   │       ├── StatCard.tsx
│   │       ├── DataTable.tsx
│   │       └── Chart.tsx
│   ├── lib/
│   │   ├── auth.ts                   # NextAuth config
│   │   ├── prisma.ts                 # Prisma client
│   │   ├── supabase.ts               # Supabase clients
│   │   ├── fedapay.ts                # FedaPay SDK
│   │   ├── email.ts                  # Resend config
│   │   ├── utils.ts                  # Utilitaires (cn, formatPrice)
│   │   └── validations/
│   │       ├── book.ts               # Schémas Zod
│   │       ├── collection.ts
│   │       ├── manuscript.ts
│   │       └── user.ts
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useAuth.ts
│   │   └── useReader.ts
│   ├── stores/
│   │   ├── cart-store.ts             # Zustand store panier
│   │   └── reader-store.ts           # Préférences lecteur
│   ├── types/
│   │   └── index.ts                  # Types TypeScript globaux
│   └── middleware.ts                 # Protection routes
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 5. BASE DE DONNÉES (SUPABASE)

### 5.1 Schéma Prisma complet

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ============================================
// MODÈLE UTILISATEUR
// ============================================
enum UserRole {
  USER
  ADMIN
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String    // Hashé avec bcrypt
  role          UserRole  @default(USER)
  emailVerified DateTime?
  image         String?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  purchases     Purchase[]
  manuscripts   Manuscript[]
  readingProgress ReadingProgress[]
  
  @@index([email])
}

// ============================================
// MODÈLE COLLECTION
// ============================================
model Collection {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String   @db.Text
  coverImage  String   // URL Supabase Storage
  price       Int      // Prix en FCFA (centimes)
  isActive    Boolean  @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  books       Book[]
  purchases   Purchase[]
  
  @@index([slug])
  @@index([isActive])
}

// ============================================
// MODÈLE LIVRE
// ============================================
model Book {
  id           String     @id @default(cuid())
  title        String
  slug         String     @unique
  author       String
  description  String     @db.Text
  coverImage   String     // URL Supabase Storage
  pdfFile      String     // URL Supabase Storage
  pageCount    Int?
  price        Int        // Prix en FCFA (centimes)
  isActive     Boolean    @default(true)
  
  collectionId String?
  collection   Collection? @relation(fields: [collectionId], references: [id], onDelete: SetNull)
  
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  
  // Relations
  purchases    Purchase[]
  readingProgress ReadingProgress[]
  
  @@index([slug])
  @@index([collectionId])
  @@index([isActive])
}

// ============================================
// MODÈLE ACHAT
// ============================================
enum PurchaseType {
  BOOK
  COLLECTION
}

enum PurchaseStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

model Purchase {
  id              String         @id @default(cuid())
  userId          String
  user            User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  type            PurchaseType
  amount          Int            // Montant en FCFA (centimes)
  status          PurchaseStatus @default(PENDING)
  
  // Pour achat livre
  bookId          String?
  book            Book?          @relation(fields: [bookId], references: [id], onDelete: SetNull)
  
  // Pour achat collection
  collectionId    String?
  collection      Collection?    @relation(fields: [collectionId], references: [id], onDelete: SetNull)
  
  // FedaPay
  fedapayTransactionId String?  @unique
  fedapayStatus        String?
  
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  
  @@index([userId])
  @@index([status])
  @@index([fedapayTransactionId])
}

// ============================================
// MODÈLE PROGRESSION DE LECTURE
// ============================================
model ReadingProgress {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  bookId       String
  book         Book     @relation(fields: [bookId], references: [id], onDelete: Cascade)
  
  currentPage  Int      @default(1)
  totalPages   Int
  progress     Float    @default(0) // Pourcentage 0-100
  
  lastReadAt   DateTime @default(now())
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  @@unique([userId, bookId])
  @@index([userId])
  @@index([bookId])
}

// ============================================
// MODÈLE MANUSCRIT
// ============================================
enum ManuscriptStatus {
  PENDING
  REVIEWING
  ACCEPTED
  REJECTED
}

model Manuscript {
  id          String           @id @default(cuid())
  userId      String
  user        User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  title       String
  authorName  String
  email       String
  genre       String
  synopsis    String           @db.Text
  pdfFile     String           // URL Supabase Storage
  
  status      ManuscriptStatus @default(PENDING)
  adminNotes  String?          @db.Text
  
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
  
  @@index([userId])
  @@index([status])
  @@index([createdAt])
}
```

### 5.2 Configuration Supabase

**Étapes obligatoires** :

1. **Créer un projet Supabase** sur https://supabase.com
2. **Activer Row Level Security (RLS)** sur toutes les tables
3. **Configurer Storage buckets** :
   ```sql
   -- Bucket pour couvertures de livres
   INSERT INTO storage.buckets (id, name, public) 
   VALUES ('book-covers', 'book-covers', true);
   
   -- Bucket pour fichiers PDF (privé)
   INSERT INTO storage.buckets (id, name, public) 
   VALUES ('book-pdfs', 'book-pdfs', false);
   
   -- Bucket pour manuscrits (privé)
   INSERT INTO storage.buckets (id, name, public) 
   VALUES ('manuscripts', 'manuscripts', false);
   ```

4. **Policies RLS pour Storage** :
   ```sql
   -- book-covers : lecture publique
   CREATE POLICY "Public read book covers"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'book-covers');
   
   -- book-covers : upload admin uniquement
   CREATE POLICY "Admin upload book covers"
   ON storage.objects FOR INSERT
   TO authenticated
   USING (bucket_id = 'book-covers' AND auth.jwt() ->> 'role' = 'ADMIN');
   
   -- book-pdfs : lecture uniquement si acheté
   CREATE POLICY "Users read purchased PDFs"
   ON storage.objects FOR SELECT
   TO authenticated
   USING (
     bucket_id = 'book-pdfs' AND
     EXISTS (
       SELECT 1 FROM purchases p
       WHERE p.user_id = auth.uid()
       AND p.status = 'COMPLETED'
       AND (p.book_id = (storage.objects.name::text) OR /* logique collection */)
     )
   );
   ```

### 5.3 Initialisation Prisma

```bash
# Générer le client Prisma
npx prisma generate

# Créer et appliquer la migration
npx prisma migrate dev --name init

# Seed (optionnel, données de test)
npx prisma db seed
```

---

## 6. AUTHENTIFICATION ET SÉCURITÉ

### 6.1 Configuration NextAuth.js

**Fichier** : `src/lib/auth.ts`

```typescript
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Identifiants invalides");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Identifiants invalides");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
```

### 6.2 Middleware de protection

**Fichier** : `src/middleware.ts`

```typescript
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "ADMIN";
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
                       req.nextUrl.pathname.startsWith("/register");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isProtectedRoute = req.nextUrl.pathname.startsWith("/library") ||
                            req.nextUrl.pathname.startsWith("/reader") ||
                            req.nextUrl.pathname.startsWith("/checkout");

    // Redirection si déjà connecté et sur page auth
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/library", req.url));
    }

    // Vérifier accès admin
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
                          req.nextUrl.pathname.startsWith("/register");
        const isProtected = req.nextUrl.pathname.startsWith("/library") ||
                           req.nextUrl.pathname.startsWith("/reader") ||
                           req.nextUrl.pathname.startsWith("/checkout") ||
                           req.nextUrl.pathname.startsWith("/admin");

        // Pages auth accessibles sans token
        if (isAuthPage) return true;

        // Routes protégées nécessitent un token
        if (isProtected) return !!token;

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/library/:path*",
    "/reader/:path*",
    "/checkout/:path*",
    "/login",
    "/register",
  ],
};
```

### 6.3 Sécurité des API Routes

**Pattern obligatoire pour toutes les API protégées** :

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Vérifier authentification
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // 2. Vérifier rôle admin si nécessaire
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Accès refusé" },
        { status: 403 }
      );
    }

    // 3. Valider les données avec Zod
    const body = await req.json();
    const validatedData = mySchema.parse(body);

    // 4. Exécuter la logique métier
    // ...

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Erreur API:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
```

### 6.4 Hash des mots de passe

**TOUJOURS** utiliser bcrypt :

```typescript
import { hash } from "bcryptjs";

// Lors de l'inscription
const hashedPassword = await hash(password, 10);

// Stocker hashedPassword en DB, JAMAIS le mot de passe en clair
```

### 6.5 Variables sensibles

- ❌ JAMAIS commiter `.env.local`
- ✅ Utiliser `NEXT_PUBLIC_*` uniquement pour variables exposables au client
- ✅ Vérifier `.gitignore` contient `.env*`

---

## 7. SYSTÈME DE PAIEMENT (FEDAPAY)

### 7.1 Configuration FedaPay

**Fichier** : `src/lib/fedapay.ts`

```typescript
import FedaPay from "fedapay";

// Initialiser FedaPay
FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY!);
FedaPay.setEnvironment(
  process.env.NODE_ENV === "production" ? "live" : "sandbox"
);

export { FedaPay };
```

### 7.2 Création de session de paiement

**API Route** : `src/app/api/payment/create-checkout/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { FedaPay } from "@/lib/fedapay";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      type: z.enum(["BOOK", "COLLECTION"]),
      id: z.string(),
    })
  ),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();
    const { items } = checkoutSchema.parse(body);

    // Calculer le montant total
    let totalAmount = 0;
    const purchaseRecords = [];

    for (const item of items) {
      if (item.type === "BOOK") {
        const book = await prisma.book.findUnique({
          where: { id: item.id },
        });
        if (!book) throw new Error(`Livre ${item.id} introuvable`);
        totalAmount += book.price;
        purchaseRecords.push({
          userId: session.user.id,
          type: "BOOK",
          bookId: book.id,
          amount: book.price,
          status: "PENDING",
        });
      } else {
        const collection = await prisma.collection.findUnique({
          where: { id: item.id },
        });
        if (!collection) throw new Error(`Collection ${item.id} introuvable`);
        totalAmount += collection.price;
        purchaseRecords.push({
          userId: session.user.id,
          type: "COLLECTION",
          collectionId: collection.id,
          amount: collection.price,
          status: "PENDING",
        });
      }
    }

    // Créer les enregistrements Purchase en DB
    const purchases = await prisma.purchase.createMany({
      data: purchaseRecords,
    });

    // Créer transaction FedaPay
    const transaction = await FedaPay.Transaction.create({
      description: "Achat Edition Germinale",
      amount: totalAmount, // En centimes
      currency: {
        iso: "XOF", // Code pour FCFA
      },
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook`,
      customer: {
        firstname: session.user.name?.split(" ")[0],
        lastname: session.user.name?.split(" ")[1] || "",
        email: session.user.email,
      },
    });

    // Générer URL de paiement
    const token = await transaction.generateToken();

    return NextResponse.json({
      checkoutUrl: token.url,
      transactionId: transaction.id,
    });
  } catch (error) {
    console.error("Erreur création paiement:", error);
    return NextResponse.json(
      { error: "Erreur création paiement" },
      { status: 500 }
    );
  }
}
```

### 7.3 Webhook FedaPay

**API Route** : `src/app/api/payment/webhook/route.ts`

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FedaPay } from "@/lib/fedapay";
import { sendPurchaseConfirmationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { transaction_id, status } = body;

    // Vérifier signature FedaPay (IMPORTANT pour sécurité)
    // const signature = req.headers.get("x-fedapay-signature");
    // if (!verifySignature(signature, body)) {
    //   return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
    // }

    // Récupérer transaction FedaPay
    const transaction = await FedaPay.Transaction.retrieve(transaction_id);

    // Mettre à jour les achats en DB
    await prisma.purchase.updateMany({
      where: {
        fedapayTransactionId: transaction_id,
      },
      data: {
        status: status === "approved" ? "COMPLETED" : "FAILED",
        fedapayStatus: status,
      },
    });

    // Si paiement réussi, envoyer email de confirmation
    if (status === "approved") {
      const purchase = await prisma.purchase.findFirst({
        where: { fedapayTransactionId: transaction_id },
        include: {
          user: true,
          book: true,
          collection: { include: { books: true } },
        },
      });

      if (purchase) {
        await sendPurchaseConfirmationEmail(purchase);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erreur webhook FedaPay:", error);
    return NextResponse.json({ error: "Erreur webhook" }, { status: 500 });
  }
}
```

### 7.4 Vérification d'achat

**Fonction utilitaire** : Vérifier si un utilisateur a acheté un livre

```typescript
export async function userHasPurchased(
  userId: string,
  bookId: string
): Promise<boolean> {
  const purchase = await prisma.purchase.findFirst({
    where: {
      userId,
      status: "COMPLETED",
      OR: [
        { bookId }, // Achat direct du livre
        {
          collection: {
            books: {
              some: { id: bookId }, // Livre dans une collection achetée
            },
          },
        },
      ],
    },
  });

  return !!purchase;
}
```

---

## 8. GESTION DES FICHIERS ET UPLOADS

### 8.1 Configuration Supabase Storage

**Fichier** : `src/lib/supabase.ts`

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client public (frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client admin (backend avec permissions complètes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
```

### 8.2 Upload de fichiers (Admin)

**API Route** : `src/app/api/upload/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // "cover" | "pdf"

    if (!file) {
      return NextResponse.json(
        { error: "Fichier manquant" },
        { status: 400 }
      );
    }

    // Déterminer le bucket
    const bucket = type === "cover" ? "book-covers" : "book-pdfs";

    // Générer nom unique
    const fileName = `${Date.now()}-${file.name}`;

    // Uploader vers Supabase
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Obtenir URL publique
    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return NextResponse.json({
      url: urlData.publicUrl,
      path: data.path,
    });
  } catch (error) {
    console.error("Erreur upload:", error);
    return NextResponse.json({ error: "Erreur upload" }, { status: 500 });
  }
}
```

### 8.3 Upload de manuscrits

**Pattern similaire mais avec bucket `manuscripts`**

```typescript
// Dans le formulaire de soumission
const handleSubmit = async (data: ManuscriptFormData) => {
  // 1. Upload PDF vers Supabase
  const formData = new FormData();
  formData.append("file", data.pdfFile);
  formData.append("type", "manuscript");

  const uploadRes = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const { url } = await uploadRes.json();

  // 2. Créer manuscrit en DB
  await fetch("/api/manuscripts", {
    method: "POST",
    body: JSON.stringify({
      ...data,
      pdfFile: url,
    }),
  });
};
```

### 8.4 Signed URLs pour PDFs protégés

Pour les livres achetés, générer des URLs signées :

```typescript
export async function getSignedPdfUrl(bookId: string, userId: string) {
  // Vérifier achat
  const hasPurchased = await userHasPurchased(userId, bookId);
  if (!hasPurchased) {
    throw new Error("Livre non acheté");
  }

  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) throw new Error("Livre introuvable");

  // Extraire le path du fichier
  const path = book.pdfFile.split("/").pop()!;

  // Générer URL signée valide 1 heure
  const { data, error } = await supabaseAdmin.storage
    .from("book-pdfs")
    .createSignedUrl(path, 3600);

  if (error) throw error;

  return data.signedUrl;
}
```

---

## 9. SYSTÈME D'ENVOI D'EMAILS

### 9.1 Configuration Resend

**Fichier** : `src/lib/email.ts`

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Erreur envoi email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return { success: false, error };
  }
}

// Template email de bienvenue
export async function sendWelcomeEmail(userEmail: string, userName: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #2D2D2D; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2C5F4F, #3A7A64); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #F8F6F2; padding: 30px; }
          .button { display: inline-block; background: #E8A87C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Bienvenue sur Edition Germinale</h1>
          </div>
          <div class="content">
            <p>Bonjour ${userName},</p>
            <p>Nous sommes ravis de vous accueillir sur <strong>Edition Germinale</strong>, votre nouvelle bibliothèque numérique francophone.</p>
            <p>Vous pouvez désormais :</p>
            <ul>
              <li>📚 Découvrir nos collections de livres</li>
              <li>🛒 Acheter et lire en ligne</li>
              <li>✍️ Soumettre vos manuscrits</li>
            </ul>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/collections" class="button">Découvrir nos livres</a>
          </div>
          <div class="footer">
            <p>© 2025 Edition Germinale - Tous droits réservés</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject: "Bienvenue sur Edition Germinale 📚",
    html,
  });
}

// Template email de confirmation d'achat
export async function sendPurchaseConfirmationEmail(purchase: any) {
  const itemName = purchase.book
    ? purchase.book.title
    : purchase.collection.name;
  const itemType = purchase.type === "BOOK" ? "livre" : "collection";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          /* Styles similaires */
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Achat confirmé !</h1>
          </div>
          <div class="content">
            <p>Bonjour ${purchase.user.name},</p>
            <p>Votre achat a été confirmé avec succès :</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>${itemName}</h3>
              <p>Type : ${itemType}</p>
              <p>Montant : ${(purchase.amount / 100).toLocaleString("fr-FR")} FCFA</p>
            </div>
            <p>Vous pouvez dès maintenant accéder à votre achat depuis votre bibliothèque.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/library" class="button">Accéder à ma bibliothèque</a>
          </div>
          <div class="footer">
            <p>© 2025 Edition Germinale</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: purchase.user.email,
    subject: `Confirmation d'achat - ${itemName}`,
    html,
  });
}

// Template email de soumission de manuscrit
export async function sendManuscriptSubmissionEmail(
  userEmail: string,
  userName: string,
  manuscriptTitle: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <!-- Template similaire -->
      <body>
        <div class="container">
          <div class="header">
            <h1>📝 Manuscrit reçu</h1>
          </div>
          <div class="content">
            <p>Bonjour ${userName},</p>
            <p>Nous avons bien reçu votre manuscrit <strong>"${manuscriptTitle}"</strong>.</p>
            <p>Notre équipe éditoriale va l'examiner dans les prochains jours. Vous recevrez une réponse sous 2 à 4 semaines.</p>
            <p>Merci pour votre confiance !</p>
          </div>
          <div class="footer">
            <p>© 2025 Edition Germinale</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject: `Manuscrit reçu - ${manuscriptTitle}`,
    html,
  });
}
```

### 9.2 Déclenchement des emails

**Inscription** :
```typescript
// Après création utilisateur
await sendWelcomeEmail(user.email, user.name);
```

**Achat confirmé** :
```typescript
// Dans le webhook FedaPay
if (status === "approved") {
  await sendPurchaseConfirmationEmail(purchase);
}
```

**Soumission manuscrit** :
```typescript
// Après création manuscrit
await sendManuscriptSubmissionEmail(user.email, user.name, manuscript.title);
```

---

## 10. FONCTIONNALITÉS FRONTEND

### 10.1 Homepage

**Fichier** : `src/app/(public)/page.tsx`

**Sections obligatoires** :
1. **Hero Section** : Image de livres + titre accrocheur + CTA
2. **Collections à la une** : 3-4 collections populaires
3. **Livres populaires** : Carousel horizontal
4. **Comment ça marche** : 3 étapes avec icônes
5. **Soumettre un manuscrit** : Section avec CTA

**Exemple structure** :

```tsx
import { CollectionCard } from "@/components/collection/CollectionCard";
import { BookCarousel } from "@/components/book/BookCarousel";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  // Fetch données (Server Component)
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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary to-primary-dark">
        {/* ... */}
      </section>

      {/* Collections */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-serif text-center mb-12">
          Nos Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {featuredCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {/* Livres populaires */}
      <section className="py-16 bg-neutral-light">
        <BookCarousel books={popularBooks} />
      </section>

      {/* Comment ça marche */}
      <section className="py-16">{/* ... */}</section>

      {/* Soumission manuscrit */}
      <section className="py-16 bg-secondary/10">{/* ... */}</section>
    </div>
  );
}
```

### 10.2 Page Collections

**Route** : `/collections`

**Fonctionnalités** :
- Liste toutes les collections actives
- Recherche par nom
- Filtres par prix
- Pagination

```tsx
import { CollectionGrid } from "@/components/collection/CollectionGrid";

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";

  const collections = await prisma.collection.findMany({
    where: {
      isActive: true,
      name: { contains: search, mode: "insensitive" },
    },
    skip: (page - 1) * 12,
    take: 12,
  });

  const total = await prisma.collection.count({
    where: {
      isActive: true,
      name: { contains: search, mode: "insensitive" },
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Barre de recherche */}
      <SearchBar defaultValue={search} />

      {/* Grid de collections */}
      <CollectionGrid collections={collections} />

      {/* Pagination */}
      <Pagination currentPage={page} totalPages={Math.ceil(total / 12)} />
    </div>
  );
}
```

### 10.3 Page Détail Collection

**Route** : `/collections/[id]`

**Fonctionnalités** :
- Afficher infos collection
- Liste des livres inclus
- Bouton "Acheter la collection"
- Option d'acheter livres individuellement

```tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export default async function CollectionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const collection = await prisma.collection.findUnique({
    where: { id: params.id },
    include: { books: true },
  });

  if (!collection) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image collection */}
        <div>
          <img
            src={collection.coverImage}
            alt={collection.name}
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>

        {/* Infos */}
        <div>
          <h1 className="text-4xl font-serif mb-4">{collection.name}</h1>
          <p className="text-lg text-neutral-text mb-6">
            {collection.description}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            {collection.books.length} livres inclus
          </p>
          <p className="text-3xl font-bold text-primary mb-6">
            {(collection.price / 100).toLocaleString("fr-FR")} FCFA
          </p>
          <AddToCartButton
            item={{ type: "COLLECTION", id: collection.id }}
          />
        </div>
      </div>

      {/* Liste des livres */}
      <section className="mt-16">
        <h2 className="text-2xl font-serif mb-8">Livres de cette collection</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collection.books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
```

### 10.4 Page Détail Livre

**Route** : `/books/[id]`

**Fonctionnalités similaires à la collection**

### 10.5 Page Bibliothèque

**Route** : `/library` (protégée)

**Fonctionnalités** :
- Afficher tous les livres achetés
- Filtres : Collections / Livres individuels
- Tri : Récemment achetés / Titre
- Bouton "Lire" sur chaque livre

```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function LibraryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // Récupérer tous les achats de l'utilisateur
  const purchases = await prisma.purchase.findMany({
    where: {
      userId: session.user.id,
      status: "COMPLETED",
    },
    include: {
      book: true,
      collection: { include: { books: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Construire liste unique de livres
  const purchasedBooks = new Map();
  purchases.forEach((purchase) => {
    if (purchase.book) {
      purchasedBooks.set(purchase.book.id, purchase.book);
    } else if (purchase.collection) {
      purchase.collection.books.forEach((book) => {
        purchasedBooks.set(book.id, book);
      });
    }
  });

  const books = Array.from(purchasedBooks.values());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif mb-8">Ma Bibliothèque</h1>

      {books.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <LibraryBookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### 10.6 Page Soumission Manuscrit

**Route** : `/submit-manuscript`

**Formulaire avec** :
- Nom
- Email
- Titre manuscrit
- Genre
- Synopsis
- Upload PDF

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const manuscriptSchema = z.object({
  authorName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  title: z.string().min(2, "Titre requis"),
  genre: z.string().min(2, "Genre requis"),
  synopsis: z.string().min(100, "Synopsis trop court (min 100 caractères)"),
  pdfFile: z.instanceof(File).refine((file) => file.type === "application/pdf", {
    message: "Fichier PDF requis",
  }),
});

type ManuscriptFormData = z.infer<typeof manuscriptSchema>;

export default function SubmitManuscriptPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ManuscriptFormData>({
    resolver: zodResolver(manuscriptSchema),
  });

  const onSubmit = async (data: ManuscriptFormData) => {
    try {
      // 1. Upload PDF
      const formData = new FormData();
      formData.append("file", data.pdfFile);
      formData.append("type", "manuscript");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Erreur upload");

      const { url } = await uploadRes.json();

      // 2. Créer manuscrit
      const res = await fetch("/api/manuscripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          pdfFile: url,
        }),
      });

      if (!res.ok) throw new Error("Erreur soumission");

      toast.success("Manuscrit soumis avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la soumission");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-serif mb-8 text-center">
        Soumettez votre manuscrit
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Champs du formulaire */}
        {/* ... */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark disabled:opacity-50"
        >
          {isSubmitting ? "Envoi en cours..." : "Soumettre"}
        </button>
      </form>
    </div>
  );
}
```

### 10.7 Gestion du Panier (Zustand)

**Store** : `src/stores/cart-store.ts`

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  type: "BOOK" | "COLLECTION";
  id: string;
  title: string;
  price: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const exists = get().items.find((i) => i.id === item.id);
        if (exists) {
          return; // Déjà dans le panier
        }
        set((state) => ({ items: [...state.items, item] }));
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.price, 0),
    }),
    {
      name: "cart-storage",
    }
  )
);
```

**Composant** : `src/components/cart/CartButton.tsx`

```tsx
"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useState } from "react";
import { CartDrawer } from "./CartDrawer";

export function CartButton() {
  const items = useCartStore((state) => state.items);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 hover:bg-gray-100 rounded-lg"
      >
        <ShoppingCart className="w-6 h-6" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
```

---

## 11. DASHBOARD ADMINISTRATEUR

### 11.1 Layout Admin

**Fichier** : `src/app/admin/layout.tsx`

```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
```

### 11.2 Dashboard Overview

**Fichier** : `src/app/admin/page.tsx`

**Statistiques à afficher** :
- Nombre total d'utilisateurs
- Nombre d'achats (livres + collections)
- Revenus totaux en FCFA
- Manuscrits en attente

```tsx
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/admin/StatCard";
import { SalesChart } from "@/components/admin/SalesChart";
import { Users, ShoppingBag, DollarSign, FileText } from "lucide-react";

export default async function AdminDashboardPage() {
  // Statistiques
  const [userCount, purchaseCount, revenue, pendingManuscripts] =
    await Promise.all([
      prisma.user.count(),
      prisma.purchase.count({ where: { status: "COMPLETED" } }),
      prisma.purchase.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
      prisma.manuscript.count({ where: { status: "PENDING" } }),
    ]);

  // Données pour graphiques
  const salesByMonth = await prisma.$queryRaw`
    SELECT 
      DATE_TRUNC('month', "createdAt") as month,
      COUNT(*) as count,
      SUM(amount) as revenue
    FROM "Purchase"
    WHERE status = 'COMPLETED'
    GROUP BY month
    ORDER BY month DESC
    LIMIT 12
  `;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Utilisateurs"
          value={userCount}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Achats"
          value={purchaseCount}
          icon={ShoppingBag}
          color="green"
        />
        <StatCard
          title="Revenus"
          value={`${((revenue._sum.amount || 0) / 100).toLocaleString("fr-FR")} FCFA`}
          icon={DollarSign}
          color="purple"
        />
        <StatCard
          title="Manuscrits en attente"
          value={pendingManuscripts}
          icon={FileText}
          color="orange"
        />
      </div>

      {/* Graphiques */}
      <div className="grid md:grid-cols-2 gap-6">
        <SalesChart data={salesByMonth} />
        {/* Autres graphiques */}
      </div>
    </div>
  );
}
```

### 11.3 Gestion des Livres

**Fichier** : `src/app/admin/books/page.tsx`

**Fonctionnalités** :
- Liste tous les livres (tableau)
- Recherche par titre/auteur
- Bouton "Ajouter un livre"
- Actions : Modifier, Supprimer

```tsx
import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/DataTable";
import { BookForm } from "@/components/admin/BookForm";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminBooksPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const search = searchParams.search || "";

  const books = await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
      ],
    },
    include: { collection: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Livres</h1>
        <Link
          href="/admin/books/new"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          <Plus className="w-5 h-5" />
          Ajouter un livre
        </Link>
      </div>

      <DataTable
        data={books}
        columns={[
          { key: "coverImage", label: "Couverture" },
          { key: "title", label: "Titre" },
          { key: "author", label: "Auteur" },
          { key: "collection.name", label: "Collection" },
          { key: "price", label: "Prix (FCFA)" },
          { key: "actions", label: "Actions" },
        ]}
      />
    </div>
  );
}
```

### 11.4 Formulaire Ajout/Modification Livre

**Fichier** : `src/app/admin/books/new/page.tsx`

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema } from "@/lib/validations/book";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewBookPage() {
  const router = useRouter();
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      // 1. Upload couverture
      const coverFormData = new FormData();
      coverFormData.append("file", coverFile!);
      coverFormData.append("type", "cover");

      const coverRes = await fetch("/api/upload", {
        method: "POST",
        body: coverFormData,
      });
      const { url: coverUrl } = await coverRes.json();

      // 2. Upload PDF
      const pdfFormData = new FormData();
      pdfFormData.append("file", pdfFile!);
      pdfFormData.append("type", "pdf");

      const pdfRes = await fetch("/api/upload", {
        method: "POST",
        body: pdfFormData,
      });
      const { url: pdfUrl } = await pdfRes.json();

      // 3. Créer livre
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          coverImage: coverUrl,
          pdfFile: pdfUrl,
        }),
      });

      if (!res.ok) throw new Error("Erreur création livre");

      toast.success("Livre créé avec succès !");
      router.push("/admin/books");
    } catch (error) {
      toast.error("Erreur lors de la création");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Nouveau Livre</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Champs du formulaire */}
        <div>
          <label className="block text-sm font-medium mb-2">Titre *</label>
          <input
            {...register("title")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Auteur *</label>
          <input
            {...register("author")}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            {...register("description")}
            rows={5}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Prix (FCFA) *
          </label>
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Couverture (image) *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Fichier PDF *
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !coverFile || !pdfFile}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark disabled:opacity-50"
        >
          {isSubmitting ? "Création en cours..." : "Créer le livre"}
        </button>
      </form>
    </div>
  );
}
```

### 11.5 Gestion des Collections (similaire)

**Pages** :
- `/admin/collections` : Liste
- `/admin/collections/new` : Créer
- `/admin/collections/[id]/edit` : Modifier

### 11.6 Gestion des Manuscrits

**Fichier** : `src/app/admin/manuscripts/page.tsx`

```tsx
import { prisma } from "@/lib/prisma";
import { ManuscriptTable } from "@/components/admin/ManuscriptTable";

export default async function AdminManuscriptsPage() {
  const manuscripts = await prisma.manuscript.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manuscrits soumis</h1>
      <ManuscriptTable manuscripts={manuscripts} />
    </div>
  );
}
```

**Actions** :
- Télécharger le PDF
- Changer le statut (PENDING → ACCEPTED / REJECTED)
- Ajouter des notes admin

---

## 12. LECTEUR DE LIVRES PDF

### 12.1 Page Lecteur

**Route** : `/reader/[bookId]` (protégée)

**Fichier** : `src/app/(protected)/reader/[bookId]/page.tsx`

```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { userHasPurchased, getSignedPdfUrl } from "@/lib/utils";
import { PdfReader } from "@/components/reader/PdfReader";

export default async function ReaderPage({
  params,
}: {
  params: { bookId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // Vérifier achat
  const hasPurchased = await userHasPurchased(session.user.id, params.bookId);
  if (!hasPurchased) {
    redirect("/library");
  }

  // Récupérer livre
  const book = await prisma.book.findUnique({
    where: { id: params.bookId },
  });

  if (!book) redirect("/library");

  // Générer URL signée
  const pdfUrl = await getSignedPdfUrl(params.bookId, session.user.id);

  // Récupérer progression
  const progress = await prisma.readingProgress.findUnique({
    where: {
      userId_bookId: {
        userId: session.user.id,
        bookId: params.bookId,
      },
    },
  });

  return (
    <PdfReader
      bookId={book.id}
      bookTitle={book.title}
      pdfUrl={pdfUrl}
      initialPage={progress?.currentPage || 1}
      totalPages={book.pageCount || 0}
    />
  );
}
```

### 12.2 Composant PdfReader

**Fichier** : `src/components/reader/PdfReader.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
} from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configurer worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfReaderProps {
  bookId: string;
  bookTitle: string;
  pdfUrl: string;
  initialPage: number;
  totalPages: number;
}

export function PdfReader({
  bookId,
  bookTitle,
  pdfUrl,
  initialPage,
  totalPages,
}: PdfReaderProps) {
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [numPages, setNumPages] = useState(totalPages);
  const [scale, setScale] = useState(1.2);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sauvegarder progression toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      saveProgress();
    }, 5000);

    return () => clearInterval(interval);
  }, [pageNumber]);

  const saveProgress = async () => {
    try {
      await fetch("/api/reading-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          currentPage: pageNumber,
          totalPages: numPages,
        }),
      });
    } catch (error) {
      console.error("Erreur sauvegarde progression:", error);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1));
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-neutral-light"
      }`}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl font-semibold">{bookTitle}</h1>
            <p className="text-sm text-gray-600">
              Page {pageNumber} sur {numPages}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Contrôles zoom */}
            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => setScale((s) => Math.min(2, s + 0.1))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            {/* Mode sombre */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Zone de lecture */}
      <div className="pt-20 pb-20 flex justify-center">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-4">
        <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto">
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber === 1}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <span className="text-sm font-medium">
            {pageNumber} / {numPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={pageNumber === numPages}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
}
```

### 12.3 API Route Progression

**Fichier** : `src/app/api/reading-progress/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const progressSchema = z.object({
  bookId: z.string(),
  currentPage: z.number().int().positive(),
  totalPages: z.number().int().positive(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();
    const { bookId, currentPage, totalPages } = progressSchema.parse(body);

    const progress = (currentPage / totalPages) * 100;

    await prisma.readingProgress.upsert({
      where: {
        userId_bookId: {
          userId: session.user.id,
          bookId,
        },
      },
      update: {
        currentPage,
        totalPages,
        progress,
        lastReadAt: new Date(),
      },
      create: {
        userId: session.user.id,
        bookId,
        currentPage,
        totalPages,
        progress,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur sauvegarde progression:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
```

---

## 13. RESPECT DES DESIGNS

### 13.1 Analyse des designs fournis

**IMPORTANT** : Avant de coder chaque page, l'agent DOIT :

1. **Examiner attentivement l'image de design fournie**
2. **Identifier tous les éléments visuels** :
   - Layout exact (grid, flexbox, positioning)
   - Couleurs utilisées (comparer avec la palette)
   - Typographie (tailles, poids, familles)
   - Espacements (padding, margin, gap)
   - Coins arrondis (border-radius)
   - Ombres (box-shadow)
   - États hover/focus
3. **Reproduire PIXEL PAR PIXEL** le design

### 13.2 Utilisation de Tailwind CSS

**Classes obligatoires à respecter** :

```css
/* Couleurs */
bg-primary → #2C5F4F
bg-secondary → #E8A87C
bg-accent → #D4A574
bg-neutral-light → #F8F6F2
text-neutral-text → #2D2D2D

/* Espacements (système 8px) */
p-2 → 8px padding
p-4 → 16px padding
p-6 → 24px padding
gap-4 → 16px gap
etc.

/* Coins arrondis */
rounded-lg → 12px
rounded-xl → 16px
rounded-2xl → 20px

/* Ombres */
shadow-sm → subtle
shadow-md → medium
shadow-xl → large
```

### 13.3 Composants UI réutilisables

**Créer des composants basés sur les designs** :

```tsx
// Button.tsx - Respecter les designs des boutons
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = "primary", size = "md", ...props }: ButtonProps) {
  const baseClasses = "font-medium rounded-lg transition-colors";
  
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-secondary-dark",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size])}
      {...props}
    />
  );
}
```

### 13.4 Responsive Design

**Breakpoints Tailwind** :
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Exemple** :
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 1 colonne mobile, 2 tablette, 4 desktop */}
</div>
```

### 13.5 Validation visuelle

**Checklist pour chaque page** :
- [ ] Layout correspond au design
- [ ] Couleurs exactement les mêmes
- [ ] Typographie respectée
- [ ] Espacements corrects
- [ ] Responsive fonctionne
- [ ] Hover states implémentés
- [ ] Images lazy loaded
- [ ] Accessibilité (alt texts, labels)

---

## 14. TESTS ET VALIDATIONS

### 14.1 Tests fonctionnels manuels

**Avant de considérer une fonctionnalité terminée, tester** :

1. **Authentification** :
   - [ ] Inscription fonctionne
   - [ ] Connexion fonctionne
   - [ ] Déconnexion fonctionne
   - [ ] Protection des routes fonctionne
   - [ ] Rôle admin vérifié

2. **Achats** :
   - [ ] Ajout au panier fonctionne
   - [ ] Checkout créé correctement
   - [ ] Paiement FedaPay fonctionne
   - [ ] Webhook reçu et traité
   - [ ] Achat visible dans bibliothèque
   - [ ] Email de confirmation envoyé

3. **Lecture** :
   - [ ] Livre accessible seulement si acheté
   - [ ] PDF s'affiche correctement
   - [ ] Navigation pages fonctionne
   - [ ] Zoom fonctionne
   - [ ] Progression sauvegardée
   - [ ] Reprise lecture fonctionne

4. **Admin** :
   - [ ] Ajout livre fonctionne
   - [ ] Upload fichiers fonctionne
   - [ ] Modification livre fonctionne
   - [ ] Suppression livre fonctionne
   - [ ] Statistiques correctes
   - [ ] Manuscrits listés
   - [ ] Changement statut manuscrit fonctionne

### 14.2 Validation des données

**Toujours valider avec Zod** :
- Côté client (formulaires)
- Côté serveur (API routes)

**Exemple complet** :

```typescript
// lib/validations/book.ts
import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Titre requis").max(200),
  author: z.string().min(1, "Auteur requis").max(100),
  description: z.string().min(50, "Description trop courte").max(5000),
  price: z.number().int().positive("Prix doit être positif").max(1000000),
  collectionId: z.string().optional(),
  pageCount: z.number().int().positive().optional(),
});

export type BookFormData = z.infer<typeof bookSchema>;
```

### 14.3 Gestion d'erreurs

**Pattern obligatoire** :

```typescript
try {
  // Code
} catch (error) {
  console.error("Erreur:", error);
  
  if (error instanceof z.ZodError) {
    // Erreur validation
    return { error: "Données invalides", details: error.errors };
  }
  
  if (error.code === "P2002") {
    // Erreur Prisma unique constraint
    return { error: "Cet élément existe déjà" };
  }
  
  // Erreur générique
  return { error: "Une erreur est survenue" };
}
```

### 14.4 Performance

**Optimisations obligatoires** :

1. **Images** :
   - Utiliser `next/image`
   - Lazy loading
   - Formats optimisés (WebP)

```tsx
import Image from "next/image";

<Image
  src={book.coverImage}
  alt={book.title}
  width={300}
  height={400}
  className="rounded-lg"
  loading="lazy"
/>
```

2. **Requêtes DB** :
   - Utiliser `include` plutôt que requêtes multiples
   - Pagination pour grandes listes
   - Index sur colonnes fréquemment requêtées

3. **Caching** :
   - Server Components par défaut (cached)
   - Revalidation avec `revalidatePath`

---

## 15. DÉPLOIEMENT

### 15.1 Préparation

**Vérifications avant déploiement** :

- [ ] `.env.local` contient TOUTES les variables
- [ ] Variables de production configurées (Supabase, FedaPay, etc.)
- [ ] Base de données production créée
- [ ] Migration Prisma appliquée en production
- [ ] Buckets Supabase Storage créés
- [ ] Webhook FedaPay configuré avec URL production
- [ ] Email FROM vérifié sur Resend

### 15.2 Déploiement Vercel (recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

**Configuration Vercel** :
- Ajouter toutes les variables d'environnement
- Configurer domaine personnalisé
- Activer HTTPS

### 15.3 Variables d'environnement production

```bash
# Production values
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
NEXTAUTH_SECRET="..." # NOUVEAU secret avec openssl
NEXTAUTH_URL="https://editiongerminale.com"
FEDAPAY_SECRET_KEY="sk_live_..." # LIVE KEY
FEDAPAY_PUBLIC_KEY="pk_live_..."
NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY="pk_live_..."
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@editiongerminale.com"
NEXT_PUBLIC_APP_URL="https://editiongerminale.com"
```

### 15.4 Post-déploiement

**Tests critiques** :
- [ ] Homepage charge
- [ ] Inscription fonctionne
- [ ] Connexion fonctionne
- [ ] Achat test fonctionne
- [ ] Email reçu
- [ ] Admin accessible
- [ ] Upload fichiers fonctionne

---

## 16. CHECKLIST FINALE

### 16.1 Fonctionnalités complètes

**Frontend Public** :
- [ ] Homepage avec hero + collections + livres
- [ ] Page liste collections
- [ ] Page détail collection
- [ ] Page détail livre
- [ ] Page soumission manuscrit
- [ ] Header avec navigation + panier
- [ ] Footer avec liens
- [ ] Responsive sur mobile/tablette/desktop

**Authentification** :
- [ ] Page inscription
- [ ] Page connexion
- [ ] Protection routes
- [ ] Rôles USER/ADMIN
- [ ] Déconnexion

**Achats** :
- [ ] Panier fonctionnel (Zustand)
- [ ] Checkout page
- [ ] Intégration FedaPay
- [ ] Webhook traitement
- [ ] Enregistrement achats en DB

**Bibliothèque** :
- [ ] Liste livres achetés
- [ ] Filtres et tri
- [ ] Progression lecture visible

**Lecteur** :
- [ ] Affichage PDF
- [ ] Navigation pages
- [ ] Contrôles zoom
- [ ] Mode sombre
- [ ] Sauvegarde progression

**Dashboard Admin** :
- [ ] Overview avec statistiques
- [ ] Gestion livres (CRUD)
- [ ] Gestion collections (CRUD)
- [ ] Liste manuscrits
- [ ] Changement statut manuscrits
- [ ] Liste utilisateurs
- [ ] Graphiques ventes

**Emails** :
- [ ] Email bienvenue
- [ ] Email confirmation achat
- [ ] Email soumission manuscrit

**Sécurité** :
- [ ] Mots de passe hashés
- [ ] JWT sessions
- [ ] API routes protégées
- [ ] Validation Zod partout
- [ ] RLS Supabase configuré
- [ ] Signed URLs pour PDFs

### 16.2 Qualité du code

- [ ] Aucun code mort
- [ ] Types TypeScript corrects
- [ ] Commentaires pour parties complexes
- [ ] Gestion d'erreurs partout
- [ ] Pas de console.log en production
- [ ] Fichiers bien organisés

### 16.3 Performance

- [ ] Images optimisées
- [ ] Lazy loading
- [ ] Server Components utilisés
- [ ] Requêtes DB optimisées
- [ ] Pagination implémentée

### 16.4 Design

- [ ] Couleurs de la palette respectées
- [ ] Typographie cohérente
- [ ] Espacements harmonieux
- [ ] Responsive parfait
- [ ] Hover states
- [ ] Loading states
- [ ] Empty states

---

## 📝 NOTES IMPORTANTES

### Pour l'agent IA :

1. **NE JAMAIS** inventer des fonctionnalités non mentionnées
2. **TOUJOURS** suivre ce document à la lettre
3. **TOUJOURS** valider les données avec Zod
4. **TOUJOURS** respecter les designs fournis
5. **TOUJOURS** tester avant de considérer terminé
6. En cas de doute, demander des clarifications
7. Documenter tout code complexe
8. Prioriser la sécurité et la qualité sur la vitesse

### Hiérarchie des priorités :

1. **Sécurité** : Aucun compromis
2. **Fonctionnalité** : Tout doit marcher
3. **Design** : Respect pixel-perfect
4. **Performance** : Optimisations
5. **Code quality** : Maintenabilité

---

## 🎯 OBJECTIF FINAL

Livrer une plateforme de maison d'édition **professionnelle, sécurisée, performante et fidèle aux designs**, prête pour la production, sans bugs, sans code mort, et respectant toutes les bonnes pratiques.

---

**Fin du document de pilotage**

**Version** : 1.0  
**Dernière mise à jour** : 30 Décembre 2025
