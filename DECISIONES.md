# DECISIONES.md — ManualidadesEliza

> Registro cronológico de decisiones técnicas y estratégicas del proyecto.
> Cada entrada explica QUÉ se decidió, CUÁNDO y POR QUÉ. Esto evita tener
> que reconstruir el razonamiento meses después.
>
> Formato inspirado en ADR (Architecture Decision Records).

**Última actualización:** 27 de abril de 2026

---

## ADR-001 — Stack: sitio estático con Astro
**Fecha:** 27 de abril de 2026
**Estado:** Aceptado

### Contexto
Se necesita una web para un emprendimiento de manualidades a crochet. Se
contemplaron tres direcciones: sitio estático puro, sitio estático con CMS
ligero, o aplicación con backend (Next.js + base de datos).

### Decisión
Sitio estático con **Astro** como framework.

### Razones
- La web es una vitrina: no requiere lógica de servidor
- No hay carrito, ni login, ni datos de usuario que persistir
- Astro genera HTML estático puro, lo que da máxima velocidad de carga
- El SEO es excelente sin configuración adicional
- Cero costo de hosting al ser estático
- Curva de aprendizaje más amable que Next.js
- Permite agregar islas de React/Vue si en el futuro se necesita interactividad

### Alternativas consideradas
- **Next.js + Supabase:** sobreingeniería. Añade DB que estaría casi vacía,
  funciones serverless que podrían cobrar al escalar, y mantenimiento
  innecesario para los objetivos actuales.
- **WordPress:** facilita la edición pero es más lento, más vulnerable,
  requiere hosting de pago y mantenimiento constante de plugins.
- **Astro + CMS (Sanity/Decap):** opción válida, pero añade complejidad
  antes de saber si la emprendedora realmente la usará. Se puede migrar
  a esto en el futuro si hace falta.

### Consecuencias
- Las actualizaciones de catálogo requieren commits a Git (las hace el dev)
- Posibilidad futura de añadir CMS sin reescribir el proyecto
- El visitante recibe HTML pre-renderizado: experiencia instantánea

---

## ADR-002 — Hosting: Vercel
**Fecha:** 27 de abril de 2026
**Estado:** Aceptado

### Contexto
Se necesita un proveedor de hosting que sea gratis, confiable, con HTTPS
automático y deploy continuo desde Git.

### Decisión
**Vercel** en su plan Hobby (gratuito).

### Razones
- 100% gratis para sitios estáticos sin trampa
- Integración nativa con GitHub (push to deploy)
- CDN global incluido (latencia baja en LatAm)
- HTTPS automático con Let's Encrypt
- Dominios personalizados sin costo adicional
- Soporta Astro de forma nativa

### Alternativas consideradas
- **Netlify:** equivalente funcional. Vercel se eligió por mejor integración
  con frameworks modernos y dashboard más intuitivo.
- **GitHub Pages:** gratis y simple, pero más limitado en builds y sin
  dashboard de analítica básica.
- **Cloudflare Pages:** opción muy buena. Mantenida como alternativa de
  respaldo si Vercel cambia condiciones.

### Consecuencias
- Cualquier `git push` a la rama principal despliega en producción
- Builds automáticos en pull requests para revisar cambios antes de merge
- Si Vercel cambiara términos del free tier, migración a Netlify o
  Cloudflare Pages es directa (mismo build estático)

---

## ADR-003 — Almacenamiento de imágenes: Cloudinary
**Fecha:** 27 de abril de 2026
**Estado:** Aceptado

### Contexto
Las fotos de productos de crochet son el contenido principal de la web.
Las fotos de celular pesan 3-5 MB cada una. Sin optimización, la web
cargaría en 8-15 segundos en móvil, perdiendo visitantes.

### Decisión
Almacenar las fotos en **Cloudinary** (plan free, 25 GB) desde el inicio.

### Razones
- Optimización automática (WebP, redimensionado responsive)
- CDN global para servir las fotos rápido en cualquier país
- Transformaciones por URL (un solo upload genera infinitas variantes)
- Plan gratuito generoso (25 GB de almacenamiento + 25 GB de ancho de banda)
- Estándar de la industria, robusto y bien documentado
- Panel visual donde la emprendedora podría eventualmente subir fotos

### Alternativas consideradas
- **Fotos en el repo + Astro Image:** opción válida para empezar. Funciona
  bien con catálogos chicos (<30 productos) pero el repo se vuelve pesado
  conforme crece el catálogo.
- **Cloudflare Images / R2:** más control pero más configuración y curva
  de aprendizaje mayor.
- **AWS S3:** sobreingeniería. Sin transformaciones automáticas habría que
  optimizar a mano cada imagen.

