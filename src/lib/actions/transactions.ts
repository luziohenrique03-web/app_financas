"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  transactionSchema,
  type TransactionFormValues,
} from "@/lib/validations/transaction";

export async function createTransaction(values: TransactionFormValues) {
  const validated = transactionSchema.parse(values);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  const { error } = await supabase
    .from("financas_transactions")
    .insert({ ...validated, user_id: user.id });

  if (error) {
    throw new Error("Não foi possível salvar a transação.");
  }

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
}

export async function updateTransaction(
  id: string,
  values: TransactionFormValues
) {
  const validated = transactionSchema.parse(values);

  const supabase = await createClient();
  const { error } = await supabase
    .from("financas_transactions")
    .update({ ...validated, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error("Não foi possível atualizar a transação.");
  }

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("financas_transactions")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Não foi possível excluir a transação.");
  }

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
}
