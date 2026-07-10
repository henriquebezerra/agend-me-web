# agend-me-web

Plataforma de agendamento inteligente construída com **Next.js 16**, **React 19**, **TypeScript** e **Tailwind CSS 4**.

## Stack

| Tecnologia | Versão |
|---|---|
| Next.js (App Router) | 16.x |
| React | 19.x |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| Zustand | 5.x |
| Axios | 1.x |
| Zod | 4.x |
| React Hook Form | 7.x |
| Lucide React | ícones |
| date-fns | datas |

## Começando

Copie o arquivo de variáveis de ambiente e configure os valores:

```bash
cp .env.example .env.local
```

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts disponíveis

```bash
npm run dev         # Servidor de desenvolvimento
npm run build       # Build de produção
npm run start       # Servidor de produção
npm run lint        # Verificar erros de lint
npm run lint:fix    # Corrigir erros de lint automaticamente
npm run type-check  # Verificar tipos TypeScript
npm run format      # Formatar código com Prettier
```

## Estrutura do Projeto

```
src/
├── app/                  # App Router — rotas e layouts
│   ├── (auth)/           # Route group: login, registro
│   └── (dashboard)/      # Route group: painel principal
├── components/
│   ├── ui/               # Design system: Button, Input, Card...
│   ├── forms/            # Componentes de formulário
│   └── layout/           # Header, Sidebar
├── features/             # Módulos por domínio (Feature-Sliced Design)
│   ├── appointments/
│   ├── clients/
│   └── scheduling/
├── hooks/                # Custom hooks globais
├── lib/                  # Axios, utils, validações Zod
├── services/             # Camada de serviços (chamadas de API)
├── store/                # Estado global com Zustand
├── types/                # Interfaces e types TypeScript
├── constants/            # Constantes da aplicação
└── proxy.ts              # Proteção de rotas (Next.js 16)
```

## Deploy

O deploy recomendado é na [Vercel](https://vercel.com). Configure as variáveis de ambiente do `.env.example` no painel da Vercel antes de fazer o deploy.
