# Sitio web RAICES – versión TraveLand

Sitio estático (HTML + CSS + JS, sin compilación) construido sobre la plantilla
**TraveLand** (UIdeck / ThemeWagon), con la estructura de
[`../Raices_Page/ARQUITECTURA.md`](../Raices_Page/ARQUITECTURA.md) y la paleta de
[`../Raices_Page/ESTILO.md`](../Raices_Page/ESTILO.md).

La versión anterior, hecha con CardioCare, sigue intacta en `../Raices_Page`.

Todo el texto entre corchetes `[...]` y las barras grises son **marcadores de contenido pendiente**.

## Páginas

| Sección | Archivo |
|---|---|
| Inicio | `index.html` |
| Sobre | `sobre.html` |
| Equipo | `equipo.html` (filtros por rol) |
| Investigación | `investigacion.html` → `peligros.html`, `modelacion.html`, `sociedad.html` |
| Detalle de proyecto (plantilla) | `proyecto.html` |
| Recursos | `recursos.html` (filtros por tipo) |
| Participa | `comunidad.html`, `estudiantes.html`, `oportunidades.html` |
| Actualidad | `eventos.html` → `evento.html` (plantilla), `noticias.html` → `noticia.html` (plantilla) |
| Contacto | `contacto.html` |
| Legales | `privacidad.html`, `accesibilidad.html` |

## Estructura

```
assets/
├── css/
│   ├── bootstrap, animate, nice-select, LineIcons, default.css   (de TraveLand, sin tocar)
│   ├── style.css     Estilos originales de TraveLand (sin tocar)
│   └── raices.css    Capa RAICES: recolorea TraveLand y añade componentes nuevos
├── js/
│   ├── layout.js     Menú, pantalla de carga y pie compartidos (el mapa del sitio vive aquí)
│   ├── main.js       Menú fijo, submenús móviles, contadores, filtros, formularios, alerta
│   └── vendor/, bootstrap, wow, counterup, nice-select…   (de TraveLand)
├── fonts/            LineIcons
├── images/           hero-area.jpg (provisional) y favicon.svg
└── TRAVELAND-LICENCIA.txt
```

## Cómo se adaptó la plantilla

- **Colores sin editar el template:** `raices.css` se carga después de `style.css` y reemplaza el
  amarillo de TraveLand (`#EEC41E`) por océano, bosque, tierra y sol. Para cambiar la paleta,
  edita las variables `:root` al inicio de `raices.css`.
- **De una página a un sitio completo:** TraveLand es de una sola página. El menú se pasó a
  enlaces entre páginas con submenús (Investigación, Participa, Actualidad), y cada página interna
  usa una cabecera `.page_banner` con la misma esquina redondeada del hero original.
- **Componentes reutilizados:** hero (`single_slider`), bloque "About" con contadores, tarjetas de
  servicio, blog, testimonios, formulario de contacto y pie de TraveLand.
- **Componentes nuevos:** tarjeta (`.tarjeta`), peligro (`.peligro`), evento con fecha, persona,
  recurso, ficha lateral, línea de tiempo, pasos, filtros, etiquetas, banner de alerta y aviso.
- **Menú y pie en un solo archivo:** editar `assets/js/layout.js` actualiza las 19 páginas.
- **Filtros:** `<div class="filtros" data-filtra="#lista">` + elementos con `data-categoria`.
- **Formularios:** `data-toast="mensaje"` muestra una confirmación (todavía no envían a ningún servidor).
- **Alerta climática:** añadir `data-alerta="aviso"` o `data-alerta="critica"` al `<body>`.
- **Accesibilidad:** enlace "Saltar al contenido", foco visible, textos con contraste AA
  (el gris original de TraveLand no lo cumplía) y respeto a `prefers-reduced-motion`.

## Licencia de TraveLand (versión gratuita)

- Uso personal o no comercial: permitido.
- **El crédito del pie ("Designed and Developed by UIdeck · Distributed by ThemeWagon") no se puede quitar.**
  Está en `assets/js/layout.js`, marcado con un comentario.
- Para quitar el crédito o usarlo comercialmente hay que comprar la versión completa.

## Ver el sitio localmente

```powershell
python -m http.server 5511 --directory "D:\ClaudeLand\01-Desarrollo-Web\Raices_Page_Traveland"
```

Luego abre http://localhost:5511

## Pendiente

- Contenido real, fotos de Puerto Rico y del equipo, logo definitivo
  (la foto del hero es la de TraveLand, provisional)
- Versión en inglés (el selector ES/EN es visual)
- Envío real de formularios
