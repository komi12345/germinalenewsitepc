/**
 * Mock data pour les collections et livres
 * À remplacer par des données Prisma quand la DB sera configurée
 *
 * Requirements: 2.6, 4.2, 4.5, 6.2, 6.3, 6.5
 */

import { Collection } from '@/src/components/collection/CollectionListCard';

/**
 * Interface Book pour les livres individuels
 *
 * Requirements: 4.5, 4.6
 */
export interface Book {
  id: string;
  title: string;
  slug: string;
  author: string;
  coverImage: string;
  price: number;
}

/**
 * Interface BookExtended - Extension de Book avec catégorie et badges
 * Pour la page "Notre Librairie" (Books Library Page)
 *
 * Requirements: 4.2, 4.8, 4.9
 */
export interface BookExtended extends Book {
  category: string; // Catégorie du livre (LITTÉRATURE, POÉSIE, etc.)
  isNew?: boolean; // Badge "Nouveauté"
  isFeatured?: boolean; // Badge "Coup de cœur"
}

/**
 * Interface CollectionWithBooks - Extension de Collection avec les détails pour la page détail
 *
 * Requirements: 2.6, 4.5
 */
export interface CollectionWithBooks extends Collection {
  originalPrice?: number; // Prix original si réduction
  discountPercent?: number; // Pourcentage de réduction
  isLimited?: boolean; // Badge "Édition Limitée"
  books: Book[]; // Livres inclus dans la collection
}

/**
 * Collections mock pour la page "Nos Collections"
 *
 * 6 collections avec:
 * - Littérature Classique (isNew)
 * - Poésie Contemporaine (isPopular)
 * - Histoire & Essais
 * - Romans Policiers (isNew)
 * - Science-Fiction
 * - Biographies (isPopular)
 */
export const mockCollections: Collection[] = [
  {
    id: '1',
    name: 'Littérature Classique',
    slug: 'litterature-classique',
    description:
      "Redécouvrez les chefs-d'œuvre intemporels qui ont façonné notre imaginaire collectif.",
    coverImage: '/images/placeholder-collection.svg',
    price: 5000, // 5 000 FCFA
    bookCount: 12,
    isNew: true,
  },
  {
    id: '2',
    name: 'Poésie Contemporaine',
    slug: 'poesie-contemporaine',
    description:
      "Des vers modernes qui capturent l'essence de notre époque avec sensibilité.",
    coverImage: '/images/placeholder-collection.svg',
    price: 3500, // 3 500 FCFA
    bookCount: 8,
  },
  {
    id: '3',
    name: 'Histoire & Essais',
    slug: 'histoire-essais',
    description:
      'Comprendre le passé pour mieux appréhender les défis du présent.',
    coverImage: '/images/placeholder-collection.svg',
    price: 6000, // 6 000 FCFA
    bookCount: 15,
  },
  {
    id: '4',
    name: 'Romans Policiers',
    slug: 'romans-policiers',
    description: 'Intrigues, mystères et enquêtes haletantes pour vos soirées.',
    coverImage: '/images/placeholder-collection.svg',
    price: 4500, // 4 500 FCFA
    bookCount: 24,
  },
  {
    id: '5',
    name: 'Science-Fiction',
    slug: 'science-fiction',
    description:
      'Explorez des mondes futuristes et des réalités alternatives captivantes.',
    coverImage: '/images/placeholder-collection.svg',
    price: 4800, // 4 800 FCFA
    bookCount: 18,
    isPopular: true,
  },
  {
    id: '6',
    name: 'Biographies',
    slug: 'biographies',
    description:
      'Les parcours de vie extraordinaires de ceux qui ont changé le monde.',
    coverImage: '/images/placeholder-collection.svg',
    price: 5500, // 5 500 FCFA
    bookCount: 10,
  },
  {
    id: '7',
    name: 'Philosophie',
    slug: 'philosophie',
    description:
      "Les grandes questions de l'existence explorées par les plus grands penseurs.",
    coverImage: '/images/placeholder-collection.svg',
    price: 7000, // 7 000 FCFA
    bookCount: 9,
  },
  {
    id: '8',
    name: 'Théâtre Africain',
    slug: 'theatre-africain',
    description:
      'Les pièces majeures du théâtre africain contemporain et classique.',
    coverImage: '/images/placeholder-collection.svg',
    price: 4000, // 4 000 FCFA
    bookCount: 11,
    isNew: true,
  },
  {
    id: '9',
    name: 'Contes & Légendes',
    slug: 'contes-legendes',
    description:
      'Les récits traditionnels qui ont bercé des générations entières.',
    coverImage: '/images/placeholder-collection.svg',
    price: 3000, // 3 000 FCFA
    bookCount: 20,
    isPopular: true,
  },
  {
    id: '10',
    name: 'Développement Personnel',
    slug: 'developpement-personnel',
    description:
      "Des ouvrages pour grandir, s'épanouir et atteindre vos objectifs.",
    coverImage: '/images/placeholder-collection.svg',
    price: 5200, // 5 200 FCFA
    bookCount: 16,
  },
  {
    id: '11',
    name: 'Art & Culture',
    slug: 'art-culture',
    description:
      'Explorez les richesses artistiques et culturelles du monde francophone.',
    coverImage: '/images/placeholder-collection.svg',
    price: 6500, // 6 500 FCFA
    bookCount: 13,
  },
  {
    id: '12',
    name: 'Jeunesse',
    slug: 'jeunesse',
    description:
      "Des histoires captivantes pour éveiller l'imagination des plus jeunes.",
    coverImage: '/images/placeholder-collection.svg',
    price: 2500, // 2 500 FCFA
    bookCount: 25,
    isNew: true,
  },
];

