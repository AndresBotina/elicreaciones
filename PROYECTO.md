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

### Paleta oficial: Rosa suave ✅

| Token | Hex | Uso |
|---|---|---|
| `--color-base` | `#FDF4F0` | Fondo principal |
| `--color-light` | `#F4C7C3` | Fondos secundarios, bordes |
| `--color-mid` | `#E89BA3` | Elementos de apoyo, iconos |
| `--color-accent` | `#B56576` | CTAs, highlights |
| `--color-dark` | `#6B3547` | Textos principales, navbar |

### Tipografía oficial ✅
- **DM Serif Display** — títulos y headings (serif, Google Fonts)
- **Caveat** — acentos manuscritos ocasionales (Google Fonts)
- **Inter** — cuerpo de texto y UI (sans-serif, Google Fonts)

### Dirección estética: Femenina nostálgica ✅
- **Voz de marca:** cálida, cercana, dulce sin empalagar
- **Referencias:** Sezane, Doen, Reformation
- **Recursos visuales:** acentos manuscritos rotados, divisores
  orgánicos, marcos tipo polaroid, iconos dibujados a mano

### Logo ✅
Logo existente aportado por la emprendedora. Pendiente exportar en
SVG o PNG con fondo transparente y verificar compatibilidad con la
nueva paleta Rosa suave.
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

**Fase:** Implementación inicial

### Decisiones resueltas ✅
- Stack completo (Astro, Vercel, GitHub, Cloudinary, Gmail)
- Paleta de color: Rosa suave (#FDF4F0 → #6B3547)
- Dirección estética: Femenina nostálgica
- Tipografía: DM Serif Display + Caveat + Inter
- Logo: existente (aportado por la emprendedora)
- Estructura de páginas: 4 páginas (Inicio, Catálogo, Sobre nosotras, Contacto)
- Textos del sitio: definidos en TEXTOS.md

### Decisiones pendientes
- Dominio propio (por ahora: subdominio Vercel)
- Usernames exactos de redes sociales
- Fotos de productos subidas a Cloudinary
- Logo exportado en PNG fondo transparente

### Tareas en curso
- Reimplementación visual completa con nueva paleta y tipografías
- Verificar cloud name en Cloudinary
- Subir primeras fotos reales (una por categoría)

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
