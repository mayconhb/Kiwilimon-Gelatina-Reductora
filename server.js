const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuração Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Middleware para traduzir data para Brasília
function getBrazilDate(date) {
  return new Date(date.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
}

// Endpoint: Registrar evento de abandono
app.post('/api/abandonment', async (req, res) => {
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
        console.error('Supabase error:', error);
        return res.status(500).json({ error: error.message });
      }
    }
    
    console.log(`Abandonment tracked at step ${step}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error logging abandonment:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Registrar resposta de quiz
app.post('/api/answer', async (req, res) => {
  try {
    const { step, answer, sessionId } = req.body;
    const now = new Date();
    
    if (supabase) {
      const { error } = await supabase.from('quiz_answers').insert({
        step,
        answer,
        session_id: sessionId,
        timestamp: now.toISOString()
      });
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: error.message });
      }
    }
    
    console.log(`Answer recorded - Step: ${step}, Answer: ${answer}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error logging answer:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Obter métricas com filtro de data
app.get('/api/metrics', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!supabase) {
      return res.json({ abandonment: {}, answers: {}, error: 'Supabase not configured' });
    }

    // Converter datas se fornecidas
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
    
    // Processar dados
    const abandonment = {};
    const answers = {};
    
    // Inicializar contadores de abandono
    for (let i = 1; i <= 17; i++) {
      abandonment[i] = 0;
    }
    
    // Contar abandonos
    abandonmentData.data.forEach(row => {
      abandonment[row.step] = (abandonment[row.step] || 0) + 1;
    });
    
    // Contar respostas
    answersData.data.forEach(row => {
      if (!answers[row.step]) answers[row.step] = {};
      answers[row.step][row.answer] = (answers[row.step][row.answer] || 0) + 1;
    });
    
    res.json({ abandonment, answers });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', supabaseConfigured: !!supabase });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Supabase configured: ${!!supabase}`);
});
