"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore, useNotificationStore } from "@/src/store";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setProfile, setLoading, logout } = useAuthStore();
  const { setNotifications } = useNotificationStore();
  const pathname = usePathname();

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setLoading(false);
      return;
    }

    const initializeAuth = async () => {
      try {
        const { createClient } = await import("@/src/lib/supabase/client");
        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUser({ id: user.id, email: user.email || "" });

          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profile) {
            setProfile(profile as never);
          }

          const { data: notifications } = await supabase
            .from("notifications")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(20);

          if (notifications) {
            setNotifications(notifications as never);
          }
        } else {
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    };

    initializeAuth();

    const setupSubscription = async () => {
      try {
        const { createClient } = await import("@/src/lib/supabase/client");
        const supabase = createClient();

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === "SIGNED_IN" && session?.user) {
            setUser({ id: session.user.id, email: session.user.email || "" });

            const { data: profile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (profile) {
              setProfile(profile as never);
            }

            const { data: notifications } = await supabase
              .from("notifications")
              .select("*")
              .eq("user_id", session.user.id)
              .order("created_at", { ascending: false })
              .limit(20);

            if (notifications) {
              setNotifications(notifications as never);
            }
          } else if (event === "SIGNED_OUT") {
            logout();
            setNotifications([]);
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch {
        return () => {};
      }
    };

    const cleanupPromise = setupSubscription();

    return () => {
      cleanupPromise.then((cleanup) => cleanup());
    };
  }, [setUser, setProfile, setLoading, logout, setNotifications]);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return;
    }

    const refreshAuth = async () => {
      try {
        const { createClient } = await import("@/src/lib/supabase/client");
        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUser({ id: user.id, email: user.email || "" });

          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profile) {
            setProfile(profile as never);
          }

          const { data: notifications } = await supabase
            .from("notifications")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(20);

          if (notifications) {
            setNotifications(notifications as never);
          }
        }
      } catch {
      }
    };

    refreshAuth();
  }, [pathname, setUser, setProfile, setNotifications]);

  return <>{children}</>;
}
