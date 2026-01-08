/**
 * Unit Tests for BlogSection
 * 
 * Tests the Blog section component that displays articles on the homepage.
 * Validates Requirements: 1.1, 1.2, 1.3, 2.1, 3.1, 3.2, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5
 */

import { render, screen, cleanup } from '@testing-library/react';
import { BlogSection, BlogArticle } from '../BlogSection';

// Mock data for testing
const mockArticles: BlogArticle[] = [
  {
    id: "1",
    title: "Test Article One",
    slug: "test-article-one",
    excerpt: "This is the excerpt for the first test article.",
    coverImage: "/images/test-cover-1.jpg",
    category: "DESIGN",
    author: {
      name: "JOHN DOE",
      avatar: "/images/avatar-1.jpg",
    },
    publishedAt: "12 OCT 2023",
  },
  {
    id: "2",
    title: "Test Article Two",
    slug: "test-article-two",
    excerpt: "This is the excerpt for the second test article.",
    coverImage: "/images/test-cover-2.jpg",
    category: "INTERVIEW",
    author: {
      name: "JANE SMITH",
      avatar: "/images/avatar-2.jpg",
    },
    publishedAt: "05 OCT 2023",
  },
  {
    id: "3",
    title: "Test Article Three",
    slug: "test-article-three",
    excerpt: "This is the excerpt for the third test article.",
    coverImage: "/images/test-cover-3.jpg",
    category: "TENDANCES",
    author: {
      name: "ÉDITIONS GERMINALE",
    },
    publishedAt: "28 SEPT 2023",
  },
];

