import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/src/components/providers";
import "./globals.css";

/**
 * Configuration de la police Inter pour le texte principal
 * Police sans-serif moderne et lisible
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Configuration de la police Playfair Display pour les titres
 * Police serif élégante pour les headings
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Metadata SEO pour la homepage Éditions Germinale
 * Optimisé pour le référencement et le partage social
 * 
 * Requirements: 9.5
 */
export const metadata: Metadata = {
  title: {
    default: "Éditions Germinale - La littérature qui vous ressemble",
    template: "%s | Éditions Germinale",
  },
  description:
    "Découvrez notre maison d'édition dédiée aux voix africaines. Des histoires authentiques, des auteurs passionnés, une littérature qui célèbre notre richesse culturelle.",
  keywords: [
    "éditions germinale",
    "maison d'édition",
    "littérature africaine",
    "livres numériques",
    "ebooks",
    "auteurs africains",
    "littérature francophone",
    "FCFA",
  ],
  authors: [{ name: "Éditions Germinale" }],
  creator: "Éditions Germinale",
  publisher: "Éditions Germinale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Éditions Germinale",
    title: "Éditions Germinale - La littérature qui vous ressemble",
    description:
      "Découvrez notre maison d'édition dédiée aux voix africaines. Des histoires authentiques, des auteurs passionnés.",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Éditions Germinale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Éditions Germinale - La littérature qui vous ressemble",
    description:
      "Découvrez notre maison d'édition dédiée aux voix africaines.",
    images: ["/images/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * RootLayout - Layout principal de l'application
 * 
 * Configure:
 * - Les polices Inter (texte) et Playfair Display (titres)
 * - Import des styles globaux
 * - Langue française
 * - Classes CSS pour les variables de police
 * 
 * Requirements: 9.5
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-dark text-light">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
