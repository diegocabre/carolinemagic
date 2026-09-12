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
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#FBF7F4]/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logotipo Oficial Único */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#9A2E65]/20 shadow-sm group-hover:scale-105 group-hover:border-[#9A2E65]/50 transition-transform duration-300">
            <Image
              src="/images/logo.jpg"
              alt="Caroline Magic"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl tracking-normal text-[#281D33] font-bold group-hover:text-[#9A2E65] transition-colors leading-tight">
              Caroline Magic
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#8C7C99] font-sans">
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
                  "relative px-4 py-1.5 rounded-full text-sm transition-all tracking-wide",
                  isActive
                    ? "text-[#9A2E65] font-semibold bg-[#F8E6EE]"
                    : "text-[#685876] hover:text-[#9A2E65]"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Botón CTA "RESERVAR SESIÓN" */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/lecturas"
            className="bg-[#9A2E65] hover:bg-[#7D2251] text-white shadow-sm hover:shadow-md px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all hover:scale-105 active:scale-95"
          >
            RESERVAR SESIÓN
          </Link>
        </div>

        {/* Botón Menú Móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-[#281D33] hover:text-[#9A2E65] hover:bg-[#F5EFF7] transition-colors"
          aria-label="Abrir menú"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-black/5 bg-[#FBF7F4] px-6 py-6 space-y-3"
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
                      ? "bg-[#F8E6EE] text-[#9A2E65] font-semibold"
                      : "text-[#685876] hover:text-[#9A2E65] hover:bg-[#F5EFF7]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#9A2E65]" />
                  )}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-black/5">
              <Link
                href="/lecturas"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#9A2E65] hover:bg-[#7D2251] text-white shadow-sm"
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
