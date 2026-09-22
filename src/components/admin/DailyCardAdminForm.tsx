"use client";

import { DailyCardFormState, saveDailyCardAction } from "@/lib/actions/admin";
import { DailyCardData } from "@/lib/dailyCard";
import { upload } from "@vercel/blob/client";
import { ImagePlus } from "lucide-react";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

interface DailyCardAdminFormProps {
  current: DailyCardData | null;
}

const initialState: DailyCardFormState = {};

function rutaBlob(prefix: string, file: File): string {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  return `admin/${prefix}-${Date.now()}.${extension}`;
}

function ImageUploadField({
  id,
  label,
  helperText,
  previewUrl,
  onFileChange,
  previewAlt,
  inputRef,
}: {
  id: string;
  label: string;
  helperText: string;
  previewUrl?: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewAlt: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-text-secondary block">
        {label}
      </label>
      <label
        htmlFor={id}
        className="relative flex items-center justify-center w-full aspect-[2/1] rounded-xl border-2 border-dashed border-border-subtle bg-surface-muted overflow-hidden cursor-pointer hover:border-primary/40 transition-all"
      >
        {previewUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-60"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={previewAlt}
              className="relative max-w-full max-h-full object-contain"
            />
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-text-muted text-xs">
            <ImagePlus className="w-6 h-6" />
            <span>Haz clic para subir una foto</span>
          </div>
        )}
        <input
          id={id}
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onFileChange}
          className="sr-only"
        />
      </label>
      <p className="text-[11px] text-text-muted">{helperText}</p>
    </div>
  );
}

export default function DailyCardAdminForm({
  current,
}: DailyCardAdminFormProps) {
  const [state, formAction] = useActionState(
    saveDailyCardAction,
    initialState,
  );
  const [isPendingAction, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | undefined>();

  const imagenInputRef = useRef<HTMLInputElement>(null);
  const portadaInputRef = useRef<HTMLInputElement>(null);
  const tituloRef = useRef<HTMLInputElement>(null);
  const interpretacionRef = useRef<HTMLTextAreaElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    current?.imagenUrl,
  );
  const [portadaPreviewUrl, setPortadaPreviewUrl] = useState<
    string | undefined
  >(current?.portadaUrl);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
      if (portadaPreviewUrl?.startsWith("blob:"))
        URL.revokeObjectURL(portadaPreviewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  }

  function handlePortadaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPortadaPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploadError(undefined);

    const interpretacion = interpretacionRef.current?.value ?? "";
    if (!interpretacion.trim()) {
      setUploadError("Escribe la interpretación de hoy.");
      return;
    }

    setIsUploading(true);
    try {
      const imagenFile = imagenInputRef.current?.files?.[0];
      const portadaFile = portadaInputRef.current?.files?.[0];

      let imagenUrl = "";
      if (imagenFile) {
        const blob = await upload(
          rutaBlob("daily-card-image", imagenFile),
          imagenFile,
          { access: "public", handleUploadUrl: "/api/admin/blob-upload" },
        );
        imagenUrl = blob.url;
      }

      let portadaUrl = "";
      if (portadaFile) {
        const blob = await upload(
          rutaBlob("portada-image", portadaFile),
          portadaFile,
          { access: "public", handleUploadUrl: "/api/admin/blob-upload" },
        );
        portadaUrl = blob.url;
      }

      const formData = new FormData();
      formData.set("titulo", tituloRef.current?.value ?? "");
      formData.set("interpretacion", interpretacion);
      if (imagenUrl) formData.set("imagenUrl", imagenUrl);
      if (portadaUrl) formData.set("portadaUrl", portadaUrl);

      startTransition(() => {
        formAction(formData);
      });
    } catch (error) {
      setUploadError(
        error instanceof Error && error.message
          ? error.message
          : "No se pudo subir la imagen. Intenta de nuevo.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  const pending = isUploading || isPendingAction;
  const errorMessage = uploadError || state.error;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white/95 border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
    >
      <div>
        <h2 className="font-serif text-xl font-bold text-text-primary mb-1">
          Sincronicidad de hoy
        </h2>
        <p className="text-xs text-text-secondary">
          Esto es lo que verán las visitas al voltear la carta en la página
          principal.
        </p>
      </div>

      <ImageUploadField
        id="imagen"
        label="Foto de la sincronicidad"
        helperText="JPG, PNG o WEBP, máx. 8MB. Si no subes una foto nueva, se mantiene la actual."
        previewUrl={previewUrl}
        onFileChange={handleFileChange}
        previewAlt="Vista previa de la sincronicidad de hoy"
        inputRef={imagenInputRef}
      />

      <div className="space-y-1.5">
        <label
          htmlFor="titulo"
          className="text-xs font-medium text-text-secondary"
        >
          Título (opcional)
        </label>
        <input
          id="titulo"
          ref={tituloRef}
          type="text"
          defaultValue={current?.titulo}
          placeholder="Ej: La Estrella"
          className="w-full bg-surface-muted border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="interpretacion"
          className="text-xs font-medium text-text-secondary"
        >
          Interpretación de hoy
        </label>
        <textarea
          id="interpretacion"
          ref={interpretacionRef}
          required
          rows={5}
          defaultValue={current?.interpretacion}
          placeholder="Lo que la carta te reveló para hoy..."
          className="w-full bg-surface-muted border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary leading-relaxed focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-y"
        />
      </div>

      <div className="pt-2 border-t border-border-subtle space-y-1">
        <h3 className="font-serif text-base font-bold text-text-primary pt-4">
          Portada de la carta
        </h3>
        <p className="text-xs text-text-secondary pb-2">
          Es el frente que ven las visitas antes de voltear ("Toca para
          Revelar"). No hace falta cambiarla todos los días — súbela una vez
          y solo actualízala cuando quieras renovar la imagen.
        </p>
      </div>

      <ImageUploadField
        id="portada"
        label="Foto de portada (opcional)"
        helperText="JPG, PNG o WEBP, máx. 8MB. Si no subes una foto nueva, se mantiene la actual."
        previewUrl={portadaPreviewUrl}
        onFileChange={handlePortadaChange}
        previewAlt="Vista previa de la portada de la carta"
        inputRef={portadaInputRef}
      />

      {errorMessage && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {errorMessage}
        </p>
      )}
      {state.success && !pending && (
        <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          Listo, la sincronicidad de hoy ya está publicada.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 rounded-full text-xs uppercase tracking-wider font-semibold bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isUploading
          ? "Subiendo foto..."
          : pending
            ? "Publicando..."
            : "Publicar sincronicidad de hoy"}
      </button>

      {current?.actualizadoEn && (
        <p className="text-[11px] text-text-muted text-center">
          Última actualización:{" "}
          {new Date(current.actualizadoEn).toLocaleString("es-CL")}
        </p>
      )}
    </form>
  );
}
