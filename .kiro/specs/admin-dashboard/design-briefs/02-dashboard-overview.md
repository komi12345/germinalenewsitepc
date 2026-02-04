# 📊 DASHBOARD OVERVIEW - PAGE D'ACCUEIL ADMIN

**Fichier** : 02-dashboard-overview.md  
**Route** : `/admin`  
**Objectif** : Page d'accueil du dashboard avec statistiques, graphiques et tableaux récents

---

## ⚠️ INSTRUCTION IMPORTANTE POUR GOOGLE STITCH

**RESPECTER SCRUPULEUSEMENT** toutes les spécifications ci-dessous. Cette page est la première vue après connexion. Elle doit être claire, informative et professionnelle. Chaque élément a sa place précise.

---

## 🎯 OBJECTIF DE LA PAGE

Page d'accueil du dashboard affichant une vue d'ensemble de l'activité de la plateforme :
- 4 cartes de statistiques clés
- 2 graphiques (ventes par mois + répartition)
- 2 tableaux récents (dernières commandes + manuscrits récents)

**Accessible par** : Tous les admins (Super Admin et Admin Simple)

---

## 🎨 DESIGN VISUEL GLOBAL

### Layout de la Page

```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard                                    [🔍] [👤]     │ ← Header
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ 👥 Users │ │ 📚 Livres│ │ 💰 Revenus│ │📝 Manusc.│      │ ← Stats Cards
│  │  1,234   │ │   156    │ │  2.5M    │ │    23    │      │
│  │  +12%    │ │   +5%    │ │  +18%    │ │ En attente│      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                              │
│  ┌─────────────────────────┐ ┌─────────────────────────┐   │
│  │ Ventes par Mois         │ │ Répartition Ventes      │   │ ← Graphiques
│  │                         │ │                         │   │
│  │ [Line Chart]            │ │ [Pie Chart]             │   │
│  │                         │ │                         │   │
│  └─────────────────────────┘ └─────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────┐ ┌─────────────────────────┐   │
│  │ Dernières Commandes     │ │ Manuscrits Récents      │   │ ← Tableaux
│  │ [Table 5 lignes]        │ │ [Table 5 lignes]        │   │
│  └─────────────────────────┘ └─────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📐 SPÉCIFICATIONS DÉTAILLÉES

## 1. CARTES DE STATISTIQUES (4 cartes en haut)

### Layout des Cartes

```css
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 24px;
margin-bottom: 32px;
```

**Responsive** :
- Desktop (> 1024px) : 4 colonnes
- Tablet (641-1024px) : 2 colonnes
- Mobile (< 640px) : 1 colonne

---

### A. CARTE UTILISATEURS

**Container** :
```css
background: white;
border-radius: 12px;
padding: 24px;
border: 1px solid #E5E7EB;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
transition: all 0.2s;
```

**Hover** :
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
transform: translateY(-2px);
```

**Structure** :
```
┌────────────────────────┐
│ 👥 Utilisateurs        │ ← Header
│                        │
│ 1,234                  │ ← Valeur principale
│ +12% ce mois           │ ← Variation
└────────────────────────┘
```

**Header** :
```
Icône : 👥 (ou icon Users de Lucide)
  - Taille : 20px
  - Couleur : #3B82F6 (bleu)
  - Background : #DBEAFE (bleu clair)
  - Padding : 8px
  - Border-radius : 8px

Texte : "Utilisateurs"
  - Font : Inter, Medium
  - Taille : 14px
  - Couleur : #6B7280
  - Margin-left : 12px
```

**Valeur Principale** :
```
Texte : "1,234" (nombre formaté)
Font : Inter, Bold
Taille : 32px
Couleur : #111827
Margin-top : 16px
```

**Variation** :
```
Texte : "+12% ce mois"
Font : Inter, Medium
Taille : 13px
Couleur : #10B981 (vert si positif)
Couleur : #EF4444 (rouge si négatif)
Margin-top : 8px

Icône : ↑ (si positif) ou ↓ (si négatif)
  - Taille : 14px
  - Margin-right : 4px
```

---

### B. CARTE LIVRES

**Même structure que Utilisateurs**

**Différences** :
```
Icône : 📚 (BookOpen)
  - Couleur : #10B981 (vert)
  - Background : #D1FAE5

Texte : "Livres"
Valeur : "156"
Variation : "+5% ce mois"
```

