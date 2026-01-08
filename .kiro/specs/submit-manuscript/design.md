# Design Document: Page de Soumission de Manuscrit

## Overview

La page de soumission de manuscrit permet aux auteurs de soumettre leurs œuvres littéraires à Éditions Germinale pour évaluation. Le design suit une approche en trois étapes numérotées avec un formulaire clair et professionnel, des indicateurs de confiance en bas de page, et une expérience utilisateur fluide.

## Architecture

```
app/
├── submit-manuscript/
│   └── page.tsx                    # Page principale (Server Component)
src/
├── components/
│   └── manuscript/
│       ├── ManuscriptForm.tsx      # Formulaire complet (Client Component)
│       ├── PersonalInfoSection.tsx # Section 1: Infos personnelles
│       ├── WorkDetailsSection.tsx  # Section 2: Détails de l'œuvre
│       ├── PdfUploadSection.tsx    # Section 3: Upload PDF
│       ├── TrustIndicators.tsx     # Indicateurs de confiance
│       └── __tests__/
│           └── ManuscriptForm.test.tsx
├── lib/
│   └── validations/
│       └── manuscript.ts           # Schéma Zod pour validation
```

## Components and Interfaces

### ManuscriptForm (Client Component)

Composant principal gérant l'état du formulaire et la soumission.

```typescript
interface ManuscriptFormData {
  lastName: string;
  firstName: string;
  phone: string;
  residence: string;
  email: string;
  title: string;
  genre: string;
  synopsis: string;
  pdfFile: File | null;
}

interface ManuscriptFormProps {
  onSubmitSuccess?: () => void;
}
```

### PersonalInfoSection

Section 1 du formulaire avec les champs nom, prénom, téléphone, résidence et email.

```typescript
interface PersonalInfoSectionProps {
  register: UseFormRegister<ManuscriptFormData>;
  errors: FieldErrors<ManuscriptFormData>;
}
```

### WorkDetailsSection

Section 2 du formulaire avec titre, genre et synopsis.

```typescript
interface WorkDetailsSectionProps {
  register: UseFormRegister<ManuscriptFormData>;
  errors: FieldErrors<ManuscriptFormData>;
  control: Control<ManuscriptFormData>;
  wordCount: number;
}
```

### PdfUploadSection

Section 3 avec zone de drag & drop pour le fichier PDF.

```typescript
interface PdfUploadSectionProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
}
```

### TrustIndicators

Composant affichant les trois indicateurs de confiance.

```typescript
// Pas de props, composant statique
```

## Data Models

### Schéma de validation Zod

```typescript
import { z } from "zod";

export const manuscriptSchema = z.object({
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(100, "Le prénom ne peut pas dépasser 100 caractères"),
  phone: z
    .string()
    .min(8, "Le numéro de téléphone doit contenir au moins 8 caractères")
    .max(20, "Le numéro de téléphone ne peut pas dépasser 20 caractères")
    .regex(/^[+]?[\d\s\-().]+$/, "Veuillez entrer un numéro de téléphone valide"),
  residence: z
    .string()
    .min(2, "Le lieu de résidence doit contenir au moins 2 caractères")
    .max(200, "Le lieu de résidence ne peut pas dépasser 200 caractères"),
  email: z
    .string()
    .email("Veuillez entrer une adresse email valide"),
  title: z
    .string()
    .min(2, "Le titre doit contenir au moins 2 caractères")
    .max(200, "Le titre ne peut pas dépasser 200 caractères"),
  genre: z
    .string()
    .min(1, "Veuillez sélectionner un genre littéraire"),
  synopsis: z
    .string()
    .min(50, "Le synopsis doit contenir au moins 50 caractères")
    .refine(
      (val) => val.split(/\s+/).filter(Boolean).length <= 500,
      "Le synopsis ne peut pas dépasser 500 mots"
    ),
});

export type ManuscriptFormData = z.infer<typeof manuscriptSchema>;

// Validation du fichier PDF (séparée car File n'est pas sérialisable)
export const validatePdfFile = (file: File | null): string | null => {
  if (!file) return "Veuillez sélectionner un fichier PDF";
  if (file.type !== "application/pdf") return "Le fichier doit être au format PDF";
  if (file.size > 10 * 1024 * 1024) return "Le fichier ne peut pas dépasser 10 Mo";
  return null;
};
```