### Consecuencias
- Una cuenta adicional que crear y mantener
- Las URLs de imágenes apuntan a `res.cloudinary.com/[cloud-name]/...`
- El proyecto depende de la disponibilidad de Cloudinary, mitigado por su
  alta confiabilidad histórica
- Flujo de actualización: WhatsApp → upload manual a Cloudinary → URL en
  `productos.json` → commit + push

---

## ADR-004 — Sin base de datos
**Fecha:** 27 de abril de 2026
**Estado:** Aceptado

### Contexto
La intuición inicial era usar una base de datos para guardar los productos.
Esto sería la opción "obvia" para alguien con experiencia en aplicaciones
tradicionales.

### Decisión
**No usar base de datos.** El catálogo de productos vive en un archivo
JSON dentro del repositorio (`src/data/productos.json` o similar).

### Razones
- Los datos cambian con muy baja frecuencia (no es transaccional)
- No hay usuarios autenticados
- No hay pedidos que registrar (se gestionan por WhatsApp)
- Una DB añadiría costo, complejidad y un punto de falla adicional
- Versionar productos en Git es trivial y permite rollback
- El sitio se rebuilda en segundos cuando hay cambios

### Alternativas consideradas
- **Supabase / PlanetScale:** capaces, gratis al inicio, pero injustificadas
  para los objetivos actuales.
- **Sanity / Decap CMS:** se evalúa para una segunda fase si la emprendedora
  necesita autonomía para editar productos sin pedir ayuda al dev.

### Consecuencias
- Editar productos requiere commit a Git
- Cero costo de DB, cero mantenimiento, cero migraciones
- Si en el futuro se necesitan datos dinámicos (formularios, comentarios),
  se puede integrar Supabase puntualmente sin migrar todo el stack

---

## ADR-005 — Correo: Gmail personal + forwarding
**Fecha:** 27 de abril de 2026
**Estado:** Aceptado

### Contexto
Se evaluó usar Google Workspace (~$84 USD/año) para tener correos
profesionales con el dominio del negocio (`hola@manualidadeseliza.com`).

### Decisión
Crear una **cuenta Gmail personal nueva** dedicada al negocio + usar
**email forwarding** del proveedor de dominio para tener correos
profesionales sin pagar Workspace.

### Razones
- El negocio aún no tiene flujo de ingresos que justifique $84 USD/año
- El público contacta principalmente por WhatsApp y redes sociales
- El correo es secundario en este tipo de emprendimiento
- Forwarding gratis (Cloudflare, Namecheap, Porkbun) ofrece la imagen
  profesional de un correo con dominio sin costo adicional
- Se puede migrar a Workspace en el futuro si crece la necesidad

### Alternativas consideradas
- **Google Workspace:** mejor experiencia nativa pero costo no justificado ahora.
- **Zoho Mail Free:** alternativa gratuita con dominio propio nativo.
  Considerada como respaldo si el forwarding no funciona bien.

### Consecuencias
- Una sola cuenta Gmail centraliza todos los servicios del proyecto
  (GitHub, Vercel, Cloudinary, dominio, redes)
- Imagen profesional preservada gracias al forwarding
- Costo: $0

---

## ADR-006 — Flujo dual: Claude Desktop + Claude Code CLI
**Fecha:** 27 de abril de 2026
**Estado:** Aceptado

### Contexto
El desarrollador tiene acceso a Claude Desktop (con proyectos) y Claude
Code CLI. Ambas herramientas son útiles pero distintas: Desktop persiste
contexto y archivos del proyecto, CLI ejecuta cambios reales en el
sistema de archivos.

### Decisión
Usar ambas herramientas con roles separados y un puente documental:

- **Claude Desktop** = arquitecto (planeación, decisiones, revisión)
- **Claude Code CLI** = ejecutor (implementación técnica)
- **Puente** = archivos `PROYECTO.md`, `DECISIONES.md`, `CLAUDE.md` en el repo

### Razones
- Cada herramienta tiene fortalezas diferentes
- Los archivos del repo son lectura común para ambas
- Evita reescribir contexto en cada sesión del CLI
- Las decisiones quedan documentadas y versionadas en Git

### Consecuencias
- El repo contiene tanto código como documentación viva del proyecto
- Cualquier nuevo desarrollador (o Claude futuro) puede ponerse al día
  leyendo los `.md`
- Disciplina necesaria: cada decisión grande se registra aquí

---

## ADR-007 — Paleta de color: Boho Salvia
**Fecha:** 27 de abril de 2026
**Estado:** Aceptado

### Contexto
Se definieron tres paletas finalistas para el proyecto: Tierra Cálida,
Rosa Suave y Boho Salvia. La decisión se tomó con input directo de la
emprendedora.

### Decisión
**Paleta Boho Salvia** como identidad visual del sitio.

