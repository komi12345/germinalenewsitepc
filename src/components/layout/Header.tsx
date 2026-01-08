"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

/**
 * Navigation items pour le header
 * Définit les liens de navigation principaux
 */
const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Librairie", href: "/books" },
  { label: "Soumettre un manuscrit", href: "/submit-manuscript" },
];

/**
 * Composant Header - Barre de navigation principale
 * 
 * Fonctionnalités:
 * - Logo Éditions Germinale à gauche (or)
 * - Navigation desktop avec liens (blanc)
 * - Icône recherche et bouton "Mon Compte" à droite
 * - Menu hamburger responsive sur mobile
 * - Background noir avec shadow-sm
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6
 */
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Requirement 2.2: Logo en or */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gold font-serif font-bold text-xl md:text-2xl hover:text-gold-light transition-colors"
          >
            <span>Éditions Germinale</span>
          </Link>

          {/* Navigation Desktop - Requirements 2.3, 2.4: Liens blancs avec hover or */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-light hover:text-gold font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions droite - Requirements 2.3, 2.5 */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Icône recherche */}
            <button
              type="button"
              aria-label="Rechercher"
              className="p-2 text-light hover:text-gold hover:bg-dark-light rounded-lg transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Bouton Mon Compte - Requirement 2.5: bg-gold text-dark */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gold text-dark rounded-lg hover:bg-gold-light transition-colors duration-200"
            >
              <User className="w-4 h-4" />
              <span className="font-medium">Mon Compte</span>
            </Link>

            {/* Icône Mon Compte mobile */}
            <Link
              href="/login"
              aria-label="Mon Compte"
              className="sm:hidden p-2 text-light hover:text-gold hover:bg-dark-light rounded-lg transition-colors duration-200"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Menu hamburger mobile - Requirement 2.6 */}
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-light hover:text-gold hover:bg-dark-light rounded-lg transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile - Requirement 2.6: bg-dark avec text-light */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="bg-dark border-t border-dark-lighter px-4 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-light hover:text-gold hover:bg-dark-light rounded-lg font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
