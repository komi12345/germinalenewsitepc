"use client";

import { useState, useMemo } from "react";
import { CollectionListCard, Collection } from "../collection/CollectionListCard";
import { SearchAndFilters } from "./SearchAndFilters";
import { Pagination } from "../ui/Pagination";
import { cn } from "../../lib/utils";

/**
 * Nombre de collections par page
 */
const COLLECTIONS_PER_PAGE = 6;

/**
 * Interface pour les props du CollectionsPageContent
 */
export interface CollectionsPageContentProps {
  initialCollections: Collection[];
}

/**
 * Filtre les collections par nom (recherche case-insensitive)
 * Property 1: Search Filter Consistency
 * Pour toute requête de recherche, toutes les collections affichées
 * doivent avoir un nom contenant la requête (case-insensitive)
 * 
 * @param collections - Liste des collections à filtrer
 * @param searchQuery - Requête de recherche
 * @returns Collections filtrées
 */
export function filterCollectionsBySearch(
  collections: Collection[],
  searchQuery: string
): Collection[] {
  if (!searchQuery.trim()) {
    return collections;
  }
  
  const normalizedQuery = searchQuery.toLowerCase().trim();
  return collections.filter((collection) =>
    collection.name.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Calcule le nombre total de pages
 * 
 * @param totalItems - Nombre total d'éléments
 * @param itemsPerPage - Nombre d'éléments par page
 * @returns Nombre total de pages
 */
export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.max(1, Math.ceil(totalItems / itemsPerPage));
}

/**
 * Pagine une liste de collections
 * 
 * @param collections - Liste des collections
 * @param currentPage - Page courante (1-indexed)
 * @param itemsPerPage - Nombre d'éléments par page
 * @returns Collections pour la page courante
 */
export function paginateCollections(
  collections: Collection[],
  currentPage: number,
  itemsPerPage: number
): Collection[] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return collections.slice(startIndex, startIndex + itemsPerPage);
}

/**
 * CollectionsPageContent - Composant client principal pour la page Collections
 * 
 * Gère:
 * - État de la recherche
 * - État des filtres (genre, tri, prix)
 * - État de la pagination
 * - Filtrage des collections par recherche
 * - Affichage en grille responsive (1/2/3 colonnes)
 * 
 * Requirements: 4.5, 5.1, 5.2, 5.3, 9.1, 9.3
 */
export function CollectionsPageContent({
  initialCollections,
}: CollectionsPageContentProps) {
  // État de la recherche
  const [searchValue, setSearchValue] = useState("");
  
  // État des filtres
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedPrice, setSelectedPrice] = useState("all");
  
  // État de la pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrer les collections par recherche
  // Property 1: Search Filter Consistency - toutes les collections affichées
  // contiennent la requête de recherche dans leur nom
  const filteredCollections = useMemo(() => {
    return filterCollectionsBySearch(initialCollections, searchValue);
  }, [initialCollections, searchValue]);

  // Calculer le nombre total de pages
  const totalPages = useMemo(() => {
    return calculateTotalPages(filteredCollections.length, COLLECTIONS_PER_PAGE);
  }, [filteredCollections.length]);

  // Paginer les collections
  const paginatedCollections = useMemo(() => {
    return paginateCollections(filteredCollections, currentPage, COLLECTIONS_PER_PAGE);
  }, [filteredCollections, currentPage]);

  // Réinitialiser la page lors d'un changement de recherche
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1); // Retour à la première page
  };

  // Gestionnaires de changement de filtres
  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
    setCurrentPage(1);
  };

  // Gestionnaire de changement de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll vers le haut de la grille
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8" data-testid="collections-page-content">
      {/* Barre de recherche et filtres */}
      <SearchAndFilters
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
        selectedPrice={selectedPrice}
        onPriceChange={handlePriceChange}
      />

      {/* Grille de collections - Requirements 5.1, 5.2, 5.3, 9.3 */}
      {paginatedCollections.length > 0 ? (
        <div
          className={cn(
            "grid gap-6",
            // 1 colonne mobile (< 640px) - Requirement 5.3
            "grid-cols-1",
            // 2 colonnes tablette (640px - 1024px) - Requirement 5.2
            "sm:grid-cols-2",
            // 3 colonnes desktop (> 1024px) - Requirement 5.1
            "lg:grid-cols-3"
          )}
          data-testid="collections-grid"
        >
          {paginatedCollections.map((collection) => (
            <CollectionListCard key={collection.id} collection={collection} />
          ))}
        </div>
      ) : (
        // État vide - aucune collection trouvée
        <div
          className="text-center py-16"
          data-testid="empty-state"
        >
          <p className="text-light-dimmed text-lg mb-4">
            Aucune collection trouvée
          </p>
          <p className="text-light-dimmed/70 text-sm">
            Essayez de modifier votre recherche ou vos filtres
          </p>
        </div>
      )}

      {/* Pagination - Requirements 7.1-7.6 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="mt-12"
      />
    </div>
  );
}

export default CollectionsPageContent;
