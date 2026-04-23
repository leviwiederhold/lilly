import { NextResponse } from "next/server";
import { jsonError, handleRouteError } from "@/lib/api";
import { currentMonthRange, roundMoney } from "@/lib/finance";
import { requireUser } from "@/lib/supabase/server";
import { summaryQuerySchema } from "@/lib/validation";

type IncomeRow = { total: number | string };
type ExpenseRow = { deductible_amount: number | string };

function sumNumeric<T>(rows: T[] | null, key: keyof T) {
  return roundMoney((rows ?? []).reduce((sum, row) => sum + Number(row[key] ?? 0), 0));
}

export async function GET(request: Request) {
  try {
    const { supabase, user } = await requireUser();
    if (!user) return jsonError("Unauthorized", 401);

    const url = new URL(request.url);
    const query = summaryQuerySchema.parse({ month: url.searchParams.get("month") ?? undefined });
    const range = currentMonthRange(query.month);

    const [incomeResult, expenseResult, settingsResult] = await Promise.all([
      supabase
        .from("income")
        .select("total")
        .eq("user_id", user.id)
        .gte("date", range.start)
        .lt("date", range.end),
      supabase
        .from("expenses")
        .select("deductible_amount")
        .eq("user_id", user.id)
        .gte("date", range.start)
        .lt("date", range.end),
      supabase.from("settings").select("tax_rate,business_name").eq("user_id", user.id).maybeSingle(),
    ]);

    if (incomeResult.error) throw incomeResult.error;
    if (expenseResult.error) throw expenseResult.error;
    if (settingsResult.error) throw settingsResult.error;

    const monthlyIncomeTotal = sumNumeric(incomeResult.data as IncomeRow[], "total");
    const monthlyExpenseTotal = sumNumeric(expenseResult.data as ExpenseRow[], "deductible_amount");
    const netProfit = roundMoney(monthlyIncomeTotal - monthlyExpenseTotal);
    const taxRate = Number(settingsResult.data?.tax_rate ?? 0.25);
    const estimatedTaxes = roundMoney(Math.max(netProfit, 0) * taxRate);

    return NextResponse.json({
      data: {
        month: range.month,
        business_name: settingsResult.data?.business_name ?? "Studio Balance",
        tax_rate: taxRate,
        monthly_income_total: monthlyIncomeTotal,
        monthly_expense_total: monthlyExpenseTotal,
        net_profit: netProfit,
        estimated_taxes: estimatedTaxes,
      },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
