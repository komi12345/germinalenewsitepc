import Link from "next/link";
import { cn } from "../../lib/utils";
import { ArrowRight } from "lucide-react";

/**
 * HeroSection - Section principale de la page d'accueil
 * Affiche une image de fond bibliothèque avec overlay sombre,
 * un titre accrocheur, un sous-titre et un bouton CTA
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6
 */
export function HeroSection() {
  return (
    <section
      className={cn(
        "relative w-full h-[500px] md:h-[600px]",
        "flex items-center justify-center",
        "overflow-hidden"
      )}
    >
      {/* Image de fond bibliothèque */}
      {/* Note: Remplacer par une vraie image de bibliothèque */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-dark"
        style={{
          backgroundImage: "url('/images/hero-library.jpg')",
          backgroundColor: "#0A0A0A", // Fallback si image non disponible
        }}
        aria-hidden="true"
      />

      {/* Overlay sombre pour lisibilité du texte */}
      <div
        className="absolute inset-0 bg-black/60"
        aria-hidden="true"
      />

      {/* Contenu centré */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Titre principal */}
        <h1
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl",
            "font-serif font-bold",
            "text-gold",
            "mb-6"
          )}
        >
          La littérature qui vous ressemble
        </h1>

        {/* Sous-titre descriptif */}
        <p
          className={cn(
            "text-lg md:text-xl",
            "text-white",
            "mb-8 md:mb-10",
            "max-w-2xl mx-auto",
            "leading-relaxed"
          )}
        >
          Découvrez notre maison d&apos;édition dédiée aux voix africaines. 
          Des histoires authentiques, des auteurs passionnés, une littérature 
          qui célèbre notre richesse culturelle.
        </p>

        {/* Bouton CTA */}
        <Link
          href="/collections"
          className={cn(
            "inline-flex items-center gap-2",
            "bg-gold text-dark",
            "px-6 py-3 md:px-8 md:py-4",
            "rounded-xl",
            "font-medium text-base md:text-lg",
            "hover:bg-gold-light",
            "transition-colors duration-200",
            "shadow-lg hover:shadow-xl"
          )}
        >
          Découvrir nos collections
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
