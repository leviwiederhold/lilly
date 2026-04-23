"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const result =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (mode === "signup" && !result.data.session) {
      setMessage("Check your email to confirm your account, then sign in.");
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-xs font-semibold tracking-wide text-on-surface-variant">EMAIL ADDRESS</span>
        <span className="relative flex items-center">
          <Icon name="mail" className="absolute left-4 text-lg text-tertiary" />
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border-0 bg-surface-container-low py-4 pl-12 pr-4 text-sm focus:ring-1 focus:ring-primary-container"
            placeholder="hello@yourstudio.com"
          />
        </span>
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold tracking-wide text-on-surface-variant">PASSWORD</span>
        <span className="relative flex items-center">
          <Icon name="lock" className="absolute left-4 text-lg text-tertiary" />
          <input
            required
            minLength={6}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border-0 bg-surface-container-low py-4 pl-12 pr-4 text-sm focus:ring-1 focus:ring-primary-container"
            placeholder="••••••••"
          />
        </span>
      </label>
      {message ? <p className="rounded-lg bg-surface-container-low p-3 text-sm text-error">{message}</p> : null}
      <button
        disabled={loading}
        className="w-full rounded-lg bg-primary py-4 text-base font-semibold text-on-primary transition active:scale-[0.98] disabled:opacity-60"
      >
        {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
      </button>
      <button
        type="button"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="w-full text-sm font-semibold text-primary"
      >
        {mode === "signin" ? "Need an account? Create one" : "Already have an account? Sign in"}
      </button>
    </form>
  );
}
