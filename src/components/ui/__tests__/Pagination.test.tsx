/**
 * Property-Based Tests for Pagination
 * 
 * **Property 2: Pagination Bounds**
 * **Validates: Requirements 7.5, 7.6**
 * 
 * For any pagination state, the current page number SHALL be between 1 and totalPages inclusive,
 * and navigation SHALL not allow going below 1 or above totalPages.
 */

import * as fc from 'fast-check';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { 
  Pagination, 
  getNextPage, 
  getPreviousPage, 
  isValidPage,
  getVisiblePages 
} from '../Pagination';

describe('Pagination - Property-Based Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: collections-page, Property 2: Pagination Bounds
   * 
   * For any pagination state, the current page number SHALL be between 1 and totalPages inclusive,
   * and navigation SHALL not allow going below 1 or above totalPages.
   * 
   * **Validates: Requirements 7.5, 7.6**
   */
  it('should respect pagination bounds: getNextPage never exceeds totalPages', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 1000 }), // currentPage
        fc.integer({ min: 1, max: 1000 }), // totalPages
        (currentPage, totalPages) => {
          // Ensure currentPage is within valid range for this test
          const validCurrentPage = Math.min(currentPage, totalPages);
          
          const nextPage = getNextPage(validCurrentPage, totalPages);
          
          // Property: Next page SHALL not exceed totalPages
          expect(nextPage).toBeLessThanOrEqual(totalPages);
          // Property: Next page SHALL be at least 1
          expect(nextPage).toBeGreaterThanOrEqual(1);
          // Property: Next page SHALL be at most currentPage + 1
          expect(nextPage).toBeLessThanOrEqual(validCurrentPage + 1);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: collections-page, Property 2: Pagination Bounds
   * 
   * **Validates: Requirements 7.5, 7.6**
   */
  it('should respect pagination bounds: getPreviousPage never goes below 1', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 1000 }), // currentPage
        (currentPage) => {
          const previousPage = getPreviousPage(currentPage);
          
          // Property: Previous page SHALL not go below 1
          expect(previousPage).toBeGreaterThanOrEqual(1);
          // Property: Previous page SHALL be at least currentPage - 1
          expect(previousPage).toBeGreaterThanOrEqual(currentPage - 1);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: collections-page, Property 2: Pagination Bounds
   * 
   * **Validates: Requirements 7.5, 7.6**
   */
  it('should validate page numbers correctly within bounds', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -100, max: 200 }), // page (can be invalid)
        fc.integer({ min: 1, max: 100 }),    // totalPages
        (page, totalPages) => {
          const isValid = isValidPage(page, totalPages);
          
          // Property: Page is valid only if between 1 and totalPages inclusive
          if (page >= 1 && page <= totalPages && Number.isInteger(page)) {
            expect(isValid).toBe(true);
          } else {
            expect(isValid).toBe(false);
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: collections-page, Property 2: Pagination Bounds
   * 
   * Tests that visible pages always include valid page numbers within bounds
   * 
   * **Validates: Requirements 7.5, 7.6**
   */
  it('should only show valid page numbers in visible pages', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 50 }), // currentPage
        fc.integer({ min: 1, max: 50 }), // totalPages
        (currentPage, totalPages) => {
          // Ensure currentPage is within valid range
          const validCurrentPage = Math.min(currentPage, totalPages);
          
          const visiblePages = getVisiblePages(validCurrentPage, totalPages);
          
          // Property: All non-null pages SHALL be within bounds
          visiblePages.forEach(page => {
            if (page !== null) {
              expect(page).toBeGreaterThanOrEqual(1);
              expect(page).toBeLessThanOrEqual(totalPages);
            }
          });
          
          // Property: First page (1) SHALL always be included
          expect(visiblePages.includes(1)).toBe(true);
          
          // Property: Last page SHALL always be included (if totalPages > 1)
          if (totalPages > 1) {
            expect(visiblePages.includes(totalPages)).toBe(true);
          }
          
          // Property: Current page SHALL always be included
          expect(visiblePages.includes(validCurrentPage)).toBe(true);
          
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
    it('should disable previous button on first page', () => {
      const onPageChange = jest.fn();
      render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
      
      const prevButton = screen.getByLabelText('Page précédente');
      expect(prevButton).toBeDisabled();
      
      fireEvent.click(prevButton);
      expect(onPageChange).not.toHaveBeenCalled();
    });

    it('should disable next button on last page', () => {
      const onPageChange = jest.fn();
      render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);
      
      const nextButton = screen.getByLabelText('Page suivante');
      expect(nextButton).toBeDisabled();
      
      fireEvent.click(nextButton);
      expect(onPageChange).not.toHaveBeenCalled();
    });

    it('should highlight current page with active styling', () => {
      const onPageChange = jest.fn();
      render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
      
      const currentPageButton = screen.getByLabelText('Page 3');
      expect(currentPageButton).toHaveAttribute('aria-current', 'page');
    });

    it('should not render when totalPages is 1 or less', () => {
      const onPageChange = jest.fn();
      const { container } = render(<Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />);
      
      expect(container.firstChild).toBeNull();
    });
  });
});
