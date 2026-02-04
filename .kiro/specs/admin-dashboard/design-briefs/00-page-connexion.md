# 🔐 PAGE DE CONNEXION ADMINISTRATEUR

**Fichier** : 00-page-connexion.md  
**Route** : `/admin/login`  
**Objectif** : Page de connexion unique pour tous les administrateurs (Super Admin et Admin Simple)

---

## ⚠️ INSTRUCTION IMPORTANTE POUR GOOGLE STITCH

**RESPECTER SCRUPULEUSEMENT** toutes les spécifications ci-dessous. Ne modifier AUCUN élément, couleur, disposition ou texte sans accord préalable. Chaque détail a été pensé pour la cohérence du système.

---

## 🎯 OBJECTIF DE LA PAGE

Cette page permet à tous les administrateurs (Super Admin et Admin Simple) de se connecter au dashboard. Le système détectera automatiquement le rôle après connexion.

**Caractéristiques** :
- Design professionnel et épuré
- Formulaire centré sur fond dégradé
- Validation en temps réel
- Messages d'erreur clairs
- Responsive (mobile, tablet, desktop)

---

## 🎨 DESIGN VISUEL

### Layout Global

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                    [FOND DÉGRADÉ BLEU]                       │
│                                                              │
│                                                              │
│              ┌──────────────────────────────┐               │
│              │                              │               │
│              │         [LOGO]               │               │
│              │                              │               │
│              │   Connexion Administrateur   │               │
│              │                              │               │
│              │   Email                      │               │
│              │   [___________________]      │               │
│              │                              │               │
│              │   Mot de passe               │               │
│              │   [___________________] 👁️   │               │
│              │                              │               │
│              │   ☐ Se souvenir de moi       │               │
│              │                              │               │
│              │   [    Se connecter    ]     │               │
│              │                              │               │
│              │   Mot de passe oublié ?      │               │
│              │                              │               │
│              └──────────────────────────────┘               │
│                                                              │
│                                                              │
│                    © 2026 Éditions Germinale                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📐 SPÉCIFICATIONS DÉTAILLÉES

### 1. FOND DE PAGE

**Dégradé** :
```css
background: linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #3B82F6 100%);
min-height: 100vh;
display: flex;
align-items: center;
justify-content: center;
```

**Effet supplémentaire** :
- Ajouter un pattern subtil (points ou grille) en overlay avec opacité 5%
- Animation douce du dégradé (optionnel)

---

### 2. CARTE DE CONNEXION

**Dimensions** :
- Largeur : 450px (desktop)
- Largeur : 90% (mobile, max 400px)
- Padding : 48px (desktop), 32px (mobile)
- Border-radius : 16px

**Style** :
```css
background: white;
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
border-radius: 16px;
padding: 48px;
```

**Contenu de la carte** :

#### A. Logo
- Position : Centré en haut
- Taille : 80px x 80px
- Margin-bottom : 24px
- Image : Logo Éditions Germinale (or sur fond noir circulaire)

#### B. Titre
```
Texte : "Connexion Administrateur"
Font : Inter, Bold
Taille : 28px (desktop), 24px (mobile)
Couleur : #111827 (gray-900)
Align : center
Margin-bottom : 32px
```

---

### 3. FORMULAIRE

#### A. Champ Email

**Label** :
```
Texte : "Email"
Font : Inter, Medium
Taille : 14px
Couleur : #374151 (gray-700)
Margin-bottom : 8px
```

**Input** :
```css
width: 100%;
height: 48px;
padding: 12px 16px;
border: 1px solid #E5E7EB;
border-radius: 8px;
font-size: 16px;
color: #111827;
background: white;
transition: all 0.2s;
```

**État Focus** :
```css
border-color: #2563EB;
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
outline: none;
```

**État Erreur** :
```css
border-color: #EF4444;
box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
```

**Placeholder** : `admin@editiongerminale.com`

**Margin-bottom** : 20px

#### B. Champ Mot de Passe

