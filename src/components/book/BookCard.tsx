import Link from 'next/link';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { formatPrice } from '../../lib/utils';

/**
 * Interface pour les props du BookCard
 */
export interface BookCardProps {
  book: {
    id: string;
    title: string;
    slug: string;
    author: string;
    coverImage: string;
    price: number; // Prix en FCFA
  };
}

/**
 * BookCard - Composant carte pour afficher un livre
 *
 * Affiche un livre avec:
 * - Fond noir (bg-dark-light) avec bordure hover dorée
 * - Image de couverture aspect-[3/4] avec coins arrondis
 * - Badge prix en haut à droite (bg-gold)
 * - Titre du livre en or (text-gold)
 * - Nom de l'auteur en blanc atténué (text-light-dimmed)
 * - Utilise formatPrice() pour le prix
 *
 * Requirements: 5.1, 5.2, 5.3, 5.6
 */
export function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className={cn(
        'group block',
        'relative',
        'bg-dark-light',
        'rounded-xl',
        'p-3',
        'border border-transparent',
        'transition-all duration-300',
        'hover:border-gold'
      )}
    >
      {/* Image de couverture avec badge prix */}
      <div className="relative aspect-3/4 overflow-hidden rounded-lg">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className={cn(
            'object-cover',
            'transition-transform duration-300',
            'group-hover:scale-105'
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
        />

        {/* Badge prix en haut à droite */}
        <div
          className={cn(
            'absolute top-3 right-3',
            'bg-gold text-dark',
            'px-2 py-1',
            'rounded-lg',
            'text-sm font-medium'
          )}
          data-testid="price-badge"
        >
          {formatPrice(book.price)}
        </div>
      </div>

      {/* Informations du livre */}
      <div className="mt-3">
        {/* Titre du livre */}
        <h3 className={cn('font-medium', 'text-gold', 'line-clamp-2')}>
          {book.title}
        </h3>

        {/* Nom de l'auteur */}
        <p className="text-sm text-light-dimmed mt-1">{book.author}</p>
      </div>
    </Link>
  );
}

export default BookCard;
