"use client";

import { useState } from "react";
import { currency, today } from "@/lib/format";

const paymentTypes = ["Card", "Cash", "Venmo", "Zelle"];

export function IncomeForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [tip, setTip] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form);

    const response = await fetch("/api/income", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      setStatus(body.error ?? "Unable to save income.");
      return;
    }

    event.currentTarget.reset();
    setAmount("");
    setTip("");
    setStatus("Income saved.");
  }

  return (
    <form onSubmit={submit} className="soft-shadow space-y-4 rounded-xl bg-white p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs font-semibold tracking-wide text-tertiary">DATE</span>
          <input name="date" type="date" defaultValue={today()} required className="w-full rounded-lg border-0 bg-surface-container-low p-3" />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-semibold tracking-wide text-tertiary">CLIENT NAME</span>
          <input name="client_name" required placeholder="Sarah Johnson" className="w-full rounded-lg border-0 bg-surface-container-low p-3" />
        </label>
      </div>
      <label className="space-y-1 block">
        <span className="text-xs font-semibold tracking-wide text-tertiary">SERVICE</span>
        <input name="service" required placeholder="Signature HydraFacial" className="w-full rounded-lg border-0 bg-surface-container-low p-3" />
      </label>
      <label className="space-y-1 block">
        <span className="text-xs font-semibold tracking-wide text-tertiary">PAYMENT METHOD</span>
        <select name="payment_type" className="w-full rounded-lg border-0 bg-surface-container-low p-3">
          {paymentTypes.map((type) => <option key={type}>{type}</option>)}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-xs font-semibold tracking-wide text-tertiary">SERVICE AMOUNT</span>
          <input name="amount" type="number" min="0" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="150.00" className="w-full rounded-lg border-0 bg-surface-container-low p-3" />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-semibold tracking-wide text-tertiary">TIP</span>
          <input name="tip" type="number" min="0" step="0.01" value={tip} onChange={(e) => setTip(e.target.value)} placeholder="30.00" className="w-full rounded-lg border-0 bg-surface-container-low p-3" />
        </label>
      </div>
      <div className="border-t border-stone-100 pt-5">
        <p className="text-xs font-semibold tracking-wide text-tertiary">TOTAL RECEIVED</p>
        <p className="text-3xl font-semibold text-primary">{currency(Number(amount || 0) + Number(tip || 0))}</p>
      </div>
      {status ? <p className={status.includes("saved") ? "text-sm text-primary" : "text-sm text-error"}>{status}</p> : null}
      <button disabled={loading} className="w-full rounded-xl bg-primary-container py-4 text-lg font-semibold text-white disabled:opacity-60">
        {loading ? "Saving..." : "Save Income Record"}
      </button>
    </form>
  );
}
