import Link from "next/link";
import { headers } from "next/headers";
import { Icon } from "@/components/Icon";
import { currency } from "@/lib/format";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { currentMonthRange } from "@/lib/finance";
import type { ExpenseRow, IncomeRow } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const range = currentMonthRange();
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";

  if (!host) {
    throw new Error("Missing host header for dashboard summary request.");
  }

  const [incomeResult, expenseResult, summaryResponse] = await Promise.all([
    supabase.from("income").select("*").gte("date", range.start).lt("date", range.end).order("date", { ascending: false }).limit(3),
    supabase.from("expenses").select("*").gte("date", range.start).lt("date", range.end).order("date", { ascending: false }).limit(3),
    fetch(`${protocol}://${host}/api/summary?month=${range.month}`, {
      headers: { cookie: requestHeaders.get("cookie") ?? "" },
      cache: "no-store",
    }),
  ]);

  if (!summaryResponse.ok) {
    throw new Error("Unable to load dashboard summary.");
  }

  const income = (incomeResult.data ?? []) as IncomeRow[];
  const expenses = (expenseResult.data ?? []) as ExpenseRow[];
  const { data: summary } = (await summaryResponse.json()) as {
    data: {
      business_name: string;
      monthly_income_total: number;
      monthly_expense_total: number;
      net_profit: number;
      estimated_taxes: number;
    };
  };

  return (
    <>
      <section className="mb-8">
        <h1 className="mb-1 text-3xl font-semibold tracking-tight">Good morning</h1>
        <p className="text-sm text-tertiary">{summary.business_name} is ready to track.</p>
      </section>
      <div className="mb-8 grid grid-cols-2 gap-4">
        <SummaryCard label="This Month Income" value={currency(summary.monthly_income_total)} icon="trending_up" />
        <SummaryCard label="This Month Expenses" value={currency(summary.monthly_expense_total)} icon="trending_down" />
        <SummaryCard label="Estimated Taxes" value={currency(summary.estimated_taxes)} icon="account_balance" />
        <div className="soft-shadow flex h-32 flex-col justify-between rounded-xl bg-primary-container p-4 text-white">
          <span className="text-xs font-semibold uppercase tracking-wide opacity-80">Net Profit</span>
          <span className="text-2xl font-semibold">{currency(summary.net_profit)}</span>
        </div>
      </div>
      <section className="mb-8">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-tertiary">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          <QuickAction href="/income" icon="add_circle" label="Add Income" />
          <QuickAction href="/expenses" icon="remove_circle" label="Add Expense" />
          <QuickAction href="/cash" icon="payments" label="Add Cash" />
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-tertiary">Recent Activity</h2>
        <div className="soft-shadow overflow-hidden rounded-xl bg-white">
          {[...income.map((row) => ({ id: row.id, title: row.service, detail: row.client_name, amount: currency(row.total), positive: true })), ...expenses.map((row) => ({ id: row.id, title: row.vendor, detail: row.category, amount: currency(row.deductible_amount), positive: false }))].slice(0, 5).map((row) => (
            <div key={row.id} className="flex items-center justify-between border-b border-stone-100 p-4 last:border-0">
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-tertiary">{row.detail}</p>
              </div>
              <p className={row.positive ? "font-semibold text-primary" : "font-semibold text-error"}>{row.positive ? "+" : "-"}{row.amount}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function SummaryCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="soft-shadow flex h-32 flex-col justify-between rounded-xl bg-white p-4">
      <span className="text-xs font-semibold uppercase tracking-wide text-tertiary">{label}</span>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <Icon name={icon} className="text-sm text-primary" />
      </div>
    </div>
  );
}

function QuickAction({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-2 rounded-xl border border-secondary-container bg-white p-4 text-center active:opacity-70">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container/10 text-primary">
        <Icon name={icon} />
      </span>
      <span className="text-[10px] font-semibold uppercase">{label}</span>
    </Link>
  );
}
