const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuração Supabase (opcional - comentado para prototipagem)
// const { createClient } = require('@supabase/supabase-js');
// const supabaseUrl = process.env.SUPABASE_URL || '';
// const supabaseKey = process.env.SUPABASE_KEY || '';
// const supabase = createClient(supabaseUrl, supabaseKey);

// Armazenar métricas em memória (para prototipagem)
const metrics = {
  abandonment: {},
  answers: {}
};

// Inicializar contadores de abandono para cada etapa
for (let i = 1; i <= 17; i++) {
  metrics.abandonment[i] = 0;
}

// Endpoint: Registrar evento de abandono
app.post('/api/abandonment', async (req, res) => {
  try {
    const { step, sessionId } = req.body;
    
    // if (supabaseUrl && supabaseKey) {
    //   await supabase.from('abandonment').insert({
    //     step,
    //     session_id: sessionId,
    //     timestamp: new Date()
    //   });
    // }
    
    metrics.abandonment[step] = (metrics.abandonment[step] || 0) + 1;
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
    
    // if (supabaseUrl && supabaseKey) {
    //   await supabase.from('quiz_answers').insert({
    //     step,
    //     answer,
    //     session_id: sessionId,
    //     timestamp: new Date()
    //   });
    // }
    
    if (!metrics.answers[step]) metrics.answers[step] = {};
    metrics.answers[step][answer] = (metrics.answers[step][answer] || 0) + 1;
    console.log(`Answer recorded - Step: ${step}, Answer: ${answer}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error logging answer:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Obter métricas
app.get('/api/metrics', async (req, res) => {
  try {
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server rodando em http://0.0.0.0:${PORT}`);
});
