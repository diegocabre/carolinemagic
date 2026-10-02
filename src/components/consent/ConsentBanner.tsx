"use client";

import {
  borrarCookiesAnalitica,
  OPEN_PREFERENCES_EVENT,
  readConsent,
  RUTAS_SIN_ANALITICA,
  writeConsent,
  type ConsentState,
} from "@/lib/consent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const CLARITY_PROJECT_ID = "yo4s9z4h9e";

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
type WindowConClarity = Window & { clarity?: ClarityFn };

let clarityCargado = false;

/**
 * Carga Microsoft Clarity SOLO tras consentimiento explícito. El script se
 * agrega desde este bundle (que ya está autorizado por el nonce de la CSP),
 * así 'strict-dynamic' lo permite sin abrir 'unsafe-inline'.
 */
function cargarClarity(): void {
  if (clarityCargado) return;
  clarityCargado = true;
  const w = window as WindowConClarity;
  if (!w.clarity) {
    const cola: ClarityFn = (...args: unknown[]) => {
      (cola.q ??= []).push(args);
    };
    w.clarity = cola;
  }
  w.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  document.head.appendChild(script);
}

function rutaSinAnalitica(pathname: string): boolean {
  return RUTAS_SIN_ANALITICA.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

// El estado del consentimiento vive en una cookie: se lee como "store externo".
const suscriptores = new Set<() => void>();
function suscribir(cb: () => void) {
  suscriptores.add(cb);
  return () => suscriptores.delete(cb);
}
function notificar() {
  suscriptores.forEach((cb) => cb());
}
let cache: { raw: string; valor: ConsentState | null } = { raw: "", valor: null };
function snapshot(): ConsentState | null {
  const raw = document.cookie;
  if (raw !== cache.raw) cache = { raw, valor: readConsent() };
  return cache.valor;
}

export default function ConsentBanner() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(suscribir, snapshot, () => null);
  const montado = useSyncExternalStore(suscribir, () => true, () => false);
  const [abiertoManual, setAbiertoManual] = useState(false);

  useEffect(() => {
    const abrir = () => setAbiertoManual(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, abrir);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, abrir);
  }, []);

  useEffect(() => {
    if (consent?.analitica && !rutaSinAnalitica(pathname)) cargarClarity();
  }, [consent, pathname]);

  const decidir = useCallback(
    (analitica: boolean) => {
      const teniaAnalitica = clarityCargado;
      writeConsent(analitica);
      setAbiertoManual(false);
      notificar();
      if (!analitica) {
        borrarCookiesAnalitica();
        // Un script ya cargado no se puede "descargar": se recarga la página.
        if (teniaAnalitica) window.location.reload();
      }
    },
    [],
  );

  const visible = montado && (abiertoManual || consent === null);
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookies-titulo"
      aria-describedby="cookies-texto"
      className="fixed inset-x-4 bottom-4 sm:left-6 sm:right-auto sm:max-w-md z-[60] rounded-2xl bg-white/97 backdrop-blur-md border border-border-subtle shadow-xl p-5 space-y-3"
    >
      <h2 id="cookies-titulo" className="font-serif text-lg font-bold text-text-primary">
        ¿Nos ayudas a mejorar el sitio?
      </h2>
      <p id="cookies-texto" className="text-xs text-text-secondary leading-relaxed">
        Usamos cookies necesarias para que el sitio funcione. Con tu permiso,
        también usaríamos <strong>Microsoft Clarity</strong> para ver de forma
        anónima cómo se navega (mapas de calor y grabaciones de la sesión). Los
        datos se procesan en EE. UU. Puedes cambiar tu elección cuando quieras.{" "}
        <Link href="/cookies" className="text-primary underline underline-offset-2">
          Más información
        </Link>
        .
      </p>
      {consent && (
        <p className="text-[11px] text-text-muted">
          Elección actual: analítica {consent.analitica ? "aceptada" : "rechazada"}.
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => decidir(false)}
          className="py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-secondary/30 bg-white text-secondary hover:bg-surface-muted transition-colors"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => decidir(true)}
          className="py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-secondary/30 bg-white text-secondary hover:bg-surface-muted transition-colors"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
