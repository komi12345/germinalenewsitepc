/**
 * Property-Based Tests for CollectionBookCard
 * 
 * **Property 6: Book card completeness**
 * **Validates: Requirements 4.5**
 */

import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import { CollectionBookCard } from '../CollectionBookCard';
import { formatPrice } from '../../../lib/utils';

// Generator for book data
const bookArbitrary = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 2, maxLength: 100 })
    .filter(s => s.trim().length >= 2),
  slug: fc.string({ minLength: 1, maxLength: 50 })
    .filter(s => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)),
  author: fc.string({ minLength: 2, maxLength: 100 })
    .filter(s => s.trim().length >= 2),
  coverImage: fc.constantFrom(
    '/images/placeholder-book.svg',
    '/images/hero-library.jpg'
  ),
  price: fc.integer({ min: 100, max: 100000 }),
});

describe('CollectionBookCard - Property-Based Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: collection-detail, Property 6: Book card completeness
   * 
   * For any book in the collection, the CollectionBookCard SHALL display:
   * cover image, title, author name, price formatted in FCFA, and "Acheter seul" link.
   * 
   * **Validates: Requirements 4.5**
   */
  it('should display all required book information for any valid book', () => {
    fc.assert(
      fc.property(bookArbitrary, (book) => {
        cleanup();
        
        render(<CollectionBookCard book={book} />);

        // Cover image should be displayed
        const coverImage = screen.getByTestId('book-cover-image');
        expect(coverImage).toBeInTheDocument();
        expect(coverImage).toHaveAttribute('alt', book.title);

        // Title should be displayed
        const title = screen.getByTestId('book-title');
        expect(title).toBeInTheDocument();
        expect(title.textContent).toBe(book.title);

        // Author should be displayed
        const author = screen.getByTestId('book-author');
        expect(author).toBeInTheDocument();
        expect(author.textContent).toBe(book.author);

        // Price should be displayed and formatted in FCFA
        const price = screen.getByTestId('book-price');
        expect(price).toBeInTheDocument();
        expect(price.textContent).toContain('FCFA');
        expect(price.textContent).toBe(formatPrice(book.price));

        // "Acheter seul" link should be displayed
        const buyAloneLink = screen.getByTestId('buy-alone-link');
        expect(buyAloneLink).toBeInTheDocument();
        expect(buyAloneLink).toHaveTextContent('Acheter seul');
        expect(buyAloneLink).toHaveAttribute('href', `/books/${book.slug}`);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Price formatting correctness
   * 
   * For any book price, the displayed price should match the formatPrice utility output.
   */
  it('should format price correctly using formatPrice utility', () => {
    fc.assert(
      fc.property(bookArbitrary, (book) => {
        cleanup();
        
        render(<CollectionBookCard book={book} />);

        const price = screen.getByTestId('book-price');
        const expectedFormattedPrice = formatPrice(book.price);
        
        expect(price.textContent).toBe(expectedFormattedPrice);

        return true;
      }),
      { numRuns: 100 }
    );
  });
});

describe('CollectionBookCard - Unit Tests', () => {
  afterEach(() => {
    cleanup();
  });

  const mockBook = {
    id: 'b1',
    title: "L'Aventure Ambiguë",
    slug: 'aventure-ambigue',
    author: 'Cheikh Hamidou Kane',
    coverImage: '/images/placeholder-book.svg',
    price: 4500,
  };

  it('should render the book card with all fields displayed', () => {
    render(<CollectionBookCard book={mockBook} />);

    // Check all fields are present
    expect(screen.getByTestId('collection-book-card')).toBeInTheDocument();
    expect(screen.getByTestId('book-cover-image')).toBeInTheDocument();
    expect(screen.getByTestId('book-title')).toHaveTextContent(mockBook.title);
    expect(screen.getByTestId('book-author')).toHaveTextContent(mockBook.author);
    expect(screen.getByTestId('book-price')).toHaveTextContent('4 500 FCFA');
    expect(screen.getByTestId('buy-alone-link')).toHaveTextContent('Acheter seul');
  });

  it('should link to the correct book page', () => {
    render(<CollectionBookCard book={mockBook} />);

    const buyAloneLink = screen.getByTestId('buy-alone-link');
    expect(buyAloneLink).toHaveAttribute('href', '/books/aventure-ambigue');
  });

  it('should display author name in light-dimmed color', () => {
    render(<CollectionBookCard book={mockBook} />);

    const author = screen.getByTestId('book-author');
    expect(author).toHaveClass('text-light-dimmed');
  });
});
