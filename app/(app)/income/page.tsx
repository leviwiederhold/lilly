import { IncomeForm } from "@/components/IncomeForm";

export default function IncomePage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Add Income</h1>
        <p className="text-sm leading-6 text-tertiary">Record a new client session payment.</p>
      </header>
      <IncomeForm />
    </>
  );
}
