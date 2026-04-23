import { NextResponse } from "next/server";
import { jsonError, handleRouteError } from "@/lib/api";
import { deductibleAmount } from "@/lib/finance";
import { requireUser } from "@/lib/supabase/server";
import { expenseInputSchema } from "@/lib/validation";

export async function GET() {
  try {
    const { supabase, user } = await requireUser();
    if (!user) return jsonError("Unauthorized", 401);

    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    const { supabase, user } = await requireUser();
    if (!user) return jsonError("Unauthorized", 401);

    const input = expenseInputSchema.parse(await request.json());
    const payload = {
      ...input,
      user_id: user.id,
      business_percent: input.business_percent / 100,
      deductible_amount: deductibleAmount(input.amount, input.business_percent),
    };

    const { data, error } = await supabase.from("expenses").insert(payload).select("*").single();
    if (error) throw error;

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
