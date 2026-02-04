# 📘 DOCUMENT DE PILOTAGE TECHNIQUE KIRO -
## FONDATIONS & ARCHITECTURE

**Version :** 1.0 - Bible Technique Complète  
**Date :** 04 Février 2026  
**IDE Cible :** Kiro avec Claude Sonnet 4.5  
**Langue de travail :** Français uniquement  
**Objectif Absolu :** Zéro hallucination, zéro erreur, conformité totale aux standards 2026

---

## ⚠️ AVERTISSEMENT CRITIQUE À L'IA CLAUDE SONNET 4.5

**VOUS ÊTES CLAUDE SONNET 4.5 INTÉGRÉ DANS L'IDE KIRO**

Ce document est votre bible technique absolue. Chaque instruction est **OBLIGATOIRE**, **NON-NÉGOCIABLE** et **DOIT** être suivie à la lettre sans aucune exception.

### 🔴 RÈGLE D'OR ABSOLUE - MÉMOIRE ET CONTEXTE

**VOUS DEVEZ TOUJOURS :**

1. ✅ **MÉMORISER** chaque action que vous effectuez depuis le début du projet jusqu'à la fin
2. ✅ **GARDER EN CONTEXTE** tous les fichiers créés, modifiés ou supprimés
3. ✅ **VOUS RAPPELER** de toutes les décisions architecturales prises
4. ✅ **MAINTENIR** une cohérence totale entre toutes vos interventions
5. ✅ **DOCUMENTER** mentalement chaque étape pour référence future

**INTERDIT ABSOLU :**
- ❌ Oublier ce qui a été fait précédemment
- ❌ Recréer du code déjà existant
- ❌ Contredire une décision prise antérieurement
- ❌ Perdre le fil de la conversation ou du projet

### 🔴 RÈGLE D'OR - CONSULTATION DE DOCUMENTATION OBLIGATOIRE

**AVANT d'écrire UNE SEULE LIGNE DE CODE, vous DEVEZ IMPÉRATIVEMENT :**

1. ✅ **CONSULTER** la documentation officielle de la technologie concernée via les liens fournis
2. ✅ **VÉRIFIER** que chaque API, méthode, fonction ou propriété existe réellement dans la version exacte spécifiée
3. ✅ **CONFIRMER** la syntaxe exacte avec des exemples concrets tirés de la documentation officielle
4. ✅ **VALIDER** que votre approche respecte les meilleures pratiques reconnues en 2026
5. ✅ **S'ASSURER** que le code n'utilise aucune API dépréciée ou obsolète

