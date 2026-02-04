import Link from 'next/link';
import Image from 'next/image';
import { Book } from 'lucide-react';
import { cn, formatPrice } from '../../lib/utils';

/**
 * Interface Collection pour CollectionListCard
 */
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  price: number;
  bookCount: number;
  isNew?: boolean;
  isPopular?: boolean;
}

/**
 * Interface pour les props du CollectionListCard
 */
export interface CollectionListCardProps {
  collection: Collection;
}

/**
 * Détermine quel badge afficher pour une collection
 * Règle: isNew a priorité sur isPopular, jamais les deux en même temps
 *
 * @param isNew - Si la collection est nouvelle
 * @param isPopular - Si la collection est populaire
 * @returns Le type de badge à afficher ou null
 */
export function getBadgeType(
  isNew?: boolean,
  isPopular?: boolean
): 'new' | 'popular' | null {
  if (isNew) return 'new';
  if (isPopular) return 'popular';
  return null;
}

/**
 * CollectionListCard - Composant carte pour la page listing des collections
 *
 * Affiche une collection avec:
 * - Image de couverture aspect-[4/3] avec coins arrondis (rounded-xl)
 * - Badge "Nouveau" ou "Populaire" (jamais les deux)
 * - Nombre de livres avec icône
 * - Titre en gras
 * - Description courte (line-clamp-2)
 * - Prix en FCFA avec couleur primary
 * - Lien "Voir la collection →"
 * - Background blanc avec shadow au hover
 *
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 5.4, 5.5
 */
export function CollectionListCard({ collection }: CollectionListCardProps) {
  const badgeType = getBadgeType(collection.isNew, collection.isPopular);

  return (
    <div
      className={cn(
        'group',
        'rounded-2xl overflow-hidden',
        'bg-dark-light',
        'transition-all duration-300',
        'hover:shadow-lg hover:border-gold',
        'border border-transparent'
      )}
      data-testid="collection-list-card"
    >
      {/* Image de couverture avec badge */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={collection.coverImage}
          alt={collection.name}
          fill
          className={cn(
            'object-cover rounded-xl',
            'transition-transform duration-300',
            'group-hover:scale-105'
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badge Nouveau ou Populaire */}
        {badgeType && (
          <div
            className={cn(
              'absolute top-3 right-3',
              'bg-gold text-dark',
              'px-3 py-1',
              'rounded-full',
              'text-xs font-medium'
            )}
            data-testid={`badge-${badgeType}`}
          >
            {badgeType === 'new' ? 'Nouveau' : 'Populaire'}
          </div>
        )}
      </div>

      {/* Contenu de la carte */}
      <div className="p-4">
        {/* Nombre de livres */}
        <div className="flex items-center gap-1.5 text-sm text-light-dimmed mb-2">
          <Book className="w-4 h-4" />
          <span data-testid="book-count">{collection.bookCount} Livres</span>
        </div>

        {/* Titre de la collection */}
        <h3 className={cn('font-bold text-lg', 'text-gold', 'mb-2')}>
          {collection.name}
        </h3>

        {/* Description courte */}
        <p className={cn('text-sm text-light-dimmed', 'line-clamp-2', 'mb-4')}>
          {collection.description}
        </p>

        {/* Prix et lien */}
        <div className="flex items-center justify-between">
          {/* Prix en FCFA */}
          <span className="font-bold text-base text-gold" data-testid="price">
            {formatPrice(collection.price)}
          </span>

          {/* Lien vers la collection */}
          <Link
            href={`/collections/${collection.slug}`}
            className={cn(
              'text-sm text-light',
              'hover:text-gold hover:underline',
              'flex items-center gap-1',
              'transition-colors'
            )}
          >
            Voir la collection
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CollectionListCard;
