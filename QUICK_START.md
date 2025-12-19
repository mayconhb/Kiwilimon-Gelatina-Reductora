# ⚡ Quick Start - Vercel + Supabase

## 3 Passos Rápidos (10 minutos)

### 1️⃣ Supabase (5 min)
```
1. Abra https://supabase.com
2. Clique "New Project"
3. Copie tudo do arquivo supabase.sql
4. Cole no SQL Editor do Supabase
5. Clique "RUN"
6. Vá em Settings > API
7. Copie:
   - Project URL → SUPABASE_URL
   - anon public key → SUPABASE_KEY
```

### 2️⃣ Vercel (3 min)
```
1. Push código para GitHub
2. Abra https://vercel.com
3. Clique "Import Project"
4. Selecione seu repositório
5. Vá em "Environment Variables"
6. Adicione:
   SUPABASE_URL = [copie do passo 1]
   SUPABASE_KEY = [copie do passo 1]
7. Clique "Deploy"
```

### 3️⃣ Testar (2 min)
```
1. Abra: https://seu-dominio.vercel.app
2. Clique "Empezar Quiz"
3. Complete algumas perguntas
4. Vá para: https://seu-dominio.vercel.app/dashboard.html
5. Filtre por "Hoy"
6. Veja seus dados! 📊
```

## 🎯 Links Importantes

| Item | URL |
|------|-----|
| **Landing Page** | `https://seu-dominio.vercel.app` |
| **Dashboard** | `https://seu-dominio.vercel.app/dashboard.html` |
| **API Docs** | Veja README.md |
| **Supabase** | https://supabase.com |
| **Vercel** | https://vercel.com |

## ✨ Dashboard Features

- **Filtros**: Hoje, Ontem, 7 dias, 30 dias, Personalizado
- **Timezone**: Brasília (UTC-3) automático
- **Gráficos**: Abandono por etapa em tempo real
- **Analytics**: Top 3 respostas por pergunta
- **Atualização**: A cada 10 segundos

## 🐛 Se algo não funcionar

1. **Verifique variáveis**: Confirme SUPABASE_URL e SUPABASE_KEY no Vercel
2. **Re-deploy**: Forçar rebuild no Vercel
3. **Aguarde**: Às vezes leva 1-2 minutos
4. **Veja logs**: Console do navegador (F12) mostra erros

## 📚 Documentação

- `DEPLOY_INSTRUCTIONS.md` - Passo-a-passo visual completo
- `README.md` - Referência técnica
- `replit.md` - Documentação detalhada
- `supabase.sql` - Schema do banco

## 🚀 Pronto!

Tudo está configurado. Segue os 3 passos acima e seu dashboard funcionará em tempo real!

---

*Tempo estimado: 10 minutos*