**SI VOUS AVEZ LE MOINDRE DOUTE (même 0.1% d'incertitude), vous DEVEZ :**
- ❌ NE PAS générer de code basé sur des suppositions ou des approximations
- ✅ DEMANDER explicitement à l'utilisateur de vérifier dans la documentation officielle
- ✅ PROPOSER plusieurs alternatives documentées avec leurs sources exactes
- ✅ SIGNALER clairement et honnêtement votre incertitude à l'utilisateur
- ✅ INDIQUER les sections précises de documentation à consulter

### 🚫 INTERDICTIONS ABSOLUES - ZÉRO TOLÉRANCE

**Vous NE DEVEZ JAMAIS sous aucun prétexte :**

❌ **Inventer** des API, méthodes ou propriétés qui n'existent pas  
❌ **Supposer** qu'une fonctionnalité existe sans vérification dans la documentation  
❌ **Utiliser** du code obsolète, déprécié ou non maintenu  
❌ **Ignorer** les erreurs TypeScript ou les warnings du compilateur  
❌ **Créer** du code non-typé ou avec des types `any` sans justification absolue  
❌ **Dupliquer** du code existant au lieu de créer des abstractions réutilisables  
❌ **Ignorer** les règles de sécurité (RLS Supabase, authentification, validation)  
❌ **Générer** du code sans commentaires explicatifs en français  
❌ **Oublier** de gérer les cas d'erreur et les états de chargement  
❌ **Créer** des fichiers ou des composants sans structure logique claire  
❌ **Omettre** la validation des données côté client ET côté serveur  
❌ **Négliger** l'accessibilité (a11y) et l'expérience utilisateur  
❌ **Produire** du code qui ne respecte pas les standards ESLint et Prettier configurés

### 📋 WORKFLOW OBLIGATOIRE AVANT CHAQUE TÂCHE

**ÉTAPE 1 : ANALYSE DE LA DEMANDE**

Lorsque l'utilisateur vous donne une tâche, vous devez d'abord :

1. **Lire attentivement** la demande complète
2. **Identifier** tous les composants, fichiers et technologies impliqués
3. **Lister mentalement** les étapes nécessaires pour accomplir la tâche
4. **Vérifier** dans votre mémoire si des éléments similaires existent déjà

**ÉTAPE 2 : RÉCAPITULATIF À L'UTILISATEUR**

Avant de commencer à coder, vous devez **TOUJOURS** présenter un récapitulatif structuré :

```
📋 RÉCAPITULATIF DE LA TÂCHE

**Demande :** [Résumé en une phrase claire]

**Fichiers à créer :**
- [Chemin/fichier1] - [Description]
- [Chemin/fichier2] - [Description]

**Fichiers à modifier :**
- [Chemin/fichier3] - [Ce qui sera modifié]

**Technologies utilisées :**
- [Tech1] - [Raison]
- [Tech2] - [Raison]

**Étapes d'implémentation :**
1. [Étape 1 détaillée]
2. [Étape 2 détaillée]
3. [Etc.]

**Documentations à consulter :**
- [Tech1] : [Lien exact de la section]
- [Tech2] : [Lien exact de la section]

**Points de sécurité :**
- [Point 1]
- [Point 2]

⚠️ **Attendez mon approbation avant de commencer**
```

**ÉTAPE 3 : ATTENDRE L'APPROBATION**

Vous devez **IMPÉRATIVEMENT** attendre que l'utilisateur réponde avec une confirmation explicite (par exemple : "OK", "Vas-y", "Approuvé", "C'est bon") avant de commencer à générer le moindre code.

**INTERDIT :**
- ❌ Commencer à coder sans approbation explicite
- ❌ Supposer que le silence signifie approbation
- ❌ Modifier le plan sans en informer l'utilisateur

**ÉTAPE 4 : DÉVELOPPEMENT AVEC MÉMOIRE**

Une fois l'approbation reçue :

1. **Générer** le code étape par étape
2. **Commenter** chaque section complexe en français
3. **Tester mentalement** la logique du code
4. **Vérifier** la cohérence avec le code existant
5. **MÉMORISER** ce que vous venez de créer

**ÉTAPE 5 : VALIDATION POST-DÉVELOPPEMENT**

Après avoir terminé le développement, vous devez **AUTOMATIQUEMENT** :

1. **Lancer les vérifications** :
   ```bash
   # TypeScript check
   npx tsc --noEmit
   
   # ESLint check
   npm run lint
   
   # Next.js build check (pour vérifier qu'il n'y a pas d'erreurs)
   npm run build
   ```

2. **Présenter un rapport de validation** :
   ```
   ✅ RAPPORT DE VALIDATION
   
   **Fichiers créés :** [X fichiers]
   **Fichiers modifiés :** [Y fichiers]
   
   **Tests effectués :**
   - TypeScript : ✅ Aucune erreur
   - ESLint : ✅ Aucune erreur
   - Build : ✅ Succès
   
   **Checklist sécurité :**
   - [✅] Validation Zod implémentée
   - [✅] Authentification vérifiée
   - [✅] RLS Supabase respecté
   - [✅] Gestion d'erreurs complète
   
   **Prêt pour les tests manuels**
   ```

**ÉTAPE 6 : DEMANDER VALIDATION UTILISATEUR**

Toujours terminer par :
```
✅ Développement terminé.
📋 Veuillez tester et me faire part de votre retour.
🔄 Besoin d'ajustements ou de modifications ?
```

### 🎯 HIÉRARCHIE DES PRIORITÉS - ORDRE ABSOLU

Dans toutes vos décisions et actions, respectez cet ordre de priorité strict :

**1. SÉCURITÉ** (Priorité maximale - Aucun compromis possible)
- Authentification robuste et sécurisée
- Validation des données entrantes (client ET serveur)
- Protection contre les injections SQL, XSS, CSRF
- Row Level Security (RLS) sur toutes les tables Supabase
- Gestion sécurisée des secrets et clés API
- HTTPS obligatoire en production
- Signed URLs pour les fichiers sensibles

**2. FONCTIONNALITÉ** (Le code doit marcher parfaitement)
- Toutes les fonctionnalités demandées doivent être opérationnelles
- Gestion complète des cas d'erreur
- États de chargement appropriés
- Feedback utilisateur clair et immédiat

**3. QUALITÉ DU CODE** (Maintenabilité et évolutivité)
- TypeScript strict avec typage exhaustif
- Code propre, lisible et bien organisé
- Commentaires en français pour la logique complexe
- Respect des principes SOLID et DRY
- Tests automatisés quand pertinent

**4. DESIGN & UX/UI** (Respect pixel-perfect des maquettes)
- Fidélité totale aux designs fournis
- Responsive parfait (mobile, tablette, desktop)
- Accessibilité (WCAG 2.1 niveau AA minimum)
- Animations fluides et performantes
- États visuels clairs (hover, active, disabled, loading)

**5. PERFORMANCE** (Optimisation et scalabilité)
- Temps de chargement < 3 secondes
- Support de 30 000+ utilisateurs simultanés
- Optimisation des images (WebP, lazy loading)
- Code splitting et lazy loading des composants
- Caching intelligent des données

---

## 📚 DOCUMENTATIONS OFFICIELLES - RÉFÉRENCES OBLIGATOIRES

### 🎯 Hiérarchie de consultation documentaire

Quand vous devez implémenter une fonctionnalité ou résoudre un problème, vous devez consulter les documentations dans cet ordre strict :

1️⃣ **Documentation principale** de la technologie concernée (priorité absolue)  
2️⃣ **Documentation des dépendances** directement liées  
3️⃣ **Exemples officiels** et guides de démarrage  
4️⃣ **Guides de migration** pour éviter l'utilisation de code obsolète  
5️⃣ **API Reference** pour les détails techniques précis

---

### 📘 Next.js 15 (App Router) - Framework Principal

**Documentation principale :**
- Site officiel complet : https://nextjs.org/docs
- App Router (architecture moderne) : https://nextjs.org/docs/app
- API Reference complète : https://nextjs.org/docs/app/api-reference

**Sections critiques à consulter AVANT de coder :**

**Pour les composants et le rendu :**
- Server Components (par défaut) : https://nextjs.org/docs/app/building-your-application/rendering/server-components
- Client Components ('use client') : https://nextjs.org/docs/app/building-your-application/rendering/client-components
- Composition Patterns : https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
- Streaming et Suspense : https://nextjs.org/docs/app/building-your-application/rendering/streaming

**Pour le routing et la navigation :**
- Routing Fundamentals : https://nextjs.org/docs/app/building-your-application/routing
- Pages et Layouts : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
- Dynamic Routes : https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
- Route Groups : https://nextjs.org/docs/app/building-your-application/routing/route-groups
- Parallel Routes : https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
- Intercepting Routes : https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
- Loading UI : https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
- Error Handling : https://nextjs.org/docs/app/building-your-application/routing/error-handling

**Pour la récupération et mutation des données :**
- Data Fetching Overview : https://nextjs.org/docs/app/building-your-application/data-fetching
- Server Actions & Mutations : https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
- Fetching Data : https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
- Caching Mechanism : https://nextjs.org/docs/app/building-your-application/caching
- Revalidation : https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration

**Pour les images, polices et optimisations :**
- Image Optimization : https://nextjs.org/docs/app/building-your-application/optimizing/images
- Image Component API : https://nextjs.org/docs/app/api-reference/components/image
- Font Optimization : https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- next/font API : https://nextjs.org/docs/app/api-reference/components/font
- Scripts Optimization : https://nextjs.org/docs/app/building-your-application/optimizing/scripts
- Lazy Loading : https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading

**Pour le SEO et les métadonnées :**
- Metadata API : https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- generateMetadata : https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Static Metadata : https://nextjs.org/docs/app/api-reference/file-conventions/metadata
- Open Graph & Twitter Cards : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- Sitemap : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Robots.txt : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

**Pour la configuration et le déploiement :**
- next.config.js Reference : https://nextjs.org/docs/app/api-reference/next-config-js
- Environment Variables : https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- TypeScript : https://nextjs.org/docs/app/building-your-application/configuring/typescript
- ESLint : https://nextjs.org/docs/app/building-your-application/configuring/eslint

**⚠️ ATTENTION CRITIQUE : Changements Next.js 15**
- Migration Guide Next.js 14 → 15 : https://nextjs.org/docs/app/building-your-application/upgrading/version-15
- Breaking Changes : Lire attentivement avant toute implémentation

---

### 📘 TypeScript 5.x - Langage de typage strict

**Documentation principale :**
- Site officiel TypeScript : https://www.typescriptlang.org/docs/
- Handbook complet : https://www.typescriptlang.org/docs/handbook/intro.html
- TypeScript 5.0+ Nouveautés : https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
- TypeScript 5.1+ : https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-1.html
- TypeScript 5.2+ : https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html

**Sections critiques pour le typage strict :**

**Types de base et fondamentaux :**
- Everyday Types : https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- Narrowing : https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- More on Functions : https://www.typescriptlang.org/docs/handbook/2/functions.html
- Object Types : https://www.typescriptlang.org/docs/handbook/2/objects.html

**Types avancés et manipulation :**
- Type Manipulation : https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
- Generics : https://www.typescriptlang.org/docs/handbook/2/generics.html
- Typeof Type Operator : https://www.typescriptlang.org/docs/handbook/2/typeof-types.html
- Indexed Access Types : https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
- Conditional Types : https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
- Mapped Types : https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
- Template Literal Types : https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html

**Pour React et composants :**
- React TypeScript Cheatsheet : https://react-typescript-cheatsheet.netlify.app/
- Typing Components : https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example
- Hooks Typing : https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks

**Configuration TypeScript :**
- TSConfig Reference complète : https://www.typescriptlang.org/tsconfig
- Compiler Options : https://www.typescriptlang.org/docs/handbook/compiler-options.html
- Project References : https://www.typescriptlang.org/docs/handbook/project-references.html

**Configuration stricte recommandée (tsconfig.json) :**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "allowUnreachableCode": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true
  }
}
```

---

### 📘 React 19 - Bibliothèque UI

**Documentation principale :**
- Site officiel React : https://react.dev/
- Learn React (Guide complet) : https://react.dev/learn
- API Reference : https://react.dev/reference/react

**Hooks fondamentaux (à maîtriser parfaitement) :**
- useState : https://react.dev/reference/react/useState
- useEffect : https://react.dev/reference/react/useEffect
- useContext : https://react.dev/reference/react/useContext
- useReducer : https://react.dev/reference/react/useReducer
- useRef : https://react.dev/reference/react/useRef
- useMemo : https://react.dev/reference/react/useMemo
- useCallback : https://react.dev/reference/react/useCallback

**Hooks avancés :**
- useTransition : https://react.dev/reference/react/useTransition
- useDeferredValue : https://react.dev/reference/react/useDeferredValue
- useId : https://react.dev/reference/react/useId
- useOptimistic : https://react.dev/reference/react/useOptimistic

**Server Components (avec Next.js) :**
- React Server Components : https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components
- RSC from Scratch : https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023

**Bonnes pratiques React :**
- Thinking in React : https://react.dev/learn/thinking-in-react
- Managing State : https://react.dev/learn/managing-state
- Escape Hatches : https://react.dev/learn/escape-hatches

---

### 📘 Supabase - Backend as a Service

**Documentation principale :**
- Site officiel Supabase : https://supabase.com/docs
- JavaScript Client Library : https://supabase.com/docs/reference/javascript/introduction
- Getting Started : https://supabase.com/docs/guides/getting-started

**SECTIONS ULTRA-CRITIQUES - À CONSULTER SYSTÉMATIQUEMENT :**

**Authentication (Authentification des utilisateurs) :**
- Auth Overview : https://supabase.com/docs/guides/auth
- Auth with Next.js (ESSENTIEL) : https://supabase.com/docs/guides/auth/server-side/nextjs
- Email Auth : https://supabase.com/docs/guides/auth/auth-email
- Social Auth (Google, GitHub, etc.) : https://supabase.com/docs/guides/auth/social-login
- Auth Helpers Next.js : https://supabase.com/docs/guides/auth/auth-helpers/nextjs
- Managing Users : https://supabase.com/docs/guides/auth/managing-user-data
- Session Management : https://supabase.com/docs/guides/auth/sessions

**Database (Base de données PostgreSQL) :**
- Database Overview : https://supabase.com/docs/guides/database/overview
- Tables and Data : https://supabase.com/docs/guides/database/tables
- PostgreSQL Functions : https://supabase.com/docs/guides/database/functions
- Database Webhooks : https://supabase.com/docs/guides/database/webhooks
- Indexes : https://supabase.com/docs/guides/database/indexes
- Foreign Keys : https://supabase.com/docs/guides/database/foreign-keys

**Row Level Security (RLS) - SÉCURITÉ MAXIMALE :**
- RLS Overview : https://supabase.com/docs/guides/auth/row-level-security
- RLS Policies : https://supabase.com/docs/guides/database/postgres/row-level-security
- Policy Examples : https://supabase.com/docs/guides/auth/row-level-security#policy-examples
- **⚠️ RÈGLE ABSOLUE : Toute table DOIT avoir RLS activé et des politiques définies**

**Storage (Stockage de fichiers) :**
- Storage Overview : https://supabase.com/docs/guides/storage
- Upload Files : https://supabase.com/docs/guides/storage/uploads
- Download Files : https://supabase.com/docs/guides/storage/downloads
- Storage Policies (RLS) : https://supabase.com/docs/guides/storage/security/access-control
- Image Transformations : https://supabase.com/docs/guides/storage/image-transformations
- Signed URLs : https://supabase.com/docs/guides/storage/uploads/signed-urls

**JavaScript Client API (CRUD Operations) :**
- Select (Lecture) : https://supabase.com/docs/reference/javascript/select
- Insert (Création) : https://supabase.com/docs/reference/javascript/insert
- Update (Modification) : https://supabase.com/docs/reference/javascript/update
- Upsert (Insert ou Update) : https://supabase.com/docs/reference/javascript/upsert
- Delete (Suppression) : https://supabase.com/docs/reference/javascript/delete
- Using Filters : https://supabase.com/docs/reference/javascript/using-filters
- Using Modifiers : https://supabase.com/docs/reference/javascript/using-modifiers

**Realtime (Temps réel) :**
- Realtime Overview : https://supabase.com/docs/guides/realtime
- Realtime Subscriptions : https://supabase.com/docs/reference/javascript/subscribe
- Broadcast : https://supabase.com/docs/guides/realtime/broadcast
- Presence : https://supabase.com/docs/guides/realtime/presence

**Edge Functions (Serverless) :**
- Edge Functions Overview : https://supabase.com/docs/guides/functions
- Deploy Functions : https://supabase.com/docs/guides/functions/deploy

---

### 📘 Tailwind CSS 4.x - Framework CSS Utility-First

**Documentation principale :**
- Site officiel Tailwind : https://tailwindcss.com/docs
- Installation : https://tailwindcss.com/docs/installation
- Installation with Next.js : https://tailwindcss.com/docs/guides/nextjs

**Sections critiques pour le design :**

**Concepts fondamentaux :**
- Utility-First Fundamentals : https://tailwindcss.com/docs/utility-first
- Responsive Design : https://tailwindcss.com/docs/responsive-design
- Dark Mode : https://tailwindcss.com/docs/dark-mode
- Reusing Styles : https://tailwindcss.com/docs/reusing-styles
- Adding Custom Styles : https://tailwindcss.com/docs/adding-custom-styles

**Configuration et customisation :**
- Configuration : https://tailwindcss.com/docs/configuration
- Theme : https://tailwindcss.com/docs/theme
- Colors : https://tailwindcss.com/docs/customizing-colors
- Spacing : https://tailwindcss.com/docs/customizing-spacing
- Screens (Breakpoints) : https://tailwindcss.com/docs/screens

**Layout et positionnement :**
- Flexbox : https://tailwindcss.com/docs/flex
- Grid : https://tailwindcss.com/docs/grid-template-columns
- Position : https://tailwindcss.com/docs/position
- Display : https://tailwindcss.com/docs/display

**Typographie :**
- Font Family : https://tailwindcss.com/docs/font-family
- Font Size : https://tailwindcss.com/docs/font-size
- Font Weight : https://tailwindcss.com/docs/font-weight
- Text Color : https://tailwindcss.com/docs/text-color

---

### 📘 React Hook Form + Zod - Validation de formulaires

**React Hook Form :**
- Documentation principale : https://react-hook-form.com/get-started
- API Reference : https://react-hook-form.com/docs
- useForm Hook : https://react-hook-form.com/docs/useform
- Controller : https://react-hook-form.com/docs/usecontroller/controller
- Form State : https://react-hook-form.com/docs/useform/formstate
- Error Handling : https://react-hook-form.com/docs/useform/seterror

**Zod (Schema Validation) :**
- Documentation Zod : https://zod.dev/
- Primitives : https://zod.dev/?id=primitives
- Objects : https://zod.dev/?id=objects
- Arrays : https://zod.dev/?id=arrays
- Unions : https://zod.dev/?id=unions
- Refinements (Custom Validation) : https://zod.dev/?id=refine
- Transform : https://zod.dev/?id=transform

**Intégration React Hook Form + Zod :**
- Resolvers : https://github.com/react-hook-form/resolvers#zod
- Zod Resolver : https://react-hook-form.com/docs/useform#resolver

---

### 📘 Zustand - Gestion d'état globale

**Documentation :**
- GitHub Repository : https://github.com/pmndrs/zustand
- Documentation officielle : https://docs.pmnd.rs/zustand/getting-started/introduction
- Comparison with Redux : https://docs.pmnd.rs/zustand/getting-started/comparison

**Guides essentiels :**
- Persist Middleware : https://docs.pmnd.rs/zustand/integrations/persisting-store-data
- TypeScript Guide : https://docs.pmnd.rs/zustand/guides/typescript
- Auto Generate Selectors : https://docs.pmnd.rs/zustand/guides/auto-generating-selectors
- Immutability : https://docs.pmnd.rs/zustand/guides/immutable-state-and-merging

---

### 📘 TanStack Query (React Query) - Data Fetching & Caching

**Documentation principale :**
- Site officiel : https://tanstack.com/query/latest
- Quick Start : https://tanstack.com/query/latest/docs/framework/react/quick-start
- Overview : https://tanstack.com/query/latest/docs/framework/react/overview

**Guides critiques :**
- useQuery : https://tanstack.com/query/latest/docs/framework/react/guides/queries
- useMutation : https://tanstack.com/query/latest/docs/framework/react/guides/mutations
- Query Invalidation : https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation
- Optimistic Updates : https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
- Caching : https://tanstack.com/query/latest/docs/framework/react/guides/caching
- Pagination : https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries
- Infinite Queries : https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries

---

### 📘 Radix UI - Composants accessibles

**Documentation :**
- Site officiel : https://www.radix-ui.com/primitives
- Overview : https://www.radix-ui.com/primitives/docs/overview/introduction
- Installation : https://www.radix-ui.com/primitives/docs/overview/getting-started

**Composants essentiels :**
- Dialog : https://www.radix-ui.com/primitives/docs/components/dialog
- Dropdown Menu : https://www.radix-ui.com/primitives/docs/components/dropdown-menu
- Select : https://www.radix-ui.com/primitives/docs/components/select
- Popover : https://www.radix-ui.com/primitives/docs/components/popover
- Toast : https://www.radix-ui.com/primitives/docs/components/toast
- Tabs : https://www.radix-ui.com/primitives/docs/components/tabs

---

### 📘 Vercel - Déploiement et hosting

**Documentation :**
- Site officiel : https://vercel.com/docs
- Next.js on Vercel : https://vercel.com/docs/frameworks/nextjs
- Deployments : https://vercel.com/docs/deployments/overview
- Environment Variables : https://vercel.com/docs/projects/environment-variables
- Build Configuration : https://vercel.com/docs/deployments/configure-a-build

---

## 🏗️ ARCHITECTURE GLOBALE DU PROJET

### Vision d'ensemble

Le projet utilise une architecture moderne en trois couches principales qui garantissent la séparation des responsabilités, la maintenabilité et la scalabilité du code.

```
┌──────────────────────────────────────────────────────────────────┐
│                    COUCHE PRÉSENTATION (Frontend)                 │
│                         Next.js 15 App Router                     │
│  ┌────────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │  Pages publiques   │  │  Pages protégées │  │  Dashboard   │ │
│  │  (Server Comp.)    │  │  (Auth Required) │  │  Admin       │ │
│  └────────────────────┘  └──────────────────┘  └──────────────┘ │
└───────────────────────────────┬──────────────────────────────────┘
                                │
                                ↓
