import Link from "next/link";
import Image from "next/image";
import { cn, formatPrice } from "../../lib/utils";
import { Book } from "../../lib/mockData";

/**
 * Interface pour les props du CollectionBookCard
 */
export interface CollectionBookCardProps {
  book: Book;
}

/**
 * CollectionBookCard - Composant carte pour afficher un livre dans une collection
 * 
 * Affiche un livre avec:
 * - Image de couverture aspect-[3/4] avec rounded-xl
 * - Titre du livre
 * - Nom de l'auteur en gris
 * - Prix formaté en FCFA
 * - Lien "Acheter seul" aligné à droite
 * 
 * Requirements: 4.5, 4.6
 */
export function CollectionBookCard({ book }: CollectionBookCardProps) {
  return (
    <div className="group" data-testid="collection-book-card">
      {/* Image de couverture */}
      <div className="relative aspect-3/4 overflow-hidden rounded-xl">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className={cn(
            "object-cover",
            "transition-transform duration-300",
            "group-hover:scale-105"
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          data-testid="book-cover-image"
        />
      </div>

      {/* Informations du livre */}
      <div className="mt-3">
        {/* Titre du livre */}
        <h3
          className={cn(
            "font-medium",
            "text-gold",
            "line-clamp-2"
          )}
          data-testid="book-title"
        >
          {book.title}
        </h3>

        {/* Nom de l'auteur */}
        <p 
          className="text-sm text-light-dimmed mt-1"
          data-testid="book-author"
        >
          {book.author}
        </p>

        {/* Prix et lien Acheter seul */}
        <div className="flex items-center justify-between mt-2">
          <span 
            className="font-medium text-light"
            data-testid="book-price"
          >
            {formatPrice(book.price)}
          </span>
          <Link
            href={`/books/${book.slug}`}
            className={cn(
              "text-sm text-light-dimmed",
              "hover:text-gold",
              "transition-colors"
            )}
            data-testid="buy-alone-link"
          >
            Acheter seul
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CollectionBookCard;
