# 📚 Guide Complet de Configuration Qoder - Bible du Développement Fullstack 2025

> **Note Importante** : Ce document est votre référence ultime pour transformer Qoder en un IDE puissant pour le développement fullstack. **Toutes les interactions avec l'IDE doivent se faire en français.**

---

## 🎯 Configuration Générale de l'IDE

### Langue de Communication
```json
{
  "language": "fr-FR",
  "communication": "Toujours répondre en français",
  "documentation": "Générer les commentaires en français",
  "error_messages": "Afficher les erreurs en français quand possible"
}
```

### Extensions et Plugins Essentiels (Versions 2025)
- **Prettier** v3.2.0+ : Formatage automatique du code
- **ESLint** v9.0.0+ : Analyse statique JavaScript/TypeScript
- **PHP Intelephense** v1.10.0+ : Support PHP/Laravel
- **Flutter** v3.24.0+ : Développement Flutter
- **Tailwind CSS IntelliSense** v0.12.0+ : Autocomplétion Tailwind
- **Firebase Tools** v13.0.0+ : Intégration Firebase
- **Supabase** : Extension officielle Supabase

---

## 📱 Développement Mobile

### Flutter (Version 3.27.0 - Janvier 2025)

#### Configuration Projet
```yaml
# pubspec.yaml - Configuration recommandée
environment:
  sdk: '>=3.5.0 <4.0.0'
  flutter: '>=3.27.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  provider: ^6.1.2
  dio: ^5.7.0
  flutter_bloc: ^8.1.6
  go_router: ^14.6.2
  shared_preferences: ^2.3.3
  firebase_core: ^3.8.0
  firebase_auth: ^5.3.3
  supabase_flutter: ^2.9.1
```

#### Règles de Structure Flutter
```
lib/
├── core/
│   ├── constants/      # Constantes globales
│   ├── themes/         # Thèmes et styles
│   ├── utils/          # Utilitaires
│   └── errors/         # Gestion des erreurs
├── features/
│   └── [feature_name]/
│       ├── data/       # Sources de données
│       ├── domain/     # Logique métier
│       └── presentation/ # UI et widgets
├── shared/
│   ├── widgets/        # Widgets réutilisables
│   └── models/         # Modèles partagés
└── main.dart
```

#### Standards de Code Flutter
```dart
// Toujours utiliser const pour les widgets statiques
const Text('Bonjour');

// Nommage en français pour les variables métier
final String nomUtilisateur = 'Jean';
final List<Produit> listeProduits = [];

// Gestion des états avec Provider ou Bloc
class MonProvider extends ChangeNotifier {
  // État privé
  int _compteur = 0;
  
  // Getter public
  int get compteur => _compteur;
  
  // Méthode avec notification
  void incrementer() {
    _compteur++;
    notifyListeners();
  }
}

// Gestion d'erreur robuste
try {
  final resultat = await apiService.recupererDonnees();
  return Right(resultat);
} catch (e) {
  return Left(ErreurServeur(message: e.toString()));
}
```

### React Native (Version 0.76.0 - Janvier 2025)

#### Configuration TypeScript
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "jsx": "react-native",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  }
}
```

#### Structure Projet React Native
```
src/
├── components/         # Composants réutilisables
│   ├── communs/
│   └── specifiques/
├── ecrans/            # Écrans de l'application
├── navigation/        # Configuration navigation
├── services/          # Services API
├── store/             # Gestion d'état (Redux/Zustand)
├── hooks/             # Hooks personnalisés
├── types/             # Types TypeScript
└── utils/             # Fonctions utilitaires
```

#### Standards React Native
```typescript
// Utiliser des composants fonctionnels avec TypeScript
interface ProprietesUtilisateur {
  nom: string;
  age: number;
  actif?: boolean;
}

const ComposantUtilisateur: React.FC<ProprietesUtilisateur> = ({ 
  nom, 
  age, 
  actif = true 
}) => {
  const [chargement, setChargement] = useState(false);
  
  useEffect(() => {
    // Logique d'effet
    return () => {
      // Nettoyage
    };
  }, []);
  
  return (
    <View style={styles.conteneur}>
      <Text>{nom} - {age} ans</Text>
    </View>
  );
};

// StyleSheet avec nommage français
const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

---

## 🌐 Développement Web

### HTML5 - Standards 2025

#### Structure Sémantique
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Description en français">
  <title>Titre de la Page</title>
  
  <!-- Préchargement des ressources critiques -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preload" as="style" href="styles.css">
</head>
<body>
  <header role="banner">
    <nav role="navigation" aria-label="Navigation principale">
      <!-- Navigation -->
    </nav>
  </header>
  
  <main role="main">
    <article>
      <h1>Titre Principal</h1>
      <!-- Contenu -->
    </article>
  </main>
  
  <footer role="contentinfo">
    <!-- Pied de page -->
  </footer>
</body>
</html>
```

### CSS3 / Tailwind CSS (v4.0.0 - 2025)

#### Configuration Tailwind v4
```css
/* app.css */
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  
  --font-family-base: 'Inter', system-ui, sans-serif;
  
  --breakpoint-mobile: 640px;
  --breakpoint-tablette: 768px;
  --breakpoint-desktop: 1024px;
}

/* Conventions de nommage en français pour classes personnalisées */
.bouton-principal {
  @apply bg-primary text-white px-4 py-2 rounded-lg;
  @apply hover:bg-primary/90 transition-colors;
}

.carte {
  @apply bg-white shadow-md rounded-lg p-6;
  @apply dark:bg-gray-800 dark:text-white;
}
```

#### Standards CSS Modernes
```css
/* Utiliser les variables CSS natives */
:root {
  --espacement-base: 1rem;
  --rayon-bordure: 0.5rem;
  --transition-rapide: 150ms ease-in-out;
}