┌──────────────────────────────────────────────────────────────────┐
│                   COUCHE LOGIQUE MÉTIER (API)                     │
│                    Next.js API Routes & Server Actions            │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌───────────┐ │
│  │   /auth    │  │  /data     │  │  /payment  │  │  /upload  │ │
│  │ (NextAuth) │  │  (CRUD)    │  │ (FedaPay)  │  │  (Files)  │ │
│  └────────────┘  └────────────┘  └────────────┘  └───────────┘ │
└───────────────────────────────┬──────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ↓               ↓               ↓
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│    Supabase      │  │     FedaPay      │  │     Resend       │
│  (Database +     │  │   (Payments)     │  │    (Emails)      │
│   Auth + Storage)│  │   Webhook        │  │  Transactional   │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### Principes architecturaux fondamentaux

**Separation of Concerns (Séparation des responsabilités) :**
Chaque couche a une responsabilité unique et bien définie. La présentation ne gère que l'affichage et les interactions utilisateur. La logique métier est dans les API routes et server actions. Les données sont gérées par Supabase.

**Server Components par défaut :**
Dans Next.js 15, tous les composants sont Server Components par défaut, ce qui améliore drastiquement les performances. Utilisez Client Components uniquement quand vous avez besoin d'interactivité (événements, hooks, state management).

**API Routes sécurisées :**
Chaque API route doit valider les données entrantes avec Zod, vérifier l'authentification de l'utilisateur, et appliquer les règles métier avant toute opération sur la base de données.

**Gestion d'état minimale :**
Privilégiez les Server Components qui n'ont pas besoin de state. Pour le state global nécessaire (panier, préférences utilisateur), utilisez Zustand avec persistence.

---

## 📁 STRUCTURE DU PROJET - ORGANISATION COMPLÈTE

### Arborescence standard complète

```
projet/
├── .next/                          # Build Next.js (généré automatiquement)
├── .vercel/                        # Configuration Vercel (généré)
├── node_modules/                   # Dépendances npm (généré)
├── public/                         # Assets statiques publics
│   ├── images/                     # Images du site
│   │   ├── logo.svg               # Logo principal
│   │   ├── logo-white.svg         # Logo version blanche
│   │   ├── favicon.ico            # Favicon
│   │   ├── hero/                  # Images de hero sections
│   │   ├── features/              # Images de fonctionnalités
│   │   └── placeholders/          # Placeholders pour contenus
│   ├── fonts/                     # Polices personnalisées (si nécessaire)
│   ├── videos/                    # Vidéos (si nécessaire)
│   └── manifest.json              # PWA manifest (si PWA)
│
├── prisma/                        # Configuration Prisma (si utilisé)
│   ├── schema.prisma              # Schéma de base de données
│   └── seed.ts                    # Script de seed pour données de test
│
├── src/                           # Code source principal
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # Route group pour authentification
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── reset-password/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (public)/              # Route group pour pages publiques
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── collections/
│   │   │   │   ├── page.tsx       # Liste des collections
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx   # Détail collection
│   │   │   ├── books/             # ou products/ ou vehicles/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── submit-manuscript/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (protected)/           # Route group pour pages protégées
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx       # Dashboard utilisateur
│   │   │   ├── library/
│   │   │   │   └── page.tsx       # Bibliothèque utilisateur
│   │   │   ├── reader/
│   │   │   │   └── [bookId]/
│   │   │   │       └── page.tsx   # Lecteur PDF
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/                 # Dashboard administrateur
│   │   │   ├── layout.tsx         # Layout avec sidebar admin
│   │   │   ├── page.tsx           # Overview/Dashboard
│   │   │   ├── books/             # Gestion livres (ou products)
│   │   │   │   ├── page.tsx       # Liste
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   ├── collections/
│   │   │   │   └── (même structure)
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   ├── manuscripts/
│   │   │   │   └── page.tsx
│   │   │   ├── orders/
│   │   │   │   └── page.tsx
│   │   │   └── analytics/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/                   # API Routes
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts   # NextAuth configuration
│   │   │   ├── books/             # CRUD livres
│   │   │   │   ├── route.ts       # GET (list), POST (create)
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts   # GET, PUT, DELETE
│   │   │   ├── collections/
│   │   │   │   └── (même structure)
│   │   │   ├── payment/
│   │   │   │   ├── create-checkout/
│   │   │   │   │   └── route.ts
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts   # FedaPay webhook
│   │   │   ├── manuscripts/
│   │   │   │   └── route.ts
│   │   │   ├── upload/
│   │   │   │   └── route.ts       # Upload fichiers
│   │   │   └── admin/
│   │   │       └── stats/
│   │   │           └── route.ts
│   │   │
│   │   ├── layout.tsx             # Layout racine global
│   │   ├── globals.css            # Styles globaux Tailwind
│   │   ├── loading.tsx            # UI de chargement global
│   │   ├── error.tsx              # Gestion erreurs globale
│   │   └── not-found.tsx          # Page 404
│   │
│   ├── components/                # Composants réutilisables
│   │   ├── ui/                    # Composants UI de base (Radix + custom)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── table.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   └── skeleton.tsx
│   │   │
│   │   ├── layout/                # Composants de layout
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx        # Pour admin
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── book/                  # Composants spécifiques livres
│   │   │   ├── BookCard.tsx
│   │   │   ├── BookGrid.tsx
│   │   │   └── BookDetail.tsx
│   │   │
│   │   ├── collection/
│   │   │   ├── CollectionCard.tsx
│   │   │   └── CollectionGrid.tsx
│   │   │
│   │   ├── cart/
│   │   │   ├── CartButton.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── CartItem.tsx
│   │   │
│   │   ├── reader/
│   │   │   ├── PdfViewer.tsx
│   │   │   └── ReaderControls.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── StatCard.tsx
│   │   │   ├── DataTable.tsx
│   │   │   └── UploadZone.tsx
│   │   │
│   │   └── forms/
│   │       ├── LoginForm.tsx
│   │       ├── RegisterForm.tsx
│   │       └── BookForm.tsx
│   │
│   ├── lib/                       # Utilitaires et configurations
│   │   ├── supabase/
│   │   │   ├── client.ts          # Client Supabase côté client
│   │   │   ├── server.ts          # Client Supabase côté serveur
│   │   │   └── middleware.ts      # Middleware auth Supabase
│   │   │
│   │   ├── auth/
│   │   │   └── nextauth.ts        # Configuration NextAuth
│   │   │
│   │   ├── payment/
│   │   │   └── fedapay.ts         # Configuration FedaPay
│   │   │
│   │   ├── email/
│   │   │   ├── resend.ts          # Client Resend
│   │   │   └── templates/         # Templates emails
│   │   │       ├── welcome.tsx
│   │   │       └── purchase-confirmation.tsx
│   │   │
│   │   ├── validations/           # Schémas Zod
│   │   │   ├── auth.ts
│   │   │   ├── book.ts
│   │   │   ├── collection.ts
│   │   │   └── manuscript.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── cn.ts              # Utilitaire className (clsx + twMerge)
│   │   │   ├── format.ts          # Formatage dates, prix, etc.
│   │   │   └── constants.ts       # Constantes globales
│   │   │
│   │   └── hooks/                 # Custom hooks
│   │       ├── use-cart.ts
│   │       ├── use-auth.ts
│   │       └── use-books.ts
│   │
│   ├── store/                     # Zustand stores
│   │   ├── cart-store.ts
│   │   └── user-preferences-store.ts
│   │
│   └── types/                     # Types TypeScript globaux
│       ├── database.ts            # Types générés depuis Supabase
│       ├── api.ts                 # Types pour API
│       ├── book.ts
│       ├── collection.ts
│       └── user.ts
│
├── .env.local                     # Variables d'environnement (NE PAS COMMIT)
├── .env.example                   # Exemple de variables d'env (à commit)
├── .eslintrc.json                 # Configuration ESLint
├── .gitignore                     # Fichiers ignorés par Git
├── next.config.js                 # Configuration Next.js
├── package.json                   # Dépendances npm
├── pnpm-lock.yaml                 # Lock file (ou package-lock.json)
├── postcss.config.js              # Configuration PostCSS
├── tailwind.config.ts             # Configuration Tailwind CSS
├── tsconfig.json                  # Configuration TypeScript
└── README.md                      # Documentation du projet
```

### Conventions de nommage strictes

**Fichiers et dossiers :**
- Route files : `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- Components : PascalCase → `BookCard.tsx`, `UserProfile.tsx`
- Utilities : camelCase → `formatPrice.ts`, `validateEmail.ts`
- Types : kebab-case → `database.ts`, `api.ts`
- Constants : SCREAMING_SNAKE_CASE dans le fichier, camelCase pour le nom du fichier

**Composants React :**
- Toujours PascalCase pour le nom du composant
- Toujours nommer les exports : `export function BookCard() {}`
- Jamais de default export sauf pour les pages Next.js

**Variables et fonctions :**
- camelCase : `const userId = '...'`
- Boolean variables : préfixer avec `is`, `has`, `should` → `isLoading`, `hasAccess`, `shouldShow`
- Handlers : préfixer avec `handle` → `handleClick`, `handleSubmit`

---

## 🔧 STACK TECHNOLOGIQUE COMPLÈTE

### Technologies obligatoires

| Catégorie | Technologie | Version | Documentation | Justification |
|-----------|------------|---------|---------------|---------------|
| **Framework** | Next.js | 15.x (App Router) | [Docs](https://nextjs.org/docs) | SSR, SEO, Performance, DX |
| **Langage** | TypeScript | 5.x | [Docs](https://www.typescriptlang.org/docs/) | Type safety, DX, Moins de bugs |
| **Styling** | Tailwind CSS | 4.x | [Docs](https://tailwindcss.com/docs) | Utility-first, Rapidité, Cohérence |
| **Base de données** | Supabase | Latest | [Docs](https://supabase.com/docs) | PostgreSQL + Auth + Storage + Realtime |
| **ORM** | Prisma | 6.x | [Docs](https://www.prisma.io/docs) | Type-safe queries, Migrations (optionnel) |
| **Auth** | NextAuth.js | 5.x | [Docs](https://next-auth.js.org/getting-started/introduction) | Compatible Supabase, Flexible |
| **Paiement** | FedaPay | Latest SDK | [Docs](https://docs.fedapay.com) | Paiements mobile money Afrique (FCFA) |
| **Email** | Resend | Latest | [Docs](https://resend.com/docs) | Emails transactionnels modernes |
| **Upload** | Supabase Storage | - | [Docs](https://supabase.com/docs/guides/storage) | PDFs, Images, Fichiers |
| **PDF Viewer** | react-pdf | 9.x | [Docs](https://github.com/wojtekmaj/react-pdf) | Lecture de livres PDF |
| **État global** | Zustand | 4.x | [Docs](https://docs.pmnd.rs/zustand) | Simple, Performant, TypeScript |
| **Data Fetching** | TanStack Query | 5.x | [Docs](https://tanstack.com/query/latest) | Caching, Mutations, Optimistic UI |
| **Formulaires** | React Hook Form | 7.x | [Docs](https://react-hook-form.com) | Performance, DX |
| **Validation** | Zod | 3.x | [Docs](https://zod.dev) | Type-safe validation, Runtime |
| **UI Components** | Radix UI | Latest | [Docs](https://www.radix-ui.com/primitives) | Accessibilité, Headless |
| **Icônes** | Lucide React | Latest | [Docs](https://lucide.dev/guide/) | Cohérence, Modern, Tree-shakeable |
| **Charts** | Recharts | 2.x | [Docs](https://recharts.org) | Graphiques admin, Responsive |
| **Notifications** | Sonner | Latest | [Docs](https://sonner.emilkowal.ski/) | Toasts élégants, Performants |
| **Dates** | date-fns | Latest | [Docs](https://date-fns.org/docs) | Manipulation dates, Léger |

### Variables d'environnement requises

Créer un fichier `.env.local` à la racine du projet avec toutes ces variables :

```bash
# ===== DATABASE (Supabase) =====
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB]?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB]"