**Label** :
```
Texte : "Mot de passe"
Font : Inter, Medium
Taille : 14px
Couleur : #374151 (gray-700)
Margin-bottom : 8px
```

**Input** :
- Même style que le champ Email
- Type : password (avec possibilité de toggle)
- Placeholder : `••••••••`

**Icône Œil** :
- Position : Absolute, right 16px
- Taille : 20px
- Couleur : #6B7280 (gray-500)
- Hover : #374151 (gray-700)
- Fonction : Toggle entre password et text

**Margin-bottom** : 20px

#### C. Checkbox "Se souvenir de moi"

```
☐ Se souvenir de moi

Checkbox :
- Taille : 18px x 18px
- Border : 1px solid #D1D5DB
- Border-radius : 4px
- Checked background : #2563EB
- Checked icon : ✓ blanc

Label :
- Font : Inter, Regular
- Taille : 14px
- Couleur : #6B7280
- Margin-left : 8px
```

**Margin-bottom** : 24px

---

### 4. BOUTON DE CONNEXION

**Style** :
```css
width: 100%;
height: 48px;
background: #2563EB;
color: white;
border: none;
border-radius: 8px;
font-size: 16px;
font-weight: 600;
cursor: pointer;
transition: all 0.2s;
```

**Hover** :
```css
background: #1E40AF;
transform: translateY(-1px);
box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
```

**Active** :
```css
transform: translateY(0);
```

**Loading** :
```css
background: #93C5FD;
cursor: not-allowed;
```
- Afficher un spinner blanc à gauche du texte
- Texte : "Connexion en cours..."

**Disabled** :
```css
background: #D1D5DB;
cursor: not-allowed;
opacity: 0.6;
```

**Margin-bottom** : 16px

---

### 5. LIEN "MOT DE PASSE OUBLIÉ"

```
Texte : "Mot de passe oublié ?"
Font : Inter, Medium
Taille : 14px
Couleur : #2563EB
Align : center
Hover : #1E40AF + underline
Cursor : pointer
```

---

### 6. FOOTER (EN BAS DE LA CARTE)

```
Texte : "© 2026 Éditions Germinale"
Font : Inter, Regular
Taille : 12px
Couleur : #9CA3AF (gray-400)
Align : center
Margin-top : 32px
```

---

## 🔔 MESSAGES ET NOTIFICATIONS

### Message d'Erreur (sous le champ concerné)

```
Style :
- Font : Inter, Regular
- Taille : 13px
- Couleur : #EF4444 (red)
- Margin-top : 6px
- Icon : ⚠️ (optionnel)

Exemples :
- "Veuillez entrer une adresse email valide"
- "Le mot de passe est requis"
- "Email ou mot de passe incorrect"
```

### Toast de Succès (après connexion réussie)

```
Position : Top-right
Background : #10B981 (green)
Texte : "✅ Connexion réussie ! Redirection..."
Durée : 2 secondes
Animation : Slide in from right
```

### Toast d'Erreur (erreur serveur)

```
Position : Top-right
Background : #EF4444 (red)
Texte : "❌ Erreur de connexion. Veuillez réessayer."
Durée : 4 secondes
Animation : Slide in from right
```

---

## 📱 RESPONSIVE DESIGN

### Desktop (> 1024px)
- Carte : 450px de large
- Padding : 48px
- Font-size titre : 28px

### Tablet (641px - 1024px)
- Carte : 400px de large
- Padding : 40px
- Font-size titre : 26px

### Mobile (< 640px)
- Carte : 90% de large (max 400px)
- Padding : 32px
- Font-size titre : 24px
- Margin : 20px

---

## ⚡ INTERACTIONS ET ANIMATIONS

### 1. Chargement de la Page
```
Animation : Fade in de la carte
Durée : 0.4s
Easing : ease-out
```

### 2. Focus sur Input
```
Transition : border-color et box-shadow
Durée : 0.2s
Easing : ease-in-out
```

