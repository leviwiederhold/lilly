import { ExportButtons } from "@/components/ExportButtons";
import { Icon } from "@/components/Icon";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { saveSettings, signOut } from "./actions";

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase.from("settings").select("*").maybeSingle();
  const businessName = data?.business_name ?? "Studio Balance Esthetics";
  const taxRate = Math.round(Number(data?.tax_rate ?? 0.25) * 100);

  return (
    <>
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-tertiary">Manage your business profile and financial preferences.</p>
      </header>
      <section className="soft-shadow mb-8 rounded-xl border border-stone-100/50 bg-white p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary-container">
            <Icon name="spa" className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{businessName}</h2>
            <p className="text-sm text-tertiary">{user?.email}</p>
          </div>
        </div>
      </section>
      <form action={saveSettings} className="soft-shadow mb-8 space-y-4 rounded-xl bg-white p-5">
        <h2 className="text-xl font-semibold">Tax Settings</h2>
        <label className="block space-y-1">
          <span className="text-xs font-semibold tracking-wide text-tertiary">BUSINESS NAME</span>
          <input name="business_name" defaultValue={businessName} required className="w-full rounded-lg border-0 bg-surface-container-low p-3" />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-semibold tracking-wide text-tertiary">TAX ESTIMATE %</span>
          <input name="tax_rate" type="number" min="0" max="100" step="1" defaultValue={taxRate} required className="w-full rounded-lg border-0 bg-surface-container-low p-3" />
        </label>
        <button className="w-full rounded-lg bg-primary py-3 font-semibold text-white">Save Settings</button>
      </form>
      <section className="soft-shadow mb-8 rounded-xl bg-white p-5">
        <h2 className="mb-4 text-xl font-semibold">Data Export</h2>
        <ExportButtons />
      </section>
      <form action={signOut}>
        <button className="w-full rounded-xl py-4 font-semibold text-error">Sign Out</button>
      </form>
    </>
  );
}
