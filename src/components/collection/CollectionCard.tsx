import Link from "next/link";
import Image from "next/image";
import { cn, formatPrice } from "../../lib/utils";

/**
 * Interface pour les props du CollectionCard
 */
export interface CollectionCardProps {
  collection: {
    id: string;
    name: string;
    slug: string;
    description: string;
    coverImage: string;
    price: number;
  };
}

/**
 * CollectionCard - Composant carte pour afficher une collection
 * 
 * Affiche une collection avec:
 * - Image de couverture aspect-[4/5]
 * - Nom de la collection en gras
 * - Description courte (line-clamp-2)
 * - Prix en FCFA
 * - Lien "Voir la collection →"
 * - Coins arrondis et shadow au hover
 * 
 * Requirements: 3.4, 3.5, 3.6, 3.7
 */
export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div
      className={cn(
        "group",
        "rounded-2xl overflow-hidden",
        "bg-dark-light",
        "transition-all duration-300",
        "hover:shadow-lg hover:border-gold",
        "border border-transparent"
      )}
    >
      {/* Image de couverture */}
      <Link href={`/collections/${collection.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={collection.coverImage}
            alt={collection.name}
            fill
            className={cn(
              "object-cover",
              "transition-transform duration-300",
              "group-hover:scale-105"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          />
        </div>
      </Link>

      {/* Contenu texte */}
      <div className="p-4">
        {/* Nom de la collection */}
        <h3
          className={cn(
            "font-semibold text-lg",
            "text-gold",
            "mb-2"
          )}
        >
          {collection.name}
        </h3>

        {/* Description courte */}
        <p
          className={cn(
            "text-sm text-light-dimmed",
            "line-clamp-2",
            "mb-4"
          )}
        >
          {collection.description}
        </p>

        {/* Prix et lien */}
        <div className="flex items-center justify-between">
          {/* Prix en FCFA */}
          <span className="font-bold text-base text-gold">
            {formatPrice(collection.price)}
          </span>

          {/* Lien vers la collection */}
          <Link
            href={`/collections/${collection.slug}`}
            className={cn(
              "text-sm text-light",
              "hover:text-gold hover:underline",
              "flex items-center gap-1",
              "transition-colors"
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

export default CollectionCard;
