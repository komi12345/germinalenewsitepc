# 🏗️ LAYOUT PRINCIPAL DU DASHBOARD

**Fichier** : 01-layout-principal.md  
**Route** : `/admin/*` (toutes les pages admin)  
**Objectif** : Structure globale avec Sidebar, Header et Footer (présente sur toutes les pages)

---

## ⚠️ INSTRUCTION IMPORTANTE POUR GOOGLE STITCH

**RESPECTER SCRUPULEUSEMENT** toutes les spécifications ci-dessous. Ce layout est la BASE de tout le dashboard. Chaque élément doit être exactement comme décrit. L'affichage conditionnel des éléments selon le rôle est CRUCIAL.

---

## 🎯 OBJECTIF DU LAYOUT

Ce layout est la structure permanente du dashboard administrateur. Il contient :
- **Sidebar** : Navigation principale (fixe à gauche)
- **Header** : Barre supérieure avec titre, recherche et profil
- **Footer** : Pied de page avec copyright
- **Zone de contenu** : Espace central qui change selon la page

**Important** : Le Sidebar affiche différents éléments selon le rôle (Super Admin vs Admin Simple)

---

## 🎨 DESIGN VISUEL GLOBAL

### Layout Desktop (> 1024px)

```
┌─────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (250px)    │  HEADER (full width - 250px)                   │
│                    ├─────────────────────────────────────────────────┤
│ [Logo]             │                                                 │
│                    │                                                 │
│ 📊 Dashboard       │                                                 │
│ 📚 Livres          │                                                 │
│ 📖 Collections     │         ZONE DE CONTENU                         │
│ 📝 Manuscrits      │         (Change selon la page)                  │
│ 👥 Utilisateurs    │                                                 │
│ � Commandes       │                                                 │
│ ─────────          │                                                 │
│ 👨‍💼 Admins*        │                                                 │
│ ⚙️ Paramètres*     │                                                 │
│ ─────────          │                                                 │
│ 👤 Mon Profil      │                                                 │
│ 🚪 Déconnexion     │                                                 │
│                    │                                                 │
│                    ├─────────────────────────────────────────────────┤
│                    │  FOOTER                                         │
└─────────────────────────────────────────────────────────────────────┘

* Visible uniquement pour SUPER_ADMIN
```

---

## 📐 SPÉCIFICATIONS DÉTAILLÉES

## 1. SIDEBAR (Navigation Principale)

### Dimensions et Style

```css
width: 250px;
height: 100vh;
position: fixed;
left: 0;
top: 0;
background: #FFFFFF;
border-right: 1px solid #E5E7EB;
display: flex;
flex-direction: column;
z-index: 40;
```

### Structure du Sidebar

```
┌──────────────────────────┐
│                          │
│    [LOGO + NOM]          │  ← Section Logo
│                          │
├──────────────────────────┤
│                          │
│  📊 Dashboard            │  ← Navigation Principale
│  📚 Livres               │
│  📖 Collections          │
│  📝 Manuscrits           │
│  👥 Utilisateurs         │
│  🛒 Commandes            │
│                          │
│  ─────────────           │  ← Séparateur
│                          │
│  👨‍💼 Admins*             │  ← Section Super Admin
│  ⚙️ Paramètres*          │
│                          │
│  ─────────────           │  ← Séparateur
│                          │
│  👤 Mon Profil           │  ← Section Utilisateur
│  🚪 Déconnexion          │
│                          │
└──────────────────────────┘

* Visible uniquement si role === "SUPER_ADMIN"
```

---

### A. SECTION LOGO (en haut)

**Container** :
```css
padding: 24px 20px;
border-bottom: 1px solid #E5E7EB;
```

**Logo** :
- Taille : 40px x 40px
- Image : Logo Éditions Germinale (or sur fond noir circulaire)
- Position : Inline avec le texte

**Texte** :
```
Texte : "Éditions Germinale"
Font : Inter, Bold
Taille : 16px
Couleur : #111827
Margin-left : 12px (du logo)
```

**Layout** :
```
[🟡 Logo]  Éditions Germinale
```

---

### B. NAVIGATION PRINCIPALE

**Container** :
```css
padding: 16px 12px;
flex: 1;
overflow-y: auto;
```

**Item de Navigation (Normal)** :
```css
display: flex;
align-items: center;
padding: 12px 16px;
margin-bottom: 4px;
border-radius: 8px;
cursor: pointer;
transition: all 0.2s;
text-decoration: none;
```

