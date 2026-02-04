import { signIn, signUp } from '../auth';
import { createClient } from '@/src/lib/supabase/server';

// Mock des fonctions auth
const mockSignInWithPassword = jest.fn();
const mockSignUp = jest.fn();

// Mock du module supabase
jest.mock('@/src/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

describe('auth actions - signIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Configuration par défaut du mock createClient
    (createClient as jest.Mock).mockResolvedValue({
      auth: {
        signInWithPassword: mockSignInWithPassword,
        signUp: mockSignUp,
      },
    });
  });

  it('retourne une erreur de validation pour un email invalide', async () => {
    const formData = new FormData();
    formData.append('email', 'invalid-email');
    formData.append('password', 'password123');

    const result = await signIn(formData);

    expect(result).toEqual({ error: 'Email invalide' });
  });

  it('retourne une erreur fonctionnelle pour des identifiants invalides', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'password123');

    mockSignInWithPassword.mockResolvedValueOnce({
      data: null,
      error: { message: 'Invalid login credentials' },
    });

    const result = await signIn(formData);

    expect(result).toEqual({ error: 'Email ou mot de passe incorrect' });
  });

  it('retourne un succès en cas de connexion valide', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'password123');

    mockSignInWithPassword.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    const result = await signIn(formData);

    expect(result).toEqual({ success: true });
  });
});

describe('auth actions - signUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockResolvedValue({
      auth: {
        signInWithPassword: mockSignInWithPassword,
        signUp: mockSignUp,
      },
    });
  });

  it('retourne une erreur de validation quand les données sont invalides', async () => {
    const formData = new FormData();
    formData.append('email', 'invalid-email');
    formData.append('password', 'short');
    formData.append('fullName', 'A');

    const result = await signUp(formData);

    expect(result).toHaveProperty('error');
  });

  it("retourne une erreur fonctionnelle quand l'email est déjà utilisé", async () => {
    const formData = new FormData();
    formData.append('email', 'existing@example.com');
    formData.append('password', 'Password123');
    formData.append('fullName', 'Utilisateur Existant');

    mockSignUp.mockResolvedValueOnce({
      data: null,
      error: { message: 'User already registered' },
    });

    const result = await signUp(formData);

    expect(result).toEqual({ error: 'Cet email est déjà utilisé' });
  });
});
