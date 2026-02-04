'use client';

/**
 * CollectionDetailContent - Client Component wrapper pour la page détail collection
 *
 * Ce composant gère les interactions utilisateur (ajout au panier, partage)
 * qui ne peuvent pas être définies dans un Server Component.
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

import { CollectionHero } from './CollectionHero';
import { CollectionBooksSection } from './CollectionBooksSection';
import { RelatedCollections } from './RelatedCollections';
import { CollectionWithBooks } from '@/src/lib/mockData';

interface CollectionDetailContentProps {
  collection: CollectionWithBooks;
  relatedCollections: CollectionWithBooks[];
}

export function CollectionDetailContent({
  collection,
  relatedCollections,
}: CollectionDetailContentProps) {
  // Handler pour ajouter au panier - Requirement: 3.3
  const handleAddToCart = () => {
    // TODO: Intégrer avec Zustand store panier
    console.log('Ajouter au panier:', collection.id);
    // Pour l'instant, afficher une alerte
    alert(`Collection "${collection.name}" ajoutée au panier !`);
  };

  // Handler pour partager - Requirement: 3.4
  const handleShare = async () => {
    const shareData = {
      title: collection.name,
      text: collection.description,
      url: window.location.href,
    };

    // Utiliser l'API Web Share si disponible
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // L'utilisateur a annulé ou erreur
        console.log('Partage annulé ou erreur:', err);
      }
    } else {
      // Fallback: copier le lien dans le presse-papier
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Lien copié dans le presse-papier !');
      } catch (err) {
        console.error('Erreur lors de la copie:', err);
      }
    }
  };

  return (
    <div className="pb-16 bg-dark">
      {/* Section Héro de la collection - Requirements: 2.1-2.7, 3.1, 3.2 */}
      <CollectionHero
        collection={collection}
        onAddToCart={handleAddToCart}
        onShare={handleShare}
      />

      {/* Section des livres de la collection - Requirements: 4.1-4.6 */}
      <CollectionBooksSection
        books={collection.books}
        bookCount={collection.bookCount}
      />

      {/* Section des collections similaires - Requirements: 5.1-5.4, 6.4 */}
      <RelatedCollections collections={relatedCollections} />
    </div>
  );
}

export default CollectionDetailContent;
