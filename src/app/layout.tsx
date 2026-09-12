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
      <body className="min-h-screen bg-background text-text-primary antialiased flex flex-col font-sans selection:bg-primary selection:text-white">
        {/* Halos decorativos de fondo: luz mística cálida y etérea */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-[radial-gradient(circle,_rgba(242,96,145,0.08),transparent_65%)] blur-[80px]" />
          <div className="absolute top-[35%] right-[-5%] w-[600px] h-[500px] bg-[radial-gradient(circle,_rgba(98,67,127,0.05),transparent_65%)] blur-[90px]" />
          <div className="absolute bottom-[5%] left-[-5%] w-[650px] h-[550px] bg-[radial-gradient(circle,_rgba(248,230,238,0.8),transparent_70%)] blur-[100px]" />
        </div>

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
