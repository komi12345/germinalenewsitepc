import { Feather } from "lucide-react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { ManuscriptForm } from "@/src/components/manuscript/ManuscriptForm";
import { TrustIndicators } from "@/src/components/manuscript/TrustIndicators";
import { cn } from "@/src/lib/utils";

/**
 * Page de soumission de manuscrit - Éditions Germinale
 * 
 * Cette page permet aux auteurs de soumettre leurs œuvres littéraires
 * pour évaluation par le comité de lecture.
 * 
 * Structure:
 * - Header avec navigation
 * - Badge "ESPACE AUTEURS" avec icône
 * - Titre "Soumettez votre manuscrit"
 * - Paragraphe d'introduction avec délai de réponse
 * - Formulaire ManuscriptForm
 * - Indicateurs de confiance TrustIndicators
 * - Footer
 * 
 * Requirements: 1.1, 1.2, 1.3, 7.4
 */
export default function SubmitManuscriptPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      {/* Header avec navigation */}
      <Header />

      {/* Contenu principal */}
      <main className="flex-1">
        {/* Section En-tête de la page */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge ESPACE AUTEURS - Requirement 1.1 */}
            <div
              className={cn(
                "inline-flex items-center gap-2",
                "px-4 py-2",
                "bg-gold/10",
                "rounded-full",
                "mb-6"
              )}
              data-testid="author-badge"
            >
              <Feather className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-gold tracking-wide">
                ESPACE AUTEURS
              </span>
            </div>

            {/* Titre - Requirement 1.2 */}
            <h1
              className={cn(
                "text-3xl md:text-4xl lg:text-5xl",
                "font-serif font-bold",
                "text-gold",
                "mb-4 md:mb-6"
              )}
              data-testid="page-title"
            >
              Soumettez votre manuscrit
            </h1>

            {/* Paragraphe d'introduction - Requirement 1.3 */}
            <p
              className={cn(
                "text-base md:text-lg",
                "text-light-dimmed",
                "max-w-2xl mx-auto",
                "leading-relaxed"
              )}
              data-testid="page-intro"
            >
              Vous avez écrit un livre et souhaitez le faire publier ? 
              Soumettez votre manuscrit à notre comité de lecture. 
              Nous nous engageons à vous répondre sous 4 semaines.
            </p>
          </div>
        </section>

        {/* Section Formulaire - Requirement 7.4 (responsive) */}
        <section className="pb-12 md:pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            <ManuscriptForm />
          </div>
        </section>

        {/* Section Indicateurs de confiance */}
        <TrustIndicators />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
