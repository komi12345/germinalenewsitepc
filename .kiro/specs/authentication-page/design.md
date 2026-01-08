# Design Document: Authentication Page

## Overview

La page d'authentification d'Éditions Germinale offre une expérience utilisateur élégante avec un design split-screen. La partie gauche présente une image inspirante de bibliothèque avec une citation, tandis que la partie droite contient les formulaires de connexion et d'inscription. Le design s'adapte au thème noir/or/blanc du site tout en utilisant des tons plus clairs pour le formulaire afin d'assurer une bonne lisibilité.

## Architecture

```
app/
├── (auth)/
│   └── login/
│       └── page.tsx              # Page d'authentification
src/
├── components/
│   └── auth/
│       ├── AuthPage.tsx          # Composant principal split-screen
│       ├── VisualSection.tsx     # Section gauche avec image et citation
│       ├── FormSection.tsx       # Section droite avec formulaires
│       ├── TabSwitcher.tsx       # Onglets Connexion/Inscription
│       ├── LoginForm.tsx         # Formulaire de connexion
│       ├── RegisterForm.tsx      # Formulaire d'inscription
│       ├── SocialAuthButtons.tsx # Boutons Google/Apple
│       └── __tests__/
│           ├── LoginForm.test.tsx
│           └── RegisterForm.test.tsx
├── lib/
│   └── validations/
│       └── auth.ts               # Schémas Zod pour validation
```

## Components and Interfaces

### AuthPage Component

```typescript
interface AuthPageProps {
  defaultTab?: 'login' | 'register';
}

// Composant principal qui orchestre le layout split-screen
export function AuthPage({ defaultTab = 'login' }: AuthPageProps): JSX.Element
```

### VisualSection Component

```typescript
interface VisualSectionProps {
  quote: string;
  subtitle: string;
  backgroundImage: string;
}

// Section gauche avec image de bibliothèque et citation
export function VisualSection(props: VisualSectionProps): JSX.Element
```

### FormSection Component

```typescript
interface FormSectionProps {
  activeTab: 'login' | 'register';
  onTabChange: (tab: 'login' | 'register') => void;
}

// Section droite contenant les formulaires
export function FormSection(props: FormSectionProps): JSX.Element
```

### TabSwitcher Component

```typescript
interface TabSwitcherProps {
  activeTab: 'login' | 'register';
  onTabChange: (tab: 'login' | 'register') => void;
}

// Onglets pour basculer entre connexion et inscription
export function TabSwitcher(props: TabSwitcherProps): JSX.Element
```

### LoginForm Component

```typescript
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onForgotPassword: () => void;
}

// Formulaire de connexion
export function LoginForm(props: LoginFormProps): JSX.Element
```

### RegisterForm Component

```typescript
interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
}

// Formulaire d'inscription
export function RegisterForm(props: RegisterFormProps): JSX.Element
```

### SocialAuthButtons Component

```typescript
interface SocialAuthButtonsProps {
  onGoogleClick: () => void;
  onAppleClick: () => void;
}

// Boutons d'authentification sociale
export function SocialAuthButtons(props: SocialAuthButtonsProps): JSX.Element
```

## Data Models

### Validation Schemas (Zod)

```typescript
import { z } from 'zod';

// Schéma de validation pour la connexion
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Ce champ est requis')
    .email('Veuillez entrer une adresse e-mail valide'),
  password: z
    .string()
    .min(1, 'Ce champ est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  rememberMe: z.boolean().default(false),
});

// Schéma de validation pour l'inscription
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Ce champ est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z
    .string()
    .min(1, 'Ce champ est requis')
    .email('Veuillez entrer une adresse e-mail valide'),
  password: z
    .string()
    .min(1, 'Ce champ est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z
    .string()
    .min(1, 'Ce champ est requis'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
```

## Visual Design Specifications

### Color Palette (adapté au thème du site)

```css
/* Section Visuelle (gauche) */
--visual-bg: #0A0A0A;           /* Fond noir */
--visual-overlay: rgba(0, 0, 0, 0.6);
--visual-text: #FFFFFF;          /* Texte blanc */
--visual-quote: #FFFFFF;         /* Citation en blanc */

/* Section Formulaire (droite) - fond clair pour lisibilité */
--form-bg: #FFFFFF;              /* Fond blanc */
--form-text: #1A1A1A;            /* Texte noir/gris foncé */
--form-text-muted: #6B7280;      /* Texte gris */
--form-border: #E5E7EB;          /* Bordures grises claires */

/* Accents */
--accent-gold: #D4AF37;          /* Or pour liens et accents */
--accent-orange: #E8A87C;        /* Orange pour boutons principaux */
--accent-orange-hover: #D4956A;  /* Orange hover */

/* États */
--error: #EF4444;                /* Rouge pour erreurs */
--success: #10B981;              /* Vert pour succès */
```

### Typography

```css
/* Titres */
--font-serif: 'Playfair Display', Georgia, serif;
--font-sans: 'Inter', Arial, sans-serif;

/* Tailles */
--text-brand: 0.75rem;           /* EDITIONS GERMINALE */
--text-title: 2rem;              /* Bienvenue */
--text-subtitle: 0.875rem;       /* Sous-titre */
--text-body: 1rem;               /* Corps de texte */
--text-small: 0.875rem;          /* Labels, liens */
--text-quote: 2.5rem;            /* Citation */
```

### Spacing

```css
/* Padding section formulaire */
--form-padding-x: 3rem;          /* 48px */
--form-padding-y: 2rem;          /* 32px */

/* Espacement entre éléments */
--spacing-xs: 0.5rem;            /* 8px */
--spacing-sm: 0.75rem;           /* 12px */
--spacing-md: 1rem;              /* 16px */
--spacing-lg: 1.5rem;            /* 24px */
--spacing-xl: 2rem;              /* 32px */
```

