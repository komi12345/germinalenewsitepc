'use client';

import { Send } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NewsletterFormProps {
  variant?: 'dark' | 'light';
}

/**
 * Composant NewsletterForm - Formulaire d'inscription à la newsletter
 *
 * Client Component car il utilise un event handler (onSubmit)
 *
 * @param variant - "dark" pour fond sombre (défaut), "light" pour fond clair
 *
 * Requirements: 3.6, 3.7
 */
export function NewsletterForm({ variant = 'dark' }: NewsletterFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implémenter l'inscription à la newsletter avec l'API
    console.log('Newsletter subscription submitted');
  };

  const isLight = variant === 'light';

  return (
    <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleSubmit}>
      <div className="relative flex-1">
        {/* Requirement 3.6: Input avec bg-dark-light, border-dark-lighter, text-light */}
        <input
          type="email"
          placeholder="Votre email"
          aria-label="Adresse email pour la newsletter"
          className={cn(
            'w-full px-4 py-2.5 rounded-lg text-sm',
            'focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent',
            'transition-all duration-200',
            isLight
              ? 'bg-dark-light border border-dark-lighter text-light placeholder-light-dimmed'
              : 'bg-dark-light border border-dark-lighter text-light placeholder-light-dimmed'
          )}
        />
      </div>
      {/* Requirement 3.7: Bouton bg-gold text-dark */}
      <button
        type="submit"
        className={cn(
          'px-4 py-2.5 bg-gold text-dark rounded-lg',
          'font-medium text-sm',
          'hover:bg-gold-light transition-colors duration-200',
          'flex items-center justify-center gap-2'
        )}
      >
        <span>S&apos;inscrire</span>
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}

export default NewsletterForm;
