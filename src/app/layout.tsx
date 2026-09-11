import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Caroline Magic | Tarot Evolutivo, Consciencia y Arte Místico",
  description:
    "Espacio sagrado y contemporáneo guiado por Caroline Magic: lecturas de tarot evolutivo, arquetipos de consciencia, sesiones holísticas y obras de arte esotérico.",
  keywords: [
    "Tarot Evolutivo",
    "Caroline Magic",
    "Arte Místico",
    "Sesiones Holísticas",
    "Arquetipos",
    "Espiritualidad",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-background text-on-surface antialiased flex flex-col selection:bg-primary selection:text-white font-sans">
        {/* Halos de luz mística ambiental */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-secondary/20 rounded-full blur-[140px]" />
          <div className="absolute top-[40%] right-[-10%] w-[500px] h-[400px] bg-primary/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[500px] bg-secondary/15 rounded-full blur-[150px]" />
        </div>

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