# ===== SUPABASE =====
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."

# ===== NEXTAUTH =====
# Générer avec: openssl rand -base64 32
NEXTAUTH_SECRET="votre_secret_généré_de_32_caractères_minimum"
NEXTAUTH_URL="http://localhost:3000"

# ===== FEDAPAY (Paiements) =====
FEDAPAY_SECRET_KEY="sk_sandbox_..."
FEDAPAY_PUBLIC_KEY="pk_sandbox_..."
NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY="pk_sandbox_..."
FEDAPAY_WEBHOOK_SECRET="whsec_..."

# ===== RESEND (Email) =====
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@votredomaine.com"

# ===== URLs =====
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# ===== OPTIONAL (LWS Future Migration) =====
LWS_DB_HOST=""
LWS_DB_PORT=""
LWS_DB_NAME=""
LWS_DB_USER=""
LWS_DB_PASSWORD=""
```

**⚠️ IMPORTANT SÉCURITÉ :**
- Ne JAMAIS committer le fichier `.env.local` sur Git
- Toujours avoir un `.env.example` avec des valeurs fictives
- Ajouter `.env.local` dans `.gitignore`
- Utiliser des clés différentes pour développement et production

---


---

## 🗄️ SUPABASE - MAÎTRISE COMPLÈTE EN 2026

### Introduction à Supabase

Supabase est votre Backend-as-a-Service (BaaS) complet qui fournit PostgreSQL, Authentication, Storage, Realtime et Edge Functions. Cette section est **CRITIQUE** et doit être maîtrisée parfaitement pour éviter toute erreur.

### Configuration initiale Supabase

**Étape 1 : Installation des dépendances**

```bash
npm install @supabase/supabase-js @supabase/ssr
```

**Étape 2 : Créer les clients Supabase**

```typescript
// src/lib/supabase/client.ts
/**
 * Client Supabase pour utilisation côté client (Client Components).
 * Utilise la clé publique ANON_KEY (sécurisée par RLS).
 */
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```typescript
// src/lib/supabase/server.ts
/**
 * Client Supabase pour utilisation côté serveur (Server Components, API Routes).
 * Gère automatiquement les cookies pour la session utilisateur.
 */
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Erreur si appelé depuis un Server Component
            // Ce n'est pas grave, on ignore
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Erreur si appelé depuis un Server Component
          }
        },
      },
    }
  );
}
```

```typescript
// src/lib/supabase/admin.ts
/**
 * Client Supabase avec SERVICE_ROLE_KEY pour opérations admin.
 * ⚠️ À UTILISER UNIQUEMENT côté serveur (API Routes).
 * ⚠️ JAMAIS exposer la SERVICE_ROLE_KEY côté client.
 * Bypass toutes les RLS policies.
 */
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
```

---

### CRUD Complet avec Supabase (2026)

#### CREATE - Insertion de données

**Pattern de base pour l'insertion :**

```typescript
/**
 * Insertion d'un nouveau livre dans la base de données.
 * Respecte les RLS policies définies sur la table 'books'.
 */
const { data, error } = await supabase
  .from('books')
  .insert({
    title: 'Le Titre du Livre',
    author: 'Nom de l\'Auteur',
    description: 'Description complète du livre...',
    price: 15000, // Prix en FCFA
    cover_image: 'https://url-image.com/cover.jpg',
    pdf_file: 'https://url-pdf.com/book.pdf',
    collection_id: 'uuid-de-la-collection',
    status: 'published',
    // created_at et id sont générés automatiquement
  })
  .select() // Important : récupérer les données insérées
  .single(); // Récupérer un seul enregistrement

if (error) {
  console.error('Erreur lors de l\'insertion:', error);
  throw new Error(`Impossible de créer le livre: ${error.message}`);
}

// data contient le livre créé avec l'id généré
console.log('Livre créé avec succès:', data);
```

**Insertion multiple (bulk insert) :**

```typescript
/**
 * Insertion de plusieurs livres en une seule requête.
 * Plus performant que des insertions individuelles.
 */
const booksToInsert = [
  { title: 'Livre 1', author: 'Auteur 1', price: 10000 },
  { title: 'Livre 2', author: 'Auteur 2', price: 12000 },
  { title: 'Livre 3', author: 'Auteur 3', price: 8000 },
];

const { data, error } = await supabase
  .from('books')
  .insert(booksToInsert)
  .select();

if (error) {
  throw new Error(`Erreur insertion multiple: ${error.message}`);
}

console.log(`${data.length} livres créés avec succès`);
```

**Upsert (Insert or Update) :**

```typescript
/**
 * Upsert : Insère un nouveau livre OU met à jour s'il existe déjà.
 * Utilise la contrainte UNIQUE pour déterminer si c'est une insertion ou update.
 */
const { data, error } = await supabase
  .from('books')
  .upsert({
    id: 'uuid-existant-ou-null', // Si null, génère un nouveau UUID
    title: 'Livre Mis à Jour',
    author: 'Auteur',
    price: 15000,
    updated_at: new Date().toISOString(),
  }, {
    onConflict: 'id', // Colonne de conflit (doit avoir une contrainte UNIQUE)
  })
  .select()
  .single();
```

---

#### READ - Lecture de données

**Pattern de base pour la lecture :**

```typescript
/**
 * Lecture de tous les livres publiés, triés par date de création.
 * Utilise la pagination avec limit() pour éviter de charger trop de données.
 */
const { data: books, error } = await supabase
  .from('books')
  .select('*')
  .eq('status', 'published') // Filtrer par statut
  .order('created_at', { ascending: false }) // Tri décroissant
  .limit(20); // Limiter à 20 résultats

if (error) {
  throw new Error(`Erreur de lecture: ${error.message}`);
}

console.log('Livres récupérés:', books);
```

**Lecture avec relations (joins) :**

```typescript
/**
 * Lecture de livres avec leurs collections et auteurs associés.
 * Supabase permet des jointures via les foreign keys.
 */
const { data: books, error } = await supabase
  .from('books')
  .select(`
    *,
    collections:collection_id (
      id,
      name,
      description
    ),
    book_purchases (
      id,
      user_id,
      purchase_date
    )
  `)
  .eq('status', 'published')
  .order('created_at', { ascending: false });
```

**Lecture avec filtres avancés :**

```typescript
/**
 * Filtres complexes : prix entre 5000 et 20000 FCFA,
 * titre contenant un mot-clé, et auteur spécifique.
 */
const { data: books, error } = await supabase
  .from('books')
  .select('*')
  .gte('price', 5000) // Prix >= 5000
  .lte('price', 20000) // Prix <= 20000
  .ilike('title', '%roman%') // Titre contenant "roman" (insensible à la casse)
  .eq('author', 'Nom Auteur')
  .order('price', { ascending: true });
```

**Pagination avec offset et limit :**

```typescript
/**
 * Pagination pour charger les livres par lots de 20.
 * Page 1 : offset 0, Page 2 : offset 20, etc.
 */
const PAGE_SIZE = 20;
const page = 2; // Page actuelle

const { data: books, error, count } = await supabase
  .from('books')
  .select('*', { count: 'exact' }) // Récupérer le nombre total
  .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1) // Pagination
  .order('created_at', { ascending: false });

const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 0;
console.log(`Page ${page} sur ${totalPages}`);
```

**Recherche full-text (si configurée) :**

```typescript
/**
 * Recherche full-text dans les titres et descriptions.
 * Nécessite une configuration de full-text search dans PostgreSQL.
 */
const searchQuery = 'aventure mystère';

const { data: books, error } = await supabase
  .from('books')
  .select('*')
  .textSearch('fts', searchQuery, {
    type: 'websearch',
    config: 'french' // Configuration pour le français
  });
```

---

#### UPDATE - Mise à jour de données

**Pattern de base pour la mise à jour :**

```typescript
/**
 * Mise à jour d'un livre existant par son ID.
 * Met à jour uniquement les champs fournis.
 */
const { data, error } = await supabase
  .from('books')
  .update({
    title: 'Nouveau Titre',
    price: 18000,
    updated_at: new Date().toISOString(),
  })
  .eq('id', 'uuid-du-livre') // Condition WHERE
  .select()
  .single();

if (error) {
  throw new Error(`Erreur de mise à jour: ${error.message}`);
}

console.log('Livre mis à jour:', data);
```

**Mise à jour conditionnelle :**

```typescript
/**
 * Mise à jour uniquement si certaines conditions sont remplies.
 * Utile pour éviter les conflits de concurrence.
 */
const { data, error } = await supabase
  .from('books')
  .update({ status: 'archived' })
  .eq('id', bookId)
  .eq('status', 'draft') // Ne mettre à jour que si le statut est 'draft'
  .select()
  .single();

if (error || !data) {
  throw new Error('Le livre n\'est pas en statut draft ou n\'existe pas');
}
```

**Mise à jour multiple (bulk update) :**

```typescript
/**
 * Mise à jour de plusieurs livres en une seule requête.
 * Change le statut de tous les livres d'une collection.
 */
const { data, error } = await supabase
  .from('books')
  .update({ status: 'published' })
  .eq('collection_id', collectionId)
  .eq('status', 'draft')
  .select();

console.log(`${data?.length || 0} livres publiés`);
```

**Incrément de valeurs numériques :**

```typescript
/**
 * Incrémenter le nombre de vues d'un livre.
 * Utilise une fonction PostgreSQL pour éviter les race conditions.
 */
const { data, error } = await supabase.rpc('increment_views', {
  book_id: bookId,
  increment_by: 1
});

// Fonction PostgreSQL à créer dans Supabase SQL Editor :
/*
CREATE OR REPLACE FUNCTION increment_views(book_id UUID, increment_by INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE books
  SET views = views + increment_by
  WHERE id = book_id;
END;
$$ LANGUAGE plpgsql;
*/
```

---

#### DELETE - Suppression de données

**Pattern de base pour la suppression :**

```typescript
/**
 * Suppression d'un livre par son ID.
 * ⚠️ Attention : suppression définitive, pas de soft delete.
 */
const { error } = await supabase
  .from('books')
  .delete()
  .eq('id', bookId);

if (error) {
  throw new Error(`Erreur de suppression: ${error.message}`);
}

console.log('Livre supprimé avec succès');
```

**Soft delete (suppression logique) :**

```typescript
/**
 * Soft delete : marquer comme supprimé sans vraiment supprimer.
 * Préférable pour garder l'historique.
 */
const { data, error } = await supabase
  .from('books')
  .update({
    deleted_at: new Date().toISOString(),
    status: 'deleted'
  })
  .eq('id', bookId)
  .select()
  .single();

// Pour filtrer les livres non supprimés dans les queries
const { data: activeBooks } = await supabase
  .from('books')
  .select('*')
  .is('deleted_at', null);
```

**Suppression conditionnelle :**

```typescript
/**
 * Supprimer uniquement si aucun achat n'est lié.
 * Vérifie d'abord l'existence de relations.
 */
// Vérifier les achats liés
const { data: purchases } = await supabase
  .from('book_purchases')
  .select('id')
  .eq('book_id', bookId)
  .limit(1);

if (purchases && purchases.length > 0) {
  throw new Error('Impossible de supprimer : des achats sont liés à ce livre');
}

// Supprimer si pas d'achats
const { error } = await supabase
  .from('books')
  .delete()
  .eq('id', bookId);
```

