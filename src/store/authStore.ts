import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile } from "@/src/types/database";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      isLoading: true,
      isAuthenticated: false,
      setUser: (user) =>
        set({ user, isAuthenticated: !!user, isLoading: false }),
      setProfile: (profile) => set({ profile }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () =>
        set({ user: null, profile: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
