# 🚀 GUIDE DE DÉPLOIEMENT NETLIFY
## Éditions Germinale - Configuration Complète

**Date:** 04 Février 2026  
**Version:** 1.0  
**Stack:** Next.js 16.1.1 + Supabase + Netlify

---

## 📋 PRÉREQUIS

Avant de déployer sur Netlify, assurez-vous d'avoir :

- ✅ Un compte GitHub avec le repository du projet
- ✅ Un compte Netlify (gratuit ou payant)
- ✅ Un compte Supabase avec la base de données configurée
- ✅ Toutes les variables d'environnement prêtes (voir `.env.example`)
- ✅ Le code validé localement (`npm run build` réussit)

---

## 🔧 ÉTAPE 1 : PRÉPARATION DU PROJET

### 1.1 Vérifier que le build fonctionne localement

```bash
# Installer les dépendances
npm install

# Vérifier TypeScript
npm run type-check

# Vérifier ESLint
npm run lint

# Tester le build
npm run build

# Tester en production locale
npm run start
```

**✅ Tous les tests doivent passer sans erreur avant de déployer.**

### 1.2 Vérifier les fichiers de configuration

Assurez-vous que ces fichiers sont présents et corrects :

- ✅ `netlify.toml` - Configuration Netlify
- ✅ `next.config.ts` - Configuration Next.js optimisée
- ✅ `.env.example` - Template des variables d'environnement
- ✅ `.gitignore` - Fichiers sensibles exclus (`.env.local`, `.netlify`, etc.)
- ✅ `package.json` - Scripts de build corrects

### 1.3 Pousser le code sur GitHub

```bash
# Ajouter tous les fichiers modifiés
git add .

# Commit avec un message descriptif
git commit -m "feat: Configuration optimisée pour déploiement Netlify"

# Pousser sur la branche principale
git push origin main
```

---

## 🌐 ÉTAPE 2 : CONFIGURATION NETLIFY

### 2.1 Créer un nouveau site sur Netlify

