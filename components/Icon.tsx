import {
  ArrowDown,
  ArrowUp,
  BadgeDollarSign,
  BarChart3,
  Bell,
  CircleMinus,
  CirclePlus,
  LayoutDashboard,
  Lock,
  LucideIcon,
  Mail,
  Settings,
  Sparkles,
  University,
} from "lucide-react";

const icons = {
  account_balance: University,
  add_circle: CirclePlus,
  bar_chart: BarChart3,
  dashboard: LayoutDashboard,
  lock: Lock,
  mail: Mail,
  notifications: Bell,
  payments: BadgeDollarSign,
  remove_circle: CircleMinus,
  settings: Settings,
  spa: Sparkles,
  trending_down: ArrowDown,
  trending_up: ArrowUp,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const LucideIcon = icons[name];
  return <LucideIcon aria-hidden="true" className={className} strokeWidth={2} />;
}
