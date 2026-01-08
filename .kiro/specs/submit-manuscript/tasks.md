# Implementation Plan: Page de Soumission de Manuscrit

## Overview

Implémentation de la page de soumission de manuscrit pour Éditions Germinale, permettant aux auteurs de soumettre leurs œuvres via un formulaire en trois étapes avec upload PDF et indicateurs de confiance.

## Tasks

- [x] 1. Créer le schéma de validation et les types
  - Créer le fichier `src/lib/validations/manuscript.ts`
  - Définir le schéma Zod pour la validation du formulaire
  - Définir la fonction de validation du fichier PDF
  - Exporter les types et constantes (genres littéraires)
  - _Requirements: 2.4, 2.5, 3.7, 4.8, 4.9_

- [x] 2. Créer le composant TrustIndicators
  - Créer le fichier `src/components/manuscript/TrustIndicators.tsx`
  - Afficher les trois colonnes avec icônes (Clock, ShieldCheck, HelpCircle)
  - Afficher les textes pour délai de réponse, confidentialité et aide
  - Utiliser la palette de couleurs Éditions Germinale
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 3. Créer le composant PdfUploadSection
  - Créer le fichier `src/components/manuscript/PdfUploadSection.tsx`
  - Implémenter la zone de drag & drop avec bordure pointillée
  - Afficher l'icône de téléchargement et les textes
  - Gérer les événements onDragOver, onDragLeave, onDrop
  - Afficher le nom du fichier sélectionné
  - Afficher les erreurs de validation
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_

- [x] 4. Créer le composant PersonalInfoSection
  - Créer le fichier `src/components/manuscript/PersonalInfoSection.tsx`
  - Afficher le numéro "1" dans un cercle vert avec le titre
  - Créer les champs nom complet et email avec labels
  - Afficher les erreurs de validation sous chaque champ
  - Assurer l'accessibilité avec aria-describedby
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 8.1, 8.3_

- [x] 5. Créer le composant WorkDetailsSection
  - Créer le fichier `src/components/manuscript/WorkDetailsSection.tsx`
  - Afficher le numéro "2" dans un cercle vert avec le titre
  - Créer le champ titre du manuscrit
  - Créer le sélecteur de genre littéraire avec les options
  - Créer le textarea synopsis avec compteur de mots
  - Afficher "Max 500 mots" et l'avertissement si dépassé
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 8.1_

- [x] 6. Créer le composant ManuscriptForm principal
  - Créer le fichier `src/components/manuscript/ManuscriptForm.tsx`
  - Intégrer react-hook-form avec zodResolver
  - Assembler les trois sections du formulaire
  - Gérer l'état du fichier PDF séparément
  - Implémenter le bouton de soumission avec état de chargement
  - Afficher le texte de politique de confidentialité
  - Gérer la soumission et afficher le message de succès
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 7.1, 7.2, 7.3_

- [x] 7. Créer la page submit-manuscript
  - Créer le fichier `app/submit-manuscript/page.tsx`
  - Afficher le badge "ESPACE AUTEURS" avec icône
  - Afficher le titre et le paragraphe d'introduction
  - Intégrer le composant ManuscriptForm
  - Intégrer le composant TrustIndicators
  - Assurer le responsive design
  - _Requirements: 1.1, 1.2, 1.3, 7.4_

- [x] 8. Checkpoint - Vérification visuelle et fonctionnelle
  - Vérifier que la page correspond au design fourni
  - Tester le formulaire manuellement
  - Vérifier le responsive sur mobile et tablette
  - Demander à l'utilisateur si des ajustements sont nécessaires

- [x] 9. Écrire les tests unitaires
  - Créer le fichier `src/components/manuscript/__tests__/ManuscriptForm.test.tsx`
  - Tester le rendu des composants
  - Tester l'affichage des erreurs de validation
  - Tester le comportement du drag & drop
  - _Requirements: 2.4, 2.5, 3.7, 4.7, 4.8, 4.9_

- [x] 10. Écrire les tests de propriétés
  - [x] 10.1 Property test: Validation des champs personnels
    - **Property 1: Validation des champs personnels**
    - **Validates: Requirements 2.4, 2.5**
  - [x] 10.2 Property test: Validation du synopsis
    - **Property 2: Validation du synopsis**
    - **Validates: Requirements 3.7**
  - [x] 10.3 Property test: Validation du fichier PDF
    - **Property 3: Validation du fichier PDF**
    - **Validates: Requirements 4.8, 4.9**

- [x] 11. Final checkpoint - Validation complète
  - Vérifier que tous les tests passent
  - Vérifier l'accessibilité au clavier
  - Demander à l'utilisateur si des questions se posent

## Notes

- Toutes les tâches sont obligatoires pour une implémentation complète
- Chaque tâche référence les requirements spécifiques pour la traçabilité
- Les checkpoints permettent une validation incrémentale avec l'utilisateur
- Les tests de propriétés utilisent fast-check pour la génération de données aléatoires
