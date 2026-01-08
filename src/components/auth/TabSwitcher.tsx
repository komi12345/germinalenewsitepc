'use client';

import { useCallback, KeyboardEvent } from 'react';

export type AuthTab = 'login' | 'register';

export interface TabSwitcherProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
}

/**
 * Composant de basculement entre les onglets Connexion et Inscription
 * Style pill avec fond gris clair, état actif avec fond blanc et bordure
 * Supporte la navigation clavier avec les flèches gauche/droite
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 10.2
 */
export function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  // Gestion de la navigation clavier
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>, currentTab: AuthTab) => {
    const tabs: AuthTab[] = ['login', 'register'];
    const currentIndex = tabs.indexOf(currentTab);
    
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = event.key === 'ArrowLeft' 
        ? (currentIndex - 1 + tabs.length) % tabs.length
        : (currentIndex + 1) % tabs.length;
      onTabChange(tabs[nextIndex]);
    }
  }, [onTabChange]);

  return (
    <div 
      className="flex bg-gray-100 rounded-full p-1 w-full max-w-sm"
      role="tablist"
      aria-label="Type d'authentification"
    >
      {/* Onglet Connexion */}
      <button
        type="button"
        role="tab"
        id="tab-login"
        aria-selected={activeTab === 'login'}
        aria-controls="panel-login"
        tabIndex={activeTab === 'login' ? 0 : -1}
        onClick={() => onTabChange('login')}
        onKeyDown={(e) => handleKeyDown(e, 'login')}
        className={`
          flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
          ${activeTab === 'login'
            ? 'bg-white text-dark border border-gray-200 shadow-sm'
            : 'bg-transparent text-gray-500 hover:text-gray-700'
          }
        `}
      >
        Connexion
      </button>

      {/* Onglet Inscription */}
      <button
        type="button"
        role="tab"
        id="tab-register"
        aria-selected={activeTab === 'register'}
        aria-controls="panel-register"
        tabIndex={activeTab === 'register' ? 0 : -1}
        onClick={() => onTabChange('register')}
        onKeyDown={(e) => handleKeyDown(e, 'register')}
        className={`
          flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
          ${activeTab === 'register'
            ? 'bg-white text-dark border border-gray-200 shadow-sm'
            : 'bg-transparent text-gray-500 hover:text-gray-700'
          }
        `}
      >
        Inscription
      </button>
    </div>
  );
}

export default TabSwitcher;