### Component Styles

#### Tab Switcher
```css
.tab-container {
  background: #F3F4F6;           /* Gris très clair */
  border-radius: 9999px;         /* Pill shape */
  padding: 4px;
}

.tab-button {
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 500;
  transition: all 200ms;
}

.tab-button-active {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  color: #1A1A1A;
}

.tab-button-inactive {
  background: transparent;
  color: #6B7280;
}
```

#### Input Fields
```css
.input-field {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  padding-left: 2.5rem;          /* Espace pour icône */
  font-size: 1rem;
  color: #1A1A1A;
}

.input-field:focus {
  border-color: #D4AF37;
  outline: none;
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  color: #9CA3AF;
}
```

#### Primary Button
```css
.btn-primary {
  background: #E8A87C;           /* Orange */
  color: #FFFFFF;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  background: #D4956A;
}
```

#### Social Auth Buttons
```css
.btn-social {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  color: #1A1A1A;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
}

.btn-social:hover {
  background: #F9FAFB;
  border-color: #D1D5DB;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Email Validation Consistency

*For any* string input in the email field, the validation result should be consistent: if the string matches a valid email pattern (contains @ and domain), it should pass validation; otherwise, it should fail with the appropriate error message.

**Validates: Requirements 4.7, 5.6, 9.1**

### Property 2: Password Validation Rules

*For any* string input in the password field, if the string length is less than 8 characters, the validation should fail with "Le mot de passe doit contenir au moins 8 caractères"; if 8 or more characters, it should pass.

**Validates: Requirements 4.8, 9.2**

### Property 3: Password Match Verification

*For any* pair of password and confirmPassword inputs in the registration form, if they are not identical strings, the validation should fail with "Les mots de passe ne correspondent pas".

**Validates: Requirements 5.6, 9.3**

### Property 4: Required Field Validation

*For any* required field (email, password, fullName, confirmPassword), if the field value is empty or contains only whitespace, the validation should fail with "Ce champ est requis".

**Validates: Requirements 4.7, 4.8, 5.7, 9.4**

### Property 5: Tab State Consistency

*For any* tab switch action, the displayed form should match the active tab state: 'login' tab shows LoginForm, 'register' tab shows RegisterForm.

**Validates: Requirements 3.4**

### Property 6: Form Submission Prevention

*For any* form submission attempt with invalid data, the form should prevent submission and display appropriate error messages without clearing valid field values.

**Validates: Requirements 4.7, 4.8, 5.6, 5.7**

## Error Handling

### Validation Errors

| Error Type | Message (French) | Display Location |
|------------|------------------|------------------|
| Empty required field | "Ce champ est requis" | Below input field |
| Invalid email format | "Veuillez entrer une adresse e-mail valide" | Below email field |
| Password too short | "Le mot de passe doit contenir au moins 8 caractères" | Below password field |
| Passwords don't match | "Les mots de passe ne correspondent pas" | Below confirm password field |
| Name too short | "Le nom doit contenir au moins 2 caractères" | Below name field |

### Error Display Pattern

```typescript
// Affichage des erreurs sous les champs
{error && (
  <p 
    className="text-red-500 text-sm mt-1" 
    role="alert"
    aria-live="polite"
  >
    {error.message}
  </p>
)}
```

## Testing Strategy

### Unit Tests

Les tests unitaires couvriront :
- Validation des schémas Zod (email, password, etc.)
- Rendu correct des composants
- Comportement des onglets
- Affichage des erreurs
- États des boutons (disabled, loading)

### Property-Based Tests

Les tests property-based utiliseront `fast-check` pour :
- Valider la cohérence de la validation email
- Tester les règles de validation de mot de passe
- Vérifier la correspondance des mots de passe
- Tester les champs requis avec diverses entrées

### Test Configuration

```typescript
// Configuration fast-check
const fcConfig = {
  numRuns: 100,
  verbose: true,
};

// Exemple de test property
describe('Email Validation Property', () => {
  it('should consistently validate email format', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = loginSchema.shape.email.safeParse(input);
        const hasAtSymbol = input.includes('@');
        const hasDomain = input.split('@')[1]?.includes('.');
        
        if (hasAtSymbol && hasDomain && input.length > 5) {
          // Valid email pattern should pass
          return result.success === true;
        }
        // Invalid pattern should fail
        return result.success === false;
      }),
      fcConfig
    );
  });
});
```

## Responsive Breakpoints

```css
/* Mobile first approach */

/* Base: Mobile (< 768px) */
.auth-page {
  display: flex;
  flex-direction: column;
}

.visual-section {
  display: none;
}

.form-section {
  width: 100%;
  padding: 1.5rem;
}

/* Tablet and up (>= 768px) */
@media (min-width: 768px) {
  .auth-page {
    flex-direction: row;
    min-height: 100vh;
  }
  
  .visual-section {
    display: flex;
    width: 50%;
  }
  
  .form-section {
    width: 50%;
    padding: 3rem;
  }
}

/* Desktop (>= 1024px) */
@media (min-width: 1024px) {
  .form-section {
    padding: 4rem;
  }
}
```

## Accessibility Considerations

1. **Labels et ARIA**: Tous les champs ont des labels associés via `htmlFor`
2. **Focus visible**: États de focus clairement visibles sur tous les éléments interactifs
3. **Navigation clavier**: Tab order logique à travers le formulaire
4. **Messages d'erreur**: Annoncés via `aria-live="polite"`
5. **Contraste**: Ratio de contraste minimum 4.5:1 pour le texte
6. **Touch targets**: Minimum 44x44px pour les éléments tactiles