/**
 * Collections pour la section "Collections à la une" de la homepage
 * Sélection de 4 collections mises en avant
 */
export const featuredCollections = mockCollections.slice(0, 4);

/**
 * Mock Books - Livres de la littérature africaine
 *
 * Requirements: 4.2, 4.5
 */
export const mockBooks: Book[] = [
  {
    id: 'b1',
    title: "L'Aventure Ambiguë",
    slug: 'aventure-ambigue',
    author: 'Cheikh Hamidou Kane',
    coverImage: '/images/placeholder-book.svg',
    price: 4500,
  },
  {
    id: 'b2',
    title: 'Une Si Longue Lettre',
    slug: 'si-longue-lettre',
    author: 'Mariama Bâ',
    coverImage: '/images/placeholder-book.svg',
    price: 3800,
  },
  {
    id: 'b3',
    title: 'Les Soleils des Indépendances',
    slug: 'soleils-independances',
    author: 'Ahmadou Kourouma',
    coverImage: '/images/placeholder-book.svg',
    price: 5200,
  },
  {
    id: 'b4',
    title: "Le Monde s'effondre",
    slug: 'monde-effondre',
    author: 'Chinua Achebe',
    coverImage: '/images/placeholder-book.svg',
    price: 4800,
  },
  {
    id: 'b5',
    title: "Cahier d'un retour au pays natal",
    slug: 'cahier-retour-pays-natal',
    author: 'Aimé Césaire',
    coverImage: '/images/placeholder-book.svg',
    price: 3500,
  },
  {
    id: 'b6',
    title: "L'Enfant Noir",
    slug: 'enfant-noir',
    author: 'Camara Laye',
    coverImage: '/images/placeholder-book.svg',
    price: 4200,
  },
  {
    id: 'b7',
    title: 'Ville Cruelle',
    slug: 'ville-cruelle',
    author: 'Mongo Beti',
    coverImage: '/images/placeholder-book.svg',
    price: 4000,
  },
  {
    id: 'b8',
    title: 'Le Devoir de Violence',
    slug: 'devoir-violence',
    author: 'Yambo Ouologuem',
    coverImage: '/images/placeholder-book.svg',
    price: 5500,
  },
  {
    id: 'b9',
    title: 'Xala',
    slug: 'xala',
    author: 'Ousmane Sembène',
    coverImage: '/images/placeholder-book.svg',
    price: 3900,
  },
  {
    id: 'b10',
    title: 'La Grève des Bàttu',
    slug: 'greve-battu',
    author: 'Aminata Sow Fall',
    coverImage: '/images/placeholder-book.svg',
    price: 4100,
  },
];

/**
 * Mock Books Extended - Livres avec catégories et badges pour la page "Notre Librairie"
 * 12 livres avec catégories variées et badges Nouveauté/Coup de cœur
 * Données basées sur le design de référence
 *
 * Requirements: 4.2, 4.8, 4.9
 */
