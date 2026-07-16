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

export default function LoginPage() {
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
