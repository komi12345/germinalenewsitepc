'use client';

import { cn } from '../../lib/utils';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ManuscriptFormData } from '../../lib/validations/manuscript';

/**
 * Props pour le composant PersonalInfoSection
 */
interface PersonalInfoSectionProps {
  register: UseFormRegister<ManuscriptFormData>;
  errors: FieldErrors<ManuscriptFormData>;
}

/**
 * PersonalInfoSection - Section 1 du formulaire de soumission de manuscrit
 *
 * Affiche:
 * - Numéro "1" dans un cercle vert avec le titre "Informations personnelles"
 * - Champ "Nom" avec placeholder "Votre nom"
 * - Champ "Prénom" avec placeholder "Votre prénom"
 * - Champ "Numéro de téléphone" avec placeholder "+228 90 00 00 00"
 * - Champ "Lieu de résidence" avec placeholder "Ville, Pays"
 * - Champ "Adresse email" avec placeholder "votre@email.com"
 * - Messages d'erreur de validation sous chaque champ
 * - Accessibilité avec aria-describedby pour les erreurs
 *
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 8.1, 8.3
 */
export function PersonalInfoSection({
  register,
  errors,
}: PersonalInfoSectionProps) {
  return (
    <div className="space-y-4" data-testid="personal-info-section">
      {/* En-tête de section avec numéro */}
      <div className="flex items-center gap-3 mb-4">
        {/* Numéro "1" dans un cercle or */}
        <div
          className={cn(
            'w-8 h-8',
            'rounded-full',
            'bg-gold',
            'flex items-center justify-center',
            'text-dark font-semibold text-sm'
          )}
          data-testid="section-number"
        >
          1
        </div>
        <h2 className="text-lg font-semibold text-gold">
          Informations personnelles
        </h2>
      </div>

      {/* Champs du formulaire */}
      <div className="space-y-4">
        {/* Ligne Nom et Prénom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Champ Nom */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-light mb-1"
            >
              Nom
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Votre nom"
              {...register('lastName')}
              className={cn(
                'w-full px-4 py-2.5',
                'border rounded-lg',
                'bg-dark text-light placeholder-light-dimmed',
                'transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold',
                errors.lastName
                  ? 'border-red-400 bg-red-900/20'
                  : 'border-dark-lighter hover:border-gold/50'
              )}
              aria-invalid={errors.lastName ? 'true' : 'false'}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              data-testid="lastName-input"
            />
            {errors.lastName && (
              <p
                id="lastName-error"
                className="text-sm text-red-400 mt-1"
                role="alert"
                data-testid="lastName-error"
              >
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Champ Prénom */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-light mb-1"
            >
              Prénom
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Votre prénom"
              {...register('firstName')}
              className={cn(
                'w-full px-4 py-2.5',
                'border rounded-lg',
                'bg-dark text-light placeholder-light-dimmed',
                'transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold',
                errors.firstName
                  ? 'border-red-400 bg-red-900/20'
                  : 'border-dark-lighter hover:border-gold/50'
              )}
              aria-invalid={errors.firstName ? 'true' : 'false'}
              aria-describedby={
                errors.firstName ? 'firstName-error' : undefined
              }
              data-testid="firstName-input"
            />
            {errors.firstName && (
              <p
                id="firstName-error"
                className="text-sm text-red-400 mt-1"
                role="alert"
                data-testid="firstName-error"
              >
                {errors.firstName.message}
              </p>
            )}
          </div>
        </div>

        {/* Champ Numéro de téléphone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-light mb-1"
          >
            Numéro de téléphone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+228 90 00 00 00"
            {...register('phone')}
            className={cn(
              'w-full px-4 py-2.5',
              'border rounded-lg',
              'bg-dark text-light placeholder-light-dimmed',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold',
              errors.phone
                ? 'border-red-400 bg-red-900/20'
                : 'border-dark-lighter hover:border-gold/50'
            )}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            data-testid="phone-input"
          />
          {errors.phone && (
            <p
              id="phone-error"
              className="text-sm text-red-400 mt-1"
              role="alert"
              data-testid="phone-error"
            >
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Champ Lieu de résidence */}
        <div>
          <label
            htmlFor="residence"
            className="block text-sm font-medium text-light mb-1"
          >
            Lieu de résidence
          </label>
          <input
            id="residence"
            type="text"
            placeholder="Ville, Pays"
            {...register('residence')}
            className={cn(
              'w-full px-4 py-2.5',
              'border rounded-lg',
              'bg-dark text-light placeholder-light-dimmed',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold',
              errors.residence
                ? 'border-red-400 bg-red-900/20'
                : 'border-dark-lighter hover:border-gold/50'
            )}
            aria-invalid={errors.residence ? 'true' : 'false'}
            aria-describedby={errors.residence ? 'residence-error' : undefined}
            data-testid="residence-input"
          />
          {errors.residence && (
            <p
              id="residence-error"
              className="text-sm text-red-400 mt-1"
              role="alert"
              data-testid="residence-error"
            >
              {errors.residence.message}
            </p>
          )}
        </div>

        {/* Champ Adresse email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-light mb-1"
          >
            Adresse email
          </label>
          <input
            id="email"
            type="email"
            placeholder="votre@email.com"
            {...register('email')}
            className={cn(
              'w-full px-4 py-2.5',
              'border rounded-lg',
              'bg-dark text-light placeholder-light-dimmed',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold',
              errors.email
                ? 'border-red-400 bg-red-900/20'
                : 'border-dark-lighter hover:border-gold/50'
            )}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            data-testid="email-input"
          />
          {errors.email && (
            <p
              id="email-error"
              className="text-sm text-red-400 mt-1"
              role="alert"
              data-testid="email-error"
            >
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoSection;
