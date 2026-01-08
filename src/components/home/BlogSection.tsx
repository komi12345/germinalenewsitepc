"use client";

import { cn } from "../../lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Interface pour un article de blog
 */
export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string; // Format: "12 OCT 2023"
}

/**
 * Props du composant BlogSection
 */
export interface BlogSectionProps {
  articles?: BlogArticle[];
}

/**
 * Données mock pour les articles de blog
 */
const mockBlogArticles: BlogArticle[] = [
  {
    id: "1",
    title: "L'art de la reliure numérique",
    slug: "art-reliure-numerique",
    excerpt: "Découvrez comment nous transformons les classiques en expériences modernes sans...",
    coverImage: "/images/placeholder-book.svg",
    category: "DESIGN",
    author: {
      name: "SOPHIE MARTIN",
      avatar: "/images/placeholder-book.svg",
    },
    publishedAt: "12 OCT 2023",
  },
  {
    id: "2",
    title: "Rencontre avec nos nouveaux auteurs",
    slug: "rencontre-nouveaux-auteurs",
    excerpt: "Trois plumes prometteuses rejoignent la maison Germinale cette saison. Entretien...",
    coverImage: "/images/placeholder-book.svg",
    category: "INTERVIEW",
    author: {
      name: "MARC DUBOIS",
      avatar: "/images/placeholder-book.svg",
    },
    publishedAt: "05 OCT 2023",
  },
  {
    id: "3",
    title: "Les tendances littéraires de 2024",
    slug: "tendances-litteraires-2024",
    excerpt: "Analyse des genres qui captiveront les lecteurs l'année prochaine. Le retour du...",
    coverImage: "/images/placeholder-book.svg",
    category: "TENDANCES",
    author: {
      name: "ÉDITIONS GERMINALE",
    },
    publishedAt: "28 SEPT 2023",
  },
];


/**
 * Génère les initiales à partir du nom de l'auteur
 * Cas spécial: "ÉDITIONS GERMINALE" retourne "EG"
 */
function getInitials(name: string): string {
  // Cas spécial pour Éditions Germinale
  if (name.toUpperCase().includes("ÉDITIONS GERMINALE") || 
      name.toUpperCase().includes("EDITIONS GERMINALE")) {
    return "EG";
  }
  
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

/**
 * Composant CategoryBadge - Badge de catégorie
 */
interface CategoryBadgeProps {
  category: string;
}

function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "absolute top-3 left-3",
        "px-3 py-1 rounded-md",
        "bg-gold text-dark",
        "text-xs font-semibold uppercase",
        "z-10"
      )}
    >
      {category}
    </span>
  );
}

/**
 * Composant AuthorInfo - Informations de l'auteur
 */
interface AuthorInfoProps {
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
}

function AuthorInfo({ author, publishedAt }: AuthorInfoProps) {
  const initials = getInitials(author.name);
  
  return (
    <div className="flex items-center gap-3 mt-4">
      {/* Avatar ou initiales */}
      {author.avatar ? (
        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
          <Image
            src={author.avatar}
            alt={author.name}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className={cn(
            "w-8 h-8 rounded-full shrink-0",
            "bg-gold flex items-center justify-center",
            "text-dark text-xs font-semibold"
          )}
        >
          {initials}
        </div>
      )}
      
      {/* Nom et date avec séparateur */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-light font-medium">{author.name}</span>
        <span className="text-light-dimmed">•</span>
        <span className="text-light-dimmed">{publishedAt}</span>
      </div>
    </div>
  );
}


/**
 * Composant ArticleCard - Carte d'article individuelle
 */
interface ArticleCardProps {
  article: BlogArticle;
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn(
        "block rounded-2xl overflow-hidden",
        "bg-dark-light",
        "border border-dark-lighter",
        "hover:border-gold/30",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-gold/50"
      )}
    >
      {/* Image de couverture avec badge catégorie */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.coverImage}
          alt={`Image de couverture de l'article: ${article.title}`}
          fill
          className="object-cover"
        />
        <CategoryBadge category={article.category} />
      </div>
      
      {/* Contenu de la carte */}
      <div className="p-5">
        {/* Titre */}
        <h3 className="text-lg font-semibold text-light mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        {/* Extrait */}
        <p className="text-sm text-light-dimmed leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
        
        {/* Informations de l'auteur */}
        <AuthorInfo author={article.author} publishedAt={article.publishedAt} />
      </div>
    </Link>
  );
}

/**
 * BlogSection - Section Blog et Actualités de la homepage
 * 
 * Affiche:
 * - Titre "Blog" en couleur gold
 * - Sous-titre descriptif en couleur light-dimmed
 * - Lien "Voir plus" avec flèche vers la droite
 * - 3 cartes d'articles en grille responsive
 * 
 * Positionnée entre TestimonialsSection et ContactSection
 */
export function BlogSection({ articles = mockBlogArticles }: BlogSectionProps) {
  return (
    <section
      className={cn("py-16 md:py-20 px-4", "bg-dark")}
      data-testid="blog-section"
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            {/* Titre */}
            <h2
              className={cn(
                "text-2xl md:text-3xl lg:text-4xl",
                "font-serif font-bold",
                "text-gold",
                "mb-4"
              )}
            >
              Blog
            </h2>
            
            {/* Sous-titre */}
            <p className="text-light-dimmed max-w-xl">
              Découvrez nos derniers articles, interviews et actualités du monde littéraire.
            </p>
          </div>
          
          {/* Lien "Voir plus" */}
          <Link
            href="/blog"
            className={cn(
              "inline-flex items-center gap-2",
              "text-gold font-medium",
              "hover:underline",
              "transition-all duration-200",
              "mt-4 md:mt-0"
            )}
            aria-label="Voir plus d'articles du blog"
          >
            Voir plus
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
