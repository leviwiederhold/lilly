"use client";

import { useState } from "react";
import { currency, today } from "@/lib/format";

export function ExpenseForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [businessPercent, setBusinessPercent] = useState("100");
  const inputClass = "w-full rounded-lg border border-transparent bg-surface-container-low p-3 transition focus:border-primary-container focus:ring-2 focus:ring-primary-container/30";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
    });

    setLoading(false);
    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      setStatus(body.error ?? "Unable to save expense.");
      return;
    }

    event.currentTarget.reset();
    setAmount("");
    setBusinessPercent("100");
    setStatus("Expense saved.");
  }

  return (
    <form onSubmit={submit} className="soft-shadow space-y-4 rounded-xl bg-white p-6">
      <label className="block space-y-1">
        <span className="text-xs font-semibold tracking-wide text-tertiary">TOTAL AMOUNT</span>
        <input name="amount" type="number" min="0" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full rounded-lg border border-transparent bg-surface-container-low p-5 text-3xl font-semibold text-primary transition focus:border-primary-container focus:ring-2 focus:ring-primary-container/30" />
      </label>
      <label className="block space-y-1">
        <span className="text-xs font-semibold tracking-wide text-tertiary">DATE</span>
        <input name="date" type="date" required defaultValue={today()} className={inputClass} />
      </label>
      <label className="block space-y-1">
        <span className="text-xs font-semibold tracking-wide text-tertiary">VENDOR</span>
        <input name="vendor" required placeholder="Vendor name" className={inputClass} />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-xs font-semibold tracking-wide text-tertiary">CATEGORY</span>
          <select name="category" className={inputClass}>
            {["Supplies", "Rent", "Marketing", "Education", "Insurance", "Other"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-semibold tracking-wide text-tertiary">PAYMENT</span>
          <select name="payment_method" className={inputClass}>
            {["Debit Card", "Credit Card", "Cash", "Bank Transfer"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <label className="block space-y-1">
        <span className="text-xs font-semibold tracking-wide text-tertiary">BUSINESS USE %</span>
        <input name="business_percent" type="number" min="0" max="100" required value={businessPercent} onChange={(e) => setBusinessPercent(e.target.value)} className={inputClass} />
      </label>
      <label className="block space-y-1">
        <span className="text-xs font-semibold tracking-wide text-tertiary">DESCRIPTION</span>
        <textarea name="description" rows={2} placeholder="Optional note" className={`${inputClass} resize-none`} />
      </label>
      <div className="rounded-lg bg-surface-container-low p-4">
        <p className="text-xs font-semibold tracking-wide text-tertiary">DEDUCTIBLE AMOUNT</p>
        <p className="text-2xl font-semibold text-primary">{currency(Number(amount || 0) * (Number(businessPercent || 0) / 100))}</p>
      </div>
      {status ? <p className={status.includes("saved") ? "text-sm text-primary" : "text-sm text-error"}>{status}</p> : null}
      <button disabled={loading} className="w-full rounded-xl bg-primary py-4 text-lg font-semibold text-white disabled:opacity-60">
        {loading ? "Saving..." : "Save Expense"}
      </button>
    </form>
  );
}
