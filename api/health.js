import express from 'express';

const app = express();

app.get('/', (req, res) => {
  const supabaseConfigured = !!(process.env.SUPABASE_URL && process.env.SUPABASE_KEY);
  res.json({ status: 'ok', supabaseConfigured });
});

export default app;