1. Aller sur [https://app.netlify.com](https://app.netlify.com)
2. Cliquer sur **"Add new site"** → **"Import an existing project"**
3. Choisir **GitHub** comme provider
4. Autoriser Netlify à accéder à votre repository GitHub
5. Sélectionner le repository **germinalenewsitepc** (ou votre nom de repo)

### 2.2 Configuration du build

Netlify devrait détecter automatiquement la configuration depuis `netlify.toml`, mais vérifiez :

**Build settings:**
- **Base directory:** (laisser vide)
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Functions directory:** (laisser vide, géré par le plugin)

**Advanced build settings:**
- **Node version:** `20.18.0` (défini dans netlify.toml)

### 2.3 Installer le plugin Next.js

Le plugin `@netlify/plugin-nextjs` est déjà configuré dans `netlify.toml`.

Netlify l'installera automatiquement lors du premier déploiement.

---

## 🔐 ÉTAPE 3 : VARIABLES D'ENVIRONNEMENT

### 3.1 Configurer les variables dans Netlify

Aller dans **Site settings** → **Environment variables** → **Add a variable**

**⚠️ IMPORTANT : Copier EXACTEMENT les valeurs de votre `.env.local` local.**

#### Variables obligatoires :

```bash
# Application
NEXT_PUBLIC_APP_URL=https://votre-site.netlify.app
NEXT_PUBLIC_APP_NAME=Éditions Germinale

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# NextAuth
NEXTAUTH_URL=https://votre-site.netlify.app
NEXTAUTH_SECRET=votre-secret-genere-32-caracteres

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# UploadThing
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=your-app-id

# Resend
RESEND_API_KEY=re_...

# FedaPay
FEDAPAY_SECRET_KEY=sk_sandbox_... (ou sk_live_...)
FEDAPAY_PUBLIC_KEY=pk_sandbox_... (ou pk_live_...)
FEDAPAY_ENVIRONMENT=sandbox (ou live)
```

### 3.2 Variables sensibles

**⚠️ MARQUER COMME SENSIBLES (cocher "Sensitive"):**
- `NEXTAUTH_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`
- `UPLOADTHING_SECRET`
- `RESEND_API_KEY`
- `FEDAPAY_SECRET_KEY`

### 3.3 Scopes des variables

Pour chaque variable, définir le scope :
- **Production** : Variables pour le site en production
- **Deploy previews** : Variables pour les previews de branches
- **Branch deploys** : Variables pour les déploiements de branches

**Recommandation :** Utiliser les mêmes variables pour tous les scopes en développement, puis séparer en production.

---

## 🚀 ÉTAPE 4 : PREMIER DÉPLOIEMENT

### 4.1 Lancer le déploiement

Une fois les variables configurées :

1. Cliquer sur **"Deploy site"** (ou attendre le déploiement automatique)
2. Netlify va :
   - Cloner le repository
   - Installer les dépendances (`npm install`)
   - Installer le plugin Next.js
   - Exécuter `npm run build`
   - Déployer le site

### 4.2 Surveiller le build

Aller dans **Deploys** pour voir les logs en temps réel.

**Durée estimée du premier build :** 3-5 minutes

### 4.3 Vérifier le déploiement

Une fois le déploiement terminé :

1. Cliquer sur le lien du site (ex: `https://random-name-123.netlify.app`)
2. Vérifier que la homepage se charge correctement
3. Tester la navigation entre les pages
4. Vérifier que les images s'affichent
5. Tester l'authentification (inscription/connexion)

---

## 🌍 ÉTAPE 5 : DOMAINE PERSONNALISÉ (OPTIONNEL)

### 5.1 Ajouter un domaine personnalisé

1. Aller dans **Site settings** → **Domain management**
2. Cliquer sur **"Add custom domain"**
3. Entrer votre domaine : `votredomaine.com`
4. Netlify va vérifier la propriété du domaine

### 5.2 Configurer les DNS

**Option A : Utiliser les DNS de Netlify (recommandé)**

1. Aller chez votre registrar (OVH, Namecheap, etc.)
2. Changer les nameservers vers ceux de Netlify :
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```

**Option B : Configurer manuellement les DNS**

Ajouter ces enregistrements DNS chez votre registrar :

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: votre-site.netlify.app
```

### 5.3 Activer HTTPS

Netlify génère automatiquement un certificat SSL Let's Encrypt.

**Attendre 24-48h pour la propagation DNS complète.**

### 5.4 Mettre à jour les variables d'environnement

Une fois le domaine configuré, mettre à jour :

```bash
NEXT_PUBLIC_APP_URL=https://votredomaine.com
NEXTAUTH_URL=https://votredomaine.com
```

Puis **redéployer le site** (Deploys → Trigger deploy → Deploy site).

---

## 🔄 ÉTAPE 6 : DÉPLOIEMENTS AUTOMATIQUES

### 6.1 Configuration des déploiements automatiques

Par défaut, Netlify déploie automatiquement à chaque push sur la branche `main`.

**Configuration :**
- **Site settings** → **Build & deploy** → **Continuous deployment**
- **Branch deploys:** `main` (production)
- **Deploy previews:** Activé pour les Pull Requests

### 6.2 Déploiements de branches

Pour déployer d'autres branches automatiquement :

1. Aller dans **Site settings** → **Build & deploy** → **Branch deploys**
2. Ajouter les branches à déployer (ex: `develop`, `staging`)

### 6.3 Deploy previews

Les Pull Requests génèrent automatiquement des previews :
- URL unique pour chaque PR
- Permet de tester avant de merger
- Commentaire automatique sur GitHub avec le lien

---

## 🔍 ÉTAPE 7 : MONITORING ET MAINTENANCE

### 7.1 Surveiller les déploiements

**Deploys** → Voir l'historique complet des déploiements

**Logs disponibles :**
- Build logs (npm install, build)
- Function logs (API routes Next.js)
- Edge logs (middleware)

### 7.2 Activer les notifications

**Site settings** → **Build & deploy** → **Deploy notifications**

Configurer les notifications pour :
- ✅ Deploy started
- ✅ Deploy succeeded
- ✅ Deploy failed
- ✅ Deploy locked

**Canaux disponibles :**
- Email
- Slack
- Webhook

### 7.3 Analytics (optionnel)

Netlify Analytics (payant) fournit :
- Nombre de visiteurs
- Pages les plus visitées
- Bande passante utilisée
- Temps de chargement

**Alternative gratuite :** Google Analytics, Plausible, etc.

### 7.4 Monitoring des erreurs

**Recommandations :**
- Utiliser Sentry pour tracker les erreurs JavaScript
- Configurer les logs Supabase pour les erreurs backend
- Surveiller les logs Netlify Functions

---

## 🐛 DÉPANNAGE

### Erreur : "Build failed"

**Causes possibles :**
1. Erreurs TypeScript → Vérifier `npm run type-check` localement
2. Erreurs ESLint → Vérifier `npm run lint` localement
3. Variables d'environnement manquantes → Vérifier dans Netlify Dashboard
4. Dépendances manquantes → Vérifier `package.json`

**Solution :**
```bash
# Localement, reproduire le build de production
npm run build

# Si ça fonctionne localement mais pas sur Netlify :
# - Vérifier les variables d'environnement
# - Vérifier les logs de build sur Netlify
```

### Erreur : "Function invocation failed"

**Causes possibles :**
1. Timeout (26s max sur plan gratuit)
2. Erreur dans une API route
3. Variable d'environnement manquante

**Solution :**
- Aller dans **Functions** → Voir les logs détaillés
- Vérifier que toutes les variables sont définies
- Optimiser le code pour réduire le temps d'exécution

### Erreur : "Page not found" (404)

**Causes possibles :**
1. Route Next.js mal configurée
2. Problème de redirection

**Solution :**
- Vérifier que `netlify.toml` est correct
- Vérifier que le plugin `@netlify/plugin-nextjs` est installé
- Redéployer le site

### Images ne s'affichent pas

**Causes possibles :**
1. URL Supabase incorrecte
2. Bucket Supabase non public
3. Configuration `next.config.ts` incorrecte

**Solution :**
- Vérifier `NEXT_PUBLIC_SUPABASE_URL` dans les variables
- Vérifier que le bucket Supabase est public
- Vérifier `images.remotePatterns` dans `next.config.ts`

### Authentification ne fonctionne pas

**Causes possibles :**
1. `NEXTAUTH_URL` incorrect
2. `NEXTAUTH_SECRET` manquant
3. Callback URL Supabase incorrect

**Solution :**
- Vérifier `NEXTAUTH_URL=https://votre-domaine.com` (sans trailing slash)
- Vérifier que `NEXTAUTH_SECRET` est défini
- Dans Supabase Dashboard → Authentication → URL Configuration :
  - Site URL: `https://votre-domaine.com`
  - Redirect URLs: `https://votre-domaine.com/api/auth/callback/*`

---

## ✅ CHECKLIST FINALE

Avant de considérer le déploiement comme réussi :

**Build et déploiement :**
- [ ] Build réussit sans erreurs
- [ ] Site accessible via l'URL Netlify
- [ ] Toutes les pages se chargent correctement
- [ ] Images s'affichent correctement

**Fonctionnalités :**
- [ ] Navigation fonctionne
- [ ] Authentification fonctionne (inscription/connexion)
- [ ] Formulaires fonctionnent
- [ ] Upload de fichiers fonctionne (si applicable)
- [ ] Paiements fonctionnent (tester en sandbox)

**Performance :**
- [ ] Temps de chargement < 3 secondes
- [ ] Images optimisées (WebP/AVIF)
- [ ] Pas d'erreurs dans la console navigateur

**Sécurité :**
- [ ] HTTPS activé
- [ ] Headers de sécurité configurés
- [ ] Variables sensibles marquées comme "Sensitive"
- [ ] `.env.local` non commité sur GitHub

**SEO et Analytics :**
- [ ] Métadonnées configurées
- [ ] Sitemap généré
- [ ] Robots.txt configuré
- [ ] Analytics configuré (optionnel)

---

## 📚 RESSOURCES

**Documentation officielle :**
- Netlify Next.js : https://docs.netlify.com/integrations/frameworks/next-js/
- Next.js Deployment : https://nextjs.org/docs/deployment
- Supabase : https://supabase.com/docs

**Support :**
- Netlify Support : https://answers.netlify.com/
- Next.js Discord : https://nextjs.org/discord
- Supabase Discord : https://discord.supabase.com

---

## 🎉 FÉLICITATIONS !

Votre site **Éditions Germinale** est maintenant déployé sur Netlify !

**Prochaines étapes :**
1. Configurer un domaine personnalisé
2. Activer les analytics
3. Configurer les notifications
4. Optimiser les performances
5. Ajouter du monitoring d'erreurs

**Bon déploiement ! 🚀**
