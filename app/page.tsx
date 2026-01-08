import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { HeroSection } from "@/src/components/home/HeroSection";
import { DirectorMessageSection } from "@/src/components/home/DirectorMessageSection";
import { CollectionsSection } from "@/src/components/home/CollectionsSection";
import { PopularBooksSection } from "@/src/components/home/PopularBooksSection";
import { HowItWorksSection } from "@/src/components/home/HowItWorksSection";
import { AuthorCTASection } from "@/src/components/home/AuthorCTASection";
import { ServicesSection } from "@/src/components/home/ServicesSection";
import { ContactSection } from "@/src/components/home/ContactSection";
import { TestimonialsSection } from "@/src/components/home/TestimonialsSection";
import { BlogSection } from "@/src/components/home/BlogSection";
import { mockBlogArticles } from "@/src/lib/mockData";

/**
 * Données mock pour les collections
 * À remplacer par des données Prisma quand la DB sera configurée
 */
const mockCollections = [
  {
    id: "1",
    name: "Romans Africains",
    slug: "romans-africains",
    description: "Découvrez les plus belles plumes du continent africain à travers des récits captivants.",
    coverImage: "/images/placeholder-collection.svg",
    price: 5000,
  },
  {
    id: "2",
    name: "Poésie Francophone",
    slug: "poesie-francophone",
    description: "Une collection de poèmes qui célèbrent la beauté de la langue française.",
    coverImage: "/images/placeholder-collection.svg",
    price: 3500,
  },
  {
    id: "3",
    name: "Contes et Légendes",
    slug: "contes-legendes",
    description: "Les histoires traditionnelles qui ont bercé des générations.",
    coverImage: "/images/placeholder-collection.svg",
    price: 4500,
  },
  {
    id: "4",
    name: "Littérature Jeunesse",
    slug: "litterature-jeunesse",
    description: "Des livres pour éveiller l'imagination des plus jeunes.",
    coverImage: "/images/placeholder-collection.svg",
    price: 2500,
  },
];

/**
 * Données mock pour les livres populaires
 * À remplacer par des données Prisma quand la DB sera configurée
 */
const mockBooks = [
  {
    id: "1",
    title: "Le Soleil des Indépendances",
    slug: "soleil-independances",
    author: "Ahmadou Kourouma",
    coverImage: "/images/placeholder-book.svg",
    price: 8500,
  },
  {
    id: "2",
    title: "Une si longue lettre",
    slug: "si-longue-lettre",
    author: "Mariama Bâ",
    coverImage: "/images/placeholder-book.svg",
    price: 7500,
  },
  {
    id: "3",
    title: "L'Enfant noir",
    slug: "enfant-noir",
    author: "Camara Laye",
    coverImage: "/images/placeholder-book.svg",
    price: 6500,
  },
  {
    id: "4",
    title: "Sous l'orage",
    slug: "sous-orage",
    author: "Seydou Badian",
    coverImage: "/images/placeholder-book.svg",
    price: 5500,
  },
  {
    id: "5",
    title: "Les Bouts de bois de Dieu",
    slug: "bouts-bois-dieu",
    author: "Sembène Ousmane",
    coverImage: "/images/placeholder-book.svg",
    price: 9000,
  },
  {
    id: "6",
    title: "Ville cruelle",
    slug: "ville-cruelle",
    author: "Mongo Beti",
    coverImage: "/images/placeholder-book.svg",
    price: 7000,
  },
];

/**
 * Homepage - Page d'accueil Éditions Germinale
 * 
 * Server Component qui intègre toutes les sections de la homepage:
 * - Header avec navigation
 * - HeroSection avec image de fond et CTA
 * - CollectionsSection avec 4 collections à la une
 * - PopularBooksSection avec carousel de livres
 * - HowItWorksSection avec les 3 étapes
 * - AuthorCTASection pour la soumission de manuscrits
 * - Footer avec liens et newsletter
 * 
 * Requirements: 3.3, 4.3
 */
export default async function HomePage() {
  // TODO: Remplacer par des requêtes Prisma quand la DB sera configurée
  // const featuredCollections = await prisma.collection.findMany({
  //   where: { isActive: true },
  //   take: 4,
  //   orderBy: { createdAt: "desc" },
  // });
  // const popularBooks = await prisma.book.findMany({
  //   where: { isActive: true },
  //   take: 10,
  //   orderBy: { createdAt: "desc" },
  // });

  const featuredCollections = mockCollections;
  const popularBooks = mockBooks;

  return (
    <div className="min-h-screen flex flex-col bg-dark">
      {/* Header avec navigation */}
      <Header />

      {/* Contenu principal */}
      <main className="flex-1">
        {/* Section Hero */}
        <HeroSection />

        {/* Section Mot du Directeur */}
        <DirectorMessageSection />

        {/* Section Collections à la une */}
        <CollectionsSection collections={featuredCollections} />

        {/* Section Livres populaires */}
        <PopularBooksSection books={popularBooks} />

        {/* Section Comment ça marche */}
        <HowItWorksSection />

        {/* Section Appel aux auteurs */}
        <AuthorCTASection />

        {/* Section Nos Services */}
        <ServicesSection />

        {/* Section Témoignages clients */}
        <TestimonialsSection />

        {/* Section Blog et Actualités */}
        <BlogSection articles={mockBlogArticles} />

        {/* Section Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