**État Normal** :
```css
background: transparent;
color: #6B7280;
```

**État Hover** :
```css
background: #F3F4F6;
color: #374151;
```

**État Actif (page courante)** :
```css
background: #DBEAFE;
color: #2563EB;
font-weight: 600;
```

**Structure d'un Item** :
```
[Icône]  Texte
  ↓        ↓
 24px    14px, Medium
```

**Icônes** :
- Taille : 20px x 20px
- Couleur : Hérite du texte
- Margin-right : 12px
- Bibliothèque : Lucide React

---

### C. LISTE DES ITEMS DE NAVIGATION

#### Navigation Toujours Visible

```
📊 Dashboard          → /admin
📚 Livres             → /admin/books (si canViewBooks)
📖 Collections        → /admin/collections (si canViewCollections)
📝 Manuscrits         → /admin/manuscripts (si canViewManuscripts)
👥 Utilisateurs       → /admin/users (si canViewUsers)
🛒 Commandes          → /admin/orders
```

**Séparateur** :
```css
height: 1px;
background: #E5E7EB;
margin: 12px 16px;
```

#### Navigation Super Admin Uniquement

```
👨‍💼 Admins            → /admin/admins
⚙️ Paramètres         → /admin/settings
```

**Condition d'affichage** :
```javascript
{user.role === "SUPER_ADMIN" && (
  <>
    <NavItem>Admins</NavItem>
    <NavItem>Paramètres</NavItem>
  </>
)}
```

**Séparateur** :
```css
height: 1px;
background: #E5E7EB;
margin: 12px 16px;
```

#### Navigation Utilisateur (toujours visible)

```
👤 Mon Profil         → /admin/profile
🚪 Déconnexion        → Action de déconnexion
```

---

### D. AFFICHAGE CONDITIONNEL DÉTAILLÉ

**Super Admin voit** :
- ✅ Dashboard
- ✅ Livres
- ✅ Collections
- ✅ Manuscrits
- ✅ Utilisateurs
- ✅ Commandes
- ✅ **Admins** (exclusif)
- ✅ **Paramètres** (exclusif)
- ✅ Mon Profil
- ✅ Déconnexion

**Admin Simple voit** :
- ✅ Dashboard
- ✅ Livres (si `permissions.canViewBooks === true`)
- ✅ Collections (si `permissions.canViewCollections === true`)
- ✅ Manuscrits (si `permissions.canViewManuscripts === true`)
- ✅ Utilisateurs (si `permissions.canViewUsers === true`)
- ✅ Commandes
- ❌ Admins (caché)
- ❌ Paramètres (caché)
- ✅ Mon Profil
- ✅ Déconnexion

---

## 2. HEADER (Barre Supérieure)

### Dimensions et Style

```css
height: 64px;
position: fixed;
top: 0;
left: 250px;
right: 0;
background: #FFFFFF;
border-bottom: 1px solid #E5E7EB;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 32px;
z-index: 30;
```

### Structure du Header

```
┌─────────────────────────────────────────────────────────────┐
│  Titre de la Page          [🔍 Rechercher...]    [👤 ▼]    │
└─────────────────────────────────────────────────────────────┘
```

---

### A. TITRE DE LA PAGE (gauche)

```
Texte : Dynamique selon la page
  - "Dashboard" sur /admin
  - "Gestion des Livres" sur /admin/books
  - "Gestion des Collections" sur /admin/collections
  - etc.

Font : Inter, Bold
Taille : 24px
Couleur : #111827
```

---

### B. BARRE DE RECHERCHE (centre)

**Container** :
```css
width: 400px;
position: relative;
```

**Input** :
```css
width: 100%;
height: 40px;
padding: 8px 16px 8px 40px;
border: 1px solid #E5E7EB;
border-radius: 8px;
font-size: 14px;
background: #F9FAFB;
transition: all 0.2s;
```

**Icône Recherche** :
```css
position: absolute;
left: 12px;
top: 50%;
transform: translateY(-50%);
color: #9CA3AF;
size: 18px;
```

**Placeholder** : `Rechercher...`

**État Focus** :
```css
background: white;
border-color: #2563EB;
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
```

---

### C. MENU UTILISATEUR (droite)

**Structure** :
```
[Avatar] Nom Admin ▼
```

**Container** :
```css
display: flex;
align-items: center;
gap: 12px;
padding: 8px 12px;
border-radius: 8px;
cursor: pointer;
transition: background 0.2s;
```

