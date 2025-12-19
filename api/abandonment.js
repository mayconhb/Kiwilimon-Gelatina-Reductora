import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// POST /api/abandonment
app.post('/', async (req, res) => {
  try {
    const { step, sessionId } = req.body;
    const now = new Date();
    
    if (supabase) {
      const { error } = await supabase.from('abandonment').insert({
        step,
        session_id: sessionId,
        timestamp: now.toISOString()
      });
      
      if (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
