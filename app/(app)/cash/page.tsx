import { CashForm } from "@/components/CashForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { currency } from "@/lib/format";
import type { CashRow } from "@/lib/types";

export default async function CashPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("cash_logs")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(5);

  const rows = (data ?? []) as CashRow[];

  return (
    <>
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Cash Log</h1>
        <p className="text-sm leading-6 text-tertiary">Daily balance tracking and financial hygiene.</p>
      </header>
      <CashForm />
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Previous Cash Entries</h2>
        <div className="soft-shadow overflow-hidden rounded-xl bg-white">
          {rows.length === 0 ? (
            <p className="p-5 text-sm text-tertiary">No cash logs yet.</p>
          ) : (
            rows.map((row) => (
              <div key={row.id} className="flex items-center justify-between border-b border-stone-100 p-5 last:border-0">
                <div>
                  <p className="font-semibold">{row.date}</p>
                  <p className="text-xs italic text-stone-400">{row.notes || "No notes"}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{currency(row.ending_cash)}</p>
                  <p className="text-xs text-primary">{currency(Number(row.cash_earned) - Number(row.cash_spent))} net</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
