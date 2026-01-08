/**
 * Property-Based Tests for RelatedCollections
 * 
 * **Property 7: Related collection card completeness**
 * **Validates: Requirements 5.3**
 */

import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import { RelatedCollections } from '../RelatedCollections';
import { RelatedCollectionCard } from '../RelatedCollectionCard';

// Generator for related collection data
const relatedCollectionArbitrary = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 2, maxLength: 100 })
    .filter(s => s.trim().length >= 2),
  slug: fc.string({ minLength: 1, maxLength: 50 })
    .filter(s => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)),
  coverImage: fc.constantFrom(
    '/images/placeholder-collection.svg',
    '/images/hero-library.jpg'
  ),
});

// Generator for array of 3 related collections
const threeCollectionsArbitrary = fc.array(relatedCollectionArbitrary, { minLength: 3, maxLength: 3 });

describe('RelatedCollections - Property-Based Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: collection-detail, Property 7: Related collection card completeness
   * 
   * For any related collection, the RelatedCollectionCard SHALL display:
   * cover image with gradient overlay, "COLLECTION" label, collection name, 
   * and "Découvrir →" link.
   * 
   * **Validates: Requirements 5.3**
   */
  it('should display all required elements for each related collection card', () => {
    fc.assert(
      fc.property(relatedCollectionArbitrary, (collection) => {
        cleanup();
        
        render(<RelatedCollectionCard collection={collection} />);

        // Card should be rendered
        const card = screen.getByTestId('related-collection-card');
        expect(card).toBeInTheDocument();

        // Gradient overlay should be present
        const gradientOverlay = screen.getByTestId('gradient-overlay');
        expect(gradientOverlay).toBeInTheDocument();

        // "COLLECTION" label should be displayed
        const collectionLabel = screen.getByTestId('collection-label');
        expect(collectionLabel).toBeInTheDocument();
        expect(collectionLabel.textContent?.toLowerCase()).toContain('collection');

        // Collection name should be displayed
        const collectionName = screen.getByTestId('collection-name');
        expect(collectionName).toBeInTheDocument();
        expect(collectionName.textContent).toBe(collection.name);

        // "Découvrir →" link should be displayed
        const discoverLink = screen.getByTestId('discover-link');
        expect(discoverLink).toBeInTheDocument();
        expect(discoverLink.textContent).toContain('Découvrir');
        expect(discoverLink.textContent).toContain('→');

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Test: RelatedCollections section displays exactly 3 collections
   * 
   * For any array of collections, the RelatedCollections section SHALL
   * display at most 3 collection cards.
   * 
   * **Validates: Requirements 5.2**
   */
  it('should display exactly 3 collection cards when given 3 or more collections', () => {
    fc.assert(
      fc.property(threeCollectionsArbitrary, (collections) => {
        cleanup();
        
        render(<RelatedCollections collections={collections} />);

        // Section should be rendered
        const section = screen.getByTestId('related-collections-section');
        expect(section).toBeInTheDocument();

        // Title should be "Vous aimerez aussi"
        const title = screen.getByTestId('section-title');
        expect(title).toBeInTheDocument();
        expect(title.textContent).toBe('Vous aimerez aussi');

        // Grid should contain exactly 3 cards
        const cards = screen.getAllByTestId('related-collection-card');
        expect(cards).toHaveLength(3);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Test: RelatedCollections section handles empty array
   * 
   * When given an empty array, the section should not render.
   */
  it('should not render when given an empty array', () => {
    render(<RelatedCollections collections={[]} />);

    const section = screen.queryByTestId('related-collections-section');
    expect(section).not.toBeInTheDocument();
  });

  /**
   * Test: RelatedCollections section handles fewer than 3 collections
   */
  it('should display all collections when given fewer than 3', () => {
    const twoCollections = [
      {
        id: '1',
        name: 'Collection One',
        slug: 'collection-one',
        coverImage: '/images/placeholder-collection.svg',
      },
      {
        id: '2',
        name: 'Collection Two',
        slug: 'collection-two',
        coverImage: '/images/placeholder-collection.svg',
      },
    ];

    render(<RelatedCollections collections={twoCollections} />);

    const cards = screen.getAllByTestId('related-collection-card');
    expect(cards).toHaveLength(2);
  });
});
