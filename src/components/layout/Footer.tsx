import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

/**
 * Liens de navigation "Explorer"
 */
const explorerLinks = [
  { label: 'Nouveautés', href: '/books?sort=newest' },
  { label: 'Meilleures ventes', href: '/books?sort=bestsellers' },
  { label: 'Collections', href: '/collections' },
  { label: 'Auteurs', href: '/authors' },
];

/**
 * Liens de navigation "À propos"
 */
const aboutLinks = [
  { label: 'Notre histoire', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Presse', href: '/press' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Liens légaux
 */
const legalLinks = [
  { label: 'Mentions légales', href: '/legal' },
  { label: 'Politique de confidentialité', href: '/privacy' },
  { label: 'CGV', href: '/terms' },
];

/**
 * Réseaux sociaux
 */
const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
];

/**
 * Composant Footer - Pied de page du site
 *
 * Structure:
 * - 4 colonnes: Logo/Social, Explorer, À propos, Newsletter
 * - Icônes réseaux sociaux (Facebook, Twitter, Instagram)
 * - Input email + bouton S'inscrire pour newsletter
 * - Copyright et liens légaux en bas
 * - Background noir avec bordure supérieure
 * - Responsive: colonnes empilées sur mobile
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-dark-lighter">
      {/* Section principale avec les 4 colonnes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Colonne 1: Logo + Tagline + Réseaux sociaux - Requirements 3.1, 3.2 */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block text-gold font-serif font-bold text-xl md:text-2xl hover:text-gold-light transition-colors"
            >
              Éditions Germinale
            </Link>
            <p className="mt-4 text-light-dimmed text-sm leading-relaxed">
              La littérature qui vous ressemble. Découvrez des œuvres uniques
              d&apos;auteurs africains et francophones.
            </p>

            {/* Icônes réseaux sociaux - Requirement 3.5 */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 text-light-dimmed hover:text-gold hover:bg-dark-light rounded-lg transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2: Explorer - Requirements 3.3, 3.4, 3.5 */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">Explorer</h3>
            <ul className="space-y-3">
              {explorerLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-light-dimmed hover:text-gold transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3: À propos - Requirements 3.3, 3.4, 3.5 */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">À propos</h3>
            <ul className="space-y-3">
              {aboutLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-light-dimmed hover:text-gold transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4: Newsletter - Requirements 3.6, 3.7 */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-light-dimmed text-sm mb-4">
              Recevez nos dernières actualités et nouveautés littéraires.
            </p>
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </div>

      {/* Barre inférieure: Copyright + Liens légaux */}
      <div className="border-t border-dark-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-light-dimmed text-sm text-center md:text-left">
              © {currentYear} Éditions Germinale. Tous droits réservés.
            </p>

            {/* Liens légaux */}
            <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {legalLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-light-dimmed hover:text-gold text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
