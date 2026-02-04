# 🔒 Guide de Validation Automatique Pré-Commit

**Date :** 04 Février 2026  
**Objectif :** Garantir que chaque commit respecte les standards de qualité 2026

---

## 📋 Validation Manuelle (Actuelle)

Avant chaque commit, exécutez manuellement :

```bash
# Validation complète
npm run validate

# OU exécuter individuellement
npx tsc --noEmit      # TypeScript
npm run lint          # ESLint
npm run format:check  # Prettier
npm run build         # Build (optionnel)
```

---

## 🤖 Validation Automatique avec Husky (Recommandé)

### Installation

#### Étape 1 : Installer Husky

```bash
npm install --save-dev husky lint-staged --legacy-peer-deps
```

#### Étape 2 : Initialiser Husky

```bash
npx husky init
```

#### Étape 3 : Configurer le hook pre-commit

Copier le contenu de `.husky/pre-commit.example` vers `.husky/pre-commit` :

```bash
# Windows (PowerShell)
Copy-Item .husky/pre-commit.example .husky/pre-commit

# Linux/Mac
cp .husky/pre-commit.example .husky/pre-commit
chmod +x .husky/pre-commit
```

#### Étape 4 : Tester le hook

```bash
git add .
git commit -m "test: validation automatique"
```

Le hook devrait s'exécuter automatiquement et bloquer le commit si des erreurs sont détectées.

---

## 🎯 Configuration lint-staged (Optionnel)

Pour valider uniquement les fichiers modifiés (plus rapide) :

### Ajouter dans package.json

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

### Modifier .husky/pre-commit

```bash
#!/bin/sh
echo "🔍 Validation des fichiers modifiés..."
npx lint-staged
npx tsc --noEmit
```

---

## ✅ Checklist de Validation

Avant chaque commit, vérifiez que :

- [ ] ✅ TypeScript : `npx tsc --noEmit` → Aucune erreur
- [ ] ✅ ESLint : `npm run lint` → Aucune erreur
- [ ] ✅ Prettier : `npm run format:check` → Tous les fichiers formatés
- [ ] ✅ Build : `npm run build` → Succès (recommandé)

---

## 🚫 Que Faire en Cas d'Erreur ?

### Erreurs TypeScript

```bash
# Afficher les erreurs
npx tsc --noEmit

# Corriger manuellement les erreurs de typage
# Puis revérifier
npx tsc --noEmit
```

### Erreurs ESLint

```bash
# Correction automatique (si possible)
npm run lint:fix

# Vérifier à nouveau
npm run lint

# Si erreurs persistent, corriger manuellement
```

### Erreurs Prettier

```bash
# Formater automatiquement tous les fichiers
npm run format

# Vérifier à nouveau
npm run format:check
```

### Erreurs de Build

```bash
# Afficher les erreurs détaillées
npm run build

# Corriger les erreurs
# Puis rebuild
npm run build
```

---

## 🎓 Bonnes Pratiques

### 1. Valider Avant de Committer

Toujours exécuter `npm run validate` avant de committer :

```bash
npm run validate && git add . && git commit -m "feat: nouvelle fonctionnalité"
```

### 2. Commits Atomiques

Faire des commits petits et focalisés :

```bash
# ❌ Mauvais : commit trop large
git commit -m "fix: corrections diverses"

# ✅ Bon : commit atomique
git commit -m "fix(auth): corriger validation email"
```

### 3. Messages de Commit Conventionnels

Utiliser le format Conventional Commits :

```
<type>(<scope>): <description>

Types :
- feat: Nouvelle fonctionnalité
- fix: Correction de bug
- docs: Documentation
- style: Formatage (pas de changement de code)
- refactor: Refactoring
- test: Ajout/modification de tests
- chore: Tâches de maintenance

Exemples :
feat(auth): ajouter connexion Google
fix(payment): corriger webhook FedaPay
docs(readme): mettre à jour installation
```

### 4. Ignorer la Validation (Urgence Uniquement)

En cas d'urgence absolue, vous pouvez bypasser le hook :

```bash
git commit --no-verify -m "hotfix: correction critique"
```

⚠️ **À UTILISER AVEC EXTRÊME PRUDENCE** - Peut introduire des bugs en production !

---

## 📊 Statistiques de Validation

### Temps d'Exécution Moyen

| Validation | Temps | Fréquence |
|-----------|-------|-----------|
| TypeScript | ~12s | Chaque commit |
| ESLint | ~2s | Chaque commit |
| Prettier | ~1s | Chaque commit |
| Build | ~15s | Avant push (optionnel) |

**Total :** ~15-30 secondes par commit

---

## 🔧 Dépannage

### Le hook ne s'exécute pas

```bash
# Vérifier que Husky est installé
ls -la .husky

# Réinstaller Husky
rm -rf .husky
npx husky init
```

### Erreur "permission denied"

```bash
# Rendre le hook exécutable (Linux/Mac)
chmod +x .husky/pre-commit
```

### Validation trop lente

Utiliser `lint-staged` pour valider uniquement les fichiers modifiés (voir section Configuration lint-staged).

---

## 📚 Ressources

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Document de Pilotage Technique](./STEERING_DOCUMENT_EDITION_GERMINALE.md)

---

**✅ Avec la validation automatique, vous garantissez que chaque commit respecte les standards de qualité 2026 !**