---

### C. CARTE REVENUS

**Même structure**

**Différences** :
```
Icône : 💰 (DollarSign)
  - Couleur : #8B5CF6 (violet)
  - Background : #EDE9FE

Texte : "Revenus"
Valeur : "2.5M FCFA"
Variation : "+18% ce mois"
```

**Note** : Visible uniquement si `permissions.canViewRevenue === true` pour Admin Simple

---

### D. CARTE MANUSCRITS

**Même structure**

**Différences** :
```
Icône : 📝 (FileText)
  - Couleur : #F59E0B (orange)
  - Background : #FEF3C7

Texte : "Manuscrits"
Valeur : "23"
Sous-texte : "En attente" (au lieu de variation)
  - Couleur : #6B7280
  - Pas d'icône
```

---

## 2. SECTION GRAPHIQUES (2 colonnes)

### Layout

```css
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 24px;
margin-bottom: 32px;
```

**Responsive** :
- Desktop : 2 colonnes
- Mobile : 1 colonne

---

### A. GRAPHIQUE VENTES PAR MOIS (Line Chart)

**Container** :
```css
background: white;
border-radius: 12px;
padding: 24px;
border: 1px solid #E5E7EB;
```

**Header** :
```
┌────────────────────────────────┐
│ Ventes par Mois          [...]  │
└────────────────────────────────┘
```

**Titre** :
```
Texte : "Ventes par Mois"
Font : Inter, Semibold
Taille : 18px
Couleur : #111827
```

**Menu Options** (3 points) :
```
Position : Top-right
Icône : ⋮ (MoreVertical)
Taille : 20px
Couleur : #9CA3AF
Cursor : pointer

Dropdown :
  - Exporter en CSV
  - Voir détails
```

**Graphique** :
```
Type : Line Chart (Recharts)
Hauteur : 300px
Margin-top : 24px

Axe X : 12 derniers mois (Jan, Fév, Mar...)
Axe Y : Nombre de ventes (0, 10, 20, 30...)

Ligne :
  - Couleur : #2563EB
  - Épaisseur : 2px
  - Points : Cercles de 4px
  - Smooth : true

Grid :
  - Couleur : #F3F4F6
  - Stroke-dasharray : 3 3

Tooltip :
  - Background : white
  - Border : 1px solid #E5E7EB
  - Shadow : 0 4px 12px rgba(0,0,0,0.1)
  - Padding : 12px
  - Format : "Janvier 2026: 45 ventes"
```

**Données exemple** :
```javascript
[
  { month: 'Jan', sales: 32 },
  { month: 'Fév', sales: 28 },
  { month: 'Mar', sales: 45 },
  { month: 'Avr', sales: 38 },
  { month: 'Mai', sales: 52 },
  { month: 'Juin', sales: 48 },
  // ... 12 mois
]
```

---

### B. GRAPHIQUE RÉPARTITION VENTES (Pie Chart)

**Container** : Même style que le Line Chart

**Header** :
```
Titre : "Répartition des Ventes"
```

**Graphique** :
```
Type : Pie Chart (Recharts)
Hauteur : 300px

Segments :
  1. Livres individuels
     - Couleur : #2563EB (bleu)
     - Valeur : 65%
  
  2. Collections
     - Couleur : #10B981 (vert)
     - Valeur : 35%

Labels :
  - Position : Outside
  - Font : Inter, Medium
  - Taille : 13px
  - Format : "Livres: 65%"

Légende :
  - Position : Bottom
  - Align : center
  - Icon : Carré de couleur
  - Gap : 24px
```

**Tooltip** :
```
Format : "Livres individuels: 65% (234 ventes)"
```

---

## 3. SECTION TABLEAUX (2 colonnes)

### Layout

```css
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 24px;
```

**Responsive** :
- Desktop : 2 colonnes
- Mobile : 1 colonne

---

### A. TABLEAU DERNIÈRES COMMANDES

**Container** :
```css
background: white;
border-radius: 12px;
padding: 24px;
border: 1px solid #E5E7EB;
```

**Header** :
```
┌────────────────────────────────────┐
│ Dernières Commandes    [Voir tout] │
└────────────────────────────────────┘
```

**Titre** :
```
Texte : "Dernières Commandes"
Font : Inter, Semibold
Taille : 18px
Couleur : #111827
```

