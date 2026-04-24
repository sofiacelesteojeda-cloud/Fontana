# Alnikers — Plataforma de Venta de Accesorios

## Descripción general

**Alnikers** es una tienda online de accesorios femeninos (aritos, pulseras, collares y anillos) orientada al mercado argentino. La propuesta de valor combina un diseño *cute* y moderno con una experiencia de compra simple, directa y sin fricción.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Markup | HTML5 semántico |
| Estilos | CSS3 puro — variables CSS, Grid, Flexbox, animaciones |
| Lógica | JavaScript vanilla (ES2020+, sin dependencias) |
| Tipografía | Google Fonts — Playfair Display + Poppins |
| Persistencia | `localStorage` (carrito del cliente) |
| Deploy | GitHub Pages (rama `main`) |
| Control de versiones | Git + GitHub |

### Por qué sin frameworks

- **Carga instantánea:** sin bundle JS, sin tiempo de hidratación.
- **Mantenimiento simple:** cualquier persona con conocimientos básicos puede editar el sitio.
- **Costo cero:** GitHub Pages es gratuito para repositorios públicos.
- **Escalabilidad futura:** la arquitectura es fácilmente migrable a Next.js, Astro o cualquier framework si el volumen de tráfico o catálogo lo requiere.

---

## Estructura del proyecto

```
Fontana/
├── index.html          # Sitio completo (SPA estática)
├── css/
│   └── styles.css      # Variables, componentes y responsive
├── js/
│   └── main.js         # Carrito, filtros, animaciones
└── ALNIKERS.md         # Este documento
```

---

## Funcionalidades actuales

### Catálogo
- 12 productos en 4 categorías: aritos, pulseras, collares, anillos.
- Filtrado por categoría con animación fade.
- Badges de "Nuevo" y "Oferta".
- Precios en pesos argentinos (ARS).

### Carrito de compras
- Drawer lateral sin recarga de página.
- Agregar, aumentar, reducir y eliminar productos.
- Cálculo de total en tiempo real.
- Persistencia en `localStorage` (el carrito se mantiene al cerrar el navegador).
- Contador badge animado en el ícono del carrito.

### UX / Diseño
- Diseño responsive: mobile (375px), tablet (768px), desktop (1200px).
- Paleta de colores 100% rosa pastel.
- Animaciones de scroll (Intersection Observer).
- Navbar con efecto blur al hacer scroll.
- Menú hamburger en mobile.
- Toast de confirmación al agregar productos.
- Scroll suave entre secciones.

---

## Estrategia de negocio

### Segmento objetivo
Mujeres de 16 a 35 años, en Argentina, que buscan accesorios modernos, de precio accesible y con estética *cute* o romántica. Canal principal de adquisición: Instagram y TikTok.

### Modelo de ingresos
| Canal | Descripción |
|---|---|
| Venta directa online | Precio de lista con envío por Correo Argentino / OCA / Andreani |
| Mayoristas | Descuentos por volumen (a implementar en v2) |
| Colaboraciones | Canjes con micro-influencers del nicho accesorios/moda |

### Estrategia de precios
Posicionamiento en el segmento **accesible-premium**: productos de calidad superior a los de feria, pero sin llegar a joyería de lujo. Rango actual: $1.200 – $4.200 ARS.

### Canales de adquisición de clientes
1. **Instagram** — feed curado, reels de producto, stories con encuestas.
2. **TikTok** — videos cortos de unboxing, outfit of the day, ASMR de empaque.
3. **WhatsApp Business** — atención al cliente y cierre de ventas.
4. **Boca a boca** — packaging cuidado que incentiva compartir en redes.

### Diferenciadores
- Diseño visual coherente y aspiracional (paleta rosa pastel consistente).
- Nombre de marca memorable y corto: **Alnikers**.
- Experiencia de compra sin fricciones (carrito persistente, sin registro obligatorio).
- Empaque con identidad de marca (a definir en operaciones).

---

## Roadmap — Próximas iteraciones

### v2 — Catálogo ampliado
- [ ] Imágenes reales de producto (fotografía profesional o plana).
- [ ] Más de 30 SKUs organizados con filtros múltiples (color, material, precio).
- [ ] Sección de "Combos" o kits de accesorios.

### v3 — Integración de pagos
- [ ] MercadoPago Checkout Pro (método más adoptado en Argentina).
- [ ] Gestión de stock básica.
- [ ] Email de confirmación de pedido.

### v4 — Backend y CMS
- [ ] Panel de administración para cargar productos sin tocar código.
- [ ] Base de datos de clientes y pedidos.
- [ ] Integración con correo para tracking de envíos.
- [ ] Programa de fidelidad / puntos.

---

## Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| `--pink-primary` | `#FFB3C6` | Fondos, badges, hover |
| `--pink-dark` | `#FF6B9D` | Botones CTA, links activos |
| `--pink-deeper` | `#C2185B` | Precios, acentos fuertes |
| `--pink-light` | `#FFF0F5` | Fondos de sección |
| `--pink-border` | `#FFD6E0` | Bordes de tarjetas |
| `--text-main` | `#4A2040` | Texto principal |
| `--text-muted` | `#8B5672` | Texto secundario |

---

## Deploy y operaciones

- **Hosting:** GitHub Pages (gratuito, CDN global de GitHub).
- **Dominio:** por defecto `sofiacelesteojeda-cloud.github.io/Fontana` — se puede conectar un dominio custom (`alnikers.com.ar`) desde Settings → Pages → Custom domain.
- **CI/CD:** push a `main` = deploy automático (sin pipeline adicional).
- **Performance:** sitio estático, sin servidor, TTI < 1s en conexiones 4G.

---

*Documento creado: abril 2026 · Alnikers v1.0*
