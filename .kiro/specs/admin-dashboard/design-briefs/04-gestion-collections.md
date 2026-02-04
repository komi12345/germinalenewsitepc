# 📖 GESTION DES COLLECTIONS

**Fichier** : 04-gestion-collections.md  
**Route** : `/admin/collections`  
**Objectif** : Gestion complète des collections (Liste, Créer, Modifier)

---

## ⚠️ INSTRUCTION IMPORTANTE

**RESPECTER SCRUPULEUSEMENT** toutes les spécifications. Structure similaire à la gestion des livres avec des adaptations pour les collections.

---

## 🎯 VUES

- **Vue 1 - Liste** : Tableau des collections avec filtres
- **Vue 2 - Créer** : Formulaire de création avec sélection de livres
- **Vue 3 - Modifier** : Formulaire d'édition

**Accessible par** : Admins avec permission `canViewCollections`

---

# VUE 1 : LISTE DES COLLECTIONS

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Gestion des Collections                     [+ Ajouter]    │
├─────────────────────────────────────────────────────────────┤
│  [🔍 Rechercher par nom...]                                 │
│  Statut: [Tous ▼]  Prix: [Tous ▼]                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [img] │ Nom │ Description │ Livres │ Prix │ Statut │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ [img] │ Rom.│ Découvrez...│   12   │ 50k  │ ✅     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Spécifications

### Tableau

**Colonnes** :
1. Couverture (80px) - Image 60x60
2. Nom (flex: 2) - Bold, #111827
3. Description (flex: 3) - Tronquée, max 100 caractères
4. Nb Livres (100px) - Badge bleu
5. Prix (120px) - Format "50,000 FCFA"
6. Statut (100px) - Badge vert/gris
7. Actions (60px) - Menu 3 points

**Badge Nombre de Livres** :
```css
background: #DBEAFE;
color: #2563EB;
padding: 4px 12px;
border-radius: 12px;
font-size: 13px;
font-weight: 600;
```

---

# VUE 2 : CRÉER UNE COLLECTION

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ← Retour    Nouvelle Collection                            │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐    │
│  │ Informations Générales                             │    │
│  │ ─────────────────────                              │    │
│  │ Nom de la collection *                             │    │
│  │ [_______________________________________]          │    │
│  │ Slug (URL)                                         │    │
│  │ [_______________________________________]          │    │
│  │ Description *                                      │    │
│  │ [_______________________________________]          │    │
│  │ Prix de la collection (FCFA) *                     │    │
│  │ [_______________________________________]          │    │
│  │ Couverture *                                       │    │
│  │ [📁 Choisir un fichier]                            │    │
│  └────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Livres Inclus                                      │    │
│  │ ─────────────                                      │    │
│  │ ☑ Le Soleil des Indépendances                      │    │
│  │ ☑ Une si longue lettre                             │    │
│  │ ☐ L'Enfant noir                                    │    │
│  │ ☐ Sous l'orage                                     │    │
│  │                                                     │    │
│  │ [Sélectionner tous] [Désélectionner tous]          │    │
│  └────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Statut                                             │    │
│  │ ☑ Collection active                                │    │
│  └────────────────────────────────────────────────────┘    │
│  [Annuler]                [Enregistrer la collection]      │
└─────────────────────────────────────────────────────────────┘
```

## Spécifications

### Section Livres Inclus

**Container** :
```css
background: white;
border-radius: 12px;
border: 1px solid #E5E7EB;
padding: 32px;
margin-bottom: 24px;
```

**Liste de Livres** :
```css
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 12px;
margin-bottom: 16px;
```

**Item Livre** :
```css
display: flex;
align-items: center;
padding: 12px;
border: 1px solid #E5E7EB;
border-radius: 8px;
cursor: pointer;
transition: all 0.2s;

Hover :
  - Background : #F9FAFB
  - Border-color : #2563EB

Selected :
  - Background : #EFF6FF
  - Border-color : #2563EB
  - Border-width : 2px
```

**Checkbox** :
```css
width: 20px;
height: 20px;
margin-right: 12px;
```

**Texte** :
```
Font : Inter, Medium
Taille : 14px
Couleur : #374151
```

**Boutons Sélection** :
```css
display: flex;
gap: 12px;
```

**Bouton** :
```css
padding: 8px 16px;
background: white;
border: 1px solid #E5E7EB;
border-radius: 6px;
font-size: 14px;
cursor: pointer;

Hover :
  - Background : #F3F4F6
```

### Validation

**Nom** :
- Requis, 2-100 caractères
- Message : "Le nom de la collection est requis"

**Description** :
- Requis, 50-2000 caractères

**Prix** :
- Requis, nombre positif
- Min : 1000 FCFA

**Couverture** :
- Requis, JPG/PNG/WebP, max 5MB

**Livres** :
- Au moins 1 livre sélectionné
- Message : "Veuillez sélectionner au moins un livre"

---

# VUE 3 : MODIFIER UNE COLLECTION

Identique à la vue Créer avec :
- Titre : "Modifier la Collection"
- Champs pré-remplis
- Livres déjà sélectionnés cochés
- Bouton Supprimer (si permission)

---

# RESPONSIVE

- Desktop : 2 colonnes pour les livres
- Mobile : 1 colonne pour les livres

---

# PERMISSIONS

```javascript
// Bouton Ajouter
{user.permissions?.canCreateCollections && <Button />}

// Action Modifier
{user.permissions?.canEditCollections && <MenuItem />}

// Action Supprimer
{user.permissions?.canDeleteCollections && <MenuItem />}
```

---

# PALETTE DE COULEURS

Identique à la gestion des livres.

---

**FIN DU BRIEF - 04-gestion-collections.md**
