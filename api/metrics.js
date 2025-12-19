import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { startDate, endDate } = req.query;
    
    if (!supabase) {
      return res.json({ abandonment: {}, answers: {}, sessions: {}, error: 'Supabase not configured' });
    }

    let queryAbandon = supabase.from('abandonment').select('*');
    let queryAnswers = supabase.from('quiz_answers').select('*');
    let querySessions = supabase.from('sessions').select('*');
    
    if (startDate) {
      queryAbandon = queryAbandon.gte('timestamp', new Date(startDate).toISOString());
      queryAnswers = queryAnswers.gte('timestamp', new Date(startDate).toISOString());
      querySessions = querySessions.gte('created_at', new Date(startDate).toISOString());
    }
    
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      queryAbandon = queryAbandon.lte('timestamp', end.toISOString());
      queryAnswers = queryAnswers.lte('timestamp', end.toISOString());
      querySessions = querySessions.lte('created_at', end.toISOString());
    }
    
    const [abandonmentData, answersData, sessionsData] = await Promise.all([
      queryAbandon,
      queryAnswers,
      querySessions
    ]);
    
    if (abandonmentData.error || answersData.error || sessionsData.error) {
      throw abandonmentData.error || answersData.error || sessionsData.error;
    }
    
    const abandonment = {};
    const answers = {};
    const sessions = {
      total: 0,
      completed: 0,
      abandoned: 0,
      active: 0
    };
    
    for (let i = 1; i <= 17; i++) {
      abandonment[i] = 0;
    }
    
    // Count sessions by status
    sessions.total = sessionsData.data.length;
    sessionsData.data.forEach(session => {
      if (session.status === 'completed') sessions.completed++;
      else if (session.status === 'abandoned') sessions.abandoned++;
      else if (session.status === 'active') sessions.active++;
    });

    // Count abandonment by step (only from abandoned sessions)
    abandonmentData.data.forEach(row => {
      abandonment[row.step] = (abandonment[row.step] || 0) + 1;
    });
    
    // Count answers by step
    answersData.data.forEach(row => {
      if (!answers[row.step]) answers[row.step] = {};
      answers[row.step][row.answer] = (answers[row.step][row.answer] || 0) + 1;
    });
    
    res.status(200).json({ 
      abandonment, 
      answers,
      sessions,
      totalSessions: sessions.total,
      completedSessions: sessions.completed,
      abandonedSessions: sessions.abandoned
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
