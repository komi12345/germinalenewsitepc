'use client';

/**
 * RelatedCollectionCard - Carte pour afficher une collection similaire
 *
 * Affiche une collection avec:
 * - Image avec aspect-[16/9] et gradient overlay
 * - Label "COLLECTION" en petit
 * - Nom de la collection
 * - Lien "Découvrir →"
 *
 * Requirements: 5.3, 5.4
 */

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '../../lib/utils';

export interface RelatedCollectionCardProps {
  collection: {
    id: string;
    name: string;
    slug: string;
    coverImage: string;
  };
}

export function RelatedCollectionCard({
  collection,
}: RelatedCollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={cn(
        'group block relative rounded-xl overflow-hidden',
        'transition-all duration-300',
        'hover:scale-[1.02]',
        'border border-transparent hover:border-gold'
      )}
      data-testid="related-collection-card"
    >
      {/* Image avec aspect-video - Requirement: 5.4 */}
      <div className="relative aspect-video">
        <Image
          src={collection.coverImage}
          alt={collection.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay - Requirement: 5.4 */}
        <div
          className="absolute inset-0 bg-linear-to-t from-dark via-dark/50 to-transparent"
          data-testid="gradient-overlay"
        />

        {/* Contenu sur l'image - Requirement: 5.3 */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          {/* Label "COLLECTION" - Requirement: 5.3 */}
          <span
            className="text-xs font-semibold uppercase tracking-wider text-gold mb-1"
            data-testid="collection-label"
          >
            Collection
          </span>

          {/* Nom de la collection - Requirement: 5.3 */}
          <h3
            className="text-lg font-semibold text-light mb-2"
            data-testid="collection-name"
          >
            {collection.name}
          </h3>

          {/* Lien "Découvrir →" - Requirement: 5.3 */}
          <span
            className={cn(
              'text-sm text-light-dimmed font-medium',
              'group-hover:text-gold group-hover:underline',
              'transition-colors'
            )}
            data-testid="discover-link"
          >
            Découvrir →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RelatedCollectionCard;