export const mockBooksExtended: BookExtended[] = [
  {
    id: 'be1',
    title: "Mémoires d'un Scribe",
    slug: 'memoires-scribe',
    author: 'Jean-Paul Dubois',
    coverImage: '/images/placeholder-book.svg',
    price: 4500,
    category: 'LITTÉRATURE',
    isNew: true,
  },
  {
    id: 'be2',
    title: "L'Archipel des Mots",
    slug: 'archipel-mots',
    author: 'Fatou Diome',
    coverImage: '/images/placeholder-book.svg',
    price: 3200,
    category: 'POÉSIE',
  },
  {
    id: 'be3',
    title: 'Les Ombres du Palais',
    slug: 'ombres-palais',
    author: 'Cheikh Anta Diop',
    coverImage: '/images/placeholder-book.svg',
    price: 6000,
    category: 'ESSAI HISTORIQUE',
  },
  {
    id: 'be4',
    title: 'Le Jardin des Secrets',
    slug: 'jardin-secrets',
    author: 'Leïla Slimani',
    coverImage: '/images/placeholder-book.svg',
    price: 4800,
    category: 'ROMAN',
    isFeatured: true,
  },
  {
    id: 'be5',
    title: 'Futur Immédiat',
    slug: 'futur-immediat',
    author: 'Alain Mabanckou',
    coverImage: '/images/placeholder-book.svg',
    price: 5200,
    category: 'SCIENCE-FICTION',
  },
  {
    id: 'be6',
    title: 'Une Vie en Fleurs',
    slug: 'vie-fleurs',
    author: 'Maryse Condé',
    coverImage: '/images/placeholder-book.svg',
    price: 5500,
    category: 'BIOGRAPHIE',
  },
  {
    id: 'be7',
    title: "Vers l'Aurore",
    slug: 'vers-aurore',
    author: 'Marie-Claire Akossi',
    coverImage: '/images/placeholder-book.svg',
    price: 2800,
    category: 'POÉSIE',
    isNew: true,
  },
  {
    id: 'be8',
    title: 'Le Dernier Royaume',
    slug: 'dernier-royaume',
    author: 'Oumar Sy',
    coverImage: '/images/placeholder-book.svg',
    price: 6200,
    category: 'ROMAN',
  },
  {
    id: 'be9',
    title: 'Chroniques du Sahel',
    slug: 'chroniques-sahel',
    author: 'Aïcha Touré',
    coverImage: '/images/placeholder-book.svg',
    price: 4900,
    category: 'ESSAI HISTORIQUE',
    isFeatured: true,
  },
  {
    id: 'be10',
    title: 'Les Étoiles de Tombouctou',
    slug: 'etoiles-tombouctou',
    author: 'Seydou Bamba',
    coverImage: '/images/placeholder-book.svg',
    price: 5100,
    category: 'SCIENCE-FICTION',
    isNew: true,
  },
  {
    id: 'be11',
    title: "Portrait d'une Reine",
    slug: 'portrait-reine',
    author: 'Nana Asantewaa',
    coverImage: '/images/placeholder-book.svg',
    price: 4700,
    category: 'BIOGRAPHIE',
  },
  {
    id: 'be12',
    title: "L'Héritage des Ancêtres",
    slug: 'heritage-ancetres',
    author: 'Kwame Asante',
    coverImage: '/images/placeholder-book.svg',
    price: 3900,
    category: 'LITTÉRATURE',
    isNew: true,
    isFeatured: true,
  },
];

/**
 * Collections avec livres pour la page détail
 * Synchronisé avec mockCollections pour cohérence entre liste et détail
 * Inclut des collections avec réduction pour tester l'affichage
 *
 * Requirements: 2.6, 4.2, 4.5
 */
