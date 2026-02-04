/**
 * Property-Based Tests for CollectionsPageContent
 *
 * **Property 1: Search Filter Consistency**
 * **Validates: Requirements 4.5**
 *
 * For any search query entered by the user, all displayed collections SHALL have names
 * that contain the search query (case-insensitive).
 */

import * as fc from 'fast-check';
import { filterCollectionsBySearch } from '../CollectionsPageContent';
import { Collection } from '../../collection/CollectionListCard';

/**
 * Générateur de collections aléatoires pour les tests
 */
const collectionArbitrary = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 100 }),
  slug: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string({ minLength: 0, maxLength: 500 }),
  coverImage: fc.constant('/images/placeholder-collection.svg'),
  price: fc.integer({ min: 1000, max: 100000 }),
  bookCount: fc.integer({ min: 1, max: 50 }),
  isNew: fc.boolean(),
  isPopular: fc.boolean(),
}) as fc.Arbitrary<Collection>;

/**
 * Générateur de liste de collections
 */
const collectionsArbitrary = fc.array(collectionArbitrary, {
  minLength: 0,
  maxLength: 20,
});

/**
 * Générateur de requêtes de recherche
 */
const searchQueryArbitrary = fc.string({ minLength: 0, maxLength: 50 });

describe('CollectionsPageContent - Property-Based Tests', () => {
  /**
   * Feature: collections-page, Property 1: Search Filter Consistency
   *
   * For any search query entered by the user, all displayed collections SHALL have names
   * that contain the search query (case-insensitive).
   *
   * **Validates: Requirements 4.5**
   */
  it('should filter collections so all results contain the search query in name (case-insensitive)', () => {
    fc.assert(
      fc.property(
        collectionsArbitrary,
        searchQueryArbitrary,
        (collections, searchQuery) => {
          const filteredCollections = filterCollectionsBySearch(
            collections,
            searchQuery
          );

          // Property: All filtered collections SHALL contain the search query in their name
          const normalizedQuery = searchQuery.toLowerCase().trim();

          // If search query is empty or whitespace, all collections should be returned
          if (!normalizedQuery) {
            expect(filteredCollections).toEqual(collections);
            return true;
          }

          // For non-empty queries, all results must contain the query
          filteredCollections.forEach(collection => {
            const normalizedName = collection.name.toLowerCase();
            expect(normalizedName).toContain(normalizedQuery);
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: collections-page, Property 1: Search Filter Consistency
   *
   * Verifies that filtering is case-insensitive
   *
   * **Validates: Requirements 4.5**
   */
  it('should filter case-insensitively: same results for different cases of same query', () => {
    fc.assert(
      fc.property(
        collectionsArbitrary,
        fc.string({ minLength: 1, maxLength: 20 }), // Non-empty search query
        (collections, searchQuery) => {
          const lowerCaseResults = filterCollectionsBySearch(
            collections,
            searchQuery.toLowerCase()
          );
          const upperCaseResults = filterCollectionsBySearch(
            collections,
            searchQuery.toUpperCase()
          );
          const mixedCaseResults = filterCollectionsBySearch(
            collections,
            searchQuery
          );

          // Property: Case variations of the same query SHALL return the same results
          expect(lowerCaseResults).toEqual(upperCaseResults);
          expect(lowerCaseResults).toEqual(mixedCaseResults);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: collections-page, Property 1: Search Filter Consistency
   *
   * Verifies that filtered results are a subset of original collections
   *
   * **Validates: Requirements 4.5**
   */
  it('should return a subset of original collections', () => {
    fc.assert(
      fc.property(
        collectionsArbitrary,
        searchQueryArbitrary,
        (collections, searchQuery) => {
          const filteredCollections = filterCollectionsBySearch(
            collections,
            searchQuery
          );

          // Property: Filtered results SHALL be a subset of original collections
          expect(filteredCollections.length).toBeLessThanOrEqual(
            collections.length
          );

          // Property: All filtered collections SHALL exist in original list
          filteredCollections.forEach(filtered => {
            const existsInOriginal = collections.some(
              c => c.id === filtered.id
            );
            expect(existsInOriginal).toBe(true);
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: collections-page, Property 1: Search Filter Consistency
   *
   * Verifies that no matching collections are excluded
   *
   * **Validates: Requirements 4.5**
   */
  it('should not exclude any collection that matches the search query', () => {
    fc.assert(
      fc.property(
        collectionsArbitrary,
        searchQueryArbitrary,
        (collections, searchQuery) => {
          const filteredCollections = filterCollectionsBySearch(
            collections,
            searchQuery
          );
          const normalizedQuery = searchQuery.toLowerCase().trim();

          // If query is empty, all should be included
          if (!normalizedQuery) {
            expect(filteredCollections.length).toBe(collections.length);
            return true;
          }

          // Property: No collection that matches SHALL be excluded
          collections.forEach(collection => {
            const normalizedName = collection.name.toLowerCase();
            const shouldBeIncluded = normalizedName.includes(normalizedQuery);
            const isIncluded = filteredCollections.some(
              c => c.id === collection.id
            );

            if (shouldBeIncluded) {
              expect(isIncluded).toBe(true);
            }
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Unit tests for edge cases
   */
  describe('Edge cases', () => {
    const sampleCollections: Collection[] = [
      {
        id: '1',
        name: 'Littérature Classique',
        slug: 'litterature-classique',
        description: 'Les grands classiques',
        coverImage: '/images/placeholder-collection.svg',
        price: 12500,
        bookCount: 15,
      },
      {
        id: '2',
        name: 'Poésie Contemporaine',
        slug: 'poesie-contemporaine',
        description: 'Poèmes modernes',
        coverImage: '/images/placeholder-collection.svg',
        price: 8500,
        bookCount: 12,
      },
    ];

    it('should return all collections for empty search query', () => {
      const result = filterCollectionsBySearch(sampleCollections, '');
      expect(result).toEqual(sampleCollections);
    });

    it('should return all collections for whitespace-only search query', () => {
      const result = filterCollectionsBySearch(sampleCollections, '   ');
      expect(result).toEqual(sampleCollections);
    });

    it('should return empty array when no collections match', () => {
      const result = filterCollectionsBySearch(sampleCollections, 'xyz123');
      expect(result).toEqual([]);
    });

    it('should find partial matches', () => {
      const result = filterCollectionsBySearch(sampleCollections, 'class');
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Littérature Classique');
    });

    it('should handle empty collections array', () => {
      const result = filterCollectionsBySearch([], 'test');
      expect(result).toEqual([]);
    });
  });
});