**Lien "Voir tout"** :
```
Texte : "Voir tout"
Font : Inter, Medium
Taille : 14px
Couleur : #2563EB
Hover : #1E40AF + underline
Cursor : pointer
Lien : /admin/orders
```

**Tableau** :
```
┌──────────────────────────────────────────────────────┐
│ Client      │ Article        │ Montant    │ Statut  │
├──────────────────────────────────────────────────────┤
│ Jean D.     │ Le Soleil...   │ 8,500 FCFA │ ✅      │
│ Marie K.    │ Romans Afr...  │ 50,000     │ ✅      │
│ Paul M.     │ Une si...      │ 7,500      │ 🟡      │
│ Sophie L.   │ Poésie...      │ 3,500      │ ✅      │
│ Ahmed B.    │ Contes...      │ 4,500      │ ✅      │
└──────────────────────────────────────────────────────┘
```

**Style Tableau** :
```css
width: 100%;
margin-top: 16px;
border-collapse: collapse;
```

**Header Row** :
```css
background: #F9FAFB;
border-bottom: 1px solid #E5E7EB;

Cellules :
  - Padding : 12px
  - Font : Inter, Medium
  - Taille : 13px
  - Couleur : #6B7280
  - Text-align : left
```

**Body Rows** :
```css
border-bottom: 1px solid #F3F4F6;
transition: background 0.2s;

Hover :
  - Background : #F9FAFB

Cellules :
  - Padding : 12px
  - Font : Inter, Regular
  - Taille : 14px
  - Couleur : #374151
```

**Colonne Client** :
```
Font-weight : 500
Couleur : #111827
```

**Colonne Article** :
```
Max-width : 150px
Overflow : hidden
Text-overflow : ellipsis
White-space : nowrap
```

**Colonne Montant** :
```
Font-weight : 600
Couleur : #111827
```

**Colonne Statut** :
```
Badges :
  ✅ Complété
    - Background : #D1FAE5
    - Couleur : #059669
    - Padding : 4px 8px
    - Border-radius : 6px
    - Font-size : 12px
  
  🟡 En attente
    - Background : #FEF3C7
    - Couleur : #D97706
```

---

### B. TABLEAU MANUSCRITS RÉCENTS

**Container** : Même style que Dernières Commandes

**Header** :
```
Titre : "Manuscrits Récents"
Lien : "Voir tout" → /admin/manuscripts
```

**Tableau** :
```
┌──────────────────────────────────────────────────────┐
│ Titre       │ Auteur         │ Date       │ Statut  │
├──────────────────────────────────────────────────────┤
│ Mon Roman   │ Jean Dupont    │ 01/02/2026 │ 🟡      │
│ Poésie      │ Marie K.       │ 28/01/2026 │ 🔵      │
│ Histoire    │ Paul M.        │ 25/01/2026 │ ✅      │
│ Essai       │ Sophie L.      │ 20/01/2026 │ 🟡      │
│ Nouvelle    │ Ahmed B.       │ 15/01/2026 │ ❌      │
└──────────────────────────────────────────────────────┘
```

**Colonne Statut** :
```
Badges :
  🟡 En attente (PENDING)
    - Background : #FEF3C7
    - Couleur : #D97706
    - Texte : "En attente"
  
  🔵 En révision (REVIEWING)
    - Background : #DBEAFE
    - Couleur : #2563EB
    - Texte : "En révision"
  
  ✅ Accepté (ACCEPTED)
    - Background : #D1FAE5
    - Couleur : #059669
    - Texte : "Accepté"
  
  ❌ Rejeté (REJECTED)
    - Background : #FEE2E2
    - Couleur : #DC2626
    - Texte : "Rejeté"
```

---

## 📱 RESPONSIVE DESIGN

### Desktop (> 1024px)
- Stats : 4 colonnes
- Graphiques : 2 colonnes
- Tableaux : 2 colonnes

### Tablet (641-1024px)
- Stats : 2 colonnes
- Graphiques : 2 colonnes
- Tableaux : 1 colonne

### Mobile (< 640px)
- Stats : 1 colonne
- Graphiques : 1 colonne
- Tableaux : 1 colonne
- Tableaux : Scroll horizontal si nécessaire

---

## ⚡ INTERACTIONS ET ANIMATIONS

### 1. Chargement de la Page

