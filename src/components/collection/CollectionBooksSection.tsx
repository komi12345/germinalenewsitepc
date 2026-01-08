import Link from "next/link";
import { cn } from "../../lib/utils";
import { Book } from "../../lib/mockData";
import { CollectionBookCard } from "./CollectionBookCard";

/**
 * Interface pour les props du CollectionBooksSection
 */
export interface CollectionBooksSectionProps {
  books: Book[];
  bookCount: number;
}

/**
 * CollectionBooksSection - Section affichant les livres d'une collection
 * 
 * Affiche:
 * - Titre "Les livres de la collection"
 * - Sous-titre avec compteur de livres "[N] chefs-d'œuvre inclus dans ce coffret"
 * - Lien "Voir tous les détails →" aligné à droite
 * - Grille responsive de CollectionBookCard (1 col mobile, 2 tablet, 4 desktop)
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */
export function CollectionBooksSection({ books, bookCount }: CollectionBooksSectionProps) {
  return (
    <section className="py-16 bg-dark" data-testid="collection-books-section">
      {/* En-tête de la section */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          {/* Titre de la section */}
          <h2 
            className={cn(
              "text-2xl md:text-3xl",
              "font-serif font-bold",
              "text-gold"
            )}
            data-testid="section-title"
          >
            Les livres de la collection
          </h2>
          
          {/* Sous-titre avec compteur de livres */}
          <p 
            className="text-light-dimmed mt-2"
            data-testid="book-count-subtitle"
          >
            {bookCount} chefs-d&apos;œuvre inclus dans ce coffret
          </p>
        </div>

        {/* Lien "Voir tous les détails" */}
        <Link
          href="#"
          className={cn(
            "text-light",
            "hover:text-gold",
            "transition-colors",
            "mt-4 sm:mt-0",
            "inline-flex items-center gap-1"
          )}
          data-testid="view-details-link"
        >
          Voir tous les détails
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Grille de livres - responsive: 1 col mobile, 2 tablet, 4 desktop */}
      <div 
        className={cn(
          "grid",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          "gap-6"
        )}
        data-testid="books-grid"
      >
        {books.map((book) => (
          <CollectionBookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

export default CollectionBooksSection;
