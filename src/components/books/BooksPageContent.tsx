"use client";

/**
 * BooksPageContent - Contenu principal de la page Librairie
 * 
 * Client Component qui gère:
 * - État de recherche et filtres
 * - Filtrage des livres par titre/auteur
 * - Pagination (6 livres par page)
 * - Reset de la pagination lors des changements de filtres
 * 
 * Requirements: 2.7, 2.8, 3.1, 3.2, 3.3, 3.4, 3.5
 */

import { useState, useMemo, useCallback } from "react";
import { BookExtended } from "../../lib/mockData";
import { BooksSearchAndFilters } from "./BooksSearchAndFilters";
import { LibraryBookCard } from "./LibraryBookCard";
import { Pagination } from "../ui/Pagination";
import { cn } from "../../lib/utils";

/**
 * Nombre de livres par page
 */
const BOOKS_PER_PAGE = 6;

/**
 * Props pour BooksPageContent
 */
export interface BooksPageContentProps {
  initialBooks: BookExtended[];
}

/**
 * Filtre les livres par recherche (titre ou auteur, insensible à la casse)
 * 
 * @param books - Liste des livres à filtrer
 * @param query - Terme de recherche
 * @returns Livres correspondant à la recherche
 */
export function filterBooksBySearch(
  books: BookExtended[],
  query: string
): BookExtended[] {
  if (!query.trim()) {
    return books;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(normalizedQuery);
    const authorMatch = book.author.toLowerCase().includes(normalizedQuery);
    return titleMatch || authorMatch;
  });
}

/**
 * Filtre les livres par genre
 */
export function filterBooksByGenre(
  books: BookExtended[],
  genre: string
): BookExtended[] {
  if (genre === "all") {
    return books;
  }
  
  const genreMap: Record<string, string> = {
    "litterature": "LITTÉRATURE",
    "poesie": "POÉSIE",
    "essai-historique": "ESSAI HISTORIQUE",
    "roman": "ROMAN",
    "science-fiction": "SCIENCE-FICTION",
    "biographie": "BIOGRAPHIE",
  };
  
  const targetCategory = genreMap[genre];
  if (!targetCategory) {
    return books;
  }
  
  return books.filter((book) => book.category === targetCategory);
}

/**
 * Filtre les livres par plage de prix
 */
export function filterBooksByPrice(
  books: BookExtended[],
  priceRange: string
): BookExtended[] {
  if (priceRange === "all") {
    return books;
  }
  
  switch (priceRange) {
    case "0-3000":
      return books.filter((book) => book.price < 3000);
    case "3000-5000":
      return books.filter((book) => book.price >= 3000 && book.price <= 5000);
    case "5000-10000":
      return books.filter((book) => book.price > 5000 && book.price <= 10000);
    case "10000+":
      return books.filter((book) => book.price > 10000);
    default:
      return books;
  }
}

/**
 * Trie les livres selon le critère sélectionné
 */
export function sortBooks(
  books: BookExtended[],
  sortBy: string
): BookExtended[] {
  const sorted = [...books];
  
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title, "fr"));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title, "fr"));
    case "oldest":
      return sorted.reverse();
    case "newest":
    default:
      return sorted;
  }
}

/**
 * Pagine les livres
 * 
 * @param books - Liste des livres
 * @param page - Numéro de page (1-indexed)
 * @param perPage - Nombre de livres par page
 * @returns Livres pour la page demandée
 */
export function paginateBooks(
  books: BookExtended[],
  page: number,
  perPage: number
): BookExtended[] {
  const startIndex = (page - 1) * perPage;
  return books.slice(startIndex, startIndex + perPage);
}

/**
 * BooksPageContent - Composant principal
 */
export function BooksPageContent({ initialBooks }: BooksPageContentProps) {
  // États pour la recherche et les filtres
  const [searchValue, setSearchValue] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage et tri des livres
  const filteredBooks = useMemo(() => {
    let result = filterBooksBySearch(initialBooks, searchValue);
    result = filterBooksByGenre(result, selectedGenre);
    result = filterBooksByPrice(result, selectedPrice);
    result = sortBooks(result, selectedSort);
    return result;
  }, [initialBooks, searchValue, selectedGenre, selectedPrice, selectedSort]);

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const paginatedBooks = useMemo(() => {
    return paginateBooks(filteredBooks, currentPage, BOOKS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  // Handlers avec reset de pagination
  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  }, []);

  const handleGenreChange = useCallback((value: string) => {
    setSelectedGenre(value);
    setCurrentPage(1);
  }, []);

  const handleAuthorChange = useCallback((value: string) => {
    setSelectedAuthor(value);
    setCurrentPage(1);
  }, []);

  const handlePriceChange = useCallback((value: string) => {
    setSelectedPrice(value);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSelectedSort(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll vers le haut de la grille
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div data-testid="books-page-content">
      {/* Barre de recherche et filtres */}
      <BooksSearchAndFilters
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
        selectedAuthor={selectedAuthor}
        onAuthorChange={handleAuthorChange}
        selectedPrice={selectedPrice}
        onPriceChange={handlePriceChange}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />

      {/* Grille de livres ou état vide */}
      {paginatedBooks.length > 0 ? (
        <div
          className={cn(
            "grid gap-6",
            "grid-cols-1",
            "sm:grid-cols-2",
            "lg:grid-cols-3"
          )}
          data-testid="books-grid"
        >
          {paginatedBooks.map((book) => (
            <LibraryBookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            "py-16 px-4",
            "text-center"
          )}
          data-testid="books-empty-state"
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-light mb-2">
            Aucun livre trouvé
          </h3>
          <p className="text-light-dimmed max-w-md">
            Aucun livre ne correspond à vos critères de recherche. 
            Essayez de modifier vos filtres ou votre recherche.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default BooksPageContent;
