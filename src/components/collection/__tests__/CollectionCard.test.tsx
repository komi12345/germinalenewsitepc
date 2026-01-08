/**
 * Property-Based Tests for CollectionCard
 * 
 * **Property 1: Collection Cards Display Required Fields**
 * **Validates: Requirements 3.4, 3.5, 3.6**
 * 
 * For any Collection_Card rendered on the homepage, the card SHALL contain
 * a visible cover image, collection name, description text, price in FCFA,
 * and a "Voir la collection" link.
 */

import * as fc from 'fast-check';
import { render, within, cleanup } from '@testing-library/react';
import { CollectionCard } from '../CollectionCard';

// Generator for valid collection data with more realistic constraints
const collectionArbitrary = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 2, maxLength: 100 })
    .filter(s => s.trim().length >= 2 && /^[a-zA-Z0-9\s\-'àâäéèêëïîôùûüç]+$/.test(s)),
  slug: fc.string({ minLength: 1, maxLength: 50 })
    .filter(s => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)),
  description: fc.string({ minLength: 10, maxLength: 500 })
    .filter(s => s.trim().length >= 10 && /^[a-zA-Z0-9\s\-'.,!?àâäéèêëïîôùûüç]+$/.test(s)),
  coverImage: fc.constantFrom(
    '/images/placeholder-collection.svg',
    '/images/hero-library.jpg',
    'https://example.com/image.jpg'
  ),
  price: fc.integer({ min: 100, max: 100000 }),
});

describe('CollectionCard - Property-Based Tests', () => {
  // Cleanup after each test iteration
  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: homepage, Property 1: Collection Cards Display Required Fields
   * 
   * For any valid collection data, the CollectionCard component SHALL render:
   * - A cover image with the collection's coverImage URL
   * - The collection name in a heading
   * - The collection description text
   * - The price in FCFA format
   * - A "Voir la collection" link with arrow
   * 
   * **Validates: Requirements 3.4, 3.5, 3.6**
   */
  it('should display cover image, name, and description for any valid collection', () => {
    fc.assert(
      fc.property(collectionArbitrary, (collection) => {
        // Cleanup before each iteration to ensure clean DOM
        cleanup();
        
        // Render the component with generated data
        const { container } = render(
          <CollectionCard collection={collection} />
        );

        // Use within to scope queries to this specific container
        const card = within(container);

        // Verify cover image is present (Requirement 3.4)
        const image = container.querySelector('img');
        expect(image).not.toBeNull();
        expect(image?.getAttribute('src')).toBeTruthy();
        expect(image?.getAttribute('alt')).toBe(collection.name);

        // Verify collection name is displayed in H3 (Requirement 3.5)
        const heading = container.querySelector('h3');
        expect(heading).not.toBeNull();
        expect(heading?.textContent).toBe(collection.name);

        // Verify description is displayed (Requirement 3.6)
        const description = container.querySelector('p');
        expect(description).not.toBeNull();
        expect(description?.textContent).toBe(collection.description);

        // Verify links point to correct URL (Requirement 3.7)
        const links = container.querySelectorAll('a');
        expect(links.length).toBeGreaterThanOrEqual(1);
        const hasCorrectLink = Array.from(links).some(
          link => link.getAttribute('href') === `/collections/${collection.slug}`
        );
        expect(hasCorrectLink).toBe(true);

        // Verify price is displayed in FCFA format
        const priceText = container.textContent;
        expect(priceText).toContain('FCFA');

        // Verify "Voir la collection" link is present
        expect(priceText).toContain('Voir la collection');

        return true;
      }),
      { numRuns: 20 } // Reduced for faster test execution
    );
  });
});
