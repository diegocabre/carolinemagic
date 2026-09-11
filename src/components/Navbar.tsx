"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Lecturas", href: "/lecturas" },
  { name: "Sobre Caroline", href: "/sobre-caroline" },
  { name: "Galería & Tienda", href: "/galeria-tienda" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-accent-rose/10 bg-background/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-accent-rose/20 group-hover:border-primary/60 group-hover:shadow-mystic-glow transition-all">
            <Sparkles className="w-5 h-5 text-primary transition-transform group-hover:rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-wider text-on-surface font-semibold group-hover:text-primary transition-colors">
              Caroline Magic
            </span>
            <span className="text-[10px] tracking-widest uppercase text-accent-rose/70 font-sans">
              Atelier & Oráculo
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-on-surface/80 hover:text-primary transition-colors tracking-wide"
            >
              {link.name}
            </Link>
          ))}
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

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-accent-rose/10 bg-surface px-6 py-6 space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-on-surface/90 hover:text-primary py-2 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-accent-rose/10">
              <Link
                href="/lecturas"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-primary text-background shadow-mystic-glow"
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