**Hover** :
```css
background: #F3F4F6;
```

**Avatar** :
```css
width: 36px;
height: 36px;
border-radius: 50%;
background: #2563EB;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-weight: 600;
font-size: 14px;
```
- Afficher les initiales (ex: "JD" pour Jean Dupont)
- Si image disponible, afficher l'image

**Nom** :
```
Texte : Nom de l'admin connecté
Font : Inter, Medium
Taille : 14px
Couleur : #374151
```

**Icône Chevron** :
```css
size: 16px;
color: #9CA3AF;
transition: transform 0.2s;
```
- Rotation 180° quand menu ouvert

---

### D. DROPDOWN MENU UTILISATEUR

**Apparaît au clic sur le menu utilisateur**

**Container** :
```css
position: absolute;
top: 56px;
right: 32px;
width: 240px;
background: white;
border: 1px solid #E5E7EB;
border-radius: 8px;
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
padding: 8px;
z-index: 50;
```

**Items** :
```
👤 Mon Profil
⚙️ Paramètres (si Super Admin)
─────────────
🚪 Déconnexion
```

**Style Item** :
```css
padding: 10px 12px;
border-radius: 6px;
cursor: pointer;
display: flex;
align-items: center;
gap: 12px;
font-size: 14px;
color: #374151;
transition: background 0.2s;
```

**Hover** :
```css
background: #F3F4F6;
```

**Item Déconnexion** :
```css
color: #EF4444;
```

**Séparateur** :
```css
height: 1px;
background: #E5E7EB;
margin: 8px 0;
```

---

## 3. ZONE DE CONTENU PRINCIPALE

### Dimensions et Style

```css
margin-left: 250px;
margin-top: 64px;
min-height: calc(100vh - 64px - 60px);
padding: 32px;
background: #F9FAFB;
```

**Contenu** :
- Cette zone change selon la page visitée
- Chaque page aura son propre design (voir fichiers suivants)

---

## 4. FOOTER (Pied de Page)

### Dimensions et Style

```css
height: 60px;
margin-left: 250px;
background: #FFFFFF;
border-top: 1px solid #E5E7EB;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 32px;
```

### Structure du Footer

```
┌─────────────────────────────────────────────────────────────┐
│  © 2026 Éditions Germinale          Politique • Conditions │
└─────────────────────────────────────────────────────────────┘
```

---

### A. COPYRIGHT (gauche)

```
Texte : "© 2026 Éditions Germinale. Tous droits réservés."
Font : Inter, Regular
Taille : 13px
Couleur : #6B7280
```

---

### B. LIENS (droite)

```
Politique de confidentialité  •  Conditions d'utilisation
```

**Style Lien** :
```css
font-size: 13px;
color: #6B7280;
text-decoration: none;
transition: color 0.2s;
```

**Hover** :
```css
color: #2563EB;
text-decoration: underline;
```

**Séparateur** :
```
Texte : "•"
Couleur : #D1D5DB
Margin : 0 12px
```

---

## 📱 RESPONSIVE DESIGN

### Desktop (> 1024px)
- Sidebar : 250px fixe
- Header : Full width - 250px
- Contenu : Margin-left 250px

### Tablet (641px - 1024px)
- Sidebar : Réduite à 80px (icônes seulement)
- Textes cachés, seulement icônes
- Header : Full width - 80px
- Contenu : Margin-left 80px

### Mobile (< 640px)
- Sidebar : Drawer (overlay)
- Bouton hamburger dans le header
- Sidebar s'ouvre/ferme par slide
- Header : Full width
- Contenu : Margin-left 0

---

### Mobile - Bouton Hamburger

**Position** : Top-left du header

**Style** :
```css
width: 40px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 8px;
cursor: pointer;
transition: background 0.2s;
```

**Hover** :
```css
background: #F3F4F6;
```

**Icône** :
- 3 barres horizontales
- Taille : 24px
- Couleur : #374151

---

### Mobile - Sidebar Drawer

**Overlay** :
```css
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.5);
z-index: 45;
```

**Sidebar** :
```css
position: fixed;
top: 0;
left: 0;
width: 280px;
height: 100vh;
background: white;
z-index: 50;
transform: translateX(-100%);
transition: transform 0.3s;
```

**Ouvert** :
```css
transform: translateX(0);
```

**Bouton Fermer** :
- Position : Top-right du drawer
- Icône : ✕
- Taille : 24px
- Padding : 12px