export const mockCollectionsWithBooks: CollectionWithBooks[] = [
  {
    id: '1',
    name: 'Littérature Classique',
    slug: 'litterature-classique',
    description:
      "Redécouvrez les chefs-d'œuvre intemporels qui ont façonné notre imaginaire collectif. Cette collection rassemble les plus grands classiques de la littérature francophone, des œuvres qui traversent les époques et continuent de nous émouvoir par leur profondeur et leur beauté.",
    coverImage: '/images/placeholder-collection.svg',
    price: 5000,
    originalPrice: 6500,
    discountPercent: 23,
    isLimited: true,
    bookCount: 4,
    isNew: true,
    books: [mockBooks[0], mockBooks[1], mockBooks[2], mockBooks[3]],
  },
  {
    id: '2',
    name: 'Poésie Contemporaine',
    slug: 'poesie-contemporaine',
    description:
      "Des vers modernes qui capturent l'essence de notre époque avec sensibilité. Cette collection réunit les voix poétiques les plus marquantes de notre temps, offrant un panorama riche et émouvant de la création poétique contemporaine.",
    coverImage: '/images/placeholder-collection.svg',
    price: 3500,
    bookCount: 3,
    books: [mockBooks[4], mockBooks[5], mockBooks[6]],
  },
  {
    id: '3',
    name: 'Histoire & Essais',
    slug: 'histoire-essais',
    description:
      'Comprendre le passé pour mieux appréhender les défis du présent. Cette collection propose des ouvrages essentiels pour éclairer notre compréhension du monde, mêlant rigueur historique et réflexions contemporaines.',
    coverImage: '/images/placeholder-collection.svg',
    price: 6000,
    originalPrice: 7500,
    discountPercent: 20,
    bookCount: 4,
    books: [mockBooks[0], mockBooks[3], mockBooks[7], mockBooks[9]],
  },
  {
    id: '4',
    name: 'Romans Policiers',
    slug: 'romans-policiers',
    description:
      "Intrigues, mystères et enquêtes haletantes pour vos soirées. Plongez dans des récits captivants où suspense et rebondissements vous tiendront en haleine jusqu'à la dernière page.",
    coverImage: '/images/placeholder-collection.svg',
    price: 4500,
    bookCount: 4,
    isNew: true,
    books: [mockBooks[2], mockBooks[5], mockBooks[7], mockBooks[8]],
  },
  {
    id: '5',
    name: 'Science-Fiction',
    slug: 'science-fiction',
    description:
      "Explorez des mondes futuristes et des réalités alternatives captivantes. Cette collection vous emmène aux confins de l'imagination, là où la science rencontre la fiction pour créer des univers extraordinaires.",
    coverImage: '/images/placeholder-collection.svg',
    price: 4800,
    bookCount: 3,
    isPopular: true,
    isLimited: true,
    books: [mockBooks[1], mockBooks[4], mockBooks[6]],
  },
  {
    id: '6',
    name: 'Biographies',
    slug: 'biographies',
    description:
      "Les parcours de vie extraordinaires de ceux qui ont changé le monde. Découvrez les destins fascinants de personnalités qui ont marqué l'histoire par leur courage, leur vision et leur détermination.",
    coverImage: '/images/placeholder-collection.svg',
    price: 5500,
    bookCount: 3,
    books: [mockBooks[0], mockBooks[5], mockBooks[9]],
  },
  {
    id: '7',
    name: 'Philosophie',
    slug: 'philosophie',
    description:
      "Les grandes questions de l'existence explorées par les plus grands penseurs. Une collection pour nourrir votre réflexion et approfondir votre compréhension des enjeux fondamentaux de la condition humaine.",
    coverImage: '/images/placeholder-collection.svg',
    price: 7000,
    originalPrice: 8500,
    discountPercent: 18,
    bookCount: 3,
    books: [mockBooks[3], mockBooks[6], mockBooks[8]],
  },
  {
    id: '8',
    name: 'Théâtre Africain',
    slug: 'theatre-africain',
    description:
      'Les pièces majeures du théâtre africain contemporain et classique. Une collection qui célèbre la richesse dramatique du continent, des œuvres qui font entendre des voix puissantes et authentiques.',
    coverImage: '/images/placeholder-collection.svg',
    price: 4000,
    bookCount: 3,
    isNew: true,
    books: [mockBooks[2], mockBooks[7], mockBooks[9]],
  },
  {
    id: '9',
    name: 'Contes & Légendes',
    slug: 'contes-legendes',
    description:
      "Les récits traditionnels qui ont bercé des générations entières. Redécouvrez la magie des contes ancestraux, porteurs de sagesse et d'émerveillement, transmis de génération en génération.",
    coverImage: '/images/placeholder-collection.svg',
    price: 3000,
    bookCount: 4,
    isPopular: true,
    books: [mockBooks[1], mockBooks[4], mockBooks[6], mockBooks[8]],
  },
  {
    id: '10',
    name: 'Développement Personnel',
    slug: 'developpement-personnel',
    description:
      "Des ouvrages pour grandir, s'épanouir et atteindre vos objectifs. Cette collection vous accompagne dans votre parcours de développement personnel avec des conseils pratiques et inspirants.",
    coverImage: '/images/placeholder-collection.svg',
    price: 5200,
    bookCount: 3,
    books: [mockBooks[0], mockBooks[3], mockBooks[5]],
  },
  {
    id: '11',
    name: 'Art & Culture',
    slug: 'art-culture',
    description:
      'Explorez les richesses artistiques et culturelles du monde francophone. Une collection qui célèbre la diversité créative et le patrimoine culturel à travers des ouvrages richement illustrés.',
    coverImage: '/images/placeholder-collection.svg',
    price: 6500,
    bookCount: 3,
    books: [mockBooks[2], mockBooks[4], mockBooks[9]],
  },
  {
    id: '12',
    name: 'Jeunesse',
    slug: 'jeunesse',
    description:
      "Des histoires captivantes pour éveiller l'imagination des plus jeunes. Cette collection propose des récits adaptés aux jeunes lecteurs, alliant aventure, humour et valeurs positives.",
    coverImage: '/images/placeholder-collection.svg',
    price: 2500,
    bookCount: 4,
    isNew: true,
    books: [mockBooks[1], mockBooks[5], mockBooks[7], mockBooks[8]],
  },
];

