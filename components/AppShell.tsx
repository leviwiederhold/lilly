import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const navItems: { href: string; icon: IconName; label: string }[] = [
  { href: "/dashboard", icon: "dashboard", label: "Home" },
  { href: "/income", icon: "add_circle", label: "Income" },
  { href: "/expenses", icon: "remove_circle", label: "Expense" },
  { href: "/cash", icon: "payments", label: "Cash" },
  { href: "/reports", icon: "bar_chart", label: "Reports" },
  { href: "/settings", icon: "settings", label: "Settings" },
];

export async function AppShell({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-background pb-28 text-on-background">
      <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-stone-200/60 bg-[#F9F7F4] px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container">
            <Icon name="spa" className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-stone-900">Studio Balance</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="hidden max-w-[130px] truncate text-xs text-tertiary sm:inline">{user?.email}</span>
          <Icon name="notifications" className="h-5 w-5 text-stone-400" />
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-6 py-8">{children}</main>
      <nav className="fixed bottom-0 left-0 z-50 grid w-full grid-cols-6 border-t border-stone-100 bg-white/90 px-2 py-3 shadow-[0_-4px_20px_rgba(94,92,90,0.06)] backdrop-blur-md">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 text-stone-400">
            <Icon name={item.icon} className="h-5 w-5" />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
