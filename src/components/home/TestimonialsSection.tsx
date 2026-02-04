'use client';

import { cn } from '../../lib/utils';
import { Star, Pencil } from 'lucide-react';
import Image from 'next/image';

/**
 * Données des témoignages clients
 */
const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "Un chef-d'œuvre absolu. J'ai dévoré ce livre en une soirée. La qualité du papier et la mise en page rendent la lecture incroyablement agréable.",
    author: 'Sophie M.',
    subtitle: "sur L'Aube des Temps",
    avatar: '/images/placeholder-book.svg',
    verified: true,
  },
  {
    id: 2,
    rating: 5,
    text: "Une maison d'édition qui prend soin de ses auteurs et de ses lecteurs. Le service client est d'une rare gentillesse. Merci pour tout.",
    author: 'Marc D.',
    subtitle: 'Lecteur fidèle depuis 2021',
    avatar: '/images/placeholder-book.svg',
    verified: true,
  },
  {
    id: 3,
    rating: 4.5,
    text: "La collection Poésie est une pure merveille. J'ai commandé trois ouvrages pour offrir, ils sont arrivés dans un emballage sublime.",
    author: 'Clara T.',
    subtitle: 'sur Anthologie 2023',
    avatar: '/images/placeholder-book.svg',
    verified: true,
  },
];

/**
 * Composant pour afficher les étoiles de notation
 */
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <Star key={index} className="w-5 h-5 fill-gold text-gold" />;
        } else if (index === fullStars && hasHalfStar) {
          return (
            <div key={index} className="relative w-5 h-5">
              <Star className="absolute w-5 h-5 text-dark-lighter" />
              <div className="absolute overflow-hidden w-1/2">
                <Star className="w-5 h-5 fill-gold text-gold" />
              </div>
            </div>
          );
        } else {
          return <Star key={index} className="w-5 h-5 text-dark-lighter" />;
        }
      })}
    </div>
  );
}

/**
 * Carte de témoignage individuelle
 */
function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div
      className={cn(
        'bg-dark-lighter rounded-2xl p-6',
        'border border-dark-lighter',
        'hover:border-gold/30',
        'transition-all duration-200',
        'flex flex-col h-full'
      )}
    >
      {/* Étoiles */}
      <StarRating rating={testimonial.rating} />

      {/* Texte du témoignage */}
      <p className="text-light text-base leading-relaxed flex-1 mb-6">
        &quot;{testimonial.text}&quot;
      </p>

      {/* Auteur */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-dark overflow-hidden shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.author}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-light">{testimonial.author}</span>
            {testimonial.verified && (
              <span className="w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5 text-dark"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
          <span className="text-sm text-gold">{testimonial.subtitle}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Avatars groupés pour la section CTA
 */
function AvatarGroup() {
  return (
    <div className="flex -space-x-2">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="w-8 h-8 rounded-full border-2 border-dark-light bg-dark overflow-hidden"
        >
          <Image
            src="/images/placeholder-book.svg"
            alt={`Lecteur ${i}`}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * TestimonialsSection - Section témoignages clients de la homepage
 *
 * Affiche:
 * - Label "TÉMOIGNAGES" en couleur secondary (orange)
 * - Titre "Ce que nos lecteurs disent de nous"
 * - Sous-titre descriptif
 * - 3 cartes de témoignages avec étoiles, texte et auteur
 * - Section CTA "Vous avez aimé nos ouvrages ?"
 * - Bouton "Laisser un avis"
 * - Compteur de lecteurs satisfaits
 */
export function TestimonialsSection() {
  return (
    <section
      className={cn('py-16 md:py-20 px-4', 'bg-dark-light')}
      data-testid="testimonials-section"
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-12">
          {/* Label */}
          <span
            className={cn(
              'inline-block',
              'text-sm font-semibold',
              'text-gold',
              'uppercase tracking-wider',
              'mb-4'
            )}
          >
            TÉMOIGNAGES
          </span>

          {/* Titre */}
          <h2
            className={cn(
              'text-2xl md:text-3xl lg:text-4xl',
              'font-serif font-bold',
              'text-gold',
              'mb-4'
            )}
          >
            Ce que nos lecteurs disent de nous
          </h2>

          {/* Sous-titre */}
          <p className="text-light-dimmed max-w-2xl mx-auto">
            Découvrez comment nos ouvrages accompagnent le quotidien de nos
            lecteurs passionnés.
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Section CTA "Laisser un avis" */}
        <div className="text-center">
          {/* Titre CTA */}
          <h3
            className={cn(
              'text-xl md:text-2xl',
              'font-serif font-bold',
              'text-gold',
              'mb-3'
            )}
          >
            Vous avez aimé nos ouvrages ?
          </h3>

          {/* Sous-titre CTA */}
          <p className="text-light-dimmed max-w-lg mx-auto mb-6">
            Votre avis compte énormément pour nous. Partagez votre expérience
            avec notre communauté de lecteurs passionnés.
          </p>

          {/* Bouton "Laisser un avis" */}
          <button
            className={cn(
              'inline-flex items-center gap-2',
              'bg-gold hover:bg-gold-light',
              'text-dark font-medium',
              'px-6 py-3 rounded-xl',
              'transition-colors duration-200',
              'shadow-md hover:shadow-lg'
            )}
          >
            <Pencil className="w-4 h-4" />
            Laisser un avis
          </button>

          {/* Compteur de lecteurs */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <AvatarGroup />
            <span className="text-sm text-light-dimmed">
              Rejoignez plus de 2 000 lecteurs satisfaits
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
