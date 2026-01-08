"use client";

/**
 * RelatedCollections - Section affichant les collections similaires
 * 
 * Affiche:
 * - Titre "Vous aimerez aussi"
 * - Grille de 3 RelatedCollectionCard
 * - Responsive: 1 colonne mobile, 3 colonnes desktop
 * 
 * Requirements: 5.1, 5.2, 6.4
 */

import { RelatedCollectionCard } from "./RelatedCollectionCard";

export interface RelatedCollectionsProps {
  collections: Array<{
    id: string;
    name: string;
    slug: string;
    coverImage: string;
  }>;
}

export function RelatedCollections({ collections }: RelatedCollectionsProps) {
  // Ne pas afficher la section si aucune collection
  if (!collections || collections.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-dark-light" data-testid="related-collections-section">
      {/* Titre de la section - Requirement: 5.1 */}
      <h2 
        className="text-2xl lg:text-3xl font-serif text-gold mb-8"
        data-testid="section-title"
      >
        Vous aimerez aussi
      </h2>

      {/* Grille de collections - Requirements: 5.2, 6.4 */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        data-testid="collections-grid"
      >
        {collections.slice(0, 3).map((collection) => (
          <RelatedCollectionCard
            key={collection.id}
            collection={collection}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedCollections;
