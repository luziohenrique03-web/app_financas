import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthForm } from "@/components/auth/auth-form";
import { login } from "@/lib/actions/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-4">
      <Link href="/" className="mb-6 text-xl font-semibold">
        Meu Bolso
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>
            Acesse sua conta para gerenciar suas finanças.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error === "confirm_failed" && (
            <p className="mb-4 text-sm text-destructive">
              Não foi possível confirmar seu e-mail. O link pode ter
              expirado — tente se cadastrar novamente ou faça login se já
              confirmou antes.
            </p>
          )}
          <AuthForm
            action={login}
            submitLabel="Entrar"
            pendingLabel="Entrando..."
            footerText="Ainda não tem conta?"
            footerLinkHref="/signup"
            footerLinkText="Cadastre-se"
          />
        </CardContent>
      </Card>
    </div>
  );
}
