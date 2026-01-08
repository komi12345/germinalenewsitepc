"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { BookCard } from "./BookCard";

/**
 * Interface pour les props du BookCarousel
 */
export interface BookCarouselProps {
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
 * BookCarousel - Composant carousel pour afficher les livres
 * 
 * Fonctionnalités:
 * - Scroll horizontal avec snap-x
 * - Boutons navigation gauche/droite (bg-dark-light avec icônes gold)
 * - Affiche minimum 5 livres
 * - Responsive: 2 mobile, 3 tablette, 5 desktop
 * 
 * Requirements: 4.2, 4.3, 4.8, 4.9, 5.1
 */
export function BookCarousel({ books }: BookCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Fait défiler le carousel vers la gauche
   */
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  /**
   * Fait défiler le carousel vers la droite
   */
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Bouton navigation gauche */}
      <button
        onClick={scrollLeft}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 z-10",
          "w-10 h-10",
          "bg-dark-light shadow-md rounded-full",
          "border border-dark-lighter",
          "flex items-center justify-center",
          "hover:bg-dark-lighter hover:border-gold transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-gold",
          "-ml-5"
        )}
        aria-label="Défiler vers la gauche"
      >
        <ChevronLeft className="w-6 h-6 text-gold" />
      </button>

      {/* Container de scroll */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex gap-4 overflow-x-auto",
          "snap-x snap-mandatory",
          "scrollbar-hide",
          "px-2 py-2",
          "-mx-2"
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {books.map((book) => (
          <div
            key={book.id}
            className={cn(
              "shrink-0 snap-start",
              // Responsive: 2 mobile, 3 tablette, 5 desktop
              "w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(20%-13px)]"
            )}
          >
            <BookCard book={book} />
          </div>
        ))}
      </div>

      {/* Bouton navigation droite */}
      <button
        onClick={scrollRight}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 z-10",
          "w-10 h-10",
          "bg-dark-light shadow-md rounded-full",
          "border border-dark-lighter",
          "flex items-center justify-center",
          "hover:bg-dark-lighter hover:border-gold transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-gold",
          "-mr-5"
        )}
        aria-label="Défiler vers la droite"
      >
        <ChevronRight className="w-6 h-6 text-gold" />
      </button>
    </div>
  );
}

export default BookCarousel;