/* Container queries (2025) */
@container (min-width: 400px) {
  .carte {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}

/* Cascade Layers pour organisation */
@layer base {
  /* Styles de base */
}

@layer composants {
  /* Composants réutilisables */
}

@layer utilitaires {
  /* Classes utilitaires */
}
```

### JavaScript Moderne (ES2024)

#### Standards et Bonnes Pratiques
```javascript
// Utiliser 'use strict' en début de fichier
'use strict';

// Imports nommés plutôt que default
import { recupererUtilisateurs, creerUtilisateur } from './services/utilisateurs.js';

// Constantes en MAJUSCULES
const API_URL = 'https://api.exemple.com';
const TIMEOUT_REQUETE = 5000;

// Fonctions fléchées pour callbacks
const filtrerActifs = (utilisateurs) => 
  utilisateurs.filter(u => u.actif);

// Destructuration
const { nom, email, age = 18 } = utilisateur;
const [premier, ...reste] = tableau;

// Async/await avec gestion d'erreur
async function chargerDonnees() {
  try {
    const reponse = await fetch(API_URL);
    
    if (!reponse.ok) {
      throw new Error(`Erreur HTTP: ${reponse.status}`);
    }
    
    const donnees = await reponse.json();
    return donnees;
  } catch (erreur) {
    console.error('Erreur lors du chargement:', erreur);
    throw erreur;
  }
}

// Optional chaining et nullish coalescing
const nomUtilisateur = utilisateur?.profil?.nom ?? 'Anonyme';

// Template literals pour strings
const message = `Bonjour ${nom}, vous avez ${compteur} notifications`;
```

### React.js (v19.0.0 - Décembre 2024)

#### Configuration Projet React
```json
// package.json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.3",
    "typescript": "^5.7.2",
    "@types/react": "^19.0.0",
    "eslint": "^9.16.0"
  }
}
```

#### Standards React 19
```typescript
// Utiliser le nouveau use() hook pour les ressources
import { use } from 'react';

function ComposantUtilisateur({ promesseDonnees }) {
  const donnees = use(promesseDonnees);
  
  return <div>{donnees.nom}</div>;
}

// Server Components avec 'use server'
async function ActionServeur(donnees: FormData) {
  'use server';
  
  const nom = donnees.get('nom');
  await sauvegarderEnBase(nom);
}

// Nouvelle API useFormStatus
import { useFormStatus } from 'react-dom';

function BoutonSoumission() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Envoi...' : 'Envoyer'}
    </button>
  );
}

// Optimistic updates avec useOptimistic
import { useOptimistic } from 'react';

function ListeTaches({ taches }) {
  const [tachesOptimistes, ajouterTacheOptimiste] = useOptimistic(
    taches,
    (etat, nouvelleTache) => [...etat, nouvelleTache]
  );
  
  return (
    <ul>
      {tachesOptimistes.map(tache => (
        <li key={tache.id}>{tache.titre}</li>
      ))}
    </ul>
  );
}
```

#### Architecture React Recommandée
```
src/
├── composants/
│   ├── ui/              # Composants UI génériques
│   ├── formulaires/     # Composants formulaires
│   └── mise-en-page/    # Layout components
├── pages/               # Pages de l'application
├── hooks/               # Hooks personnalisés
├── contextes/           # Contexts React
├── services/            # Services API
├── types/               # Types TypeScript
├── utils/               # Utilitaires
└── App.tsx
```

### Next.js (v15.1.0 - Janvier 2025)

#### Configuration Next.js 15
```typescript
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  // App Router (par défaut)
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Optimisations images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.exemple.com',
      },
    ],
  },
  
  // Support i18n
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
};

export default config;
```

#### Structure App Router
```
app/
├── (auth)/              # Groupe de routes
│   ├── connexion/
│   └── inscription/
├── (dashboard)/
│   ├── layout.tsx       # Layout partagé
│   └── page.tsx
├── api/                 # Routes API
│   └── utilisateurs/
│       └── route.ts
├── layout.tsx           # Root layout
├── page.tsx             # Page d'accueil
├── loading.tsx          # UI de chargement
├── error.tsx            # UI d'erreur
└── not-found.tsx        # Page 404
```

#### Server Actions et Server Components
```typescript
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function creerUtilisateur(donnees: FormData) {
  const nom = donnees.get('nom') as string;
  
  // Validation
  if (!nom || nom.length < 3) {
    return { erreur: 'Le nom doit contenir au moins 3 caractères' };
  }
  
  // Sauvegarde en base
  await db.utilisateurs.creer({ nom });
  
  // Revalidation du cache
  revalidatePath('/utilisateurs');
  
  return { succes: true };
}

// Server Component
async function ListeUtilisateurs() {
  const utilisateurs = await recupererUtilisateurs();
  
  return (
    <ul>
      {utilisateurs.map(u => (
        <li key={u.id}>{u.nom}</li>
      ))}
    </ul>
  );
}

// Client Component
'use client';

import { useFormState } from 'react-dom';

export function FormulaireUtilisateur() {
  const [etat, action] = useFormState(creerUtilisateur, null);
  
  return (
    <form action={action}>
      <input name="nom" required />
      {etat?.erreur && <p>{etat.erreur}</p>}
      <button type="submit">Créer</button>
    </form>
  );
}
```

### Laravel (v11.x - 2025)

#### Configuration Laravel 11
```php
// composer.json
{
    "require": {
        "php": "^8.3",
        "laravel/framework": "^11.0",
        "laravel/sanctum": "^4.0",
        "laravel/octane": "^2.6"
    }
}
```

#### Structure et Conventions Laravel
```php
<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UtilisateurController extends Controller
{
    /**
     * Afficher la liste des utilisateurs
     */
    public function index(): JsonResponse
    {
        $utilisateurs = Utilisateur::with('profil')
            ->whereActif(true)
            ->latest()
            ->paginate(15);
            
        return response()->json([
            'succes' => true,
            'donnees' => $utilisateurs
        ]);
    }
    
    /**
     * Créer un nouvel utilisateur
     */
    public function store(Request $request): JsonResponse
    {
        $validateur = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs',
            'mot_de_passe' => 'required|min:8|confirmed',
        ], [
            'nom.required' => 'Le nom est obligatoire',
            'email.unique' => 'Cet email est déjà utilisé',
        ]);
        
        if ($validateur->fails()) {
            return response()->json([
                'succes' => false,
                'erreurs' => $validateur->errors()
            ], 422);
        }
        
        $utilisateur = Utilisateur::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'mot_de_passe' => bcrypt($request->mot_de_passe),
        ]);
        
        return response()->json([
            'succes' => true,
            'message' => 'Utilisateur créé avec succès',
            'donnees' => $utilisateur
        ], 201);
    }
}

