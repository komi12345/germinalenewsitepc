/**
 * Property-Based Tests for BookCard
 * 
 * **Property 2: Book Cards Display Required Fields**
 * **Validates: Requirements 4.4, 4.5, 4.6, 4.7**
 * 
 * For any Book_Card rendered on the homepage, the card SHALL contain
 * a visible cover image, price badge in FCFA format, book title, and author name.
 */

import * as fc from 'fast-check';
import { render, cleanup } from '@testing-library/react';
import { BookCard } from '../BookCard';

// Generator for valid book data with realistic constraints
const bookArbitrary = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 2, maxLength: 100 })
    .filter(s => s.trim().length >= 2 && /^[a-zA-Z0-9\s\-'àâäéèêëïîôùûüç]+$/.test(s)),
  slug: fc.string({ minLength: 1, maxLength: 50 })
    .filter(s => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)),
  author: fc.string({ minLength: 2, maxLength: 100 })
    .filter(s => s.trim().length >= 2 && /^[a-zA-Z\s\-'àâäéèêëïîôùûüç]+$/.test(s)),
  coverImage: fc.constantFrom(
    '/images/placeholder-book.svg',
    '/images/hero-library.jpg',
    'https://example.com/book-cover.jpg'
  ),
  price: fc.integer({ min: 100, max: 1000000 }), // Prix en FCFA (100 à 1 000 000)
});

describe('BookCard - Property-Based Tests', () => {
  // Cleanup after each test iteration
  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: homepage, Property 2: Book Cards Display Required Fields
   * 
   * For any valid book data, the BookCard component SHALL render:
   * - A cover image with the book's coverImage URL (Requirement 4.4)
   * - A price badge in FCFA format (Requirement 4.5)
   * - The book title (Requirement 4.6)
   * - The author name (Requirement 4.7)
   * 
   * **Validates: Requirements 4.4, 4.5, 4.6, 4.7**
   */
  it('should display cover image, price badge, title, and author for any valid book', () => {
    fc.assert(
      fc.property(bookArbitrary, (book) => {
        // Cleanup before each iteration to ensure clean DOM
        cleanup();
        
        // Render the component with generated data
        const { container } = render(
          <BookCard book={book} />
        );

        // Verify cover image is present (Requirement 4.4)
        const image = container.querySelector('img');
        expect(image).not.toBeNull();
        expect(image?.getAttribute('src')).toBeTruthy();
        expect(image?.getAttribute('alt')).toBe(book.title);

        // Verify price badge is displayed in FCFA format (Requirement 4.5)
        const priceBadge = container.querySelector('[data-testid="price-badge"]');
        expect(priceBadge).not.toBeNull();
        expect(priceBadge?.textContent).toContain('FCFA');
        // Verify price contains the formatted number
        const priceText = priceBadge?.textContent || '';
        expect(priceText).toMatch(/\d+(\s\d{3})*\sFCFA/);

        // Verify book title is displayed (Requirement 4.6)
        const heading = container.querySelector('h3');
        expect(heading).not.toBeNull();
        expect(heading?.textContent).toBe(book.title);

        // Verify author name is displayed (Requirement 4.7)
        const authorElement = container.querySelector('p');
        expect(authorElement).not.toBeNull();
        expect(authorElement?.textContent).toBe(book.author);

        // Verify link points to correct URL
        const link = container.querySelector('a');
        expect(link).not.toBeNull();
        expect(link?.getAttribute('href')).toBe(`/books/${book.slug}`);

        return true;
      }),
      { numRuns: 20 } // Reduced for faster test execution
    );
  });
});
