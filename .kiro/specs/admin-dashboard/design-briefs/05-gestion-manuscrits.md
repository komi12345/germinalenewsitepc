# 📝 GESTION DES MANUSCRITS

**Fichier** : 05-gestion-manuscrits.md  
**Route** : `/admin/manuscripts`  
**Objectif** : Gestion des manuscrits soumis (Liste, Détail)

---

## ⚠️ INSTRUCTION IMPORTANTE

**RESPECTER SCRUPULEUSEMENT** toutes les spécifications. Cette section permet de gérer les manuscrits soumis par les auteurs.

---

## 🎯 VUES

- **Vue 1 - Liste** : Tableau des manuscrits avec filtres par statut
- **Vue 2 - Détail** : Page détail avec changement de statut et notes

**Accessible par** : Admins avec permission `canViewManuscripts`

---

# VUE 1 : LISTE DES MANUSCRITS

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Manuscrits Soumis                                          │
├─────────────────────────────────────────────────────────────┤
│  [🔍 Rechercher par titre ou auteur...]                     │
│  Statut: [Tous ▼] [En attente] [En révision] [Accepté]     │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Titre │ Auteur │ Email │ Genre │ Date │ Statut │ ... │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ Mon R.│ Jean D.│ j@... │ Roman │ 01/02│ 🟡     │ ⋮  │  │
│  │ Poésie│ Marie  │ m@... │ Poésie│ 28/01│ 🔵     │ ⋮  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Spécifications

### Filtres Statut

**Boutons Radio/Tabs** :
```css
display: flex;
gap: 8px;
margin-bottom: 24px;
```

**Bouton** :
```css
padding: 8px 16px;
border-radius: 8px;
border: 1px solid #E5E7EB;
background: white;
font-size: 14px;
cursor: pointer;
transition: all 0.2s;

Active :
  - Background : #2563EB
  - Color : white
  - Border-color : #2563EB
```

**Options** :
- Tous
- 🟡 En attente (PENDING)
- 🔵 En révision (REVIEWING)
- ✅ Accepté (ACCEPTED)
- ❌ Rejeté (REJECTED)

### Tableau

**Colonnes** :
1. Titre (flex: 2)
2. Auteur (flex: 1)
3. Email (flex: 1)
4. Genre (120px)
5. Date Soumission (120px)
6. Statut (120px)
7. Actions (60px)

**Badges Statut** :

**En attente** :
```css
background: #FEF3C7;
color: #D97706;
```

**En révision** :
```css
background: #DBEAFE;
color: #2563EB;
```

**Accepté** :
```css
background: #D1FAE5;
color: #059669;
```

**Rejeté** :
```css
background: #FEE2E2;
color: #DC2626;
```

### Actions

**Menu Dropdown** :
- 👁️ Voir détails
- 📥 Télécharger PDF
- ✏️ Changer statut (si canManageManuscripts)

---

# VUE 2 : DÉTAIL MANUSCRIT

**Route** : `/admin/manuscripts/[id]`

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ← Retour    Manuscrit : "Mon Roman"                        │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐    │
│  │ Informations                                       │    │
│  │ ────────────                                       │    │
│  │ Titre : Mon Roman                                  │    │
│  │ Auteur : Jean Dupont                               │    │
│  │ Email : jean.dupont@email.com                      │    │
│  │ Genre : Roman                                      │    │
│  │ Date de soumission : 01 février 2026, 14:30       │    │
│  └────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Synopsis                                           │    │
│  │ ────────                                           │    │
│  │ [Texte du synopsis sur plusieurs lignes...]       │    │
│  └────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Fichier PDF                                        │    │
│  │ ───────────                                        │    │
│  │ 📄 mon-roman.pdf (2.5 MB)                          │    │
│  │ [📥 Télécharger le PDF]                            │    │
│  └────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Gestion du Manuscrit                               │    │
│  │ ────────────────────                               │    │
│  │ Statut actuel : 🟡 En attente                      │    │
│  │                                                     │    │
│  │ Changer le statut :                                │    │
│  │ ( ) En attente                                     │    │
│  │ (•) En révision                                    │    │
│  │ ( ) Accepté                                        │    │
│  │ ( ) Rejeté                                         │    │
│  │                                                     │    │
│  │ Notes de l'administrateur (optionnel)              │    │
│  │ [_______________________________________]          │    │
│  │ [_______________________________________]          │    │
│  │                                                     │    │
│  │ Ces notes seront envoyées par email à l'auteur     │    │
│  │ si le manuscrit est accepté ou rejeté.             │    │
│  │                                                     │    │
│  │ [Annuler]  [Enregistrer les modifications]        │    │
│  └────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Historique                                         │    │
│  │ ──────────                                         │    │
│  │ • 01/02/2026 14:30 - Manuscrit soumis             │    │
│  │ • 01/02/2026 15:45 - Statut changé en "En         │    │
│  │   révision" par Admin Jean                         │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Spécifications

