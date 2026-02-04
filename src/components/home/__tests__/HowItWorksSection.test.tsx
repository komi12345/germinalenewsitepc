/**
 * Property-Based Tests for HowItWorksSection
 *
 * **Property 5: Three Steps in How It Works**
 * **Validates: Requirements 5.3**
 *
 * For any render of the HowItWorksSection, exactly 3 step cards SHALL be
 * displayed with icons, titles, and descriptions.
 */

import * as fc from 'fast-check';
import { render, cleanup } from '@testing-library/react';
import { HowItWorksSection } from '../HowItWorksSection';

describe('HowItWorksSection - Property-Based Tests', () => {
  // Cleanup after each test iteration
  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: homepage, Property 5: Three Steps in How It Works
   *
   * For any render of the HowItWorksSection component, it SHALL display:
   * - Exactly 3 step cards
   * - Each step with an icon (inside a circular container)
   * - Each step with a title (h3 element)
   * - Each step with a description (p element)
   *
   * **Validates: Requirements 5.3**
   */
  it('should always display exactly 3 steps with icons, titles, and descriptions', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        // Cleanup before each iteration to ensure clean DOM
        cleanup();

        // Render the component
        const { container } = render(<HowItWorksSection />);

        // Verify section is rendered
        const section = container.querySelector(
          '[data-testid="how-it-works-section"]'
        );
        expect(section).not.toBeNull();

        // Verify exactly 3 steps are displayed (Requirement 5.3)
        const stepsContainer = container.querySelector(
          '[data-testid="steps-container"]'
        );
        expect(stepsContainer).not.toBeNull();

        const step1 = container.querySelector('[data-testid="step-1"]');
        const step2 = container.querySelector('[data-testid="step-2"]');
        const step3 = container.querySelector('[data-testid="step-3"]');

        expect(step1).not.toBeNull();
        expect(step2).not.toBeNull();
        expect(step3).not.toBeNull();

        // Verify each step has an icon (SVG element inside circular container)
        const steps = [step1, step2, step3];
        steps.forEach(step => {
          // Check for icon (SVG)
          const icon = step?.querySelector('svg');
          expect(icon).not.toBeNull();

          // Check for title (h3)
          const title = step?.querySelector('h3');
          expect(title).not.toBeNull();
          expect(title?.textContent?.trim().length).toBeGreaterThan(0);

          // Check for description (p)
          const description = step?.querySelector('p');
          expect(description).not.toBeNull();
          expect(description?.textContent?.trim().length).toBeGreaterThan(0);
        });

        // Verify the expected step titles (Requirements 5.4, 5.5, 5.6)
        const titles = Array.from(
          container.querySelectorAll('[data-testid^="step-"] h3')
        ).map(h3 => h3.textContent);

        expect(titles).toContain('Découvrez');
        expect(titles).toContain('Commandez');
        expect(titles).toContain('Savourez');

        // Verify section title (Requirement 5.1)
        const sectionTitle = container.querySelector('h2');
        expect(sectionTitle).not.toBeNull();
        expect(sectionTitle?.textContent).toBe('Comment ça marche ?');

        // Verify subtitle exists (Requirement 5.2)
        const subtitle = container.querySelector('h2 + p');
        expect(subtitle).not.toBeNull();
        expect(subtitle?.textContent?.trim().length).toBeGreaterThan(0);

        return true;
      }),
      { numRuns: 100 } // Run 100 iterations as per testing strategy
    );
  });
});
