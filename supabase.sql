-- Criar tabela de sessões para controlar estado do quiz
CREATE TABLE sessions (
  id bigint primary key generated always as identity,
  session_id text unique not null,
  status text default 'active' check (status in ('active', 'completed', 'abandoned')),
  highest_step integer default 1,
  started_at timestamp with time zone default now(),
  completed_at timestamp with time zone,
  abandoned_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Criar tabela de abandono (mantém histórico de quando abandou)
CREATE TABLE abandonment (
  id bigint primary key generated always as identity,
  step integer not null,
  session_id text not null references sessions(session_id),
  timestamp timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Criar tabela de respostas
CREATE TABLE quiz_answers (
  id bigint primary key generated always as identity,
  step integer not null,
  answer text not null,
  session_id text not null references sessions(session_id),
  timestamp timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Criar índices para performance
CREATE INDEX idx_sessions_session_id ON sessions(session_id);
CREATE INDEX idx_sessions_status ON sessions(status);
CREATE INDEX idx_sessions_created_at ON sessions(created_at);

CREATE INDEX idx_abandonment_timestamp ON abandonment(timestamp);
CREATE INDEX idx_abandonment_step ON abandonment(step);
CREATE INDEX idx_abandonment_session ON abandonment(session_id);

CREATE INDEX idx_quiz_answers_timestamp ON quiz_answers(timestamp);
CREATE INDEX idx_quiz_answers_step ON quiz_answers(step);
CREATE INDEX idx_quiz_answers_session ON quiz_answers(session_id);

-- Enable RLS
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE abandonment ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

-- Criar policies para acesso público
CREATE POLICY "Allow inserts sessions from API" ON sessions
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow updates sessions from API" ON sessions
  FOR UPDATE 
  WITH CHECK (true);

CREATE POLICY "Allow reads sessions" ON sessions
  FOR SELECT 
  USING (true);

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
