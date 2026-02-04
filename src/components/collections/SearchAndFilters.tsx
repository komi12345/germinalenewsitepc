'use client';

import { Search, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Options pour le filtre Genre
 */
export const genreOptions = [
  { value: 'all', label: 'Tous les genres' },
  { value: 'litterature', label: 'Littérature' },
  { value: 'poesie', label: 'Poésie' },
  { value: 'histoire', label: 'Histoire' },
  { value: 'romans', label: 'Romans' },
  { value: 'science-fiction', label: 'Science-Fiction' },
  { value: 'biographies', label: 'Biographies' },
];

/**
 * Options pour le filtre Trier par
 */
export const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'oldest', label: 'Plus anciens' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name-asc', label: 'A-Z' },
  { value: 'name-desc', label: 'Z-A' },
];

/**
 * Options pour le filtre Prix
 */
export const priceOptions = [
  { value: 'all', label: 'Tous les prix' },
  { value: '0-3000', label: 'Moins de 3 000 FCFA' },
  { value: '3000-5000', label: '3 000 - 5 000 FCFA' },
  { value: '5000-10000', label: '5 000 - 10 000 FCFA' },
  { value: '10000+', label: 'Plus de 10 000 FCFA' },
];

/**
 * Interface pour les props du SearchAndFilters
 */
export interface SearchAndFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedGenre: string;
  onGenreChange: (value: string) => void;
  selectedSort: string;
  onSortChange: (value: string) => void;
  selectedPrice: string;
  onPriceChange: (value: string) => void;
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
}

/**
 * FilterDropdown - Composant dropdown pour les filtres
 *
 * Affiche un bouton avec fond or (#D4AF37) et icône chevron
 * Utilise un select natif pour l'accessibilité
 */
function FilterDropdown({
  label,
  value,
  options,
  onChange,
  testId,
}: FilterDropdownProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={cn(
          'appearance-none',
          'bg-gold text-dark',
          'px-4 py-2.5 pr-10',
          'rounded-lg',
          'text-sm font-medium',
          'cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-gold-light',
          'transition-colors duration-200',
          'hover:bg-gold-light'
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
      <ChevronDown
        className={cn(
          'absolute right-3 top-1/2 -translate-y-1/2',
          'w-4 h-4 text-dark',
          'pointer-events-none'
        )}
        aria-hidden="true"
      />
    </div>
  );
}

/**
 * SearchAndFilters - Barre de recherche avec filtres dropdown
 *
 * Composant client pour la page Collections qui permet:
 * - Recherche par nom de collection
 * - Filtrage par genre
 * - Tri par différents critères
 * - Filtrage par prix
 *
 * Design:
 * - Search input: 300px desktop, 100% mobile, height 44px
 * - Filter dropdowns: fond vert (#2C5F4F), texte blanc
 * - Responsive: stack vertical sur mobile
 *
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.6, 9.2
 */
export function SearchAndFilters({
  searchValue,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  selectedSort,
  onSortChange,
  selectedPrice,
  onPriceChange,
}: SearchAndFiltersProps) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row',
        'gap-4 md:gap-3',
        'items-stretch md:items-center',
        'w-full'
      )}
      data-testid="search-and-filters"
    >
      {/* Champ de recherche */}
      <div className="relative shrink-0 w-full md:w-[300px]">
        <Search
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2',
            'w-5 h-5 text-light-dimmed',
            'pointer-events-none'
          )}
          aria-hidden="true"
        />
        <input
          type="text"
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Rechercher une collection..."
          className={cn(
            'w-full h-11',
            'pl-10 pr-4',
            'bg-dark-light border border-dark-lighter rounded-lg',
            'text-sm text-light',
            'placeholder:text-light-dimmed',
            'focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent',
            'transition-colors duration-200'
          )}
          data-testid="search-input"
          aria-label="Rechercher une collection"
        />
      </div>

      {/* Filtres dropdown */}
      <div
        className={cn('flex flex-col sm:flex-row', 'gap-3', 'w-full md:w-auto')}
      >
        {/* Filtre Genre */}
        <FilterDropdown
          label="Genre"
          value={selectedGenre}
          options={genreOptions}
          onChange={onGenreChange}
          testId="filter-genre"
        />

        {/* Filtre Trier par */}
        <FilterDropdown
          label="Trier par"
          value={selectedSort}
          options={sortOptions}
          onChange={onSortChange}
          testId="filter-sort"
        />

        {/* Filtre Prix */}
        <FilterDropdown
          label="Prix"
          value={selectedPrice}
          options={priceOptions}
          onChange={onPriceChange}
          testId="filter-price"
        />
      </div>
    </div>
  );
}

export default SearchAndFilters;
