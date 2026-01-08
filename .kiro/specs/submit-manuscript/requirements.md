# Requirements Document

## Introduction

Cette spécification définit les exigences pour la page de soumission de manuscrit de la plateforme Éditions Germinale. Cette page permet aux auteurs de soumettre leurs œuvres littéraires pour évaluation par le comité de lecture. Le formulaire est accessible depuis le bouton "Soumettre mon manuscrit" de la page d'accueil.

## Glossaire

- **Manuscript_Form**: Le formulaire de soumission de manuscrit comprenant les informations personnelles, les détails de l'œuvre et le fichier PDF
- **Author_Section**: La section d'en-tête affichant "ESPACE AUTEURS" et le titre de la page
- **Personal_Info_Section**: La section 1 du formulaire contenant le nom, prénom, numéro de téléphone, lieu de résidence et l'adresse email
- **Work_Details_Section**: La section 2 du formulaire contenant le titre, le genre littéraire et le synopsis
- **PDF_Upload_Section**: La section 3 du formulaire permettant l'upload du fichier PDF du manuscrit
- **Trust_Indicators**: Les trois indicateurs de confiance en bas de page (délai de réponse, confidentialité, aide)
- **Genre_Selector**: Le menu déroulant permettant de sélectionner le genre littéraire

## Requirements

### Requirement 1: En-tête de la page

**User Story:** En tant qu'auteur, je veux voir clairement que je suis dans l'espace auteurs, afin de comprendre le contexte de la page.

#### Acceptance Criteria

1. THE Author_Section SHALL afficher un badge vert avec l'icône et le texte "ESPACE AUTEURS" en haut de la page
2. THE Author_Section SHALL afficher le titre "Soumettez votre manuscrit" en police serif de grande taille
3. THE Author_Section SHALL afficher un paragraphe d'introduction expliquant le processus de soumission et le délai de réponse de 4 semaines

### Requirement 2: Section Informations personnelles

**User Story:** En tant qu'auteur, je veux saisir mes informations de contact, afin que l'éditeur puisse me recontacter.

#### Acceptance Criteria

1. THE Personal_Info_Section SHALL afficher le numéro "1" dans un cercle vert suivi du titre "Informations personnelles"
2. THE Personal_Info_Section SHALL contenir un champ "Nom" avec placeholder "Votre nom"
3. THE Personal_Info_Section SHALL contenir un champ "Prénom" avec placeholder "Votre prénom"
4. THE Personal_Info_Section SHALL contenir un champ "Numéro de téléphone" avec placeholder "+228 90 00 00 00"
5. THE Personal_Info_Section SHALL contenir un champ "Lieu de résidence" avec placeholder "Ville, Pays"
6. THE Personal_Info_Section SHALL contenir un champ "Adresse email" avec placeholder "votre@email.com"
7. WHEN un utilisateur laisse un champ obligatoire vide THEN THE Manuscript_Form SHALL afficher un message d'erreur
8. WHEN un utilisateur saisit un email invalide THEN THE Manuscript_Form SHALL afficher un message d'erreur de format
9. WHEN un utilisateur saisit un numéro de téléphone invalide THEN THE Manuscript_Form SHALL afficher un message d'erreur de format

### Requirement 3: Section Détails de l'œuvre

**User Story:** En tant qu'auteur, je veux décrire mon manuscrit, afin que le comité de lecture comprenne mon projet.

#### Acceptance Criteria

1. THE Work_Details_Section SHALL afficher le numéro "2" dans un cercle vert suivi du titre "Détails de l'œuvre"
2. THE Work_Details_Section SHALL contenir un champ "Titre du manuscrit" avec placeholder "Titre de l'œuvre"
3. THE Work_Details_Section SHALL contenir un sélecteur "Genre littéraire" avec placeholder "Sélectionner un genre"
4. THE Genre_Selector SHALL proposer les options: Roman, Poésie, Nouvelle, Essai, Théâtre, Jeunesse, Autre
5. THE Work_Details_Section SHALL contenir un champ "Synopsis" de type textarea avec placeholder "Résumez votre œuvre en quelques paragraphes..."
6. THE Work_Details_Section SHALL afficher "Max 500 mots" à côté du label Synopsis
7. WHEN le synopsis dépasse 500 mots THEN THE Manuscript_Form SHALL afficher un avertissement

### Requirement 4: Section Fichier PDF

