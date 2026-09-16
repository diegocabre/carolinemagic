"use client";

import { loginAction, LoginState } from "@/lib/actions/admin";
import { Lock, Mail } from "lucide-react";
import { useActionState } from "react";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="w-full max-w-sm bg-white/95 border border-border-subtle rounded-2xl p-8 shadow-sm space-y-5"
    >
      <div className="text-center space-y-1">
        <h1 className="font-serif text-2xl font-bold text-text-primary">
          Panel de Caroline
        </h1>
        <p className="text-xs text-text-secondary">
          Acceso privado para administrar la sincronicidad del día.
        </p>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="text-xs font-medium text-text-secondary"
        >
          Correo
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            className="w-full bg-surface-muted border border-border-subtle rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="text-xs font-medium text-text-secondary"
        >
          Clave
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full bg-surface-muted border border-border-subtle rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {state.error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 rounded-full text-xs uppercase tracking-wider font-semibold bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
