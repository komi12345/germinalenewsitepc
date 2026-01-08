import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { Breadcrumb } from "@/src/components/ui/Breadcrumb";
import { CollectionsPageContent } from "@/src/components/collections/CollectionsPageContent";
import { mockCollections } from "@/src/lib/mockData";

/**
 * Breadcrumb items pour la page Collections
 * Requirement 2.1: Afficher "Accueil / Nos Collections"
 */
const breadcrumbItems = [
  { label: "Accueil", href: "/" },
  { label: "Nos Collections" },
];

/**
 * CollectionsPage - Page "Nos Collections"
 * 
 * Server Component qui affiche la liste de toutes les collections
 * avec recherche, filtres et pagination.
 * 
 * Structure:
 * - Header (réutilisé de la homepage) - Requirement 1.1
 * - Breadcrumb "Accueil / Nos Collections" - Requirement 2.1
 * - Titre "Nos Collections" - Requirement 3.1
 * - Sous-titre descriptif - Requirement 3.2
 * - CollectionsPageContent (client component avec recherche, filtres, grille, pagination)
 * - Footer (même footer que la homepage) - Requirement 8.1
 * 
 * Requirements: 1.1, 1.2, 2.1, 3.1, 3.2
 */
export default async function CollectionsPage() {
  // TODO: Remplacer par des requêtes Prisma quand la DB sera configurée
  // const collections = await prisma.collection.findMany({
  //   where: { isActive: true },
  //   orderBy: { createdAt: "desc" },
  // });

  const collections = mockCollections;

  return (
    <div className="min-h-screen flex flex-col bg-dark">
      {/* Header - Requirement 1.1 */}
      <Header />

      {/* Contenu principal */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb - Requirement 2.1 */}
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

          {/* Titre de la page - Requirement 3.1 */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-4">
            Nos Collections
          </h1>

          {/* Sous-titre - Requirement 3.2 */}
          <p className="text-base md:text-lg text-light-dimmed max-w-xl mb-8">
            Une sélection d&apos;ouvrages élégants et inspirants, curatée avec passion pour les amoureux des mots.
          </p>

          {/* Contenu de la page (client component) */}
          <CollectionsPageContent initialCollections={collections} />
        </div>
      </main>

      {/* Footer - Requirement 8.1 */}
      <Footer />
    </div>
  );
}
