/**
 * Property-Based Tests for Collection Detail Page
 * 
 * **Property 1: Breadcrumb displays collection name correctly**
 * **Property 2: Collection description is always displayed**
 * **Validates: Requirements 1.2, 2.5**
 */

import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import { Breadcrumb } from '../../../../src/components/ui/Breadcrumb';
import { CollectionHero } from '../../../../src/components/collection/CollectionHero';

// Generator for collection names
const collectionNameArbitrary = fc.string({ minLength: 2, maxLength: 100 })
  .filter(s => s.trim().length >= 2);

// Generator for collection descriptions
const collectionDescriptionArbitrary = fc.string({ minLength: 10, maxLength: 1000 })
  .filter(s => s.trim().length >= 10);

// Generator for full collection data
const collectionArbitrary = fc.record({
  id: fc.uuid(),
  name: collectionNameArbitrary,
  slug: fc.string({ minLength: 1, maxLength: 50 })
    .filter(s => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)),
  description: collectionDescriptionArbitrary,
  coverImage: fc.constantFrom(
    '/images/placeholder-collection.svg',
    '/images/hero-library.jpg'
  ),
  price: fc.integer({ min: 1000, max: 100000 }),
  bookCount: fc.integer({ min: 1, max: 50 }),
  isLimited: fc.boolean(),
});

describe('Collection Detail Page - Property-Based Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: collection-detail, Property 1: Breadcrumb displays collection name correctly
   * 
   * For any collection with a valid name, the breadcrumb SHALL display 
   * "Accueil / Collections / [collection.name]" where [collection.name] 
   * matches the actual collection name.
   * 
   * **Validates: Requirements 1.2**
   */
  it('should display breadcrumb with correct collection name', () => {
    fc.assert(
      fc.property(collectionNameArbitrary, (collectionName) => {
        cleanup();
        
        // Create breadcrumb items as the page would
        const breadcrumbItems = [
          { label: "Accueil", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: collectionName },
        ];

        render(<Breadcrumb items={breadcrumbItems} />);

        // Property: Breadcrumb SHALL contain "Accueil" link
        const accueilLink = screen.getByText('Accueil');
        expect(accueilLink).toBeInTheDocument();
        expect(accueilLink.closest('a')).toHaveAttribute('href', '/');

        // Property: Breadcrumb SHALL contain "Collections" link
        const collectionsLink = screen.getByText('Collections');
        expect(collectionsLink).toBeInTheDocument();
        expect(collectionsLink.closest('a')).toHaveAttribute('href', '/collections');

        // Property: Breadcrumb SHALL display the collection name (with whitespace normalization)
        const normalizedName = collectionName.replace(/\s+/g, ' ').trim();
        const collectionNameElement = screen.getByText((content, element) => {
          if (element?.tagName !== 'SPAN') return false;
          const normalizedContent = content.replace(/\s+/g, ' ').trim();
          return normalizedContent === normalizedName;
        });
        expect(collectionNameElement).toBeInTheDocument();
        
        // Property: Collection name SHALL NOT be a link (current page)
        expect(collectionNameElement.closest('a')).toBeNull();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: collection-detail, Property 2: Collection description is always displayed
   * 
   * For any collection with a description, the CollectionHero SHALL render 
   * the complete description text without truncation.
   * 
   * **Validates: Requirements 2.5**
   */
  it('should display complete collection description without truncation', () => {
    const mockOnAddToCart = jest.fn();
    const mockOnShare = jest.fn();

    fc.assert(
      fc.property(collectionArbitrary, (collection) => {
        cleanup();
        
        render(
          <CollectionHero
            collection={collection}
            onAddToCart={mockOnAddToCart}
            onShare={mockOnShare}
          />
        );

        // Property: Description SHALL be displayed in the document
        // Use a custom text matcher to handle whitespace normalization
        const descriptionElement = screen.getByText((content, element) => {
          // Check if this is the description paragraph element
          if (element?.tagName !== 'P') return false;
          // Normalize whitespace for comparison (browser behavior)
          const normalizedContent = content.replace(/\s+/g, ' ').trim();
          const normalizedDescription = collection.description.replace(/\s+/g, ' ').trim();
          return normalizedContent === normalizedDescription;
        });
        expect(descriptionElement).toBeInTheDocument();

        // Property: Description SHALL contain the complete text (normalized whitespace is acceptable)
        const normalizedActual = descriptionElement.textContent?.replace(/\s+/g, ' ').trim();
        const normalizedExpected = collection.description.replace(/\s+/g, ' ').trim();
        expect(normalizedActual).toBe(normalizedExpected);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Additional test: Breadcrumb navigation structure
   * 
   * Tests that the breadcrumb has the correct structure with separators
   */
  it('should have correct breadcrumb structure with separators', () => {
    fc.assert(
      fc.property(collectionNameArbitrary, (collectionName) => {
        cleanup();
        
        const breadcrumbItems = [
          { label: "Accueil", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: collectionName },
        ];

        render(<Breadcrumb items={breadcrumbItems} />);

        // Property: Breadcrumb SHALL have navigation role
        const nav = screen.getByRole('navigation', { name: "Fil d'Ariane" });
        expect(nav).toBeInTheDocument();

        // Property: Breadcrumb SHALL contain separators between items
        const separators = screen.getAllByText('/');
        expect(separators.length).toBe(2); // 2 separators for 3 items

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
