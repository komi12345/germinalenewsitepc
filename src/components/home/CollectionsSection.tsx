import Link from "next/link";
import { cn } from "../../lib/utils";
import { CollectionCard, CollectionCardProps } from "../collection/CollectionCard";
import { ArrowRight } from "lucide-react";

/**
 * Interface pour les props de CollectionsSection
 */
export interface CollectionsSectionProps {
  collections: CollectionCardProps["collection"][];
}

/**
 * CollectionsSection - Section "Collections à la une" de la homepage
 * 
 * Affiche:
 * - Titre "Collections à la une"
 * - Lien "Voir tout" vers /collections
 * - Grid 4 colonnes desktop, 2 tablette, 1 mobile
 * - Exactement 4 collections maximum
 * 
 * Requirements: 3.1, 3.2, 3.3, 8.2
 */
export function CollectionsSection({ collections }: CollectionsSectionProps) {
  // Limiter à 4 collections maximum
  const displayedCollections = collections.slice(0, 4);

  return (
    <section className="py-16 px-4 bg-dark">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="flex items-center justify-between mb-10">
          {/* Titre */}
          <h2
            className={cn(
              "text-2xl md:text-3xl",
              "font-serif font-bold",
              "text-gold"
            )}
          >
            Collections à la une
          </h2>

          {/* Lien "Voir tout" */}
          <Link
            href="/collections"
            className={cn(
              "inline-flex items-center gap-1",
              "text-light font-medium",
              "hover:text-gold",
              "transition-colors duration-200"
            )}
          >
            Voir tout
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid de collections */}
        <div
          className={cn(
            "grid gap-6",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {displayedCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>

        {/* Message si aucune collection */}
        {displayedCollections.length === 0 && (
          <p className="text-center text-light-dimmed py-8">
            Aucune collection disponible pour le moment.
          </p>
        )}
      </div>
    </section>
  );
}

export default CollectionsSection;
