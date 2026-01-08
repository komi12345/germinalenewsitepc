# Requirements Document

## Introduction

Cette fonctionnalité ajoute une section "Blog et Actualités" sur la page d'accueil du site Éditions Germinale. La section sera positionnée entre la section Témoignages et la section Contact ("Démarrons une conversation"). Elle affichera les derniers articles du blog avec un design moderne respectant le code couleur noir/or/blanc du site.

## Glossary

- **Blog_Section**: Section de la homepage affichant les articles de blog récents
- **Article_Card**: Carte individuelle représentant un article de blog
- **Category_Badge**: Badge coloré indiquant la catégorie de l'article
- **Author_Info**: Informations sur l'auteur de l'article (avatar, nom, date)

## Requirements

### Requirement 1: Affichage de la section Blog

**User Story:** As a visiteur, I want to voir une section Blog et Actualités sur la page d'accueil, so that I can découvrir les derniers contenus éditoriaux.

#### Acceptance Criteria

1. THE Blog_Section SHALL afficher un titre "Blog" en couleur gold
2. THE Blog_Section SHALL afficher un sous-titre descriptif en couleur light-dimmed
3. THE Blog_Section SHALL afficher un lien "Voir plus" avec une flèche vers la droite en couleur gold
4. THE Blog_Section SHALL avoir un fond de couleur dark (noir)
5. THE Blog_Section SHALL être positionnée entre TestimonialsSection et ContactSection

### Requirement 2: Affichage des cartes d'articles

**User Story:** As a visiteur, I want to voir les articles sous forme de cartes visuelles, so that I can rapidement identifier les contenus qui m'intéressent.

#### Acceptance Criteria

1. THE Blog_Section SHALL afficher exactement 3 Article_Card en grille responsive
2. WHEN l'écran est en mode desktop, THE Article_Card SHALL s'afficher sur 3 colonnes
3. WHEN l'écran est en mode tablette, THE Article_Card SHALL s'afficher sur 2 colonnes
4. WHEN l'écran est en mode mobile, THE Article_Card SHALL s'afficher sur 1 colonne
5. THE Article_Card SHALL avoir des coins arrondis (rounded-2xl)
6. THE Article_Card SHALL avoir un fond de couleur dark-light

### Requirement 3: Contenu des cartes d'articles

**User Story:** As a visiteur, I want to voir les informations essentielles de chaque article, so that I can décider si je veux le lire.

#### Acceptance Criteria

1. THE Article_Card SHALL afficher une image de couverture en haut de la carte
2. THE Article_Card SHALL afficher un Category_Badge positionné en haut à gauche de l'image
3. THE Category_Badge SHALL avoir un fond de couleur gold et un texte en couleur dark
4. THE Article_Card SHALL afficher le titre de l'article en couleur light
5. THE Article_Card SHALL afficher un extrait/description de l'article en couleur light-dimmed
6. THE Article_Card SHALL afficher les Author_Info en bas de la carte

### Requirement 4: Informations de l'auteur

**User Story:** As a visiteur, I want to voir qui a écrit l'article et quand, so that I can évaluer la pertinence et la fraîcheur du contenu.

#### Acceptance Criteria

1. THE Author_Info SHALL afficher un avatar circulaire de l'auteur
2. THE Author_Info SHALL afficher le nom de l'auteur en couleur light
3. THE Author_Info SHALL afficher la date de publication en couleur light-dimmed
4. THE Author_Info SHALL être séparé par un point (•) entre le nom et la date
5. WHEN l'auteur est "Éditions Germinale", THE avatar SHALL afficher les initiales "EG" sur fond gold

### Requirement 5: Interactions et hover

**User Story:** As a visiteur, I want to avoir un feedback visuel quand je survole une carte, so that I can comprendre que c'est cliquable.

#### Acceptance Criteria

1. WHEN un utilisateur survole une Article_Card, THE Article_Card SHALL afficher une bordure gold subtile
2. WHEN un utilisateur survole le lien "Voir plus", THE lien SHALL avoir un effet de soulignement
3. THE Article_Card SHALL avoir une transition fluide sur les effets hover (duration-200)

### Requirement 6: Accessibilité

**User Story:** As a utilisateur avec des besoins d'accessibilité, I want to pouvoir naviguer et comprendre la section, so that I can accéder au contenu du blog.

#### Acceptance Criteria

1. THE Blog_Section SHALL avoir un attribut data-testid="blog-section"
2. THE image de couverture SHALL avoir un attribut alt descriptif
3. THE Article_Card SHALL être accessible au clavier
4. THE lien "Voir plus" SHALL avoir un aria-label approprié
