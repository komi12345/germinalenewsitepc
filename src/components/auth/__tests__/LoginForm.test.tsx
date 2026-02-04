/**
 * Unit Tests for LoginForm
 *
 * Tests for the login form component including:
 * - Field rendering
 * - Password visibility toggle
 * - Form validation and error display
 * - Form submission
 *
 * **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.6**
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';

describe('LoginForm - Unit Tests', () => {
  const mockOnSubmit = jest.fn();
  const mockOnForgotPassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test: Render all form fields
   * Validates: Requirements 4.1, 4.2, 4.4, 4.5, 4.6
   */
  describe('Field Rendering', () => {
    it('should render email input with label and placeholder', () => {
      render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onForgotPassword={mockOnForgotPassword}
        />
      );

      // Check email label (Requirement 4.1)
      expect(screen.getByLabelText(/adresse e-mail/i)).toBeInTheDocument();

      // Check email placeholder (Requirement 4.1)
      expect(
        screen.getByPlaceholderText('exemple@email.com')
      ).toBeInTheDocument();
    });

    it('should render password input with label and placeholder', () => {
      render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onForgotPassword={mockOnForgotPassword}
        />
      );

      // Check password label (Requirement 4.2) - use exact label text
      const passwordLabel = screen.getByText('Mot de passe');
      expect(passwordLabel).toBeInTheDocument();

      // Check password placeholder (Requirement 4.2)
      expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    });

    it('should render "Se souvenir de moi" checkbox', () => {
      render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onForgotPassword={mockOnForgotPassword}
        />
      );

      // Check checkbox (Requirement 4.4)
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByText(/se souvenir de moi/i)).toBeInTheDocument();
    });

    it('should render "Mot de passe oublié ?" link', () => {
      render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onForgotPassword={mockOnForgotPassword}
        />
      );

      // Check forgot password link (Requirement 4.5)
      const forgotPasswordButton = screen.getByText(/mot de passe oublié \?/i);
      expect(forgotPasswordButton).toBeInTheDocument();
    });

    it('should render submit button with correct text and arrow', () => {
      render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onForgotPassword={mockOnForgotPassword}
        />
      );

      // Check submit button (Requirement 4.6)
      const submitButton = screen.getByRole('button', {
        name: /se connecter/i,
      });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  /**
   * Test: Password visibility toggle
   * Validates: Requirement 4.3
   */
  describe('Password Toggle', () => {
    it('should toggle password visibility when eye icon is clicked', async () => {
      render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onForgotPassword={mockOnForgotPassword}
        />
      );

      // Get password input by id
      const passwordInput = document.getElementById(
        'login-password'
      ) as HTMLInputElement;
      const toggleButton = screen.getByRole('button', {
        name: /afficher le mot de passe/i,
      });

      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Click to show password
      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');

      // Click to hide password again
      const hideButton = screen.getByRole('button', {
        name: /masquer le mot de passe/i,
      });
      fireEvent.click(hideButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  /**
   * Test: Form validation and error display
   * Validates: Requirements 4.7, 4.8
   */
  describe('Validation and Errors', () => {
    it('should show error when email is empty on submit', async () => {
      render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onForgotPassword={mockOnForgotPassword}
        />
      );

      const submitButton = screen.getByRole('button', {
        name: /se connecter/i,
      });
      fireEvent.click(submitButton);

      // Wait for validation error (Requirement 4.7)
      // Both email and password fields will show "Ce champ est requis"
      await waitFor(() => {
        const errorMessages = screen.getAllByText(/ce champ est requis/i);
        expect(errorMessages.length).toBeGreaterThanOrEqual(1);
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when email format is invalid', async () => {
      render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onForgotPassword={mockOnForgotPassword}
        />
      );

      // Get inputs by id
      const emailInput = document.getElementById(
        'login-email'
      ) as HTMLInputElement;
      const passwordInput = document.getElementById(
        'login-password'
      ) as HTMLInputElement;
      const submitButton = screen.getByRole('button', {
        name: /se connecter/i,
      });

      // Enter invalid email
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      // Wait for validation error
      await waitFor(() => {
        expect(
          screen.getByText(/veuillez entrer une adresse e-mail valide/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when password is too short', async () => {
      render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onForgotPassword={mockOnForgotPassword}
        />
      );

      // Get inputs by id
      const emailInput = document.getElementById(
        'login-email'
      ) as HTMLInputElement;
      const passwordInput = document.getElementById(
        'login-password'
      ) as HTMLInputElement;
      const submitButton = screen.getByRole('button', {
        name: /se connecter/i,
      });

      // Enter valid email but short password
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'short' } });
      fireEvent.click(submitButton);

      // Wait for validation error (Requirement 4.8)
      await waitFor(() => {
        expect(
          screen.getByText(
            /le mot de passe doit contenir au moins 8 caractères/i
          )
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  /**
   * Test: Form submission
   * Validates: Requirements 4.6, 4.7, 4.8
   */
  describe('Form Submission', () => {
    it('should call onSubmit with form data when validation passes', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onForgotPassword={mockOnForgotPassword}
        />
      );

      // Get inputs by id
      const emailInput = document.getElementById(
        'login-email'
      ) as HTMLInputElement;
      const passwordInput = document.getElementById(
        'login-password'
      ) as HTMLInputElement;
      const rememberMeCheckbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', {
        name: /se connecter/i,
      });

      // Fill in valid data
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(rememberMeCheckbox);
      fireEvent.click(submitButton);

      // Wait for submission
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
          rememberMe: true,
        });
      });
    });

    it('should call onForgotPassword when forgot password link is clicked', () => {
      render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onForgotPassword={mockOnForgotPassword}
        />
      );

      const forgotPasswordButton = screen.getByText(/mot de passe oublié \?/i);
      fireEvent.click(forgotPasswordButton);

      expect(mockOnForgotPassword).toHaveBeenCalled();
    });

    it('should disable submit button while submitting', async () => {
      // Create a promise that we can control
      let resolveSubmit: () => void;
      const submitPromise = new Promise<void>(resolve => {
        resolveSubmit = resolve;
      });
      mockOnSubmit.mockReturnValue(submitPromise);

      render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onForgotPassword={mockOnForgotPassword}
        />
      );

      // Get inputs by id
      const emailInput = document.getElementById(
        'login-email'
      ) as HTMLInputElement;
      const passwordInput = document.getElementById(
        'login-password'
      ) as HTMLInputElement;
      const submitButton = screen.getByRole('button', {
        name: /se connecter/i,
      });

      // Fill in valid data
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      // Button should be disabled during submission
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /connexion en cours/i })
        ).toBeDisabled();
      });

      // Resolve the promise
      resolveSubmit!();

      // Button should be enabled again
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /se connecter/i })
        ).not.toBeDisabled();
      });
    });
  });
});
