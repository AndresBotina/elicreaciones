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
| Imágenes | Cloudinary (URLs externas, no archivos en el repo) |
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

### Paleta: Boho Salvia

```css
:root {
  --color-base:    #F4F1E8;  /* fondo principal */
  --color-light:   #C5D1B8;  /* fondos secundarios, bordes */
  --color-mid:     #8FA58A;  /* elementos de apoyo, iconos */
  --color-accent:  #D4A574;  /* CTAs, highlights, hover */
  --color-dark:    #4A5D47;  /* textos principales, navbar */

  /* Semánticos */
  --bg:            var(--color-base);
  --bg-secondary:  var(--color-light);
  --text:          var(--color-dark);
  --text-muted:    var(--color-mid);
  --cta:           var(--color-accent);
  --cta-hover:     #c4925e;
}
```

### Tipografía

```css
/* Importar en BaseLayout.astro o global.css */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');

:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;
}
```

### Escala tipográfica

```css
:root {
  --text-xs:   0.75rem;   /* 12px — labels, badges */
  --text-sm:   0.875rem;  /* 14px — captions, metadata */
  --text-base: 1rem;      /* 16px — cuerpo */
  --text-lg:   1.125rem;  /* 18px — lead text */
  --text-xl:   1.25rem;   /* 20px — subtítulos */
  --text-2xl:  1.5rem;    /* 24px — h3 */
  --text-3xl:  1.875rem;  /* 30px — h2 */
  --text-4xl:  2.25rem;   /* 36px — h1 móvil */
  --text-5xl:  3rem;      /* 48px — h1 desktop */
}
```

### Espaciado

```css
:root {
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
}
```

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
- Siempre usar URLs de Cloudinary, nunca archivos locales en `/public`
- Formato recomendado en la URL: agregar `/f_auto,q_auto,w_800/` para optimización automática
- Ejemplo: `https://res.cloudinary.com/[CLOUD_NAME]/image/upload/f_auto,q_auto,w_800/v1/manualidades-eliza/nombre-imagen`

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
  cloudinary: {
    cloudName: '[CLOUD_NAME]',
    baseUrl:   'https://res.cloudinary.com/[CLOUD_NAME]/image/upload',
    transform: 'f_auto,q_auto,w_800',
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
