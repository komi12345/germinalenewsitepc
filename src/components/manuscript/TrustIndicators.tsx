import { cn } from '../../lib/utils';
import { Clock, ShieldCheck, HelpCircle } from 'lucide-react';

/**
 * Interface pour un indicateur de confiance
 */
interface TrustIndicator {
  icon: 'clock' | 'shield' | 'help';
  title: string;
  description: string;
}

/**
 * Les 3 indicateurs de confiance pour la page de soumission de manuscrit
 * Définis selon les requirements 6.1, 6.2, 6.3, 6.4
 */
const trustIndicators: TrustIndicator[] = [
  {
    icon: 'clock',
    title: 'DÉLAI DE RÉPONSE',
    description: "Notre comité s'engage à vous répondre sous 4 à 6 semaines.",
  },
  {
    icon: 'shield',
    title: 'CONFIDENTIALITÉ',
    description:
      'Votre manuscrit reste votre propriété intellectuelle exclusive.',
  },
  {
    icon: 'help',
    title: 'AIDE',
    description: "Besoin d'aide ? Contactez support@editions-germinale.com",
  },
];

/**
 * Composant pour afficher l'icône correspondante à chaque indicateur
 */
function IndicatorIcon({ icon }: { icon: TrustIndicator['icon'] }) {
  const iconClasses = 'w-8 h-8 text-gold';

  switch (icon) {
    case 'clock':
      return <Clock className={iconClasses} data-testid="icon-clock" />;
    case 'shield':
      return <ShieldCheck className={iconClasses} data-testid="icon-shield" />;
    case 'help':
      return <HelpCircle className={iconClasses} data-testid="icon-help" />;
    default:
      return null;
  }
}

/**
 * TrustIndicators - Indicateurs de confiance pour la page de soumission de manuscrit
 *
 * Affiche trois colonnes avec:
 * - DÉLAI DE RÉPONSE: icône horloge + texte sur le délai de 4-6 semaines
 * - CONFIDENTIALITÉ: icône bouclier/check + texte sur la propriété intellectuelle
 * - AIDE: icône point d'interrogation + email de support
 *
 * Utilise la palette de couleurs Éditions Germinale (primary: #2C5F4F)
 *
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */
export function TrustIndicators() {
  return (
    <section
      className="py-12 px-4 bg-dark"
      data-testid="trust-indicators-section"
    >
      <div className="max-w-5xl mx-auto">
        {/* 3 colonnes d'indicateurs */}
        <div
          className={cn('grid gap-8 md:gap-12', 'grid-cols-1 md:grid-cols-3')}
          data-testid="indicators-container"
        >
          {trustIndicators.map((indicator, index) => (
            <div
              key={indicator.title}
              className={cn('flex flex-col items-center', 'text-center', 'p-6')}
              data-testid={`indicator-${index + 1}`}
            >
              {/* Icône */}
              <div
                className={cn(
                  'w-16 h-16',
                  'rounded-full',
                  'bg-gold/10',
                  'flex items-center justify-center',
                  'mb-4'
                )}
              >
                <IndicatorIcon icon={indicator.icon} />
              </div>

              {/* Titre de l'indicateur */}
              <h3
                className={cn(
                  'text-sm md:text-base',
                  'font-bold',
                  'text-gold',
                  'tracking-wide',
                  'mb-3'
                )}
              >
                {indicator.title}
              </h3>

              {/* Description */}
              <p
                className={cn(
                  'text-sm md:text-base',
                  'text-light-dimmed',
                  'leading-relaxed',
                  'max-w-xs'
                )}
              >
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustIndicators;
