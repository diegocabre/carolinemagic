import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * Aviso breve junto a los botones de WhatsApp.
 * TODO(legal): texto pendiente de revisión legal.
 */
export default function AvisoWhatsApp({ className }: { className?: string }) {
  return (
    <p className={cn("text-[11px] leading-snug text-text-muted", className)}>
      Al escribirnos por WhatsApp, tus datos se tratan según nuestra{" "}
      <Link href="/privacidad" className="underline underline-offset-2 hover:text-primary">
        Política de Privacidad
      </Link>{" "}
      y la de{" "}
      <a
        href="https://www.whatsapp.com/legal/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-primary"
      >
        WhatsApp/Meta
      </a>
      .
    </p>
  );
}
