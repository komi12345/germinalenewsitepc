import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

/**
 * FooterSimple - Version simplifiée du footer
 *
 * Affiche:
 * - Logo "Éditions Germinale" (or)
 * - Liens légaux (blanc avec hover or)
 * - Icônes réseaux sociaux (blanc avec hover or)
 * - Copyright (blanc)
 * - Background noir avec bordure supérieure
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */
export function FooterSimple() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-dark-lighter mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          {/* Ligne principale */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo - Requirement 3.2: Logo en or */}
            <Link
              href="/"
              className="text-gold font-serif font-bold text-xl hover:text-gold-light transition-colors"
            >
              Éditions Germinale
            </Link>

            {/* Liens légaux - Requirements 3.4, 3.5: Liens blancs avec hover or */}
            <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <Link
                href="/mentions-legales"
                className="text-light-dimmed hover:text-gold text-sm transition-colors"
              >
                Mentions Légales
              </Link>
              <Link
                href="/confidentialite"
                className="text-light-dimmed hover:text-gold text-sm transition-colors"
              >
                Confidentialité
              </Link>
              <Link
                href="/contact"
                className="text-light-dimmed hover:text-gold text-sm transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Réseaux sociaux - Requirement 3.5: Hover or */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-dimmed hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-dimmed hover:text-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-dimmed hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-dimmed hover:text-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-dark-lighter pt-4">
            <p className="text-light-dimmed text-sm text-center">
              © {currentYear} Éditions Germinale. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSimple;