describe('BlogSection - Unit Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Test 2.1: Tester le rendu de la section avec les données mock
   * Requirements: 1.1, 1.2, 1.3, 2.1
   */
  describe('Section Rendering with Mock Data', () => {
    it('should render the section with data-testid="blog-section"', () => {
      render(<BlogSection articles={mockArticles} />);
      
      const section = screen.getByTestId('blog-section');
      expect(section).toBeInTheDocument();
    });

    it('should display the title "Blog" in gold color', () => {
      render(<BlogSection articles={mockArticles} />);
      
      const title = screen.getByRole('heading', { level: 2, name: 'Blog' });
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-gold');
    });

    it('should display a descriptive subtitle', () => {
      render(<BlogSection articles={mockArticles} />);
      
      const subtitle = screen.getByText(/Découvrez nos derniers articles/i);
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass('text-light-dimmed');
    });

    it('should display "Voir plus" link with arrow', () => {
      render(<BlogSection articles={mockArticles} />);
      
      const viewMoreLink = screen.getByRole('link', { name: /voir plus/i });
      expect(viewMoreLink).toBeInTheDocument();
      expect(viewMoreLink).toHaveAttribute('href', '/blog');
      expect(viewMoreLink).toHaveClass('text-gold');
      expect(viewMoreLink).toHaveAttribute('aria-label', "Voir plus d'articles du blog");
    });

    it('should render exactly 3 article cards', () => {
      const { container } = render(<BlogSection articles={mockArticles} />);
      
      // Each article is wrapped in a Link that renders as an anchor
      const articleLinks = container.querySelectorAll('a[href^="/blog/"]');
      expect(articleLinks).toHaveLength(3);
    });

    it('should render with default mock data when no articles provided', () => {
      const { container } = render(<BlogSection />);
      
      const section = screen.getByTestId('blog-section');
      expect(section).toBeInTheDocument();
      
      // Should still render 3 articles from default mock data
      const articleLinks = container.querySelectorAll('a[href^="/blog/"]');
      expect(articleLinks).toHaveLength(3);
    });
  });


  /**
   * Test 2.2: Tester le composant ArticleCard
   * Requirements: 3.1, 3.2, 3.4, 3.5
   */
  describe('ArticleCard Component', () => {
    it('should display cover image with descriptive alt text', () => {
      const { container } = render(<BlogSection articles={mockArticles} />);
      
      const images = container.querySelectorAll('img[alt*="Image de couverture"]');
      expect(images).toHaveLength(3);
      
      // Verify first image has correct alt text
      expect(images[0]).toHaveAttribute('alt', 'Image de couverture de l\'article: Test Article One');
    });

    it('should display category badge for each article', () => {
      render(<BlogSection articles={mockArticles} />);
      
      expect(screen.getByText('DESIGN')).toBeInTheDocument();
      expect(screen.getByText('INTERVIEW')).toBeInTheDocument();
      expect(screen.getByText('TENDANCES')).toBeInTheDocument();
    });

    it('should display article titles', () => {
      render(<BlogSection articles={mockArticles} />);
      
      expect(screen.getByText('Test Article One')).toBeInTheDocument();
      expect(screen.getByText('Test Article Two')).toBeInTheDocument();
      expect(screen.getByText('Test Article Three')).toBeInTheDocument();
    });

    it('should display article excerpts', () => {
      render(<BlogSection articles={mockArticles} />);
      
      expect(screen.getByText('This is the excerpt for the first test article.')).toBeInTheDocument();
      expect(screen.getByText('This is the excerpt for the second test article.')).toBeInTheDocument();
      expect(screen.getByText('This is the excerpt for the third test article.')).toBeInTheDocument();
    });

    it('should apply correct CSS classes to article cards', () => {
      const { container } = render(<BlogSection articles={mockArticles} />);
      
      const articleCards = container.querySelectorAll('a[href^="/blog/"]');
      articleCards.forEach((card) => {
        expect(card).toHaveClass('rounded-2xl');
        expect(card).toHaveClass('bg-dark-light');
      });
    });

    it('should have hover transition classes on article cards', () => {
      const { container } = render(<BlogSection articles={mockArticles} />);
      
      const articleCards = container.querySelectorAll('a[href^="/blog/"]');
      articleCards.forEach((card) => {
        expect(card).toHaveClass('duration-200');
        expect(card).toHaveClass('hover:border-gold/30');
      });
    });

    it('should link to correct article slug', () => {
      const { container } = render(<BlogSection articles={mockArticles} />);
      
      const links = container.querySelectorAll('a[href^="/blog/"]');
      expect(links[0]).toHaveAttribute('href', '/blog/test-article-one');
      expect(links[1]).toHaveAttribute('href', '/blog/test-article-two');
      expect(links[2]).toHaveAttribute('href', '/blog/test-article-three');
    });

    it('should display category badge with gold background', () => {
      const { container } = render(<BlogSection articles={mockArticles} />);
      
      const badges = container.querySelectorAll('.bg-gold.text-dark');
      expect(badges.length).toBeGreaterThanOrEqual(3);
    });
  });

  /**
   * Test 2.3: Tester le composant AuthorInfo
   * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
   */
  describe('AuthorInfo Component', () => {
    it('should display author names', () => {
      render(<BlogSection articles={mockArticles} />);
      
      expect(screen.getByText('JOHN DOE')).toBeInTheDocument();
      expect(screen.getByText('JANE SMITH')).toBeInTheDocument();
      expect(screen.getByText('ÉDITIONS GERMINALE')).toBeInTheDocument();
    });

    it('should display publication dates', () => {
      render(<BlogSection articles={mockArticles} />);
      
      expect(screen.getByText('12 OCT 2023')).toBeInTheDocument();
      expect(screen.getByText('05 OCT 2023')).toBeInTheDocument();
      expect(screen.getByText('28 SEPT 2023')).toBeInTheDocument();
    });

    it('should display separator (•) between author name and date', () => {
      const { container } = render(<BlogSection articles={mockArticles} />);
      
      // Each author info should have a separator
      const separators = container.querySelectorAll('.text-light-dimmed');
      const separatorTexts = Array.from(separators).filter(el => el.textContent === '•');
      expect(separatorTexts).toHaveLength(3);
    });

    it('should display avatar image when provided', () => {
      const { container } = render(<BlogSection articles={mockArticles} />);
      
      // First two articles have avatars
      const avatarImages = container.querySelectorAll('img[alt="JOHN DOE"], img[alt="JANE SMITH"]');
      expect(avatarImages).toHaveLength(2);
    });

    it('should display initials fallback when no avatar provided', () => {
      const { container } = render(<BlogSection articles={mockArticles} />);
      
      // Third article (ÉDITIONS GERMINALE) has no avatar, should show "EG" initials
      const initialsElement = container.querySelector('.bg-gold.rounded-full');
      expect(initialsElement).toBeInTheDocument();
      expect(initialsElement?.textContent).toBe('EG');
    });

    it('should display "EG" initials for "ÉDITIONS GERMINALE" author', () => {
      const articlesWithEditionsGerminale: BlogArticle[] = [
        {
          id: "1",
          title: "Test Article",
          slug: "test-article",
          excerpt: "Test excerpt",
          coverImage: "/images/test.jpg",
          category: "TEST",
          author: {
            name: "ÉDITIONS GERMINALE",
          },
          publishedAt: "01 JAN 2024",
        },
      ];
      
      const { container } = render(<BlogSection articles={articlesWithEditionsGerminale} />);
      
      const initialsElement = container.querySelector('.bg-gold.rounded-full');
      expect(initialsElement).toBeInTheDocument();
      expect(initialsElement?.textContent).toBe('EG');
    });

    it('should generate correct initials for two-word names', () => {
      const articlesWithTwoWordName: BlogArticle[] = [
        {
          id: "1",
          title: "Test Article",
          slug: "test-article",
          excerpt: "Test excerpt",
          coverImage: "/images/test.jpg",
          category: "TEST",
          author: {
            name: "ALICE WONDERLAND",
          },
          publishedAt: "01 JAN 2024",
        },
      ];
      
      const { container } = render(<BlogSection articles={articlesWithTwoWordName} />);
      
      const initialsElement = container.querySelector('.bg-gold.rounded-full');
      expect(initialsElement).toBeInTheDocument();
      expect(initialsElement?.textContent).toBe('AW');
    });

    it('should display circular avatar', () => {
      const { container } = render(<BlogSection articles={mockArticles} />);
      
      // Avatar containers should have rounded-full class
      const avatarContainers = container.querySelectorAll('.rounded-full');
      expect(avatarContainers.length).toBeGreaterThanOrEqual(3);
    });
  });
});
