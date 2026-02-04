import { cn } from '../../lib/utils';
import { Search, ShoppingCart, BookOpen } from 'lucide-react';

/**
 * Interface pour une étape du processus
 */
interface Step {
  icon: 'search' | 'cart' | 'book';
  title: string;
  description: string;
}

/**
 * Les 3 étapes du processus "Comment ça marche"
 * Définies selon le design document
 */
const steps: Step[] = [
  {
    icon: 'search',
    title: 'Découvrez',
    description:
      'Parcourez notre catalogue riche sur le web, par nos soins littéraires.',
  },
  {
    icon: 'cart',
    title: 'Commandez',
    description:
      "Une expérience d'achat facile avec FedaPay, adapté au format numérique moderne.",
  },
  {
    icon: 'book',
    title: 'Savourez',
    description:
      'Plongez dans votre lecture et rejoignez notre communauté de passionnés.',
  },
];

/**
 * Composant pour afficher l'icône correspondante à chaque étape
 */
function StepIcon({ icon }: { icon: Step['icon'] }) {
  const iconClasses = 'w-10 h-10 text-gold';

  switch (icon) {
    case 'search':
      return <Search className={iconClasses} />;
    case 'cart':
      return <ShoppingCart className={iconClasses} />;
    case 'book':
      return <BookOpen className={iconClasses} />;
    default:
      return null;
  }
}

/**
 * HowItWorksSection - Section "Comment ça marche ?" de la homepage
 *
 * Affiche:
 * - Background gris clair (#F5F5F5)
 * - Titre "Comment ça marche ?" centré
 * - Sous-titre explicatif
 * - 3 étapes avec icônes vertes, titres et descriptions
 *
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7
 */
export function HowItWorksSection() {
  return (
    <section className="py-16 px-4 bg-dark" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto">
        {/* Titre centré */}
        <h2
          className={cn(
            'text-2xl md:text-3xl lg:text-4xl',
            'font-serif font-bold',
            'text-gold',
            'text-center',
            'mb-4'
          )}
        >
          Comment ça marche ?
        </h2>

        {/* Sous-titre explicatif */}
        <p
          className={cn(
            'text-base md:text-lg',
            'text-light-dimmed',
            'text-center',
            'max-w-2xl mx-auto',
            'mb-12'
          )}
        >
          Un processus simple en trois étapes pour accéder à vos livres préférés
        </p>

        {/* 3 étapes */}
        <div
          className={cn('grid gap-8 md:gap-12', 'grid-cols-1 md:grid-cols-3')}
          data-testid="steps-container"
        >
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={cn('flex flex-col items-center', 'text-center', 'p-6')}
              data-testid={`step-${index + 1}`}
            >
              {/* Icône dans un cercle */}
              <div
                className={cn(
                  'w-20 h-20',
                  'rounded-full',
                  'bg-gold/10',
                  'flex items-center justify-center',
                  'mb-6'
                )}
              >
                <StepIcon icon={step.icon} />
              </div>

              {/* Titre de l'étape */}
              <h3
                className={cn(
                  'text-xl md:text-2xl',
                  'font-semibold',
                  'text-gold',
                  'mb-3'
                )}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className={cn(
                  'text-sm md:text-base',
                  'text-light',
                  'leading-relaxed',
                  'max-w-xs'
                )}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
