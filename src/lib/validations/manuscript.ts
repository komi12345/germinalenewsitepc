import { z } from 'zod';

/**
 * Genres littéraires disponibles pour la soumission de manuscrit
 * Requirements: 3.4
 */
export const LITERARY_GENRES = [
  { value: 'roman', label: 'Roman' },
  { value: 'poesie', label: 'Poésie' },
  { value: 'nouvelle', label: 'Nouvelle' },
  { value: 'essai', label: 'Essai' },
  { value: 'theatre', label: 'Théâtre' },
  { value: 'jeunesse', label: 'Jeunesse' },
  { value: 'autre', label: 'Autre' },
] as const;

export type LiteraryGenre = (typeof LITERARY_GENRES)[number]['value'];

/**
 * Fonction utilitaire pour compter les mots dans un texte
 */
export const countWords = (text: string): number => {
  return text.split(/\s+/).filter(Boolean).length;
};

/**
 * Constantes de validation
 */
export const VALIDATION_CONSTANTS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  PHONE_MIN_LENGTH: 8,
  PHONE_MAX_LENGTH: 20,
  TITLE_MIN_LENGTH: 2,
  TITLE_MAX_LENGTH: 200,
  SYNOPSIS_MIN_LENGTH: 50,
  SYNOPSIS_MAX_WORDS: 500,
  PDF_MAX_SIZE_BYTES: 10 * 1024 * 1024, // 10 Mo
  PDF_MIME_TYPE: 'application/pdf',
} as const;

/**
 * Schéma Zod pour la validation du formulaire de manuscrit
 * Requirements: 2.4, 2.5, 3.7
 */
export const manuscriptSchema = z.object({
  lastName: z
    .string()
    .min(
      VALIDATION_CONSTANTS.NAME_MIN_LENGTH,
      'Le nom doit contenir au moins 2 caractères'
    )
    .max(
      VALIDATION_CONSTANTS.NAME_MAX_LENGTH,
      'Le nom ne peut pas dépasser 100 caractères'
    )
    .refine(
      val => val.trim().length >= VALIDATION_CONSTANTS.NAME_MIN_LENGTH,
      "Le nom ne peut pas être composé uniquement d'espaces"
    ),
  firstName: z
    .string()
    .min(
      VALIDATION_CONSTANTS.NAME_MIN_LENGTH,
      'Le prénom doit contenir au moins 2 caractères'
    )
    .max(
      VALIDATION_CONSTANTS.NAME_MAX_LENGTH,
      'Le prénom ne peut pas dépasser 100 caractères'
    )
    .refine(
      val => val.trim().length >= VALIDATION_CONSTANTS.NAME_MIN_LENGTH,
      "Le prénom ne peut pas être composé uniquement d'espaces"
    ),
  phone: z
    .string()
    .min(
      VALIDATION_CONSTANTS.PHONE_MIN_LENGTH,
      'Le numéro de téléphone doit contenir au moins 8 caractères'
    )
    .max(
      VALIDATION_CONSTANTS.PHONE_MAX_LENGTH,
      'Le numéro de téléphone ne peut pas dépasser 20 caractères'
    )
    .regex(
      /^[+]?[\d\s\-().]+$/,
      'Veuillez entrer un numéro de téléphone valide'
    ),
  residence: z
    .string()
    .min(2, 'Le lieu de résidence doit contenir au moins 2 caractères')
    .max(200, 'Le lieu de résidence ne peut pas dépasser 200 caractères'),
  email: z
    .string()
    .min(1, "L'adresse email est requise")
    .email('Veuillez entrer une adresse email valide'),
  title: z
    .string()
    .min(
      VALIDATION_CONSTANTS.TITLE_MIN_LENGTH,
      'Le titre doit contenir au moins 2 caractères'
    )
    .max(
      VALIDATION_CONSTANTS.TITLE_MAX_LENGTH,
      'Le titre ne peut pas dépasser 200 caractères'
    ),
  genre: z.string().min(1, 'Veuillez sélectionner un genre littéraire'),
  synopsis: z
    .string()
    .min(
      VALIDATION_CONSTANTS.SYNOPSIS_MIN_LENGTH,
      'Le synopsis doit contenir au moins 50 caractères'
    )
    .refine(
      val => countWords(val) <= VALIDATION_CONSTANTS.SYNOPSIS_MAX_WORDS,
      'Le synopsis ne peut pas dépasser 500 mots'
    ),
});

export type ManuscriptFormData = z.infer<typeof manuscriptSchema>;

/**
 * Validation du fichier PDF (séparée car File n'est pas sérialisable avec Zod)
 * Requirements: 4.8, 4.9
 *
 * @param file - Le fichier à valider
 * @returns Message d'erreur ou null si valide
 */
export const validatePdfFile = (file: File | null): string | null => {
  if (!file) {
    return 'Veuillez sélectionner un fichier PDF';
  }

  if (file.type !== VALIDATION_CONSTANTS.PDF_MIME_TYPE) {
    return 'Le fichier doit être au format PDF';
  }

  if (file.size > VALIDATION_CONSTANTS.PDF_MAX_SIZE_BYTES) {
    return 'Le fichier ne peut pas dépasser 10 Mo';
  }

  return null;
};

/**
 * Type complet incluant le fichier PDF pour le formulaire
 */
export interface ManuscriptFormDataWithFile extends ManuscriptFormData {
  pdfFile: File | null;
}
