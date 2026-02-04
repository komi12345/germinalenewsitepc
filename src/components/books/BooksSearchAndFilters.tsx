'use client';

import { Search, ChevronDown, ArrowUpDown } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Options pour le filtre Genre
 */
export const genreOptions = [
  { value: 'all', label: 'Genre' },
  { value: 'litterature', label: 'Littérature' },
  { value: 'poesie', label: 'Poésie' },
  { value: 'essai-historique', label: 'Essai Historique' },
  { value: 'roman', label: 'Roman' },
  { value: 'science-fiction', label: 'Science-Fiction' },
  { value: 'biographie', label: 'Biographie' },
];

/**
 * Options pour le filtre Auteur
 */
export const authorOptions = [
  { value: 'all', label: 'Auteur' },
  { value: 'jean-paul-dubois', label: 'Jean-Paul Dubois' },
  { value: 'aminata-diallo', label: 'Aminata Diallo' },
  { value: 'kofi-mensah', label: 'Kofi Mensah' },
  { value: 'fatou-ndiaye', label: 'Fatou Ndiaye' },
  { value: 'moussa-traore', label: 'Moussa Traoré' },
];

/**
 * Options pour le filtre Prix
 */
export const priceOptions = [
  { value: 'all', label: 'Prix' },
  { value: '0-3000', label: 'Moins de 3 000 FCFA' },
  { value: '3000-5000', label: '3 000 - 5 000 FCFA' },
  { value: '5000-10000', label: '5 000 - 10 000 FCFA' },
  { value: '10000+', label: 'Plus de 10 000 FCFA' },
];

/**
 * Options pour le tri
 */
export const sortOptions = [
  { value: 'newest', label: 'Trier par' },
  { value: 'oldest', label: 'Plus anciens' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'title-asc', label: 'Titre A-Z' },
  { value: 'title-desc', label: 'Titre Z-A' },
];

/**
 * Interface pour les props du BooksSearchAndFilters
 */
export interface BooksSearchAndFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedGenre: string;
  onGenreChange: (value: string) => void;
  selectedAuthor: string;
  onAuthorChange: (value: string) => void;
  selectedPrice: string;
  onPriceChange: (value: string) => void;
  selectedSort: string;
  onSortChange: (value: string) => void;
}

/**
 * Interface pour les options de filtre
 */
interface FilterOption {
  value: string;
  label: string;
}

/**
 * Props pour le composant FilterDropdown
 */
interface FilterDropdownProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  testId?: string;
  icon?: 'chevron' | 'sort';
}

/**
 * FilterDropdown - Composant dropdown pour les filtres
 *
 * Design adapté à l'image: fond blanc avec bordure, texte gris foncé
 * Utilise un select natif pour l'accessibilité
 */
function FilterDropdown({
  label,
  value,
  options,
  onChange,
  testId,
  icon = 'chevron',
}: FilterDropdownProps) {
  const IconComponent = icon === 'sort' ? ArrowUpDown : ChevronDown;

  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={cn(
          'appearance-none',
          'bg-white text-gray-700',
          'px-4 py-2.5 pr-10',
          'rounded-lg',
          'text-sm font-medium',
          'cursor-pointer',
          'border border-gray-200',
          'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent',
          'transition-colors duration-200',
          'hover:border-gray-300',
          'w-full sm:w-auto',
          'min-w-[120px]'
        )}
        data-testid={testId}
        aria-label={label}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <IconComponent
        className={cn(
          'absolute right-3 top-1/2 -translate-y-1/2',
          'w-4 h-4 text-gray-500',
          'pointer-events-none'
        )}
        aria-hidden="true"
      />
    </div>
  );
}

/**
 * BooksSearchAndFilters - Barre de recherche avec filtres dropdown pour la page Librairie
 *
 * Composant client qui permet:
 * - Recherche par titre, auteur ou ISBN
 * - Filtrage par genre
 * - Filtrage par auteur
 * - Filtrage par prix
 * - Tri par différents critères
 *
 * Design adapté à l'image de référence:
 * - Search input avec fond blanc, bordure grise, icône à gauche
 * - Filter dropdowns: fond blanc, bordure grise, texte gris foncé
 * - Responsive: stack vertical sur mobile
 *
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 7.2
 */
export function BooksSearchAndFilters({
  searchValue,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  selectedAuthor,
  onAuthorChange,
  selectedPrice,
  onPriceChange,
  selectedSort,
  onSortChange,
}: BooksSearchAndFiltersProps) {
  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row',
        'gap-4 lg:gap-3',
        'items-stretch lg:items-center',
        'w-full',
        'mb-8'
      )}
      data-testid="books-search-and-filters"
    >
      {/* Champ de recherche */}
      <div className="relative flex-1 lg:max-w-sm">
        <Search
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2',
            'w-5 h-5 text-gray-400',
            'pointer-events-none'
          )}
          aria-hidden="true"
        />
        <input
          type="text"
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Titre, auteur, ISBN..."
          className={cn(
            'w-full h-11',
            'pl-10 pr-4',
            'bg-white border border-gray-200 rounded-lg',
            'text-sm text-gray-900',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent',
            'transition-colors duration-200'
          )}
          data-testid="books-search-input"
          aria-label="Rechercher un livre par titre, auteur ou ISBN"
        />
      </div>

      {/* Filtres dropdown */}
      <div
        className={cn(
          'flex flex-col sm:flex-row',
          'gap-3',
          'w-full lg:w-auto',
          'flex-wrap'
        )}
      >
        {/* Filtre Genre */}
        <FilterDropdown
          label="Genre"
          value={selectedGenre}
          options={genreOptions}
          onChange={onGenreChange}
          testId="books-filter-genre"
        />

        {/* Filtre Auteur */}
        <FilterDropdown
          label="Auteur"
          value={selectedAuthor}
          options={authorOptions}
          onChange={onAuthorChange}
          testId="books-filter-author"
        />

        {/* Filtre Prix */}
        <FilterDropdown
          label="Prix"
          value={selectedPrice}
          options={priceOptions}
          onChange={onPriceChange}
          testId="books-filter-price"
        />

        {/* Trier par - avec icône sort */}
        <FilterDropdown
          label="Trier par"
          value={selectedSort}
          options={sortOptions}
          onChange={onSortChange}
          testId="books-filter-sort"
          icon="sort"
        />
      </div>
    </div>
  );
}

export default BooksSearchAndFilters;
