import type { Metadata } from 'next';
import { AuthPage } from '@/src/components/auth';

/**
 * Métadonnées SEO pour la page d'authentification
 * Requirements: 1.1
 */
export const metadata: Metadata = {
  title: 'Connexion | Éditions Germinale',
  description: 'Connectez-vous à votre compte Éditions Germinale pour accéder à votre bibliothèque numérique et découvrir nos collections de livres.',
  keywords: ['connexion', 'login', 'éditions germinale', 'bibliothèque numérique', 'livres'],
  openGraph: {
    title: 'Connexion | Éditions Germinale',
    description: 'Connectez-vous à votre compte Éditions Germinale pour accéder à votre bibliothèque numérique.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Page d'authentification (connexion/inscription)
 * Requirements: 1.1
 */
export default function LoginPage() {
  return <AuthPage defaultTab="login" />;
}
