-- Criar tabela de abandono
CREATE TABLE abandonment (
  id bigint primary key generated always as identity,
  step integer not null,
  session_id text not null,
  timestamp timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Criar tabela de respostas
CREATE TABLE quiz_answers (
  id bigint primary key generated always as identity,
  step integer not null,
  answer text not null,
  session_id text not null,
  timestamp timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Criar índices para performance
CREATE INDEX idx_abandonment_timestamp ON abandonment(timestamp);
CREATE INDEX idx_abandonment_step ON abandonment(step);
CREATE INDEX idx_abandonment_session ON abandonment(session_id);

CREATE INDEX idx_quiz_answers_timestamp ON quiz_answers(timestamp);
CREATE INDEX idx_quiz_answers_step ON quiz_answers(step);
CREATE INDEX idx_quiz_answers_session ON quiz_answers(session_id);

-- Enable RLS se necessário
ALTER TABLE abandonment ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

-- Criar policies para acesso público (somente leitura do backend)
CREATE POLICY "Allow inserts from API" ON abandonment
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow reads" ON abandonment
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow inserts from API" ON quiz_answers
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow reads" ON quiz_answers
  FOR SELECT 
  USING (true);
