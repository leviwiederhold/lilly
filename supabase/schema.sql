create extension if not exists "pgcrypto";

create table if not exists public.income (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  client_name text not null,
  service text not null,
  payment_type text not null,
  amount numeric(12, 2) not null check (amount >= 0),
  tip numeric(12, 2) not null default 0 check (tip >= 0),
  total numeric(12, 2) not null check (total >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  vendor text not null,
  category text not null,
  description text not null default '',
  amount numeric(12, 2) not null check (amount >= 0),
  payment_method text not null,
  business_percent numeric(5, 4) not null default 1 check (business_percent >= 0 and business_percent <= 1),
  deductible_amount numeric(12, 2) not null check (deductible_amount >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.cash_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  starting_cash numeric(12, 2) not null default 0,
  cash_earned numeric(12, 2) not null default 0,
  cash_spent numeric(12, 2) not null default 0,
  ending_cash numeric(12, 2) not null,
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  business_name text not null default 'Studio Balance',
  tax_rate numeric(5, 4) not null default 0.25 check (tax_rate >= 0 and tax_rate <= 1)
);

alter table public.income enable row level security;
alter table public.expenses enable row level security;
alter table public.cash_logs enable row level security;
alter table public.settings enable row level security;

create policy "income_select_own" on public.income for select using (user_id = auth.uid());
create policy "income_insert_own" on public.income for insert with check (user_id = auth.uid());
create policy "income_update_own" on public.income for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "income_delete_own" on public.income for delete using (user_id = auth.uid());

create policy "expenses_select_own" on public.expenses for select using (user_id = auth.uid());
create policy "expenses_insert_own" on public.expenses for insert with check (user_id = auth.uid());
create policy "expenses_update_own" on public.expenses for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "expenses_delete_own" on public.expenses for delete using (user_id = auth.uid());

create policy "cash_logs_select_own" on public.cash_logs for select using (user_id = auth.uid());
create policy "cash_logs_insert_own" on public.cash_logs for insert with check (user_id = auth.uid());
create policy "cash_logs_update_own" on public.cash_logs for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "cash_logs_delete_own" on public.cash_logs for delete using (user_id = auth.uid());

create policy "settings_select_own" on public.settings for select using (user_id = auth.uid());
create policy "settings_insert_own" on public.settings for insert with check (user_id = auth.uid());
create policy "settings_update_own" on public.settings for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "settings_delete_own" on public.settings for delete using (user_id = auth.uid());

create index if not exists income_user_date_idx on public.income(user_id, date desc);
create index if not exists expenses_user_date_idx on public.expenses(user_id, date desc);
create index if not exists cash_logs_user_date_idx on public.cash_logs(user_id, date desc);
