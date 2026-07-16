"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AuthState } from "@/lib/actions/auth";

export function AuthForm({
  action,
  submitLabel,
  pendingLabel,
  footerText,
  footerLinkHref,
  footerLinkText,
}: {
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
  submitLabel: string;
  pendingLabel: string;
  footerText: string;
  footerLinkHref: string;
  footerLinkText: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="voce@exemplo.com"
          required
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      {state?.message && (
        <p className="text-sm text-emerald-600">{state.message}</p>
      )}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? pendingLabel : submitLabel}
      </Button>
      <p className="text-sm text-muted-foreground text-center">
        {footerText}{" "}
        <Link href={footerLinkHref} className="text-primary underline underline-offset-4">
          {footerLinkText}
        </Link>
      </p>
    </form>
  );
}
