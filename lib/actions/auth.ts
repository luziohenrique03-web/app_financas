"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { authSchema } from "@/lib/validations/transaction";

export type AuthState = { error?: string; message?: string } | undefined;

export async function login(
  _state: AuthState,
  formData: FormData
): Promise<AuthState> {
  const validated = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { error: "Verifique o e-mail e a senha informados." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(validated.data);

  if (error) {
    return { error: "E-mail ou senha inválidos." };
  }

  redirect("/dashboard");
}

export async function signup(
  _state: AuthState,
  formData: FormData
): Promise<AuthState> {
  const validated = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return {
      error: validated.error.issues[0]?.message ?? "Dados inválidos.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp(validated.data);

  if (error) {
    return { error: error.message };
  }

  if (!data.session) {
    return {
      message: "Conta criada! Confira seu e-mail para confirmar o cadastro antes de entrar.",
    };
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