**User Story:** En tant qu'auteur, je veux télécharger mon manuscrit en PDF, afin de le soumettre pour évaluation.

#### Acceptance Criteria

1. THE PDF_Upload_Section SHALL afficher le numéro "3" dans un cercle vert suivi du titre "Fichier PDF"
2. THE PDF_Upload_Section SHALL afficher une zone de dépôt avec bordure pointillée et fond gris clair
3. THE PDF_Upload_Section SHALL afficher une icône de téléchargement verte au centre de la zone
4. THE PDF_Upload_Section SHALL afficher le texte "Glissez votre fichier PDF ici" en gras
5. THE PDF_Upload_Section SHALL afficher le texte "ou cliquez pour parcourir" en dessous
6. THE PDF_Upload_Section SHALL afficher "PDF uniquement, max 10 Mo" en texte gris
7. WHEN un utilisateur glisse un fichier PDF valide THEN THE PDF_Upload_Section SHALL afficher le nom du fichier
8. WHEN un utilisateur sélectionne un fichier non-PDF THEN THE Manuscript_Form SHALL afficher une erreur de format
9. WHEN un utilisateur sélectionne un fichier dépassant 10 Mo THEN THE Manuscript_Form SHALL afficher une erreur de taille

### Requirement 5: Bouton de soumission

**User Story:** En tant qu'auteur, je veux soumettre mon formulaire, afin d'envoyer mon manuscrit au comité de lecture.

#### Acceptance Criteria

1. THE Manuscript_Form SHALL afficher un bouton "Envoyer mon manuscrit >" de couleur verte (primary)
2. THE Manuscript_Form SHALL afficher le texte "En soumettant ce formulaire, vous acceptez notre politique de confidentialité" avec un lien cliquable
3. WHEN tous les champs requis sont remplis correctement THEN THE Manuscript_Form SHALL activer le bouton de soumission
4. WHEN le formulaire est soumis avec succès THEN THE Manuscript_Form SHALL afficher un message de confirmation
5. WHILE le formulaire est en cours d'envoi THEN THE Manuscript_Form SHALL afficher un état de chargement sur le bouton

### Requirement 6: Indicateurs de confiance

**User Story:** En tant qu'auteur, je veux être rassuré sur le processus, afin de soumettre mon manuscrit en toute confiance.

#### Acceptance Criteria

1. THE Trust_Indicators SHALL afficher trois colonnes avec icônes et textes
2. THE Trust_Indicators SHALL afficher "DÉLAI DE RÉPONSE" avec l'icône horloge et le texte "Notre comité s'engage à vous répondre sous 4 à 6 semaines."
3. THE Trust_Indicators SHALL afficher "CONFIDENTIALITÉ" avec l'icône bouclier/check et le texte "Votre manuscrit reste votre propriété intellectuelle exclusive."
4. THE Trust_Indicators SHALL afficher "AIDE" avec l'icône point d'interrogation et le texte "Besoin d'aide ? Contactez support@editions-germinale.com"

### Requirement 7: Design et mise en page

**User Story:** En tant qu'utilisateur, je veux une interface claire et professionnelle, afin de naviguer facilement dans le formulaire.

#### Acceptance Criteria

1. THE Manuscript_Form SHALL être centré sur la page avec une largeur maximale appropriée
2. THE Manuscript_Form SHALL avoir un fond blanc avec bordure arrondie et ombre légère
3. THE Manuscript_Form SHALL utiliser la palette de couleurs Éditions Germinale (primary: #2C5F4F)
4. THE Manuscript_Form SHALL être responsive et s'adapter aux écrans mobiles et tablettes
5. WHEN l'utilisateur survole un champ de saisie THEN THE Manuscript_Form SHALL afficher un effet de focus visuel

### Requirement 8: Accessibilité

**User Story:** En tant qu'utilisateur avec des besoins d'accessibilité, je veux pouvoir utiliser le formulaire avec un lecteur d'écran, afin de soumettre mon manuscrit.

#### Acceptance Criteria

1. THE Manuscript_Form SHALL avoir des labels associés à chaque champ de saisie
2. THE Manuscript_Form SHALL être navigable au clavier
3. THE Manuscript_Form SHALL avoir des messages d'erreur accessibles avec aria-describedby
4. THE PDF_Upload_Section SHALL être accessible au clavier pour l'upload de fichier
