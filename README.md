# Studio Balance

Mobile-first private finance tracker for one esthetician.

## Folder Structure

- `app/(auth)/login` - Supabase email/password login and sign-up.
- `app/(app)` - authenticated app screens.
- `app/api` - JSON API routes for income, expenses, cash, and summary.
- `components` - shared shell, forms, icons, export buttons.
- `lib` - Supabase clients, validation, calculations, formatting.
- `supabase/schema.sql` - Postgres tables, indexes, and RLS policies.

## Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. In Authentication > Providers, enable Email.
4. For a private one-person app, create only the esthetician account and disable public signups in Supabase after setup if desired.
5. Copy the project URL and anon key into `.env.local`.

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://eawkbptidbmubtccrbfa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Local Commands

```bash
npm install
cp .env.example .env.local
npm run dev
npm run typecheck
npm run build
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel --prod
```
