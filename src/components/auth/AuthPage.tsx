'use client';

import { useState } from 'react';
import { VisualSection } from './VisualSection';
import { FormSection } from './FormSection';
import type { AuthTab } from './TabSwitcher';

export interface AuthPageProps {
  defaultTab?: AuthTab;
}

/**
 * Composant principal de la page d'authentification
 * Layout split-screen avec VisualSection à gauche (50%) et FormSection à droite (50%)
 * Responsive: formulaire seul sur mobile (< 768px)
 * Requirements: 1.1, 1.2, 8.2, 8.3, 10.1, 10.2, 10.3, 10.4
 */
export function AuthPage({ defaultTab = 'login' }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>(defaultTab);

  const handleTabChange = (tab: AuthTab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Skip link pour navigation clavier - Requirements: 10.2 */}
      <a
        href="#auth-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-white focus:rounded-lg focus:outline-none"
      >
        Aller au formulaire
      </a>

      {/* Section visuelle gauche - masquée sur mobile */}
      <VisualSection
        quote="L'écriture est la peinture de la voix."
        subtitle="Rejoignez notre communauté d'auteurs et de lecteurs passionnés"
        backgroundImage="/images/hero-library.jpg"
      />

      {/* Section formulaire droite - pleine largeur sur mobile */}
      <main 
        id="auth-form"
        className="w-full md:w-1/2 min-h-screen"
        role="main"
        aria-label={activeTab === 'login' ? 'Formulaire de connexion' : "Formulaire d'inscription"}
      >
        <FormSection
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </main>
    </div>
  );
}

export default AuthPage;
