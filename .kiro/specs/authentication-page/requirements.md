# Requirements Document

## Introduction

Page d'authentification pour Éditions Germinale permettant aux utilisateurs de se connecter ou de créer un compte. La page présente un design split-screen avec une section visuelle inspirante à gauche et un formulaire d'authentification à droite. Le design doit être cohérent avec le thème noir/or/blanc du site.

## Glossary

- **Authentication_Page**: Page permettant la connexion et l'inscription des utilisateurs
- **Login_Form**: Formulaire de connexion avec email et mot de passe
- **Register_Form**: Formulaire d'inscription avec informations utilisateur
- **Tab_Switcher**: Composant permettant de basculer entre connexion et inscription
- **Social_Auth**: Boutons de connexion via Google et Apple
- **Visual_Section**: Section gauche avec image de bibliothèque et citation inspirante
- **Form_Section**: Section droite contenant les formulaires d'authentification

## Requirements

### Requirement 1: Layout Split-Screen

**User Story:** En tant qu'utilisateur, je veux voir une page d'authentification avec un design attrayant split-screen, afin d'avoir une expérience visuelle agréable.

#### Acceptance Criteria

1. THE Authentication_Page SHALL display a split-screen layout with Visual_Section on the left (50%) and Form_Section on the right (50%) on desktop
2. WHEN the viewport is mobile (< 768px), THE Authentication_Page SHALL display only the Form_Section in full width
3. THE Visual_Section SHALL display a background image of a library with a dark overlay
4. THE Visual_Section SHALL display an inspirational quote in French: "L'écriture est la peinture de la voix."
5. THE Visual_Section SHALL display a subtitle text describing the community
6. THE Visual_Section SHALL display pagination dots at the bottom (3 dots, first active in gold)

### Requirement 2: Header Section du Formulaire

**User Story:** En tant qu'utilisateur, je veux voir clairement le nom de la plateforme et un message de bienvenue, afin de savoir où je me trouve.

#### Acceptance Criteria

1. THE Form_Section SHALL display "EDITIONS GERMINALE" in gold color at the top
2. THE Form_Section SHALL display "Bienvenue" as the main title in dark/black color
3. THE Form_Section SHALL display a subtitle "Connectez-vous pour accéder à votre bibliothèque." in muted gray

### Requirement 3: Tab Switcher Connexion/Inscription

**User Story:** En tant qu'utilisateur, je veux pouvoir basculer facilement entre connexion et inscription, afin de choisir l'action appropriée.

#### Acceptance Criteria

1. THE Tab_Switcher SHALL display two tabs: "Connexion" and "Inscription"
2. WHEN the "Connexion" tab is active, THE Tab_Switcher SHALL highlight it with a border and white background
3. WHEN the "Inscription" tab is active, THE Tab_Switcher SHALL highlight it with a border and white background
4. WHEN a user clicks on a tab, THE Tab_Switcher SHALL switch the displayed form accordingly
5. THE Tab_Switcher SHALL have rounded corners (pill shape) with a light gray background

### Requirement 4: Formulaire de Connexion

**User Story:** En tant qu'utilisateur existant, je veux me connecter avec mon email et mot de passe, afin d'accéder à mon compte.

#### Acceptance Criteria

1. THE Login_Form SHALL display an email input field with label "Adresse e-mail" and placeholder "exemple@email.com"
2. THE Login_Form SHALL display a password input field with label "Mot de passe" and placeholder dots
3. THE Login_Form SHALL display a toggle button to show/hide the password (eye icon)
4. THE Login_Form SHALL display a checkbox "Se souvenir de moi" on the left
5. THE Login_Form SHALL display a link "Mot de passe oublié ?" in gold color on the right
6. THE Login_Form SHALL display a submit button "Se connecter" with an arrow icon, in gold/orange background
7. WHEN the email field is empty or invalid, THE Login_Form SHALL prevent submission
8. WHEN the password field is empty, THE Login_Form SHALL prevent submission

### Requirement 5: Formulaire d'Inscription

**User Story:** En tant que nouvel utilisateur, je veux créer un compte avec mes informations, afin de rejoindre la plateforme.

#### Acceptance Criteria

1. THE Register_Form SHALL display a full name input field with label "Nom complet"
2. THE Register_Form SHALL display an email input field with label "Adresse e-mail"
3. THE Register_Form SHALL display a password input field with label "Mot de passe"
4. THE Register_Form SHALL display a password confirmation field with label "Confirmer le mot de passe"
5. THE Register_Form SHALL display a submit button "Créer un compte" in gold/orange background
6. WHEN passwords do not match, THE Register_Form SHALL display an error message
7. WHEN required fields are empty, THE Register_Form SHALL prevent submission

### Requirement 6: Authentification Sociale

**User Story:** En tant qu'utilisateur, je veux pouvoir me connecter via Google ou Apple, afin de simplifier le processus d'authentification.

#### Acceptance Criteria

1. THE Form_Section SHALL display a separator "Ou continuer avec" between the form and social buttons
2. THE Form_Section SHALL display a Google authentication button with Google icon and text "Google"
3. THE Form_Section SHALL display an Apple authentication button with Apple icon and text "Apple"
4. THE Social_Auth buttons SHALL have white background with gray border and be displayed side by side

### Requirement 7: Liens et Footer du Formulaire

**User Story:** En tant qu'utilisateur, je veux avoir accès aux liens utiles et informations légales, afin de naviguer facilement.

#### Acceptance Criteria

1. THE Form_Section SHALL display "Vous n'avez pas de compte ?" with a link "Créer un compte" in gold when on login view
2. THE Form_Section SHALL display "Vous avez déjà un compte ?" with a link "Se connecter" in gold when on register view
3. THE Form_Section SHALL display links "Conditions d'utilisation" and "Politique de confidentialité" at the bottom in muted gray

### Requirement 8: Responsive Design

**User Story:** En tant qu'utilisateur mobile, je veux une expérience optimisée sur mon appareil, afin de pouvoir m'authentifier facilement.

#### Acceptance Criteria

1. WHEN viewport width is less than 768px, THE Visual_Section SHALL be hidden
2. WHEN viewport width is less than 768px, THE Form_Section SHALL take full width with appropriate padding
3. THE Form_Section SHALL maintain proper spacing and readability on all screen sizes
4. THE input fields and buttons SHALL be touch-friendly with minimum 44px height on mobile

### Requirement 9: Validation des Champs

**User Story:** En tant qu'utilisateur, je veux recevoir des retours clairs sur mes erreurs de saisie, afin de corriger mes informations.

#### Acceptance Criteria

1. WHEN an email is invalid format, THE System SHALL display "Veuillez entrer une adresse e-mail valide"
2. WHEN a password is less than 8 characters, THE System SHALL display "Le mot de passe doit contenir au moins 8 caractères"
3. WHEN passwords do not match in registration, THE System SHALL display "Les mots de passe ne correspondent pas"
4. WHEN a required field is empty on submit, THE System SHALL display "Ce champ est requis"
5. THE error messages SHALL be displayed in red color below the respective input field

### Requirement 10: Accessibilité

**User Story:** En tant qu'utilisateur avec des besoins d'accessibilité, je veux pouvoir utiliser la page avec un lecteur d'écran ou le clavier, afin d'accéder au service.

#### Acceptance Criteria

1. THE input fields SHALL have proper aria-labels and associated labels
2. THE form SHALL be navigable using keyboard (Tab key)
3. THE error messages SHALL be announced to screen readers using aria-live
4. THE buttons SHALL have proper focus states visible
5. THE color contrast SHALL meet WCAG AA standards
