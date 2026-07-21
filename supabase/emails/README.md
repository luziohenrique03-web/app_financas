# E-mails de autenticação

Templates HTML customizados para os e-mails que o Supabase Auth envia. O Supabase não lê estes arquivos automaticamente — cole o conteúdo manualmente no dashboard.

## Confirm signup (`confirm-signup.html`)

1. No dashboard do Supabase: **Authentication → Emails → Templates → Confirm signup**.
2. **Subject**: `Confirme seu e-mail — Meu Bolso`
3. **Message body**: cole o conteúdo de [`confirm-signup.html`](./confirm-signup.html).
4. Salve.

### Pré-requisitos para o link funcionar

- **Authentication → URL Configuration → Site URL**: precisa apontar para o domínio de produção (ex: `https://app-financas-gamma-jade.vercel.app`), não `localhost`. As variáveis `{{ .SiteURL }}` do template usam esse valor.
- **Authentication → URL Configuration → Redirect URLs**: adicione o mesmo domínio de produção à lista permitida.
- O template usa `{{ .TokenHash }}` (não `{{ .ConfirmationURL }}`) apontando para a rota própria do app em `/auth/confirm` ([src/app/auth/confirm/route.ts](../../src/app/auth/confirm/route.ts)), que valida o token via `supabase.auth.verifyOtp` e cria a sessão do lado do servidor — o padrão recomendado pelo Supabase para apps SSR (Next.js).
