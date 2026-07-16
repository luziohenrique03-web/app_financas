import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthForm } from "@/components/auth/auth-form";
import { signup } from "@/lib/actions/auth";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-4">
      <Link href="/" className="mb-6 text-xl font-semibold">
        Meu Bolso
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Comece a organizar suas finanças em minutos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm
            action={signup}
            submitLabel="Criar conta"
            pendingLabel="Criando conta..."
            footerText="Já tem conta?"
            footerLinkHref="/login"
            footerLinkText="Entrar"
          />
        </CardContent>
      </Card>
    </div>
  );
}