### Genres littéraires disponibles

```typescript
export const LITERARY_GENRES = [
  { value: "roman", label: "Roman" },
  { value: "poesie", label: "Poésie" },
  { value: "nouvelle", label: "Nouvelle" },
  { value: "essai", label: "Essai" },
  { value: "theatre", label: "Théâtre" },
  { value: "jeunesse", label: "Jeunesse" },
  { value: "autre", label: "Autre" },
] as const;
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Validation des champs personnels

*For any* chaîne vide ou composée uniquement d'espaces dans le champ nom, le formulaire doit afficher un message d'erreur de validation.

*For any* chaîne qui ne correspond pas au format email standard, le formulaire doit afficher un message d'erreur de format.

**Validates: Requirements 2.4, 2.5**

### Property 2: Validation du synopsis

*For any* texte contenant plus de 500 mots dans le champ synopsis, le formulaire doit afficher un avertissement indiquant le dépassement.

**Validates: Requirements 3.7**

### Property 3: Validation du fichier PDF

*For any* fichier dont le type MIME n'est pas "application/pdf", le formulaire doit afficher une erreur de format.

*For any* fichier dont la taille dépasse 10 Mo (10 * 1024 * 1024 octets), le formulaire doit afficher une erreur de taille.

**Validates: Requirements 4.8, 4.9**

### Property 4: Activation du bouton de soumission

*For any* combinaison de champs où tous les champs requis sont remplis avec des valeurs valides et un fichier PDF valide est sélectionné, le bouton de soumission doit être activé.

**Validates: Requirements 5.3**

### Property 5: Accessibilité des labels

*For any* champ de saisie dans le formulaire, il doit exister un élément label associé via l'attribut htmlFor correspondant à l'id du champ.

**Validates: Requirements 8.1**

## Error Handling

### Erreurs de validation côté client

- Affichage immédiat sous le champ concerné
- Couleur rouge (#EF4444) pour le texte d'erreur
- Bordure rouge sur le champ en erreur
- Utilisation de aria-describedby pour l'accessibilité

### Erreurs de fichier

- Fichier non-PDF : "Le fichier doit être au format PDF"
- Fichier trop volumineux : "Le fichier ne peut pas dépasser 10 Mo"
- Aucun fichier : "Veuillez sélectionner un fichier PDF"

### Erreurs de soumission

- Erreur réseau : "Une erreur est survenue. Veuillez réessayer."
- Affichage via toast notification (Sonner)

## Testing Strategy

### Tests unitaires

- Rendu des composants avec les bonnes props
- Affichage des messages d'erreur
- Comportement du drag & drop
- Comptage des mots du synopsis

### Tests de propriétés (Property-Based Testing)

Utilisation de **fast-check** pour les tests de propriétés.

Configuration : minimum 100 itérations par test.

**Property 1**: Générer des chaînes aléatoires vides/espaces pour le nom et des emails invalides, vérifier que les erreurs s'affichent.

**Property 2**: Générer des textes aléatoires de plus de 500 mots, vérifier l'avertissement.

**Property 3**: Générer des fichiers avec différents types MIME et tailles, vérifier les erreurs appropriées.

**Property 4**: Générer des combinaisons de champs valides/invalides, vérifier l'état du bouton.

**Property 5**: Vérifier que chaque input a un label associé.

### Tests d'intégration

- Soumission complète du formulaire
- Gestion des états de chargement
- Affichage du message de succès
