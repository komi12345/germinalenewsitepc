import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { BookCarousel } from "../book/BookCarousel";

/**
 * Interface pour les props de PopularBooksSection
 */
export interface PopularBooksSectionProps {
  books: Array<{
    id: string;
    title: string;
    slug: string;
    author: string;
    coverImage: string;
    price: number;
  }>;
}

/**
 * PopularBooksSection - Section des livres populaires sur la homepage
 * 
 * Affiche:
 * - Titre "Livres populaires" avec lien "Voir plus" vers /books
 * - Carousel de livres avec navigation
 * 
 * Requirements: 4.1, 6.1, 6.2, 6.3
 */
export function PopularBooksSection({ books }: PopularBooksSectionProps) {
  // Ne pas afficher la section si aucun livre
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-16", "bg-dark-light")}>
      <div className="container mx-auto px-4">
        {/* En-tête de section avec titre et lien "Voir plus" */}
        <div className="flex items-center justify-between mb-8">
          <h2
            className={cn(
              "text-2xl md:text-3xl",
              "font-serif font-semibold",
              "text-gold"
            )}
          >
            Livres populaires
          </h2>
          
          {/* Lien "Voir plus" vers la page Librairie */}
          <Link
            href="/books"
            className={cn(
              "flex items-center gap-2",
              "text-gold hover:text-gold-light",
              "font-medium text-sm md:text-base",
              "transition-colors duration-200",
              "group"
            )}
          >
            <span>Voir plus</span>
            <ArrowRight 
              className={cn(
                "w-4 h-4",
                "transition-transform duration-200",
                "group-hover:translate-x-1"
              )} 
            />
          </Link>
        </div>

        {/* Carousel de livres */}
        <div className="px-6">
          <BookCarousel books={books} />
        </div>
      </div>
    </section>
  );
}

export default PopularBooksSection;