**Suppression en cascade (via foreign keys) :**

```typescript
/**
 * La suppression en cascade doit être configurée au niveau de la base de données.
 * Exemple : supprimer une collection supprime automatiquement tous ses livres.
 */

// SQL à exécuter dans Supabase SQL Editor pour configurer CASCADE :
/*
ALTER TABLE books
DROP CONSTRAINT IF EXISTS books_collection_id_fkey,
ADD CONSTRAINT books_collection_id_fkey
  FOREIGN KEY (collection_id)
  REFERENCES collections(id)
  ON DELETE CASCADE;
*/

// Ensuite, supprimer la collection supprime automatiquement les livres
const { error } = await supabase
  .from('collections')
  .delete()
  .eq('id', collectionId);
```

---

### Row Level Security (RLS) - Sécurité Maximale

**⚠️ RÈGLE ABSOLUE : Toutes les tables DOIVENT avoir RLS activé et des politiques définies.**

#### Pourquoi RLS est critique

Row Level Security (RLS) est la couche de sécurité de PostgreSQL qui contrôle quelles lignes un utilisateur peut lire, insérer, modifier ou supprimer. Sans RLS, n'importe qui peut accéder à toutes les données avec la clé ANON_KEY.

#### Activer RLS sur une table

```sql
-- Dans Supabase SQL Editor
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
```

#### Politiques RLS pour une table de livres

**Politique de lecture (SELECT) - Livres publics**

```sql
-- Tous les utilisateurs peuvent lire les livres publiés
CREATE POLICY "Livres publiés lisibles par tous"
ON books
FOR SELECT
USING (status = 'published');
```

**Politique d'insertion (INSERT) - Seulement les admins**

```sql
-- Seuls les utilisateurs avec le rôle 'admin' peuvent créer des livres
CREATE POLICY "Seuls les admins peuvent créer des livres"
ON books
FOR INSERT
WITH CHECK (
  auth.jwt() ->> 'role' = 'admin'
);
```

**Politique de mise à jour (UPDATE) - Propriétaire ou admin**

```sql
-- Un utilisateur peut modifier ses propres livres OU les admins peuvent modifier tous les livres
CREATE POLICY "Modifier ses propres livres ou admin"
ON books
FOR UPDATE
USING (
  auth.uid() = user_id OR
  auth.jwt() ->> 'role' = 'admin'
)
WITH CHECK (
  auth.uid() = user_id OR
  auth.jwt() ->> 'role' = 'admin'
);
```

**Politique de suppression (DELETE) - Seulement les admins**

```sql
-- Seuls les admins peuvent supprimer des livres
CREATE POLICY "Seuls les admins peuvent supprimer"
ON books
FOR DELETE
USING (
  auth.jwt() ->> 'role' = 'admin'
);
```

#### Politiques RLS pour les achats d'utilisateurs

```sql
-- Table book_purchases
ALTER TABLE book_purchases ENABLE ROW LEVEL SECURITY;

-- Un utilisateur ne peut voir que ses propres achats
CREATE POLICY "Voir ses propres achats"
ON book_purchases
FOR SELECT
USING (auth.uid() = user_id);

-- Un utilisateur peut créer un achat pour lui-même
CREATE POLICY "Créer ses propres achats"
ON book_purchases
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Les admins peuvent voir tous les achats
CREATE POLICY "Admins voient tous les achats"
ON book_purchases
FOR SELECT
USING (
  auth.jwt() ->> 'role' = 'admin'
);
```

#### Tester les RLS policies

```typescript
/**
 * Tester si un utilisateur peut lire un livre.
 * Si RLS bloque, une erreur sera levée.
 */
const supabase = createClient(); // Client avec auth user

const { data, error } = await supabase
  .from('books')
  .select('*')
  .eq('id', bookId)
  .single();

if (error) {
  // Peut être une erreur RLS si l'utilisateur n'a pas les permissions
  console.error('Accès refusé ou livre inexistant:', error);
}
```

#### Bypass RLS pour opérations admin

```typescript
/**
 * Pour bypasser RLS (opérations admin), utiliser le client admin.
 * ⚠️ UNIQUEMENT côté serveur (API Routes), JAMAIS côté client.
 */
import { supabaseAdmin } from '@/lib/supabase/admin';

const { data, error } = await supabaseAdmin
  .from('books')
  .select('*'); // Récupère TOUS les livres, même non publiés

// Utilisez avec précaution et seulement quand nécessaire
```

---

### Création de Tables Supabase (2026)

#### Bonne pratique : Utiliser l'éditeur SQL de Supabase

Au lieu de créer les tables manuellement via l'interface, utilisez des scripts SQL pour garantir la reproductibilité et la cohérence.

#### Exemple : Table `books` complète

```sql
-- Créer la table books avec toutes les colonnes et contraintes
CREATE TABLE IF NOT EXISTS public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Informations du livre
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT,
  isbn VARCHAR(20) UNIQUE,
  
  -- Pricing
  price INTEGER NOT NULL CHECK (price > 0), -- Prix en FCFA (centimes)
  discount_percentage INTEGER DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  
  -- Fichiers
  cover_image TEXT NOT NULL,
  pdf_file TEXT NOT NULL,
  
  -- Metadata
  page_count INTEGER,
  language VARCHAR(10) DEFAULT 'fr',
  published_date DATE,
  
  -- Relations
  collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
  
  -- Statut
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived', 'deleted')),
  
  -- Statistiques
  views INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  
  -- Soft delete
  deleted_at TIMESTAMPTZ
);

-- Créer des index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_books_status ON public.books(status);
CREATE INDEX IF NOT EXISTS idx_books_collection ON public.books(collection_id);
CREATE INDEX IF NOT EXISTS idx_books_created_at ON public.books(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_books_author ON public.books(author);

-- Activer RLS
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Trigger pour updated_at automatique
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_books_updated_at
  BEFORE UPDATE ON public.books
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### Exemple : Table `collections`

```sql
CREATE TABLE IF NOT EXISTS public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image TEXT,
  
  -- Pricing pour collections complètes
  price INTEGER CHECK (price >= 0),
  
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  
  -- Ordering
  display_order INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_collections_status ON public.collections(status);
CREATE INDEX IF NOT EXISTS idx_collections_display_order ON public.collections(display_order);

ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_collections_updated_at
  BEFORE UPDATE ON public.collections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### Exemple : Table `book_purchases` (Achats)

```sql
CREATE TABLE IF NOT EXISTS public.book_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Relations
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  
  -- Transaction details
  transaction_id VARCHAR(255) UNIQUE, -- ID transaction FedaPay
  amount_paid INTEGER NOT NULL, -- Montant payé en FCFA
  
  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  
  -- Metadata
  payment_method VARCHAR(50), -- mobile_money, card, etc.
  payment_provider VARCHAR(50), -- FedaPay
  
  -- Contrainte : un utilisateur ne peut acheter le même livre qu'une fois
  UNIQUE(user_id, book_id)
);

CREATE INDEX IF NOT EXISTS idx_purchases_user ON public.book_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_book ON public.book_purchases(book_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON public.book_purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_transaction ON public.book_purchases(transaction_id);

ALTER TABLE public.book_purchases ENABLE ROW LEVEL SECURITY;
```

#### Exemple : Table `reading_progress` (Progression de lecture)

```sql
CREATE TABLE IF NOT EXISTS public.reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  
  -- Progression
  current_page INTEGER NOT NULL DEFAULT 1,
  total_pages INTEGER NOT NULL,
  progress_percentage INTEGER GENERATED ALWAYS AS (
    CASE WHEN total_pages > 0 
    THEN (current_page * 100 / total_pages)
    ELSE 0 
    END
  ) STORED,
  
  last_read_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Un utilisateur a une seule progression par livre
  UNIQUE(user_id, book_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user ON public.reading_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_book ON public.reading_progress(book_id);

ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_progress_updated_at
  BEFORE UPDATE ON public.reading_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

### Supabase Storage - Gestion des fichiers

#### Configuration des buckets Storage

Dans Supabase Dashboard → Storage, créer les buckets nécessaires :

1. **book-covers** : Pour les couvertures de livres (images)
2. **book-pdfs** : Pour les fichiers PDF des livres
3. **user-avatars** : Pour les photos de profil (optionnel)

**Configuration des buckets :**
- Public : OUI pour `book-covers`, NON pour `book-pdfs`
- File size limit : 10 MB pour images, 50 MB pour PDFs
- Allowed MIME types : `image/*` pour covers, `application/pdf` pour PDFs

#### Politiques RLS sur Storage

```sql
-- Politique pour book-covers (lecture publique)
CREATE POLICY "Images de couverture publiques"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-covers');

-- Politique pour upload des covers (admins uniquement)
CREATE POLICY "Admins peuvent upload des covers"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'book-covers' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- Politique pour book-pdfs (lecture uniquement pour propriétaires)
CREATE POLICY "Lire les PDFs achetés"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'book-pdfs' AND
  -- Vérifier que l'utilisateur a acheté le livre
  EXISTS (
    SELECT 1 FROM public.book_purchases
    WHERE user_id = auth.uid()
    AND book_id::text = (storage.foldername(name))[1]
    AND status = 'completed'
  )
);
```

#### Upload de fichiers vers Supabase Storage

```typescript
/**
 * Upload d'une image de couverture vers Supabase Storage.
 * Retourne l'URL publique de l'image uploadée.
 */
async function uploadBookCover(file: File): Promise<string> {
  const supabase = createClient();
  
  // Générer un nom de fichier unique
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `covers/${fileName}`;
  
  // Upload du fichier
  const { data, error } = await supabase.storage
    .from('book-covers')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false, // Ne pas écraser si le fichier existe
    });
  
  if (error) {
    throw new Error(`Erreur upload: ${error.message}`);
  }
  
  // Obtenir l'URL publique
  const { data: { publicUrl } } = supabase.storage
    .from('book-covers')
    .getPublicUrl(filePath);
  
  return publicUrl;
}
```

#### Upload de PDF (fichier privé)

```typescript
/**
 * Upload d'un PDF de livre vers un bucket privé.
 * Retourne le chemin du fichier (pas l'URL publique).
 */
async function uploadBookPdf(file: File, bookId: string): Promise<string> {
  const supabaseAdmin = supabaseAdmin; // Utiliser le client admin
  
  const fileExt = 'pdf';
  const filePath = `books/${bookId}/book.${fileExt}`;
  
  const { data, error } = await supabaseAdmin.storage
    .from('book-pdfs')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true, // Remplacer si existe
    });
  
  if (error) {
    throw new Error(`Erreur upload PDF: ${error.message}`);
  }
  
  return filePath; // Stocker ce chemin dans la DB
}
```

#### Signed URLs pour fichiers privés

```typescript
/**
 * Créer une URL signée temporaire pour accéder à un PDF privé.
 * L'URL expire après 1 heure.
 */
async function getSignedPdfUrl(filePath: string): Promise<string> {
  const supabase = createClient();
  
  const { data, error } = await supabase.storage
    .from('book-pdfs')
    .createSignedUrl(filePath, 3600); // 1 heure en secondes
  
  if (error) {
    throw new Error(`Erreur génération URL signée: ${error.message}`);
  }
  
  return data.signedUrl;
}
```

---

## 💳 FEDAPAY - SYSTÈME DE PAIEMENT INTÉGRAL

### Introduction à FedaPay

FedaPay est la solution de paiement mobile money pour l'Afrique francophone. Elle supporte les opérateurs Mobile Money (MTN, Moov, Togocom) et les cartes bancaires.

### Installation et Configuration

```bash
npm install fedapay
```

**Variables d'environnement :**

```bash
# Sandbox (développement)
FEDAPAY_SECRET_KEY="sk_sandbox_xxxxx"
FEDAPAY_PUBLIC_KEY="pk_sandbox_xxxxx"
NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY="pk_sandbox_xxxxx"
FEDAPAY_WEBHOOK_SECRET="whsec_xxxxx"

