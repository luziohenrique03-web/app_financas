import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wallet,
  PieChart,
  ListChecks,
  Filter,
  Download,
  Smartphone,
} from "lucide-react";

const FEATURES = [
  {
    icon: ListChecks,
    title: "Controle de transações",
    description: "Registre receitas e despesas em segundos, com categorias pré-definidas.",
  },
  {
    icon: PieChart,
    title: "Dashboard visual",
    description: "Veja receitas, despesas e saldo do mês, com gráfico de gastos por categoria.",
  },
  {
    icon: Filter,
    title: "Filtros e busca",
    description: "Encontre qualquer transação por mês, categoria ou descrição.",
  },
  {
    icon: Download,
    title: "Exportação em CSV",
    description: "Baixe seus dados filtrados para analisar onde quiser.",
  },
  {
    icon: Smartphone,
    title: "Responsivo",
    description: "Use no computador ou no celular, com a mesma experiência.",
  },
  {
    icon: Wallet,
    title: "Seus dados, só seus",
    description: "Autenticação segura e cada usuário só acessa as próprias transações.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between border-b p-4 md:px-8">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Wallet className="size-5 text-primary" />
          Meu Bolso
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" nativeButton={false} render={<Link href="/login" />}>
            Entrar
          </Button>
          <Button nativeButton={false} render={<Link href="/signup" />}>
            Cadastre-se grátis
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center md:py-28">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Organize suas finanças de forma simples e visual
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Registre receitas e despesas, acompanhe seu saldo mensal e entenda
            para onde vai o seu dinheiro — tudo em um só lugar.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" nativeButton={false} render={<Link href="/signup" />}>
              Começar agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              Já tenho conta
            </Button>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-24">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <Icon className="size-6 text-primary" />
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t p-4 text-center text-sm text-muted-foreground">
        Meu Bolso — controle financeiro pessoal.
      </footer>
    </div>
  );
}
