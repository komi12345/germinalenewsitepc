/**
 * Property-Based Tests for LibraryBookCard
 * 
 * Uses fast-check for property-based testing to validate correctness properties
 * across many generated inputs.
 * 
 * Feature: books-library-page
 * Property 5: Badge Display Consistency
 * 
 * **Validates: Requirements 4.8, 4.9**
 */

import * as fc from 'fast-check';
import { render, cleanup } from '@testing-library/react';
import { LibraryBookCard } from '../LibraryBookCard';
import { BookExtended } from '../../../lib/mockData';

/**
 * Arbitrary generator for valid BookExtended objects
 * Generates books with various combinations of isNew and isFeatured flags
 */
const bookExtendedArbitrary = fc.record({
  id: fc.uuid(),
  title: fc.stringMatching(/^[A-Za-z0-9àâäéèêëïîôùûüç\s\-']{3,50}$/)
    .filter(s => s.trim().length >= 3),
  slug: fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    .filter(s => s.length >= 3 && s.length <= 50),
  author: fc.stringMatching(/^[A-Za-z\s\-'àâäéèêëïîôùûüç]{3,50}$/)
    .filter(s => s.trim().length >= 3),
  coverImage: fc.constantFrom(
    '/images/placeholder-book.svg',
    '/images/hero-library.jpg'
  ),
  price: fc.integer({ min: 100, max: 100000 }),
  category: fc.constantFrom(
    'LITTÉRATURE',
    'POÉSIE',
    'ESSAI HISTORIQUE',
    'ROMAN',
    'SCIENCE-FICTION',
    'BIOGRAPHIE'
  ),
  isNew: fc.boolean(),
  isFeatured: fc.boolean(),
});

/**
 * Property 5: Badge Display Consistency
 * 
 * *For any* book with `isNew: true`, the "Nouveauté" badge SHALL be displayed.
 * *For any* book with `isFeatured: true`, the "Coup de cœur" badge SHALL be displayed.
 * 
 * **Validates: Requirements 4.8, 4.9**
 */
describe('Property 5: Badge Display Consistency', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: books-library-page, Property 5: Badge Display Consistency
   * 
   * For any book with isNew: true, the "Nouveauté" badge SHALL be displayed.
   * For any book with isNew: false, the "Nouveauté" badge SHALL NOT be displayed.
   * 
   * **Validates: Requirements 4.8**
   */
  it('should display "Nouveauté" badge if and only if isNew is true', () => {
    fc.assert(
      fc.property(bookExtendedArbitrary, (book: BookExtended) => {
        cleanup();
        
        const { container } = render(<LibraryBookCard book={book} />);
        
        const newBadge = container.querySelector('[data-testid="badge-new"]');
        
        if (book.isNew) {
          // If isNew is true, badge MUST be present
          expect(newBadge).not.toBeNull();
          expect(newBadge?.textContent).toBe('Nouveauté');
        } else {
          // If isNew is false, badge MUST NOT be present
          expect(newBadge).toBeNull();
        }
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: books-library-page, Property 5: Badge Display Consistency
   * 
   * For any book with isFeatured: true, the "Coup de cœur" badge SHALL be displayed.
   * For any book with isFeatured: false, the "Coup de cœur" badge SHALL NOT be displayed.
   * 
   * **Validates: Requirements 4.9**
   */
  it('should display "Coup de cœur" badge if and only if isFeatured is true', () => {
    fc.assert(
      fc.property(bookExtendedArbitrary, (book: BookExtended) => {
        cleanup();
        
        const { container } = render(<LibraryBookCard book={book} />);
        
        const featuredBadge = container.querySelector('[data-testid="badge-featured"]');
        
        if (book.isFeatured) {
          // If isFeatured is true, badge MUST be present
          expect(featuredBadge).not.toBeNull();
          expect(featuredBadge?.textContent).toBe('Coup de cœur');
        } else {
          // If isFeatured is false, badge MUST NOT be present
          expect(featuredBadge).toBeNull();
        }
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: books-library-page, Property 5: Badge Display Consistency
   * 
   * For any book, the badge display is independent - both badges can be shown
   * simultaneously when both isNew and isFeatured are true.
   * 
   * **Validates: Requirements 4.8, 4.9**
   */
  it('should display both badges independently when both flags are true', () => {
    fc.assert(
      fc.property(bookExtendedArbitrary, (book: BookExtended) => {
        cleanup();
        
        const { container } = render(<LibraryBookCard book={book} />);
        
        const newBadge = container.querySelector('[data-testid="badge-new"]');
        const featuredBadge = container.querySelector('[data-testid="badge-featured"]');
        
        // Count of badges should match count of true flags
        const expectedBadgeCount = (book.isNew ? 1 : 0) + (book.isFeatured ? 1 : 0);
        const actualBadgeCount = (newBadge ? 1 : 0) + (featuredBadge ? 1 : 0);
        
        expect(actualBadgeCount).toBe(expectedBadgeCount);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: books-library-page, Property 5: Badge Display Consistency
   * 
   * For any book, the badge styling should be consistent:
   * - "Nouveauté" badge should have green background
   * - "Coup de cœur" badge should have amber/gold background
   * 
   * **Validates: Requirements 4.8, 4.9**
   */
  it('should apply correct styling to badges', () => {
    fc.assert(
      fc.property(bookExtendedArbitrary, (book: BookExtended) => {
        cleanup();
        
        const { container } = render(<LibraryBookCard book={book} />);
        
        const newBadge = container.querySelector('[data-testid="badge-new"]');
        const featuredBadge = container.querySelector('[data-testid="badge-featured"]');
        
        if (book.isNew && newBadge) {
          // Nouveauté badge should have emerald/green background
          expect(newBadge).toHaveClass('bg-emerald-500');
          expect(newBadge).toHaveClass('text-white');
        }
        
        if (book.isFeatured && featuredBadge) {
          // Coup de cœur badge should have amber/gold background
          expect(featuredBadge).toHaveClass('bg-amber-500');
          expect(featuredBadge).toHaveClass('text-white');
        }
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
