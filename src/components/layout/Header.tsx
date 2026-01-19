 "use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  User,
  BookOpen,
  Settings,
  LogOut,
  Library,
  FileText,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuthStore, useNotificationStore } from "@/src/store";
import { signOut } from "@/src/lib/actions/auth";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Librairie", href: "/books" },
  { label: "Soumettre un manuscrit", href: "/submit-manuscript" },
];

const profileMenuItems = [
  { label: "Mon profil", href: "/profile", icon: User },
  { label: "Ma bibliothèque", href: "/library", icon: Library },
  { label: "Mes commandes", href: "/orders", icon: ShoppingBag },
  { label: "Mes manuscrits", href: "/manuscripts", icon: FileText },
  { label: "Paramètres", href: "/settings", icon: Settings },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const { user, profile, isAuthenticated, logout } = useAuthStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotificationStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (logoutMessage) {
      const timer = setTimeout(() => {
        setLogoutMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [logoutMessage]);

  const handleSignOut = async () => {
    setIsProfileOpen(false);
    const result = await signOut();

    if (result?.error) {
      setLogoutMessage(result.error);
      return;
    }

    logout();
    setLogoutMessage("Vous avez été déconnecté avec succès.");
    router.push("/");
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <header className="sticky top-0 z-50 bg-dark border-b border-dark-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {logoutMessage && (
          <div className="mb-2 rounded-lg bg-dark-light border border-dark-lighter px-4 py-2 text-sm text-light flex items-center justify-between">
            <span>{logoutMessage}</span>
            <button
              type="button"
              onClick={() => setLogoutMessage(null)}
              className="ml-4 text-light-dimmed hover:text-gold transition-colors"
            >
              ×
            </button>
          </div>
        )}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-gold font-serif font-bold text-xl md:text-2xl hover:text-gold-light transition-colors"
          >
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-gold" />
            </div>
            <span className="hidden sm:inline">Éditions Germinale</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-light hover:text-gold font-medium transition-colors duration-200 py-2",
                  pathname === item.href && "text-gold"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Bouton recherche */}
            <button
              type="button"
              aria-label="Rechercher"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={cn(
                "p-2.5 rounded-lg transition-colors duration-200",
                isSearchOpen
                  ? "bg-gold text-dark"
                  : "text-light hover:text-gold hover:bg-dark-light"
              )}
            >
              <Search className="w-5 h-5" />
            </button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    type="button"
                    aria-label="Notifications"
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={cn(
                      "p-2.5 rounded-lg transition-colors duration-200 relative",
                      isNotificationsOpen
                        ? "bg-gold text-dark"
                        : "text-light hover:text-gold hover:bg-dark-light"
                    )}
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Dropdown notifications */}
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-dark-light border border-dark-lighter rounded-xl shadow-xl overflow-hidden z-50">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-dark-lighter">
                        <h3 className="font-semibold text-gold">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={() => markAllAsRead()}
                            className="text-sm text-light-dimmed hover:text-gold transition-colors"
                          >
                            Tout marquer comme lu
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              onClick={() => markAsRead(notification.id)}
                              className={cn(
                                "px-4 py-3 border-b border-dark-lighter hover:bg-dark-lighter cursor-pointer transition-colors",
                                !notification.is_read && "bg-gold/5"
                              )}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={cn(
                                    "w-2 h-2 mt-2 rounded-full flex-shrink-0",
                                    !notification.is_read
                                      ? "bg-gold"
                                      : "bg-dark-lighter"
                                  )}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-light text-sm">
                                    {notification.title}
                                  </p>
                                  <p className="text-light-dimmed text-sm truncate">
                                    {notification.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-light-dimmed">
                            Aucune notification
                          </div>
                        )}
                      </div>
                      {notifications.length > 0 && (
                        <Link
                          href="/notifications"
                          className="block px-4 py-3 text-center text-gold hover:bg-dark-lighter transition-colors text-sm font-medium"
                        >
                          Voir toutes les notifications
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                {/* Menu profil */}
                <div className="relative" ref={profileRef}>
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1.5 rounded-full border transition-colors duration-200",
                      isProfileOpen
                        ? "bg-gold/10 border-gold"
                        : "border-dark-lighter hover:border-gold/50"
                    )}
                  >
                    {profile?.avatar_url ? (
                      <Image
                        src={profile.avatar_url}
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-medium text-sm">
                        {getInitials()}
                      </div>
                    )}
                    <span className="hidden md:inline text-light font-medium text-sm max-w-24 truncate">
                      {profile?.full_name || "Profil"}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-light-dimmed transition-transform duration-200",
                        isProfileOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Dropdown profil */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-dark-light border border-dark-lighter rounded-xl shadow-xl overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-dark-lighter">
                        <p className="font-medium text-light truncate">
                          {profile?.full_name || "Utilisateur"}
                        </p>
                        <p className="text-sm text-light-dimmed truncate">
                          {user?.email}
                        </p>
                      </div>
                      <div className="py-2">
                        {profileMenuItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-light hover:bg-dark-lighter hover:text-gold transition-colors"
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-dark-lighter py-2">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-red-400 hover:bg-dark-lighter transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Bouton connexion pour visiteurs */
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gold text-dark rounded-lg hover:bg-gold-light transition-colors duration-200 font-medium"
              >
                <User className="w-4 h-4" />
                <span>Mon Compte</span>
              </Link>
            )}

            {/* Icône Mon Compte mobile */}
            {!isAuthenticated && (
              <Link
                href="/login"
                aria-label="Mon Compte"
                className="sm:hidden p-2.5 text-light hover:text-gold hover:bg-dark-light rounded-lg transition-colors duration-200"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Menu hamburger mobile */}
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-light hover:text-gold hover:bg-dark-light rounded-lg transition-colors duration-200"
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

      {/* Barre de recherche */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out border-t border-dark-lighter",
          isSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0 border-t-0"
        )}
      >
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light-dimmed" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un livre, un auteur, une collection..."
              className="w-full pl-12 pr-4 py-3 bg-dark-light border border-dark-lighter rounded-xl text-light placeholder:text-light-dimmed focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="bg-dark border-t border-dark-lighter px-4 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg font-medium transition-colors duration-200",
                    pathname === item.href
                      ? "bg-gold/10 text-gold"
                      : "text-light hover:text-gold hover:bg-dark-light"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {isAuthenticated && (
            <>
              <div className="h-px bg-dark-lighter my-4" />
              <ul className="space-y-1">
                {profileMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-light hover:text-gold hover:bg-dark-light rounded-lg transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-dark-light rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                  </button>
                </li>
              </ul>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
