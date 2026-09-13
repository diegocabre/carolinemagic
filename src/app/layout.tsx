import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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

const SITE_URL = "https://www.carolinemagic.cl"; // ← reemplaza por el dominio real cuando lo tengan

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Caroline Magic | Tarot Evolutivo, Talleres y Arte Místico",
    template: "%s | Caroline Magic",
  },
  description:
    "Espacio sagrado y contemporáneo guiado por Caroline Magic: lecturas de tarot evolutivo, talleres grupales, ritos y ceremonias, y obras de arte esotérico.",
  keywords: [
    "Tarot Evolutivo",
    "Caroline Magic",
    "Arte Místico",
    "Talleres de Tarot",
    "Ritos y Ceremonias",
    "Sesiones Holísticas",
    "Arquetipos",
    "Espiritualidad",
    "Chile",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    siteName: "Caroline Magic",
    title: "Caroline Magic | Tarot Evolutivo, Talleres y Arte Místico",
    description:
      "Lecturas de tarot evolutivo, talleres, rituales y arte consagrado.",
    images: [{ url: "/images/og-cover.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caroline Magic",
    description: "Tarot evolutivo, talleres, rituales y arte místico.",
    images: ["/images/og-cover.jpeg"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-background text-text-primary antialiased flex flex-col font-sans selection:bg-primary selection:text-white">
        {/* Halos decorativos de fondo: luz mística rosada, cálida y etérea */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[650px] bg-[radial-gradient(circle,_rgba(242,96,145,0.16),transparent_65%)] blur-[80px]" />
          <div className="absolute top-[35%] right-[-10%] w-[700px] h-[600px] bg-[radial-gradient(circle,_rgba(248,165,194,0.22),transparent_65%)] blur-[90px]" />
          <div className="absolute bottom-[5%] left-[-10%] w-[750px] h-[650px] bg-[radial-gradient(circle,_rgba(242,96,145,0.14),transparent_70%)] blur-[100px]" />
        </div>

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