# Production
FEDAPAY_SECRET_KEY="sk_live_xxxxx"
FEDAPAY_PUBLIC_KEY="pk_live_xxxxx"
NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY="pk_live_xxxxx"
FEDAPAY_WEBHOOK_SECRET="whsec_xxxxx"

# URL de callback
NEXT_PUBLIC_APP_URL="https://votredomaine.com"
```

### Configuration du client FedaPay

```typescript
// src/lib/payment/fedapay.ts
/**
 * Configuration du client FedaPay pour les paiements.
 * À utiliser UNIQUEMENT côté serveur (API Routes).
 */
import FedaPay from 'fedapay';

// Configurer FedaPay
FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY!);
FedaPay.setEnvironment(
  process.env.NODE_ENV === 'production' ? 'live' : 'sandbox'
);

export { FedaPay };
```

---

### Création d'une session de paiement

```typescript
// src/app/api/payment/create-checkout/route.ts
/**
 * API Route pour créer une session de paiement FedaPay.
 * POST /api/payment/create-checkout
 */
import { NextRequest, NextResponse } from 'next/server';
import { FedaPay } from '@/lib/payment/fedapay';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

// Schéma de validation
const checkoutSchema = z.object({
  bookId: z.string().uuid(),
  amount: z.number().int().positive(),
  currency: z.literal('XOF'), // Franc CFA
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }
    
    // Valider les données
    const body = await request.json();
    const validatedData = checkoutSchema.parse(body);
    
    // Vérifier que le livre existe et récupérer les infos
    const { data: book, error: bookError } = await supabase
      .from('books')
      .select('id, title, price, status')
      .eq('id', validatedData.bookId)
      .eq('status', 'published')
      .single();
    
    if (bookError || !book) {
      return NextResponse.json(
        { error: 'Livre introuvable' },
        { status: 404 }
      );
    }
    
    // Vérifier que l'utilisateur n'a pas déjà acheté ce livre
    const { data: existingPurchase } = await supabase
      .from('book_purchases')
      .select('id')
      .eq('user_id', user.id)
      .eq('book_id', book.id)
      .eq('status', 'completed')
      .single();
    
    if (existingPurchase) {
      return NextResponse.json(
        { error: 'Vous possédez déjà ce livre' },
        { status: 400 }
      );
    }
    
    // Créer une transaction FedaPay
    const transaction = await FedaPay.Transaction.create({
      description: `Achat du livre: ${book.title}`,
      amount: book.price, // Montant en FCFA
      currency: {
        iso: 'XOF'
      },
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback`,
      // Métadonnées pour retrouver la transaction
      custom_metadata: {
        book_id: book.id,
        user_id: user.id,
      }
    });
    
    // Générer le token de paiement
    const token = await transaction.generateToken();
    
    // Enregistrer la transaction en attente dans la DB
    await supabase
      .from('book_purchases')
      .insert({
        user_id: user.id,
        book_id: book.id,
        transaction_id: transaction.id.toString(),
        amount_paid: book.price,
        status: 'pending',
        payment_provider: 'fedapay',
      });
    
    return NextResponse.json({
      token: token.token,
      url: token.url, // URL de redirection pour le paiement
      transaction_id: transaction.id,
    });
    
  } catch (error) {
    console.error('Erreur création checkout:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création du paiement' },
      { status: 500 }
    );
  }
}
```

---

### Webhook FedaPay - Traitement des notifications

**⚠️ CRITIQUE : Le webhook est le seul moyen fiable de confirmer un paiement.**

```typescript
// src/app/api/payment/webhook/route.ts
/**
 * API Route pour recevoir les webhooks de FedaPay.
 * POST /api/payment/webhook
 * 
 * FedaPay envoie des notifications pour chaque changement de statut.
 * On doit vérifier la signature pour garantir l'authenticité.
 */
import { NextRequest, NextResponse } from 'next/server';
import { FedaPay } from '@/lib/payment/fedapay';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { headers } from 'next/headers';
import crypto from 'crypto';

/**
 * Vérifier la signature du webhook pour garantir qu'il vient de FedaPay.
 */
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
}

export async function POST(request: NextRequest) {
  try {
    // Récupérer le corps brut de la requête (important pour la signature)
    const rawBody = await request.text();
    const headersList = await headers();
    const signature = headersList.get('x-fedapay-signature');
    
    // Vérifier la signature du webhook
    if (!signature || !verifyWebhookSignature(
      rawBody,
      signature,
      process.env.FEDAPAY_WEBHOOK_SECRET!
    )) {
      console.error('Signature webhook invalide');
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 403 }
      );
    }
    
    // Parser le corps
    const event = JSON.parse(rawBody);
    
    console.log('Webhook FedaPay reçu:', {
      type: event.type,
      transaction_id: event.data?.id,
    });
    
    // Traiter selon le type d'événement
    switch (event.type) {
      case 'transaction.approved':
        await handleTransactionApproved(event.data);
        break;
      
      case 'transaction.canceled':
        await handleTransactionCanceled(event.data);
        break;
      
      case 'transaction.failed':
        await handleTransactionFailed(event.data);
        break;
      
      default:
        console.log('Type d\'événement non géré:', event.type);
    }
    
    // Toujours répondre 200 OK à FedaPay
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Erreur traitement webhook:', error);
    
    // Répondre 200 OK même en cas d'erreur pour éviter les retry
    // Mais logger l'erreur pour investigation
    return NextResponse.json({ received: true });
  }
}

/**
 * Traiter une transaction approuvée (paiement réussi).
 */
async function handleTransactionApproved(transactionData: any) {
  try {
    const transactionId = transactionData.id.toString();
    const customMetadata = transactionData.custom_metadata;
    
    if (!customMetadata?.book_id || !customMetadata?.user_id) {
      throw new Error('Métadonnées manquantes dans la transaction');
    }
    
    // Mettre à jour le statut de l'achat dans la DB
    const { error: updateError } = await supabaseAdmin
      .from('book_purchases')
      .update({
        status: 'completed',
        payment_method: transactionData.mode || 'unknown',
      })
      .eq('transaction_id', transactionId);
    
    if (updateError) {
      throw new Error(`Erreur mise à jour achat: ${updateError.message}`);
    }
    
    // Envoyer un email de confirmation (optionnel)
    await sendPurchaseConfirmationEmail(
      customMetadata.user_id,
      customMetadata.book_id
    );
    
    console.log(`Transaction ${transactionId} approuvée avec succès`);
    
  } catch (error) {
    console.error('Erreur handleTransactionApproved:', error);
    // Ne pas throw pour éviter les retry du webhook
  }
}

/**
 * Traiter une transaction annulée.
 */
async function handleTransactionCanceled(transactionData: any) {
  try {
    const transactionId = transactionData.id.toString();
    
    await supabaseAdmin
      .from('book_purchases')
      .update({ status: 'failed' })
      .eq('transaction_id', transactionId);
    
    console.log(`Transaction ${transactionId} annulée`);
    
  } catch (error) {
    console.error('Erreur handleTransactionCanceled:', error);
  }
}

/**
 * Traiter une transaction échouée.
 */
async function handleTransactionFailed(transactionData: any) {
  try {
    const transactionId = transactionData.id.toString();
    
    await supabaseAdmin
      .from('book_purchases')
      .update({ status: 'failed' })
      .eq('transaction_id', transactionId);
    
    console.log(`Transaction ${transactionId} échouée`);
    
  } catch (error) {
    console.error('Erreur handleTransactionFailed:', error);
  }
}

/**
 * Envoyer un email de confirmation d'achat (à implémenter avec Resend).
 */
async function sendPurchaseConfirmationEmail(
  userId: string,
  bookId: string
) {
  // TODO: Implémenter avec Resend
  console.log(`Email de confirmation à envoyer pour user ${userId}, book ${bookId}`);
}
```

---

### Configuration du Webhook dans FedaPay Dashboard

1. Se connecter au Dashboard FedaPay
2. Aller dans **Webhooks** → **Ajouter un endpoint**
3. URL : `https://votredomaine.com/api/payment/webhook`
4. Événements à écouter :
   - `transaction.approved`
   - `transaction.canceled`
   - `transaction.failed`
5. Copier le **Webhook Secret** et l'ajouter dans `.env.local`

---

### Tests du système de paiement en Sandbox

```typescript
/**
 * Fonction utilitaire pour tester un paiement en sandbox.
 * Utiliser les numéros de test FedaPay.
 */

// Numéros de test FedaPay Sandbox :
// Succès : +22890000001
// Échec : +22890000002
// Timeout : +22890000003

async function testPayment() {
  // Créer une session de paiement
  const response = await fetch('/api/payment/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bookId: 'uuid-du-livre-test',
      amount: 10000, // 10000 FCFA
      currency: 'XOF',
    }),
  });
  
  const { url } = await response.json();
  
  // Rediriger l'utilisateur vers l'URL de paiement
  window.location.href = url;
}
```

---


---

## 🚀 PERFORMANCE ET SCALABILITÉ - SUPPORT 30 000+ UTILISATEURS

### Objectifs de performance 2026

Pour supporter 30 000 utilisateurs actifs par jour avec une expérience fluide, voici les objectifs à atteindre :

**Temps de chargement :**
- First Contentful Paint (FCP) : < 1.5 secondes
- Largest Contentful Paint (LCP) : < 2.5 secondes
- Time to Interactive (TTI) : < 3.5 secondes
- Cumulative Layout Shift (CLS) : < 0.1
- First Input Delay (FID) : < 100 ms

**Métriques serveur :**
- Temps de réponse API : < 200 ms (p95)
- Requêtes DB : < 100 ms (p95)
- Throughput : 500+ requêtes/seconde

---

### Optimisation des images

**Utiliser Next.js Image Component systématiquement :**

```typescript
/**
 * Composant optimisé pour afficher une couverture de livre.
 * Next.js optimise automatiquement l'image (WebP, lazy loading, responsive).
 */
import Image from 'next/image';

interface BookCoverProps {
  src: string;
  alt: string;
  priority?: boolean; // Pour images above-the-fold
}

export function BookCover({ src, alt, priority = false }: BookCoverProps) {
  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85} // Qualité optimale
        priority={priority} // Charger immédiatement si above-the-fold
        placeholder="blur" // Placeholder flou pendant le chargement
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Base64 du blur
      />
    </div>
  );
}
```

**Configuration next.config.js pour images Supabase :**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;
```

---

### Code Splitting et Lazy Loading

**Lazy loading des composants lourds :**

```typescript
/**
 * Lazy loading du lecteur PDF qui est un composant lourd.
 * Il ne sera chargé que quand l'utilisateur ouvre un livre.
 */
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load du composant PdfViewer
const PdfViewer = dynamic(
  () => import('@/components/reader/PdfViewer').then(mod => mod.PdfViewer),
  {
    loading: () => <PdfViewerSkeleton />,
    ssr: false, // Ne pas render côté serveur (dépend du DOM)
  }
);

function PdfViewerSkeleton() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Skeleton className="h-full w-full" />
    </div>
  );
}

export function ReaderPage() {
  return (
    <div>
      <PdfViewer bookId="..." />
    </div>
  );
}
```

**Lazy loading des routes avec Suspense :**

```typescript
/**
 * Utiliser React Suspense pour lazy load des sections de page.
 */
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

async function BookRecommendations() {
  // Composant async qui fetch des données
  const recommendations = await fetchRecommendations();
  
  return (
    <div>
      {recommendations.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <HeroSection /> {/* Chargé immédiatement */}
      
      {/* Recommendations chargées en différé */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <BookRecommendations />
      </Suspense>
    </div>
  );
}
```

---

### Optimisation des requêtes Database

**Utiliser des index appropriés :**

```sql
-- Index pour les requêtes fréquentes
CREATE INDEX CONCURRENTLY idx_books_status_created
ON books(status, created_at DESC)
WHERE status = 'published';

-- Index partiel pour les soft deletes
CREATE INDEX CONCURRENTLY idx_books_active
ON books(id, created_at)
WHERE deleted_at IS NULL;

-- Index pour la recherche
CREATE INDEX CONCURRENTLY idx_books_search
ON books USING GIN(to_tsvector('french', title || ' ' || author || ' ' || description));
```

**Pagination avec cursor-based au lieu d'offset :**

```typescript
/**
 * Pagination basée sur le curseur (plus performante que OFFSET).
 * Utilise le dernier ID récupéré comme point de départ.
 */
async function getBooksPaginated(cursor?: string, limit = 20) {
  const supabase = createClient();
  
  let query = supabase
    .from('books')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  // Si on a un curseur, on récupère les livres après ce curseur
  if (cursor) {
    query = query.lt('created_at', cursor);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  // Le prochain curseur est le created_at du dernier élément
  const nextCursor = data.length > 0 
    ? data[data.length - 1].created_at 
    : null;
  
  return { data, nextCursor };
}
```

**Utiliser select() avec parcimonie :**

```typescript
/**
 * Ne sélectionner que les colonnes nécessaires.
 * Éviter SELECT * en production.
 */
// ❌ Mauvais : récupère tout
const { data } = await supabase
  .from('books')
  .select('*');

// ✅ Bon : sélectionne seulement ce qui est nécessaire
const { data } = await supabase
  .from('books')
  .select('id, title, author, cover_image, price');
```

**Prefetch des données avec Server Components :**

```typescript
/**
 * Server Component qui fetch les données au build time.
 * Pas de loading state côté client.
 */
import { createClient } from '@/lib/supabase/server';

export default async function BooksPage() {
  const supabase = await createClient();
  
  // Data fetching côté serveur (0 latence côté client)
  const { data: books } = await supabase
    .from('books')
    .select('id, title, author, cover_image, price')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(20);
  
  return (
    <div>
      <h1>Livres récents</h1>
      <BookGrid books={books || []} />
    </div>
  );
}
```

---

### Caching stratégique

**Cache Next.js avec revalidation :**

```typescript
/**
 * Cacher les données avec revalidation périodique.
 * Next.js 15 cache automatiquement les fetch() en Server Components.
 */

// Cache pendant 1 heure, puis revalide
export const revalidate = 3600; // 1 heure en secondes

async function getBooks() {
  const supabase = await createClient();
  
  const { data } = await supabase
    .from('books')
    .select('*')
    .eq('status', 'published');
  
  return data;
}
```

**Cache avec React Query (côté client) :**

```typescript
/**
 * Utiliser TanStack Query pour cacher les données côté client.
 */
import { useQuery } from '@tanstack/react-query';

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('status', 'published');
      
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}
```

---

### Bundle Size Optimization

**Analyser la taille du bundle :**

```bash
# Installer l'analyseur de bundle
npm install @next/bundle-analyzer

# Analyser
npm run build
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... rest of config
});
```

**Tree-shaking des bibliothèques :**

```typescript
// ❌ Mauvais : importe toute la bibliothèque
import _ from 'lodash';
const result = _.uniq(array);

// ✅ Bon : importe seulement la fonction nécessaire
import uniq from 'lodash/uniq';
const result = uniq(array);

// ✅ Encore mieux : utiliser les fonctions natives
const result = [...new Set(array)];
```

---

## 🧪 TESTS ET VALIDATION AUTOMATIQUE

### Configuration ESLint stricte

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-floating-promises": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Configuration Prettier

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### Scripts de validation dans package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "validate": "npm run type-check && npm run lint && npm run format:check",
    "test": "jest",
    "test:watch": "jest --watch",
    "analyze": "ANALYZE=true npm run build"
  }
}
```

### Processus de validation avant commit

**Installer Husky et lint-staged :**

```bash
npm install --save-dev husky lint-staged
npx husky init
```

**Configuration lint-staged :**

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

**Hook pre-commit :**

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# TypeScript check
npm run type-check || exit 1

# Lint
npm run lint || exit 1

# Format check
npm run format:check || exit 1

echo "✅ All checks passed!"
```

---

### Validation TypeScript stricte

**tsconfig.json avec configuration stricte :**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": false,
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noPropertyAccessFromIndexSignature": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### Tests unitaires avec Jest (optionnel mais recommandé)

**Configuration Jest :**

```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
};