| Token | Hex | Uso previsto |
|---|---|---|
| `--color-base` | `#F4F1E8` | Fondo principal |
| `--color-light` | `#C5D1B8` | Fondos secundarios, bordes suaves |
| `--color-mid` | `#8FA58A` | Elementos de apoyo, iconos |
| `--color-accent` | `#D4A574` | CTAs, highlights, detalles cálidos |
| `--color-dark` | `#4A5D47` | Textos principales, navbar |

### Razones
- Transmite naturalidad, artesanía y modernidad sin caer en lo rústico
- El verde salvia y el beige son tendencia sostenida en moda artesanal y crochet
- Contrasta bien con fotografías de productos coloridos (llaveros, blusas, bolsos)
- La paleta es fresca pero no fría, apropiada para el público objetivo femenino
- El acento terracota (`#D4A574`) añade calidez sin romper la coherencia boho

### Alternativas consideradas
- **Tierra Cálida:** más artesanal y premium, pero podía sentirse oscura
  con productos ya de por sí coloridos.
- **Rosa Suave:** femenina y moderna, pero más genérica para el nicho
  de crochet. Menor diferenciación visual.

### Consecuencias
- Todos los componentes del sitio usarán estos tokens CSS como base
- Los acentos por categoría de producto (si se implementan) deben ser
  compatibles con esta paleta, no reemplazarla
- La paleta aplica también a materiales de marca offline: empaque, tarjetas, QR

---

## ADR-008 — Logo: existente (aportado por la emprendedora)
**Fecha:** 27 de abril de 2026
**Estado:** Aceptado

### Contexto
Se evaluó si había que diseñar un logo desde cero o si ya existía uno
usable para la marca.

### Decisión
Usar el **logo existente** aportado por la emprendedora.

### Razones
- Existe identidad visual previa construida en redes sociales
- Cambiar el logo implicaría romper el reconocimiento de marca ya ganado
- Evita el costo y tiempo de diseño de logotipo
- Se puede refinar o vectorizar si fuera necesario, sin rediseñar desde cero

### Consecuencias
- El logo debe exportarse en SVG o PNG de alta resolución para uso web
- Se verificará compatibilidad cromática con la paleta Boho Salvia
- Si el logo tiene colores propios muy distintos a la paleta, se evaluará
  una versión monocromática para uso sobre fondos de color

---

## ADR-009 — Tipografía: Playfair Display + Inter
**Fecha:** 27 de abril de 2026
**Estado:** Aceptado

### Contexto
Con la paleta Boho Salvia definida, se necesita un par tipográfico que
refuerce la identidad visual: artesanal, femenina, moderna y legible en móvil.

### Decisión
- **Playfair Display** (serif) — títulos, headings, nombre de marca
- **Inter** (sans-serif) — cuerpo de texto, UI, botones, navegación

Ambas disponibles en Google Fonts (carga gratuita, sin licencia).

### Razones
- **Playfair Display** tiene personalidad editorial y artesanal, con remates
  elegantes que complementan la estética boho sin caer en lo vintage pesado.
  Es reconocible en marcas de moda y productos hechos a mano.
- **Inter** es la sans-serif más legible en pantalla a tamaños pequeños,
  diseñada específicamente para interfaces digitales. Contrasta bien con
  Playfair sin competir con ella.
- El par serif + sans-serif es la combinación más confiable para webs de
  producto: jerarquía clara, lectura fluida, carácter visual sin exceso.
- Ambas son Google Fonts: integración nativa en Astro, sin costo, con
  buen rendimiento usando `font-display: swap`.

### Alternativas consideradas
- **Cormorant Garamond + DM Sans:** más delicado y literario, ligeramente
  menos robusto en pantallas pequeñas de gama baja.
- **Josefin Sans + Lato:** más geométrico y moderno, pero pierde carácter
  artesanal.
- **Libre Baskerville + Source Sans Pro:** sólido pero más genérico,
  sin la personalidad que Playfair aporta.

### Consecuencias
- Escala tipográfica base a definir en `CLAUDE.md` para uso del CLI
- Si la emprendedora o el diseño final piden un cambio, la migración es
  trivial (cambiar imports de Google Fonts + tokens CSS)
- Se usará `font-display: swap` para evitar FOUT en carga inicial

---

## Plantilla para nuevas decisiones

Copiar y rellenar al añadir una nueva entrada:

```markdown
## ADR-XXX — Título corto y descriptivo
**Fecha:** [día] de [mes] de [año]
**Estado:** [Propuesto | Aceptado | Rechazado | Reemplazado por ADR-YYY]

### Contexto
¿Qué situación motivó esta decisión?

### Decisión
¿Qué se decidió hacer?

### Razones
¿Por qué se eligió esto?

### Alternativas consideradas
¿Qué otras opciones se evaluaron y por qué se descartaron?

### Consecuencias
¿Qué implica esta decisión a futuro?
```
