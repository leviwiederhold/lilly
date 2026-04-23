"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function saveSettings(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const businessName = String(formData.get("business_name") ?? "").trim();
  const taxRatePercent = Number(formData.get("tax_rate") ?? 25);

  if (!businessName || Number.isNaN(taxRatePercent)) {
    throw new Error("Business name and tax rate are required.");
  }

  const { error } = await supabase.from("settings").upsert({
    user_id: user.id,
    business_name: businessName,
    tax_rate: taxRatePercent / 100,
  });

  if (error) throw error;
  revalidatePath("/settings");
  revalidatePath("/dashboard");
}
