# Implementation Plan: Authentication Page

## Overview

Implémentation de la page d'authentification pour Éditions Germinale avec un design split-screen, formulaires de connexion/inscription, et authentification sociale. L'implémentation utilise TypeScript, React Hook Form avec Zod pour la validation, et respecte le thème noir/or/blanc du site.

## Tasks

- [x] 1. Créer les schémas de validation Zod
  - [x] 1.1 Créer le fichier `src/lib/validations/auth.ts` avec les schémas loginSchema et registerSchema
    - Validation email avec messages en français
    - Validation mot de passe (min 8 caractères)
    - Validation correspondance des mots de passe
    - Validation champs requis
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 1.2 Écrire les tests property-based pour la validation
    - **Property 1: Email Validation Consistency**
    - **Property 2: Password Validation Rules**
    - **Property 3: Password Match Verification**
    - **Property 4: Required Field Validation**
    - **Validates: Requirements 4.7, 4.8, 5.6, 5.7, 9.1, 9.2, 9.3, 9.4**

- [x] 2. Créer les composants de base
  - [x] 2.1 Créer le composant `VisualSection.tsx`
    - Image de bibliothèque en background avec overlay sombre
    - Citation inspirante en français
    - Sous-titre descriptif
    - Points de pagination (3 dots)
    - Masqué sur mobile (< 768px)
    - _Requirements: 1.3, 1.4, 1.5, 1.6, 8.1_

  - [x] 2.2 Créer le composant `TabSwitcher.tsx`
    - Deux onglets: "Connexion" et "Inscription"
    - Style pill avec fond gris clair
    - État actif avec fond blanc et bordure
    - Gestion du changement d'onglet
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 2.3 Créer le composant `SocialAuthButtons.tsx`
    - Bouton Google avec icône
    - Bouton Apple avec icône
    - Style: fond blanc, bordure grise
    - Disposition côte à côte
    - _Requirements: 6.2, 6.3, 6.4_

- [x] 3. Créer le formulaire de connexion
  - [x] 3.1 Créer le composant `LoginForm.tsx`
    - Champ email avec icône et placeholder
    - Champ mot de passe avec toggle visibilité
    - Checkbox "Se souvenir de moi"
    - Lien "Mot de passe oublié ?" en or
    - Bouton "Se connecter" orange avec flèche
    - Intégration React Hook Form + Zod
    - Affichage des erreurs en rouge
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 9.5_

  - [x] 3.2 Écrire les tests unitaires pour LoginForm
    - Test rendu des champs
    - Test toggle mot de passe
    - Test validation et erreurs
    - Test soumission
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [x] 4. Créer le formulaire d'inscription
  - [x] 4.1 Créer le composant `RegisterForm.tsx`
    - Champ nom complet
    - Champ email avec icône
    - Champ mot de passe avec toggle
    - Champ confirmation mot de passe
    - Bouton "Créer un compte" orange
    - Intégration React Hook Form + Zod
    - Affichage des erreurs en rouge
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 9.5_

  - [x] 4.2 Écrire les tests unitaires pour RegisterForm
    - Test rendu des champs
    - Test validation correspondance mots de passe
    - Test validation et erreurs
    - Test soumission
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

- [x] 5. Créer la section formulaire complète
  - [x] 5.1 Créer le composant `FormSection.tsx`
    - Header avec "EDITIONS GERMINALE" en or
    - Titre "Bienvenue" en noir
    - Sous-titre descriptif en gris
    - Intégration TabSwitcher
    - Affichage conditionnel LoginForm/RegisterForm
    - Séparateur "Ou continuer avec"
    - Intégration SocialAuthButtons
    - Lien de basculement (créer compte / se connecter)
    - Liens légaux en bas
    - _Requirements: 2.1, 2.2, 2.3, 6.1, 7.1, 7.2, 7.3_

- [x] 6. Assembler la page d'authentification
  - [x] 6.1 Créer le composant `AuthPage.tsx`
    - Layout split-screen (flex)
    - VisualSection à gauche (50%)
    - FormSection à droite (50%)
    - Gestion de l'état activeTab
    - Responsive: formulaire seul sur mobile
    - _Requirements: 1.1, 1.2, 8.2, 8.3_

  - [x] 6.2 Créer la page `app/(auth)/login/page.tsx`
    - Import et rendu de AuthPage
    - Métadonnées SEO
    - _Requirements: 1.1_

- [x] 7. Implémenter l'accessibilité
  - [x] 7.1 Ajouter les attributs d'accessibilité
    - Labels associés aux inputs (htmlFor)
    - aria-labels sur les boutons icônes
    - aria-live sur les messages d'erreur
    - Focus states visibles
    - Navigation clavier (tabindex)
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 8. Checkpoint - Vérification et tests
  - Ensure all tests pass, ask the user if questions arise.
  - Vérifier le rendu responsive
  - Vérifier l'accessibilité
  - Vérifier la cohérence des styles avec le site

## Notes

- Toutes les tâches sont obligatoires pour une implémentation complète
- Chaque tâche référence les requirements spécifiques pour la traçabilité
- Les tests property-based utilisent fast-check pour valider les propriétés de validation
- Le design utilise un fond blanc pour la section formulaire pour assurer la lisibilité
- L'authentification sociale (Google/Apple) sera connectée ultérieurement à NextAuth
