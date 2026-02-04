'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Calcule les numéros de page à afficher avec ellipsis
 * Retourne un tableau de numéros de page ou null pour ellipsis
 */
export function getVisiblePages(
  currentPage: number,
  totalPages: number
): (number | null)[] {
  // Si peu de pages, afficher toutes
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | null)[] = [];

  // Toujours afficher la première page
  pages.push(1);

  // Calculer la plage autour de la page courante
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  // Ajouter ellipsis si nécessaire avant la plage
  if (start > 2) {
    pages.push(null);
  }

  // Ajouter les pages de la plage
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Ajouter ellipsis si nécessaire après la plage
  if (end < totalPages - 1) {
    pages.push(null);
  }

  // Toujours afficher la dernière page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Calcule la page suivante en respectant les bornes
 * Retourne une valeur entre 1 et totalPages inclus
 */
export function getNextPage(currentPage: number, totalPages: number): number {
  return Math.min(currentPage + 1, totalPages);
}

/**
 * Calcule la page précédente en respectant les bornes
 * Retourne une valeur entre 1 et totalPages inclus
 */
export function getPreviousPage(currentPage: number): number {
  return Math.max(currentPage - 1, 1);
}

/**
 * Vérifie si une page est dans les bornes valides
 */
export function isValidPage(page: number, totalPages: number): boolean {
  return page >= 1 && page <= totalPages && Number.isInteger(page);
}

/**
 * Composant Pagination
 * Affiche les contrôles de navigation entre pages avec flèches et numéros
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 8.1
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  // Ne pas afficher si une seule page ou moins
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(getPreviousPage(currentPage));
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(getNextPage(currentPage, totalPages));
    }
  };

  const handlePageClick = (page: number) => {
    if (isValidPage(page, totalPages) && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex justify-center items-center gap-2', className)}
    >
      {/* Bouton précédent */}
      <button
        onClick={handlePrevious}
        disabled={isFirstPage}
        aria-label="Page précédente"
        className={cn(
          'w-10 h-10 flex items-center justify-center rounded-lg border transition-colors',
          isFirstPage
            ? 'bg-dark-lighter text-light-dimmed cursor-not-allowed border-dark-lighter'
            : 'bg-dark-light text-light hover:bg-dark-lighter hover:text-gold border-dark-lighter'
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Numéros de page */}
      {visiblePages.map((page, index) => {
        if (page === null) {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-light-dimmed"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            aria-label={`Page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-lg border transition-colors font-medium',
              isActive
                ? 'bg-gold text-dark border-gold'
                : 'bg-dark-light text-light hover:bg-dark-lighter hover:text-gold border-dark-lighter'
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Bouton suivant */}
      <button
        onClick={handleNext}
        disabled={isLastPage}
        aria-label="Page suivante"
        className={cn(
          'w-10 h-10 flex items-center justify-center rounded-lg border transition-colors',
          isLastPage
            ? 'bg-dark-lighter text-light-dimmed cursor-not-allowed border-dark-lighter'
            : 'bg-dark-light text-light hover:bg-dark-lighter hover:text-gold border-dark-lighter'
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