### 3. Hover sur Bouton
```
Transition : background, transform, box-shadow
Durée : 0.2s
Easing : ease-in-out
```

### 4. Soumission du Formulaire
```
1. Bouton passe en état loading
2. Spinner apparaît
3. Désactiver tous les champs
4. Après réponse :
   - Succès : Toast vert + redirection après 1s
   - Erreur : Toast rouge + réactiver les champs
```

---

## 🔒 SÉCURITÉ ET VALIDATION

### Validation Côté Client

**Email** :
- Format email valide (regex)
- Message : "Veuillez entrer une adresse email valide"

**Mot de passe** :
- Minimum 1 caractère (juste vérifier non vide)
- Message : "Le mot de passe est requis"

### Validation en Temps Réel
- Valider à la perte de focus (onBlur)
- Afficher les erreurs immédiatement
- Retirer les erreurs dès que corrigé

### Protection
- Désactiver le bouton si formulaire invalide
- Limiter les tentatives (côté serveur)
- Pas de message spécifique "email n'existe pas" ou "mot de passe incorrect" (sécurité)
- Message générique : "Email ou mot de passe incorrect"

---

## 🎨 PALETTE DE COULEURS UTILISÉE

```css
/* Primaire */
--primary: #2563EB;
--primary-dark: #1E40AF;
--primary-light: #3B82F6;

/* Succès */
--success: #10B981;

/* Erreur */
--error: #EF4444;

/* Texte */
--text-primary: #111827;
--text-secondary: #374151;
--text-muted: #6B7280;
--text-light: #9CA3AF;

/* Bordures */
--border: #E5E7EB;
--border-dark: #D1D5DB;

/* Background */
--bg-white: #FFFFFF;
```

---

## 📋 CHECKLIST DE VÉRIFICATION

Avant de valider le design, vérifier :

- [ ] Dégradé de fond bleu appliqué
- [ ] Carte centrée verticalement et horizontalement
- [ ] Logo présent et centré
- [ ] Titre "Connexion Administrateur" en gras
- [ ] Champ Email avec label et placeholder
- [ ] Champ Mot de passe avec icône œil
- [ ] Checkbox "Se souvenir de moi" fonctionnelle
- [ ] Bouton "Se connecter" en bleu primaire
- [ ] Lien "Mot de passe oublié ?" en bleu
- [ ] Footer avec copyright
- [ ] États hover sur tous les éléments interactifs
- [ ] États focus sur les inputs
- [ ] Messages d'erreur en rouge sous les champs
- [ ] Responsive mobile testé
- [ ] Animations fluides

---

## 🚀 NOTES POUR L'IMPLÉMENTATION

### Après Connexion Réussie

```javascript
// Pseudo-code
if (loginSuccess) {
  // 1. Afficher toast succès
  showToast("✅ Connexion réussie !");
  
  // 2. Attendre 1 seconde
  await delay(1000);
  
  // 3. Rediriger vers dashboard
  router.push("/admin");
}
```

### Gestion des Rôles

Le système détecte automatiquement le rôle après connexion :
- Si `role === "SUPER_ADMIN"` → Accès complet
- Si `role === "ADMIN"` → Accès selon permissions

**Pas besoin de boutons séparés** pour Super Admin et Admin Simple !

---

## 📸 RÉFÉRENCES VISUELLES

**Inspiration** :
- Vercel Login Page (simplicité)
- Stripe Dashboard Login (professionnalisme)
- Linear Login (élégance)

**Style** : Moderne, épuré, professionnel

---

## ✅ VALIDATION FINALE

Ce design doit être :
- ✅ Professionnel et rassurant
- ✅ Simple et intuitif
- ✅ Responsive sur tous les écrans
- ✅ Accessible (contraste, labels)
- ✅ Sécurisé (validation, messages)

---

**FIN DU BRIEF - 00-page-connexion.md**

**Prochaine étape** : `01-layout-principal.md` (Sidebar + Header + Footer)
