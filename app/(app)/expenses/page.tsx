import { ExpenseForm } from "@/components/ExpenseForm";

export default function ExpensesPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">New Expense</h1>
        <p className="text-sm leading-6 text-tertiary">Log your business spending to stay organized.</p>
      </header>
      <ExpenseForm />
    </>
  );
}