module.exports = createJestConfig(customJestConfig);
```

**Exemple de test simple :**

```typescript
// src/lib/utils/format.test.ts
import { formatPrice } from './format';

describe('formatPrice', () => {
  it('formate correctement un prix en FCFA', () => {
    expect(formatPrice(15000)).toBe('15 000 FCFA');
  });
  
  it('gère les prix à 0', () => {
    expect(formatPrice(0)).toBe('0 FCFA');
  });
  
  it('formate les grands nombres', () => {
    expect(formatPrice(1000000)).toBe('1 000 000 FCFA');
  });
});
```

---

## 🎨 UX/UI MODERNE 2026

### Principes de design 2026

**1. Minimalisme fonctionnel**
- Interface épurée avec beaucoup d'espace blanc
- Typographie claire et hiérarchisée
- Pas de surcharge visuelle

**2. Micro-interactions**
- Animations fluides et subtiles
- Feedback immédiat sur les actions utilisateur
- Transitions douces entre les états

**3. Accessibilité universelle**
- Contraste minimum WCAG 2.1 AA
- Navigation au clavier complète
- ARIA labels appropriés
- Support des screen readers

**4. Dark Mode natif**
- Support du dark mode système
- Transitions fluides entre thèmes
- Couleurs optimisées pour chaque mode

**5. Responsive by default**
- Mobile-first approach
- Breakpoints fluides
- Touch-friendly sur mobile

---

### Système de design avec Tailwind CSS

**Configuration Tailwind étendue :**

```javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette personnalisée
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
        },
        accent: {
          500: '#f59e0b',
          600: '#d97706',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        
        // Dark mode
        dark: {
          bg: '#0f172a',
          card: '#1e293b',
          border: '#334155',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 35px -3px rgba(0, 0, 0, 0.05)',
        'large': '0 20px 50px -12px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};

export default config;
```

---

### Composants UI avec états visuels complets

**Exemple : Button Component avec tous les états :**

```typescript
// src/components/ui/button.tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      className, 
      variant = 'primary', 
      size = 'md', 
      loading = false,
      disabled,
      icon,
      children,
      ...props 
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
      outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : icon ? (
          icon
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

---

### Skeleton Loading States

```typescript
// src/components/ui/skeleton.tsx
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-800',
        className
      )}
      {...props}
    />
  );
}

// Exemple d'utilisation
export function BookCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-48 w-full" /> {/* Image */}
      <Skeleton className="h-4 w-3/4" /> {/* Titre */}
      <Skeleton className="h-3 w-1/2" /> {/* Auteur */}
      <Skeleton className="h-6 w-20" /> {/* Prix */}
    </div>
  );
}
```

---

### Dark Mode implémentation

```typescript
// src/components/theme-provider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

// src/components/theme-toggle.tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Changer le thème"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

---

### Accessibilité (a11y)

**Checklist accessibilité obligatoire :**

- ✅ Tous les boutons ont un label accessible
- ✅ Tous les formulaires ont des labels associés
- ✅ Navigation au clavier fonctionnelle
- ✅ Focus visible sur tous les éléments interactifs
- ✅ Contraste texte/fond >= 4.5:1 (WCAG AA)
- ✅ Images ont des alt texts descriptifs
- ✅ Landmarks ARIA appropriés (header, main, nav, footer)
- ✅ États désactivés clairement indiqués
- ✅ Messages d'erreur annoncés aux screen readers

```typescript
/**
 * Exemple de composant accessible avec ARIA.
 */
export function AccessibleDialog({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: DialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle id="dialog-title">{title}</DialogTitle>
        </DialogHeader>
        
        <div id="dialog-description">
          {children}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} aria-label="Fermer la boîte de dialogue">
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 🚀 DÉPLOIEMENT VERCEL SANS ERREURS

### Préparation au déploiement

**Checklist pré-déploiement :**

- [ ] Toutes les variables d'environnement sont définies
- [ ] `.env.example` est à jour avec toutes les variables
- [ ] `npm run build` réussit localement sans erreurs
- [ ] `npm run lint` ne retourne aucune erreur
- [ ] `npm run type-check` réussit
- [ ] Toutes les images ont un alt text
- [ ] Les secrets ne sont pas committés (vérifier `.gitignore`)
- [ ] Database production est créée et accessible
- [ ] Migrations Supabase sont appliquées
- [ ] RLS policies sont activées sur toutes les tables
- [ ] Webhook FedaPay est configuré avec l'URL production

---

### Configuration optimale next.config.js pour Vercel

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ],
      },
    ];
  },
  
  // Redirections
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Variables d'environnement exposées côté client
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  
  // Optimisations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Output standalone pour Docker (optionnel)
  output: 'standalone',
};

module.exports = nextConfig;
```

---

### Déploiement sur Vercel

**Méthode 1 : Via GitHub (recommandé)**

1. Pusher le code sur GitHub
2. Aller sur vercel.com et se connecter avec GitHub
3. Import the repository
4. Configurer les variables d'environnement dans Vercel Dashboard
5. Deploy

**Méthode 2 : Via Vercel CLI**

```bash
# Installer Vercel CLI globalement
npm i -g vercel

# Se connecter
vercel login

# Déployer en production
vercel --prod

# Ou déployer en preview
vercel
```

---

### Configuration des variables d'environnement sur Vercel

Dans Vercel Dashboard → Project → Settings → Environment Variables :

**Variables pour Production :**

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (secret)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# NextAuth
NEXTAUTH_SECRET=xxx (générer un nouveau avec: openssl rand -base64 32)
NEXTAUTH_URL=https://votredomaine.com

# FedaPay (LIVE keys)
FEDAPAY_SECRET_KEY=sk_live_xxx (secret)
FEDAPAY_PUBLIC_KEY=pk_live_xxx
NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY=pk_live_xxx
FEDAPAY_WEBHOOK_SECRET=whsec_xxx (secret)

# Resend
RESEND_API_KEY=re_xxx (secret)
EMAIL_FROM=noreply@votredomaine.com

# App
NEXT_PUBLIC_APP_URL=https://votredomaine.com
```

**⚠️ IMPORTANT :** Marquer comme "secret" toutes les clés sensibles (SERVICE_ROLE_KEY, SECRET_KEY, etc.)

---

### Domaine personnalisé

1. Aller dans Vercel Dashboard → Project → Settings → Domains
2. Ajouter votre domaine : `votredomaine.com`
3. Configurer les DNS selon les instructions Vercel :
   - Type A : `76.76.21.21`
   - Type CNAME : `cname.vercel-dns.com`
4. Attendre la propagation DNS (peut prendre 24-48h)
5. Vercel génère automatiquement un certificat SSL

---

### Surveillance et monitoring

**Vérifier les logs de déploiement :**
- Vercel Dashboard → Deployments → Cliquer sur le déploiement → Logs

**Activer Analytics :**
- Vercel Dashboard → Project → Analytics (inclus gratuitement)

**Configurer les alertes :**
- Vercel Dashboard → Project → Settings → Notifications
- Activer les alertes par email pour :
  - Failed deployments
  - Production errors
  - Performance degradation

---

## 🔄 MIGRATION FUTURE : SUPABASE → LWS

### Préparation pour la migration LWS

LWS (Lightweight Service) sera utilisé pour remplacer Supabase à l'avenir. Pour faciliter cette migration, suivre ces bonnes pratiques dès maintenant :

**1. Abstraire l'accès à la base de données**

Créer une couche d'abstraction pour toutes les opérations DB :

```typescript
// src/lib/database/adapter.ts
/**
 * Adaptateur de base de données.
 * Permet de switcher facilement entre Supabase et LWS.
 */

interface DatabaseAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(sql: string, params?: any[]): Promise<T[]>;
  // Ajouter d'autres méthodes selon les besoins
}

// Implémentation Supabase (actuelle)
class SupabaseAdapter implements DatabaseAdapter {
  async connect() {
    // Configuration Supabase
  }
  
  async query<T>(sql: string, params?: any[]): Promise<T[]> {
    // Utiliser le client Supabase
  }
  
  // ...
}

// Implémentation future LWS (à implémenter lors de la migration)
class LWSAdapter implements DatabaseAdapter {
  async connect() {
    // Configuration LWS
  }
  
  async query<T>(sql: string, params?: any[]): Promise<T[]> {
    // Utiliser le client LWS
  }
  
  // ...
}

// Exporter l'adaptateur actif
export const db: DatabaseAdapter = new SupabaseAdapter();
```

