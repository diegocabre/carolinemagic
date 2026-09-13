"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Lecturas", href: "/lecturas" },
  { name: "Talleres", href: "/talleres" },
  { name: "Ritos & Ceremonias", href: "/ritos-y-ceremonias" },
  { name: "Galería & Tienda", href: "/galeria-tienda" },
  { name: "Sobre Caroline", href: "/sobre-caroline" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-background/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Logotipo Oficial Único */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-primary/20 shadow-sm group-hover:scale-105 group-hover:border-primary/50 transition-transform duration-300 shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Caroline Magic"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl lg:text-2xl tracking-normal text-text-primary font-bold group-hover:text-primary transition-colors leading-tight whitespace-nowrap">
              Caroline Magic
            </span>
            {/* Tagline oculta hasta xl para no competir con el menú en anchos intermedios */}
            <span className="hidden xl:block text-[10px] tracking-widest uppercase text-text-muted font-sans">
              Atelier & Oráculo
            </span>
          </div>
        </Link>

        {/* Desktop Links: ahora desde lg (1024px) en vez de md (768px) */}
        <nav className="hidden lg:flex items-center gap-0.5 text-sm flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 rounded-full text-[13px] xl:text-sm transition-all tracking-wide whitespace-nowrap",
                  isActive
                    ? "text-primary font-semibold bg-primary-soft"
                    : "text-text-secondary hover:text-primary",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Botón CTA "RESERVAR SESIÓN" — también desde lg */}
        <div className="hidden lg:flex items-center shrink-0">
          <Link
            href="/lecturas"
            className="bg-primary hover:bg-primary-hover text-white shadow-sm hover:shadow-md px-4 xl:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            RESERVAR SESIÓN
          </Link>
        </div>

        {/* Botón Menú Móvil: ahora visible hasta lg (antes hasta md) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg text-text-primary hover:text-primary hover:bg-surface-muted transition-colors shrink-0"
          aria-label="Abrir menú"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú Desplegable Móvil: ahora hasta lg */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-border-subtle bg-background px-6 py-6 space-y-3"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between text-base py-3 px-4 rounded-xl transition-all",
                    isActive
                      ? "bg-primary-soft text-primary font-semibold"
                      : "text-text-secondary hover:text-primary hover:bg-primary-soft/40",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-black/5">
              <Link
                href="/lecturas"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary hover:bg-primary-hover text-white shadow-sm"
              >
                RESERVAR SESIÓN
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