/**
 * Fonction utilitaire pour récupérer une collection par son slug
 *
 * @param slug - Le slug de la collection
 * @returns La collection avec ses livres ou undefined
 */
export function getCollectionBySlug(
  slug: string
): CollectionWithBooks | undefined {
  return mockCollectionsWithBooks.find(collection => collection.slug === slug);
}

/**
 * Fonction utilitaire pour récupérer les collections similaires
 * Exclut la collection actuelle et retourne 3 collections
 *
 * @param currentSlug - Le slug de la collection actuelle à exclure
 * @returns Un tableau de 3 collections similaires
 */
export function getRelatedCollections(
  currentSlug: string
): CollectionWithBooks[] {
  return mockCollectionsWithBooks
    .filter(collection => collection.slug !== currentSlug)
    .slice(0, 3);
}

/**
 * Interface pour un article de blog
 *
 * Requirements: 2.1
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
 * Données mock pour les articles de blog
 * 3 articles avec image, catégorie, titre, extrait et informations de l'auteur
 *
 * Requirements: 2.1
 */
export const mockBlogArticles: BlogArticle[] = [
  {
    id: '1',
    title: "L'art de la reliure numérique",
    slug: 'art-reliure-numerique',
    excerpt:
      'Découvrez comment nous transformons les classiques en expériences modernes sans...',
    coverImage: '/images/placeholder-book.svg',
    category: 'DESIGN',
    author: {
      name: 'SOPHIE MARTIN',
      avatar: '/images/placeholder-book.svg',
    },
    publishedAt: '12 OCT 2023',
  },
  {
    id: '2',
    title: 'Rencontre avec nos nouveaux auteurs',
    slug: 'rencontre-nouveaux-auteurs',
    excerpt:
      'Trois plumes prometteuses rejoignent la maison Germinale cette saison. Entretien...',
    coverImage: '/images/placeholder-book.svg',
    category: 'INTERVIEW',
    author: {
      name: 'MARC DUBOIS',
      avatar: '/images/placeholder-book.svg',
    },
    publishedAt: '05 OCT 2023',
  },
  {
    id: '3',
    title: 'Les tendances littéraires de 2024',
    slug: 'tendances-litteraires-2024',
    excerpt:
      "Analyse des genres qui captiveront les lecteurs l'année prochaine. Le retour du...",
    coverImage: '/images/placeholder-book.svg',
    category: 'TENDANCES',
    author: {
      name: 'ÉDITIONS GERMINALE',
    },
    publishedAt: '28 SEPT 2023',
  },
];

export default mockCollections;
