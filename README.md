# Meu Bolso — Controle Financeiro Pessoal

App de gestão financeira pessoal: registre receitas e despesas, acompanhe um dashboard com resumo mensal e gráfico por categoria, filtre e exporte suas transações.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + **shadcn/ui** (Base UI)
- **Supabase** (Postgres + Auth + Row Level Security)
- **Recharts**, **react-hook-form** + **zod**, **date-fns**

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Variáveis de ambiente

Copie `.env.local.example` para `.env.local` e preencha com os dados do seu projeto Supabase (**Project Settings → API**):

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Banco de dados

As tabelas usadas pelo app têm o prefixo `financas_` (`financas_categories`, `financas_transactions`) para não colidir com outras tabelas em projetos Supabase compartilhados. O schema completo, com RLS policies e seed de categorias, está em [`supabase-schema.sql`](./supabase-schema.sql) — rode esse arquivo no **SQL Editor** do seu projeto Supabase para recriar as tabelas.

> Por padrão, o Supabase exige confirmação de e-mail antes do primeiro login. Isso pode ser ajustado em **Authentication → Providers → Email** no dashboard do Supabase, caso queira permitir login imediato após o cadastro.

### Segurança

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` é a chave **publishable/anon** do Supabase — ela é destinada a ser exposta no cliente e depende das políticas de **Row Level Security** (já habilitadas em `supabase-schema.sql`) para restringir o acesso aos dados de cada usuário. Nunca coloque a chave `service_role` (secreta) em variáveis `NEXT_PUBLIC_*` nem no código do cliente.
- Todas as queries de transações no servidor ([src/lib/data/transactions.ts](./src/lib/data/transactions.ts), [src/lib/actions/transactions.ts](./src/lib/actions/transactions.ts)) filtram explicitamente por `user_id` do usuário autenticado, como camada extra de defesa além do RLS.

## Deploy na Vercel

1. Suba o código para um repositório no GitHub.
2. Importe o repositório em [vercel.com/new](https://vercel.com/new).
3. Configure as variáveis de ambiente `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` em **Project Settings → Environment Variables**.
4. Deploy. A cada push na branch principal, a Vercel builda e publica automaticamente.

## Funcionalidades

- Autenticação (e-mail/senha) com proteção de rotas
- Dashboard com Receita Total, Despesa Total, Saldo e gráfico de pizza por categoria
- CRUD de transações (criar, editar, excluir)
- Categorias pré-definidas
- Filtros por mês/ano, categoria e busca por descrição
- Exportação das transações filtradas em CSV
- Layout responsivo (desktop e mobile)
