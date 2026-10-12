<div align="center">

# 🔮 Caroline Magic

**El arte de revelar lo invisible.**
Sitio web oficial de Caroline Magic: tarot, arte, rituales, encuentros y academia, con reservas por WhatsApp y un panel privado para administrar la carta del día.

![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-%E2%89%A520.9-339933?logo=nodedotjs&logoColor=white)
![Licencia](https://img.shields.io/badge/licencia-propietaria-red)

[Sitio web](https://www.carolinemagic.cl) · [Demo](#-demo) · [Instalación](#-instalación-paso-a-paso) · [Configuración](#%EF%B8%8F-configuración-env) · [Roadmap](#%EF%B8%8F-roadmap)

</div>

---

## 📖 ¿Qué problema resuelve?

Caroline ofrece sesiones de tarot, terapias, rituales, encuentros grupales, formaciones y venta de arte y objetos. Antes de este sitio no había un lugar único donde una persona pudiera **conocer toda la oferta, entender cuál le sirve y reservarla en un clic**.

Este proyecto resuelve eso con:

- Un **catálogo claro** de sesiones, rituales, encuentros, programas de la academia y colecciones de la tienda.
- **Reserva directa por WhatsApp**: cada botón abre una conversación con un mensaje ya escrito según lo que la persona eligió (sin formularios ni registro).
- Un **panel privado** para que Caroline publique la "sincronicidad del día" (carta + interpretación) sin tocar código.
- Una base de **seguridad y privacidad** pensada para la ley chilena de datos personales (Ley 19.628 y Ley 21.719).

## 🌐 Demo

Sitio en producción: **[www.carolinemagic.cl](https://www.carolinemagic.cl)**

## ✨ Características principales

### Sitio público

| Página | Ruta | Qué muestra |
|---|---|---|
| Inicio | `/` | Hero, método Caroline Magic, **fase lunar actual** (calculada con la posición real de la luna) y la **carta del día** que se revela al tocarla |
| Sesiones | `/sesiones` | Sesiones individuales (Tarot Mágico, constelaciones, registros, etc.) con modal "Ver más", precio, duración y modalidad |
| Encuentros grupales | `/encuentros-grupales` | Actividades grupales con reserva de cupo |
| Rituales | `/rituales` | Rituales por intención (amor, abundancia, salud, hogares, limpieza…) con videos |
| Academia | `/academia` | Formaciones y cursos autogestionados |
| Galería & Tienda | `/galeria-tienda` | Colecciones de arte, tarot/oráculos, box y objetos; las fotos rotan solas |
| Sobre Caroline | `/sobre-caroline` | Historia y fundamentos del método |

- **Botón flotante de WhatsApp** y mensajes predefinidos por contexto (`src/config/whatsapp.ts`).
- **SEO**: metadatos, imagen Open Graph, `sitemap.xml` y `robots.txt` generados por Next.js.
- Animaciones con Framer Motion y tipografías Playfair Display + Plus Jakarta Sans.

### Panel de administración (`/admin`)

- Inicio de sesión con correo y clave (**hash scrypt**, nunca en texto plano).
- Publicar la **sincronicidad del día**: título, imagen e interpretación. La imagen se sube directo del navegador a **Vercel Blob** y se verifica su contenido real antes de publicarla.
- **Registro manual de solicitudes de derechos** sobre datos personales (acceso, rectificación, supresión, etc.) que llegan por WhatsApp o correo, con su estado (recibida, en proceso, respondida…).

### Seguridad y privacidad

- **Content-Security-Policy con nonce** por petición (`src/proxy.ts`) y cabeceras de seguridad (HSTS, `X-Frame-Options`, `Permissions-Policy`…) en `next.config.ts`.
- **Límite de intentos de login** (5 fallos cada 15 min por IP + correo; 20 por hora por IP) con Upstash Redis.
- Sesión admin firmada con HMAC, revocable en el servidor, con expiración por inactividad (12 h) y máximo absoluto (3 días).
- **Banner de cookies**: Microsoft Clarity solo se carga si la persona acepta, y nunca en `/admin` ni `/derechos-datos`.
- Páginas legales: `/privacidad`, `/cookies`, `/terminos`, `/derechos-datos`, `/seguridad` y `/.well-known/security.txt`.
- Documentación interna de cumplimiento en `docs/cumplimiento/` e inventario de datos en `INVENTARIO-DATOS.md`.
- Dependabot revisa dependencias cada lunes.

## 🧰 Tecnologías

| Área | Herramienta |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Actions) |
| UI | React 19, Tailwind CSS 4, Framer Motion, Lucide React, React Icons |
| Lenguaje | TypeScript 5 |
| Almacenamiento de imágenes | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |
| Rate limit y sesiones | [Upstash Redis](https://upstash.com) + `@upstash/ratelimit` |
| Astronomía | `astronomy-engine` (fase y signo de la luna) |
| Analítica (opcional, con consentimiento) | Microsoft Clarity |
| Calidad | ESLint 9 (`eslint-config-next`) |
| Hosting | Vercel |

## ✅ Requisitos previos

Antes de empezar necesitas tener instalado:

1. **[Node.js](https://nodejs.org) 20.9 o superior** (lo exige Next.js 16). Comprueba tu versión con:
   ```bash
   node -v
   ```
2. **npm** (viene incluido con Node.js).
3. **[Git](https://git-scm.com)** para clonar el repositorio.

Opcional (solo si quieres probar todo el panel admin):

- Una cuenta de **[Vercel](https://vercel.com)** con un store de **Blob** (para subir imágenes).
- Una base de datos **[Upstash Redis](https://upstash.com)** (obligatoria en producción; en desarrollo se usa memoria).

## 🚀 Instalación paso a paso

**1. Clona el repositorio y entra a la carpeta**

```bash
git clone https://github.com/diegocabre/carolinemagic.git
```

```bash
cd carolinemagic
```

**2. Instala las dependencias**

```bash
npm install
```

**3. Crea tu archivo de variables de entorno**

Copia la plantilla `.env.example` a `.env.local`.

En macOS / Linux / Git Bash:

```bash
cp .env.example .env.local
```

En Windows (PowerShell):

```powershell
Copy-Item .env.example .env.local
```

> 💡 Para solo **ver el sitio público** puedes dejar todo vacío. El número de WhatsApp tiene un valor por defecto y, sin Vercel Blob, la carta del día simplemente no aparece.

**4. (Opcional) Configura el acceso al panel admin**

Genera el hash de tu clave (te la pedirá dos veces sin mostrarla):

```bash
npm run admin:hash
```

Genera un secreto aleatorio para firmar la sesión:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

Pega ambos valores en `.env.local` junto con tu correo (ver [Configuración](#%EF%B8%8F-configuración-env)).

**5. Arranca el servidor de desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador. ¡Listo! 🎉

> Si ves en la terminal un aviso `⚠️ [legal] Faltan N datos del responsable…`, es normal: indica que aún hay datos legales por completar en `src/config/legal.ts`. No impide que el sitio funcione.

## 🕹️ Uso

### Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática en `http://localhost:3000` |
| `npm run build` | Compila el sitio para producción |
| `npm run start` | Sirve la versión compilada (ejecuta antes `npm run build`) |
| `npm run lint` | Revisa el código con ESLint |
| `npm run admin:hash` | Genera el valor de `ADMIN_PASSWORD_HASH` a partir de una clave (mínimo 12 caracteres) |
| `npm run admin:check` | Comprueba si una clave coincide con un `ADMIN_PASSWORD_HASH` existente |

### Ejemplo: publicar la carta del día

1. Entra a [http://localhost:3000/admin/login](http://localhost:3000/admin/login) con el correo de `ADMIN_EMAIL` y tu clave.
2. Sube la imagen de la carta, escribe el título y la interpretación.
3. Publica. La página de inicio la mostrará al instante (se renderiza de forma dinámica).

### Ejemplo: agregar o editar una sesión

Todo el catálogo vive en archivos de datos, sin base de datos. Para agregar una sesión edita `src/data/sesiones.ts`:

```ts
{
  id: "mi-nueva-sesion",
  nombre: "Mi Nueva Sesión",
  emoji: "🌙",
  imagen: "/images/sesiones/mi-nueva-sesion.jpeg", // opcional
  descripcionBreve: "Frase corta que aparece en la tarjeta.",
  descripcionLarga: "Párrafo 1.\n\nPárrafo 2.",
  duracion: "60 min",
  modalidad: "Online (Zoom) o presencial",
  precio: "$XX",
},
```

Las colecciones de la tienda están en `src/data/products.ts` y las fotos en `public/images/galeria/<colección>/`.

### Ejemplo: cambiar un mensaje de WhatsApp

Edita `WHATSAPP_MESSAGES` en `src/config/whatsapp.ts`. Cada botón del sitio usa uno de esos mensajes y `getWhatsAppUrl()` arma el enlace `wa.me`.

## 📁 Estructura del proyecto

```
carolinemagic/
├── .github/dependabot.yml      # Actualización automática de dependencias
├── docs/
│   ├── PRIVACIDAD-DESARROLLO.md  # Checklist de privacidad para desarrollar
│   └── cumplimiento/             # Riesgos, retención, brechas, proveedores, RAT
├── public/images/              # Fotos y videos (sesiones, rituales, academia, galería…)
├── scripts/
│   ├── admin-hash.mjs          # Genera el hash de la clave admin
│   └── admin-check.mjs         # Verifica una clave contra el hash
├── src/
│   ├── app/                    # Rutas (App Router)
│   │   ├── admin/              # Panel privado y login
│   │   ├── api/admin/blob-upload/  # Emite tokens para subir imágenes a Vercel Blob
│   │   ├── .well-known/security.txt/
│   │   ├── sesiones/, rituales/, academia/, encuentros-grupales/,
│   │   ├── galeria-tienda/, sobre-caroline/
│   │   ├── privacidad/, cookies/, terminos/, derechos-datos/, seguridad/
│   │   ├── layout.tsx, page.tsx, robots.ts, sitemap.ts, globals.css
│   ├── components/             # Navbar, Footer, tarjetas, carruseles, visores
│   │   ├── admin/              # Formularios del panel
│   │   ├── consent/            # Banner y preferencias de cookies
│   │   └── legal/              # Plantilla legal, avisos y casillas de consentimiento
│   ├── config/
│   │   ├── legal.ts            # Datos legales del responsable (fuente única)
│   │   └── whatsapp.ts         # Número y mensajes de WhatsApp
│   ├── data/                   # Catálogo: sesiones, servicios, colecciones
│   ├── lib/
│   │   ├── actions/admin.ts    # Server Actions del panel
│   │   ├── security/           # CSP, sesión, contraseñas, rate limit, subidas
│   │   ├── derechos/           # Registro de solicitudes de derechos
│   │   ├── consent.ts, dailyCard.ts, moonPhase.ts, utils.ts
│   └── proxy.ts                # CSP con nonce y renovación de sesión admin
├── INVENTARIO-DATOS.md         # Inventario de datos personales
├── .env.example                # Plantilla de variables de entorno
├── next.config.ts              # Cabeceras de seguridad
└── package.json
```

## ⚙️ Configuración (.env)

Copia `.env.example` a `.env.local` para desarrollo. En producción configura las mismas variables en **Vercel → Settings → Environment Variables** (Production y Preview). **Nunca subas `.env.local` al repositorio.**

| Variable | ¿Obligatoria? | Descripción |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | Número de WhatsApp, solo dígitos con código de país (ej. `56912345678`). Si falta, se usa el definido en `src/config/whatsapp.ts`. |
| `ADMIN_EMAIL` | Para el panel | Correo con el que se inicia sesión en `/admin`. |
| `ADMIN_PASSWORD_HASH` | Para el panel | Hash scrypt de la clave. Se genera con `npm run admin:hash`. |
| `ADMIN_PASSWORD` | No (deprecada) | Clave en texto plano, solo por compatibilidad temporal. Bórrala en cuanto tengas `ADMIN_PASSWORD_HASH`. |
| `ADMIN_AUTH_SECRET` | Para el panel | Secreto de al menos 32 caracteres aleatorios para firmar la cookie de sesión. |
| `BLOB_READ_WRITE_TOKEN` | Para la carta del día | Token de Vercel Blob. Vercel lo crea al conectar un store de Blob al proyecto. |
| `UPSTASH_REDIS_REST_URL` | En producción | URL REST de Upstash Redis. También se acepta `KV_REST_API_URL`. |
| `UPSTASH_REDIS_REST_TOKEN` | En producción | Token REST de Upstash Redis. También se acepta `KV_REST_API_TOKEN`. |

Notas:

- **Sin Upstash en producción, el login admin se deshabilita** a propósito (falla segura). En `npm run dev` se usa un almacén en memoria y verás un aviso.
- La base de Upstash puede compartirse con otro proyecto: todas las claves de este sitio usan el prefijo `cm:`.
- Los **datos legales** (razón social, RUT, domicilio, correos) no van en `.env`: se completan en `src/config/legal.ts`.

## 🗺️ Roadmap

Elementos pendientes que aparecen en el propio código y documentación:

- [ ] Completar los datos del responsable en `src/config/legal.ts` (razón social, RUT, domicilio, correos de privacidad/seguridad/contacto).
- [ ] Revisión de todos los textos legales por un abogado (`docs/cumplimiento/LEGAL-REVISION.md`).
- [ ] Definir en `/terminos` el proceso real de reserva y pago, la política de cancelación y el derecho a retracto.
- [ ] Confirmar la lista de proveedores reales y los plazos de retención en `/privacidad`.
- [ ] Adecuación final a la **Ley 21.719** (vigencia plena el 1 de diciembre de 2026).
- [ ] Integración del bot de WhatsApp con n8n (hoy en *stand-by*; los botones apuntan al número directo).
- [ ] Completar las fotografías de la galería que aún muestran "Fotografía próximamente".
- [ ] Si se agregan formularios públicos (reservas, newsletter): validación con zod, rate limit y consentimiento según `docs/PRIVACIDAD-DESARROLLO.md`.

## 🤝 Contribuciones

Este repositorio es **de uso interno** y no acepta contribuciones externas (*issues* ni *pull requests* de terceros).

Para el equipo, el flujo de trabajo es:

1. Crea una rama descriptiva a partir de `main`:
   ```bash
   git checkout -b feat/mi-mejora
   ```
2. Antes de integrar, verifica que el código pasa el linter y compila:
   ```bash
   npm run lint
   ```
   ```bash
   npm run build
   ```
3. Si el cambio toca datos personales, cookies o servicios externos, sigue la checklist de [`docs/PRIVACIDAD-DESARROLLO.md`](docs/PRIVACIDAD-DESARROLLO.md).
4. Usa mensajes de commit con el estilo del proyecto (Conventional Commits en español), por ejemplo: `feat(admin): …`, `fix(seguridad): …`, `docs(cumplimiento): …`.

¿Encontraste una vulnerabilidad? Repórtala por el canal indicado en la página `/seguridad` o en `/.well-known/security.txt` del sitio, no en un issue público.

## 📄 Licencia

**Software propietario. Todos los derechos reservados.**

El código, los textos, las imágenes y la marca Caroline Magic son de uso exclusivo de sus titulares. No se permite copiar, modificar, distribuir ni usar ninguna parte de este repositorio sin autorización expresa y por escrito.

## 👤 Autoría

- **Desarrollo:** Diego Cabré — [@diegocabre](https://github.com/diegocabre)
- **Marca y contenidos:** Caroline Magic

<div align="center">

Hecho con ✨ y 🔮 para Caroline Magic.

</div>
