/**
 * Property-Based Tests for BlogSection
 * 
 * Uses fast-check for property-based testing to validate correctness properties
 * across many generated inputs.
 * 
 * Feature: blog-section
 */

import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import { BlogSection, BlogArticle } from '../BlogSection';

/**
 * Helper function to escape special characters for CSS attribute selectors
 */
function escapeCSS(str: string): string {
  return str.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1');
}

/**
 * Arbitrary generator for valid BlogArticle objects with unique, safe values
 * Uses alphanumeric characters only to avoid CSS selector issues
 */
const blogArticleArbitrary = (index: number) => fc.record({
  id: fc.constant(String(index)),
  title: fc.stringMatching(/^[A-Za-z0-9 ]{5,30}$/)
    .filter(s => s.trim().length >= 5)
    .map(s => `Article ${index} ${s.trim()}`),
  slug: fc.stringMatching(/^[a-z0-9]{3,20}$/)
    .map(s => `article-${index}-${s}`),
  excerpt: fc.stringMatching(/^[A-Za-z0-9 ,.]{10,80}$/)
    .filter(s => s.trim().length >= 10)
    .map(s => `Excerpt ${index} ${s.trim()}`),
  coverImage: fc.constantFrom(
    '/images/placeholder-book.svg',
    '/images/test-cover.jpg',
    '/images/article-image.png'
  ),
  category: fc.constantFrom('DESIGN', 'INTERVIEW', 'TENDANCES', 'ACTUALITES', 'CULTURE'),
  author: fc.record({
    name: fc.stringMatching(/^[A-Za-z]{3,10}$/)
      .map(s => `Author${index} ${s}`),
    avatar: fc.option(
      fc.constantFrom('/images/avatar-1.jpg', '/images/avatar-2.jpg', '/images/placeholder-book.svg'),
      { nil: undefined }
    ),
  }),
  publishedAt: fc.tuple(
    fc.integer({ min: 1, max: 28 }),
    fc.constantFrom('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'),
    fc.integer({ min: 2020, max: 2025 })
  ).map(([day, month, year]) => `${day.toString().padStart(2, '0')} ${month} ${year}`),
});

/**
 * Generate an array of 3 blog articles with unique content for testing
 */
const threeArticlesArbitrary = fc.tuple(
  blogArticleArbitrary(1),
  blogArticleArbitrary(2),
  blogArticleArbitrary(3)
);

/**
 * Property 1: Article Card Content Completeness
 * 
 * *For any* BlogArticle object passed to ArticleCard, the rendered output SHALL contain
 * the article's title, excerpt, category badge, cover image, and author information.
 * 
 * **Validates: Requirements 3.1, 3.2, 3.4, 3.5, 3.6**
 */
