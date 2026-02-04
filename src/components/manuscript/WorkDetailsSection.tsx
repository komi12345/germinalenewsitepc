'use client';

import { cn } from '../../lib/utils';
import {
  FieldErrors,
  UseFormRegister,
  Control,
  useWatch,
} from 'react-hook-form';
import {
  ManuscriptFormData,
  LITERARY_GENRES,
  countWords,
  VALIDATION_CONSTANTS,
} from '../../lib/validations/manuscript';

/**
 * Props pour le composant WorkDetailsSection
 */
interface WorkDetailsSectionProps {
  register: UseFormRegister<ManuscriptFormData>;
  errors: FieldErrors<ManuscriptFormData>;
  control: Control<ManuscriptFormData>;
}

/**
 * WorkDetailsSection - Section 2 du formulaire de soumission de manuscrit
 *
 * Affiche:
 * - Numéro "2" dans un cercle vert avec le titre "Détails de l'œuvre"
 * - Champ "Titre du manuscrit" avec placeholder "Titre de l'œuvre"
 * - Sélecteur "Genre littéraire" avec les options définies
 * - Textarea "Synopsis" avec compteur de mots et avertissement si dépassé
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 8.1
 */
export function WorkDetailsSection({
  register,
  errors,
  control,
}: WorkDetailsSectionProps) {
  // Observer la valeur du synopsis pour le compteur de mots
  const synopsisValue = useWatch({
    control,
    name: 'synopsis',
    defaultValue: '',
  });

  const wordCount = countWords(synopsisValue || '');
  const isOverLimit = wordCount > VALIDATION_CONSTANTS.SYNOPSIS_MAX_WORDS;

  return (
    <div className="space-y-4" data-testid="work-details-section">
      {/* En-tête de section avec numéro */}
      <div className="flex items-center gap-3 mb-4">
        {/* Numéro "2" dans un cercle or */}
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
          2
        </div>
        <h2 className="text-lg font-semibold text-gold">
          Détails de l&apos;œuvre
        </h2>
      </div>

      {/* Champs du formulaire */}
      <div className="space-y-4">
        {/* Champ Titre du manuscrit */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-light mb-1"
          >
            Titre du manuscrit
          </label>
          <input
            id="title"
            type="text"
            placeholder="Titre de l'œuvre"
            {...register('title')}
            className={cn(
              'w-full px-4 py-2.5',
              'border rounded-lg',
              'bg-dark text-light placeholder-light-dimmed',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold',
              errors.title
                ? 'border-red-400 bg-red-900/20'
                : 'border-dark-lighter hover:border-gold/50'
            )}
            aria-invalid={errors.title ? 'true' : 'false'}
            aria-describedby={errors.title ? 'title-error' : undefined}
            data-testid="title-input"
          />
          {errors.title && (
            <p
              id="title-error"
              className="text-sm text-red-400 mt-1"
              role="alert"
              data-testid="title-error"
            >
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Sélecteur Genre littéraire */}
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-light mb-1"
          >
            Genre littéraire
          </label>
          <select
            id="genre"
            {...register('genre')}
            className={cn(
              'w-full px-4 py-2.5',
              'border rounded-lg',
              'bg-dark text-light',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold',
              'appearance-none',
              "bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2224%22%20height%3d%2224%22%20viewBox%3d%220%200%2024%2024%22%20fill%3d%22none%22%20stroke%3d%22%23D4AF37%22%20stroke-width%3d%222%22%20stroke-linecap%3d%22round%22%20stroke-linejoin%3d%22round%22%3e%3cpolyline%20points%3d%226%209%2012%2015%2018%209%22%3e%3c%2fpolyline%3e%3c%2fsvg%3e')]",
              'bg-size-[1.25rem] bg-position-[right_0.75rem_center] bg-no-repeat',
              'pr-10',
              errors.genre
                ? 'border-red-400 bg-red-900/20'
                : 'border-dark-lighter hover:border-gold/50'
            )}
            aria-invalid={errors.genre ? 'true' : 'false'}
            aria-describedby={errors.genre ? 'genre-error' : undefined}
            data-testid="genre-select"
          >
            <option value="" className="bg-dark text-light-dimmed">
              Sélectionner un genre
            </option>
            {LITERARY_GENRES.map(genre => (
              <option
                key={genre.value}
                value={genre.value}
                className="bg-dark text-light"
              >
                {genre.label}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p
              id="genre-error"
              className="text-sm text-red-400 mt-1"
              role="alert"
              data-testid="genre-error"
            >
              {errors.genre.message}
            </p>
          )}
        </div>

        {/* Textarea Synopsis */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="synopsis"
              className="block text-sm font-medium text-light"
            >
              Synopsis
            </label>
            <span
              className="text-sm text-light-dimmed"
              data-testid="max-words-label"
            >
              Max 500 mots
            </span>
          </div>
          <textarea
            id="synopsis"
            placeholder="Résumez votre œuvre en quelques paragraphes..."
            rows={6}
            {...register('synopsis')}
            className={cn(
              'w-full px-4 py-2.5',
              'border rounded-lg',
              'bg-dark text-light placeholder-light-dimmed',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold',
              'resize-none',
              errors.synopsis || isOverLimit
                ? 'border-red-400 bg-red-900/20'
                : 'border-dark-lighter hover:border-gold/50'
            )}
            aria-invalid={errors.synopsis || isOverLimit ? 'true' : 'false'}
            aria-describedby={
              errors.synopsis
                ? 'synopsis-error'
                : isOverLimit
                  ? 'synopsis-warning'
                  : undefined
            }
            data-testid="synopsis-textarea"
          />
          <div className="flex items-center justify-between mt-1">
            {/* Compteur de mots */}
            <span
              className={cn(
                'text-sm',
                isOverLimit ? 'text-red-400 font-medium' : 'text-light-dimmed'
              )}
              data-testid="word-count"
            >
              {wordCount} / {VALIDATION_CONSTANTS.SYNOPSIS_MAX_WORDS} mots
            </span>

            {/* Avertissement si dépassement */}
            {isOverLimit && !errors.synopsis && (
              <p
                id="synopsis-warning"
                className="text-sm text-red-400"
                role="alert"
                data-testid="synopsis-warning"
              >
                Le synopsis dépasse la limite de 500 mots
              </p>
            )}
          </div>
          {errors.synopsis && (
            <p
              id="synopsis-error"
              className="text-sm text-red-400 mt-1"
              role="alert"
              data-testid="synopsis-error"
            >
              {errors.synopsis.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkDetailsSection;
