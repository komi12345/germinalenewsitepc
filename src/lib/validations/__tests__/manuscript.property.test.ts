/**
 * Property-Based Tests for Manuscript Form Validation
 * 
 * Uses fast-check for property-based testing to validate correctness properties
 * across many generated inputs.
 * 
 * Feature: submit-manuscript
 */

import * as fc from 'fast-check';
import { 
  manuscriptSchema, 
  validatePdfFile, 
  countWords,
  VALIDATION_CONSTANTS 
} from '../manuscript';

/**
 * Property 1: Validation des champs personnels
 * 
 * *For any* chaîne vide ou composée uniquement d'espaces dans le champ nom,
 * le formulaire doit afficher un message d'erreur de validation.
 * 
 * *For any* chaîne qui ne correspond pas au format email standard,
 * le formulaire doit afficher un message d'erreur de format.
 * 
 * **Validates: Requirements 2.4, 2.5**
 */
describe('Property 1: Validation des champs personnels', () => {
  // Helper to create valid base form data
  const createValidBaseData = () => ({
    lastName: 'Dupont',
    firstName: 'Jean',
    phone: '+228 90 00 00 00',
    residence: 'Lomé, Togo',
    email: 'jean.dupont@email.com',
    title: 'Mon Manuscrit',
    genre: 'roman',
    synopsis: 'Ceci est un synopsis de test qui doit contenir au moins cinquante caractères pour être valide.',
  });

  describe('Empty or whitespace-only lastName validation', () => {
    it('should reject empty lastName', () => {
      fc.assert(
        fc.property(
          fc.constant(''),
          (emptyLastName) => {
            const data = { ...createValidBaseData(), lastName: emptyLastName };
            const result = manuscriptSchema.safeParse(data);
            return !result.success;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject whitespace-only lastName', () => {
      // Generate strings of only whitespace characters
      const whitespaceArbitrary = fc.array(
        fc.constantFrom(' ', '  ', '   ', '\t', '\n', '    '),
        { minLength: 1, maxLength: 5 }
      ).map(arr => arr.join(''));

      fc.assert(
        fc.property(
          whitespaceArbitrary,
          (whitespaceLastName) => {
            const data = { ...createValidBaseData(), lastName: whitespaceLastName };
            const result = manuscriptSchema.safeParse(data);
            return !result.success;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept valid lastName with non-whitespace characters', () => {
      // Generate valid names (letters only, proper length)
      const validNameArbitrary = fc.string({ minLength: 2, maxLength: 50 })
        .filter(s => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(s) && s.trim().length >= 2);

      fc.assert(
        fc.property(
          validNameArbitrary,
          (validLastName) => {
            const data = { ...createValidBaseData(), lastName: validLastName };
            const result = manuscriptSchema.safeParse(data);
            // Valid lastName should pass validation (or fail for other reasons)
            if (!result.success) {
              // Check if error is related to lastName
              const hasLastNameError = result.error.issues.some(
                issue => issue.path && issue.path.includes('lastName')
              );
              return !hasLastNameError;
            }
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Invalid email format validation', () => {
    // Generator for invalid email formats
    const invalidEmailArbitrary = fc.oneof(
      // Missing @ symbol
      fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes('@') && s.length > 0),
      // Missing domain part after @
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z0-9]+$/.test(s)).map(s => `${s}@`),
      // Missing local part before @
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z0-9]+$/.test(s)).map(s => `@${s}.com`),
      // Just text without proper structure
      fc.constantFrom('notanemail', 'test@', '@test', 'test@.com', 'test@domain', 'test email@domain.com')
    );

    it('should reject invalid email formats', () => {
      fc.assert(
        fc.property(
          invalidEmailArbitrary,
          (invalidEmail) => {
            const data = { ...createValidBaseData(), email: invalidEmail };
            const result = manuscriptSchema.safeParse(data);
            return !result.success;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept valid email formats', () => {
      // Generator for valid email formats with stricter constraints
      // Local part: starts with letter, can contain letters/numbers, no trailing dots
      const validEmailArbitrary = fc.tuple(
        fc.string({ minLength: 1, maxLength: 15 }).filter(s => /^[a-zA-Z][a-zA-Z0-9]*$/.test(s)),
        fc.string({ minLength: 2, maxLength: 10 }).filter(s => /^[a-zA-Z][a-zA-Z0-9]*$/.test(s)),
        fc.constantFrom('com', 'org', 'net', 'fr', 'tg')
      ).map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

      fc.assert(
        fc.property(
          validEmailArbitrary,
          (validEmail) => {
            const data = { ...createValidBaseData(), email: validEmail };
            const result = manuscriptSchema.safeParse(data);
            // Valid email should pass validation (or fail for other reasons)
            if (!result.success) {
              const hasEmailError = result.error.issues.some(
                issue => issue.path && issue.path.includes('email')
              );
              return !hasEmailError;
            }
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Empty firstName validation', () => {
    it('should reject empty firstName', () => {
      fc.assert(
        fc.property(
          fc.constant(''),
          (emptyFirstName) => {
            const data = { ...createValidBaseData(), firstName: emptyFirstName };
            const result = manuscriptSchema.safeParse(data);
            return !result.success;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject whitespace-only firstName', () => {
      const whitespaceArbitrary = fc.array(
        fc.constantFrom(' ', '  ', '   ', '\t', '\n'),
        { minLength: 1, maxLength: 5 }
      ).map(arr => arr.join(''));

      fc.assert(
        fc.property(
          whitespaceArbitrary,
          (whitespaceFirstName) => {
            const data = { ...createValidBaseData(), firstName: whitespaceFirstName };
            const result = manuscriptSchema.safeParse(data);
            return !result.success;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});


/**
 * Property 2: Validation du synopsis
 * 
 * *For any* texte contenant plus de 500 mots dans le champ synopsis,
 * le formulaire doit afficher un avertissement indiquant le dépassement.
 * 
 * **Validates: Requirements 3.7**
 */
describe('Property 2: Validation du synopsis', () => {
  // Helper to create valid base form data
  const createValidBaseData = () => ({
    lastName: 'Dupont',
    firstName: 'Jean',
    phone: '+228 90 00 00 00',
    residence: 'Lomé, Togo',
    email: 'jean.dupont@email.com',
    title: 'Mon Manuscrit',
    genre: 'roman',
    synopsis: 'Ceci est un synopsis de test qui doit contenir au moins cinquante caractères pour être valide.',
  });

  describe('Synopsis word count validation', () => {
    it('should reject synopsis with more than 500 words', () => {
      // Generate text with more than 500 words
      const longSynopsisArbitrary = fc.integer({ min: 501, max: 600 })
        .map(wordCount => Array(wordCount).fill('mot').join(' '));

      fc.assert(
        fc.property(
          longSynopsisArbitrary,
          (longSynopsis) => {
            const data = { ...createValidBaseData(), synopsis: longSynopsis };
            const result = manuscriptSchema.safeParse(data);
            // Should fail validation due to word count
            return !result.success;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept synopsis with exactly 500 words', () => {
      // Generate text with exactly 500 words
      const exactSynopsisArbitrary = fc.constant(
        Array(500).fill('mot').join(' ')
      );

      fc.assert(
        fc.property(
          exactSynopsisArbitrary,
          (synopsis) => {
            const data = { ...createValidBaseData(), synopsis };
            const result = manuscriptSchema.safeParse(data);
            // Should pass validation
            return result.success;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept synopsis with less than 500 words but at least 50 characters', () => {
      // Generate text with valid word count that ensures at least 50 characters
      // Using longer words to ensure minimum character count is met
      const validSynopsisArbitrary = fc.integer({ min: 15, max: 500 })
        .map(wordCount => Array(wordCount).fill('manuscrit').join(' '));

      fc.assert(
        fc.property(
          validSynopsisArbitrary,
          (synopsis) => {
            const data = { ...createValidBaseData(), synopsis };
            const result = manuscriptSchema.safeParse(data);
            // Should pass validation
            return result.success;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject synopsis with less than 50 characters', () => {
      // Generate short text (less than 50 characters)
      const shortSynopsisArbitrary = fc.string({ minLength: 1, maxLength: 49 })
        .filter(s => s.trim().length > 0);

      fc.assert(
        fc.property(
          shortSynopsisArbitrary,
          (shortSynopsis) => {
            const data = { ...createValidBaseData(), synopsis: shortSynopsis };
            const result = manuscriptSchema.safeParse(data);
            // Should fail validation due to minimum length
            return !result.success;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('countWords utility function properties', () => {
    it('should return 0 for empty or whitespace-only strings', () => {
      const emptyOrWhitespaceArbitrary = fc.oneof(
        fc.constant(''),
        fc.array(fc.constantFrom(' ', '\t', '\n', '  '), { minLength: 1, maxLength: 10 })
          .map(arr => arr.join(''))
      );

      fc.assert(
        fc.property(
          emptyOrWhitespaceArbitrary,
          (text) => {
            return countWords(text) === 0;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should count words correctly regardless of whitespace between them', () => {
      // Generate array of words with varying whitespace
      const wordsWithWhitespaceArbitrary = fc.array(
        fc.string({ minLength: 1, maxLength: 10 }).filter(s => /^[a-zA-Z]+$/.test(s)),
        { minLength: 1, maxLength: 50 }
      ).chain(words => 
        fc.array(
          fc.constantFrom(' ', '  ', '   ', '\t', '\n', '  \n  '),
          { minLength: words.length - 1, maxLength: words.length - 1 }
        ).map(separators => {
          let result = words[0];
          for (let i = 1; i < words.length; i++) {
            result += separators[i - 1] + words[i];
          }
          return { text: result, expectedCount: words.length };
        })
      );

      fc.assert(
        fc.property(
          wordsWithWhitespaceArbitrary,
          ({ text, expectedCount }) => {
            return countWords(text) === expectedCount;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});


/**
 * Property 3: Validation du fichier PDF
 * 
 * *For any* fichier dont le type MIME n'est pas "application/pdf",
 * le formulaire doit afficher une erreur de format.
 * 
 * *For any* fichier dont la taille dépasse 10 Mo (10 * 1024 * 1024 octets),
 * le formulaire doit afficher une erreur de taille.
 * 
 * **Validates: Requirements 4.8, 4.9**
 */
describe('Property 3: Validation du fichier PDF', () => {
  // Helper to create a mock File object
  const createMockFile = (name: string, size: number, type: string): File => {
    const content = new ArrayBuffer(size);
    return new File([content], name, { type });
  };

  describe('PDF MIME type validation', () => {
    it('should reject files with non-PDF MIME types', () => {
      // Generator for non-PDF MIME types
      const nonPdfMimeTypeArbitrary = fc.constantFrom(
        'text/plain',
        'text/html',
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/json',
        'application/xml',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip',
        'video/mp4',
        'audio/mpeg'
      );

      fc.assert(
        fc.property(
          nonPdfMimeTypeArbitrary,
          (mimeType) => {
            const file = createMockFile('test.file', 1024, mimeType);
            const error = validatePdfFile(file);
            return error === 'Le fichier doit être au format PDF';
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept files with PDF MIME type', () => {
      // Generate valid PDF files with varying sizes (under 10 Mo)
      const validPdfSizeArbitrary = fc.integer({ min: 1, max: VALIDATION_CONSTANTS.PDF_MAX_SIZE_BYTES - 1 });

      fc.assert(
        fc.property(
          validPdfSizeArbitrary,
          (size) => {
            const file = createMockFile('document.pdf', size, 'application/pdf');
            const error = validatePdfFile(file);
            return error === null;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('PDF file size validation', () => {
    it('should reject PDF files exceeding 10 Mo', () => {
      // Generate sizes larger than 10 Mo
      const oversizedArbitrary = fc.integer({ 
        min: VALIDATION_CONSTANTS.PDF_MAX_SIZE_BYTES + 1, 
        max: VALIDATION_CONSTANTS.PDF_MAX_SIZE_BYTES * 2 
      });

      fc.assert(
        fc.property(
          oversizedArbitrary,
          (size) => {
            const file = createMockFile('large.pdf', size, 'application/pdf');
            const error = validatePdfFile(file);
            return error === 'Le fichier ne peut pas dépasser 10 Mo';
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept PDF files at exactly 10 Mo', () => {
      fc.assert(
        fc.property(
          fc.constant(VALIDATION_CONSTANTS.PDF_MAX_SIZE_BYTES),
          (size) => {
            const file = createMockFile('exact.pdf', size, 'application/pdf');
            const error = validatePdfFile(file);
            return error === null;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept PDF files under 10 Mo', () => {
      // Generate sizes under 10 Mo
      const validSizeArbitrary = fc.integer({ 
        min: 1, 
        max: VALIDATION_CONSTANTS.PDF_MAX_SIZE_BYTES - 1 
      });

      fc.assert(
        fc.property(
          validSizeArbitrary,
          (size) => {
            const file = createMockFile('valid.pdf', size, 'application/pdf');
            const error = validatePdfFile(file);
            return error === null;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Null file validation', () => {
    it('should reject null file', () => {
      fc.assert(
        fc.property(
          fc.constant(null),
          (nullFile) => {
            const error = validatePdfFile(nullFile);
            return error === 'Veuillez sélectionner un fichier PDF';
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Combined validation - MIME type takes precedence over size', () => {
    it('should report MIME type error for non-PDF files regardless of size', () => {
      // Generate non-PDF files of various sizes (including oversized)
      const nonPdfFileArbitrary = fc.tuple(
        fc.constantFrom('text/plain', 'image/jpeg', 'application/json'),
        fc.integer({ min: 1, max: VALIDATION_CONSTANTS.PDF_MAX_SIZE_BYTES * 2 })
      );

      fc.assert(
        fc.property(
          nonPdfFileArbitrary,
          ([mimeType, size]) => {
            const file = createMockFile('test.file', size, mimeType);
            const error = validatePdfFile(file);
            // Should report MIME type error, not size error
            return error === 'Le fichier doit être au format PDF';
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
