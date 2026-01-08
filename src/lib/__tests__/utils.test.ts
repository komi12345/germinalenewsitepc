/**
 * Property-Based Tests for formatPrice utility
 * 
 * **Property 6: Price Formatting Consistency**
 * **Validates: Requirements 4.5**
 * 
 * For any book price displayed, the format SHALL be "{amount} FCFA" 
 * where amount uses space as thousands separator (e.g., "15 000 FCFA").
 */

import * as fc from 'fast-check';
import { formatPrice } from '../utils';

describe('formatPrice - Property-Based Tests', () => {
  /**
   * Feature: homepage, Property 6: Price Formatting Consistency
   * 
   * For any valid price, the formatPrice function SHALL:
   * - Return a string ending with " FCFA"
   * - Use space as thousands separator
   * - Correctly represent the numeric value
   * 
   * **Validates: Requirements 4.5**
   */
  it('should format any price with space as thousands separator and FCFA suffix', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10000000 }), // Prix de 0 à 10 000 000 FCFA
        (price) => {
          const formatted = formatPrice(price);
          
          // Verify format ends with " FCFA"
          expect(formatted).toMatch(/\sFCFA$/);
          
          // Verify the numeric part uses space as thousands separator
          const numericPart = formatted.replace(' FCFA', '');
          
          // Extract digits only to verify the value
          const digitsOnly = numericPart.replace(/\s/g, '');
          expect(parseInt(digitsOnly, 10)).toBe(Math.round(price));
          
          // Verify thousands separator pattern (space between groups of 3 digits)
          if (price >= 1000) {
            expect(numericPart).toMatch(/^\d{1,3}(\s\d{3})*$/);
          } else {
            expect(numericPart).toMatch(/^\d+$/);
          }
          
          return true;
        }
      ),
      { numRuns: 20 } // Reduced for faster test execution
    );
  });

  /**
   * Additional property: formatPrice with centimes conversion
   * 
   * When inCentimes is true, the function should divide by 100 before formatting.
   */
  it('should correctly convert centimes to FCFA when inCentimes is true', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 1000000000 }), // Prix en centimes
        (priceInCentimes) => {
          const formatted = formatPrice(priceInCentimes, true);
          
          // Verify format ends with " FCFA"
          expect(formatted).toMatch(/\sFCFA$/);
          
          // Extract numeric part and verify conversion
          const numericPart = formatted.replace(' FCFA', '');
          const digitsOnly = numericPart.replace(/\s/g, '');
          const expectedValue = Math.round(priceInCentimes / 100);
          expect(parseInt(digitsOnly, 10)).toBe(expectedValue);
          
          return true;
        }
      ),
      { numRuns: 20 }
    );
  });

  /**
   * Specific examples to verify formatting
   */
  describe('Specific formatting examples', () => {
    it('should format 15000 as "15 000 FCFA"', () => {
      expect(formatPrice(15000)).toBe('15 000 FCFA');
    });

    it('should format 1500000 as "1 500 000 FCFA"', () => {
      expect(formatPrice(1500000)).toBe('1 500 000 FCFA');
    });

    it('should format 500 as "500 FCFA"', () => {
      expect(formatPrice(500)).toBe('500 FCFA');
    });

    it('should format 0 as "0 FCFA"', () => {
      expect(formatPrice(0)).toBe('0 FCFA');
    });
  });
});
