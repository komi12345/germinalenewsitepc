# 🎨 DESIGN BRIEFS - DASHBOARD ADMINISTRATEUR

**Projet** : Éditions Germinale - Dashboard Admin  
**Date** : 2 Février 2026  
**Objectif** : Briefs de design pour Google Stitch

---

## 📁 STRUCTURE DES FICHIERS

Ces fichiers contiennent les spécifications détaillées pour créer les designs du dashboard administrateur avec Google Stitch.

### Liste des Fichiers (dans l'ordre de création)

```
design-briefs/
├── README.md                       # Ce fichier (structure et guide)
├── 00-page-connexion.md           # Page de connexion admin
├── 01-layout-principal.md         # Sidebar + Header + Footer (structure globale)
├── 02-dashboard-overview.md       # Page d'accueil avec statistiques
├── 03-gestion-livres.md          # Gestion des livres (Liste + Créer + Modifier)
├── 04-gestion-collections.md     # Gestion des collections (Liste + Créer + Modifier)
├── 05-gestion-manuscrits.md      # Gestion des manuscrits (Liste + Détail)
├── 06-gestion-utilisateurs.md    # Gestion des utilisateurs (Liste + Modal)
├── 07-gestion-admins.md          # Gestion des admins (Liste + Créer + Permissions)
├── 08-gestion-commandes.md       # Gestion des commandes (Liste + Modal)
├── 09-parametres.md              # Paramètres système (Super Admin only)
└── 10-profil-admin.md            # Profil personnel de l'admin
```

---

## 🎯 OBJECTIF DE CHAQUE FICHIER

### 00-page-connexion.md
**Page** : `/admin/login`  
**Contenu** : Formulaire de connexion unique pour tous les admins (Super Admin et Admin Simple)  
**Éléments** : Email, Mot de passe, Bouton de connexion

### 01-layout-principal.md
**Page** : Structure globale du dashboard  
**Contenu** : Sidebar avec navigation, Header avec recherche et profil, Footer  
**Important** : Affichage conditionnel des éléments selon le rôle (Super Admin vs Admin Simple)

### 02-dashboard-overview.md
**Page** : `/admin`  
**Contenu** : Page d'accueil avec statistiques, graphiques, tableaux récents  
**Éléments** : 4 cartes stats, 2 graphiques, 2 tableaux (commandes + manuscrits)

### 03-gestion-livres.md
**Page** : `/admin/books`  
**Contenu** : 3 vues en 1 fichier
- Vue 1 : Liste des livres avec tableau, filtres, recherche
- Vue 2 : Formulaire de création de livre
- Vue 3 : Formulaire de modification de livre

### 04-gestion-collections.md
**Page** : `/admin/collections`  
**Contenu** : 3 vues en 1 fichier
- Vue 1 : Liste des collections
- Vue 2 : Formulaire de création de collection
- Vue 3 : Formulaire de modification de collection

### 05-gestion-manuscrits.md
**Page** : `/admin/manuscripts`  
**Contenu** : 2 vues en 1 fichier
- Vue 1 : Liste des manuscrits avec filtres par statut
- Vue 2 : Page détail manuscrit avec changement de statut

### 06-gestion-utilisateurs.md
**Page** : `/admin/users`  
**Contenu** : 2 vues en 1 fichier
- Vue 1 : Liste des utilisateurs avec filtres
- Vue 2 : Modal détail utilisateur avec statistiques d'achat

### 07-gestion-admins.md
**Page** : `/admin/admins` (Super Admin uniquement)  
**Contenu** : 3 vues en 1 fichier
- Vue 1 : Liste des administrateurs
- Vue 2 : Formulaire de création d'admin avec permissions
- Vue 3 : Page de gestion des permissions d'un admin

### 08-gestion-commandes.md
**Page** : `/admin/orders`  
**Contenu** : 2 vues en 1 fichier
- Vue 1 : Liste des commandes avec filtres
- Vue 2 : Modal détail commande

### 09-parametres.md
**Page** : `/admin/settings` (Super Admin uniquement)  
**Contenu** : Formulaire de configuration système (FedaPay, Resend, Supabase)

### 10-profil-admin.md
**Page** : `/admin/profile`  
**Contenu** : Formulaire de modification du profil personnel, changement de mot de passe

---

## 🎨 PALETTE DE COULEURS GLOBALE

```css
/* Couleurs Principales */
--admin-primary: #2563EB;           /* Bleu principal */
--admin-primary-dark: #1E40AF;      /* Bleu foncé (hover) */
--admin-primary-light: #DBEAFE;     /* Bleu clair (backgrounds) */

/* Couleurs Secondaires */
--admin-success: #10B981;           /* Vert (succès) */
--admin-warning: #F59E0B;           /* Orange (attention) */
--admin-danger: #EF4444;            /* Rouge (danger) */
--admin-info: #3B82F6;              /* Bleu info */

/* Couleurs Neutres */
--admin-gray-50: #F9FAFB;           /* Background très clair */
--admin-gray-100: #F3F4F6;          /* Background clair */
--admin-gray-200: #E5E7EB;          /* Bordures */
--admin-gray-600: #4B5563;          /* Texte normal */
--admin-gray-900: #111827;          /* Texte noir */
```

---

## 📐 PRINCIPES DE DESIGN

### 1. Cohérence
- Même style de boutons partout
- Même espacement (système 8px)
- Même typographie (Inter)

### 2. Hiérarchie Visuelle
- Titres en gras et grands
- Informations importantes en premier
- Actions principales en bleu

### 3. Feedback Utilisateur
- Toasts pour confirmer les actions
- États de chargement visibles
- Messages d'erreur clairs

### 4. Responsive
- Desktop : Sidebar fixe (250px)
- Tablet : Sidebar réduite (icônes)
- Mobile : Sidebar en drawer

### 5. Accessibilité
- Contraste minimum WCAG AA
- Labels sur tous les champs
- Navigation clavier

---

## 🚀 UTILISATION AVEC GOOGLE STITCH

### Processus Recommandé

1. **Lire le fichier** : Commencer par `00-page-connexion.md`
2. **Copier le contenu** : Copier tout le contenu du fichier
3. **Donner à Google Stitch** : Coller dans Google Stitch avec cette instruction :

```
Crée le design de cette page en respectant SCRUPULEUSEMENT 
toutes les spécifications fournies ci-dessous. Ne modifie 
aucun élément, couleur, ou disposition sans mon accord.

[COLLER LE CONTENU DU FICHIER MD ICI]
```

4. **Vérifier le résultat** : S'assurer que tout correspond
5. **Passer au suivant** : Répéter avec `01-layout-principal.md`, etc.

---

## ⚠️ NOTES IMPORTANTES

### Affichage Conditionnel (Sidebar)

Le sidebar doit s'adapter selon le rôle :

**Super Admin voit** :
- Tous les éléments
- Section "Admins"
- Section "Paramètres"

**Admin Simple voit** :
- Éléments selon ses permissions
- PAS de section "Admins"
- PAS de section "Paramètres"

### Sécurité

- Ne jamais afficher les mots de passe
- Masquer les clés API dans les paramètres
- Confirmer les actions de suppression

### Performance

- Pagination sur tous les tableaux
- Lazy loading des images
- Optimisation des graphiques

---

## 📞 CONTACT

Pour toute question sur ces spécifications, se référer au document principal :
`.kiro/specs/admin-dashboard/ADMIN_DASHBOARD_SPECIFICATION.md`

---

**Prêt à commencer ?** Ouvre le premier fichier `00-page-connexion.md` ! 🎨
