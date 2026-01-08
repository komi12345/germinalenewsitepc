import Link from "next/link";
import { cn } from "../../lib/utils";
import { ArrowRight } from "lucide-react";

/**
 * AuthorCTASection - Section "Appel aux auteurs" de la homepage
 * 
 * Affiche:
 * - Background vert foncé (primary #2C5F4F)
 * - Label "Appel aux auteurs"
 * - Titre "Vous avez une histoire à raconter ?"
 * - Description encourageante
 * - Bouton blanc "Soumettre mon manuscrit" avec flèche
 * 
 * Note: Le titre "Nos Services" est maintenant dans ServicesSection
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6
 */
export function AuthorCTASection() {
  return (
    <section
      className={cn(
        "py-12 md:py-16 px-4",
        "bg-dark-light"
      )}
      data-testid="author-cta-section"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Label "Appel aux auteurs" */}
        <span
          className={cn(
            "inline-block",
            "text-sm md:text-base",
            "text-light-dimmed",
            "uppercase tracking-wider",
            "mb-4"
          )}
        >
          Appel aux auteurs
        </span>

        {/* Titre principal */}
        <h3
          className={cn(
            "text-2xl md:text-3xl lg:text-4xl",
            "font-serif font-bold",
            "text-gold",
            "mb-6"
          )}
        >
          Vous avez une histoire à raconter ?
        </h3>

        {/* Description encourageante */}
        <p
          className={cn(
            "text-base md:text-lg",
            "text-light",
            "max-w-2xl mx-auto",
            "mb-8 md:mb-10",
            "leading-relaxed"
          )}
        >
          Éditions Germinale accompagne les auteurs africains dans la publication 
          de leurs œuvres. Partagez votre talent avec le monde et rejoignez notre 
          communauté d&apos;écrivains passionnés.
        </p>

        {/* Bouton CTA or */}
        <Link
          href="/submit-manuscript"
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
          Soumettre mon manuscrit
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

export default AuthorCTASection;
