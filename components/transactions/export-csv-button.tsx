"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TransactionWithCategory } from "@/lib/types/database";

function escapeCsvField(value: string) {
  if (/[";\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function buildCsv(transactions: TransactionWithCategory[]) {
  const header = ["Descrição", "Categoria", "Data", "Tipo", "Valor"];
  const rows = transactions.map((t) => [
    t.description,
    t.financas_categories?.name ?? "",
    t.date,
    t.type === "income" ? "Receita" : "Despesa",
    t.amount.toFixed(2).replace(".", ","),
  ]);

  return [header, ...rows]
    .map((row) => row.map((field) => escapeCsvField(String(field))).join(";"))
    .join("\n");
}

export function ExportCsvButton({
  transactions,
}: {
  transactions: TransactionWithCategory[];
}) {
  function handleExport() {
    const csv = "﻿" + buildCsv(transactions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transacoes-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button
      variant="outline"
      onClick={handleExport}
      disabled={transactions.length === 0}
    >
      <Download className="mr-2 size-4" />
      Exportar CSV
    </Button>
  );
}
