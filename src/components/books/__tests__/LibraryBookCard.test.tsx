/**
 * Unit Tests for LibraryBookCard
 * 
 * Tests for the LibraryBookCard component that displays books
 * in the "Notre Librairie" page with light theme design.
 * 
 * Requirements: 4.1-4.9
 */

import { render, screen } from '@testing-library/react';
import { LibraryBookCard } from '../LibraryBookCard';
import { BookExtended } from '../../../lib/mockData';

// Mock book data for testing
const mockBook: BookExtended = {
  id: 'test-1',
  title: 'Test Book Title',
  slug: 'test-book-title',
  author: 'Test Author',
  coverImage: '/images/placeholder-book.svg',
  price: 4500,
  category: 'LITTÉRATURE',
  isNew: false,
  isFeatured: false,
};

const mockBookWithNewBadge: BookExtended = {
  ...mockBook,
  id: 'test-2',
  isNew: true,
};

const mockBookWithFeaturedBadge: BookExtended = {
  ...mockBook,
  id: 'test-3',
  isFeatured: true,
};

const mockBookWithBothBadges: BookExtended = {
  ...mockBook,
  id: 'test-4',
  isNew: true,
  isFeatured: true,
};

describe('LibraryBookCard', () => {
  /**
   * Test: Renders all required elements
   * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7
   */
  describe('renders all required elements', () => {
    it('should render the book cover image with correct alt text', () => {
      render(<LibraryBookCard book={mockBook} />);
      
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt', mockBook.title);
    });

    it('should render the category label in uppercase', () => {
      render(<LibraryBookCard book={mockBook} />);
      
      const category = screen.getByTestId('book-category');
      expect(category).toBeInTheDocument();
      expect(category).toHaveTextContent(mockBook.category);
      expect(category).toHaveClass('uppercase');
    });

    it('should render the book title', () => {
      render(<LibraryBookCard book={mockBook} />);
      
      const title = screen.getByTestId('book-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent(mockBook.title);
    });

    it('should render the author in "Par [name]" format', () => {
      render(<LibraryBookCard book={mockBook} />);
      
      const author = screen.getByTestId('book-author');
      expect(author).toBeInTheDocument();
      expect(author).toHaveTextContent(`Par ${mockBook.author}`);
    });

    it('should render the price in FCFA format', () => {
      render(<LibraryBookCard book={mockBook} />);
      
      const price = screen.getByTestId('book-price');
      expect(price).toBeInTheDocument();
      expect(price).toHaveTextContent('4 500 FCFA');
    });

    it('should render the "Voir le livre" link with correct href', () => {
      render(<LibraryBookCard book={mockBook} />);
      
      const link = screen.getByTestId('book-link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent('Voir le livre');
      expect(link).toHaveAttribute('href', `/books/${mockBook.slug}`);
    });
  });

  /**
   * Test: Badge display based on isNew/isFeatured flags
   * Requirements: 4.8, 4.9
   */
  describe('badge display', () => {
    it('should not display any badges when isNew and isFeatured are false', () => {
      render(<LibraryBookCard book={mockBook} />);
      
      expect(screen.queryByTestId('badge-new')).not.toBeInTheDocument();
      expect(screen.queryByTestId('badge-featured')).not.toBeInTheDocument();
    });

    it('should display "Nouveauté" badge when isNew is true', () => {
      render(<LibraryBookCard book={mockBookWithNewBadge} />);
      
      const badge = screen.getByTestId('badge-new');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('Nouveauté');
    });

    it('should display "Coup de cœur" badge when isFeatured is true', () => {
      render(<LibraryBookCard book={mockBookWithFeaturedBadge} />);
      
      const badge = screen.getByTestId('badge-featured');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('Coup de cœur');
    });

    it('should display both badges when isNew and isFeatured are true', () => {
      render(<LibraryBookCard book={mockBookWithBothBadges} />);
      
      expect(screen.getByTestId('badge-new')).toBeInTheDocument();
      expect(screen.getByTestId('badge-featured')).toBeInTheDocument();
    });
  });

  /**
   * Test: Price formatting
   * Requirements: 4.5
   */
  describe('price formatting', () => {
    it('should format price with space as thousands separator', () => {
      const bookWithLargePrice: BookExtended = {
        ...mockBook,
        price: 15000,
      };
      
      render(<LibraryBookCard book={bookWithLargePrice} />);
      
      const price = screen.getByTestId('book-price');
      expect(price).toHaveTextContent('15 000 FCFA');
    });

    it('should format small prices correctly', () => {
      const bookWithSmallPrice: BookExtended = {
        ...mockBook,
        price: 500,
      };
      
      render(<LibraryBookCard book={bookWithSmallPrice} />);
      
      const price = screen.getByTestId('book-price');
      expect(price).toHaveTextContent('500 FCFA');
    });
  });

  /**
   * Test: Component styling
   * Requirements: 4.7
   */
  describe('component styling', () => {
    it('should have white background with rounded corners and shadow', () => {
      render(<LibraryBookCard book={mockBook} />);
      
      const card = screen.getByTestId('library-book-card');
      expect(card).toHaveClass('bg-white');
      expect(card).toHaveClass('rounded-xl');
      expect(card).toHaveClass('shadow-sm');
    });

    it('should have teal color for category', () => {
      render(<LibraryBookCard book={mockBook} />);
      
      const category = screen.getByTestId('book-category');
      expect(category).toHaveClass('text-teal-600');
    });

    it('should have gray color for author text', () => {
      render(<LibraryBookCard book={mockBook} />);
      
      const author = screen.getByTestId('book-author');
      expect(author).toHaveClass('text-gray-500');
    });
  });
});
