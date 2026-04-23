"use client";

import { useState } from "react";
import { currency, today } from "@/lib/format";

export function CashForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState("");
  const [earned, setEarned] = useState("");
  const [spent, setSpent] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const response = await fetch("/api/cash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
    });

    setLoading(false);
    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      setStatus(body.error ?? "Unable to save cash log.");
      return;
    }

    event.currentTarget.reset();
    setStarting("");
    setEarned("");
    setSpent("");
    setStatus("Cash log saved.");
  }

  const ending = Number(starting || 0) + Number(earned || 0) - Number(spent || 0);

  return (
    <form onSubmit={submit} className="soft-shadow space-y-4 rounded-xl bg-white p-6">
      <label className="block space-y-1">
        <span className="text-xs font-semibold tracking-wide text-tertiary">ENTRY DATE</span>
        <input name="date" type="date" required defaultValue={today()} className="w-full rounded-lg border border-stone-100 bg-stone-50/50 p-3" />
      </label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <input name="starting_cash" type="number" min="0" step="0.01" required value={starting} onChange={(e) => setStarting(e.target.value)} placeholder="Starting" className="rounded-lg border border-stone-100 bg-stone-50/50 p-3" />
        <input name="cash_earned" type="number" min="0" step="0.01" required value={earned} onChange={(e) => setEarned(e.target.value)} placeholder="Cash earned" className="rounded-lg border border-stone-100 bg-stone-50/50 p-3" />
        <input name="cash_spent" type="number" min="0" step="0.01" required value={spent} onChange={(e) => setSpent(e.target.value)} placeholder="Cash spent" className="rounded-lg border border-stone-100 bg-stone-50/50 p-3" />
      </div>
      <div className="rounded-lg bg-surface-container-low p-4">
        <p className="text-xs font-semibold tracking-wide text-tertiary">ESTIMATED ENDING CASH</p>
        <p className="text-2xl font-semibold text-primary">{currency(ending)}</p>
      </div>
      <textarea name="notes" rows={3} placeholder="Daily notes..." className="w-full resize-none rounded-lg border border-stone-100 bg-stone-50/50 p-3" />
      {status ? <p className={status.includes("saved") ? "text-sm text-primary" : "text-sm text-error"}>{status}</p> : null}
      <button disabled={loading} className="w-full rounded-lg bg-primary py-4 text-lg font-semibold text-white disabled:opacity-60">
        {loading ? "Saving..." : "Save Daily Log"}
      </button>
    </form>
  );
}