// Model avec conventions françaises
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    protected $table = 'utilisateurs';
    
    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe',
    ];
    
    protected $hidden = [
        'mot_de_passe',
    ];
    
    protected $casts = [
        'email_verifie_le' => 'datetime',
        'actif' => 'boolean',
    ];
    
    // Relations
    public function profil()
    {
        return $this->hasOne(Profil::class);
    }
    
    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
```

### PHP (8.3 - 2025)

#### Standards PHP Modernes
```php
<?php

declare(strict_types=1);

namespace App\Services;

// Types stricts
class ServiceUtilisateur
{
    public function __construct(
        private readonly RepositoryUtilisateur $repository,
        private readonly ServiceEmail $serviceEmail
    ) {}
    
    // Types de retour stricts
    public function creerUtilisateur(
        string $nom,
        string $email,
        int $age
    ): Utilisateur {
        // Validation
        if (strlen($nom) < 3) {
            throw new \InvalidArgumentException(
                'Le nom doit contenir au moins 3 caractères'
            );
        }
        
        // Null coalescing
        $age = $age ?? 18;
        
        // Match expression (PHP 8)
        $typeCompte = match ($age) {
            0...17 => 'mineur',
            18...64 => 'adulte',
            default => 'senior',
        };
        
        $utilisateur = $this->repository->creer([
            'nom' => $nom,
            'email' => $email,
            'age' => $age,
            'type_compte' => $typeCompte,
        ]);
        
        // Envoyer email de bienvenue
        $this->serviceEmail->envoyerBienvenue($utilisateur);
        
        return $utilisateur;
    }
    
    // Enums (PHP 8.1+)
    public function changerStatut(Utilisateur $user, StatutUtilisateur $statut): void
    {
        $user->statut = $statut;
        $user->save();
    }
}

// Enum
enum StatutUtilisateur: string
{
    case ACTIF = 'actif';
    case INACTIF = 'inactif';
    case SUSPENDU = 'suspendu';
    
    public function obtenirLibelle(): string
    {
        return match($this) {
            self::ACTIF => 'Actif',
            self::INACTIF => 'Inactif',
            self::SUSPENDU => 'Suspendu',
        };
    }
}

// Readonly class (PHP 8.2+)
readonly class DonneesUtilisateur
{
    public function __construct(
        public string $nom,
        public string $email,
        public int $age,
    ) {}
}
```

### Python (3.13 - 2025)

#### Standards Python Modernes
```python
"""
Module de gestion des utilisateurs
"""

from typing import Optional, List
from dataclasses import dataclass
from datetime import datetime

# Type hints stricts
@dataclass
class Utilisateur:
    """Classe représentant un utilisateur"""
    nom: str
    email: str
    age: int
    actif: bool = True
    date_creation: datetime = datetime.now()
    
    def __post_init__(self):
        """Validation après initialisation"""
        if self.age < 0:
            raise ValueError("L'âge ne peut pas être négatif")
        
        if '@' not in self.email:
            raise ValueError("Email invalide")

class ServiceUtilisateur:
    """Service de gestion des utilisateurs"""
    
    def __init__(self, repository):
        self._repository = repository
    
    def creer_utilisateur(
        self,
        nom: str,
        email: str,
        age: int
    ) -> Utilisateur:
        """
        Crée un nouvel utilisateur
        
        Args:
            nom: Nom de l'utilisateur
            email: Email de l'utilisateur
            age: Âge de l'utilisateur
            
        Returns:
            Utilisateur créé
            
        Raises:
            ValueError: Si les données sont invalides
        """
        # Validation
        if len(nom) < 3:
            raise ValueError("Le nom doit contenir au moins 3 caractères")
        
        # Création
        utilisateur = Utilisateur(
            nom=nom,
            email=email,
            age=age
        )
        
        # Sauvegarde
        self._repository.sauvegarder(utilisateur)
        
        return utilisateur
    
    def lister_actifs(self) -> List[Utilisateur]:
        """Retourne la liste des utilisateurs actifs"""
        return [
            u for u in self._repository.tous()
            if u.actif
        ]
    
    async def charger_async(self, id_utilisateur: int) -> Optional[Utilisateur]:
        """
        Charge un utilisateur de manière asynchrone
        
        Args:
            id_utilisateur: ID de l'utilisateur
            
        Returns:
            Utilisateur trouvé ou None
        """
        return await self._repository.trouver_par_id(id_utilisateur)

# Context manager
class ConnexionBD:
    """Gestionnaire de connexion à la base de données"""
    
    def __enter__(self):
        self.connexion = self._etablir_connexion()
        return self.connexion
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.connexion:
            self.connexion.fermer()
        return False

# Utilisation
with ConnexionBD() as db:
    utilisateurs = db.recuperer_tous()
```

### Node.js (v22.13.0 LTS - Janvier 2025)

#### Configuration Package.json
```json
{
  "name": "mon-projet",
  "version": "1.0.0",
  "type": "module",
  "engines": {
    "node": ">=22.13.0"
  },
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest"
  },
  "dependencies": {
    "express": "^5.0.1",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@types/node": "^22.10.5",
    "typescript": "^5.7.2",
    "tsx": "^4.19.2"
  }
}
```

#### Standards Node.js/TypeScript
```typescript
// src/serveur.ts
import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Schéma de validation
const SchemaUtilisateur = z.object({
  nom: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  email: z.string().email('Email invalide'),
  age: z.number().int().positive('L\'âge doit être positif'),
});

type Utilisateur = z.infer<typeof SchemaUtilisateur>;

