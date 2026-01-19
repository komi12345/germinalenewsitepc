import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import React from "react";
import { Header } from "../Header";
import { useAuthStore } from "@/src/store";
import { signOut } from "@/src/lib/actions/auth";

// Mock hooks
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/",
}));

jest.mock("@/src/store", () => ({
  useAuthStore: jest.fn(),
  useNotificationStore: jest.fn(() => ({
    notifications: [],
    unreadCount: 0,
    markAsRead: jest.fn(),
    markAllAsRead: jest.fn(),
  })),
}));

jest.mock("@/src/lib/actions/auth", () => ({
  signOut: jest.fn(),
}));

// Mock Lucide icons
jest.mock("lucide-react", () => ({
  Search: () => <div data-testid="search-icon" />,
  Bell: () => <div data-testid="bell-icon" />,
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="x-icon" />,
  ChevronDown: () => <div data-testid="chevron-down-icon" />,
  User: () => <div data-testid="user-icon" />,
  BookOpen: () => <div data-testid="book-open-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  LogOut: () => <div data-testid="logout-icon" />,
  Library: () => <div data-testid="library-icon" />,
  FileText: () => <div data-testid="file-text-icon" />,
  ShoppingBag: () => <div data-testid="shopping-bag-icon" />,
}));

// Mock Next.js Image
jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: React.ComponentProps<"img">) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt || ""} />;
    },
}));

describe("Header Logout Notification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows notification on logout and hides it after 5 seconds", async () => {
    const mockLogout = jest.fn();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { email: "test@example.com" },
      profile: { full_name: "Test User" },
      isAuthenticated: true,
      logout: mockLogout,
    });

    (signOut as jest.Mock).mockResolvedValue({ success: true });

    render(<Header />);

    // Open profile menu
    const profileButton = screen.getByText("Test User");
    fireEvent.click(profileButton);

    // Click logout (use getAllByText because mobile menu also has one)
    const logoutButtons = screen.getAllByText("Déconnexion");
    fireEvent.click(logoutButtons[0]);

    // Wait for signOut to be called and message to appear
    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(screen.getByText("Vous avez été déconnecté avec succès.")).toBeInTheDocument();
    });

    // Fast-forward time by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Check if message is gone
    await waitFor(() => {
      expect(screen.queryByText("Vous avez été déconnecté avec succès.")).not.toBeInTheDocument();
    });
  });

  it("shows error notification if logout fails", async () => {
     (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { email: "test@example.com" },
      profile: { full_name: "Test User" },
      isAuthenticated: true,
      logout: jest.fn(),
    });

    (signOut as jest.Mock).mockResolvedValue({ error: "Erreur de déconnexion" });

    render(<Header />);

    // Open profile menu
    const profileButton = screen.getByText("Test User");
    fireEvent.click(profileButton);

    // Click logout
    const logoutButtons = screen.getAllByText("Déconnexion");
    fireEvent.click(logoutButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Erreur de déconnexion")).toBeInTheDocument();
    });
    
    // Also check that it disappears after 5 seconds
    act(() => {
        jest.advanceTimersByTime(5000);
    });
    
     await waitFor(() => {
      expect(screen.queryByText("Erreur de déconnexion")).not.toBeInTheDocument();
    });
  });
});
