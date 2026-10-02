import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // data-clarity-mask: si algún día Clarity se cargara aquí, no grabaría contenido.
  return <div data-clarity-mask="true">{children}</div>;
}
