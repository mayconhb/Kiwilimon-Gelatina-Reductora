# 🥗 Kiwilimón - Gelatina Reductora

## 📊 Dashboard Analytics com Supabase

Sistema completo de rastreamento de quiz com dashboard em tempo real, filtros de data e horário em padrão brasileiro (Brasília).

### ✨ Funcionalidades

- **Dashboard Completo**: Visualize métricas de abandono e respostas
- **Filtros Inteligentes**: Hoje, Ontem, 7 dias, 30 dias, Personalizado
- **Horário Brasil**: Todos os dados em horário de Brasília (UTC-3)
- **Supabase**: Banco de dados PostgreSQL gerenciado
- **Vercel**: Deploy automático de Frontend + Backend

### 📋 Tabela de Conteúdo

- [Começar Rápido](#-começar-rápido)
- [Deploy Vercel](#-deploy-vercel)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [API Reference](#-api-reference)
- [Estrutura do Projeto](#-estrutura-do-projeto)

## 🚀 Começar Rápido

### Local Development

```bash
# Instalar dependências
npm install

# Terminal 1: Frontend (port 5000)
npm start

# Terminal 2: Backend (port 3000)
npm run server

# Abrir navegador
http://localhost:5000/dashboard.html
```

### Variáveis de Ambiente

Crie um arquivo `.env`:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-anon-publica
NODE_ENV=development
```

## 🔧 Deploy Vercel

### Passo 1: Supabase Setup

1. Criar projeto em [supabase.com](https://supabase.com)
2. Abrir SQL Editor
3. Copiar e executar `supabase.sql`
4. Copiar credenciais em Settings > API

### Passo 2: Vercel Deployment

1. Conectar repositório GitHub ao Vercel
2. Adicionar variáveis em Settings > Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
3. Deploy automático ✨

### Passo 3: Acessar Dashboard

```
https://seu-dominio.vercel.app/dashboard.html
```

## 📊 Dashboard Features

### Métricas Disponíveis

| Métrica | Descrição |
|---------|-----------|
| Total Visitantes | Quantidade de sessões iniciadas |
| Taxa Abandono | Porcentagem de usuários que abandonaram |
| Taxa Conclusão | Porcentagem que chegou na etapa 17 |
| Abandono/Etapa | Detalhado por cada etapa do quiz |
| Respostas Top 3 | Alternativas mais frequentes por pergunta |

### Filtros de Data

- **Hoje**: Dados de 00:00 até agora (Brasília)
- **Ontem**: Dados do dia anterior (Brasília)
- **7 Dias**: Últimos 7 dias completos
- **30 Dias**: Últimos 30 dias completos
- **Personalizado**: Selecione intervalo específico

## 📡 API Reference

### POST /api/answer
Registra resposta do quiz

```json
{
  "step": 1,
  "answer": "Até 5 kg",
  "sessionId": "session_1234567890_abc123def"
}
```

### POST /api/abandonment
Registra abandono do usuário

```json
{
  "step": 5,
  "sessionId": "session_1234567890_abc123def"
}
```

### GET /api/metrics
Retorna métricas agregadas

**Query Parameters:**
- `startDate` - ISO date string (filtro opcional)
- `endDate` - ISO date string (filtro opcional)

**Response:**
```json
{
  "abandonment": {
    "1": 5,
    "2": 3,
    ...
  },
  "answers": {
    "1": {
      "Até 5 kg": 10,
      "De 6 a 10 kg": 8,
      ...
    },
    ...
  }
}
```

### GET /api/health
Health check do servidor

```json
{
  "status": "ok",
  "supabaseConfigured": true
}
```

## 📁 Estrutura do Projeto

```
.
├── index.html                  # Landing page principal
├── dashboard.html              # Dashboard analytics
├── server.js                   # Backend Express + Supabase
├── supabase.sql               # Schema do banco de dados
├── assets/
│   ├── script.js              # Frontend logic
│   ├── style.css              # CSS customizado
│   └── media/                 # Imagens WebP
├── package.json               # Dependências
├── vercel.json                # Config Vercel
├── .env.example               # Template variáveis
├── replit.md                  # Documentação técnica
├── DEPLOY_INSTRUCTIONS.md     # Passo-a-passo deploy
└── README.md                  # Este arquivo
```

## 🔐 Segurança

### Best Practices Implementadas

- ✅ Variables de ambiente para credenciais
- ✅ CORS configurado corretamente
- ✅ RLS (Row Level Security) no Supabase
- ✅ Sem exposição de chaves privadas
- ✅ Timestamps em UTC (padrão internacional)

### O que NÃO fazer

❌ Expor `SUPABASE_KEY` no código  
❌ Usar chaves em repositório  
❌ Compartilhar variáveis de ambiente  
❌ Fazer queries diretas ao banco frontend  

## 📊 Análise de Dados

### Métricas Importantes

1. **Taxa de Abandono por Etapa**
   - Identifique gargalos no quiz
   - Otimize perguntas com alto abandono

2. **Respostas Mais Frequentes**
   - Entenda preferências do público
   - Personalize conteúdo baseado em dados

3. **Funnel Analysis**
   - Acompanhe taxa de conclusão
   - Melhore conversão para próximo passo

## 🐛 Troubleshooting

### Dashboard não carrega
```bash
# 1. Verifique conexão Supabase
curl https://seu-dominio/api/health

# 2. Confirme variáveis de ambiente
echo $SUPABASE_URL

# 3. Veja logs do navegador (F12)
```

### Dados não aparecem
- Aguarde 10 segundos para atualização
- Confirme que você completou o quiz
- Verifique filtro de data está em "Hoy"

### Erro "Supabase not configured"
- Confirme `SUPABASE_URL` e `SUPABASE_KEY` estão set
- Re-deploy no Vercel
- Aguarde build completar (1-2 minutos)

## 📝 Documentação

- **replit.md** - Documentação técnica completa
- **DEPLOY_INSTRUCTIONS.md** - Passo-a-passo visual
- **supabase.sql** - Schema comentado do banco

## 📬 Suporte

Veja DEPLOY_INSTRUCTIONS.md para step-by-step completo.

---

**Made with ❤️ for conversion optimization**