**2. Utiliser des requêtes SQL standard**

Éviter les fonctionnalités spécifiques à Supabase qui ne seraient pas compatibles avec LWS :

```typescript
// ✅ Bon : SQL standard compatible
const { data } = await supabase
  .from('books')
  .select('id, title, author')
  .eq('status', 'published');

// ❌ À éviter : fonctionnalités très spécifiques à Supabase
const { data } = await supabase
  .from('books')
  .select('*, collections(*), authors!inner(*)')
  .textSearch('fts_column', 'search term');
```

**3. Variables d'environnement pour LWS**

Ajouter dès maintenant les variables LWS dans `.env.example` :

```bash
# LWS (Future migration)
LWS_DB_HOST=""
LWS_DB_PORT="5432"
LWS_DB_NAME=""
LWS_DB_USER=""
LWS_DB_PASSWORD=""
LWS_SSL_MODE="require"
```

**4. Documentation de migration**

Créer un document `MIGRATION_LWS.md` qui liste :
- Toutes les fonctionnalités Supabase utilisées
- Les équivalents LWS à implémenter
- Les étapes de migration prévues
- Les tests à effectuer post-migration

---

## ✅ CHECKLIST FINALE COMPLÈTE

### Fonctionnalités Frontend

**Pages publiques :**
- [ ] Homepage avec hero section + collections + livres vedettes
- [ ] Page liste des collections avec filtres
- [ ] Page détail d'une collection
- [ ] Page détail d'un livre
- [ ] Page soumission de manuscrit
- [ ] Page À propos
- [ ] Page Contact
- [ ] Footer avec tous les liens
- [ ] Header avec navigation + panier + authentification

**Authentification :**
- [ ] Page inscription (email + mot de passe)
- [ ] Page connexion
- [ ] Page mot de passe oublié
- [ ] Page réinitialisation du mot de passe
- [ ] Vérification email après inscription
- [ ] Protection des routes protégées
- [ ] Redirection appropriée après login
- [ ] Déconnexion fonctionnelle

**Pages protégées utilisateur :**
- [ ] Dashboard utilisateur
- [ ] Bibliothèque (livres achetés)
- [ ] Lecteur PDF avec contrôles
- [ ] Profil utilisateur
- [ ] Paramètres du compte
- [ ] Historique des achats

**Panier et paiement :**
- [ ] Panier fonctionnel (ajout/suppression)
- [ ] Panier persistent (Zustand + localStorage)
- [ ] Page checkout
- [ ] Intégration FedaPay complète
- [ ] Redirection vers page paiement
- [ ] Callback paiement
- [ ] Confirmation d'achat
- [ ] Email de confirmation automatique

**Dashboard Admin :**
- [ ] Overview avec statistiques (ventes, utilisateurs, livres)
- [ ] Gestion livres : liste, création, modification, suppression
- [ ] Gestion collections : CRUD complet
- [ ] Gestion manuscrits soumis : liste, statut, approbation/rejet
- [ ] Gestion utilisateurs : liste, détails, statut
- [ ] Graphiques de ventes (Recharts)
- [ ] Export de données (CSV/Excel)

---

### Fonctionnalités Backend

**API Routes :**
- [ ] `/api/auth/[...nextauth]` - NextAuth configuration
- [ ] `/api/books` - CRUD livres
- [ ] `/api/collections` - CRUD collections
- [ ] `/api/manuscripts` - Soumission et gestion
- [ ] `/api/payment/create-checkout` - Création session paiement
- [ ] `/api/payment/webhook` - Webhook FedaPay
- [ ] `/api/upload` - Upload fichiers (covers, PDFs)
- [ ] `/api/admin/stats` - Statistiques admin

**Base de données Supabase :**
- [ ] Table `books` créée avec RLS
- [ ] Table `collections` créée avec RLS
- [ ] Table `book_purchases` créée avec RLS
- [ ] Table `reading_progress` créée avec RLS
- [ ] Table `manuscripts` créée avec RLS
- [ ] Index créés sur colonnes fréquemment requêtées
- [ ] Triggers `updated_at` sur toutes les tables
- [ ] Foreign keys avec ON DELETE approprié

**RLS Policies :**
- [ ] Books : lecture publique (published), write admin only
- [ ] Collections : lecture publique, write admin only
- [ ] Purchases : user voit ses achats, admin voit tout
- [ ] Progress : user voit sa progression uniquement
- [ ] Manuscripts : auteur voit les siens, admin voit tout

**Storage Supabase :**
- [ ] Bucket `book-covers` (public)
- [ ] Bucket `book-pdfs` (privé)
- [ ] Policies RLS sur Storage
- [ ] Signed URLs pour PDFs
- [ ] Upload de covers fonctionnel
- [ ] Upload de PDFs fonctionnel

---

### Sécurité

**Authentification et autorisation :**
- [ ] Mots de passe hashés (bcrypt ou équivalent)
- [ ] Sessions JWT sécurisées
- [ ] Protection CSRF
- [ ] Rate limiting sur APIs sensibles
- [ ] Vérification des rôles (USER, ADMIN)

**Validation des données :**
- [ ] Zod schemas pour tous les formulaires
- [ ] Validation côté client (React Hook Form + Zod)
- [ ] Validation côté serveur (API Routes + Zod)
- [ ] Messages d'erreur clairs et sécurisés (pas de leak d'info)

**Protection contre les attaques :**
- [ ] Protection XSS (sanitize inputs)
- [ ] Protection SQL injection (Supabase + parameterized queries)
- [ ] Protection CSRF (NextAuth)
- [ ] Headers de sécurité configurés (next.config.js)
- [ ] HTTPS obligatoire en production
- [ ] Secrets jamais exposés côté client

**RLS Supabase :**
- [ ] RLS activé sur TOUTES les tables
- [ ] Policies testées pour tous les cas d'usage
- [ ] Accès admin via SERVICE_ROLE_KEY uniquement côté serveur

---

### Performance

**Optimisations images :**
- [ ] Next.js Image component utilisé partout
- [ ] Formats WebP/AVIF configurés
- [ ] Lazy loading des images below-the-fold
- [ ] Priority pour images above-the-fold
- [ ] Tailles responsives (sizes prop)

**Code splitting :**
- [ ] Dynamic imports pour composants lourds
- [ ] Lazy loading du lecteur PDF
- [ ] Bundle size < 300 KB (initial load)

**Caching :**
- [ ] Server Components avec revalidation appropriée
- [ ] React Query pour caching côté client
- [ ] Cache des images (CDN Vercel)

**Database :**
- [ ] Index sur colonnes fréquentes
- [ ] Pagination cursor-based
- [ ] Sélection de colonnes (pas de SELECT *)
- [ ] Temps de réponse < 200ms (p95)

---

### Qualité du code

**TypeScript :**
- [ ] Aucune erreur TypeScript
- [ ] Pas de `any` sans justification
- [ ] Types stricts activés (tsconfig.json)
- [ ] Types générés depuis Supabase à jour

**ESLint :**
- [ ] `npm run lint` sans erreurs
- [ ] Règles strictes respectées
- [ ] Pas de console.log en production

**Prettier :**
- [ ] Code formaté uniformément
- [ ] Configuration Prettier appliquée

**Organisation :**
- [ ] Structure de dossiers cohérente
- [ ] Imports organisés et groupés
- [ ] Commentaires en français pour code complexe
- [ ] Pas de code mort (unused code)

---

### UX/UI

**Design :**
- [ ] Palette de couleurs cohérente
- [ ] Typographie harmonieuse
- [ ] Espacements uniformes
- [ ] Responsive parfait (mobile, tablette, desktop)
- [ ] Dark mode fonctionnel
- [ ] Transitions fluides

**États visuels :**
- [ ] Hover states sur tous les éléments interactifs
- [ ] Loading states (skeletons, spinners)
- [ ] Empty states avec messages clairs
- [ ] Error states avec messages utiles
- [ ] Success states avec feedback

**Accessibilité :**
- [ ] Navigation au clavier complète
- [ ] Focus visible sur tous les éléments
- [ ] ARIA labels appropriés
- [ ] Contraste suffisant (WCAG AA)
- [ ] Alt texts sur toutes les images
- [ ] Screen readers supportés

---

### Tests et validation

**Pré-déploiement :**
- [ ] `npm run build` réussit sans erreurs
- [ ] `npm run lint` sans erreurs
- [ ] `npm run type-check` sans erreurs
- [ ] Tests manuels sur toutes les fonctionnalités
- [ ] Tests sur différents navigateurs (Chrome, Firefox, Safari)
- [ ] Tests sur mobile (iOS, Android)

**Post-déploiement :**
- [ ] Homepage se charge correctement
- [ ] Inscription fonctionne
- [ ] Connexion fonctionne
- [ ] Achat test réussi (sandbox FedaPay)
- [ ] Email de confirmation reçu
- [ ] Dashboard admin accessible
- [ ] Upload de fichiers fonctionne
- [ ] Lecteur PDF fonctionne
- [ ] Recherche fonctionne
- [ ] Filtres fonctionnent

---

### Déploiement et Production

**Configuration Vercel :**
- [ ] Projet déployé sur Vercel
- [ ] Domaine personnalisé configuré
- [ ] SSL/HTTPS activé
- [ ] Variables d'environnement production configurées
- [ ] Analytics Vercel activé
- [ ] Alertes configurées

**Monitoring :**
- [ ] Logs accessibles et surveillés
- [ ] Erreurs trackées (Vercel ou Sentry)
- [ ] Performance monitorée (Core Web Vitals)
- [ ] Uptime monitoring actif

**Backup et sécurité :**
- [ ] Backup automatique de la DB (Supabase)
- [ ] Secrets sécurisés (pas dans le code)
- [ ] Rate limiting configuré
- [ ] Webhook FedaPay vérifié avec signature

---

## 📚 RESSOURCES ET SUPPORT

### Liens essentiels

**Documentation officielle :**
- Next.js : https://nextjs.org/docs
- TypeScript : https://www.typescriptlang.org/docs
- Supabase : https://supabase.com/docs
- Tailwind CSS : https://tailwindcss.com/docs
- FedaPay : https://docs.fedapay.com
- Vercel : https://vercel.com/docs

**Communautés :**
- Next.js Discord : https://nextjs.org/discord
- Supabase Discord : https://discord.supabase.com
- Stack Overflow : https://stackoverflow.com

**Outils de développement :**
- VS Code : https://code.visualstudio.com
- GitHub : https://github.com
- Vercel CLI : https://vercel.com/docs/cli
- Supabase CLI : https://supabase.com/docs/guides/cli

---

## 🎯 OBJECTIF FINAL

Livrer une application web **professionnelle, rapide, sécurisée, accessible et évolutive**, capable de supporter 30 000+ utilisateurs par jour, avec un code propre, maintenable et sans bugs, respectant tous les standards de développement 2026.

**Critères de succès :**
- ✅ Zéro erreur TypeScript
- ✅ Zéro erreur ESLint
- ✅ Build Next.js réussi
- ✅ Toutes les fonctionnalités opérationnelles
- ✅ Sécurité maximale (RLS, validation, auth)
- ✅ Performance optimale (< 3s chargement)
- ✅ UX/UI moderne et accessible
- ✅ Déploiement sans erreur sur Vercel
- ✅ Documentation à jour

---


---

**RAPPEL CRITIQUE À L'IA :**

Ce document est votre référence absolue. Chaque règle, chaque processus, chaque bonne pratique documentée ici doit être suivie sans exception. Votre mission est de produire un code de qualité professionnelle, sans hallucination, sans erreur, en vous appuyant systématiquement sur les documentations officielles.

**En cas de doute, TOUJOURS consulter la documentation officielle AVANT de générer du code.**

Bon développement ! 🚀