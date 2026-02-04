# 📚 GESTION DES LIVRES

**Fichier** : 03-gestion-livres.md  
**Route** : `/admin/books`  
**Objectif** : Gestion complète des livres (Liste, Créer, Modifier)

---

## ⚠️ INSTRUCTION IMPORTANTE POUR GOOGLE STITCH

**RESPECTER SCRUPULEUSEMENT** toutes les spécifications ci-dessous. Ce fichier contient 3 vues distinctes : Liste, Créer et Modifier. Chaque vue doit être conçue avec précision.

---

## 🎯 OBJECTIF DES VUES

Ce module permet aux administrateurs de gérer tous les livres de la plateforme :
- **Vue 1 - Liste** : Afficher tous les livres avec filtres et recherche
- **Vue 2 - Créer** : Formulaire pour ajouter un nouveau livre
- **Vue 3 - Modifier** : Formulaire pour éditer un livre existant

**Accessible par** : Admins avec permission `canViewBooks`

---

## 📋 TABLE DES MATIÈRES

1. [Vue 1 : Liste des Livres](#vue-1--liste-des-livres)
2. [Vue 2 : Créer un Livre](#vue-2--créer-un-livre)
3. [Vue 3 : Modifier un Livre](#vue-3--modifier-un-livre)
4. [Composants Communs](#composants-communs)
5. [Responsive Design](#responsive-design)

---

# VUE 1 : LISTE DES LIVRES

**Route** : `/admin/books`

## 🎨 DESIGN VISUEL

### Layout de la Page

```
┌─────────────────────────────────────────────────────────────┐
│  Gestion des Livres                          [+ Ajouter]    │ ← Header
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [🔍 Rechercher par titre ou auteur...]                     │ ← Recherche
│                                                              │
│  Collection: [Toutes ▼]  Statut: [Tous ▼]  Prix: [Tous ▼]  │ ← Filtres
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [img] │ Titre │ Auteur │ Collection │ Prix │ Statut │  │ ← Tableau
│  ├──────────────────────────────────────────────────────┤  │
│  │ [img] │ Le... │ A.K.   │ Romans     │ 8500 │ ✅     │  │
│  │ [img] │ Une.. │ M.B.   │ Romans     │ 7500 │ ✅     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [← Précédent]  1  2  3  4  5  [Suivant →]                 │ ← Pagination
│  Affichage 1-20 sur 156 livres                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```



## 📐 SPÉCIFICATIONS DÉTAILLÉES - VUE LISTE

### 1. HEADER DE LA PAGE

**Container** :
```css
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 32px;
```

**Titre** :
```
Texte : "Gestion des Livres"
Font : Inter, Bold
Taille : 28px
Couleur : #111827
```

**Bouton Ajouter** :
```css
background: #2563EB;
color: white;
padding: 12px 24px;
border-radius: 8px;
font-size: 15px;
font-weight: 600;
display: flex;
align-items: center;
gap: 8px;
cursor: pointer;
transition: all 0.2s;
```

**Icône** : Plus (+) de 18px

**Hover** :
```css
background: #1E40AF;
transform: translateY(-1px);
box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
```

**Condition d'affichage** :
```javascript
{user.permissions?.canCreateBooks && (
  <Button>+ Ajouter un livre</Button>
)}
```

---

### 2. BARRE DE RECHERCHE

**Container** :
```css
width: 100%;
margin-bottom: 24px;
position: relative;
```

**Input** :
```css
width: 100%;
height: 48px;
padding: 12px 16px 12px 48px;
border: 1px solid #E5E7EB;
border-radius: 8px;
font-size: 15px;
background: white;
transition: all 0.2s;
```

**Icône Recherche** :
```css
position: absolute;
left: 16px;
top: 50%;
transform: translateY(-50%);
color: #9CA3AF;
size: 20px;
```

**Placeholder** : `Rechercher par titre ou auteur...`

**Focus** :
```css
border-color: #2563EB;
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
outline: none;
```

---

### 3. FILTRES

**Container** :
```css
display: flex;
gap: 16px;
margin-bottom: 24px;
flex-wrap: wrap;
```

#### A. Filtre Collection

**Select** :
```css
min-width: 200px;
height: 40px;
padding: 8px 16px;
border: 1px solid #E5E7EB;
border-radius: 8px;
background: white;
font-size: 14px;
cursor: pointer;
```

**Label** : `Collection:`

**Options** :
```
- Toutes
- Romans Africains
- Poésie Francophone
- Contes et Légendes
- Littérature Jeunesse
```

#### B. Filtre Statut

**Options** :
```
- Tous
- Actif
- Inactif
```

#### C. Filtre Prix

**Options** :
```
- Tous
- Moins de 5,000 FCFA
- 5,000 - 10,000 FCFA
- Plus de 10,000 FCFA
```

---

### 4. TABLEAU DES LIVRES

**Container** :
```css
background: white;
border-radius: 12px;
border: 1px solid #E5E7EB;
overflow: hidden;
```

**Structure** :
```
┌────────────────────────────────────────────────────────────────┐
│ Couverture │ Titre │ Auteur │ Collection │ Prix │ Statut │ ... │
├────────────────────────────────────────────────────────────────┤
│ [img]      │ Le... │ A.K.   │ Romans     │ 8500 │ ✅     │ ⋮  │
│ [img]      │ Une.. │ M.B.   │ Romans     │ 7500 │ ✅     │ ⋮  │
└────────────────────────────────────────────────────────────────┘
```

**Header Row** :
```css
background: #F9FAFB;
border-bottom: 2px solid #E5E7EB;
height: 48px;

Cellules :
  - Padding : 12px 16px
  - Font : Inter, Semibold
  - Taille : 13px
  - Couleur : #6B7280
  - Text-transform : uppercase
  - Letter-spacing : 0.5px
```

**Colonnes** :
1. Couverture (80px)
2. Titre (flex: 2)
3. Auteur (flex: 1)
4. Collection (flex: 1)
5. Prix (120px)
6. Statut (100px)
7. Actions (60px)

**Body Rows** :
```css
border-bottom: 1px solid #F3F4F6;
height: 80px;
transition: background 0.2s;

Hover :
  - Background : #F9FAFB
  - Cursor : pointer

Cellules :
  - Padding : 12px 16px
  - Font : Inter, Regular
  - Taille : 14px
  - Couleur : #374151
  - Vertical-align : middle
```

#### Colonne Couverture

```css
width: 60px;
height: 60px;
border-radius: 6px;
object-fit: cover;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
```

#### Colonne Titre

```
Font-weight : 600
Couleur : #111827
Max-width : 250px
Overflow : hidden
Text-overflow : ellipsis
White-space : nowrap
```

#### Colonne Prix

```
Format : "8,500 FCFA"
Font-weight : 600
Couleur : #111827
```

#### Colonne Statut

**Badge Actif** :
```css
background: #D1FAE5;
color: #059669;
padding: 4px 12px;
border-radius: 12px;
font-size: 12px;
font-weight: 600;
display: inline-flex;
align-items: center;
gap: 4px;
```
Icône : ✓ (Check)

**Badge Inactif** :
```css
background: #F3F4F6;
color: #6B7280;
```
Icône : ○ (Circle)

#### Colonne Actions

**Menu 3 points** :
```css
width: 32px;
height: 32px;
border-radius: 6px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
transition: background 0.2s;

Hover :
  - Background : #F3F4F6
```

**Icône** : ⋮ (MoreVertical) de 18px

**Dropdown Menu** :
```
Position : Absolute, right aligned
Width : 180px
Background : white
Border : 1px solid #E5E7EB
Border-radius : 8px
Box-shadow : 0 10px 40px rgba(0,0,0,0.1)
Padding : 8px
Z-index : 10

Items :
  👁️ Voir détails
  ✏️ Modifier (si canEditBooks)
  🗑️ Supprimer (si canDeleteBooks)
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
transition: background 0.2s;

Hover :
  - Background : #F3F4F6
```

**Item Supprimer** :
```css
color: #EF4444;

Hover :
  - Background : #FEE2E2
```

---

### 5. PAGINATION

**Container** :
```css
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 24px;
padding: 16px 0;
```

**Boutons Navigation** :
```css
display: flex;
gap: 8px;
```

**Bouton Page** :
```css
width: 40px;
height: 40px;
border-radius: 8px;
border: 1px solid #E5E7EB;
background: white;
color: #374151;
font-size: 14px;
font-weight: 500;
cursor: pointer;
transition: all 0.2s;

Hover :
  - Background : #F3F4F6

Active (page courante) :
  - Background : #2563EB
  - Color : white
  - Border-color : #2563EB
```

**Boutons Précédent/Suivant** :
```css
padding: 8px 16px;
height: 40px;
border-radius: 8px;
border: 1px solid #E5E7EB;
background: white;
color: #374151;
font-size: 14px;
font-weight: 500;
display: flex;
align-items: center;
gap: 8px;
cursor: pointer;

Disabled :
  - Opacity : 0.5
  - Cursor : not-allowed
```

**Texte Info** :
```
Format : "Affichage 1-20 sur 156 livres"
Font : Inter, Regular
Taille : 14px
Couleur : #6B7280
```

---

### 6. MODAL CONFIRMATION SUPPRESSION

**Overlay** :
```css
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.5);
display: flex;
align-items: center;
justify-content: center;
z-index: 100;
```

**Modal** :
```css
width: 400px;
background: white;
border-radius: 12px;
padding: 24px;
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
```

**Icône Avertissement** :
```css
width: 48px;
height: 48px;
background: #FEE2E2;
color: #EF4444;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
margin: 0 auto 16px;
```
Icône : ⚠️ (AlertTriangle) de 24px

**Titre** :
```
Texte : "Supprimer ce livre ?"
Font : Inter, Bold
Taille : 20px
Couleur : #111827
Text-align : center
Margin-bottom : 12px
```

**Message** :
```
Texte : "Cette action est irréversible. Le livre sera définitivement supprimé."
Font : Inter, Regular
Taille : 14px
Couleur : #6B7280
Text-align : center
Margin-bottom : 24px
```

**Boutons** :
```css
display: flex;
gap: 12px;
```

**Bouton Annuler** :
```css
flex: 1;
height: 44px;
background: white;
border: 1px solid #E5E7EB;
color: #374151;
border-radius: 8px;
font-weight: 600;
cursor: pointer;

Hover :
  - Background : #F3F4F6
```

**Bouton Supprimer** :
```css
flex: 1;
height: 44px;
background: #EF4444;
color: white;
border: none;
border-radius: 8px;
font-weight: 600;
cursor: pointer;

Hover :
  - Background : #DC2626
```



---

# VUE 2 : CRÉER UN LIVRE

**Route** : `/admin/books/new`

## 🎨 DESIGN VISUEL

### Layout de la Page

```
┌─────────────────────────────────────────────────────────────┐
│  ← Retour    Nouveau Livre                                  │ ← Header
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Informations Générales                             │    │
│  │ ─────────────────────                              │    │
│  │                                                     │    │
│  │ Titre *                                            │    │
│  │ [_______________________________________]          │    │
│  │                                                     │    │
│  │ Auteur *                                           │    │
│  │ [_______________________________________]          │    │
│  │                                                     │    │
│  │ Description *                                      │    │
│  │ [_______________________________________]          │    │
│  │ [_______________________________________]          │    │
│  │                                                     │    │
│  │ Slug (URL)                                         │    │
│  │ [_______________________________________]          │    │
│  │                                                     │    │
│  │ Collection                                         │    │
│  │ [Sélectionner une collection ▼]                   │    │
│  │                                                     │    │
│  │ Prix (FCFA) *                                      │    │
│  │ [_______________________________________]          │    │
│  │                                                     │    │
│  │ Nombre de pages                                    │    │
│  │ [_______________________________________]          │    │
│  │                                                     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Fichiers                                           │    │
│  │ ────────                                           │    │
│  │                                                     │    │
│  │ Couverture (Image) *                               │    │
│  │ [📁 Choisir un fichier]                            │    │
│  │ Formats : JPG, PNG, WebP (max 5MB)                │    │
│  │                                                     │    │
│  │ Fichier PDF *                                      │    │
│  │ [📁 Choisir un fichier]                            │    │
│  │ Format : PDF (max 50MB)                            │    │
│  │                                                     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Statut                                             │    │
│  │ ──────                                             │    │
│  │                                                     │    │
│  │ ☑ Livre actif (visible sur le site)               │    │
│  │                                                     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  [Annuler]                    [Enregistrer le livre]       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 📐 SPÉCIFICATIONS DÉTAILLÉES - VUE CRÉER

### 1. HEADER DE LA PAGE

**Container** :
```css
display: flex;
align-items: center;
gap: 16px;
margin-bottom: 32px;
```

**Bouton Retour** :
```css
width: 40px;
height: 40px;
border-radius: 8px;
border: 1px solid #E5E7EB;
background: white;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
transition: background 0.2s;

Hover :
  - Background : #F3F4F6
```
Icône : ← (ArrowLeft) de 20px

**Titre** :
```
Texte : "Nouveau Livre"
Font : Inter, Bold
Taille : 28px
Couleur : #111827
```

---

### 2. SECTION INFORMATIONS GÉNÉRALES

**Container** :
```css
background: white;
border-radius: 12px;
border: 1px solid #E5E7EB;
padding: 32px;
margin-bottom: 24px;
```

**Titre Section** :
```
Texte : "Informations Générales"
Font : Inter, Semibold
Taille : 18px
Couleur : #111827
Margin-bottom : 8px
```

**Séparateur** :
```css
height: 1px;
background: #E5E7EB;
margin-bottom: 24px;
```

#### A. Champ Titre

**Label** :
```
Texte : "Titre *"
Font : Inter, Medium
Taille : 14px
Couleur : #374151
Margin-bottom : 8px
```

**Input** :
```css
width: 100%;
height: 48px;
padding: 12px 16px;
border: 1px solid #E5E7EB;
border-radius: 8px;
font-size: 15px;
background: white;
transition: all 0.2s;
```

**Placeholder** : `Ex: Le Soleil des Indépendances`

**Focus** :
```css
border-color: #2563EB;
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
outline: none;
```

**Erreur** :
```css
border-color: #EF4444;
box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
```

**Message d'erreur** :
```
Texte : "Le titre est requis"
Font : Inter, Regular
Taille : 13px
Couleur : #EF4444
Margin-top : 6px
```

**Margin-bottom** : 20px

#### B. Champ Auteur

Même style que Titre

**Placeholder** : `Ex: Ahmadou Kourouma`

#### C. Champ Description

**Textarea** :
```css
width: 100%;
min-height: 120px;
padding: 12px 16px;
border: 1px solid #E5E7EB;
border-radius: 8px;
font-size: 15px;
font-family: Inter;
line-height: 1.6;
resize: vertical;
```

**Placeholder** : `Décrivez le livre en quelques lignes...`

**Compteur de caractères** :
```
Position : Bottom-right du textarea
Texte : "0 / 5000"
Font : Inter, Regular
Taille : 12px
Couleur : #9CA3AF
```

#### D. Champ Slug

**Input** : Même style que Titre

**Placeholder** : `le-soleil-des-independances`

**Helper Text** :
```
Texte : "Généré automatiquement depuis le titre. Peut être modifié."
Font : Inter, Regular
Taille : 13px
Couleur : #6B7280
Margin-top : 6px
```

#### E. Champ Collection

**Select** :
```css
width: 100%;
height: 48px;
padding: 12px 16px;
border: 1px solid #E5E7EB;
border-radius: 8px;
font-size: 15px;
background: white;
cursor: pointer;
appearance: none;
background-image: url('chevron-down-icon');
background-repeat: no-repeat;
background-position: right 16px center;
```

**Options** :
```
- Aucune collection
- Romans Africains
- Poésie Francophone
- Contes et Légendes
- Littérature Jeunesse
```

#### F. Champ Prix

**Input** :
```css
width: 100%;
height: 48px;
padding: 12px 16px 12px 48px;
border: 1px solid #E5E7EB;
border-radius: 8px;
font-size: 15px;
type: number;
```

**Préfixe "FCFA"** :
```css
position: absolute;
left: 16px;
top: 50%;
transform: translateY(-50%);
font-size: 14px;
color: #6B7280;
font-weight: 500;
```

**Placeholder** : `8500`

#### G. Champ Nombre de Pages

**Input** : Type number

**Placeholder** : `250`

---

### 3. SECTION FICHIERS

**Container** : Même style que Informations Générales

**Titre Section** : `Fichiers`

#### A. Upload Couverture

**Label** : `Couverture (Image) *`

**Zone Upload** :
```css
width: 100%;
height: 200px;
border: 2px dashed #D1D5DB;
border-radius: 8px;
background: #F9FAFB;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
cursor: pointer;
transition: all 0.2s;

Hover :
  - Border-color : #2563EB
  - Background : #EFF6FF
```

**Contenu Zone** :
```
Icône : 📁 (Upload) de 32px, couleur #9CA3AF
Texte : "Cliquez pour choisir un fichier"
  - Font : Inter, Medium
  - Taille : 15px
  - Couleur : #374151
Sous-texte : "ou glissez-déposez"
  - Font : Inter, Regular
  - Taille : 13px
  - Couleur : #9CA3AF
```

**Formats acceptés** :
```
Texte : "Formats acceptés : JPG, PNG, WebP (max 5MB)"
Font : Inter, Regular
Taille : 13px
Couleur : #6B7280
Margin-top : 8px
```

**Prévisualisation** (après upload) :
```css
width: 200px;
height: 280px;
border-radius: 8px;
object-fit: cover;
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
```

**Bouton Changer** :
```css
margin-top: 12px;
padding: 8px 16px;
background: white;
border: 1px solid #E5E7EB;
border-radius: 6px;
font-size: 14px;
cursor: pointer;
```

#### B. Upload PDF

Même structure que Couverture

**Différences** :
- Icône : 📄 (FileText)
- Texte : "Format accepté : PDF (max 50MB)"
- Prévisualisation : Nom du fichier + taille

**Affichage fichier sélectionné** :
```
┌────────────────────────────────┐
│ 📄 le-soleil.pdf (2.5 MB)  ✕  │
└────────────────────────────────┘

Background : #EFF6FF
Border : 1px solid #BFDBFE
Padding : 12px 16px
Border-radius : 8px
```

---

### 4. SECTION STATUT

**Container** : Même style que sections précédentes

**Titre Section** : `Statut`

**Checkbox** :
```css
width: 20px;
height: 20px;
border: 2px solid #D1D5DB;
border-radius: 4px;
cursor: pointer;
transition: all 0.2s;

Checked :
  - Background : #2563EB
  - Border-color : #2563EB
  - Icon : ✓ blanc
```

**Label** :
```
Texte : "Livre actif (visible sur le site)"
Font : Inter, Medium
Taille : 15px
Couleur : #374151
Margin-left : 12px
Cursor : pointer
```

**Helper Text** :
```
Texte : "Si décoché, le livre ne sera pas visible sur le site public"
Font : Inter, Regular
Taille : 13px
Couleur : #6B7280
Margin-top : 8px
Margin-left : 32px
```

---

### 5. BOUTONS D'ACTION

**Container** :
```css
display: flex;
justify-content: space-between;
margin-top: 32px;
padding-top: 24px;
border-top: 1px solid #E5E7EB;
```

**Bouton Annuler** :
```css
height: 48px;
padding: 0 32px;
background: white;
border: 1px solid #E5E7EB;
color: #374151;
border-radius: 8px;
font-size: 15px;
font-weight: 600;
cursor: pointer;
transition: all 0.2s;

Hover :
  - Background : #F3F4F6
```

**Bouton Enregistrer** :
```css
height: 48px;
padding: 0 32px;
background: #2563EB;
color: white;
border: none;
border-radius: 8px;
font-size: 15px;
font-weight: 600;
cursor: pointer;
transition: all 0.2s;

Hover :
  - Background : #1E40AF
  - Transform : translateY(-1px)
  - Box-shadow : 0 4px 12px rgba(37, 99, 235, 0.3)

Loading :
  - Background : #93C5FD
  - Cursor : not-allowed
  - Texte : "Enregistrement..."
  - Spinner : Blanc, 16px, à gauche du texte

Disabled :
  - Background : #D1D5DB
  - Cursor : not-allowed
  - Opacity : 0.6
```



---

# VUE 3 : MODIFIER UN LIVRE

**Route** : `/admin/books/[id]/edit`

## 🎨 DESIGN VISUEL

**Layout** : Identique à la vue Créer

**Différences** :

1. **Titre** : `Modifier le Livre`
2. **Champs pré-remplis** avec les données existantes
3. **Prévisualisation des fichiers** actuels
4. **Option de remplacer** les fichiers
5. **Historique des modifications** (optionnel)

## 📐 SPÉCIFICATIONS DÉTAILLÉES - VUE MODIFIER

### 1. HEADER

**Titre** : `Modifier le Livre`

**Badge ID** (optionnel) :
```css
background: #F3F4F6;
color: #6B7280;
padding: 4px 12px;
border-radius: 6px;
font-size: 13px;
font-weight: 500;
margin-left: 12px;
```
Texte : `ID: abc123`

---

### 2. FORMULAIRE

**Identique à la vue Créer** avec ces ajouts :

#### A. Champs Pré-remplis

Tous les champs affichent les valeurs actuelles du livre :
- Titre : Valeur existante
- Auteur : Valeur existante
- Description : Valeur existante
- etc.

#### B. Fichiers Existants

**Couverture Actuelle** :
```
┌────────────────────────────────┐
│ Couverture Actuelle            │
│                                │
│ [Image preview 200x280]        │
│                                │
│ [Changer la couverture]        │
└────────────────────────────────┘
```

**PDF Actuel** :
```
┌────────────────────────────────┐
│ Fichier PDF Actuel             │
│                                │
│ 📄 le-soleil.pdf (2.5 MB)     │
│                                │
│ [Télécharger] [Remplacer]     │
└────────────────────────────────┘
```

**Bouton Télécharger** :
```css
padding: 8px 16px;
background: white;
border: 1px solid #E5E7EB;
color: #374151;
border-radius: 6px;
font-size: 14px;
cursor: pointer;
```

**Bouton Remplacer** :
```css
padding: 8px 16px;
background: #2563EB;
color: white;
border: none;
border-radius: 6px;
font-size: 14px;
cursor: pointer;
```

---

### 3. SECTION HISTORIQUE (Optionnel)

**Container** :
```css
background: #F9FAFB;
border-radius: 12px;
border: 1px solid #E5E7EB;
padding: 24px;
margin-bottom: 24px;
```

**Titre** : `Historique des Modifications`

**Liste** :
```
• 25/01/2026 14:30 - Prix modifié de 8,000 à 8,500 FCFA par Admin Jean
• 20/01/2026 10:15 - Description mise à jour par Admin Marie
• 15/01/2026 09:00 - Livre créé par Super Admin
```

**Style Item** :
```
Font : Inter, Regular
Taille : 14px
Couleur : #6B7280
Line-height : 1.8
```

**Date** :
```
Font-weight : 500
Couleur : #374151
```

**Admin** :
```
Font-weight : 500
Couleur : #2563EB
```

---

### 4. BOUTONS D'ACTION

**Identique à la vue Créer** avec :

**Bouton Enregistrer** : Texte `Enregistrer les modifications`

**Bouton Supprimer** (si permission) :
```css
height: 48px;
padding: 0 32px;
background: white;
border: 1px solid #EF4444;
color: #EF4444;
border-radius: 8px;
font-size: 15px;
font-weight: 600;
cursor: pointer;
transition: all 0.2s;

Hover :
  - Background : #FEE2E2
```

**Layout Boutons** :
```
[Supprimer]          [Annuler] [Enregistrer]
     ↓                    ↓          ↓
   Gauche              Droite     Droite
```

---

# COMPOSANTS COMMUNS

## 1. TOAST NOTIFICATIONS

### Toast Succès (Création)

```
┌────────────────────────────────┐
│ ✅ Livre créé avec succès !    │
└────────────────────────────────┘

Position : Top-right
Background : #10B981
Color : white
Padding : 16px 20px
Border-radius : 8px
Box-shadow : 0 4px 12px rgba(0,0,0,0.15)
Duration : 3 secondes
Animation : Slide in from right
```

### Toast Succès (Modification)

```
✅ Livre modifié avec succès !
```

### Toast Succès (Suppression)

```
✅ Livre supprimé avec succès !
```

### Toast Erreur

```
❌ Erreur lors de l'enregistrement. Veuillez réessayer.

Background : #EF4444
```

### Toast Avertissement (Validation)

```
⚠️ Veuillez remplir tous les champs obligatoires.

Background : #F59E0B
```

---

## 2. ÉTATS DE CHARGEMENT

### Skeleton Loader (Liste)

```
┌────────────────────────────────────────────────────────────┐
│ [▭▭▭] [▭▭▭▭▭▭▭▭] [▭▭▭▭▭] [▭▭▭▭▭] [▭▭▭] [▭▭] [▭]         │
│ [▭▭▭] [▭▭▭▭▭▭▭▭] [▭▭▭▭▭] [▭▭▭▭▭] [▭▭▭] [▭▭] [▭]         │
│ [▭▭▭] [▭▭▭▭▭▭▭▭] [▭▭▭▭▭] [▭▭▭▭▭] [▭▭▭] [▭▭] [▭]         │
└────────────────────────────────────────────────────────────┘

Background : #F3F4F6
Animation : Pulse (shimmer effect)
```

### Spinner (Upload)

```
Position : Center de la zone upload
Size : 32px
Color : #2563EB
Animation : Rotate 360deg, 1s linear infinite
```

---

## 3. ÉTAT VIDE (Aucun Livre)

```
┌────────────────────────────────────────────────────────────┐
│                                                             │
│                         📚                                  │
│                                                             │
│                  Aucun livre pour le moment                │
│                                                             │
│         Commencez par ajouter votre premier livre          │
│                                                             │
│                  [+ Ajouter un livre]                       │
│                                                             │
└────────────────────────────────────────────────────────────┘

Icône : 64px, couleur #D1D5DB
Titre : Inter, Semibold, 20px, #374151
Sous-titre : Inter, Regular, 15px, #9CA3AF
Bouton : Style primaire
```

---

# RESPONSIVE DESIGN

## Desktop (> 1024px)
- Formulaire : 1 colonne, max-width 800px
- Tableau : Toutes les colonnes visibles
- Filtres : En ligne

## Tablet (641-1024px)
- Formulaire : 1 colonne
- Tableau : Scroll horizontal si nécessaire
- Filtres : En ligne, wrap si nécessaire

## Mobile (< 640px)
- Formulaire : 1 colonne, padding réduit
- Tableau : Mode cards (empilé)
- Filtres : Empilés verticalement
- Boutons : Full width

### Tableau Mode Cards (Mobile)

```
┌────────────────────────────────┐
│ [Image]                        │
│                                │
│ Le Soleil des Indépendances    │
│ Ahmadou Kourouma               │
│                                │
│ Romans Africains               │
│ 8,500 FCFA                     │
│                                │
│ ✅ Actif                       │
│                                │
│ [Voir] [Modifier] [Supprimer] │
└────────────────────────────────┘
```

---

# INTERACTIONS ET ANIMATIONS

## 1. Recherche en Temps Réel

```javascript
// Debounce de 300ms
const handleSearch = debounce((query) => {
  filterBooks(query);
}, 300);
```

## 2. Filtres

```javascript
// Appliquer immédiatement au changement
const handleFilterChange = (filter, value) => {
  updateFilters({ ...filters, [filter]: value });
  fetchBooks({ ...filters, [filter]: value });
};
```

## 3. Upload de Fichiers

```javascript
// Validation avant upload
const handleFileUpload = (file) => {
  // Vérifier type
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    showToast('Format de fichier non supporté', 'error');
    return;
  }
  
  // Vérifier taille
  if (file.size > 5 * 1024 * 1024) {
    showToast('Fichier trop volumineux (max 5MB)', 'error');
    return;
  }
  
  // Upload
  uploadFile(file);
};
```

## 4. Génération Automatique du Slug

```javascript
// Générer slug depuis le titre
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Appliquer au changement du titre
titleInput.addEventListener('input', (e) => {
  slugInput.value = generateSlug(e.target.value);
});
```

---

# VALIDATION DES DONNÉES

## Règles de Validation

### Titre
- Requis
- Min : 2 caractères
- Max : 200 caractères
- Message : "Le titre doit contenir entre 2 et 200 caractères"

### Auteur
- Requis
- Min : 2 caractères
- Max : 100 caractères
- Message : "Le nom de l'auteur doit contenir entre 2 et 100 caractères"

### Description
- Requis
- Min : 50 caractères
- Max : 5000 caractères
- Message : "La description doit contenir entre 50 et 5000 caractères"

### Prix
- Requis
- Type : Nombre entier positif
- Min : 100 FCFA
- Max : 1,000,000 FCFA
- Message : "Le prix doit être entre 100 et 1,000,000 FCFA"

### Couverture
- Requis (création)
- Formats : JPG, PNG, WebP
- Taille max : 5 MB
- Dimensions recommandées : 800x1200px
- Message : "Veuillez uploader une image de couverture (JPG, PNG ou WebP, max 5MB)"

### PDF
- Requis (création)
- Format : PDF
- Taille max : 50 MB
- Message : "Veuillez uploader le fichier PDF du livre (max 50MB)"

---

# PERMISSIONS ET SÉCURITÉ

## Affichage Conditionnel

### Bouton "Ajouter un livre"
```javascript
{user.permissions?.canCreateBooks && (
  <Button>+ Ajouter un livre</Button>
)}
```

### Action "Modifier"
```javascript
{user.permissions?.canEditBooks && (
  <MenuItem>Modifier</MenuItem>
)}
```

### Action "Supprimer"
```javascript
{user.permissions?.canDeleteBooks && (
  <MenuItem>Supprimer</MenuItem>
)}
```

## Vérifications Côté Serveur

Toutes les actions doivent être vérifiées côté serveur :
- Authentification
- Rôle admin
- Permission spécifique
- Validation des données

---

# PALETTE DE COULEURS

```css
/* Primaire */
--primary: #2563EB;
--primary-dark: #1E40AF;
--primary-light: #DBEAFE;

/* Succès */
--success: #10B981;
--success-light: #D1FAE5;

/* Danger */
--danger: #EF4444;
--danger-light: #FEE2E2;

/* Avertissement */
--warning: #F59E0B;
--warning-light: #FEF3C7;

/* Texte */
--text-primary: #111827;
--text-secondary: #374151;
--text-muted: #6B7280;
--text-light: #9CA3AF;

/* Bordures */
--border: #E5E7EB;
--border-light: #F3F4F6;

/* Backgrounds */
--bg-white: #FFFFFF;
--bg-gray: #F9FAFB;
```

---

# CHECKLIST DE VÉRIFICATION

## Vue Liste
- [ ] Header avec titre et bouton ajouter
- [ ] Barre de recherche fonctionnelle
- [ ] 3 filtres (Collection, Statut, Prix)
- [ ] Tableau avec 7 colonnes
- [ ] Images de couverture affichées
- [ ] Badges de statut colorés
- [ ] Menu actions (3 points)
- [ ] Pagination fonctionnelle
- [ ] Modal confirmation suppression
- [ ] État vide si aucun livre
- [ ] Skeleton loader pendant chargement

## Vue Créer
- [ ] Bouton retour fonctionnel
- [ ] 3 sections (Infos, Fichiers, Statut)
- [ ] Tous les champs présents
- [ ] Labels avec astérisque pour champs requis
- [ ] Placeholders informatifs
- [ ] Upload couverture avec prévisualisation
- [ ] Upload PDF avec affichage nom/taille
- [ ] Checkbox statut actif
- [ ] Boutons Annuler et Enregistrer
- [ ] Validation en temps réel
- [ ] Messages d'erreur clairs
- [ ] Toast de succès après création

## Vue Modifier
- [ ] Identique à Créer avec données pré-remplies
- [ ] Prévisualisation fichiers actuels
- [ ] Boutons Télécharger et Remplacer
- [ ] Historique des modifications (optionnel)
- [ ] Bouton Supprimer (si permission)
- [ ] Toast de succès après modification

## Général
- [ ] Responsive mobile testé
- [ ] Permissions vérifiées
- [ ] Animations fluides
- [ ] Accessibilité (labels, contraste)
- [ ] Performance optimisée

---

**FIN DU BRIEF - 03-gestion-livres.md**

**Prochaine étape** : `04-gestion-collections.md` (Structure similaire)
