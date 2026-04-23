import { Icon } from "@/components/Icon";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-8">
      <div className="pointer-events-none fixed -right-24 -top-24 h-96 w-96 rounded-full bg-primary-container/20 blur-[80px]" />
      <div className="pointer-events-none fixed -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary-container/40 blur-[60px]" />
      <section className="relative z-10 w-full max-w-md">
        <header className="mb-8 text-center">
          <div className="soft-shadow mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <Icon name="spa" className="text-3xl text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Studio Balance</h1>
          <p className="mx-auto max-w-[280px] text-base leading-7 text-tertiary">
            Track income, expenses, and cash with less stress.
          </p>
        </header>
        <div className="soft-shadow rounded-xl bg-white p-8">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
