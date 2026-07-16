import { createClient } from "@/lib/supabase/server";
import type { TransactionWithCategory } from "@/lib/types/database";

export type TransactionFilters = {
  month?: number;
  year?: number;
  category?: string;
  q?: string;
};

function monthRange(month: number, year: number) {
  const start = new Date(Date.UTC(year, month - 1, 1)).toISOString().slice(0, 10);
  const end = new Date(Date.UTC(year, month, 1)).toISOString().slice(0, 10);
  return { start, end };
}

export async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("financas_categories")
    .select("*")
    .order("name");
  return data ?? [];
}

export async function getTransactions(filters: TransactionFilters) {
  const supabase = await createClient();
  const now = new Date();
  const month = filters.month ?? now.getMonth() + 1;
  const year = filters.year ?? now.getFullYear();
  const { start, end } = monthRange(month, year);

  let query = supabase
    .from("financas_transactions")
    .select("*, financas_categories(id, name)")
    .gte("date", start)
    .lt("date", end)
    .order("date", { ascending: false });

  if (filters.category) {
    query = query.eq("category_id", filters.category);
  }

  if (filters.q) {
    query = query.ilike("description", `%${filters.q}%`);
  }

  const { data } = await query;
  return (data ?? []) as unknown as TransactionWithCategory[];
}
