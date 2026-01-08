'use client';

import { TabSwitcher, type AuthTab } from './TabSwitcher';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { SocialAuthButtons } from './SocialAuthButtons';

export interface FormSectionProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
}

/**
 * Section formulaire complète pour la page d'authentification
 * Contient le header, les onglets, les formulaires, l'authentification sociale et les liens légaux
 * Requirements: 2.1, 2.2, 2.3, 6.1, 7.1, 7.2, 7.3
 */
export function FormSection({ activeTab, onTabChange }: FormSectionProps) {
  // Handlers pour les formulaires (à connecter ultérieurement à NextAuth)
  const handleLoginSubmit = async (data: { email: string; password: string; rememberMe: boolean }) => {
    console.log('Login submitted:', data);
    // TODO: Intégrer avec NextAuth
  };

  const handleRegisterSubmit = async (data: { fullName: string; email: string; password: string; confirmPassword: string }) => {
    console.log('Register submitted:', data);
    // TODO: Intégrer avec NextAuth
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // TODO: Naviguer vers la page de récupération de mot de passe
  };

  const handleGoogleAuth = () => {
    console.log('Google auth clicked');
    // TODO: Intégrer avec NextAuth Google provider
  };

  const handleAppleAuth = () => {
    console.log('Apple auth clicked');
    // TODO: Intégrer avec NextAuth Apple provider
  };

  // Fonction pour basculer vers l'autre onglet
  const handleSwitchTab = () => {
    onTabChange(activeTab === 'login' ? 'register' : 'login');
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 py-8 md:px-12 lg:px-16 bg-white">
      <div className="w-full max-w-md mx-auto">
        {/* Header avec nom de la plateforme */}
        <header className="text-center mb-8">
          {/* Nom de la plateforme en or */}
          <p className="text-sm font-semibold tracking-widest text-gold uppercase mb-3" aria-label="Éditions Germinale">
            EDITIONS GERMINALE
          </p>
          
          {/* Titre principal - h1 pour accessibilité */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-2">
            Bienvenue
          </h1>
          
          {/* Sous-titre descriptif */}
          <p className="text-gray-500 text-sm">
            Connectez-vous pour accéder à votre bibliothèque.
          </p>
        </header>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <TabSwitcher activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        {/* Formulaires conditionnels */}
        <section
          role="tabpanel"
          id={activeTab === 'login' ? 'panel-login' : 'panel-register'}
          aria-labelledby={activeTab === 'login' ? 'tab-login' : 'tab-register'}
          tabIndex={0}
        >
          {activeTab === 'login' ? (
            <LoginForm
              onSubmit={handleLoginSubmit}
              onForgotPassword={handleForgotPassword}
            />
          ) : (
            <RegisterForm onSubmit={handleRegisterSubmit} />
          )}
        </section>

        {/* Séparateur "Ou continuer avec" */}
        <div className="relative my-8" role="separator" aria-orientation="horizontal">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              Ou continuer avec
            </span>
          </div>
        </div>

        {/* Boutons d'authentification sociale */}
        <SocialAuthButtons
          onGoogleClick={handleGoogleAuth}
          onAppleClick={handleAppleAuth}
        />

        {/* Lien de basculement */}
        <div className="text-center mt-8">
          {activeTab === 'login' ? (
            <p className="text-sm text-gray-600">
              Vous n&apos;avez pas de compte ?{' '}
              <button
                type="button"
                onClick={handleSwitchTab}
                className="text-gold font-medium hover:text-gold/80 transition-colors focus:outline-none focus:underline"
              >
                Créer un compte
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <button
                type="button"
                onClick={handleSwitchTab}
                className="text-gold font-medium hover:text-gold/80 transition-colors focus:outline-none focus:underline"
              >
                Se connecter
              </button>
            </p>
          )}
        </div>

        {/* Liens légaux */}
        <nav className="text-center mt-8 pt-6 border-t border-gray-100" aria-label="Liens légaux">
          <p className="text-xs text-gray-400">
            En continuant, vous acceptez nos{' '}
            <a
              href="/conditions-utilisation"
              className="text-gray-500 hover:text-gray-700 underline transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded"
            >
              Conditions d&apos;utilisation
            </a>
            {' '}et notre{' '}
            <a
              href="/politique-confidentialite"
              className="text-gray-500 hover:text-gray-700 underline transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded"
            >
              Politique de confidentialité
            </a>
          </p>
        </nav>
      </div>
    </div>
  );
}

export default FormSection;
