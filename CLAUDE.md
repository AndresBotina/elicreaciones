# CLAUDE.md — ManualidadesEliza

> Instrucciones técnicas para **Claude Code CLI**.
> Este archivo se lee automáticamente al iniciar una sesión de Claude Code
> en el repositorio. Contiene todo lo necesario para implementar sin
> necesidad de repetir contexto en cada sesión.
>
> Para contexto estratégico y decisiones de alto nivel, leer `PROYECTO.md`.
> Para el historial de decisiones técnicas, leer `DECISIONES.md`.

**Última actualización:** 27 de abril de 2026

---

## 1. Contexto del proyecto

Sitio web vitrina para **ManualidadesEliza**, emprendimiento colombiano de
manualidades a crochet. **No es una tienda con checkout.** Es una galería
de productos que redirige a WhatsApp y redes sociales.

- Sin carrito, sin login, sin base de datos, sin pagos
- Público: mujeres 18-45, principalmente móvil
- Prioridad técnica: velocidad de carga y claridad visual

---

## 2. Stack

| Capa | Herramienta |
|---|---|
| Framework | Astro (último estable) |
| Estilos | CSS puro con variables (sin Tailwind, sin frameworks CSS) |
| Imágenes | Vercel Blob (URLs externas, no archivos en el repo) |
| Deploy | Vercel (automático desde GitHub) |
| Lenguaje | JavaScript puro (sin TypeScript) |
| Datos | `src/data/productos.json` (sin DB) |
| Fuentes | Google Fonts (Playfair Display + Inter) |

---

## 3. Estructura de carpetas

```
manualidades-eliza/
├── public/
│   ├── favicon.svg
│   └── og-image.jpg          # imagen para redes sociales
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ProductCard.astro
│   │   ├── ProductGrid.astro
│   │   ├── Hero.astro
│   │   └── WhatsAppButton.astro
│   ├── config.js              # constantes del negocio
│   ├── data/
│   │   └── productos.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro        # Inicio
│   │   ├── catalogo.astro     # Catálogo
│   │   ├── nosotras.astro     # Sobre nosotras
│   │   └── contacto.astro     # Contacto
│   └── styles/
│       └── global.css
├── CLAUDE.md                  # este archivo
├── DECISIONES.md
├── PROYECTO.md
├── astro.config.mjs
└── package.json
```

---

## 4. Identidad visual

### Paleta oficial: Rosa suave

```css
:root {
  --color-base:    #FDF4F0;  /* fondo principal */
  --color-light:   #F4C7C3;  /* fondos secundarios, bordes */
  --color-mid:     #E89BA3;  /* elementos de apoyo, iconos */
  --color-accent:  #B56576;  /* CTAs, highlights, hover */
  --color-dark:    #6B3547;  /* textos principales, navbar */

  /* Semánticos */
  --bg:            var(--color-base);
  --bg-secondary:  var(--color-light);
  --text:          var(--color-dark);
  --text-muted:    var(--color-mid);
  --cta:           var(--color-accent);
  --cta-hover:     #9e4f63;
}
```

### Tipografía oficial

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;600&family=Inter:wght@400;500;600&display=swap');

:root {
  --font-heading:    'DM Serif Display', Georgia, serif;
  --font-handwritten:'Caveat', cursive;
  --font-body:       'Inter', system-ui, sans-serif;
}
```

### Reglas de uso tipográfico
- `--font-heading`: h1, h2, h3, nombre de marca, títulos de sección
- `--font-handwritten`: frases cortas de acento, nunca párrafos ni UI.
  Usar con moderación — máximo 1-2 apariciones por página
- `--font-body`: todo el resto — párrafos, botones, labels, nav

### Dirección estética: Femenina nostálgica
- Referencias visuales: Sezane, Doen, Reformation
- Recursos permitidos: acentos manuscritos rotados (con Caveat),
  divisores orgánicos (SVG ondulado entre secciones), marcos tipo
  polaroid en fotos (sombra + borde blanco grueso), iconos dibujados
  a mano (SVG custom o librería como Phosphor Icons en stroke fino)
- Voz visual: cálida, cercana, femenina sin ser infantil
---

## 5. Datos: productos.json

Estructura de cada producto:

```json
{
  "id": "llavero-corazon-001",
  "nombre": "Llavero corazón",
  "categoria": "llaveros",
  "precio": 15000,
  "moneda": "COP",
  "descripcion": "Llavero tejido a crochet en hilo algodón. Disponible en varios colores.",
  "colores": ["rosa", "verde", "azul"],
  "imagenes": [
    "https://res.cloudinary.com/[CLOUD_NAME]/image/upload/v1/manualidades-eliza/llavero-corazon-001"
  ],
  "disponible": true,
  "destacado": false
}
```

**Categorías válidas:** `llaveros`, `bolsos`, `blusas`, `carteras`, `amigurumis`, `accesorios`

**Notas sobre imágenes:**
- Siempre usar URLs de Vercel Blob, nunca archivos locales en `/public`
- Las URLs se obtienen al subir las fotos desde el dashboard de Vercel o con su CLI
- Formato de URL resultante: `https://[id].public.blob.vercel-storage.com/[archivo]`
- No hay transformaciones de URL — optimizar las fotos antes de subir (≤ 800px de ancho, JPEG o WebP)
- El campo `imagenes` puede ser `[]` mientras las fotos no están subidas; los componentes muestran el placeholder automáticamente
- Helper disponible en `src/lib/images.js`: `getFirstImage(imagenes)` → URL o `null`

