'use client';

import { useState } from 'react';
import { TabSwitcher, type AuthTab } from './TabSwitcher';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { SocialAuthButtons } from './SocialAuthButtons';
import {
  signIn,
  signUp,
  signInWithGoogle,
  resetPassword,
} from '@/src/lib/actions/auth';

export interface FormSectionProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
}

export function FormSection({ activeTab, onTabChange }: FormSectionProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleLoginSubmit = async (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    const result = await signIn(formData);

    if (result?.error) {
      setError(result.error);
      return;
    }

    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const handleRegisterSubmit = async (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('fullName', data.fullName);

    const result = await signUp(formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setError(null);
    setSuccess(null);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsResettingPassword(true);

    const formData = new FormData();
    formData.append('email', forgotPasswordEmail);

    const result = await resetPassword(formData);

    setIsResettingPassword(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotPasswordEmail('');
      }, 3000);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    await signInWithGoogle();
  };

  const handleAppleAuth = () => {
    setError('Connexion Apple non disponible pour le moment');
  };

  const handleSwitchTab = () => {
    setError(null);
    setSuccess(null);
    setShowForgotPassword(false);
    onTabChange(activeTab === 'login' ? 'register' : 'login');
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 py-8 md:px-12 lg:px-16 bg-white">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          <p
            className="text-sm font-semibold tracking-widest text-gold uppercase mb-3"
            aria-label="Éditions Germinale"
          >
            EDITIONS GERMINALE
          </p>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-2">
            {showForgotPassword ? 'Mot de passe oublié' : 'Bienvenue'}
          </h1>

          <p className="text-gray-500 text-sm">
            {showForgotPassword
              ? 'Entrez votre email pour recevoir un lien de réinitialisation.'
              : 'Connectez-vous pour accéder à votre bibliothèque.'}
          </p>
        </header>

        {error && (
          <div
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm"
            role="alert"
          >
            {success}
          </div>
        )}

        {showForgotPassword ? (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label
                htmlFor="reset-email"
                className="block text-sm font-medium text-dark mb-2"
              >
                Adresse e-mail
              </label>
              <input
                id="reset-email"
                type="email"
                value={forgotPasswordEmail}
                onChange={e => setForgotPasswordEmail(e.target.value)}
                placeholder="exemple@email.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={isResettingPassword}
              className="w-full py-3 px-6 rounded-lg bg-gold text-dark font-semibold transition-all duration-200 hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:opacity-50"
            >
              {isResettingPassword ? 'Envoi en cours...' : 'Envoyer le lien'}
            </button>

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="w-full text-center text-sm text-gray-600 hover:text-gold transition-colors"
            >
              Retour à la connexion
            </button>
          </form>
        ) : (
          <>
            <div className="flex justify-center mb-8">
              <TabSwitcher activeTab={activeTab} onTabChange={onTabChange} />
            </div>

            <section
              role="tabpanel"
              id={activeTab === 'login' ? 'panel-login' : 'panel-register'}
              aria-labelledby={
                activeTab === 'login' ? 'tab-login' : 'tab-register'
              }
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

            <div
              className="relative my-8"
              role="separator"
              aria-orientation="horizontal"
            >
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Ou continuer avec
                </span>
              </div>
            </div>

            <SocialAuthButtons
              onGoogleClick={handleGoogleAuth}
              onAppleClick={handleAppleAuth}
            />

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
          </>
        )}

        <nav
          className="text-center mt-8 pt-6 border-t border-gray-100"
          aria-label="Liens légaux"
        >
          <p className="text-xs text-gray-400">
            En continuant, vous acceptez nos{' '}
            <a
              href="/conditions-utilisation"
              className="text-gray-500 hover:text-gray-700 underline transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded"
            >
              Conditions d&apos;utilisation
            </a>{' '}
            et notre{' '}
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
