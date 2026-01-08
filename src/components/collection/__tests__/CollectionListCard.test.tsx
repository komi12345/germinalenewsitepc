/**
 * Property-Based Tests for CollectionListCard
 * 
 * **Property 4: Badge Display Logic**
 * **Validates: Requirements 5.4, 5.5**
 * 
 * For any collection:
 * - If isNew is true, the "Nouveau" badge SHALL be displayed
 * - If isPopular is true, the "Populaire" badge SHALL be displayed
 * - Both badges SHALL never appear simultaneously on the same card
 */

import * as fc from 'fast-check';
import { render, cleanup, screen } from '@testing-library/react';
import { CollectionListCard, getBadgeType } from '../CollectionListCard';

// Generator for valid collection data
const collectionArbitrary = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 2, maxLength: 100 })
    .filter(s => s.trim().length >= 2),
  slug: fc.string({ minLength: 1, maxLength: 50 })
    .filter(s => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)),
  description: fc.string({ minLength: 10, maxLength: 500 })
    .filter(s => s.trim().length >= 10),
  coverImage: fc.constantFrom(
    '/images/placeholder-collection.svg',
    '/images/hero-library.jpg'
  ),
  price: fc.integer({ min: 1000, max: 100000 }),
  bookCount: fc.integer({ min: 1, max: 50 }),
  isNew: fc.boolean(),
  isPopular: fc.boolean(),
});

describe('CollectionListCard - Property-Based Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: collections-page, Property 4: Badge Display Logic
   * 
   * For any collection, if isNew is true, the "Nouveau" badge SHALL be displayed;
   * if isPopular is true, the "Populaire" badge SHALL be displayed;
   * both badges SHALL never appear simultaneously on the same card.
   * 
   * **Validates: Requirements 5.4, 5.5**
   */
  it('should display correct badge based on isNew and isPopular flags, never both', () => {
    fc.assert(
      fc.property(collectionArbitrary, (collection) => {
        cleanup();
        
        render(<CollectionListCard collection={collection} />);

        const nouveauBadge = screen.queryByTestId('badge-new');
        const populaireBadge = screen.queryByTestId('badge-popular');

        // Property: Both badges SHALL never appear simultaneously
        const bothBadgesPresent = nouveauBadge !== null && populaireBadge !== null;
        expect(bothBadgesPresent).toBe(false);

        // Property: If isNew is true, "Nouveau" badge SHALL be displayed
        if (collection.isNew) {
          expect(nouveauBadge).not.toBeNull();
          expect(nouveauBadge?.textContent).toBe('Nouveau');
          expect(populaireBadge).toBeNull();
        }
        // Property: If isPopular is true (and isNew is false), "Populaire" badge SHALL be displayed
        else if (collection.isPopular) {
          expect(populaireBadge).not.toBeNull();
          expect(populaireBadge?.textContent).toBe('Populaire');
          expect(nouveauBadge).toBeNull();
        }
        // Property: If neither flag is true, no badge should be displayed
        else {
          expect(nouveauBadge).toBeNull();
          expect(populaireBadge).toBeNull();
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Unit test for getBadgeType helper function
   * Tests the badge priority logic: isNew takes precedence over isPopular
   */
  describe('getBadgeType helper function', () => {
    it('should return "new" when isNew is true', () => {
      expect(getBadgeType(true, false)).toBe('new');
      expect(getBadgeType(true, true)).toBe('new'); // isNew takes priority
    });

    it('should return "popular" when isPopular is true and isNew is false', () => {
      expect(getBadgeType(false, true)).toBe('popular');
    });

    it('should return null when both flags are false or undefined', () => {
      expect(getBadgeType(false, false)).toBeNull();
      expect(getBadgeType(undefined, undefined)).toBeNull();
      expect(getBadgeType(undefined, false)).toBeNull();
      expect(getBadgeType(false, undefined)).toBeNull();
    });
  });
});
