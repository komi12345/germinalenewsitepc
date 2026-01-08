import Image from "next/image";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { ArrowRight, Quote } from "lucide-react";

/**
 * DirectorMessageSection - Section "Mot du Directeur" de la homepage
 * 
 * Affiche un message de bienvenue du directeur général avec:
 * - Photo du directeur à gauche avec nom et titre
 * - Message éditorial à droite avec citation et paragraphes
 * - Lien vers "Notre Histoire"
 * 
 * Placée entre HeroSection et CollectionsSection
 */
export function DirectorMessageSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-dark-light">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Colonne gauche - Photo du directeur */}
          <div className="relative">
            {/* Conteneur de la photo avec effet de fond */}
            <div className="relative">
              {/* Fond décoratif */}
              <div 
                className="absolute -bottom-4 -right-4 w-full h-full bg-gold/20 rounded-2xl"
                aria-hidden="true"
              />
              
              {/* Photo du directeur */}
              <div className="relative bg-dark-lighter rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/placeholder-director.svg"
                  alt="Jean-Marc Valéry, Directeur Général d'Éditions Germinale"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority={false}
                />
                
                {/* Overlay avec nom et titre */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/90 to-transparent p-6">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-light">
                    Jean-Marc Valéry
                  </h3>
                  <p className="text-gold text-sm md:text-base">
                    Directeur Général
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Message éditorial */}
          <div className="space-y-6">
            {/* Badge éditorial */}
            <div className="flex items-center gap-2">
              <Quote className="w-5 h-5 text-gold" />
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">
                Éditorial
              </span>
            </div>

            {/* Titre principal */}
            <h2 className={cn(
              "text-3xl md:text-4xl lg:text-5xl",
              "font-serif font-bold",
              "text-light"
            )}>
              Mot de Bienvenue du{" "}
              <span className="text-gold">Directeur Général</span>
            </h2>

            {/* Citation principale */}
            <blockquote className="border-l-4 border-gold pl-6 py-2">
              <p className="text-light-muted text-lg md:text-xl italic leading-relaxed">
                Bienvenue chez <span className="text-gold font-semibold">Éditions Germinale</span>. 
                Notre maison d&apos;édition numérique incarne l&apos;alliance parfaite entre 
                l&apos;élégance littéraire traditionnelle et l&apos;innovation technologique.
              </p>
            </blockquote>

            {/* Paragraphes du message */}
            <div className="space-y-4 text-light-dimmed leading-relaxed">
              <p>
                Nous croyons en une édition chaleureuse, accessible et résolument tournée vers l&apos;avenir, 
                offrant à chaque auteur et lecteur une expérience unique. Dans un monde où le numérique 
                peut parfois sembler froid, nous nous efforçons de remettre l&apos;humain au cœur de chaque 
                interaction, de chaque page tournée, qu&apos;elle soit de papier ou de pixels.
              </p>
              <p>
                Notre mission est de dénicher les voix singulières qui façonneront la littérature de demain. 
                Nous ne nous contentons pas de publier des livres ; nous cultivons des imaginaires, nous 
                faisons germer des idées. Chaque ouvrage qui rejoint notre catalogue est une promesse 
                tenue envers la qualité et l&apos;authenticité.
              </p>
              <p>
                C&apos;est avec une immense fierté et un enthousiasme renouvelé que je vous invite à parcourir 
                notre catalogue et à découvrir notre univers, où chaque mot compte et chaque histoire résonne.
              </p>
            </div>

            {/* Lien vers Notre Histoire */}
            <Link
              href="/about"
              className={cn(
                "inline-flex items-center gap-2",
                "text-light font-semibold",
                "hover:text-gold",
                "transition-colors duration-200",
                "group"
              )}
            >
              Notre Histoire
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DirectorMessageSection;
