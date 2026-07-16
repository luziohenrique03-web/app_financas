import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionFormDialog } from "@/components/transactions/transaction-form-dialog";
import { TransactionTable } from "@/components/transactions/transaction-table";
import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { ExportCsvButton } from "@/components/transactions/export-csv-button";
import { getCategories, getTransactions } from "@/lib/data/transactions";

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    month?: string;
    year?: string;
    category?: string;
    q?: string;
  }>;
}) {
  const params = await searchParams;

  const [categories, transactions] = await Promise.all([
    getCategories(),
    getTransactions({
      month: params.month ? Number(params.month) : undefined,
      year: params.year ? Number(params.year) : undefined,
      category: params.category,
      q: params.q,
    }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Transações</h1>
        <div className="flex gap-2">
          <ExportCsvButton transactions={transactions} />
          <TransactionFormDialog
            categories={categories}
            trigger={
              <Button>
                <Plus className="mr-2 size-4" />
                Nova transação
              </Button>
            }
          />
        </div>
      </div>

      <TransactionFilters categories={categories} />

      <TransactionTable transactions={transactions} categories={categories} />
    </div>
  );
}
