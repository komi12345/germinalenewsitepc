'use client';

import { cn } from '../../lib/utils';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useState } from 'react';

/**
 * Informations de contact
 */
const contactInfo = {
  email: {
    value: 'hello@editionsgerminale.com',
    note: 'Nous répondons sous 24 heures.',
  },
  phone: {
    value: '+228 90 12 34 56',
    note: 'Lun-Ven, 9h - 18h GMT',
  },
  address: {
    line1: '123 Boulevard du Livre,',
    line2: 'Lomé, Togo',
  },
};

/**
 * Options de sujet pour le formulaire
 */
const subjectOptions = [
  { value: '', label: 'Sélectionnez un sujet...' },
  { value: 'general', label: 'Question générale' },
  { value: 'order', label: 'Commande' },
  { value: 'manuscript', label: 'Manuscrit' },
  { value: 'partnership', label: 'Partenariat' },
  { value: 'other', label: 'Autre' },
];

/**
 * Icônes des réseaux sociaux
 */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * Composant carte Google Maps intégrée
 */
function MapEmbed() {
  return (
    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gold/10">
      {/* Carte Google Maps - Recherche "Les Editions Germinale" aux coordonnées spécifiées */}
      <iframe
        src="https://maps.google.com/maps?q=Les%20Editions%20Germinale&ll=6.2360676,1.18908594&z=17&hl=fr&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localisation Éditions Germinale"
        className="grayscale hover:grayscale-0 transition-all duration-300"
      />
      {/* Overlay avec bouton "Obtenir l'itinéraire" */}
      <a
        href="https://maps.google.com/maps/search/Les%20Editions%20Germinale/@6.2360676,1.18908594,17z?hl=fr"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'absolute bottom-3 left-3 right-3',
          'bg-dark/95 backdrop-blur-sm',
          'px-4 py-2.5 rounded-lg',
          'flex items-center justify-between',
          'text-light font-medium text-sm',
          'hover:bg-dark transition-colors',
          'shadow-md'
        )}
      >
        <span>Obtenir l&apos;itinéraire</span>
        <ExternalLink className="w-4 h-4 text-gold" />
      </a>
    </div>
  );
}

/**
 * Formulaire de contact
 */
function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implémenter l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    // Reset form
    setFormData({ fullName: '', email: '', subject: '', message: '' });
  };

  const inputClasses = cn(
    'w-full px-4 py-3 rounded-lg',
    'border border-dark-lighter',
    'bg-dark-light text-light',
    'placeholder:text-light-dimmed',
    'focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold',
    'transition-all duration-200'
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nom et Email sur la même ligne */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-light mb-2"
          >
            Nom complet
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Entrez votre nom"
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-light mb-2"
          >
            Adresse email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nom@exemple.com"
            className={inputClasses}
            required
          />
        </div>
      </div>

      {/* Sujet */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-light mb-2"
        >
          Sujet
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={cn(inputClasses, 'appearance-none cursor-pointer')}
          required
        >
          {subjectOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-light mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Comment pouvons-nous vous aider ?"
          rows={5}
          className={cn(inputClasses, 'resize-none')}
          required
        />
      </div>

      {/* Note et bouton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-light-dimmed">
          Note : Pour les soumissions de manuscrits, veuillez consulter nos{' '}
          <a href="/submit-manuscript" className="text-gold hover:underline">
            directives
          </a>{' '}
          avant de nous contacter.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'px-8 py-3 rounded-lg',
            'bg-gold hover:bg-gold-light',
            'text-dark font-medium',
            'transition-colors duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'whitespace-nowrap'
          )}
        >
          {isSubmitting ? 'Envoi...' : 'Envoyer le message'}
        </button>
      </div>
    </form>
  );
}

/**
 * ContactSection - Section de contact de la homepage
 *
 * Affiche:
 * - Titre "Démarrons une conversation"
 * - Sous-titre descriptif
 * - Colonne gauche: Informations de contact + Carte + Réseaux sociaux
 * - Colonne droite: Formulaire de contact
 * - Section FAQ rapide en bas
 *
 * Positionnée entre AuthorCTASection et TestimonialsSection
 */
export function ContactSection() {
  return (
    <section
      className={cn('py-16 md:py-20 px-4', 'bg-dark')}
      data-testid="contact-section"
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <h2
            className={cn(
              'text-2xl md:text-3xl lg:text-4xl',
              'font-serif font-bold',
              'text-gold',
              'mb-4'
            )}
          >
            Démarrons une conversation
          </h2>
          <p className="text-light-dimmed max-w-2xl mx-auto">
            Que vous soyez lecteur avec une question ou auteur avec un
            manuscrit, nous sommes là pour vous écouter.
          </p>
        </div>

        {/* Contenu principal - 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Colonne gauche - Informations de contact */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte d'informations */}
            <div className="bg-dark-light rounded-2xl p-6 border border-dark-lighter">
              <h3 className="text-lg font-semibold text-gold mb-6">
                Informations de contact
              </h3>

              {/* Email */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-light">Écrivez-nous</p>
                  <a
                    href={`mailto:${contactInfo.email.value}`}
                    className="text-gold hover:underline text-sm"
                  >
                    {contactInfo.email.value}
                  </a>
                  <p className="text-xs text-light-dimmed mt-0.5">
                    {contactInfo.email.note}
                  </p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-light">Appelez-nous</p>
                  <a
                    href={`tel:${contactInfo.phone.value.replace(/\s/g, '')}`}
                    className="text-gold hover:underline text-sm"
                  >
                    {contactInfo.phone.value}
                  </a>
                  <p className="text-xs text-light-dimmed mt-0.5">
                    {contactInfo.phone.note}
                  </p>
                </div>
              </div>

              {/* Adresse */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-light">Visitez-nous</p>
                  <p className="text-sm text-light-dimmed">
                    {contactInfo.address.line1}
                  </p>
                  <p className="text-sm text-light-dimmed">
                    {contactInfo.address.line2}
                  </p>
                </div>
              </div>
            </div>

            {/* Carte Google Maps */}
            <MapEmbed />

            {/* Réseaux sociaux */}
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-10 h-10 rounded-full',
                  'border border-dark-lighter bg-dark-light',
                  'flex items-center justify-center',
                  'text-light-dimmed hover:text-gold hover:border-gold',
                  'transition-colors duration-200'
                )}
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-10 h-10 rounded-full',
                  'border border-dark-lighter bg-dark-light',
                  'flex items-center justify-center',
                  'text-light-dimmed hover:text-gold hover:border-gold',
                  'transition-colors duration-200'
                )}
                aria-label="X (Twitter)"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-10 h-10 rounded-full',
                  'border border-dark-lighter bg-dark-light',
                  'flex items-center justify-center',
                  'text-light-dimmed hover:text-gold hover:border-gold',
                  'transition-colors duration-200'
                )}
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Colonne droite - Formulaire */}
          <div className="lg:col-span-3">
            <div className="bg-dark-light rounded-2xl p-6 md:p-8 border border-dark-lighter h-full">
              <h3 className="text-xl font-semibold text-gold mb-2">
                Envoyez-nous un message
              </h3>
              <p className="text-light-dimmed text-sm mb-6">
                Remplissez le formulaire ci-dessous et notre équipe vous
                répondra rapidement.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
