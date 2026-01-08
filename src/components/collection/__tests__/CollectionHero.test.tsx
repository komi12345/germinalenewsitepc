/**
 * Property-Based Tests for CollectionHero
 * 
 * **Property 3: Limited edition badge conditional rendering**
 * **Property 4: Price reduction display**
 * **Validates: Requirements 2.3, 2.6**
 */

import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import { CollectionHero } from '../CollectionHero';

// Generator for collection data without discount
const collectionWithoutDiscountArbitrary = fc.record({
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
  isLimited: fc.boolean(),
});

// Generator for collection data with discount
const collectionWithDiscountArbitrary = fc.record({
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
  originalPrice: fc.integer({ min: 1000, max: 150000 }),
  discountPercent: fc.integer({ min: 1, max: 99 }),
  bookCount: fc.integer({ min: 1, max: 50 }),
  isLimited: fc.boolean(),
});

describe('CollectionHero - Property-Based Tests', () => {
  const mockOnAddToCart = jest.fn();
  const mockOnShare = jest.fn();

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  /**
   * Feature: collection-detail, Property 3: Limited edition badge conditional rendering
   * 
   * For any collection where isLimited is true, the CollectionHero SHALL display 
   * the "Édition Limitée" badge on the image. For any collection where isLimited 
   * is false or undefined, the badge SHALL NOT be displayed.
   * 
   * **Validates: Requirements 2.3**
   */
  it('should conditionally render limited edition badge based on isLimited property', () => {
    fc.assert(
      fc.property(collectionWithoutDiscountArbitrary, (collection) => {
        cleanup();
        
        render(
          <CollectionHero
            collection={collection}
            onAddToCart={mockOnAddToCart}
            onShare={mockOnShare}
          />
        );

        const limitedBadge = screen.queryByTestId('limited-edition-badge');

        if (collection.isLimited) {
          // When isLimited is true, badge MUST be displayed
          expect(limitedBadge).toBeInTheDocument();
          expect(limitedBadge).toHaveTextContent('Édition Limitée');
        } else {
          // When isLimited is false, badge MUST NOT be displayed
          expect(limitedBadge).not.toBeInTheDocument();
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: collection-detail, Property 4: Price reduction display
   * 
   * For any collection with originalPrice and discountPercent defined, 
   * the Price_Badge SHALL display: the originalPrice crossed out, 
   * the current price, and the discountPercent as "-X%".
   * 
   * **Validates: Requirements 2.6**
   */
  it('should display price reduction correctly when discount exists', () => {
    fc.assert(
      fc.property(collectionWithDiscountArbitrary, (collection) => {
        cleanup();
        
        render(
          <CollectionHero
            collection={collection}
            onAddToCart={mockOnAddToCart}
            onShare={mockOnShare}
          />
        );

        // Current price should always be displayed
        const currentPrice = screen.getByTestId('current-price');
        expect(currentPrice).toBeInTheDocument();
        expect(currentPrice.textContent).toContain('FCFA');

        // Original price should be displayed and crossed out
        const originalPrice = screen.getByTestId('original-price');
        expect(originalPrice).toBeInTheDocument();
        expect(originalPrice).toHaveClass('line-through');
        expect(originalPrice.textContent).toContain('FCFA');

        // Discount badge should show the percentage
        const discountBadge = screen.getByTestId('discount-badge');
        expect(discountBadge).toBeInTheDocument();
        expect(discountBadge.textContent).toBe(`-${collection.discountPercent}%`);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Additional test: Price display without discount
   * 
   * For any collection without originalPrice and discountPercent,
   * only the current price should be displayed.
   */
  it('should display only current price when no discount exists', () => {
    fc.assert(
      fc.property(collectionWithoutDiscountArbitrary, (collection) => {
        cleanup();
        
        render(
          <CollectionHero
            collection={collection}
            onAddToCart={mockOnAddToCart}
            onShare={mockOnShare}
          />
        );

        // Current price should always be displayed
        const currentPrice = screen.getByTestId('current-price');
        expect(currentPrice).toBeInTheDocument();
        expect(currentPrice.textContent).toContain('FCFA');

        // Original price and discount badge should NOT be displayed
        const originalPrice = screen.queryByTestId('original-price');
        const discountBadge = screen.queryByTestId('discount-badge');
        
        expect(originalPrice).not.toBeInTheDocument();
        expect(discountBadge).not.toBeInTheDocument();

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
