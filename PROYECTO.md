# PROYECTO.md — ManualidadesEliza

> Documento maestro del proyecto. Contiene la visión general, decisiones de
> alto nivel y contexto necesario para entender el porqué del proyecto.
> Este archivo lo leen tanto Claude Desktop (planificación) como Claude
> Code CLI (implementación).

**Última actualización:** 27 de abril de 2026
**Estado actual:** Fase de planificación
**Responsable técnico:** [Tu nombre aquí]

---

## 1. Visión

ManualidadesEliza es un emprendimiento familiar de manualidades a crochet
ubicado en Colombia. La emprendedora elabora a mano llaveros, blusas, bolsos,
carteras y otras piezas tejidas. Su negocio ha crecido orgánicamente en redes
sociales y necesita una presencia web profesional que funcione como vitrina
digital y punto de contacto centralizado.

Esta web no es una tienda online con checkout. Es una **vitrina digital** que
redirige a los visitantes hacia los canales reales de venta: WhatsApp Business
para pedidos personalizados y redes sociales para seguir el día a día del
emprendimiento.

---

## 2. Objetivos

### Objetivos principales
- Servir como vitrina digital del catálogo de productos
- Centralizar los enlaces a Instagram, Facebook y TikTok
- Facilitar el contacto directo vía WhatsApp Business
- Permitir acceso rápido mediante código QR (tarjetas, empaques, ferias)

### Objetivos secundarios
- Transmitir confianza y profesionalismo (la web sustituye al "local físico")
- Mejorar el SEO local (que aparezca cuando busquen crochet en su zona)
- Crear identidad visual coherente reutilizable en redes y empaque

### Lo que NO es objetivo
- No habrá carrito de compras ni checkout
- No habrá sistema de login ni cuentas de usuario
- No habrá blog (al menos por ahora)
- No habrá pasarela de pagos

---

## 3. Público objetivo

**Primario:** Mujeres adultas (18-45 años) interesadas en piezas hechas a mano,
moda artesanal, decoración del hogar y regalos personalizados.

**Secundario:** Mujeres mayores que buscan piezas tradicionales, y madres que
compran piezas para niños (amigurumis, llaveros, accesorios infantiles).

**Comportamiento de compra:** descubren el emprendimiento por redes sociales,
contactan por WhatsApp, hacen pedidos personalizados o compran piezas únicas.

---

## 4. Stack tecnológico

| Capa | Herramienta elegida | Costo anual |
|---|---|---|
| Framework | Astro | Gratis |
| Control de versiones | GitHub | Gratis |
| Hosting y deploy | Vercel (plan Hobby) | Gratis |
| Almacenamiento de fotos | Cloudinary (plan free) | Gratis |
| Dominio | Por comprar (Namecheap o Porkbun) | ~$12 USD |
| Correo | Gmail personal + email forwarding | Gratis |

**Costo total anual estimado:** ~$12 USD (solo el dominio)

El detalle del porqué de cada decisión está en `DECISIONES.md`.

---

## 5. Identidad visual

### Paleta elegida: Boho Salvia ✅

| Token | Hex | Uso |
|---|---|---|
| `--color-base` | `#F4F1E8` | Fondo principal |
| `--color-light` | `#C5D1B8` | Fondos secundarios, bordes |
| `--color-mid` | `#8FA58A` | Elementos de apoyo, iconos |
| `--color-accent` | `#D4A574` | CTAs, highlights |
| `--color-dark` | `#4A5D47` | Textos, navbar |

### Tipografía elegida ✅
- **Playfair Display** — títulos y headings (serif, Google Fonts)
- **Inter** — cuerpo de texto y UI (sans-serif, Google Fonts)

### Logo ✅
Logo existente aportado por la emprendedora. Pendiente exportar en SVG
o PNG alta resolución y verificar compatibilidad con la paleta.

---

## 6. Estructura de páginas (preliminar)

Por validar, pero la dirección probable es:

- **Inicio:** hero con frase de marca, productos destacados, CTA a WhatsApp
- **Catálogo:** galería filtrable por categoría (llaveros, bolsos, blusas...)
- **Sobre nosotras:** historia del emprendimiento, foto de la emprendedora
- **Contacto:** redes sociales, WhatsApp, formulario simple opcional

---

## 7. Flujo de trabajo

Este proyecto se desarrolla con dos herramientas coordinadas:

### Claude Desktop — Arquitecto
- Planificación, decisiones estratégicas, diseño conceptual
- Revisión y crítica del código producido por el CLI
- Documentación general del proyecto

### Claude Code CLI — Ejecutor
- Implementación técnica real
- Modifica archivos en el repositorio local
- Lee `CLAUDE.md` automáticamente al iniciar sesión

### El puente entre ambos
- `PROYECTO.md` (este archivo): visión general
- `DECISIONES.md`: registro técnico de decisiones con fecha y justificación
- `CLAUDE.md`: instrucciones técnicas específicas para el CLI
- Código fuente: lo que el CLI produce y Desktop revisa

---

## 8. Estado actual

**Fase:** Planificación (no se programa todavía)

### Decisiones resueltas ✅
- Stack completo (Astro, Vercel, GitHub, Cloudinary, Gmail)
- Paleta de color: Boho Salvia
- Tipografía: Playfair Display + Inter
- Logo: existente (aportado por la emprendedora)

### Decisiones pendientes
- Nombre exacto del dominio y dónde comprarlo
- Estructura definitiva de páginas
- Textos del sitio (los redacta la emprendedora con apoyo)

### Tareas previas a programar
- Crear cuenta dedicada de Gmail para el negocio
- Crear cuentas en GitHub, Vercel y Cloudinary con ese correo
- Recolectar 10-15 fotos de productos representativos
- Recopilar usernames exactos de Instagram, Facebook, TikTok
- Confirmar número de WhatsApp Business con código de país
- Exportar logo en SVG o PNG alta resolución
- Generar `CLAUDE.md` con instrucciones técnicas para el CLI

---

## 9. Contacto y enlaces

- **WhatsApp Business:** [pendiente]
- **Instagram:** [pendiente]
- **Facebook:** [pendiente]
- **TikTok:** [pendiente]
- **Repositorio:** [pendiente, GitHub]
- **Producción:** [pendiente, dominio]

---

## 10. Notas

Este documento se actualiza conforme avanza el proyecto. Cada cambio
significativo debe tener una entrada correspondiente en `DECISIONES.md`
con la fecha y el motivo.
