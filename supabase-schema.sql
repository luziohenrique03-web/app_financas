-- Run this in the Supabase SQL editor (or `supabase db push`) to set up the schema.

create table if not exists public.financas_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.financas_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  description text not null,
  amount numeric(12, 2) not null check (amount > 0),
  date date not null,
  type text not null check (type in ('income', 'expense')),
  category_id uuid references public.financas_categories (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists financas_transactions_user_id_idx on public.financas_transactions (user_id);
create index if not exists financas_transactions_date_idx on public.financas_transactions (date);
create index if not exists financas_transactions_category_id_idx on public.financas_transactions (category_id);

alter table public.financas_categories enable row level security;
alter table public.financas_transactions enable row level security;

-- Categories are a shared list, readable by any signed-in user.
create policy "Authenticated users can read categories"
  on public.financas_categories for select
  to authenticated
  using (true);

-- Transactions are private to their owner.
create policy "Users can read their own transactions"
  on public.financas_transactions for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
  on public.financas_transactions for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own transactions"
  on public.financas_transactions for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own transactions"
  on public.financas_transactions for delete
  to authenticated
  using (auth.uid() = user_id);

insert into public.financas_categories (name)
values
  ('Alimentação'),
  ('Transporte'),
  ('Moradia'),
  ('Saúde'),
  ('Educação'),
  ('Lazer'),
  ('Salário'),
  ('Trabalho'),
  ('Investimentos'),
  ('Outros')
on conflict (name) do nothing;
