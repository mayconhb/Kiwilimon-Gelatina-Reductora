# Kiwilimón Clone - Replit.md

## Overview

This is a static marketing landing page for a "Gelatina Reductora" (weight-loss gelatin) recipe promotion. The application presents an interactive quiz-style experience that guides users through a multi-step funnel before directing them to a Hotmart payment page. The page mimics the style of Kiwilimón, a popular Spanish-language recipe website.

The project is a pure frontend static site with no backend - it uses vanilla HTML, CSS, and JavaScript served via the `serve` package for local development.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Technology**: Vanilla HTML5, CSS3, and JavaScript (no frameworks)
- **Styling**: Combination of Tailwind CSS (via CDN) and custom CSS with inline critical CSS for fast initial render
- **JavaScript Pattern**: Single IIFE (Immediately Invoked Function Expression) with state management object for quiz progression
- **State Management**: Simple object-based state tracking quiz steps, slider values, and selected benefits

### Application Flow

1. Static landing page with recipe content and social proof (comments)
2. Interactive quiz with 17 steps guiding users through questions
3. Final redirect to Hotmart payment gateway

### Performance Optimizations (Atualizado Dez 2025)

- **Critical CSS inlined** - Estilos essenciais inline para renderização imediata
- **Preconnect/DNS-prefetch** - Conexões antecipadas para Hotmart, fonts, CDNs
- **Preload da imagem principal** - Hero image com fetchpriority="high"
- **Lazy loading** - Todas as imagens abaixo do fold com loading="lazy" e decoding="async"
- **Fontes otimizadas** - display=swap para evitar FOIT (Flash of Invisible Text)
- **GTM delayed** - Carregamento do GTM adiado para após interação ou 3 segundos
- **Scripts deferred** - script.js com defer para não bloquear render
- **Todas imagens em WebP** - Formato otimizado para web

### Build & Deployment

- **Development Server**: `serve` package serving static files on port 5000
- **Deployment**: Configured for Vercel with no build step (static output)
- **No bundling or transpilation** - direct browser-ready code

## External Dependencies

### Runtime Dependencies

| Dependency | Purpose |
|------------|---------|
| `serve` | Static file server for local development |

### External Services & CDNs

| Service | Purpose |
|---------|---------|
| Hotmart (`pay.hotmart.com`) | Payment processing gateway |
| Tailwind CSS CDN | Utility-first CSS framework |
| Google Fonts | Open Sans typography |
| ConverteAI (`scripts.converteai.net`) | Tracking/conversion scripts |
| PureLife News (`escala.purelifenews.com`) | Additional tracking |

### Asset Structure

- `/assets/media/` - Images (WebP format)
- `/assets/script.js` - Main application logic
- `/assets/style.css` - Custom styles and range input styling