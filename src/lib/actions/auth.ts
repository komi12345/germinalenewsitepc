"use server";

import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
});

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validation = loginSchema.safeParse({ email, password });
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        return { error: "Email ou mot de passe incorrect" };
      }
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error(
      "[auth.signIn] Erreur interne lors de la connexion",
      error
    );
    return {
      error:
        "Erreur interne lors de la connexion. Veuillez réessayer plus tard.",
    };
  }
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  const validation = registerSchema.safeParse({ email, password, fullName });
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        return { error: "Cet email est déjà utilisé" };
      }
      return { error: error.message };
    }

    return { success: "Un email de confirmation vous a été envoyé" };
  } catch {
    return { error: "Erreur interne lors de la création du compte. Veuillez réessayer plus tard." };
  }
}

export async function signOut() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Erreur interne lors de la déconnexion. Veuillez réessayer plus tard." };
  }
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Non authentifié" };
  }

  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const bio = formData.get("bio") as string;

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone,
      bio,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  return { success: "Profil mis à jour avec succès" };
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !z.string().email().safeParse(email).success) {
    return { error: "Email invalide" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Un email de réinitialisation vous a été envoyé" };
}
