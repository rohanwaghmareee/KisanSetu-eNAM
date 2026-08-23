-- Run this in Supabase SQL Editor (https://app.supabase.com → SQL Editor)

-- Chat history (Gemini chatbot)
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('user','assistant')),
  content text not null,
  meta jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);
alter table chat_messages enable row level security;
create policy "Allow all for demo (lock down for prod)" on chat_messages for all using (true) with check (true);

-- Farmer lots (from Live Demo)
create table if not exists lots (
  id text primary key,
  crop text not null,
  qty text not null,
  grade text not null,
  mandi text not null,
  price int not null,
  status text,
  created_at timestamp with time zone default now()
);
alter table lots enable row level security;
create policy "Allow all for demo" on lots for all using (true) with check (true);

-- Offers
create table if not exists offers (
  id text primary key,
  buyer text not null,
  qty text not null,
  price int not null,
  status text,
  created_at timestamp with time zone default now()
);
alter table offers enable row level security;
create policy "Allow all for demo" on offers for all using (true) with check (true);

-- Price alerts
create table if not exists price_alerts (
  id uuid primary key default gen_random_uuid(),
  crop text not null,
  target int not null,
  created_at timestamp with time zone default now()
);
alter table price_alerts enable row level security;
create policy "Allow all for demo" on price_alerts for all using (true) with check (true);

-- Grievances
create table if not exists grievances (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  status text default 'Submitted to APMC',
  created_at timestamp with time zone default now()
);
alter table grievances enable row level security;
create policy "Allow all for demo" on grievances for all using (true) with check (true);