// Middleware d'erreur
function gestionnaireErreurs(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Erreur:', err);
  
  res.status(500).json({
    succes: false,
    message: 'Une erreur est survenue',
    erreur: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
}

// Configuration serveur
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.post('/api/utilisateurs', async (req: Request, res: Response) => {
  try {
    // Validation
    const donnees = SchemaUtilisateur.parse(req.body);
    
    // Logique métier
    const utilisateur = await creerUtilisateur(donnees);
    
    res.status(201).json({
      succes: true,
      message: 'Utilisateur créé avec succès',
      donnees: utilisateur,
    });
  } catch (erreur) {
    if (erreur instanceof z.ZodError) {
      return res.status(400).json({
        succes: false,
        erreurs: erreur.errors,
      });
    }
    throw erreur;
  }
});

app.use(gestionnaireErreurs);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// Service avec async/await
async function creerUtilisateur(donnees: Utilisateur) {
  // Simuler appel DB
  return {
    id: Date.now(),
    ...donnees,
    dateCreation: new Date(),
  };
}
```

---

## 🎨 Design UI/UX

### Principes Fondamentaux

#### Hiérarchie Visuelle
```css
/* Échelle typographique */
:root {
  --taille-texte-xs: 0.75rem;    /* 12px */
  --taille-texte-sm: 0.875rem;   /* 14px */
  --taille-texte-base: 1rem;     /* 16px */
  --taille-texte-lg: 1.125rem;   /* 18px */
  --taille-texte-xl: 1.25rem;    /* 20px */
  --taille-texte-2xl: 1.5rem;    /* 24px */
  --taille-texte-3xl: 1.875rem;  /* 30px */
  --taille-texte-4xl: 2.25rem;   /* 36px */
  
  /* Espacements cohérents */
  --espacement-1: 0.25rem;  /* 4px */
  --espacement-2: 0.5rem;   /* 8px */
  --espacement-3: 0.75rem;  /* 12px */
  --espacement-4: 1rem;     /* 16px */
  --espacement-6: 1.5rem;   /* 24px */
  --espacement-8: 2rem;     /* 32px */
  --espacement-12: 3rem;    /* 48px */
}
```

#### Palette de Couleurs Accessible
```css
:root {
  /* Couleurs primaires (contraste WCAG AA minimum) */
  --couleur-primaire-50: #eff6ff;
  --couleur-primaire-500: #3b82f6;
  --couleur-primaire-900: #1e3a8a;
  
  /* Couleurs sémantiques */
  --couleur-succes: #10b981;
  --couleur-avertissement: #f59e0b;
  --couleur-erreur: #ef4444;
  --couleur-info: #3b82f6;
  
  /* Texte avec contraste suffisant */
  --couleur-texte-primaire: #111827;     /* Sur fond clair */
  --couleur-texte-secondaire: #6b7280;
  --couleur-texte-inverse: #f9fafb;      /* Sur fond sombre */
}
```

#### Composants Accessibles
```typescript
// Bouton accessible
interface ProprietésBouton {
  children: React.ReactNode;
  variante?: 'primaire' | 'secondaire' | 'danger';
  taille?: 'petit' | 'moyen' | 'grand';
  chargement?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

const Bouton: React.FC<ProprietésBouton> = ({
  children,
  variante = 'primaire',
  taille = 'moyen',
  chargement = false,
  disabled = false,
  ariaLabel,
  onClick,
}) => {
  return (
    <button
      className={cn(
        'bouton',
        `bouton--${variante}`,
        `bouton--${taille}`,
        chargement && 'bouton--chargement'
      )}
      disabled={disabled || chargement}
      aria-label={ariaLabel}
      aria-busy={chargement}
      onClick={onClick}
    >
      {chargement ? (
        <>
          <IconeChargement aria-hidden="true" />
          <span>Chargement...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
```

### Design System

#### Tokens de Design
```typescript
// design-tokens.ts
export const tokens = {
  couleurs: {
    primaire: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
    neutre: {
      50: '#f9fafb',
      500: '#6b7280',
      900: '#111827',
    },
  },
  
  typographie: {
    famille: {
      base: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    taille: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    poids: {
      normal: 400,
      moyen: 500,
      gras: 700,
    },
  },
  
  espacement: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  
  bordures: {
    rayon: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px',
    },
    largeur: {
      fine: '1px',
      moyenne: '2px',
      epaisse: '4px',
    },
  },
  
  ombres: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
  
  transitions: {
    rapide: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normale: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    lente: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
```

### Responsive Design (Mobile-First)

#### Breakpoints Standards
```typescript
// breakpoints.ts
export const breakpoints = {
  mobile: '640px',      // Téléphones
  tablette: '768px',    // Tablettes
  laptop: '1024px',     // Ordinateurs portables
  desktop: '1280px',    // Écrans de bureau
  large: '1536px',      // Grands écrans
} as const;

// Utilisation avec Tailwind
export const mediaQueries = {
  mobile: `@media (min-width: ${breakpoints.mobile})`,
  tablette: `@media (min-width: ${breakpoints.tablette})`,
  laptop: `@media (min-width: ${breakpoints.laptop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  large: `@media (min-width: ${breakpoints.large})`,
};
```

#### Exemple de Composant Responsive
```typescript
// Carte responsive
const Carte: React.FC<{ titre: string; contenu: string }> = ({
  titre,
  contenu,
}) => {
  return (
    <article className="
      /* Mobile d'abord */
      p-4
      bg-white
      rounded-lg
      shadow-md
      
      /* Tablette et plus */
      sm:p-6
      
      /* Laptop et plus */
      lg:p-8
      lg:shadow-lg
      
      /* Hover states */
      hover:shadow-xl
      transition-shadow
      duration-300
    ">
      <h2 className="
        text-lg
        font-bold
        mb-2
        
        sm:text-xl
        lg:text-2xl
      ">
        {titre}
      </h2>
      
      <p className="
        text-sm
        text-gray-600
        
        sm:text-base
        lg:text-lg
      ">
        {contenu}
      </p>
    </article>
  );
};
```

### Guidelines d'Accessibilité (WCAG 2.2)

#### Checklist Essentielle
```markdown
## Accessibilité - Points Critiques

✅ **Contraste des Couleurs**
- Texte normal : ratio minimum 4.5:1
- Texte large : ratio minimum 3:1
- Utiliser des outils comme Contrast Checker

✅ **Navigation au Clavier**
- Tous les éléments interactifs doivent être accessibles au clavier
- Focus visible avec outline ou ring
- Ordre de tabulation logique (tabindex)

✅ **Textes Alternatifs**
- Toutes les images doivent avoir un attribut alt
- Images décoratives : alt=""
- Images informatives : description concise

✅ **Formulaires**
- Labels associés aux champs (for/id)
- Messages d'erreur clairs et accessibles
- Instructions explicites
- Validation côté client accessible

✅ **Structure Sémantique**
- Utiliser les balises HTML appropriées
- Hiérarchie de titres logique (h1 > h2 > h3)
- Landmarks ARIA (role="navigation", "main", etc.)

✅ **Contenu Dynamique**
- ARIA live regions pour les mises à jour
- Loading states accessibles
- Skip links pour navigation rapide
```

---

## 🔥 Firebase (SDK v11.0.0 - 2025)

### Configuration Firebase

#### Initialisation Web
```typescript
// firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';

const configurationFirebase = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialisation
const app = initializeApp(configurationFirebase);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west1'); // Région
export const analytics = getAnalytics(app);
```

### Authentication

#### Gestion Complète de l'Auth
```typescript
// services/auth.service.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

export class ServiceAuthentification {
  /**
   * Inscription avec email et mot de passe
   */
  static async inscription(
    email: string,
    motDePasse: string
  ): Promise<User> {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        motDePasse
      );
      return credential.user;
    } catch (erreur: any) {
      throw new Error(
        this.obtenirMessageErreur(erreur.code)
      );
    }
  }
  
  /**
   * Connexion avec email et mot de passe
   */
  static async connexion(
    email: string,
    motDePasse: string
  ): Promise<User> {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        motDePasse
      );
      return credential.user;
    } catch (erreur: any) {
      throw new Error(
        this.obtenirMessageErreur(erreur.code)
      );
    }
  }
  
  /**
   * Déconnexion
   */
  static async deconnexion(): Promise<void> {
    await signOut(auth);
  }
  
  /**
   * Réinitialisation du mot de passe
   */
  static async reinitialiserMotDePasse(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email, {
      url: `${window.location.origin}/connexion`,
      handleCodeInApp: false,
    });
  }
  
  /**
   * Observer l'état d'authentification
   */
  static observerEtatAuth(
    callback: (utilisateur: User | null) => void
  ) {
    return onAuthStateChanged(auth, callback);
  }
  
  /**
   * Messages d'erreur en français
   */
  private static obtenirMessageErreur(code: string): string {
    const messages: Record<string, string> = {
      'auth/email-already-in-use': 'Cet email est déjà utilisé',
      'auth/invalid-email': 'Email invalide',
      'auth/weak-password': 'Le mot de passe est trop faible',
      'auth/user-not-found': 'Utilisateur non trouvé',
      'auth/wrong-password': 'Mot de passe incorrect',
      'auth/too-many-requests': 'Trop de tentatives, réessayez plus tard',
    };
    
    return messages[code] || 'Une erreur est survenue';
  }
}
```

### Firestore

#### CRUD Complet avec TypeScript
```typescript
// services/firestore.service.ts
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentData,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

interface Utilisateur {
  id?: string;
  nom: string;
  email: string;
  age: number;
  actif: boolean;
  dateCreation: Timestamp;
}

export class ServiceFirestore<T extends DocumentData> {
  constructor(private nomCollection: string) {}
  
  /**
   * Créer un document
   */
  async creer(donnees: Omit<T, 'id'>): Promise<string> {
    const ref = collection(db, this.nomCollection);
    const docRef = await addDoc(ref, {
      ...donnees,
      dateCreation: Timestamp.now(),
    });
    return docRef.id;
  }
  
  /**
   * Lire un document
   */
  async lire(id: string): Promise<T | null> {
    const docRef = doc(db, this.nomCollection, id);
    const snapshot = await getDoc(docRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as T;
  }
  
  /**
   * Mettre à jour un document
   */
  async mettreAJour(
    id: string,
    donnees: Partial<T>
  ): Promise<void> {
    const docRef = doc(db, this.nomCollection, id);
    await updateDoc(docRef, donnees);
  }
  
  /**
   * Supprimer un document
   */
  async supprimer(id: string): Promise<void> {
    const docRef = doc(db, this.nomCollection, id);
    await deleteDoc(docRef);
  }
  
  /**
   * Lister avec filtres
   */
  async lister(
    filtres?: QueryConstraint[]
  ): Promise<T[]> {
    const ref = collection(db, this.nomCollection);
    const q = filtres ? query(ref, ...filtres) : ref;
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  }
}

// Utilisation
const serviceUtilisateurs = new ServiceFirestore<Utilisateur>('utilisateurs');

// Créer
const idUtilisateur = await serviceUtilisateurs.creer({
  nom: 'Jean Dupont',
  email: 'jean@exemple.com',
  age: 30,
  actif: true,
  dateCreation: Timestamp.now(),
});

// Lire
const utilisateur = await serviceUtilisateurs.lire(idUtilisateur);

// Lister avec filtres
const utilisateursActifs = await serviceUtilisateurs.lister([
  where('actif', '==', true),
  orderBy('dateCreation', 'desc'),
  limit(10),
]);
```

### Storage

#### Upload et Gestion de Fichiers
```typescript
// services/storage.service.ts
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { storage } from '@/config/firebase';

export class ServiceStorage {
  /**
   * Uploader un fichier
   */
  static async uploaderFichier(
    fichier: File,
    chemin: string,
    onProgress?: (progression: number) => void
  ): Promise<string> {
    const storageRef = ref(storage, chemin);
    
    if (onProgress) {
      // Upload avec progression
      const uploadTask = uploadBytesResumable(storageRef, fichier);
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progression = 
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progression);
          },
          reject,
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });
    } else {
      // Upload simple
      await uploadBytes(storageRef, fichier);
      return getDownloadURL(storageRef);
    }
  }
  
  /**
   * Supprimer un fichier
   */
  static async supprimerFichier(chemin: string): Promise<void> {
    const storageRef = ref(storage, chemin);
    await deleteObject(storageRef);
  }
  
  /**
   * Lister les fichiers d'un dossier
   */
  static async listerFichiers(chemin: string): Promise<string[]> {
    const storageRef = ref(storage, chemin);
    const result = await listAll(storageRef);
    
    const urls = await Promise.all(
      result.items.map(item => getDownloadURL(item))
    );
    
    return urls;
  }
}

// Utilisation dans un composant
function ComposantUpload() {
  const [progression, setProgression] = useState(0);
  
  const handleUpload = async (fichier: File) => {
    try {
      const chemin = `images/${Date.now()}_${fichier.name}`;
      const url = await ServiceStorage.uploaderFichier(
        fichier,
        chemin,
        setProgression
      );
      
      console.log('Fichier uploadé:', url);
    } catch (erreur) {
      console.error('Erreur upload:', erreur);
    }
  };
  
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const fichier = e.target.files?.[0];
          if (fichier) handleUpload(fichier);
        }}
      />
      {progression > 0 && (
        <p>Progression: {progression.toFixed(0)}%</p>
      )}
    </div>
  );
}
```

---

## 💧 Supabase (v2.50.0 - 2025)

### Configuration Supabase

#### Initialisation
```typescript
// supabase.config.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database.types';

const urlSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const cleSupabase = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(
  urlSupabase,
  cleSupabase,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'x-application-name': 'mon-app',
      },
    },
  }
);
```

### Authentication

#### Service Auth Supabase
```typescript
// services/supabase-auth.service.ts
import { supabase } from '@/config/supabase';

export class ServiceAuthSupabase {
  /**
   * Inscription
   */
  static async inscription(email: string, motDePasse: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: motDePasse,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          langue: 'fr',
        },
      },
    });
    
    if (error) throw new Error(error.message);
    return data;
  }
  
  /**
   * Connexion
   */
  static async connexion(email: string, motDePasse: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: motDePasse,
    });
    
    if (error) throw new Error(error.message);
    return data;
  }
  
  /**
   * Connexion avec OAuth
   */
  static async connexionOAuth(provider: 'google' | 'github') {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) throw new Error(error.message);
    return data;
  }
  
  /**
   * Déconnexion
   */
  static async deconnexion() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }
  
  /**
   * Obtenir l'utilisateur actuel
   */
  static async obtenirUtilisateur() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return user;
  }
  
  /**
   * Observer les changements d'état
   */
  static observerAuth(
    callback: (event: string, session: any) => void
  ) {
    return supabase.auth.onAuthStateChange(callback);
  }
}
```

### Database (PostgreSQL)

#### Types Générés
```typescript
// types/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      utilisateurs: {
        Row: {
          id: string
          email: string
          nom: string
          age: number
          actif: boolean
          date_creation: string
          date_modification: string
        }
        Insert: {
          id?: string
          email: string
          nom: string
          age: number
          actif?: boolean
          date_creation?: string
          date_modification?: string
        }
        Update: {
          id?: string
          email?: string
          nom?: string
          age?: number
          actif?: boolean
          date_creation?: string
          date_modification?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
```

#### Service Database
```typescript
// services/supabase-db.service.ts
import { supabase } from '@/config/supabase';
import type { Database } from '@/types/database.types';

type Utilisateur = Database['public']['Tables']['utilisateurs']['Row'];
type NouvelUtilisateur = Database['public']['Tables']['utilisateurs']['Insert'];

export class ServiceDBSupabase {
  /**
   * Créer un utilisateur
   */
  static async creerUtilisateur(donnees: NouvelUtilisateur) {
    const { data, error } = await supabase
      .from('utilisateurs')
      .insert(donnees)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }
  
  /**
   * Lire un utilisateur
   */
  static async lireUtilisateur(id: string) {
    const { data, error } = await supabase
      .from('utilisateurs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }
  
  /**
   * Mettre à jour un utilisateur
   */
  static async mettreAJourUtilisateur(
    id: string,
    donnees: Partial<Utilisateur>
  ) {
    const { data, error } = await supabase
      .from('utilisateurs')
      .update(donnees)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }
  
  /**
   * Supprimer un utilisateur
   */
  static async supprimerUtilisateur(id: string) {
    const { error } = await supabase
      .from('utilisateurs')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  }
  
  /**
   * Lister avec filtres et pagination
   */
  static async listerUtilisateurs(
    options: {
      actif?: boolean;
      page?: number;
      limite?: number;
      tri?: 'nom' | 'date_creation';
      ordre?: 'asc' | 'desc';
    } = {}
  ) {
    const {
      actif,
      page = 1,
      limite = 10,
      tri = 'date_creation',
      ordre = 'desc',
    } = options;
    
    let query = supabase
      .from('utilisateurs')
      .select('*', { count: 'exact' });
    
    // Filtres
    if (actif !== undefined) {
      query = query.eq('actif', actif);
    }
    
    // Tri
    query = query.order(tri, { ascending: ordre === 'asc' });
    
    // Pagination
    const debut = (page - 1) * limite;
    query = query.range(debut, debut + limite - 1);
    
    const { data, error, count } = await query;
    
    if (error) throw new Error(error.message);
    
    return {
      donnees: data,
      total: count || 0,
      page,
      pages: Math.ceil((count || 0) / limite),
    };
  }
  
  /**
   * Recherche full-text
   */
  static async rechercherUtilisateurs(terme: string) {
    const { data, error } = await supabase
      .from('utilisateurs')
      .select('*')
      .textSearch('nom', terme, {
        type: 'websearch',
        config: 'french',
      });
    
    if (error) throw new Error(error.message);
    return data;
  }
}
```

### Storage Supabase

#### Service Storage
```typescript
// services/supabase-storage.service.ts
import { supabase } from '@/config/supabase';

export class ServiceStorageSupabase {
  /**
   * Uploader un fichier
   */
  static async uploaderFichier(
    bucket: string,
    chemin: string,
    fichier: File,
    options?: {
      cacheControl?: string;
      upsert?: boolean;
    }
  ) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(chemin, fichier, {
        cacheControl: options?.cacheControl || '3600',
        upsert: options?.upsert || false,
      });
    
    if (error) throw new Error(error.message);
    
    // Obtenir l'URL publique
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
    
    return {
      chemin: data.path,
      url: urlData.publicUrl,
    };
  }
  
  /**
   * Télécharger un fichier
   */
  static async telechargerFichier(bucket: string, chemin: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(chemin);
    
    if (error) throw new Error(error.message);
    return data;
  }
  
  /**
   * Supprimer un fichier
   */
  static async supprimerFichier(bucket: string, chemin: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([chemin]);
    
    if (error) throw new Error(error.message);
  }
  
  /**
   * Lister les fichiers
   */
  static async listerFichiers(
    bucket: string,
    dossier?: string
  ) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(dossier, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });
    
    if (error) throw new Error(error.message);
    return data;
  }
}
```

### Realtime

#### Subscriptions en Temps Réel
```typescript
// hooks/useRealtimeUtilisateurs.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type Utilisateur = {
  id: string;
  nom: string;
  email: string;
  actif: boolean;
};

export function useRealtimeUtilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [chargement, setChargement] = useState(true);
  
  useEffect(() => {
    // Charger les données initiales
    chargerUtilisateurs();
    
    // S'abonner aux changements
    const subscription = supabase
      .channel('utilisateurs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'utilisateurs',
        },
        gererChangement
      )
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  async function chargerUtilisateurs() {
    const { data } = await supabase
      .from('utilisateurs')
      .select('*')
      .order('date_creation', { ascending: false });
    
    if (data) {
      setUtilisateurs(data);
      setChargement(false);
    }
  }
  
  function gererChangement(
    payload: RealtimePostgresChangesPayload<Utilisateur>
  ) {
    if (payload.eventType === 'INSERT') {
      setUtilisateurs(prev => [payload.new, ...prev]);
    } else if (payload.eventType === 'UPDATE') {
      setUtilisateurs(prev =>
        prev.map(u => u.id === payload.new.id ? payload.new : u)
      );
    } else if (payload.eventType === 'DELETE') {
      setUtilisateurs(prev =>
        prev.filter(u => u.id !== payload.old.id)
      );
    }
  }
  
  return { utilisateurs, chargement };
}
```

---

## 🖥️ Configuration Serveur VPS

### Prérequis Système

#### Ubuntu Server 24.04 LTS
```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation des outils essentiels
sudo apt install -y \
  curl \
  wget \
  git \
  vim \
  htop \
  ufw \
  fail2ban \
  certbot \
  python3-certbot-nginx

# Configuration du pare-feu
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

### Node.js Installation

#### Via NVM (Recommandé)
```bash
# Installer NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Recharger le shell
source ~/.bashrc

# Installer Node.js LTS
nvm install 22
nvm use 22
nvm alias default 22

# Vérifier l'installation
node --version  # v22.13.0
npm --version   # 10.9.2

# Installer pnpm (gestionnaire de paquets moderne)
npm install -g pnpm

# Installer PM2 (gestionnaire de processus)
npm install -g pm2
```

### Nginx Configuration

#### Installation et Configuration
```bash
# Installer Nginx
sudo apt install -y nginx

# Configuration de base
sudo nano /etc/nginx/sites-available/default
```

```nginx
# /etc/nginx/sites-available/mon-site
server {
    listen 80;
    listen [::]:80;
    server_name monsite.com www.monsite.com;

    # Redirection vers HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name monsite.com www.monsite.com;

    # Certificats SSL
    ssl_certificate /etc/letsencrypt/live/monsite.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/monsite.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Logs
    access_log /var/log/nginx/monsite_access.log;
    error_log /var/log/nginx/monsite_error.log;

    # Application Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Fichiers statiques avec cache
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, max-age=3600, immutable";
    }

    # Images avec cache
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/mon-site /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

### SSL/TLS avec Let's Encrypt

```bash
# Obtenir un certificat SSL
sudo certbot --nginx -d monsite.com -d www.monsite.com

# Renouvellement automatique
sudo certbot renew --dry-run

# Ajouter au crontab pour renouvellement auto
sudo crontab -e
# Ajouter cette ligne:
0 3 * * * certbot renew --quiet --post-hook "systemctl reload nginx"
```

### PostgreSQL Installation

```bash
# Installer PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Démarrer le service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Créer un utilisateur et une base de données
sudo -u postgres psql

-- Dans psql:
CREATE USER mon_utilisateur WITH PASSWORD 'mot_de_passe_securise';
CREATE DATABASE ma_base_de_donnees OWNER mon_utilisateur;
GRANT ALL PRIVILEGES ON DATABASE ma_base_de_donnees TO mon_utilisateur;
\q
```

### PM2 - Gestion des Applications

#### Configuration PM2
```bash
# Créer un fichier de configuration
nano ecosystem.config.js
```

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'mon-app-web',
      script: 'npm',
      args: 'start',
      cwd: '/home/utilisateur/mon-app',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
    {
      name: 'mon-api',
      script: 'dist/index.js',
      cwd: '/home/utilisateur/mon-api',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
  ],
};
```

```bash
# Démarrer les applications
pm2 start ecosystem.config.js

# Commandes utiles PM2
pm2 list              # Liste des apps
pm2 logs              # Logs en temps réel
pm2 monit             # Monitoring
pm2 restart all       # Redémarrer toutes les apps
pm2 stop all          # Arrêter toutes les apps
pm2 delete all        # Supprimer toutes les apps

# Sauvegarder la configuration
pm2 save

# Démarrage automatique au boot
pm2 startup
# Copier et exécuter la commande affichée
```

### Docker Installation (Optionnel)

```bash
# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Ajouter l'utilisateur au groupe docker
sudo usermod -aG docker $USER

# Installer Docker Compose
sudo apt install -y docker-compose-plugin

# Vérifier l'installation
docker --version
docker compose version
```

#### Exemple Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/dbname
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=dbname
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

### Monitoring et Maintenance

#### Scripts de Monitoring
```bash
# Créer un script de monitoring
nano /home/utilisateur/scripts/monitor.sh
```

```bash
#!/bin/bash
# monitor.sh - Script de monitoring simple

# Vérifier l'espace disque
df -h | grep -vE '^Filesystem|tmpfs|cdrom' | awk '{ print $5 " " $1 }' | while read output;
do
  usep=$(echo $output | awk '{ print $1}' | cut -d'%' -f1)
  partition=$(echo $output | awk '{ print $2 }')
  if [ $usep -ge 90 ]; then
    echo "ALERTE: La partition $partition est pleine à $usep%"
  fi
done

# Vérifier la RAM
free -m | awk 'NR==2{printf "Mémoire utilisée: %.2f%%\n", $3*100/$2 }'

# Vérifier les services
services=("nginx" "postgresql" "pm2")
for service in "${services[@]}"
do
  if ! systemctl is-active --quiet $service; then
    echo "ALERTE: Le service $service n'est pas actif"
  fi
done
```

```bash
# Rendre le script exécutable
chmod +x /home/utilisateur/scripts/monitor.sh

# Ajouter au crontab (toutes les heures)
crontab -e
# Ajouter:
0 * * * * /home/utilisateur/scripts/monitor.sh >> /var/log/monitor.log 2>&1
```

### Sauvegardes Automatiques

```bash
# Script de sauvegarde
nano /home/utilisateur/scripts/backup.sh
```

```bash
#!/bin/bash
# backup.sh - Script de sauvegarde automatique

BACKUP_DIR="/home/utilisateur/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Créer le dossier de backup s'il n'existe pas
mkdir -p $BACKUP_DIR

# Backup de la base de données
PGPASSWORD="mot_de_passe" pg_dump -U mon_utilisateur ma_base_de_donnees > \
  $BACKUP_DIR/db_backup_$DATE.sql

# Backup des fichiers de l'application
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz /home/utilisateur/mon-app

# Garder seulement les 7 derniers backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup terminé: $DATE"
```

```bash
# Rendre exécutable
chmod +x /home/utilisateur/scripts/backup.sh

# Ajouter au crontab (tous les jours à 2h du matin)
crontab -e
# Ajouter:
0 2 * * * /home/utilisateur/scripts/backup.sh >> /var/log/backup.log 2>&1
```

---

## 🔧 Outils et Workflow de Développement

### Git Configuration

```bash
# Configuration globale
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"

# Aliases utiles
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### GitFlow - Convention de Branches

```
main              # Production
├── develop       # Développement
    ├── feature/  # Nouvelles fonctionnalités
    ├── bugfix/   # Corrections de bugs
    ├── hotfix/   # Corrections urgentes
    └── release/  # Préparation releases
```

```bash
# Créer une nouvelle fonctionnalité
git checkout develop
git checkout -b feature/nom-fonctionnalite

# Une fois terminée
git checkout develop
git merge --no-ff feature/nom-fonctionnalite
git branch -d feature/nom-fonctionnalite
git push origin develop
```

### Commits Conventionnels

```bash
# Format: type(scope): description

# Types principaux:
# feat:     Nouvelle fonctionnalité
# fix:      Correction de bug
# docs:     Documentation
# style:    Formatage (pas de changement de code)
# refactor: Refactoring
# test:     Ajout de tests
# chore:    Tâches diverses

# Exemples:
git commit -m "feat(auth): ajouter connexion OAuth Google"
git commit -m "fix(api): corriger la validation email"
git commit -m "docs(readme): mettre à jour les instructions"
git commit -m "refactor(utils): simplifier la fonction de formatage"
```

### ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

### Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

---

## 📋 Checklist de Projet

### Avant de Commencer un Projet

```markdown
## Checklist Initialisation Projet

✅ **Configuration Environnement**
- [ ] Node.js version correcte installée
- [ ] Gestionnaire de paquets configuré (npm/pnpm/yarn)
- [ ] IDE configuré (extensions, linters, formatters)
- [ ] Git initialisé avec .gitignore approprié

✅ **Structure Projet**
- [ ] Architecture de dossiers définie
- [ ] Conventions de nommage établies
- [ ] Documentation README.md créée
- [ ] Variables d'environnement configurées

✅ **Qualité Code**
- [ ] ESLint configuré
- [ ] Prettier configuré
- [ ] Hooks pre-commit (Husky)
- [ ] Tests unitaires setup

✅ **Sécurité**
- [ ] Dépendances à jour
- [ ] Secrets dans .env (jamais dans le code)
- [ ] CORS configuré
- [ ] Rate limiting implémenté

✅ **Performance**
- [ ] Lazy loading configuré
- [ ] Images optimisées
- [ ] Bundle size monitoring
- [ ] Caching strategy définie
```

### Avant de Déployer

```markdown
## Checklist Déploiement

✅ **Build Production**
- [ ] Build passe sans erreur
- [ ] Warnings critiques résolus
- [ ] Variables d'environnement configurées
- [ ] Assets optimisés

✅ **Tests**
- [ ] Tests unitaires passent
- [ ] Tests d'intégration passent
- [ ] Tests manuels effectués
- [ ] Performance testée

✅ **Sécurité**
- [ ] Dépendances vulnérables mises à jour
- [ ] HTTPS configuré
- [ ] Headers de sécurité en place
- [ ] Rate limiting actif

✅ **Monitoring**
- [ ] Logs configurés
- [ ] Erreurs trackées
- [ ] Performance monitoring
- [ ] Alertes configurées

✅ **Documentation**
- [ ] README à jour
- [ ] API documentée
- [ ] Guide de déploiement écrit
- [ ] Changelog mis à jour
```

---

## 🎓 Ressources et Documentation

### Documentation Officielle (2025)

- **JavaScript/TypeScript**: [https://developer.mozilla.org](https://developer.mozilla.org)
- **React**: [https://react.dev](https://react.dev)
- **Next.js**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Flutter**: [https://docs.flutter.dev](https://docs.flutter.dev)
- **React Native**: [https://reactnative.dev](https://reactnative.dev)
- **Laravel**: [https://laravel.com/docs](https://laravel.com/docs)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Firebase**: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- **Supabase**: [https://supabase.com/docs](https://supabase.com/docs)

### Outils Essentiels

- **Can I Use**: [https://caniuse.com](https://caniuse.com) - Compatibilité navigateurs
- **Bundle Phobia**: [https://bundlephobia.com](https://bundlephobia.com) - Taille des packages
- **npm trends**: [https://npmtrends.com](https://npmtrends.com) - Comparaison de packages
- **Excalidraw**: [https://excalidraw.com](https://excalidraw.com) - Diagrammes
- **Regex101**: [https://regex101.com](https://regex101.com) - Tester les regex

---

## 🌟 Conclusion

Ce document doit être votre **bible de référence** pour tout développement fullstack avec Qoder. Toutes les règles, conventions et bonnes pratiques décrites ici sont basées sur les **standards 2025** et les **meilleures pratiques de l'industrie**.

### Points Clés à Retenir

1. **Toujours en Français**: Toutes les interactions avec l'IDE se font en français
2. **Standards 2025**: Utiliser les versions les plus récentes et stables
3. **TypeScript First**: Privilégier TypeScript pour la sécurité des types
4. **Performance**: Optimiser dès le début (lazy loading, code splitting, caching)
5. **Accessibilité**: WCAG 2.2 minimum pour tous les projets
6. **Sécurité**: Jamais de secrets dans le code, toujours valider les entrées
7. **Tests**: Couvrir les fonctionnalités critiques
8. **Documentation**: Documenter au fur et à mesure

### Mise à Jour du Document

Ce document doit être mis à jour régulièrement pour:
- Nouvelles versions de frameworks/bibliothèques
- Nouveaux standards et bonnes pratiques
- Retours d'expérience sur les projets
- Évolutions des outils de développement

---

**Version**: 1.0.0  
**Date**: Janvier 2025  
**Auteur**: Guide Complet Qoder Fullstack  
**Licence**: Usage Interne

*Bonne chance dans vos développements! 🚀*
