import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function SummaryCards({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) {
  const balance = income - expense;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Receita Total
          </CardTitle>
          <ArrowUpCircle className="size-5 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-emerald-600">
            {currencyFormatter.format(income)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Despesa Total
          </CardTitle>
          <ArrowDownCircle className="size-5 text-red-600" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-red-600">
            {currencyFormatter.format(expense)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Saldo
          </CardTitle>
          <Wallet className="size-5 text-primary" />
        </CardHeader>
        <CardContent>
          <p
            className={`text-2xl font-semibold ${
              balance >= 0 ? "text-foreground" : "text-red-600"
            }`}
          >
            {currencyFormatter.format(balance)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