### Section Informations

**Container** :
```css
background: white;
border-radius: 12px;
border: 1px solid #E5E7EB;
padding: 24px;
margin-bottom: 24px;
```

**Ligne Info** :
```css
display: flex;
margin-bottom: 12px;
```

**Label** :
```
Font : Inter, Semibold
Taille : 14px
Couleur : #6B7280
Width : 180px
```

**Valeur** :
```
Font : Inter, Regular
Taille : 14px
Couleur : #111827
```

### Section Synopsis

**Texte** :
```css
font-size: 15px;
line-height: 1.7;
color: #374151;
white-space: pre-wrap;
```

### Section Fichier PDF

**Affichage Fichier** :
```css
display: flex;
align-items: center;
gap: 12px;
padding: 16px;
background: #F9FAFB;
border-radius: 8px;
margin-bottom: 16px;
```

**Icône** : 📄 (FileText) 24px, #6B7280

**Nom + Taille** :
```
Font : Inter, Medium
Taille : 14px
Couleur : #374151
```

**Bouton Télécharger** :
```css
padding: 10px 20px;
background: #2563EB;
color: white;
border-radius: 8px;
font-size: 14px;
font-weight: 600;
display: flex;
align-items: center;
gap: 8px;
cursor: pointer;
```

### Section Gestion

**Statut Actuel** :
```css
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
background: #F9FAFB;
border-radius: 8px;
margin-bottom: 24px;
```

**Radio Buttons** :
```css
display: flex;
flex-direction: column;
gap: 12px;
margin-bottom: 24px;
```

**Radio Item** :
```css
display: flex;
align-items: center;
padding: 12px;
border: 1px solid #E5E7EB;
border-radius: 8px;
cursor: pointer;

Selected :
  - Border-color : #2563EB
  - Background : #EFF6FF
```

**Textarea Notes** :
```css
width: 100%;
min-height: 120px;
padding: 12px 16px;
border: 1px solid #E5E7EB;
border-radius: 8px;
font-size: 14px;
font-family: Inter;
resize: vertical;
margin-bottom: 12px;
```

**Helper Text** :
```
Font : Inter, Regular
Taille : 13px
Couleur : #6B7280
Font-style : italic
```

### Section Historique

**Timeline** :
```css
position: relative;
padding-left: 24px;
```

**Item** :
```css
position: relative;
padding-bottom: 16px;

Before (bullet) :
  - Content : circle
  - Position : absolute
  - Left : -24px
  - Width : 8px
  - Height : 8px
  - Background : #2563EB
  - Border-radius : 50%
```

**Texte** :
```
Font : Inter, Regular
Taille : 14px
Couleur : #6B7280
Line-height : 1.6
```

**Date** :
```
Font-weight : 500
Couleur : #374151
```

---

# NOTIFICATIONS EMAIL

### Manuscrit Accepté

**Sujet** : `✅ Votre manuscrit "${titre}" a été accepté !`

**Contenu** :
- Félicitations
- Notes de l'admin (si fournies)
- Prochaines étapes

### Manuscrit Rejeté

**Sujet** : `Réponse concernant votre manuscrit "${titre}"`

**Contenu** :
- Message poli
- Notes de l'admin (si fournies)
- Encouragement à soumettre d'autres œuvres

---

# PERMISSIONS

```javascript
// Changer statut et ajouter notes
{user.permissions?.canManageManuscripts && (
  <GestionSection />
)}
```

---

# TOASTS

- ✅ "Statut du manuscrit mis à jour avec succès !"
- ✅ "Email envoyé à l'auteur"
- ❌ "Erreur lors de la mise à jour"

---

**FIN DU BRIEF - 05-gestion-manuscrits.md**
