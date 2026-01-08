import { notFound } from "next/navigation";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { Breadcrumb } from "@/src/components/ui/Breadcrumb";
import { CollectionDetailContent } from "@/src/components/collection/CollectionDetailContent";
import { getCollectionBySlug, getRelatedCollections } from "@/src/lib/mockData";

/**
 * Page de détails d'une collection
 * Route: /collections/[slug]
 * 
 * Affiche les détails complets d'une collection avec:
 * - Header existant
 * - Breadcrumb de navigation
 * - Section héro avec image, titre, description, prix et actions
 * - Section des livres de la collection
 * - Section des collections similaires
 * - FooterSimple existant
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 5.2, 7.1
 */

interface CollectionDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const { slug } = await params;
  
  // Récupérer la collection par son slug - Requirement: 5.2
  const collection = getCollectionBySlug(slug);

  // Gestion du cas collection non trouvée (404) - Requirement: 5.2
  if (!collection) {
    notFound();
  }

  // Récupérer les collections similaires - Requirement: 5.2
  const relatedCollections = getRelatedCollections(slug);

  // Configuration du breadcrumb - Requirements: 1.2, 1.3, 1.4, 1.5
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: collection.name },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dark">
      {/* Header existant - Requirement: 1.1 */}
      <Header />

      {/* Contenu principal */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb - Requirements: 1.2, 1.3, 1.4, 1.5 */}
          <div className="py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Contenu de la collection (Client Component) */}
          <CollectionDetailContent
            collection={collection}
            relatedCollections={relatedCollections}
          />
        </div>
      </main>

      {/* Footer complet - Requirement: 7.1 */}
      <Footer />
    </div>
  );
}

/**
 * Génération des métadonnées pour le SEO
 */
export async function generateMetadata({ params }: CollectionDetailPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return {
      title: "Collection non trouvée | Éditions Germinale",
    };
  }

  return {
    title: `${collection.name} | Éditions Germinale`,
    description: collection.description,
  };
}