---

## 6. Páginas

### `/` — Inicio
- Hero: frase de marca + imagen destacada + botón CTA a WhatsApp
- Sección "Productos destacados": grid con los productos donde `destacado: true`
- Sección "Encuéntranos en redes": íconos + links a Instagram, Facebook, TikTok
- Footer

### `/catalogo` — Catálogo
- Filtros por categoría (tabs o botones, no dropdown)
- Grid de tarjetas de producto
- Cada tarjeta: imagen, nombre, precio, botón "Pedir por WhatsApp"
- El botón WhatsApp abre con mensaje pre-armado: `?text=Hola! Me interesa el [nombre del producto]`

### `/nosotras` — Sobre nosotras
- Foto de la emprendedora
- Historia del emprendimiento (texto aportado por ella)
- Valores o filosofía de la marca

### `/contacto` — Contacto
- Botón grande de WhatsApp
- Links a redes sociales
- Formulario simple opcional (nombre, mensaje) — sin backend por ahora, puede usar Formspree

---

## 7. Componentes clave

### WhatsAppButton
- Color: `#25D366` (verde WhatsApp oficial)
- Número: definir en variable de entorno o constante en `src/config.ts`
- El mensaje pre-armado debe estar URL-encoded

### ProductCard
- Imagen con `loading="lazy"` y `aspect-ratio: 1/1` o `4/5`
- Nombre del producto en `font-family: var(--font-heading)`
- Precio formateado en COP con `Intl.NumberFormat('es-CO')`
- Botón WhatsApp con mensaje específico del producto

### BaseLayout
- Carga las fuentes de Google Fonts
- Incluye `global.css`
- Meta tags básicos (title, description, og:image)
- Header y Footer

---

## 8. Convenciones de código

- **Lenguaje:** JavaScript puro — sin TypeScript, sin `.ts`, sin tipos
- **Idioma del contenido:** español (textos, labels, mensajes)
- **Componentes:** PascalCase (`ProductCard.astro`)
- **Archivos de página:** kebab-case (`sobre-nosotras.astro` → ruta `/sobre-nosotras`)
- **CSS:** variables CSS para todo color, tipografía y espaciado (no valores hardcodeados)
- **Imágenes:** siempre con `alt` descriptivo en español
- **Sin JS innecesario:** usar Astro estático por defecto; JS solo donde sea imprescindible

---

## 9. Variables de entorno / configuración

Crear `src/config.js` con las constantes del negocio:

```js
export const CONFIG = {
  whatsapp: {
    number: '+57XXXXXXXXXX',   // número con código de país, sin espacios ni guiones
    defaultMessage: 'Hola! Vi tu página web y me interesa saber más sobre tus productos.',
  },
  social: {
    instagram: 'https://instagram.com/[usuario]',
    facebook:  'https://facebook.com/[usuario]',
    tiktok:    'https://tiktok.com/@[usuario]',
  },
  blob: {
    // Token configurado en .env como BLOB_READ_WRITE_TOKEN — solo para subir fotos, no para el frontend
    storeId: 'elicreaciones',
  },
  site: {
    name:        'ManualidadesEliza',
    description: 'Manualidades a crochet hechas a mano en Colombia. Llaveros, bolsos, blusas y más.',
    url:         'https://manualidadeseliza.vercel.app', // actualizar cuando haya dominio propio
  },
};
```

---

## 10. SEO mínimo

Cada página debe tener en su `<head>`:

```html
<title>{titulo} | ManualidadesEliza</title>
<meta name="description" content="{descripcion}" />
<meta property="og:title" content="{titulo}" />
<meta property="og:description" content="{descripcion}" />
<meta property="og:image" content="/og-image.jpg" />
<meta property="og:type" content="website" />
<link rel="canonical" href="{url}" />
```

---

## 11. Lo que NO hacer

- ❌ No instalar Tailwind ni ningún framework CSS
- ❌ No crear páginas separadas por categoría de producto (usar filtros en `/catalogo`)
- ❌ No guardar imágenes de productos en `/public` ni en el repo
- ❌ No usar `<a href="#">` como placeholder — usar `href="/ruta"` real
- ❌ No hardcodear colores, fuentes ni espaciados — siempre usar variables CSS
- ❌ No agregar animaciones complejas — la web debe cargar rápido en 3G
- ❌ No crear backend ni API routes — el sitio es 100% estático

---

## 12. Checklist antes de hacer commit

- [ ] `npm run build` pasa sin errores
- [ ] Las imágenes tienen `alt` en español
- [ ] Los colores usan variables CSS (`var(--color-*)`)
- [ ] El botón de WhatsApp funciona con número real (no placeholder)
- [ ] La página se ve bien en 375px de ancho (iPhone SE)
- [ ] No hay `console.log` olvidados
