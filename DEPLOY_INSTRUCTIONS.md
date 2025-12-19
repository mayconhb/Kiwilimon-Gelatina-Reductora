# 🚀 Instruções de Deploy - Vercel + Supabase

## Passo 1: Preparar Supabase

### 1.1 Criar projeto Supabase
1. Acesse https://supabase.com
2. Clique em "New Project"
3. Preencha dados do projeto
4. Aguarde criação

### 1.2 Criar as tabelas
1. Abra o editor SQL do Supabase
2. Copie e cole todo conteúdo de `supabase.sql`
3. Execute o script (botão "RUN")

### 1.3 Obter credenciais
1. Vá em Settings > API
2. Copie "Project URL" (ex: `https://abcdef.supabase.co`)
3. Copie "anon public" key (a chave de 50+ caracteres)

## Passo 2: Preparar Vercel

### 2.1 Conectar repositório
1. Acesse https://vercel.com
2. Clique "Import Project"
3. Selecione seu repositório GitHub
4. Clique "Import"

### 2.2 Configurar variáveis de ambiente
1. Na página do projeto no Vercel, vá em "Settings"
2. Clique em "Environment Variables"
3. Adicione duas variáveis:

| Nome | Valor |
|------|-------|
| `SUPABASE_URL` | Cole aqui a URL do passo 1.3 |
| `SUPABASE_KEY` | Cole aqui a chave do passo 1.3 |

4. Clique "Save"

### 2.3 Deploy
1. O deploy inicia automaticamente
2. Aguarde a mensagem "Deployment successful"
3. Clique em "Visit" para acessar o site

## Passo 3: Acessar Dashboard

### Dashboard URL
```
https://seu-dominio-vercel.com/dashboard.html
```

### Funcionalidades
- ✅ Filtros: Hoje, Ontem, 7 dias, 30 dias, Personalizado
- ✅ Horário: Brasil (Brasília - UTC-3)
- ✅ Gráficos em tempo real
- ✅ Abandonos por etapa
- ✅ Respostas mais frequentes

## Passo 4: Monitoramento

### Verificar se tudo está funcionando
1. Acesse a página principal: `https://seu-dominio-vercel.com`
2. Clique "Empezar Quiz"
3. Responda algumas questões
4. Acesse o dashboard
5. Filtre por "Hoy" para ver seus dados

### Logs do backend
No Vercel, você pode ver logs em:
1. Settings > Functions
2. Veja outputs em tempo real

## Troubleshooting

### Dashboard não carrega
- Verifique se Supabase URL e KEY estão corretos
- Verifique que `supabase.sql` foi executado
- Veja console do navegador (F12) para mensagens de erro

### Dados não aparecem
- Passe pelo quiz completamente
- Aguarde 10 segundos para atualização automática
- Verifique filtro de data está em "Hoy"

### Erro "Supabase not configured"
- Confirme variáveis de ambiente no Vercel
- Aguarde rebuild automático (1-2 minutos)
- Forçar rebuild: Settings > Deployments > Redeploy

## Dúvidas?

Se precisar, consulte:
- 📚 Replit.md - Documentação técnica completa
- 🔧 .env.example - Variáveis necessárias
- 📊 dashboard.html - Código do dashboard com comentários
