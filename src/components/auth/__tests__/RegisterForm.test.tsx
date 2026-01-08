/**
 * Unit Tests for RegisterForm
 * 
 * Tests for the registration form component including:
 * - Field rendering
 * - Password visibility toggle
 * - Password match validation
 * - Form validation and error display
 * - Form submission
 * 
 * **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7**
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from '../RegisterForm';

describe('RegisterForm - Unit Tests', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test: Render all form fields
   * Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5
   */
  describe('Field Rendering', () => {
    it('should render full name input with label and placeholder', () => {
      render(<RegisterForm onSubmit={mockOnSubmit} />);

      // Check full name label (Requirement 5.1)
      expect(screen.getByLabelText(/nom complet/i)).toBeInTheDocument();
      
      // Check full name placeholder
      expect(screen.getByPlaceholderText('Jean Dupont')).toBeInTheDocument();
    });

    it('should render email input with label and placeholder', () => {
      render(<RegisterForm onSubmit={mockOnSubmit} />);

      // Check email label (Requirement 5.2)
      expect(screen.getByLabelText(/adresse e-mail/i)).toBeInTheDocument();
      
      // Check email placeholder
      expect(screen.getByPlaceholderText('exemple@email.com')).toBeInTheDocument();
    });

    it('should render password input with label and placeholder', () => {
      render(<RegisterForm onSubmit={mockOnSubmit} />);

      // Check password label (Requirement 5.3)
      const passwordLabel = screen.getByText('Mot de passe');
      expect(passwordLabel).toBeInTheDocument();
      
      // Check password placeholders (both password fields have same placeholder)
      const placeholders = screen.getAllByPlaceholderText('••••••••');
      expect(placeholders.length).toBe(2);
    });

    it('should render confirm password input with label', () => {
      render(<RegisterForm onSubmit={mockOnSubmit} />);

      // Check confirm password label (Requirement 5.4)
      expect(screen.getByLabelText(/confirmer le mot de passe/i)).toBeInTheDocument();
    });

    it('should render submit button with correct text', () => {
      render(<RegisterForm onSubmit={mockOnSubmit} />);

      // Check submit button (Requirement 5.5)
      const submitButton = screen.getByRole('button', { name: /créer un compte/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });


  /**
   * Test: Password visibility toggle
   * Validates: Requirement 5.3, 5.4
   */
  describe('Password Toggle', () => {
    it('should toggle password visibility when eye icon is clicked', async () => {
      render(<RegisterForm onSubmit={mockOnSubmit} />);

      // Get password input by id
      const passwordInput = document.getElementById('register-password') as HTMLInputElement;
      const toggleButtons = screen.getAllByRole('button', { name: /afficher le mot de passe/i });

      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Click to show password
      fireEvent.click(toggleButtons[0]);
      expect(passwordInput).toHaveAttribute('type', 'text');

      // Click to hide password again
      const hideButton = screen.getByRole('button', { name: /masquer le mot de passe/i });
      fireEvent.click(hideButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should toggle confirm password visibility independently', async () => {
      render(<RegisterForm onSubmit={mockOnSubmit} />);

      // Get confirm password input by id
      const confirmPasswordInput = document.getElementById('register-confirm-password') as HTMLInputElement;
      const toggleButtons = screen.getAllByRole('button', { name: /afficher le mot de passe/i });

      // Initially confirm password should be hidden
      expect(confirmPasswordInput).toHaveAttribute('type', 'password');

      // Click to show confirm password (second toggle button)
      fireEvent.click(toggleButtons[1]);
      expect(confirmPasswordInput).toHaveAttribute('type', 'text');
    });
  });

  /**
   * Test: Password match validation
   * Validates: Requirement 5.6
   */
  describe('Password Match Validation', () => {
    it('should show error when passwords do not match', async () => {
      render(<RegisterForm onSubmit={mockOnSubmit} />);

      // Get inputs by id
      const fullNameInput = document.getElementById('register-fullname') as HTMLInputElement;
      const emailInput = document.getElementById('register-email') as HTMLInputElement;
      const passwordInput = document.getElementById('register-password') as HTMLInputElement;
      const confirmPasswordInput = document.getElementById('register-confirm-password') as HTMLInputElement;
      const submitButton = screen.getByRole('button', { name: /créer un compte/i });

      // Fill in valid data but with mismatched passwords
      fireEvent.change(fullNameInput, { target: { value: 'Jean Dupont' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });
      fireEvent.click(submitButton);

      // Wait for validation error (Requirement 5.6)
      await waitFor(() => {
        expect(screen.getByText(/les mots de passe ne correspondent pas/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });


  /**
   * Test: Form validation and error display
   * Validates: Requirement 5.7
   */
  describe('Validation and Errors', () => {
    it('should show error when required fields are empty on submit', async () => {
      render(<RegisterForm onSubmit={mockOnSubmit} />);

      const submitButton = screen.getByRole('button', { name: /créer un compte/i });
      fireEvent.click(submitButton);

      // Wait for validation errors (Requirement 5.7)
      await waitFor(() => {
        const errorMessages = screen.getAllByText(/ce champ est requis/i);
        expect(errorMessages.length).toBeGreaterThanOrEqual(1);
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when email format is invalid', async () => {
      render(<RegisterForm onSubmit={mockOnSubmit} />);

      const fullNameInput = document.getElementById('register-fullname') as HTMLInputElement;
      const emailInput = document.getElementById('register-email') as HTMLInputElement;
      const passwordInput = document.getElementById('register-password') as HTMLInputElement;
      const confirmPasswordInput = document.getElementById('register-confirm-password') as HTMLInputElement;
      const submitButton = screen.getByRole('button', { name: /créer un compte/i });

      fireEvent.change(fullNameInput, { target: { value: 'Jean Dupont' } });
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/veuillez entrer une adresse e-mail valide/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when password is too short', async () => {
      render(<RegisterForm onSubmit={mockOnSubmit} />);

      const fullNameInput = document.getElementById('register-fullname') as HTMLInputElement;
      const emailInput = document.getElementById('register-email') as HTMLInputElement;
      const passwordInput = document.getElementById('register-password') as HTMLInputElement;
      const confirmPasswordInput = document.getElementById('register-confirm-password') as HTMLInputElement;
      const submitButton = screen.getByRole('button', { name: /créer un compte/i });

      fireEvent.change(fullNameInput, { target: { value: 'Jean Dupont' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'short' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'short' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/le mot de passe doit contenir au moins 8 caractères/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });


  /**
   * Test: Form submission
   * Validates: Requirements 5.5, 5.6, 5.7
   */
  describe('Form Submission', () => {
    it('should call onSubmit with form data when validation passes', async () => {
      mockOnSubmit.mockResolvedValue(undefined);
      
      render(<RegisterForm onSubmit={mockOnSubmit} />);

      const fullNameInput = document.getElementById('register-fullname') as HTMLInputElement;
      const emailInput = document.getElementById('register-email') as HTMLInputElement;
      const passwordInput = document.getElementById('register-password') as HTMLInputElement;
      const confirmPasswordInput = document.getElementById('register-confirm-password') as HTMLInputElement;
      const submitButton = screen.getByRole('button', { name: /créer un compte/i });

      fireEvent.change(fullNameInput, { target: { value: 'Jean Dupont' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          fullName: 'Jean Dupont',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        });
      });
    });

    it('should disable submit button while submitting', async () => {
      let resolveSubmit: () => void;
      const submitPromise = new Promise<void>((resolve) => {
        resolveSubmit = resolve;
      });
      mockOnSubmit.mockReturnValue(submitPromise);

      render(<RegisterForm onSubmit={mockOnSubmit} />);

      const fullNameInput = document.getElementById('register-fullname') as HTMLInputElement;
      const emailInput = document.getElementById('register-email') as HTMLInputElement;
      const passwordInput = document.getElementById('register-password') as HTMLInputElement;
      const confirmPasswordInput = document.getElementById('register-confirm-password') as HTMLInputElement;
      const submitButton = screen.getByRole('button', { name: /créer un compte/i });

      fireEvent.change(fullNameInput, { target: { value: 'Jean Dupont' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /création en cours/i })).toBeDisabled();
      });

      resolveSubmit!();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /créer un compte/i })).not.toBeDisabled();
      });
    });
  });
});
