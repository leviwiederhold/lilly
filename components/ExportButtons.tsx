"use client";

import { useState } from "react";
import { downloadCsv, toCsv } from "@/lib/format";

export function ExportButtons() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function exportTable(kind: "income" | "expenses") {
    setLoading(kind);
    setError("");
    const response = await fetch(`/api/${kind}`);
    setLoading(null);

    if (!response.ok) {
      setError(`Could not export ${kind}.`);
      return;
    }

    const body = (await response.json()) as { data: Record<string, unknown>[] };
    downloadCsv(`studio-balance-${kind}.csv`, toCsv(body.data));
  }

  return (
    <div className="space-y-3">
      <button onClick={() => exportTable("income")} className="w-full rounded-lg bg-surface-container-low p-3 text-left font-medium">
        {loading === "income" ? "Preparing income CSV..." : "Export Income CSV"}
      </button>
      <button onClick={() => exportTable("expenses")} className="w-full rounded-lg bg-surface-container-low p-3 text-left font-medium">
        {loading === "expenses" ? "Preparing expenses CSV..." : "Export Expenses CSV"}
      </button>
      {error ? <p className="text-sm text-error">{error}</p> : null}
    </div>
  );
}
