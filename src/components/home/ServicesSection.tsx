import { cn } from '../../lib/utils';
import {
  FileText,
  Megaphone,
  Globe,
  List,
  Smartphone,
  Users,
} from 'lucide-react';

/**
 * Interface pour une carte de service
 */
interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * Données des services pour les auteurs
 */
const authorServices: ServiceCard[] = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Excellence Éditoriale',
    description:
      'Évaluation complète de manuscrit, édition de développement et relecture pour affiner votre voix.',
  },
  {
    icon: <Megaphone className="w-6 h-6" />,
    title: 'Image & Promotion',
    description:
      "Conception de couverture personnalisée, kits réseaux sociaux et marketing stratégique pour construire votre identité d'auteur.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Distribution Mondiale',
    description:
      'Distribution numérique et imprimée à grande échelle pour que votre livre soit disponible dans les librairies du monde entier.',
  },
];

/**
 * Données des services pour les lecteurs
 */
const readerServices: ServiceCard[] = [
  {
    icon: <List className="w-6 h-6" />,
    title: 'Collections Sélectionnées',
    description:
      'Sélections triées sur le volet couvrant la fiction littéraire, la poésie et les mémoires.',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Application Fluide',
    description:
      "Profitez de notre catalogue sur n'importe quel appareil avec des préférences de lecture personnalisables.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Événements Communautaires',
    description:
      "Rejoignez des clubs de lecture virtuels, des Q&R avec les auteurs et connectez-vous avec d'autres lecteurs.",
  },
];

/**
 * Composant carte de service individuelle
 */
function ServiceCardComponent({ service }: { service: ServiceCard }) {
  return (
    <div
      className={cn(
        'bg-dark-light rounded-2xl',
        'border border-dark-lighter',
        'p-6 md:p-8',
        'text-center',
        'hover:border-gold/50 transition-all duration-300'
      )}
    >
      {/* Icône */}
      <div
        className={cn(
          'w-12 h-12 mx-auto mb-4',
          'flex items-center justify-center',
          'text-gold'
        )}
      >
        {service.icon}
      </div>

      {/* Titre */}
      <h4 className={cn('text-lg font-semibold', 'text-gold', 'mb-3')}>
        {service.title}
      </h4>

      {/* Description */}
      <p className="text-sm text-light-dimmed leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}

/**
 * ServicesSection - Section des services de la homepage
 *
 * Affiche:
 * - Titre principal "Nos Services" avec design élégant
 * - Sous-section "Pour les Auteurs" avec 3 cartes de services
 * - Sous-section "Pour les Lecteurs" avec 3 cartes de services
 *
 * Positionnée après AuthorCTASection
 */
export function ServicesSection() {
  return (
    <section data-testid="services-section">
      {/* En-tête "Nos Services" - Design élégant */}
      <div className="bg-dark pt-16 md:pt-20 pb-8 md:pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Ligne décorative supérieure */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 md:w-20 bg-gold/40" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="h-px w-12 md:w-20 bg-gold/40" />
          </div>

          {/* Titre principal */}
          <h2
            className={cn(
              'text-3xl md:text-4xl lg:text-5xl',
              'font-serif font-bold',
              'text-gold',
              'mb-4'
            )}
          >
            Nos Services
          </h2>

          {/* Sous-titre descriptif */}
          <p
            className={cn(
              'text-base md:text-lg',
              'text-light-dimmed',
              'max-w-2xl mx-auto'
            )}
          >
            Des solutions complètes pour les auteurs et les lecteurs passionnés
          </p>
        </div>
      </div>

      {/* Section Pour les Auteurs - Fond noir */}
      <div className="bg-dark pb-12 md:pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <span
            className={cn(
              'block text-center',
              'text-sm font-medium',
              'text-gold',
              'uppercase tracking-wider',
              'mb-3'
            )}
          >
            ÉDITION
          </span>

          {/* Titre de la sous-section */}
          <h3
            className={cn(
              'text-2xl md:text-3xl lg:text-4xl',
              'font-serif font-bold',
              'text-gold',
              'text-center',
              'mb-4'
            )}
          >
            Pour les Auteurs
          </h3>

          {/* Sous-titre */}
          <p
            className={cn(
              'text-center',
              'text-light-dimmed',
              'max-w-2xl mx-auto',
              'mb-10 md:mb-12'
            )}
          >
            Nous accompagnons les auteurs du premier brouillon jusqu&apos;à la
            mise en rayon avec une gamme de services professionnels conçus pour
            faire briller votre œuvre.
          </p>

          {/* Grille des services auteurs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {authorServices.map((service, index) => (
              <ServiceCardComponent key={index} service={service} />
            ))}
          </div>
        </div>
      </div>

      {/* Section Pour les Lecteurs - Fond noir plus clair */}
      <div className="bg-dark-light py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <span
            className={cn(
              'block text-center',
              'text-sm font-medium',
              'text-gold',
              'uppercase tracking-wider',
              'mb-3'
            )}
          >
            DÉCOUVERTE
          </span>

          {/* Titre de la sous-section */}
          <h3
            className={cn(
              'text-2xl md:text-3xl lg:text-4xl',
              'font-serif font-bold',
              'text-gold',
              'text-center',
              'mb-4'
            )}
          >
            Pour les Lecteurs
          </h3>

          {/* Sous-titre */}
          <p
            className={cn(
              'text-center',
              'text-light-dimmed',
              'max-w-2xl mx-auto',
              'mb-10 md:mb-12'
            )}
          >
            La lecture est un acte communautaire. Notre plateforme est conçue
            pour favoriser la connexion, la découverte et le pur plaisir de se
            perdre dans un bon livre.
          </p>

          {/* Grille des services lecteurs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {readerServices.map((service, index) => (
              <ServiceCardComponent key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
