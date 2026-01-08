import { z } from "zod";

/**
 * Constantes de validation pour l'authentification
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */
export const AUTH_VALIDATION_CONSTANTS = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
} as const;

/**
 * Messages d'erreur en français
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */
export const AUTH_ERROR_MESSAGES = {
  REQUIRED_FIELD: "Ce champ est requis",
  INVALID_EMAIL: "Veuillez entrer une adresse e-mail valide",
  PASSWORD_TOO_SHORT: "Le mot de passe doit contenir au moins 8 caractères",
  PASSWORDS_DONT_MATCH: "Les mots de passe ne correspondent pas",
  NAME_TOO_SHORT: "Le nom doit contenir au moins 2 caractères",
} as const;

/**
 * Schéma de validation pour la connexion
 * Requirements: 4.7, 4.8, 9.1, 9.2, 9.4
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, AUTH_ERROR_MESSAGES.REQUIRED_FIELD)
    .email(AUTH_ERROR_MESSAGES.INVALID_EMAIL),
  password: z
    .string()
    .min(1, AUTH_ERROR_MESSAGES.REQUIRED_FIELD)
    .min(AUTH_VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH, AUTH_ERROR_MESSAGES.PASSWORD_TOO_SHORT),
  rememberMe: z.boolean(),
});

/**
 * Schéma de validation pour l'inscription
 * Requirements: 5.6, 5.7, 9.1, 9.2, 9.3, 9.4
 */
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, AUTH_ERROR_MESSAGES.REQUIRED_FIELD)
    .min(AUTH_VALIDATION_CONSTANTS.NAME_MIN_LENGTH, AUTH_ERROR_MESSAGES.NAME_TOO_SHORT),
  email: z
    .string()
    .min(1, AUTH_ERROR_MESSAGES.REQUIRED_FIELD)
    .email(AUTH_ERROR_MESSAGES.INVALID_EMAIL),
  password: z
    .string()
    .min(1, AUTH_ERROR_MESSAGES.REQUIRED_FIELD)
    .min(AUTH_VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH, AUTH_ERROR_MESSAGES.PASSWORD_TOO_SHORT),
  confirmPassword: z
    .string()
    .min(1, AUTH_ERROR_MESSAGES.REQUIRED_FIELD),
}).refine((data) => data.password === data.confirmPassword, {
  message: AUTH_ERROR_MESSAGES.PASSWORDS_DONT_MATCH,
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
