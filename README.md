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

As tabelas usadas pelo app têm o prefixo `financas_` (`financas_categories`, `financas_transactions`) para não colidir com outras tabelas em projetos Supabase compartilhados. O schema, RLS policies e seed de categorias estão documentados no plano de implementação; para recriar em um projeto novo, rode o SQL abaixo no SQL Editor do Supabase:

```sql
create table financas_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz default now()
);

create type financas_transaction_type as enum ('income', 'expense');

create table financas_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  description text not null,
  amount numeric(12,2) not null check (amount > 0),
  date date not null,
  type financas_transaction_type not null,
  category_id uuid references financas_categories(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index financas_transactions_user_id_date_idx on financas_transactions(user_id, date desc);

alter table financas_transactions enable row level security;
create policy "select_own" on financas_transactions for select using (auth.uid() = user_id);
create policy "insert_own" on financas_transactions for insert with check (auth.uid() = user_id);
create policy "update_own" on financas_transactions for update using (auth.uid() = user_id);
create policy "delete_own" on financas_transactions for delete using (auth.uid() = user_id);

alter table financas_categories enable row level security;
create policy "read_all_categories" on financas_categories for select using (true);

insert into financas_categories (name) values
('Alimentação'),('Transporte'),('Moradia'),('Lazer'),('Saúde'),
('Educação'),('Salário'),('Freelance'),('Outros');
```

> Por padrão, o Supabase exige confirmação de e-mail antes do primeiro login. Isso pode ser ajustado em **Authentication → Providers → Email** no dashboard do Supabase, caso queira permitir login imediato após o cadastro.

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
