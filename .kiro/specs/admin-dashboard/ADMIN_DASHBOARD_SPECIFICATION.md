# 📊 SPÉCIFICATION DASHBOARD ADMINISTRATEUR - ÉDITIONS GERMINALE

**Version** : 1.0  
**Date** : 2 Février 2026  
**Projet** : Dashboard Administrateur avec Système de Rôles  
**Objectif** : Créer un dashboard complet pour gérer la plateforme avec deux niveaux d'administration

---

## 🎯 OBJECTIF

Créer un dashboard administrateur professionnel permettant la gestion complète de la plateforme Éditions Germinale avec un système de permissions à deux niveaux :
- **Super Administrateur** : Contrôle total + gestion des administrateurs
- **Administrateur Simple** : Gestion du contenu selon les permissions accordées

---

## 📋 TABLE DES MATIÈRES

1. [Système de Rôles et Permissions](#1-système-de-rôles-et-permissions)
2. [Architecture du Dashboard](#2-architecture-du-dashboard)
3. [Pages et Fonctionnalités](#3-pages-et-fonctionnalités)
4. [Design et Interface](#4-design-et-interface)
5. [Sécurité](#5-sécurité)
6. [Schéma de Base de Données](#6-schéma-de-base-de-données)

---

## 1. SYSTÈME DE RÔLES ET PERMISSIONS

### 1.1 Hiérarchie des Rôles

```
SUPER_ADMIN (Super Administrateur)
    ↓
    ├── Tous les droits
    ├── Créer/Modifier/Supprimer des administrateurs
    ├── Gérer les permissions
    └── Accès à toutes les sections
    
ADMIN (Administrateur Simple)
    ↓
    ├── Droits limités selon permissions
    ├── Ne peut pas créer d'autres admins
    └── Accès aux sections autorisées uniquement
```


### 1.2 Permissions Détaillées

| Permission | Super Admin | Admin Simple |
|-----------|-------------|--------------|
| **Gestion Livres** |
| Voir liste livres | ✅ | ✅ (si autorisé) |
| Créer livre | ✅ | ✅ (si autorisé) |
| Modifier livre | ✅ | ✅ (si autorisé) |
| Supprimer livre | ✅ | ✅ (si autorisé) |
| **Gestion Collections** |
| Voir liste collections | ✅ | ✅ (si autorisé) |
| Créer collection | ✅ | ✅ (si autorisé) |
| Modifier collection | ✅ | ✅ (si autorisé) |
| Supprimer collection | ✅ | ✅ (si autorisé) |
| **Gestion Manuscrits** |
| Voir manuscrits | ✅ | ✅ (si autorisé) |
| Changer statut | ✅ | ✅ (si autorisé) |
| Ajouter notes | ✅ | ✅ (si autorisé) |
| Télécharger PDF | ✅ | ✅ (si autorisé) |
| **Gestion Utilisateurs** |
| Voir utilisateurs | ✅ | ✅ (si autorisé) |
| Modifier utilisateur | ✅ | ❌ |
| Supprimer utilisateur | ✅ | ❌ |
| **Gestion Administrateurs** |
| Voir admins | ✅ | ❌ |
| Créer admin | ✅ | ❌ |
| Modifier permissions | ✅ | ❌ |
| Supprimer admin | ✅ | ❌ |
| **Statistiques** |
| Voir dashboard | ✅ | ✅ |
| Voir revenus | ✅ | ✅ (si autorisé) |
| Exporter données | ✅ | ❌ |
| **Paramètres** |
| Modifier paramètres | ✅ | ❌ |
| Gérer paiements | ✅ | ❌ |

### 1.3 Modèle de Permissions

Les permissions sont stockées sous forme de flags binaires pour chaque admin :

```typescript
interface AdminPermissions {
  // Livres
  canViewBooks: boolean;
  canCreateBooks: boolean;
  canEditBooks: boolean;
  canDeleteBooks: boolean;
  
  // Collections
  canViewCollections: boolean;
  canCreateCollections: boolean;
  canEditCollections: boolean;
  canDeleteCollections: boolean;
  
  // Manuscrits
  canViewManuscripts: boolean;
  canManageManuscripts: boolean;
  
  // Utilisateurs
  canViewUsers: boolean;
  
  // Statistiques
  canViewRevenue: boolean;
}
```

---

## 2. ARCHITECTURE DU DASHBOARD

### 2.1 Structure des Routes

```
/admin
├── /                           # Dashboard Overview (tous)
├── /books                      # Gestion Livres
│   ├── /                       # Liste
│   ├── /new                    # Créer
│   └── /[id]/edit              # Modifier
├── /collections                # Gestion Collections
│   ├── /                       # Liste
│   ├── /new                    # Créer
│   └── /[id]/edit              # Modifier
├── /manuscripts                # Gestion Manuscrits
│   ├── /                       # Liste
│   └── /[id]                   # Détail
├── /users                      # Gestion Utilisateurs
│   └── /                       # Liste
├── /admins                     # Gestion Administrateurs (SUPER_ADMIN only)
│   ├── /                       # Liste
│   ├── /new                    # Créer
│   └── /[id]/permissions       # Gérer permissions
├── /orders                     # Gestion Commandes
│   └── /                       # Liste
├── /settings                   # Paramètres (SUPER_ADMIN only)
│   └── /                       # Configuration
└── /profile                    # Profil Admin
    └── /                       # Modifier profil
```


### 2.2 Layout Principal

Le dashboard utilise un layout avec sidebar fixe :

```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR (250px)    │    MAIN CONTENT                   │
│                     │                                    │
│  Logo               │  HEADER                            │
│  ─────────          │  ┌──────────────────────────────┐ │
│  📊 Dashboard       │  │ Titre Page    [Search] [👤]  │ │
│  📚 Livres          │  └──────────────────────────────┘ │
│  📖 Collections     │                                    │
│  📝 Manuscrits      │  CONTENT                           │
│  👥 Utilisateurs    │  ┌──────────────────────────────┐ │
│  🛒 Commandes       │  │                              │ │
│  ─────────          │  │  Contenu de la page          │ │
│  👨‍💼 Admins*        │  │                              │ │
│  ⚙️ Paramètres*     │  │                              │ │
│  ─────────          │  │                              │ │
│  👤 Mon Profil      │  │                              │ │
│  🚪 Déconnexion     │  └──────────────────────────────┘ │
│                     │                                    │
└─────────────────────────────────────────────────────────┘

* Visible uniquement pour SUPER_ADMIN
```

---

## 3. PAGES ET FONCTIONNALITÉS

### 3.1 Dashboard Overview (`/admin`)

**Accessible par** : Tous les admins

**Contenu** :

#### A. Cartes Statistiques (4 cartes en haut)

```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 👥 Users     │ │ 📚 Livres    │ │ 💰 Revenus   │ │ 📝 Manuscrits│
│              │ │              │ │              │ │              │
│   1,234      │ │     156      │ │  2.5M FCFA   │ │     23       │
│   +12%       │ │     +5%      │ │    +18%      │ │   En attente │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

**Données affichées** :
- Nombre total d'utilisateurs (+ variation %)
- Nombre total de livres actifs (+ variation %)
- Revenus totaux en FCFA (+ variation %) - *Si permission*
- Manuscrits en attente de review

#### B. Graphiques (2 colonnes)

**Colonne Gauche** :
- **Graphique Ventes par Mois** (Line Chart)
  - Axe X : 12 derniers mois
  - Axe Y : Nombre de ventes
  - Données : Achats complétés par mois

**Colonne Droite** :
- **Répartition Ventes** (Pie Chart)
  - Livres individuels vs Collections
  - Pourcentages et montants

#### C. Tableaux Récents (2 colonnes)

**Colonne Gauche** :
- **Dernières Commandes** (5 dernières)
  - Date
  - Client
  - Montant
  - Statut
  - Action : Voir détails

**Colonne Droite** :
- **Manuscrits Récents** (5 derniers)
  - Titre
  - Auteur
  - Date soumission
  - Statut
  - Action : Examiner

---

### 3.2 Gestion des Livres (`/admin/books`)

**Accessible par** : Admins avec permission `canViewBooks`

#### A. Page Liste (`/admin/books`)

**Header** :
```
┌─────────────────────────────────────────────────────────┐
│  Gestion des Livres                    [+ Ajouter Livre]│
└─────────────────────────────────────────────────────────┘
```

**Filtres et Recherche** :
```
┌─────────────────────────────────────────────────────────┐
│ [🔍 Rechercher par titre ou auteur...]                  │
│                                                          │
│ Collection: [Toutes ▼]  Statut: [Tous ▼]  Prix: [Tous ▼]│
└─────────────────────────────────────────────────────────┘
```

**Tableau** :
| Couverture | Titre | Auteur | Collection | Prix (FCFA) | Statut | Actions |
|------------|-------|--------|------------|-------------|--------|---------|
| [img] | Le Soleil... | A. Kourouma | Romans | 8,500 | ✅ Actif | [👁️] [✏️] [🗑️] |
| [img] | Une si... | M. Bâ | Romans | 7,500 | ✅ Actif | [👁️] [✏️] [🗑️] |

**Actions** :
- 👁️ Voir détails (modal)
- ✏️ Modifier (si `canEditBooks`)
- 🗑️ Supprimer (si `canDeleteBooks`) - avec confirmation

**Pagination** :
```
[← Précédent]  1  2  3  4  5  [Suivant →]
Affichage 1-20 sur 156 livres
```

#### B. Page Créer Livre (`/admin/books/new`)

**Accessible par** : Admins avec permission `canCreateBooks`

**Formulaire** :

```
┌─────────────────────────────────────────────────────────┐
│  Nouveau Livre                                           │
└─────────────────────────────────────────────────────────┘

Informations Générales
─────────────────────
Titre *
[_____________________________________________]

Auteur *
[_____________________________________________]

Description *
[_____________________________________________]
[_____________________________________________]
[_____________________________________________]

Slug (URL)
[_____________________________________________]
(Généré automatiquement depuis le titre)

Collection
[Sélectionner une collection ▼]

Prix (FCFA) *
[_____________________________________________]

Nombre de pages
[_____________________________________________]

Fichiers
────────
Couverture (Image) *
[📁 Choisir un fichier]
Formats acceptés : JPG, PNG, WebP (max 5MB)
Dimensions recommandées : 800x1200px

Fichier PDF *
[📁 Choisir un fichier]
Format accepté : PDF (max 50MB)

Statut
──────
☑ Livre actif (visible sur le site)

[Annuler]  [Enregistrer le livre]
```

**Validations** :
- Titre : 2-200 caractères
- Auteur : 2-100 caractères
- Description : 50-5000 caractères
- Prix : Nombre positif
- Couverture : Image obligatoire
- PDF : Fichier obligatoire

#### C. Page Modifier Livre (`/admin/books/[id]/edit`)

**Accessible par** : Admins avec permission `canEditBooks`

Même formulaire que la création, pré-rempli avec les données existantes.

**Fonctionnalités supplémentaires** :
- Prévisualisation des fichiers actuels
- Option de remplacer les fichiers
- Historique des modifications (date + admin)

---

### 3.3 Gestion des Collections (`/admin/collections`)

**Accessible par** : Admins avec permission `canViewCollections`

Structure similaire à la gestion des livres :

#### A. Page Liste (`/admin/collections`)

**Tableau** :
| Couverture | Nom | Description | Nb Livres | Prix (FCFA) | Statut | Actions |
|------------|-----|-------------|-----------|-------------|--------|---------|
| [img] | Romans Africains | Découvrez... | 12 | 50,000 | ✅ Actif | [👁️] [✏️] [🗑️] |

#### B. Formulaire Créer/Modifier Collection

```
Informations Générales
─────────────────────
Nom de la collection *
[_____________________________________________]

Slug (URL)
[_____________________________________________]

Description *
[_____________________________________________]
[_____________________________________________]

Prix de la collection (FCFA) *
[_____________________________________________]

Couverture *
[📁 Choisir un fichier]

Livres Inclus
─────────────
☑ Le Soleil des Indépendances
☑ Une si longue lettre
☐ L'Enfant noir
☐ Sous l'orage

[Sélectionner tous] [Désélectionner tous]

Statut
──────
☑ Collection active

[Annuler]  [Enregistrer]
```


---

### 3.4 Gestion des Manuscrits (`/admin/manuscripts`)

**Accessible par** : Admins avec permission `canViewManuscripts`

#### A. Page Liste (`/admin/manuscripts`)

**Filtres** :
```
Statut: [Tous ▼] [En attente] [En révision] [Accepté] [Rejeté]
Date: [Toutes ▼]
```

**Tableau** :
| Titre | Auteur | Email | Genre | Date Soumission | Statut | Actions |
|-------|--------|-------|-------|-----------------|--------|---------|
| Mon Roman | Jean Dupont | jean@... | Roman | 01/02/2026 | 🟡 En attente | [👁️] [📥] |
| Poésie | Marie K. | marie@... | Poésie | 28/01/2026 | 🔵 En révision | [👁️] [📥] |
| Histoire | Paul M. | paul@... | Essai | 25/01/2026 | ✅ Accepté | [👁️] [📥] |

**Légende Statuts** :
- 🟡 En attente (PENDING)
- 🔵 En révision (REVIEWING)
- ✅ Accepté (ACCEPTED)
- ❌ Rejeté (REJECTED)

#### B. Page Détail Manuscrit (`/admin/manuscripts/[id]`)

```
┌─────────────────────────────────────────────────────────┐
│  Manuscrit : "Mon Roman"                                 │
└─────────────────────────────────────────────────────────┘

Informations
────────────
Titre : Mon Roman
Auteur : Jean Dupont
Email : jean.dupont@email.com
Genre : Roman
Date de soumission : 01 février 2026, 14:30

Synopsis
────────
[Texte du synopsis sur plusieurs lignes...]

Fichier PDF
───────────
📄 mon-roman.pdf (2.5 MB)
[📥 Télécharger le PDF]

Gestion du Manuscrit
────────────────────
Statut actuel : 🟡 En attente

Changer le statut :
( ) En attente
(•) En révision
( ) Accepté
( ) Rejeté

Notes de l'administrateur (optionnel)
[_____________________________________________]
[_____________________________________________]
[_____________________________________________]

Ces notes seront envoyées par email à l'auteur si le manuscrit
est accepté ou rejeté.

[Annuler]  [Enregistrer les modifications]

Historique
──────────
• 01/02/2026 14:30 - Manuscrit soumis
• 01/02/2026 15:45 - Statut changé en "En révision" par Admin Jean
```

**Notifications Email** :
- Quand statut → ACCEPTED : Email de félicitations + notes admin
- Quand statut → REJECTED : Email de refus poli + notes admin (si fournies)

---

### 3.5 Gestion des Utilisateurs (`/admin/users`)

**Accessible par** : Admins avec permission `canViewUsers`

#### A. Page Liste (`/admin/users`)

**Filtres** :
```
Rôle: [Tous ▼] [Utilisateurs] [Admins]
Date inscription: [Toutes ▼]
[🔍 Rechercher par nom ou email...]
```

**Tableau** :
| Avatar | Nom | Email | Rôle | Date Inscription | Achats | Actions |
|--------|-----|-------|------|------------------|--------|---------|
| [👤] | Jean Dupont | jean@... | USER | 15/01/2026 | 3 | [👁️] [✏️]* |
| [👤] | Marie K. | marie@... | USER | 10/01/2026 | 7 | [👁️] [✏️]* |
| [👤] | Admin Paul | paul@... | ADMIN | 05/01/2026 | - | [👁️] [✏️]* |

*Modification réservée au SUPER_ADMIN

#### B. Modal Détail Utilisateur

```
┌─────────────────────────────────────────────────────────┐
│  Utilisateur : Jean Dupont                         [✕]  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Informations Générales                                 │
│  ─────────────────────                                  │
│  Nom : Jean Dupont                                      │
│  Email : jean.dupont@email.com                          │
│  Rôle : Utilisateur                                     │
│  Date d'inscription : 15 janvier 2026                   │
│  Email vérifié : ✅ Oui                                 │
│                                                          │
│  Statistiques d'Achat                                   │
│  ────────────────────                                   │
│  Nombre d'achats : 3                                    │
│  Montant total dépensé : 22,500 FCFA                    │
│  Dernier achat : 28 janvier 2026                        │
│                                                          │
│  Bibliothèque (3 livres)                                │
│  ────────────────────                                   │
│  • Le Soleil des Indépendances                          │
│  • Une si longue lettre                                 │
│  • L'Enfant noir                                        │
│                                                          │
│  [Voir l'historique complet]  [Fermer]                  │
└─────────────────────────────────────────────────────────┘
```

---

### 3.6 Gestion des Administrateurs (`/admin/admins`)

**Accessible par** : SUPER_ADMIN uniquement

#### A. Page Liste (`/admin/admins`)

**Header** :
```
┌─────────────────────────────────────────────────────────┐
│  Gestion des Administrateurs          [+ Créer un Admin]│
└─────────────────────────────────────────────────────────┘
```

**Tableau** :
| Avatar | Nom | Email | Type | Permissions | Date Création | Actions |
|--------|-----|-------|------|-------------|---------------|---------|
| [👤] | Super Admin | super@... | SUPER_ADMIN | Toutes | 01/01/2026 | - |
| [👤] | Admin Jean | jean@... | ADMIN | 8/12 | 15/01/2026 | [🔑] [✏️] [🗑️] |
| [👤] | Admin Marie | marie@... | ADMIN | 5/12 | 20/01/2026 | [🔑] [✏️] [🗑️] |

**Actions** :
- 🔑 Gérer permissions
- ✏️ Modifier
- 🗑️ Supprimer (avec confirmation)

#### B. Page Créer Admin (`/admin/admins/new`)

```
┌─────────────────────────────────────────────────────────┐
│  Créer un Administrateur                                 │
└─────────────────────────────────────────────────────────┘

Informations du Compte
──────────────────────
Nom complet *
[_____________________________________________]

Email *
[_____________________________________________]

Mot de passe temporaire *
[_____________________________________________]
(L'admin devra le changer à la première connexion)

Type d'Administrateur
─────────────────────
( ) Super Administrateur (tous les droits)
(•) Administrateur Simple (permissions personnalisées)

Permissions (si Admin Simple)
─────────────────────────────
Livres
  ☑ Voir les livres
  ☑ Créer des livres
  ☑ Modifier des livres
  ☐ Supprimer des livres

Collections
  ☑ Voir les collections
  ☑ Créer des collections
  ☑ Modifier des collections
  ☐ Supprimer des collections

Manuscrits
  ☑ Voir les manuscrits
  ☑ Gérer les manuscrits (changer statut, notes)

Utilisateurs
  ☑ Voir les utilisateurs
  ☐ Modifier les utilisateurs (réservé Super Admin)

Statistiques
  ☑ Voir les revenus

[Tout sélectionner] [Tout désélectionner]

[Annuler]  [Créer l'administrateur]
```

**Email de Bienvenue** :
Après création, l'admin reçoit un email avec :
- Ses identifiants
- Lien pour changer le mot de passe
- Liste de ses permissions

#### C. Page Gérer Permissions (`/admin/admins/[id]/permissions`)

Même interface que la création, mais pour modifier les permissions d'un admin existant.

**Historique des Modifications** :
```
Historique des Permissions
──────────────────────────
• 25/01/2026 10:30 - Permission "Supprimer livres" ajoutée par Super Admin
• 20/01/2026 14:15 - Permission "Voir revenus" retirée par Super Admin
• 15/01/2026 09:00 - Compte créé par Super Admin
```

---

### 3.7 Gestion des Commandes (`/admin/orders`)

**Accessible par** : Tous les admins

#### A. Page Liste (`/admin/orders`)

**Filtres** :
```
Statut: [Tous ▼] [En attente] [Complété] [Échoué] [Remboursé]
Type: [Tous ▼] [Livre] [Collection]
Date: [Toutes ▼]
```

**Tableau** :
| ID | Client | Type | Article | Montant (FCFA) | Statut | Date | Actions |
|----|--------|------|---------|----------------|--------|------|---------|
| #1234 | Jean D. | Livre | Le Soleil... | 8,500 | ✅ Complété | 01/02 | [👁️] |
| #1233 | Marie K. | Collection | Romans | 50,000 | ✅ Complété | 31/01 | [👁️] |
| #1232 | Paul M. | Livre | Une si... | 7,500 | 🟡 En attente | 30/01 | [👁️] |

**Modal Détail Commande** :
```
┌─────────────────────────────────────────────────────────┐
│  Commande #1234                                    [✕]  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Client                                                  │
│  ──────                                                  │
│  Nom : Jean Dupont                                      │
│  Email : jean.dupont@email.com                          │
│                                                          │
│  Détails de la Commande                                 │
│  ──────────────────────                                 │
│  Type : Achat de livre                                  │
│  Article : Le Soleil des Indépendances                  │
│  Montant : 8,500 FCFA                                   │
│  Statut : ✅ Complété                                   │
│  Date : 01 février 2026, 14:30                          │
│                                                          │
│  Paiement                                               │
│  ────────                                               │
│  Méthode : FedaPay                                      │
│  Transaction ID : fedapay_abc123xyz                     │
│  Statut FedaPay : approved                              │
│                                                          │
│  [Fermer]                                               │
└─────────────────────────────────────────────────────────┘
```

---

### 3.8 Paramètres (`/admin/settings`)

**Accessible par** : SUPER_ADMIN uniquement

```
┌─────────────────────────────────────────────────────────┐
│  Paramètres de la Plateforme                             │
└─────────────────────────────────────────────────────────┘

Informations Générales
──────────────────────
Nom du site
[Éditions Germinale_____________________________]

Email de contact
[contact@editiongerminale.com__________________]

Téléphone
[+228 XX XX XX XX_______________________________]

Paiement (FedaPay)
──────────────────
Mode
(•) Sandbox (Test)
( ) Production (Live)

Clé Publique
[pk_sandbox_xxxxxxxxxxxxx_______________________]

Clé Secrète
[sk_sandbox_xxxxxxxxxxxxx_______________________]

Email (Resend)
──────────────
Clé API
[re_xxxxxxxxxxxxx_______________________________]

Email expéditeur
[noreply@editiongerminale.com__________________]

Stockage (Supabase)
───────────────────
URL Projet
[https://xxxxx.supabase.co_____________________]

Clé Anonyme
[eyJhbGc...____________________________________]

Clé Service Role
[eyJhbGc...____________________________________]

[Annuler]  [Enregistrer les paramètres]
```

---

### 3.9 Mon Profil (`/admin/profile`)

**Accessible par** : Tous les admins

```
┌─────────────────────────────────────────────────────────┐
│  Mon Profil                                              │
└─────────────────────────────────────────────────────────┘

Informations Personnelles
─────────────────────────
Photo de profil
[👤]  [📁 Changer la photo]

Nom complet
[Jean Dupont____________________________________]

Email
[jean.dupont@editiongerminale.com______________]

Rôle : Administrateur Simple

Mes Permissions
───────────────
✅ Voir les livres
✅ Créer des livres
✅ Modifier des livres
❌ Supprimer des livres
✅ Voir les collections
✅ Créer des collections
...

Changer le Mot de Passe
────────────────────────
Mot de passe actuel
[_____________________________________________]

Nouveau mot de passe
[_____________________________________________]

Confirmer le nouveau mot de passe
[_____________________________________________]

[Annuler]  [Enregistrer les modifications]
```


---

## 4. DESIGN ET INTERFACE

### 4.1 Palette de Couleurs

Le dashboard utilise une palette professionnelle et moderne :

```css
/* Couleurs Principales */
--admin-primary: #2563EB;      /* Bleu principal */
--admin-primary-dark: #1E40AF; /* Bleu foncé (hover) */
--admin-primary-light: #DBEAFE;/* Bleu clair (backgrounds) */

/* Couleurs Secondaires */
--admin-success: #10B981;      /* Vert (succès) */
--admin-warning: #F59E0B;      /* Orange (attention) */
--admin-danger: #EF4444;       /* Rouge (danger) */
--admin-info: #3B82F6;         /* Bleu info */

/* Couleurs Neutres */
--admin-gray-50: #F9FAFB;      /* Background très clair */
--admin-gray-100: #F3F4F6;     /* Background clair */
--admin-gray-200: #E5E7EB;     /* Bordures */
--admin-gray-300: #D1D5DB;     /* Bordures foncées */
--admin-gray-400: #9CA3AF;     /* Texte désactivé */
--admin-gray-500: #6B7280;     /* Texte secondaire */
--admin-gray-600: #4B5563;     /* Texte normal */
--admin-gray-700: #374151;     /* Texte important */
--admin-gray-800: #1F2937;     /* Texte très foncé */
--admin-gray-900: #111827;     /* Texte noir */

/* Couleurs de Statut */
--status-pending: #F59E0B;     /* En attente */
--status-reviewing: #3B82F6;   /* En révision */
--status-completed: #10B981;   /* Complété */
--status-failed: #EF4444;      /* Échoué */
--status-active: #10B981;      /* Actif */
--status-inactive: #6B7280;    /* Inactif */
```

### 4.2 Typographie

```css
/* Polices */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;

/* Tailles */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Poids */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 4.3 Composants UI

#### A. Cartes Statistiques (StatCard)

```
┌────────────────────────────────┐
│ 👥 Utilisateurs                │
│                                │
│ 1,234                          │
│ +12% ce mois                   │
└────────────────────────────────┘
```

**Variantes de couleur** :
- Bleu : Utilisateurs, Livres
- Vert : Revenus, Ventes
- Orange : Manuscrits en attente
- Violet : Collections

#### B. Tableaux de Données (DataTable)

**Caractéristiques** :
- Header fixe lors du scroll
- Tri par colonne (clic sur header)
- Pagination en bas
- Actions par ligne (dropdown)
- Sélection multiple (checkbox)
- Responsive (scroll horizontal sur mobile)

**États des lignes** :
- Hover : Background gris clair
- Sélectionnée : Background bleu clair
- Désactivée : Opacité 50%

#### C. Formulaires

**Champs de saisie** :
```css
/* Input normal */
border: 1px solid #E5E7EB;
border-radius: 8px;
padding: 10px 14px;
font-size: 14px;

/* Input focus */
border-color: #2563EB;
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);

/* Input erreur */
border-color: #EF4444;
```

**Boutons** :
```css
/* Bouton primaire */
background: #2563EB;
color: white;
padding: 10px 20px;
border-radius: 8px;
font-weight: 500;

/* Bouton primaire hover */
background: #1E40AF;

/* Bouton secondaire */
background: white;
border: 1px solid #E5E7EB;
color: #374151;

/* Bouton danger */
background: #EF4444;
color: white;
```

#### D. Modals

```
┌─────────────────────────────────────────────────────────┐
│  Titre du Modal                                    [✕]  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Contenu du modal...                                    │
│                                                          │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                              [Annuler]  [Confirmer]     │
└─────────────────────────────────────────────────────────┘
```

**Caractéristiques** :
- Overlay semi-transparent (background: rgba(0,0,0,0.5))
- Animation d'entrée/sortie (fade + scale)
- Fermeture par clic sur overlay ou touche Escape
- Focus trap (navigation clavier)

#### E. Notifications Toast

```
┌────────────────────────────────────────┐
│ ✅ Livre créé avec succès !            │
└────────────────────────────────────────┘
```

**Types** :
- Succès : Vert avec ✅
- Erreur : Rouge avec ❌
- Avertissement : Orange avec ⚠️
- Info : Bleu avec ℹ️

**Position** : Top-right
**Durée** : 3 secondes (auto-dismiss)

#### F. Sidebar Navigation

```css
/* Item normal */
padding: 12px 16px;
color: #6B7280;
border-radius: 8px;

/* Item hover */
background: #F3F4F6;
color: #374151;

/* Item actif */
background: #DBEAFE;
color: #2563EB;
font-weight: 500;
```

**Icônes** : Lucide React (24px)

### 4.4 Responsive Design

#### Breakpoints

```css
/* Mobile */
@media (max-width: 640px) {
  /* Sidebar devient drawer mobile */
  /* Tableaux en mode cards */
  /* Grilles en 1 colonne */
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  /* Sidebar réduite (icônes seulement) */
  /* Grilles en 2 colonnes */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Sidebar complète */
  /* Grilles en 3-4 colonnes */
}
```

#### Mobile Adaptations

**Sidebar** :
- Desktop : Fixe à gauche (250px)
- Mobile : Drawer qui s'ouvre/ferme (hamburger menu)

**Tableaux** :
- Desktop : Tableau classique
- Mobile : Cards empilées

**Formulaires** :
- Desktop : 2 colonnes
- Mobile : 1 colonne

---

## 5. SÉCURITÉ

### 5.1 Authentification

**Middleware de Protection** :

```typescript
// middleware.ts
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "ADMIN" || token?.role === "SUPER_ADMIN";
    const isSuperAdmin = token?.role === "SUPER_ADMIN";
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isSuperAdminRoute = 
      req.nextUrl.pathname.startsWith("/admin/admins") ||
      req.nextUrl.pathname.startsWith("/admin/settings");

    // Vérifier accès admin
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Vérifier accès super admin
    if (isSuperAdminRoute && !isSuperAdmin) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  }
);
```

### 5.2 Vérification des Permissions

**Hook personnalisé** :

```typescript
// hooks/usePermissions.ts
export function usePermissions() {
  const { data: session } = useSession();
  
  const hasPermission = (permission: string): boolean => {
    if (session?.user?.role === "SUPER_ADMIN") {
      return true; // Super admin a toutes les permissions
    }
    
    if (session?.user?.role === "ADMIN") {
      return session.user.permissions?.[permission] === true;
    }
    
    return false;
  };
  
  return { hasPermission };
}
```

**Utilisation dans les composants** :

```tsx
const { hasPermission } = usePermissions();

{hasPermission("canCreateBooks") && (
  <button>Créer un livre</button>
)}
```

### 5.3 Protection des API Routes

**Pattern obligatoire** :

```typescript
// app/api/admin/books/route.ts
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  // Vérifier authentification
  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  
  // Vérifier rôle admin
  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  
  // Vérifier permission spécifique
  if (session.user.role === "ADMIN" && !session.user.permissions?.canCreateBooks) {
    return NextResponse.json({ error: "Permission refusée" }, { status: 403 });
  }
  
  // Logique métier...
}
```

### 5.4 Logs d'Audit

Toutes les actions importantes sont loguées :

```typescript
interface AuditLog {
  id: string;
  adminId: string;
  action: string;        // "CREATE_BOOK", "DELETE_USER", etc.
  resource: string;      // "Book", "User", etc.
  resourceId: string;
  details: object;       // Données modifiées
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}
```

**Actions loguées** :
- Création/Modification/Suppression de livres
- Création/Modification/Suppression de collections
- Changement de statut de manuscrits
- Création/Modification/Suppression d'admins
- Modification de permissions
- Modification de paramètres

---

## 6. SCHÉMA DE BASE DE DONNÉES

### 6.1 Modèle User (Étendu)

```prisma
enum UserRole {
  USER
  ADMIN
  SUPER_ADMIN
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String
  role          UserRole  @default(USER)
  emailVerified DateTime?
  image         String?
  
  // Permissions (pour ADMIN uniquement)
  permissions   Json?     // AdminPermissions
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  purchases     Purchase[]
  manuscripts   Manuscript[]
  readingProgress ReadingProgress[]
  auditLogs     AuditLog[]
  
  @@index([email])
  @@index([role])
}
```

### 6.2 Modèle AuditLog

```prisma
model AuditLog {
  id          String   @id @default(cuid())
  adminId     String
  admin       User     @relation(fields: [adminId], references: [id], onDelete: Cascade)
  
  action      String   // "CREATE_BOOK", "DELETE_USER", etc.
  resource    String   // "Book", "User", "Collection", etc.
  resourceId  String?
  details     Json?    // Données modifiées
  
  ipAddress   String?
  userAgent   String?
  
  createdAt   DateTime @default(now())
  
  @@index([adminId])
  @@index([action])
  @@index([resource])
  @@index([createdAt])
}
```

### 6.3 Structure JSON des Permissions

```typescript
interface AdminPermissions {
  // Livres
  canViewBooks: boolean;
  canCreateBooks: boolean;
  canEditBooks: boolean;
  canDeleteBooks: boolean;
  
  // Collections
  canViewCollections: boolean;
  canCreateCollections: boolean;
  canEditCollections: boolean;
  canDeleteCollections: boolean;
  
  // Manuscrits
  canViewManuscripts: boolean;
  canManageManuscripts: boolean;
  
  // Utilisateurs
  canViewUsers: boolean;
  
  // Statistiques
  canViewRevenue: boolean;
}
```

**Exemple de stockage** :

```json
{
  "canViewBooks": true,
  "canCreateBooks": true,
  "canEditBooks": true,
  "canDeleteBooks": false,
  "canViewCollections": true,
  "canCreateCollections": true,
  "canEditCollections": true,
  "canDeleteCollections": false,
  "canViewManuscripts": true,
  "canManageManuscripts": true,
  "canViewUsers": true,
  "canViewRevenue": false
}
```

---

## 7. FLUX DE TRAVAIL

### 7.1 Création d'un Admin par le Super Admin

```
1. Super Admin → /admin/admins/new
2. Remplit le formulaire (nom, email, permissions)
3. Soumet le formulaire
4. API crée l'admin en DB avec mot de passe hashé
5. Email envoyé à l'admin avec identifiants
6. Admin reçoit email et se connecte
7. Admin forcé de changer son mot de passe
8. Admin accède au dashboard avec ses permissions
```

### 7.2 Gestion d'un Manuscrit

```
1. Auteur soumet manuscrit sur le site public
2. Manuscrit créé avec statut PENDING
3. Admin avec permission → /admin/manuscripts
4. Admin voit le manuscrit en attente
5. Admin clique pour voir détails
6. Admin télécharge et lit le PDF
7. Admin change statut → REVIEWING
8. Après évaluation, Admin change statut → ACCEPTED ou REJECTED
9. Admin ajoute des notes (optionnel)
10. Admin sauvegarde
11. Email automatique envoyé à l'auteur
```

### 7.3 Création d'un Livre

```
1. Admin avec permission → /admin/books/new
2. Remplit informations (titre, auteur, description, prix)
3. Upload couverture (image)
4. Upload fichier PDF
5. Sélectionne collection (optionnel)
6. Coche "Livre actif"
7. Soumet le formulaire
8. API upload fichiers vers Supabase Storage
9. API crée livre en DB
10. Log d'audit créé
11. Livre visible sur le site public
```

---

## 8. CHECKLIST DE DÉVELOPPEMENT

### Phase 1 : Base de Données et Auth
- [ ] Étendre modèle User avec rôles ADMIN et SUPER_ADMIN
- [ ] Ajouter champ permissions (JSON) au modèle User
- [ ] Créer modèle AuditLog
- [ ] Migrer la base de données
- [ ] Mettre à jour NextAuth config pour gérer les rôles
- [ ] Créer middleware de protection admin

### Phase 2 : Layout et Navigation
- [ ] Créer AdminLayout avec sidebar
- [ ] Créer composant Sidebar avec navigation
- [ ] Implémenter responsive (drawer mobile)
- [ ] Créer Header admin avec search et profil
- [ ] Créer hook usePermissions

### Phase 3 : Dashboard Overview
- [ ] Créer page /admin
- [ ] Créer composant StatCard
- [ ] Implémenter statistiques (users, books, revenue, manuscripts)
- [ ] Créer graphique ventes (Recharts)
- [ ] Créer tableau dernières commandes
- [ ] Créer tableau manuscrits récents

### Phase 4 : Gestion Livres
- [ ] Créer page liste /admin/books
- [ ] Créer composant DataTable réutilisable
- [ ] Implémenter recherche et filtres
- [ ] Créer page /admin/books/new
- [ ] Créer formulaire création livre
- [ ] Implémenter upload fichiers
- [ ] Créer page /admin/books/[id]/edit
- [ ] Implémenter suppression avec confirmation

### Phase 5 : Gestion Collections
- [ ] Créer page liste /admin/collections
- [ ] Créer page /admin/collections/new
- [ ] Créer formulaire avec sélection multiple livres
- [ ] Créer page /admin/collections/[id]/edit
- [ ] Implémenter suppression

### Phase 6 : Gestion Manuscrits
- [ ] Créer page liste /admin/manuscripts
- [ ] Implémenter filtres par statut
- [ ] Créer page détail /admin/manuscripts/[id]
- [ ] Implémenter changement de statut
- [ ] Implémenter téléchargement PDF
- [ ] Créer système de notifications email

### Phase 7 : Gestion Utilisateurs
- [ ] Créer page liste /admin/users
- [ ] Créer modal détail utilisateur
- [ ] Afficher statistiques d'achat
- [ ] Afficher bibliothèque utilisateur

### Phase 8 : Gestion Admins (Super Admin)
- [ ] Créer page liste /admin/admins
- [ ] Créer page /admin/admins/new
- [ ] Implémenter création admin avec permissions
- [ ] Créer page /admin/admins/[id]/permissions
- [ ] Implémenter modification permissions
- [ ] Implémenter suppression admin
- [ ] Créer email de bienvenue admin

### Phase 9 : Gestion Commandes
- [ ] Créer page liste /admin/orders
- [ ] Implémenter filtres
- [ ] Créer modal détail commande

### Phase 10 : Paramètres (Super Admin)
- [ ] Créer page /admin/settings
- [ ] Formulaire paramètres généraux
- [ ] Formulaire paramètres paiement
- [ ] Formulaire paramètres email
- [ ] Formulaire paramètres stockage

### Phase 11 : Profil Admin
- [ ] Créer page /admin/profile
- [ ] Formulaire modification profil
- [ ] Upload photo de profil
- [ ] Changement mot de passe
- [ ] Affichage permissions

### Phase 12 : Sécurité et Logs
- [ ] Implémenter système de logs d'audit
- [ ] Créer API routes protégées
- [ ] Vérifier permissions sur toutes les actions
- [ ] Tester accès non autorisés

### Phase 13 : Tests et Optimisation
- [ ] Tester tous les flux utilisateur
- [ ] Tester responsive mobile/tablet
- [ ] Optimiser performances (lazy loading, pagination)
- [ ] Tester sécurité (injections, XSS, CSRF)

---

## 9. NOTES POUR LE DESIGN

### 9.1 Inspiration Visuelle

Le dashboard doit s'inspirer de :
- **Vercel Dashboard** : Clean, moderne, espacé
- **Stripe Dashboard** : Professionnel, données claires
- **Linear** : Minimaliste, rapide, élégant

### 9.2 Principes de Design

1. **Clarté** : Chaque élément a un but précis
2. **Hiérarchie** : Informations importantes en premier
3. **Cohérence** : Même style partout
4. **Feedback** : Toujours confirmer les actions
5. **Performance** : Chargement rapide, animations fluides

### 9.3 Accessibilité

- Contraste minimum WCAG AA (4.5:1)
- Navigation clavier complète
- Labels ARIA sur tous les éléments interactifs
- Focus visible sur tous les éléments
- Textes alternatifs sur images

### 9.4 Animations

```css
/* Transitions douces */
transition: all 0.2s ease-in-out;

/* Hover cards */
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(0,0,0,0.1);

/* Modal entrée */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

---

## 10. CONCLUSION

Ce document fournit une spécification complète pour le dashboard administrateur d'Éditions Germinale. Il couvre :

✅ Système de rôles à deux niveaux (Super Admin / Admin Simple)  
✅ Gestion granulaire des permissions  
✅ Interface complète pour toutes les fonctionnalités  
✅ Design professionnel et moderne  
✅ Sécurité renforcée avec logs d'audit  
✅ Responsive et accessible  

**Prochaines étapes** :
1. Valider ce document avec l'équipe
2. Créer les maquettes de design basées sur ces spécifications
3. Commencer le développement phase par phase
4. Tester chaque fonctionnalité avant de passer à la suivante

---

**Document créé le** : 2 Février 2026  
**Dernière mise à jour** : 2 Février 2026  
**Version** : 1.0
