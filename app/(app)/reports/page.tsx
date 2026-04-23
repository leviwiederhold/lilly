import { currency } from "@/lib/format";
import { currentMonthRange, roundMoney } from "@/lib/finance";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ReportsPage() {
  const supabase = await createSupabaseServerClient();
  const monthRows = await Promise.all(
    Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - index));
      return currentMonthRange(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`);
    }).map(async (range) => {
      const [incomeResult, expenseResult] = await Promise.all([
        supabase.from("income").select("total").gte("date", range.start).lt("date", range.end),
        supabase.from("expenses").select("deductible_amount").gte("date", range.start).lt("date", range.end),
      ]);
      const income = roundMoney((incomeResult.data ?? []).reduce((sum, row) => sum + Number(row.total), 0));
      const expenses = roundMoney((expenseResult.data ?? []).reduce((sum, row) => sum + Number(row.deductible_amount), 0));
      return { month: range.month, income, expenses, net: roundMoney(income - expenses) };
    }),
  );

  const totalIncome = roundMoney(monthRows.reduce((sum, row) => sum + row.income, 0));
  const totalExpenses = roundMoney(monthRows.reduce((sum, row) => sum + row.expenses, 0));
  const maxValue = Math.max(...monthRows.map((row) => Math.max(row.income, row.expenses)), 1);

  return (
    <>
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Reports</h1>
        <p className="text-sm text-tertiary">Simple monthly totals for income, deductible expenses, and profit.</p>
      </header>
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="soft-shadow rounded-xl bg-white p-4">
          <p className="text-xs font-semibold uppercase text-tertiary">Gross Income</p>
          <p className="text-xl font-semibold">{currency(totalIncome)}</p>
        </div>
        <div className="soft-shadow rounded-xl bg-white p-4">
          <p className="text-xs font-semibold uppercase text-tertiary">Deductible Expenses</p>
          <p className="text-xl font-semibold">{currency(totalExpenses)}</p>
        </div>
      </div>
      <section className="soft-shadow mb-6 rounded-xl bg-white p-5">
        <h2 className="mb-4 text-xl font-semibold">Income vs Expenses</h2>
        <div className="flex h-48 items-end justify-between gap-3">
          {monthRows.map((row) => (
            <div key={row.month} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-full items-end gap-1">
                <div className="w-3 rounded-t-sm bg-primary-container" style={{ height: `${Math.max((row.income / maxValue) * 100, 4)}%` }} />
                <div className="w-3 rounded-t-sm bg-secondary-container" style={{ height: `${Math.max((row.expenses / maxValue) * 100, 4)}%` }} />
              </div>
              <span className="text-[10px] font-semibold text-tertiary">{row.month.slice(5)}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="soft-shadow overflow-hidden rounded-xl bg-white">
        {monthRows.map((row) => (
          <div key={row.month} className="flex items-center justify-between border-b border-stone-100 p-4 last:border-0">
            <div>
              <p className="font-semibold">{row.month}</p>
              <p className="text-xs text-tertiary">{currency(row.income)} income / {currency(row.expenses)} expenses</p>
            </div>
            <p className="font-semibold text-primary">{currency(row.net)}</p>
          </div>
        ))}
      </section>
    </>
  );
}
