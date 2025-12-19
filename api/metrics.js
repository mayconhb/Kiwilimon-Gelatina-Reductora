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
      return res.json({ abandonment: {}, answers: {}, error: 'Supabase not configured' });
    }

    let query1 = supabase.from('abandonment').select('*');
    let query2 = supabase.from('quiz_answers').select('*');
    
    if (startDate) {
      query1 = query1.gte('timestamp', new Date(startDate).toISOString());
      query2 = query2.gte('timestamp', new Date(startDate).toISOString());
    }
    
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query1 = query1.lte('timestamp', end.toISOString());
      query2 = query2.lte('timestamp', end.toISOString());
    }
    
    const [abandonmentData, answersData] = await Promise.all([
      query1,
      query2
    ]);
    
    if (abandonmentData.error || answersData.error) {
      throw abandonmentData.error || answersData.error;
    }
    
    const abandonment = {};
    const answers = {};
    
    for (let i = 1; i <= 17; i++) {
      abandonment[i] = 0;
    }
    
    abandonmentData.data.forEach(row => {
      abandonment[row.step] = (abandonment[row.step] || 0) + 1;
    });
    
    answersData.data.forEach(row => {
      if (!answers[row.step]) answers[row.step] = {};
      answers[row.step][row.answer] = (answers[row.step][row.answer] || 0) + 1;
    });
    
    res.status(200).json({ abandonment, answers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
