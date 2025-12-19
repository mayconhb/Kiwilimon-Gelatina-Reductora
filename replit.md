# Kiwilimón Clone - Replit.md

## Overview

This is a static marketing landing page for a "Gelatina Reductora" (weight-loss gelatin) recipe promotion. The application presents an interactive quiz-style experience that guides users through a multi-step funnel before directing them to a Hotmart payment page. The page mimics the style of Kiwilimón, a popular Spanish-language recipe website.

**NEW (Dezembro 2025)**: Dashboard de Métricas con Supabase integrado, filtros de fecha y horario de Brasilia.

## User Preferences

Preferred communication style: Simple, everyday language. Deployed on Vercel + Supabase. Dashboard in Brazil timezone (America/Sao_Paulo).

## System Architecture

### Frontend Architecture

- **Technology**: Vanilla HTML5, CSS3, and JavaScript (no frameworks)
- **Styling**: Tailwind CSS (via CDN) and custom CSS with inline critical CSS
- **State Management**: Object-based state tracking with session ID and analytics
- **Hosted**: Static files served by Vercel

### Backend Architecture (Express.js + Supabase)

- **Technology**: Node.js Express.js with CORS support
- **Database**: Supabase PostgreSQL
- **Purpose**: Collect user analytics and serve data to dashboard
- **Timezone**: All timestamps stored in UTC, converted to Brasilia (America/Sao_Paulo) in dashboard
- **API Endpoints**:
  - `POST /api/answer` - Record quiz answers
  - `POST /api/abandonment` - Track user abandonment at each stage
  - `GET /api/metrics?startDate=ISO&endDate=ISO` - Retrieve filtered metrics
  - `GET /api/health` - Health check

### Dashboard Features

- **Location**: `/dashboard.html`
- **Date Filters**: Today, Yesterday, Last 7 days, Last 30 days, Custom range
- **Timezone**: All dates displayed in Brasilia time (UTC-3/UTC-2)
- **Metrics Shown**:
  - Abandonment by stage with percentages
  - Top 3 answers per quiz question
  - Total visitors and completion rate
  - Real-time updates every 10 seconds

## Deployment Configuration

### Vercel Deployment

1. **Connect Repository**: Push to GitHub and deploy via Vercel
2. **Environment Variables**: Set in Vercel dashboard:
   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_KEY` - Your Supabase anon public key
   - `NODE_ENV` - Set to "production"

3. **Build Settings**:
   - Build Command: `npm install`
   - Output Directory: `.` (root)
   - Install Command: `npm install`

4. **Frontend** is served as static files
5. **Backend API** runs as Node.js serverless functions

### Supabase Setup

1. **Create Project** at https://supabase.com
2. **Run SQL Migration**:
   - Open Supabase SQL Editor
   - Copy and run contents of `supabase.sql`
   - Creates `abandonment` and `quiz_answers` tables
3. **Get Credentials**:
   - Go to Settings > API
   - Copy "Project URL" → `SUPABASE_URL`
   - Copy "anon public" key → `SUPABASE_KEY`

### Local Development

```bash
# Install dependencies
npm install

# Start frontend (port 5000)
npm start

# In another terminal, start backend (port 3000)
npm run server

# Set environment variables
export SUPABASE_URL=your-url
export SUPABASE_KEY=your-key

# Dashboard accessible at http://localhost:5000/dashboard.html
```

## Key Features

### Analytics Tracking

- **Session ID**: Unique identifier for each user
- **Timestamp**: All events timestamped in UTC
- **Answer Recording**: Tracks which quiz option user selected
- **Abandonment Tracking**: Records which step user abandoned

### Dashboard Analytics

- **Date Filtering**: Query data by custom date ranges
- **Timezone Conversion**: All dates shown in Brazil time
- **Performance Metrics**: 
  - Abandonment rate per stage
  - Most popular answers per question
  - Completion funnel analysis

## Project Structure

```
.
├── index.html              # Main landing page
├── dashboard.html          # Analytics dashboard
├── server.js              # Express backend + Supabase
├── supabase.sql           # Database schema
├── .env.example           # Environment variables template
├── vercel.json            # Vercel deployment config
├── assets/
│   ├── script.js          # Frontend logic with analytics
│   ├── style.css          # Custom styles
│   └── media/             # Product images (WebP)
├── package.json           # Dependencies
└── replit.md             # This file
```

## Environment Variables

Required for production:
- `SUPABASE_URL` - Supabase project URL (starts with https://)
- `SUPABASE_KEY` - Supabase anon public key
- `NODE_ENV` - Set to "production" on Vercel

See `.env.example` for template.

## Performance Optimizations

- Lazy loading for images below fold
- Critical CSS inlined for fast initial render
- Preconnect/DNS-prefetch for external resources
- All images in WebP format
- Deferred script loading to avoid blocking render

## Database Schema

### abandonment table
- `id` - Primary key
- `step` - Quiz step where user abandoned (1-17)
- `session_id` - Unique session identifier
- `timestamp` - When abandonment occurred (UTC)
- `created_at` - Record creation time

### quiz_answers table
- `id` - Primary key
- `step` - Quiz step number
- `answer` - User's selected answer text
- `session_id` - Unique session identifier
- `timestamp` - When answer was recorded (UTC)
- `created_at` - Record creation time

Both tables have indexes on `timestamp`, `step`, and `session_id` for performance.

## Troubleshooting

### Dashboard shows "Sin datos disponibles"
- Check that Supabase credentials are correctly set
- Verify tables exist in Supabase
- Ensure API is returning data: `curl https://your-domain/api/health`

### Timestamps not in Brasilia timezone
- Dashboard automatically converts UTC to America/Sao_Paulo
- Check browser timezone settings
- All calculations done client-side in JavaScript

### API errors on Vercel
- Verify environment variables are set in Vercel dashboard
- Check Vercel function logs in deployment
- Ensure Supabase URL and key are correct
- Test locally with `npm run server` first
