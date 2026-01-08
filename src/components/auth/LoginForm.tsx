'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../lib/validations/auth';

// Type explicite pour le formulaire de connexion
interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => Promise<void>;
  onForgotPassword: () => void;
}

/**
 * Icône Email SVG
 */
function EmailIcon() {
  return (
    <svg
      className="w-5 h-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

/**
 * Icône Cadenas SVG
 */
function LockIcon() {
  return (
    <svg
      className="w-5 h-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

/**
 * Icône Oeil ouvert SVG
 */
function EyeIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

/**
 * Icône Oeil fermé SVG
 */
function EyeOffIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  );
}

/**
 * Icône Flèche droite SVG
 */
function ArrowRightIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}


/**
 * Formulaire de connexion avec validation React Hook Form + Zod
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 9.5
 */
export function LoginForm({ onSubmit, onForgotPassword }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const handleFormSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-5"
      noValidate
      aria-label="Formulaire de connexion"
    >
      {/* Champ Email */}
      <div>
        <label
          htmlFor="login-email"
          className="block text-sm font-medium text-dark mb-2"
        >
          Adresse e-mail
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <EmailIcon />
          </div>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="exemple@email.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            className={`
              w-full pl-10 pr-4 py-3 rounded-lg border
              text-dark placeholder-gray-400
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
              ${errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p
            id="login-email-error"
            className="mt-1 text-sm text-red-500"
            role="alert"
            aria-live="polite"
          >
            {String(errors.email.message)}
          </p>
        )}
      </div>

      {/* Champ Mot de passe */}
      <div>
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-dark mb-2"
        >
          Mot de passe
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon />
          </div>
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'login-password-error' : undefined}
            className={`
              w-full pl-10 pr-12 py-3 rounded-lg border
              text-dark placeholder-gray-400
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
              ${errors.password
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            {...register('password')}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:text-gold"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.password && (
          <p
            id="login-password-error"
            className="mt-1 text-sm text-red-500"
            role="alert"
            aria-live="polite"
          >
            {String(errors.password.message)}
          </p>
        )}
      </div>

      {/* Se souvenir de moi + Mot de passe oublié */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="login-remember-me"
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold focus:ring-offset-0"
            {...register('rememberMe')}
          />
          <label 
            htmlFor="login-remember-me"
            className="ml-2 text-sm text-gray-600 cursor-pointer"
          >
            Se souvenir de moi
          </label>
        </div>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-gold hover:text-gold/80 font-medium transition-colors focus:outline-none focus:underline"
          aria-label="Récupérer votre mot de passe oublié"
        >
          Mot de passe oublié ?
        </button>
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full flex items-center justify-center gap-2
          py-3 px-6 rounded-lg
          bg-gold text-dark font-semibold
          transition-all duration-200
          hover:bg-gold-dark
          focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-dark"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Connexion en cours...</span>
          </>
        ) : (
          <>
            <span>Se connecter</span>
            <ArrowRightIcon />
          </>
        )}
      </button>
    </form>
  );
}

export default LoginForm;
