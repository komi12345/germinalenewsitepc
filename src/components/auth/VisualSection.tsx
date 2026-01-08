'use client';

import Image from 'next/image';

export interface VisualSectionProps {
  quote?: string;
  subtitle?: string;
  backgroundImage?: string;
}

/**
 * Section visuelle gauche de la page d'authentification
 * Affiche une image de bibliothèque avec overlay sombre, citation et pagination
 * Masquée sur mobile (< 768px)
 * Requirements: 1.3, 1.4, 1.5, 1.6, 8.1
 */
export function VisualSection({
  quote = "L'écriture est la peinture de la voix.",
  subtitle = "Rejoignez notre communauté d'auteurs et de lecteurs passionnés",
  backgroundImage = '/images/hero-library.jpg',
}: VisualSectionProps) {
  return (
    <section
      className="hidden md:flex relative w-1/2 min-h-screen flex-col justify-center items-center"
      aria-label="Section visuelle"
    >
      {/* Image de fond avec overlay sombre */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Bibliothèque"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 lg:px-12 text-center max-w-lg">
        {/* Citation inspirante */}
        <blockquote className="mb-6">
          <p className="text-2xl lg:text-3xl xl:text-4xl font-serif text-white leading-relaxed italic">
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>

        {/* Sous-titre descriptif */}
        <p className="text-light-muted text-sm lg:text-base mb-8">
          {subtitle}
        </p>

        {/* Points de pagination (3 dots) */}
        <div className="flex items-center gap-2" role="group" aria-label="Indicateurs de page">
          <span 
            className="w-2 h-2 rounded-full bg-gold" 
            aria-current="true"
            aria-label="Page 1 (active)"
          />
          <span 
            className="w-2 h-2 rounded-full bg-white/40" 
            aria-label="Page 2"
          />
          <span 
            className="w-2 h-2 rounded-full bg-white/40" 
            aria-label="Page 3"
          />
        </div>
      </div>
    </section>
  );
}

export default VisualSection;
