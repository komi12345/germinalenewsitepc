import { render, screen, fireEvent } from '@testing-library/react';
import { FormSection } from '../FormSection';

describe('FormSection', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  describe('Header Section', () => {
    it('should display "EDITIONS GERMINALE" in gold', () => {
      render(<FormSection activeTab="login" onTabChange={mockOnTabChange} />);

      const brandName = screen.getByText('EDITIONS GERMINALE');
      expect(brandName).toBeInTheDocument();
      expect(brandName).toHaveClass('text-gold');
    });

    it('should display "Bienvenue" as main title', () => {
      render(<FormSection activeTab="login" onTabChange={mockOnTabChange} />);

      const title = screen.getByRole('heading', { name: /bienvenue/i });
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-dark');
    });

    it('should display subtitle in gray', () => {
      render(<FormSection activeTab="login" onTabChange={mockOnTabChange} />);

      const subtitle = screen.getByText(
        /connectez-vous pour accéder à votre bibliothèque/i
      );
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass('text-gray-500');
    });
  });

  describe('Tab Switcher Integration', () => {
    it('should render TabSwitcher component', () => {
      render(<FormSection activeTab="login" onTabChange={mockOnTabChange} />);

      expect(
        screen.getByRole('tab', { name: /connexion/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('tab', { name: /inscription/i })
      ).toBeInTheDocument();
    });

    it('should call onTabChange when tab is clicked', () => {
      render(<FormSection activeTab="login" onTabChange={mockOnTabChange} />);

      fireEvent.click(screen.getByRole('tab', { name: /inscription/i }));
      expect(mockOnTabChange).toHaveBeenCalledWith('register');
    });
  });

  describe('Conditional Form Display', () => {
    it('should display LoginForm when activeTab is login', () => {
      render(<FormSection activeTab="login" onTabChange={mockOnTabChange} />);

      expect(screen.getByLabelText(/adresse e-mail/i)).toBeInTheDocument();
      // Use getByLabelText with exact label text to avoid matching aria-label
      expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();
      // Check for the submit button text inside the form
      expect(screen.getByText('Se connecter')).toBeInTheDocument();
      expect(screen.queryByLabelText(/nom complet/i)).not.toBeInTheDocument();
    });

    it('should display RegisterForm when activeTab is register', () => {
      render(
        <FormSection activeTab="register" onTabChange={mockOnTabChange} />
      );

      expect(screen.getByLabelText(/nom complet/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/adresse e-mail/i)).toBeInTheDocument();
      expect(screen.getByText('Créer un compte')).toBeInTheDocument();
    });
  });

  describe('Social Auth Section', () => {
    it('should display separator "Ou continuer avec"', () => {
      render(<FormSection activeTab="login" onTabChange={mockOnTabChange} />);

      expect(screen.getByText(/ou continuer avec/i)).toBeInTheDocument();
    });

    it('should display Google and Apple buttons', () => {
      render(<FormSection activeTab="login" onTabChange={mockOnTabChange} />);

      // Use aria-label to find the social auth buttons specifically
      expect(
        screen.getByLabelText(/se connecter avec google/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/se connecter avec apple/i)
      ).toBeInTheDocument();
    });
  });

  describe('Switch Link', () => {
    it('should display "Créer un compte" link when on login view', () => {
      render(<FormSection activeTab="login" onTabChange={mockOnTabChange} />);

      expect(
        screen.getByText(/vous n'avez pas de compte/i)
      ).toBeInTheDocument();
      // Get the switch link button by its text content (not the form submit button)
      const switchSection = screen
        .getByText(/vous n'avez pas de compte/i)
        .closest('p');
      const createAccountLink = switchSection?.querySelector('button');
      expect(createAccountLink).toBeInTheDocument();
      expect(createAccountLink).toHaveClass('text-gold');
    });

    it('should display "Se connecter" link when on register view', () => {
      render(
        <FormSection activeTab="register" onTabChange={mockOnTabChange} />
      );

      expect(screen.getByText(/vous avez déjà un compte/i)).toBeInTheDocument();
      // Get the switch link button by its parent context
      const switchSection = screen
        .getByText(/vous avez déjà un compte/i)
        .closest('p');
      const loginLink = switchSection?.querySelector('button');
      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveClass('text-gold');
    });

    it('should switch to register when "Créer un compte" is clicked', () => {
      render(<FormSection activeTab="login" onTabChange={mockOnTabChange} />);

      // Get the switch link button by its parent context
      const switchSection = screen
        .getByText(/vous n'avez pas de compte/i)
        .closest('p');
      const createAccountLink = switchSection?.querySelector('button');
      if (createAccountLink) {
        fireEvent.click(createAccountLink);
      }
      expect(mockOnTabChange).toHaveBeenCalledWith('register');
    });

    it('should switch to login when "Se connecter" is clicked', () => {
      render(
        <FormSection activeTab="register" onTabChange={mockOnTabChange} />
      );

      // Get the switch link button by its parent context
      const switchSection = screen
        .getByText(/vous avez déjà un compte/i)
        .closest('p');
      const loginLink = switchSection?.querySelector('button');
      if (loginLink) {
        fireEvent.click(loginLink);
      }
      expect(mockOnTabChange).toHaveBeenCalledWith('login');
    });
  });

  describe('Legal Links', () => {
    it('should display "Conditions d\'utilisation" link', () => {
      render(<FormSection activeTab="login" onTabChange={mockOnTabChange} />);

      const termsLink = screen.getByRole('link', {
        name: /conditions d'utilisation/i,
      });
      expect(termsLink).toBeInTheDocument();
      expect(termsLink).toHaveAttribute('href', '/conditions-utilisation');
    });

    it('should display "Politique de confidentialité" link', () => {
      render(<FormSection activeTab="login" onTabChange={mockOnTabChange} />);

      const privacyLink = screen.getByRole('link', {
        name: /politique de confidentialité/i,
      });
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink).toHaveAttribute('href', '/politique-confidentialite');
    });
  });
});
