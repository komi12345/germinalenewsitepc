/**
 * Property-Based Tests for CollectionBooksSection
 * 
 * **Property 5: Book count accuracy**
 * **Validates: Requirements 4.2**
 */

import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import { CollectionBooksSection } from '../CollectionBooksSection';
import { Book } from '../../../lib/mockData';

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

// Generator for array of books with specific count
const booksArrayArbitrary = fc.integer({ min: 1, max: 10 }).chain(count =>
  fc.array(bookArbitrary, { minLength: count, maxLength: count }).map(books => ({
    books,
    bookCount: count
  }))
);

describe('CollectionBooksSection - Property-Based Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: collection-detail, Property 5: Book count accuracy
   * 
   * For any collection with N books, the CollectionBooksSection SHALL display
   * "[N] chefs-d'œuvre inclus dans ce coffret" where N equals the actual number of books.
   * 
   * **Validates: Requirements 4.2**
   */
  it('should display accurate book count in subtitle for any number of books', () => {
    fc.assert(
      fc.property(booksArrayArbitrary, ({ books, bookCount }) => {
        cleanup();
        
        render(<CollectionBooksSection books={books} bookCount={bookCount} />);

        // Book count subtitle should display the correct count
        const subtitle = screen.getByTestId('book-count-subtitle');
        expect(subtitle).toBeInTheDocument();
        expect(subtitle.textContent).toContain(`${bookCount}`);
        expect(subtitle.textContent).toContain("chefs-d'œuvre inclus dans ce coffret");

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Grid displays correct number of book cards
   * 
   * For any array of books, the grid should render exactly that many CollectionBookCard components.
   */
  it('should render the correct number of book cards in the grid', () => {
    fc.assert(
      fc.property(booksArrayArbitrary, ({ books, bookCount }) => {
        cleanup();
        
        render(<CollectionBooksSection books={books} bookCount={bookCount} />);

        // Grid should contain exactly the number of books provided
        const bookCards = screen.getAllByTestId('collection-book-card');
        expect(bookCards).toHaveLength(books.length);

        return true;
      }),
      { numRuns: 100 }
    );
  });
});

describe('CollectionBooksSection - Unit Tests', () => {
  afterEach(() => {
    cleanup();
  });

  const mockBooks: Book[] = [
    {
      id: 'b1',
      title: "L'Aventure Ambiguë",
      slug: 'aventure-ambigue',
      author: 'Cheikh Hamidou Kane',
      coverImage: '/images/placeholder-book.svg',
      price: 4500,
    },
    {
      id: 'b2',
      title: 'Une Si Longue Lettre',
      slug: 'si-longue-lettre',
      author: 'Mariama Bâ',
      coverImage: '/images/placeholder-book.svg',
      price: 3800,
    },
    {
      id: 'b3',
      title: 'Les Soleils des Indépendances',
      slug: 'soleils-independances',
      author: 'Ahmadou Kourouma',
      coverImage: '/images/placeholder-book.svg',
      price: 5200,
    },
    {
      id: 'b4',
      title: "Le Monde s'effondre",
      slug: 'monde-effondre',
      author: 'Chinua Achebe',
      coverImage: '/images/placeholder-book.svg',
      price: 4800,
    },
  ];

  it('should render the section with correct title', () => {
    render(<CollectionBooksSection books={mockBooks} bookCount={4} />);

    const title = screen.getByTestId('section-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Les livres de la collection');
  });

  it('should display the correct book count in subtitle', () => {
    render(<CollectionBooksSection books={mockBooks} bookCount={4} />);

    const subtitle = screen.getByTestId('book-count-subtitle');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent("4 chefs-d'œuvre inclus dans ce coffret");
  });

  it('should render the "Voir tous les détails" link', () => {
    render(<CollectionBooksSection books={mockBooks} bookCount={4} />);

    const link = screen.getByTestId('view-details-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Voir tous les détails');
    expect(link).toHaveTextContent('→');
  });

  it('should render all book cards in the grid', () => {
    render(<CollectionBooksSection books={mockBooks} bookCount={4} />);

    const grid = screen.getByTestId('books-grid');
    expect(grid).toBeInTheDocument();

    const bookCards = screen.getAllByTestId('collection-book-card');
    expect(bookCards).toHaveLength(4);
  });

  it('should have responsive grid classes', () => {
    render(<CollectionBooksSection books={mockBooks} bookCount={4} />);

    const grid = screen.getByTestId('books-grid');
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-4');
  });

  it('should render empty grid when no books provided', () => {
    render(<CollectionBooksSection books={[]} bookCount={0} />);

    const subtitle = screen.getByTestId('book-count-subtitle');
    expect(subtitle).toHaveTextContent("0 chefs-d'œuvre inclus dans ce coffret");

    const grid = screen.getByTestId('books-grid');
    expect(grid).toBeInTheDocument();
    expect(grid.children).toHaveLength(0);
  });
});