```
Animation : Fade in + Slide up
Durée : 0.4s
Ordre :
  1. Stats cards (stagger 0.1s)
  2. Graphiques (stagger 0.1s)
  3. Tableaux (stagger 0.1s)
```

### 2. Hover sur Stats Cards

```
Transform : translateY(-2px)
Box-shadow : 0 4px 12px rgba(0,0,0,0.1)
Durée : 0.2s
```

### 3. Hover sur Lignes de Tableau

```
Background : #F9FAFB
Cursor : pointer
Durée : 0.2s
```

### 4. Clic sur Ligne de Tableau

```
Action : Ouvrir modal détail ou rediriger vers page détail
Animation : Fade in du modal
```

---

## 🔄 ACTUALISATION DES DONNÉES

### Auto-refresh

```javascript
// Actualiser les stats toutes les 30 secondes
setInterval(() => {
  fetchDashboardStats();
}, 30000);
```

### Indicateur de Chargement

```
Position : Top-right du container
Icône : Spinner rotatif
Taille : 16px
Couleur : #2563EB
Texte : "Actualisation..."
```

---

## 🎨 PALETTE DE COULEURS UTILISÉE

```css
/* Stats Cards */
--card-users: #3B82F6;
--card-books: #10B981;
--card-revenue: #8B5CF6;
--card-manuscripts: #F59E0B;

/* Graphiques */
--chart-primary: #2563EB;
--chart-secondary: #10B981;
--chart-grid: #F3F4F6;

/* Statuts */
--status-completed: #059669;
--status-pending: #D97706;
--status-reviewing: #2563EB;
--status-rejected: #DC2626;

/* Backgrounds */
--bg-card: #FFFFFF;
--bg-hover: #F9FAFB;
--bg-header: #F9FAFB;
```

---

## 📊 DONNÉES EXEMPLE

### Stats Cards

```javascript
{
  users: {
    total: 1234,
    variation: +12,
    period: "ce mois"
  },
  books: {
    total: 156,
    variation: +5,
    period: "ce mois"
  },
  revenue: {
    total: 2500000, // en centimes
    variation: +18,
    period: "ce mois"
  },
  manuscripts: {
    pending: 23
  }
}
```

### Dernières Commandes

```javascript
[
  {
    id: "1234",
    client: "Jean Dupont",
    article: "Le Soleil des Indépendances",
    amount: 8500,
    status: "COMPLETED",
    date: "2026-02-01"
  },
  // ... 4 autres
]
```

### Manuscrits Récents

```javascript
[
  {
    id: "m123",
    title: "Mon Roman",
    author: "Jean Dupont",
    date: "2026-02-01",
    status: "PENDING"
  },
  // ... 4 autres
]
```

---

## 📋 CHECKLIST DE VÉRIFICATION

- [ ] 4 cartes de stats présentes et stylées
- [ ] Icônes colorées dans les cartes
- [ ] Variations avec flèches (↑ vert, ↓ rouge)
- [ ] Graphique ventes par mois (line chart)
- [ ] Graphique répartition (pie chart)
- [ ] Tableau dernières commandes (5 lignes)
- [ ] Tableau manuscrits récents (5 lignes)
- [ ] Badges de statut colorés
- [ ] Liens "Voir tout" fonctionnels
- [ ] Hover effects sur tous les éléments
- [ ] Responsive mobile testé
- [ ] Animations de chargement
- [ ] Tooltips sur les graphiques

---

## 🔒 PERMISSIONS ET AFFICHAGE CONDITIONNEL

### Carte Revenus

```javascript
// Visible uniquement si permission
{user.role === "SUPER_ADMIN" || user.permissions?.canViewRevenue ? (
  <RevenueCard />
) : (
  <PlaceholderCard text="Accès restreint" />
)}
```

### Données Sensibles

- Super Admin : Voit tout
- Admin Simple : Voit selon permissions
  - Si `canViewRevenue === false` : Carte revenus masquée ou affiche "---"

---

## ✅ VALIDATION FINALE

Cette page doit être :
- ✅ Informative et claire
- ✅ Visuellement équilibrée
- ✅ Responsive sur tous les écrans
- ✅ Performante (chargement rapide)
- ✅ Interactive (hover, clic)
- ✅ Accessible (contraste, labels)

---

**FIN DU BRIEF - 02-dashboard-overview.md**

**Prochaine étape** : `03-gestion-livres.md` (Liste + Créer + Modifier)