---

## ⚡ INTERACTIONS ET ANIMATIONS

### 1. Navigation Active

```javascript
// Détecter la page courante
const currentPath = window.location.pathname;

// Appliquer la classe active
if (navItem.href === currentPath) {
  navItem.classList.add('active');
}
```

### 2. Dropdown Menu

```javascript
// Toggle au clic
userMenu.addEventListener('click', () => {
  dropdown.classList.toggle('open');
  chevron.classList.toggle('rotate-180');
});

// Fermer au clic extérieur
document.addEventListener('click', (e) => {
  if (!userMenu.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});
```

### 3. Sidebar Mobile

```javascript
// Ouvrir
hamburger.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
});

// Fermer
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
```

### 4. Déconnexion

```javascript
logoutBtn.addEventListener('click', async () => {
  // Confirmer
  if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
    // Déconnecter
    await signOut();
    // Rediriger
    router.push('/admin/login');
  }
});
```

---

## 🎨 PALETTE DE COULEURS UTILISÉE

```css
/* Background */
--bg-sidebar: #FFFFFF;
--bg-header: #FFFFFF;
--bg-content: #F9FAFB;
--bg-footer: #FFFFFF;

/* Bordures */
--border: #E5E7EB;

/* Navigation */
--nav-normal: #6B7280;
--nav-hover-bg: #F3F4F6;
--nav-hover-text: #374151;
--nav-active-bg: #DBEAFE;
--nav-active-text: #2563EB;

/* Texte */
--text-primary: #111827;
--text-secondary: #374151;
--text-muted: #6B7280;

/* Primaire */
--primary: #2563EB;

/* Danger */
--danger: #EF4444;
```

---

## 📋 CHECKLIST DE VÉRIFICATION

- [ ] Sidebar fixe à gauche (250px)
- [ ] Logo et nom en haut du sidebar
- [ ] Tous les items de navigation présents
- [ ] Séparateurs entre les sections
- [ ] Items "Admins" et "Paramètres" conditionnels
- [ ] États hover sur les items
- [ ] État actif sur la page courante
- [ ] Header fixe en haut
- [ ] Titre de page dynamique
- [ ] Barre de recherche centrée
- [ ] Menu utilisateur avec avatar
- [ ] Dropdown menu fonctionnel
- [ ] Footer avec copyright et liens
- [ ] Responsive mobile avec drawer
- [ ] Animations fluides

---

## 🔒 LOGIQUE D'AFFICHAGE CONDITIONNEL

### Pseudo-code pour le Sidebar

```javascript
function Sidebar({ user }) {
  const isSuperAdmin = user.role === "SUPER_ADMIN";
  const permissions = user.permissions || {};

  return (
    <nav>
      {/* Toujours visible */}
      <NavItem href="/admin">Dashboard</NavItem>
      
      {/* Conditionnel selon permissions */}
      {permissions.canViewBooks && (
        <NavItem href="/admin/books">Livres</NavItem>
      )}
      
      {permissions.canViewCollections && (
        <NavItem href="/admin/collections">Collections</NavItem>
      )}
      
      {permissions.canViewManuscripts && (
        <NavItem href="/admin/manuscripts">Manuscrits</NavItem>
      )}
      
      {permissions.canViewUsers && (
        <NavItem href="/admin/users">Utilisateurs</NavItem>
      )}
      
      {/* Toujours visible */}
      <NavItem href="/admin/orders">Commandes</NavItem>
      
      <Separator />
      
      {/* Super Admin uniquement */}
      {isSuperAdmin && (
        <>
          <NavItem href="/admin/admins">Admins</NavItem>
          <NavItem href="/admin/settings">Paramètres</NavItem>
        </>
      )}
      
      <Separator />
      
      {/* Toujours visible */}
      <NavItem href="/admin/profile">Mon Profil</NavItem>
      <NavItem onClick={handleLogout}>Déconnexion</NavItem>
    </nav>
  );
}
```

---

## ✅ VALIDATION FINALE

Ce layout doit être :
- ✅ Présent sur TOUTES les pages admin
- ✅ Cohérent et professionnel
- ✅ Responsive sur tous les écrans
- ✅ Affichage conditionnel fonctionnel
- ✅ Navigation intuitive
- ✅ Performance optimale

---

**FIN DU BRIEF - 01-layout-principal.md**

**Prochaine étape** : `02-dashboard-overview.md` (Page d'accueil avec statistiques)
