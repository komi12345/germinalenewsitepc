# Documentation Technique - Éditions Germinale

## Table des matières

1. [Présentation du projet](#présentation-du-projet)
2. [Architecture technique](#architecture-technique)
3. [Schéma de base de données](#schéma-de-base-de-données)
4. [Installation et configuration](#installation-et-configuration)
5. [Configuration Supabase](#configuration-supabase)
6. [Structure des fichiers](#structure-des-fichiers)
7. [Authentification](#authentification)
8. [Déploiement](#déploiement)

---

## Présentation du projet

**Éditions Germinale** est une plateforme de vente de livres numériques (ebooks) dédiée à la littérature africaine francophone. Le site permet aux utilisateurs de :

- Parcourir et acheter des ebooks individuels ou des collections
- Soumettre des manuscrits pour publication
- Gérer leur bibliothèque personnelle
- Recevoir des notifications sur leurs commandes et manuscrits

### Stack technique

| Catégorie | Technologies |
|-----------|-------------|
| Framework | Next.js 16.1.1 (App Router) |
| UI | React 19.2.3 + TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Base de données | Supabase (PostgreSQL) |
| Authentification | Supabase Auth |
| Paiement | FedaPay |
| Upload | UploadThing |
| Email | Resend |
| State Management | Zustand |

---

## Architecture technique

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
├─────────────────────────────────────────────────────────────────┤
│  React Components  │  Zustand Stores  │  Supabase Client        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS APP ROUTER                          │
├─────────────────────────────────────────────────────────────────┤
│  Server Components  │  Server Actions  │  API Routes            │
│  Middleware         │  Auth Callbacks  │  Webhooks              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         SUPABASE                                 │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL DB  │  Auth  │  Storage  │  Realtime  │  Edge Func  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICES EXTERNES                           │
├─────────────────────────────────────────────────────────────────┤
│       FedaPay (Paiement)  │  Resend (Email)  │  UploadThing     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Schéma de base de données

### Diagramme ERD

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  profiles   │────<│   orders    │────<│ order_items │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                       │
       │            ┌─────────────┐           │
       │            │   books     │───────────┘
       │            └─────────────┘
       │                  │
       │                  │
       ▼                  ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ manuscripts │     │   authors   │     │ categories  │
└─────────────┘     └─────────────┘     └─────────────┘
       │
       │            ┌─────────────┐     ┌─────────────────┐
       │            │ collections │────<│ collection_books│
       │            └─────────────┘     └─────────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│notifications│     │user_library │     │     reviews     │
└─────────────┘     └─────────────┘     └─────────────────┘
```

### Tables principales

| Table | Description |
|-------|-------------|
| `profiles` | Extension des utilisateurs auth.users |
| `categories` | Catégories de livres (Romans, Poésie, etc.) |
| `collections` | Collections thématiques de livres |
| `authors` | Auteurs des livres |
| `books` | Catalogue des livres/ebooks |
| `collection_books` | Relation many-to-many collections/livres |
| `orders` | Commandes des utilisateurs |
| `order_items` | Éléments d'une commande |
| `user_library` | Bibliothèque personnelle (livres achetés) |
| `manuscripts` | Manuscrits soumis par les auteurs |
| `notifications` | Notifications utilisateur |
| `reviews` | Avis et notes sur les livres |
| `newsletter_subscribers` | Abonnés newsletter |
| `blog_articles` | Articles du blog |

### Types énumérés

```sql
user_role: 'user' | 'author' | 'admin'
manuscript_status: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'published'
order_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled'
notification_type: 'info' | 'success' | 'warning' | 'order' | 'manuscript' | 'system'
```

---

## Installation et configuration

### Prérequis

- Node.js 20.x ou supérieur
- pnpm (recommandé) ou npm
- Compte Supabase
- Compte FedaPay (pour les paiements)
- Compte Resend (pour les emails)

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd germinalenewsitepc

# Installer les dépendances
pnpm install

# Copier le fichier d'environnement
# Créer un fichier .env.local avec les variables suivantes
```

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Éditions Germinale"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# FedaPay
FEDAPAY_PUBLIC_KEY=pk_live_...
FEDAPAY_SECRET_KEY=sk_live_...
FEDAPAY_ENVIRONMENT=live  # ou 'sandbox' pour les tests

# Resend
RESEND_API_KEY=re_...
EMAIL_FROM="Éditions Germinale <noreply@editions-germinale.com>"

# UploadThing
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...
```

### Démarrage en développement

```bash
# Démarrer le serveur de développement
pnpm dev

# Le site sera accessible sur http://localhost:3000
```

---

## Configuration Supabase

### 1. Créer un projet Supabase

1. Rendez-vous sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez l'URL du projet et les clés API

### 2. Exécuter le schéma SQL

1. Dans le dashboard Supabase, allez dans **SQL Editor**
2. Exécutez les fichiers SQL dans l'ordre suivant :

```
supabase/schema.sql     # Structure de la base de données
supabase/seed.sql       # Données initiales (catégories, collections, livres)
supabase/storage.sql    # Configuration du stockage de fichiers
```

### 3. Configurer l'authentification

1. Allez dans **Authentication** > **Providers**
2. Activez **Email** (activé par défaut)
3. Pour Google OAuth :
   - Activez le provider Google
   - Configurez les credentials OAuth dans Google Cloud Console
   - Ajoutez l'URL de callback : `https://votre-projet.supabase.co/auth/v1/callback`

### 4. Configurer le stockage

Les buckets suivants sont créés automatiquement par `storage.sql` :

| Bucket | Public | Description |
|--------|--------|-------------|
| `avatars` | Oui | Photos de profil utilisateurs |
| `book-covers` | Oui | Couvertures de livres |
| `collection-covers` | Oui | Couvertures de collections |
| `manuscripts` | Non | Manuscrits soumis (PDF) |
| `ebooks` | Non | Fichiers PDF des ebooks |

### 5. Configurer les webhooks (optionnel)

Pour les notifications en temps réel, configurez un webhook :

1. Allez dans **Database** > **Webhooks**
2. Créez un webhook pour la table `orders` :
   - URL: `https://votre-domaine.com/api/webhooks/orders`
   - Events: INSERT, UPDATE

---

## Structure des fichiers

```
germinalenewsitepc/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Routes d'authentification
│   │   └── login/               
│   ├── auth/                     # Callbacks OAuth
│   │   └── callback/            
│   ├── books/                    # Page librairie
│   ├── collections/              # Pages collections
│   │   └── [slug]/              
│   ├── submit-manuscript/        # Soumission manuscrits
│   ├── layout.tsx                # Layout racine
│   ├── page.tsx                  # Page d'accueil
│   └── globals.css               # Styles globaux
│
├── src/
│   ├── components/               # Composants React
│   │   ├── auth/                 # Formulaires auth
│   │   ├── book/                 # Composants livre
│   │   ├── books/                # Page bibliothèque
│   │   ├── collection/           # Détail collection
│   │   ├── collections/          # Liste collections
│   │   ├── home/                 # Sections homepage
│   │   ├── layout/               # Header, Footer
│   │   ├── manuscript/           # Formulaire manuscrit
│   │   ├── providers/            # Providers React
│   │   └── ui/                   # Composants UI
│   │
│   ├── lib/
│   │   ├── actions/              # Server Actions
│   │   │   ├── auth.ts           # Actions authentification
│   │   │   └── notifications.ts  # Actions notifications
│   │   ├── supabase/             # Clients Supabase
│   │   │   ├── client.ts         # Client navigateur
│   │   │   ├── server.ts         # Client serveur
│   │   │   └── middleware.ts     # Middleware auth
│   │   ├── validations/          # Schémas Zod
│   │   ├── mockData.ts           # Données de test
│   │   └── utils.ts              # Utilitaires
│   │
│   ├── store/                    # Zustand stores
│   │   ├── authStore.ts          # État authentification
│   │   ├── notificationStore.ts  # État notifications
│   │   └── index.ts
│   │
│   └── types/
│       └── database.ts           # Types TypeScript Supabase
│
├── supabase/                     # Fichiers SQL
│   ├── schema.sql                # Schéma BDD
│   ├── seed.sql                  # Données initiales
│   └── storage.sql               # Config stockage
│
├── public/                       # Fichiers statiques
│   └── images/
│
├── middleware.ts                 # Middleware Next.js
├── tailwind.config.ts            # Config Tailwind
├── tsconfig.json                 # Config TypeScript
└── package.json
```

---

## Authentification

### Flux d'authentification

1. **Inscription par email** :
   - L'utilisateur remplit le formulaire
   - Supabase crée le compte et envoie un email de confirmation
   - Un profil est automatiquement créé via le trigger `handle_new_user`

2. **Connexion par email** :
   - Validation des credentials
   - Création de la session
   - Redirection vers la page d'accueil

3. **Connexion OAuth (Google)** :
   - Redirection vers le provider
   - Callback sur `/auth/callback`
   - Création automatique du profil

### Stores Zustand

```typescript
// src/store/authStore.ts
interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// src/store/notificationStore.ts
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}
```

### Server Actions

```typescript
// Connexion
signIn(formData: FormData)

// Inscription
signUp(formData: FormData)

// Déconnexion
signOut()

// Connexion Google
signInWithGoogle()

// Réinitialisation mot de passe
resetPassword(formData: FormData)
```

### Protection des routes

Le middleware (`middleware.ts`) protège automatiquement les routes suivantes :

- `/dashboard`
- `/profile`
- `/library`
- `/orders`

Les utilisateurs non connectés sont redirigés vers `/login`.

---

## Déploiement

### Vercel (recommandé)

1. Connectez votre repository à Vercel
2. Configurez les variables d'environnement
3. Déployez

```bash
# Build de production
pnpm build

# Test local du build
pnpm start
```

### VPS (Ubuntu/Contabo)

```bash
# Installation Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Installation pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Clone et installation
git clone <repository> /var/www/editions-germinale
cd /var/www/editions-germinale
pnpm install
pnpm build

# Installation PM2
npm install -g pm2

# Démarrage avec PM2
pm2 start npm --name "editions-germinale" -- start
pm2 save
pm2 startup
```

### Configuration Nginx

```nginx
server {
    listen 80;
    server_name editions-germinale.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL avec Certbot

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d editions-germinale.com
```

---

## Maintenance

### Sauvegardes

Supabase effectue des sauvegardes automatiques. Pour des sauvegardes manuelles :

```bash
# Export via pg_dump (depuis Supabase CLI)
supabase db dump -f backup.sql
```

### Monitoring

- **PM2** : `pm2 status`, `pm2 logs`
- **Supabase Dashboard** : Métriques, logs, usage
- **Vercel** : Analytics, Web Vitals

### Mises à jour

```bash
# Mise à jour des dépendances
pnpm update

# Vérification des vulnérabilités
pnpm audit
```

---

## Support

Pour toute question technique :
- Documentation Supabase : https://supabase.com/docs
- Documentation Next.js : https://nextjs.org/docs
- Documentation Tailwind : https://tailwindcss.com/docs
