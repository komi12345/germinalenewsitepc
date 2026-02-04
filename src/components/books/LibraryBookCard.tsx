/**
 * LibraryBookCard - Composant carte pour la page "Notre Librairie"
 *
 * Design différent du BookCard existant:
 * - Fond blanc/crème avec coins arrondis et ombre
 * - Image de couverture en format paysage (aspect-4/3)
 * - Catégorie en majuscules couleur teal/vert
 * - Titre en police serif foncée
 * - Auteur au format "Par [nom]" en gris
 * - Prix en FCFA à gauche, lien "Voir le livre" à droite
 * - Badges "Nouveauté" et "Coup de cœur" optionnels
 *
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9
 */

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { formatPrice } from '../../lib/utils';
import { BookExtended } from '../../lib/mockData';

export interface LibraryBookCardProps {
  book: BookExtended;
}

/**
 * LibraryBookCard - Carte livre pour la page Librairie
 *
 * Affiche un livre avec:
 * - Fond blanc/crème (bg-white) avec coins arrondis et ombre
 * - Image de couverture aspect-4/3 (format paysage)
 * - Badge "Nouveauté" en haut à droite (vert) si isNew
 * - Badge "Coup de cœur" en haut au centre (or/orange) si isFeatured
 * - Catégorie en majuscules teal/vert
 * - Titre en police serif foncée
 * - Auteur au format "Par [nom]" en gris
 * - Prix en FCFA à gauche, lien "Voir le livre" à droite
 */
export function LibraryBookCard({ book }: LibraryBookCardProps) {
  return (
    <article
      className={cn(
        'bg-white',
        'rounded-xl',
        'shadow-sm',
        'overflow-hidden',
        'transition-shadow duration-300',
        'hover:shadow-md'
      )}
      data-testid="library-book-card"
    >
      {/* Image avec badges */}
      <div className="relative aspect-4/3">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badge Nouveauté - en haut à droite */}
        {book.isNew && (
          <span
            className={cn(
              'absolute top-3 right-3',
              'bg-emerald-500 text-white',
              'px-2 py-1',
              'rounded-md',
              'text-xs font-medium'
            )}
            data-testid="badge-new"
          >
            Nouveauté
          </span>
        )}

        {/* Badge Coup de cœur - en haut au centre */}
        {book.isFeatured && (
          <span
            className={cn(
              'absolute top-3 left-1/2 -translate-x-1/2',
              'bg-amber-500 text-white',
              'px-2 py-1',
              'rounded-md',
              'text-xs font-medium'
            )}
            data-testid="badge-featured"
          >
            Coup de cœur
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className="p-4">
        {/* Catégorie */}
        <span
          className={cn(
            'text-xs uppercase',
            'text-teal-600',
            'font-medium',
            'tracking-wide'
          )}
          data-testid="book-category"
        >
          {book.category}
        </span>

        {/* Titre */}
        <h3
          className={cn(
            'font-serif',
            'text-gray-900',
            'text-lg',
            'font-semibold',
            'mt-1',
            'line-clamp-2'
          )}
          data-testid="book-title"
        >
          {book.title}
        </h3>

        {/* Auteur */}
        <p
          className={cn('text-gray-500', 'text-sm', 'mt-1')}
          data-testid="book-author"
        >
          Par {book.author}
        </p>

        {/* Footer: Prix et lien */}
        <div className="flex justify-between items-center mt-4">
          <span
            className={cn('font-semibold', 'text-gray-900')}
            data-testid="book-price"
          >
            {formatPrice(book.price)}
          </span>

          <Link
            href={`/books/${book.slug}`}
            className={cn(
              'text-teal-600',
              'text-sm',
              'font-medium',
              'hover:text-teal-700',
              'transition-colors'
            )}
            data-testid="book-link"
          >
            Voir le livre
          </Link>
        </div>
      </div>
    </article>
  );
}

export default LibraryBookCard;
