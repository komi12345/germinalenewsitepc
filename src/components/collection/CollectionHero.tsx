'use client';

/**
 * CollectionHero - Section héro pour la page détail d'une collection
 *
 * Affiche l'image de la collection, les badges, le titre, la description,
 * les prix avec réduction éventuelle, et les boutons d'action.
 *
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.1, 3.2
 */

import Image from 'next/image';
import { ShoppingCart, Share2, Truck } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

export interface CollectionHeroProps {
  collection: {
    id: string;
    name: string;
    slug: string;
    description: string;
    coverImage: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    isLimited?: boolean;
    bookCount: number;
  };
  onAddToCart: () => void;
  onShare: () => void;
}

export function CollectionHero({
  collection,
  onAddToCart,
  onShare,
}: CollectionHeroProps) {
  const hasDiscount = collection.originalPrice && collection.discountPercent;

  return (
    <section className="py-8 lg:py-12 bg-dark">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image de la collection - Requirements: 2.1, 2.3 */}
        <div className="relative">
          <div className="relative aspect-4/3 lg:aspect-3/4 rounded-2xl overflow-hidden">
            <Image
              src={collection.coverImage}
              alt={collection.name}
              fill
              className="object-cover"
              priority
            />

            {/* Overlay noir pour cohérence */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Badge Édition Limitée sur l'image - Requirement: 2.3 */}
            {collection.isLimited && (
              <div
                className="absolute bottom-4 left-4 bg-gold text-dark px-3 py-1.5 rounded-lg text-sm font-medium"
                data-testid="limited-edition-badge"
              >
                Édition Limitée
              </div>
            )}
          </div>
        </div>

        {/* Contenu - Requirements: 2.2, 2.4, 2.5, 2.6, 2.7, 3.1, 3.2 */}
        <div className="flex flex-col">
          {/* Badge COLLECTION PREMIUM - Requirement: 2.2 */}
          <div className="mb-4">
            <span className="inline-block bg-gold text-dark px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              Collection Premium
            </span>
          </div>

          {/* Titre - Requirement: 2.4 */}
          <h1 className="text-3xl lg:text-4xl font-serif text-gold mb-4">
            {collection.name}
          </h1>

          {/* Description - Requirement: 2.5 */}
          <p className="text-light-dimmed text-base lg:text-lg leading-relaxed mb-6">
            {collection.description}
          </p>

          {/* Prix avec réduction - Requirement: 2.6 */}
          <div
            className="flex items-center gap-3 mb-6"
            data-testid="price-section"
          >
            <span
              className="text-2xl lg:text-3xl font-bold text-gold"
              data-testid="current-price"
            >
              {formatPrice(collection.price)}
            </span>

            {hasDiscount && (
              <>
                <span
                  className="text-lg text-light-dimmed line-through"
                  data-testid="original-price"
                >
                  {formatPrice(collection.originalPrice!)}
                </span>
                <span
                  className="bg-red-900/50 text-red-400 px-2 py-0.5 rounded text-sm font-semibold"
                  data-testid="discount-badge"
                >
                  -{collection.discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Boutons d'action - Requirements: 3.1, 3.2 */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={onAddToCart}
              className="flex items-center justify-center gap-2 bg-gold text-dark px-6 py-3 rounded-lg font-medium hover:bg-gold-light transition-colors"
              data-testid="add-to-cart-button"
            >
              <ShoppingCart className="w-5 h-5" />
              Acheter toute la collection
            </button>

            <button
              onClick={onShare}
              className="flex items-center justify-center gap-2 border border-dark-lighter text-light px-6 py-3 rounded-lg font-medium hover:bg-dark-light hover:text-gold transition-colors"
              data-testid="share-button"
            >
              <Share2 className="w-5 h-5" />
              Partager
            </button>
          </div>

          {/* Message livraison gratuite - Requirement: 2.7 */}
          <div className="flex items-center gap-2 text-light-dimmed text-sm">
            <Truck className="w-5 h-5 text-gold" />
            <span>Livraison gratuite à partir de 25.000 FCFA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CollectionHero;
