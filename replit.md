# Kiwilimón Clone - Replit.md

## Overview

This is a static marketing landing page for a "Gelatina Reductora" (weight-loss gelatin) recipe promotion. The application presents an interactive quiz-style experience that guides users through a multi-step funnel before directing them to a Hotmart payment page. The page mimics the style of Kiwilimón, a popular Spanish-language recipe website.

**NEW (Dezembro 2025)**: Dashboard de Métricas adicionado para análise de abandono por etapa e respostas mais frequentes do quiz.

## User Preferences

Preferred communication style: Simple, everyday language. Portuguese/Spanish multilingual support preferred.

## System Architecture

### Frontend Architecture

- **Technology**: Vanilla HTML5, CSS3, and JavaScript (no frameworks)
- **Styling**: Combination of Tailwind CSS (via CDN) and custom CSS with inline critical CSS
- **JavaScript Pattern**: Single IIFE with state management for quiz progression
- **State Management**: Object-based state tracking with session ID and analytics

### Backend Architecture (NEW)

- **Technology**: Express.js with CORS support
- **Purpose**: Collect and aggregate user analytics data
- **Storage**: In-memory storage (ready for Supabase integration)
- **API Endpoints**:
  - `POST /api/answer` - Record quiz answers
  - `POST /api/abandonment` - Track user abandonment at each stage
  - `GET /api/metrics` - Retrieve aggregated metrics

### Dashboard (NEW)

- **Location**: `/dashboard.html`
- **Purpose**: Visualize quiz completion rates, abandonment by stage, and most popular answers
- **Features**:
  - Real-time metrics updates (every 10 seconds)
  - Abandonment rate by stage with percentages
  - Top 3 answers per question
  - Visual charts using Chart.js
  - Responsive design

### Application Flow

1. Static landing page with recipe content and social proof
2. Interactive quiz with 17 steps guiding users through questions
3. Quiz events tracked in real-time via backend API
4. Final redirect to Hotmart payment gateway
5. Dashboard accessible at `/dashboard.html` for analytics review

## Recent Changes (Dezembro 2025)

1. **Backend Server**: Added Express.js server (`server.js`) to collect analytics
2. **Analytics Tracking**: Modified `assets/script.js` to track:
   - User session IDs
   - Quiz answers with step context
   - Abandonment tracking at each stage
3. **Dashboard**: Created comprehensive dashboard showing:
   - Total visitors and completion rates
   - Abandonment percentage by stage with descriptions
   - Most popular answers for each quiz question
4. **Workflows**: Configured two parallel workflows:
   - Frontend: `serve -s . -l 5000` on port 5000
   - Backend: `node server.js` on port 3000

## Deployment & Development

### Development Workflows

| Workflow | Command | Port | Output |
|----------|---------|------|--------|
| Frontend Dev | `serve -s . -l 5000` | 5000 | webview |
| Backend Analytics | `node server.js` | 3000 | console |

### Performance Optimizations

- **Critical CSS inlined** - Estilos essenciais inline para renderização imediata
- **Preconnect/DNS-prefetch** - Conexões antecipadas para Hotmart, fonts, CDNs
- **Lazy loading** - Todas as imagens abaixo do fold com loading="lazy"
- **Fontes otimizadas** - display=swap para evitar FOIT
- **Scripts deferred** - script.js com defer para não bloquear render

## External Dependencies

### Runtime Dependencies

| Dependency | Purpose | Version |
|------------|---------|---------|
| `serve` | Static file server | ^14.2.5 |
| `express` | API backend | ^5.2.1 |
| `cors` | CORS middleware | ^2.8.5 |
| `@supabase/supabase-js` | Database (optional) | ^2.89.0 |

### External Services & CDNs

| Service | Purpose |
|---------|---------|
| Hotmart | Payment processing |
| Tailwind CSS CDN | CSS framework |
| Google Fonts | Typography |
| Chart.js CDN | Dashboard charts |

## Project Structure

```
.
├── index.html              # Main landing page
├── dashboard.html          # Analytics dashboard (NEW)
├── server.js              # Express backend API (NEW)
├── assets/
│   ├── script.js          # Frontend logic with analytics
│   ├── style.css          # Custom styles
│   └── media/             # Product images (WebP format)
├── package.json           # Dependencies
└── replit.md             # This file
```

## Next Steps for Supabase Integration

To enable persistent data storage with Supabase:

1. Create Supabase tables:
   - `abandonment` (step, session_id, timestamp)
   - `quiz_answers` (step, answer, session_id, timestamp)

2. Set environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`

3. Uncomment Supabase code in `server.js`

## Accessing the Dashboard

- **Local Development**: `http://localhost:5000/dashboard.html`
- **Production**: `https://your-deployed-site.com/dashboard.html`
- **Backend API**: `http://localhost:3000/api/metrics`

The dashboard updates automatically every 10 seconds and displays:
- Total abandonment rate across all stages
- Completion rate (stage 17 reach)
- Stage-by-stage abandonment with percentages
- Most popular answers for each quiz question
