import { SummaryCards } from "@/components/dashboard/summary-cards";
import { CategoryPieChart, type CategorySlice } from "@/components/dashboard/category-pie-chart";
import { getTransactions } from "@/lib/data/transactions";

export default async function DashboardPage() {
  const transactions = await getTransactions({});

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const expensesByCategory = new Map<string, number>();
  for (const t of transactions) {
    if (t.type !== "expense") continue;
    const name = t.financas_categories?.name ?? "Outros";
    expensesByCategory.set(name, (expensesByCategory.get(name) ?? 0) + t.amount);
  }
  const categoryData: CategorySlice[] = Array.from(
    expensesByCategory,
    ([name, value]) => ({ name, value })
  ).sort((a, b) => b.value - a.value);

  const now = new Date();
  const monthLabel = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(now);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm capitalize text-muted-foreground">{monthLabel}</p>
      </div>

      <SummaryCards income={income} expense={expense} />

      <CategoryPieChart data={categoryData} />
    </div>
  );
}
