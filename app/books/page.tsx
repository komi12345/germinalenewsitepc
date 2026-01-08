/**
 * Page "Notre Librairie" - Catalogue complet des livres
 * 
 * Accessible via:
 * - Le lien "Librairie" dans la navigation principale
 * - Le bouton "Voir plus" de la section "Livres populaires" sur la homepage
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6
 */

import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { Breadcrumb } from "@/src/components/ui/Breadcrumb";
import { BooksPageContent } from "@/src/components/books/BooksPageContent";
import { mockBooksExtended } from "@/src/lib/mockData";

/**
 * Fil d'Ariane pour la page Librairie
 * Format: "Accueil / Notre Librairie"
 */
const breadcrumbItems = [
  { label: "Accueil", href: "/" },
  { label: "Notre Librairie" },
];

/**
 * Métadonnées de la page
 */
export const metadata = {
  title: "Notre Librairie | Éditions Germinale",
  description: "Plongez dans notre catalogue complet : romans, essais, poésie et beaux ouvrages.",
};

/**
 * BooksPage - Page principale de la librairie
 * 
 * Server Component qui affiche:
 * - Header avec navigation
 * - Fil d'Ariane "Accueil / Notre Librairie"
 * - Titre "Tous nos Livres" en or avec police serif
 * - Sous-titre descriptif
 * - Contenu de la page (recherche, filtres, grille, pagination)
 * - Footer complet
 */
export default function BooksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Fil d'Ariane */}
          <Breadcrumb items={breadcrumbItems} className="mb-6" />
          
          {/* En-tête de page */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gold mb-3">
              Tous nos Livres
            </h1>
            <p className="text-light-dimmed text-base md:text-lg max-w-2xl">
              Plongez dans notre catalogue complet : romans, essais, poésie et beaux ouvrages.
            </p>
          </div>
          
          {/* Contenu principal (Client Component) */}
          <BooksPageContent initialBooks={mockBooksExtended} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
