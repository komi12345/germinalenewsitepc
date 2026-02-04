'use client';

export interface SocialAuthButtonsProps {
  onGoogleClick: () => void;
  onAppleClick: () => void;
  disabled?: boolean;
}

/**
 * Icône Google SVG
 */
function GoogleIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/**
 * Icône Apple SVG
 */
function AppleIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

/**
 * Boutons d'authentification sociale (Google et Apple)
 * Style: fond blanc, bordure grise, disposition côte à côte
 * Requirements: 6.2, 6.3, 6.4
 */
export function SocialAuthButtons({
  onGoogleClick,
  onAppleClick,
  disabled = false,
}: SocialAuthButtonsProps) {
  const buttonBaseClasses = `
    flex-1 flex items-center justify-center gap-2
    py-3 px-4 rounded-lg
    bg-white border border-gray-200
    text-sm font-medium text-dark
    transition-all duration-200
    hover:bg-gray-50 hover:border-gray-300
    focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200
  `;

  return (
    <div
      className="flex gap-3 w-full"
      role="group"
      aria-label="Options d'authentification sociale"
    >
      {/* Bouton Google */}
      <button
        type="button"
        onClick={onGoogleClick}
        disabled={disabled}
        className={buttonBaseClasses}
        aria-label="Se connecter avec Google"
      >
        <GoogleIcon />
        <span>Google</span>
      </button>

      {/* Bouton Apple */}
      <button
        type="button"
        onClick={onAppleClick}
        disabled={disabled}
        className={buttonBaseClasses}
        aria-label="Se connecter avec Apple"
      >
        <AppleIcon />
        <span>Apple</span>
      </button>
    </div>
  );
}

export default SocialAuthButtons;
