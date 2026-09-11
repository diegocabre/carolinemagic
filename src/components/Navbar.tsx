"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Lecturas", href: "/lecturas" },
  { name: "Sobre Caroline", href: "/sobre-caroline" },
  { name: "Galería & Tienda", href: "/galeria-tienda" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-accent-rose/10 bg-background/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo con imagen oficial y tipografía coincidente */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-primary/50 shadow-mystic-glow group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo.jpg"
              alt="Caroline Magic"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-normal text-on-surface font-semibold group-hover:text-primary transition-colors leading-tight">
              Caroline Magic
            </span>
            <span className="text-[10px] tracking-widest uppercase text-accent-rose/70 font-sans">
              Atelier & Oráculo
            </span>
          </div>
        </Link>

        {/* Desktop Links con indicador de página activa */}
        <nav className="hidden md:flex items-center gap-2 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm transition-all tracking-wide",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-on-surface/75 hover:text-on-surface"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-primary/15 border border-primary/40 shadow-mystic-glow -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/lecturas"
            className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-primary text-background hover:bg-primary-container hover:text-white transition-all shadow-mystic-glow hover:scale-105 active:scale-95"
          >
            Reservar Sesión
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-on-surface hover:text-primary hover:bg-surface-low transition-colors"
          aria-label="Abrir menú"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown con indicador de página activa */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-accent-rose/10 bg-surface px-6 py-6 space-y-3"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between text-base font-medium py-3 px-4 rounded-xl transition-all",
                    isActive
                      ? "bg-primary/20 text-primary border border-primary/40 shadow-mystic-glow font-semibold"
                      : "text-on-surface/85 hover:text-primary hover:bg-surface-low"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-primary shadow-mystic-glow" />
                  )}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-accent-rose/10">
              <Link
                href="/lecturas"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-primary text-background shadow-mystic-glow"
              >
                Reservar Sesión
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