describe('Property 1: Article Card Content Completeness', () => {
  it('should render all required content elements for any valid article', () => {
    fc.assert(
      fc.property(
        threeArticlesArbitrary,
        (articles) => {
          const { container, unmount } = render(<BlogSection articles={articles} />);
          
          try {
            // Verify each article's content is present
            for (const article of articles) {
              // 3.4: Title should be displayed
              const allTitles = Array.from(container.querySelectorAll('h3')).map(el => el.textContent);
              expect(allTitles).toContain(article.title);
              
              // 3.5: Excerpt should be displayed
              const allExcerpts = Array.from(container.querySelectorAll('.text-light-dimmed.leading-relaxed')).map(el => el.textContent);
              expect(allExcerpts).toContain(article.excerpt);
              
              // 3.2: Category badge should be displayed
              const allCategories = Array.from(container.querySelectorAll('.bg-gold.text-dark')).map(el => el.textContent);
              expect(allCategories).toContain(article.category);
              
              // 3.1: Cover image should be present - verify by checking all images have proper alt
              const coverImages = container.querySelectorAll('img[alt^="Image de couverture"]');
              expect(coverImages.length).toBe(3);
              
              // 3.6: Author info should be displayed
              const allAuthors = Array.from(container.querySelectorAll('.text-light.font-medium')).map(el => el.textContent);
              expect(allAuthors).toContain(article.author.name);
            }
            
            return true;
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should display category badge with correct styling for any category', () => {
    fc.assert(
      fc.property(
        threeArticlesArbitrary,
        (articles) => {
          const { container, unmount } = render(<BlogSection articles={articles} />);
          
          try {
            // All category badges should have gold background and dark text
            // Use more specific selector to exclude initials fallback (which also has bg-gold)
            const categoryBadges = container.querySelectorAll('.bg-gold.text-dark.uppercase');
            expect(categoryBadges.length).toBe(3);
            
            // Verify each badge contains a valid category
            const validCategories = ['DESIGN', 'INTERVIEW', 'TENDANCES', 'ACTUALITES', 'CULTURE'];
            categoryBadges.forEach((badge) => {
              expect(validCategories).toContain(badge.textContent);
            });
            
            return true;
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should render article cards with correct CSS classes', () => {
    fc.assert(
      fc.property(
        threeArticlesArbitrary,
        (articles) => {
          const { container, unmount } = render(<BlogSection articles={articles} />);
          
          try {
            // Each article card should have the required styling classes
            const articleCards = container.querySelectorAll('a[href^="/blog/"]');
            expect(articleCards.length).toBe(3);
            
            articleCards.forEach((card) => {
              // Requirements 2.5, 2.6: Card styling
              expect(card).toHaveClass('rounded-2xl');
              expect(card).toHaveClass('bg-dark-light');
              expect(card).toHaveClass('hover:border-gold/30');
              expect(card).toHaveClass('duration-200');
            });
            
            return true;
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 2: Author Info Completeness
 * 
 * *For any* author object with a name and publishedAt date, the AuthorInfo component
 * SHALL render the author's avatar (or initials), name, separator (•), and date.
 * 
 * **Validates: Requirements 4.1, 4.2, 4.3, 4.4**
 */
describe('Property 2: Author Info Completeness', () => {
  it('should display author name and publication date with separator for any article', () => {
    fc.assert(
      fc.property(
        threeArticlesArbitrary,
        (articles) => {
          const { container, unmount } = render(<BlogSection articles={articles} />);
          
          try {
            for (const article of articles) {
              // 4.2: Author name should be displayed
              const allAuthors = Array.from(container.querySelectorAll('.text-light.font-medium')).map(el => el.textContent);
              expect(allAuthors).toContain(article.author.name);
              
              // 4.3: Publication date should be displayed
              const allDates = Array.from(container.querySelectorAll('.text-light-dimmed')).map(el => el.textContent);
              expect(allDates).toContain(article.publishedAt);
            }
            
            // 4.4: Separators (•) should be present for each article
            const separators = container.querySelectorAll('.text-light-dimmed');
            const separatorTexts = Array.from(separators).filter(el => el.textContent === '•');
            expect(separatorTexts.length).toBe(3);
            
            return true;
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should display avatar image when provided', () => {
    // Generate articles where all have avatars
    const articlesWithAvatarsArbitrary = fc.tuple(
      blogArticleArbitrary(1).map(a => ({
        ...a,
        author: { ...a.author, avatar: '/images/avatar-1.jpg' }
      })),
      blogArticleArbitrary(2).map(a => ({
        ...a,
        author: { ...a.author, avatar: '/images/avatar-2.jpg' }
      })),
      blogArticleArbitrary(3).map(a => ({
        ...a,
        author: { ...a.author, avatar: '/images/avatar-3.jpg' }
      }))
    );

    fc.assert(
      fc.property(
        articlesWithAvatarsArbitrary,
        (articles) => {
          const { container, unmount } = render(<BlogSection articles={articles} />);
          
          try {
            // 4.1: Avatar images should be displayed for each author
            // Check that we have avatar images (not initials fallback)
            const avatarImages = container.querySelectorAll('.rounded-full img');
            expect(avatarImages.length).toBe(3);
            
            return true;
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should display initials fallback when no avatar is provided', () => {
    // Generate articles where none have avatars
    const articlesWithoutAvatarsArbitrary = fc.tuple(
      blogArticleArbitrary(1).map(a => ({
        ...a,
        author: { name: a.author.name, avatar: undefined }
      })),
      blogArticleArbitrary(2).map(a => ({
        ...a,
        author: { name: a.author.name, avatar: undefined }
      })),
      blogArticleArbitrary(3).map(a => ({
        ...a,
        author: { name: a.author.name, avatar: undefined }
      }))
    );

    fc.assert(
      fc.property(
        articlesWithoutAvatarsArbitrary,
        (articles) => {
          const { container, unmount } = render(<BlogSection articles={articles} />);
          
          try {
            // 4.1: Initials fallback should be displayed (gold background, circular)
            const initialsElements = container.querySelectorAll('.bg-gold.rounded-full');
            expect(initialsElements.length).toBe(3);
            
            // Each initials element should have text content (the initials)
            initialsElements.forEach((el) => {
              expect(el.textContent).toBeTruthy();
              expect(el.textContent!.length).toBeGreaterThanOrEqual(1);
              expect(el.textContent!.length).toBeLessThanOrEqual(2);
            });
            
            return true;
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should display "EG" initials for "ÉDITIONS GERMINALE" author', () => {
    // Generate articles with Éditions Germinale as author
    const editionsGerminaleArbitrary = fc.tuple(
      blogArticleArbitrary(1).map(a => ({
        ...a,
        author: { name: 'ÉDITIONS GERMINALE', avatar: undefined }
      })),
      blogArticleArbitrary(2).map(a => ({
        ...a,
        author: { name: 'Éditions Germinale', avatar: undefined }
      })),
      blogArticleArbitrary(3).map(a => ({
        ...a,
        author: { name: 'EDITIONS GERMINALE', avatar: undefined }
      }))
    );

    fc.assert(
      fc.property(
        editionsGerminaleArbitrary,
        (articles) => {
          const { container, unmount } = render(<BlogSection articles={articles} />);
          
          try {
            // 4.5: All should display "EG" initials
            const initialsElements = container.querySelectorAll('.bg-gold.rounded-full');
            expect(initialsElements.length).toBe(3);
            
            initialsElements.forEach((el) => {
              expect(el.textContent).toBe('EG');
            });
            
            return true;
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 3: Image Accessibility
 * 
 * *For any* cover image rendered in ArticleCard, the image element SHALL have
 * a non-empty alt attribute containing descriptive text.
 * 
 * **Validates: Requirements 6.2**
 */
describe('Property 3: Image Accessibility', () => {
  it('should have descriptive alt text for all cover images', () => {
    fc.assert(
      fc.property(
        threeArticlesArbitrary,
        (articles) => {
          const { container, unmount } = render(<BlogSection articles={articles} />);
          
          try {
            // 6.2: All cover images should have descriptive alt text
            const coverImages = container.querySelectorAll('img[alt^="Image de couverture"]');
            expect(coverImages.length).toBe(3);
            
            // Each cover image should have non-empty alt text
            coverImages.forEach((img) => {
              const altText = img.getAttribute('alt');
              expect(altText).toBeTruthy();
              expect(altText!.length).toBeGreaterThan(0);
              expect(altText).toContain('Image de couverture');
            });
            
            return true;
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should include article title in alt text for context', () => {
    fc.assert(
      fc.property(
        threeArticlesArbitrary,
        (articles) => {
          const { container, unmount } = render(<BlogSection articles={articles} />);
          
          try {
            // All cover images should include the article title in alt text
            const coverImages = container.querySelectorAll('img[alt^="Image de couverture"]');
            expect(coverImages.length).toBe(3);
            
            // Collect all alt texts
            const altTexts = Array.from(coverImages).map(img => img.getAttribute('alt'));
            
            // Each article title should appear in one of the alt texts
            for (const article of articles) {
              const hasMatchingAlt = altTexts.some(alt => alt?.includes(article.title));
              expect(hasMatchingAlt).toBe(true);
            }
            
            return true;
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have non-empty alt attributes for all images', () => {
    fc.assert(
      fc.property(
        threeArticlesArbitrary,
        (articles) => {
          const { container, unmount } = render(<BlogSection articles={articles} />);
          
          try {
            // All images in the section should have non-empty alt attributes
            const allImages = container.querySelectorAll('img');
            
            allImages.forEach((img) => {
              const altText = img.getAttribute('alt');
              expect(altText).toBeTruthy();
              expect(altText!.trim().length).toBeGreaterThan(0);
            });
            
            return true;
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
