/**
 * Property-Based Tests for Authentication Form Validation
 *
 * Uses fast-check for property-based testing to validate correctness properties
 * across many generated inputs.
 *
 * Feature: authentication-page
 */

import * as fc from 'fast-check';
import {
  loginSchema,
  registerSchema,
  AUTH_VALIDATION_CONSTANTS,
  AUTH_ERROR_MESSAGES,
} from '../auth';

/**
 * Property 1: Email Validation Consistency
 *
 * *For any* string input in the email field, the validation result should be consistent:
 * if the string matches a valid email pattern (contains @ and domain), it should pass validation;
 * otherwise, it should fail with the appropriate error message.
 *
 * **Validates: Requirements 4.7, 9.1**
 */
describe('Property 1: Email Validation Consistency', () => {
  // Helper to create valid base login data
  const createValidLoginData = () => ({
    email: 'test@example.com',
    password: 'password123',
    rememberMe: false,
  });

  // Helper to create valid base register data
  const createValidRegisterData = () => ({
    fullName: 'Jean Dupont',
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  });

  describe('Invalid email format validation', () => {
    // Generator for invalid email formats
    const invalidEmailArbitrary = fc.oneof(
      // Missing @ symbol
      fc
        .string({ minLength: 1, maxLength: 50 })
        .filter(s => !s.includes('@') && s.length > 0),
      // Missing domain part after @
      fc
        .string({ minLength: 1, maxLength: 20 })
        .filter(s => /^[a-zA-Z0-9]+$/.test(s))
        .map(s => `${s}@`),
      // Missing local part before @
      fc
        .string({ minLength: 1, maxLength: 20 })
        .filter(s => /^[a-zA-Z0-9]+$/.test(s))
        .map(s => `@${s}.com`),
      // Just text without proper structure
      fc.constantFrom(
        'notanemail',
        'test@',
        '@test',
        'test@.com',
        'test@domain',
        'test email@domain.com'
      )
    );

    it('should reject invalid email formats in login form', () => {
      fc.assert(
        fc.property(invalidEmailArbitrary, invalidEmail => {
          const data = { ...createValidLoginData(), email: invalidEmail };
          const result = loginSchema.safeParse(data);
          return !result.success;
        }),
        { numRuns: 100 }
      );
    });

    it('should reject invalid email formats in register form', () => {
      fc.assert(
        fc.property(invalidEmailArbitrary, invalidEmail => {
          const data = { ...createValidRegisterData(), email: invalidEmail };
          const result = registerSchema.safeParse(data);
          return !result.success;
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Valid email format validation', () => {
    // Generator for valid email formats
    const validEmailArbitrary = fc
      .tuple(
        fc
          .string({ minLength: 1, maxLength: 15 })
          .filter(s => /^[a-zA-Z][a-zA-Z0-9]*$/.test(s)),
        fc
          .string({ minLength: 2, maxLength: 10 })
          .filter(s => /^[a-zA-Z][a-zA-Z0-9]*$/.test(s)),
        fc.constantFrom('com', 'org', 'net', 'fr', 'tg')
      )
      .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

    it('should accept valid email formats in login form', () => {
      fc.assert(
        fc.property(validEmailArbitrary, validEmail => {
          const data = { ...createValidLoginData(), email: validEmail };
          const result = loginSchema.safeParse(data);
          if (!result.success) {
            // Check if error is related to email
            const hasEmailError = result.error.issues.some(
              issue => issue.path && issue.path.includes('email')
            );
            return !hasEmailError;
          }
          return true;
        }),
        { numRuns: 100 }
      );
    });

    it('should accept valid email formats in register form', () => {
      fc.assert(
        fc.property(validEmailArbitrary, validEmail => {
          const data = { ...createValidRegisterData(), email: validEmail };
          const result = registerSchema.safeParse(data);
          if (!result.success) {
            const hasEmailError = result.error.issues.some(
              issue => issue.path && issue.path.includes('email')
            );
            return !hasEmailError;
          }
          return true;
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Empty email validation', () => {
    it('should reject empty email in login form with required field error', () => {
      fc.assert(
        fc.property(fc.constant(''), emptyEmail => {
          const data = { ...createValidLoginData(), email: emptyEmail };
          const result = loginSchema.safeParse(data);
          if (!result.success) {
            const emailError = result.error.issues.find(
              issue => issue.path && issue.path.includes('email')
            );
            return emailError?.message === AUTH_ERROR_MESSAGES.REQUIRED_FIELD;
          }
          return false;
        }),
        { numRuns: 100 }
      );
    });

    it('should reject empty email in register form with required field error', () => {
      fc.assert(
        fc.property(fc.constant(''), emptyEmail => {
          const data = { ...createValidRegisterData(), email: emptyEmail };
          const result = registerSchema.safeParse(data);
          if (!result.success) {
            const emailError = result.error.issues.find(
              issue => issue.path && issue.path.includes('email')
            );
            return emailError?.message === AUTH_ERROR_MESSAGES.REQUIRED_FIELD;
          }
          return false;
        }),
        { numRuns: 100 }
      );
    });
  });
});

/**
 * Property 2: Password Validation Rules
 *
 * *For any* string input in the password field, if the string length is less than 8 characters,
 * the validation should fail with "Le mot de passe doit contenir au moins 8 caractères";
 * if 8 or more characters, it should pass.
 *
 * **Validates: Requirements 4.8, 9.2**
 */
describe('Property 2: Password Validation Rules', () => {
  const createValidLoginData = () => ({
    email: 'test@example.com',
    password: 'password123',
    rememberMe: false,
  });

  const createValidRegisterData = () => ({
    fullName: 'Jean Dupont',
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  });

  describe('Password minimum length validation', () => {
    it('should reject passwords shorter than 8 characters in login form', () => {
      // Generate passwords with 1-7 characters
      const shortPasswordArbitrary = fc
        .string({
          minLength: 1,
          maxLength: AUTH_VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH - 1,
        })
        .filter(s => s.length > 0);

      fc.assert(
        fc.property(shortPasswordArbitrary, shortPassword => {
          const data = { ...createValidLoginData(), password: shortPassword };
          const result = loginSchema.safeParse(data);
          if (!result.success) {
            const passwordError = result.error.issues.find(
              issue => issue.path && issue.path.includes('password')
            );
            return (
              passwordError?.message === AUTH_ERROR_MESSAGES.PASSWORD_TOO_SHORT
            );
          }
          return false;
        }),
        { numRuns: 100 }
      );
    });

    it('should reject passwords shorter than 8 characters in register form', () => {
      const shortPasswordArbitrary = fc
        .string({
          minLength: 1,
          maxLength: AUTH_VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH - 1,
        })
        .filter(s => s.length > 0);

      fc.assert(
        fc.property(shortPasswordArbitrary, shortPassword => {
          const data = {
            ...createValidRegisterData(),
            password: shortPassword,
            confirmPassword: shortPassword,
          };
          const result = registerSchema.safeParse(data);
          if (!result.success) {
            const passwordError = result.error.issues.find(
              issue =>
                issue.path &&
                issue.path.includes('password') &&
                !issue.path.includes('confirmPassword')
            );
            return (
              passwordError?.message === AUTH_ERROR_MESSAGES.PASSWORD_TOO_SHORT
            );
          }
          return false;
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Valid password length validation', () => {
    it('should accept passwords with 8 or more characters in login form', () => {
      // Generate passwords with 8+ characters
      const validPasswordArbitrary = fc.string({
        minLength: AUTH_VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH,
        maxLength: 50,
      });

      fc.assert(
        fc.property(validPasswordArbitrary, validPassword => {
          const data = { ...createValidLoginData(), password: validPassword };
          const result = loginSchema.safeParse(data);
          if (!result.success) {
            // Check if error is related to password length
            const hasPasswordLengthError = result.error.issues.some(
              issue =>
                issue.path &&
                issue.path.includes('password') &&
                issue.message === AUTH_ERROR_MESSAGES.PASSWORD_TOO_SHORT
            );
            return !hasPasswordLengthError;
          }
          return true;
        }),
        { numRuns: 100 }
      );
    });

    it('should accept passwords with exactly 8 characters', () => {
      // Generate passwords with exactly 8 characters
      const exactLengthPasswordArbitrary = fc.string({
        minLength: 8,
        maxLength: 8,
      });

      fc.assert(
        fc.property(exactLengthPasswordArbitrary, password => {
          const data = { ...createValidLoginData(), password };
          const result = loginSchema.safeParse(data);
          if (!result.success) {
            const hasPasswordLengthError = result.error.issues.some(
              issue =>
                issue.path &&
                issue.path.includes('password') &&
                issue.message === AUTH_ERROR_MESSAGES.PASSWORD_TOO_SHORT
            );
            return !hasPasswordLengthError;
          }
          return true;
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Empty password validation', () => {
    it('should reject empty password in login form with required field error', () => {
      fc.assert(
        fc.property(fc.constant(''), emptyPassword => {
          const data = { ...createValidLoginData(), password: emptyPassword };
          const result = loginSchema.safeParse(data);
          if (!result.success) {
            const passwordError = result.error.issues.find(
              issue => issue.path && issue.path.includes('password')
            );
            return (
              passwordError?.message === AUTH_ERROR_MESSAGES.REQUIRED_FIELD
            );
          }
          return false;
        }),
        { numRuns: 100 }
      );
    });
  });
});

/**
 * Property 3: Password Match Verification
 *
 * *For any* pair of password and confirmPassword inputs in the registration form,
 * if they are not identical strings, the validation should fail with
 * "Les mots de passe ne correspondent pas".
 *
 * **Validates: Requirements 5.6, 9.3**
 */
describe('Property 3: Password Match Verification', () => {
  const createValidRegisterData = () => ({
    fullName: 'Jean Dupont',
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  });

  describe('Non-matching passwords validation', () => {
    it('should reject when password and confirmPassword do not match', () => {
      // Generate two different valid passwords (8+ characters)
      const differentPasswordsArbitrary = fc
        .tuple(
          fc.string({ minLength: 8, maxLength: 20 }),
          fc.string({ minLength: 8, maxLength: 20 })
        )
        .filter(([p1, p2]) => p1 !== p2);

      fc.assert(
        fc.property(
          differentPasswordsArbitrary,
          ([password, confirmPassword]) => {
            const data = {
              ...createValidRegisterData(),
              password,
              confirmPassword,
            };
            const result = registerSchema.safeParse(data);
            if (!result.success) {
              const matchError = result.error.issues.find(
                issue => issue.path && issue.path.includes('confirmPassword')
              );
              return (
                matchError?.message === AUTH_ERROR_MESSAGES.PASSWORDS_DONT_MATCH
              );
            }
            return false;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject when passwords differ by case', () => {
      // Generate passwords that differ only by case
      const caseDifferentPasswordsArbitrary = fc
        .string({ minLength: 8, maxLength: 20 })
        .filter(s => s.toLowerCase() !== s.toUpperCase()) // Has letters
        .map(s => [s.toLowerCase(), s.toUpperCase()] as [string, string]);

      fc.assert(
        fc.property(
          caseDifferentPasswordsArbitrary,
          ([password, confirmPassword]) => {
            if (password === confirmPassword) return true; // Skip if they happen to be equal
            const data = {
              ...createValidRegisterData(),
              password,
              confirmPassword,
            };
            const result = registerSchema.safeParse(data);
            return !result.success;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject when passwords differ by whitespace', () => {
      // Generate passwords with added whitespace
      const whitespaceDifferentArbitrary = fc
        .string({ minLength: 8, maxLength: 20 })
        .map(s => [s, s + ' '] as [string, string]);

      fc.assert(
        fc.property(
          whitespaceDifferentArbitrary,
          ([password, confirmPassword]) => {
            const data = {
              ...createValidRegisterData(),
              password,
              confirmPassword,
            };
            const result = registerSchema.safeParse(data);
            return !result.success;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Matching passwords validation', () => {
    it('should accept when password and confirmPassword are identical', () => {
      // Generate valid passwords (8+ characters)
      const validPasswordArbitrary = fc.string({ minLength: 8, maxLength: 50 });

      fc.assert(
        fc.property(validPasswordArbitrary, password => {
          const data = {
            ...createValidRegisterData(),
            password,
            confirmPassword: password,
          };
          const result = registerSchema.safeParse(data);
          if (!result.success) {
            // Check if error is related to password mismatch
            const hasMatchError = result.error.issues.some(
              issue =>
                issue.message === AUTH_ERROR_MESSAGES.PASSWORDS_DONT_MATCH
            );
            return !hasMatchError;
          }
          return true;
        }),
        { numRuns: 100 }
      );
    });
  });
});

/**
 * Property 4: Required Field Validation
 *
 * *For any* required field (email, password, fullName, confirmPassword),
 * if the field value is empty or contains only whitespace,
 * the validation should fail with "Ce champ est requis".
 *
 * **Validates: Requirements 4.7, 4.8, 5.7, 9.4**
 */
describe('Property 4: Required Field Validation', () => {
  const createValidLoginData = () => ({
    email: 'test@example.com',
    password: 'password123',
    rememberMe: false,
  });

  const createValidRegisterData = () => ({
    fullName: 'Jean Dupont',
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  });

  describe('Empty required fields in login form', () => {
    it('should reject empty email field', () => {
      fc.assert(
        fc.property(fc.constant(''), emptyValue => {
          const data = { ...createValidLoginData(), email: emptyValue };
          const result = loginSchema.safeParse(data);
          if (!result.success) {
            const error = result.error.issues.find(
              issue => issue.path && issue.path.includes('email')
            );
            return error?.message === AUTH_ERROR_MESSAGES.REQUIRED_FIELD;
          }
          return false;
        }),
        { numRuns: 100 }
      );
    });

    it('should reject empty password field', () => {
      fc.assert(
        fc.property(fc.constant(''), emptyValue => {
          const data = { ...createValidLoginData(), password: emptyValue };
          const result = loginSchema.safeParse(data);
          if (!result.success) {
            const error = result.error.issues.find(
              issue => issue.path && issue.path.includes('password')
            );
            return error?.message === AUTH_ERROR_MESSAGES.REQUIRED_FIELD;
          }
          return false;
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Empty required fields in register form', () => {
    it('should reject empty fullName field', () => {
      fc.assert(
        fc.property(fc.constant(''), emptyValue => {
          const data = { ...createValidRegisterData(), fullName: emptyValue };
          const result = registerSchema.safeParse(data);
          if (!result.success) {
            const error = result.error.issues.find(
              issue => issue.path && issue.path.includes('fullName')
            );
            return error?.message === AUTH_ERROR_MESSAGES.REQUIRED_FIELD;
          }
          return false;
        }),
        { numRuns: 100 }
      );
    });

    it('should reject empty email field', () => {
      fc.assert(
        fc.property(fc.constant(''), emptyValue => {
          const data = { ...createValidRegisterData(), email: emptyValue };
          const result = registerSchema.safeParse(data);
          if (!result.success) {
            const error = result.error.issues.find(
              issue => issue.path && issue.path.includes('email')
            );
            return error?.message === AUTH_ERROR_MESSAGES.REQUIRED_FIELD;
          }
          return false;
        }),
        { numRuns: 100 }
      );
    });

    it('should reject empty password field', () => {
      fc.assert(
        fc.property(fc.constant(''), emptyValue => {
          const data = { ...createValidRegisterData(), password: emptyValue };
          const result = registerSchema.safeParse(data);
          if (!result.success) {
            const error = result.error.issues.find(
              issue =>
                issue.path &&
                issue.path.includes('password') &&
                !issue.path.includes('confirmPassword')
            );
            return error?.message === AUTH_ERROR_MESSAGES.REQUIRED_FIELD;
          }
          return false;
        }),
        { numRuns: 100 }
      );
    });

    it('should reject empty confirmPassword field', () => {
      fc.assert(
        fc.property(fc.constant(''), emptyValue => {
          const data = {
            ...createValidRegisterData(),
            confirmPassword: emptyValue,
          };
          const result = registerSchema.safeParse(data);
          if (!result.success) {
            const error = result.error.issues.find(
              issue => issue.path && issue.path.includes('confirmPassword')
            );
            return error?.message === AUTH_ERROR_MESSAGES.REQUIRED_FIELD;
          }
          return false;
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Full name minimum length validation', () => {
    it('should reject fullName with less than 2 characters', () => {
      // Generate single character strings
      const shortNameArbitrary = fc.string({ minLength: 1, maxLength: 1 });

      fc.assert(
        fc.property(shortNameArbitrary, shortName => {
          const data = { ...createValidRegisterData(), fullName: shortName };
          const result = registerSchema.safeParse(data);
          if (!result.success) {
            const error = result.error.issues.find(
              issue => issue.path && issue.path.includes('fullName')
            );
            return error?.message === AUTH_ERROR_MESSAGES.NAME_TOO_SHORT;
          }
          return false;
        }),
        { numRuns: 100 }
      );
    });

    it('should accept fullName with 2 or more characters', () => {
      // Generate names with 2+ characters
      const validNameArbitrary = fc.string({ minLength: 2, maxLength: 50 });

      fc.assert(
        fc.property(validNameArbitrary, validName => {
          const data = { ...createValidRegisterData(), fullName: validName };
          const result = registerSchema.safeParse(data);
          if (!result.success) {
            // Check if error is related to fullName length
            const hasNameLengthError = result.error.issues.some(
              issue =>
                issue.path &&
                issue.path.includes('fullName') &&
                issue.message === AUTH_ERROR_MESSAGES.NAME_TOO_SHORT
            );
            return !hasNameLengthError;
          }
          return true;
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('All fields empty validation', () => {
    it('should reject login form with all empty fields', () => {
      fc.assert(
        fc.property(
          fc.constant({ email: '', password: '', rememberMe: false }),
          emptyData => {
            const result = loginSchema.safeParse(emptyData);
            return !result.success && result.error.issues.length >= 2;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject register form with all empty fields', () => {
      fc.assert(
        fc.property(
          fc.constant({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }),
          emptyData => {
            const result = registerSchema.safeParse(emptyData);
            return !result.success && result.error.issues.length >= 4;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
