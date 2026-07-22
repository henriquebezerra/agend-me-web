# Task: Toggle manual de tema (light/dark)

## Objetivo

Permitir que o usuário alterne manualmente entre light e dark mode pelo botão `SunMoon` no `FooterDrawer`, sem alterar nenhuma cor existente.

**Comportamento esperado:**
- Por padrão, o app segue o tema do SO (via `prefers-color-scheme`)
- Ao clicar no botão, o tema muda e **persiste** (sobrepõe o SO)
- Ao clicar novamente, volta ao tema oposto
- Se o usuário nunca clicou, o app sempre segue o SO

---

## Passos

### 1. Instalar `next-themes`
```bash
npm install next-themes
```
Gerencia a classe `.dark` no `<html>`, persiste no `localStorage` e evita flash (FOUC) no SSR.

---

### 2. Ajustar `globals.css` — trocar `@media` por classe `.dark`

**Antes:**
```css
@media (prefers-color-scheme: dark) {
  :root { ... }
}
```

**Depois:**
```css
@variant dark (&:where(.dark, .dark *));

.dark {
  --background: hsl(222, 47%, 7%);
  --foreground: hsl(210, 40%, 98%);
  --surface: hsl(222, 47%, 11%);
  --surface-raised: hsl(222, 47%, 15%);
  --border: hsl(217, 33%, 18%);
  --border-strong: hsl(217, 33%, 25%);
}
```

Isso faz as classes `dark:` do Tailwind responderem à classe `.dark` no `<html>` em vez do OS.

---

### 3. Criar `ThemeProvider` em `src/components/providers/ThemeProvider.tsx`

```tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
```

- `attribute="class"` — adiciona/remove `.dark` no `<html>`
- `defaultTheme="system"` — segue o OS quando não há preferência salva
- `enableSystem` — mantém a leitura de `prefers-color-scheme`

---

### 4. Envolver o layout raiz com `ThemeProvider`

Em `src/app/layout.tsx`, adicionar o `ThemeProvider` envolvendo o `I18nProvider`:

```tsx
import { ThemeProvider } from '@/components/providers/ThemeProvider';

// dentro do JSX:
<ThemeProvider>
  <I18nProvider language={language}>{children}</I18nProvider>
</ThemeProvider>
```

---

### 5. Conectar o botão no `FooterDrawer`

```tsx
import { useTheme } from 'next-themes';

const { theme, setTheme, resolvedTheme } = useTheme();

const toggleTheme = () => {
  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
};
```

Usar `resolvedTheme` (não `theme`) porque quando `theme === 'system'` o valor real vem de `resolvedTheme`.

---

## Arquivos alterados

| Arquivo | Alteração |
|---|---|
| `src/app/globals.css` | Trocar `@media` por `.dark {}` + linha `@variant` |
| `src/components/providers/ThemeProvider.tsx` | **NOVO** — wrapper do `next-themes` |
| `src/app/layout.tsx` | Adicionar `<ThemeProvider>` |
| `src/components/layout/FooterDrawer.tsx` | Adicionar `useTheme()` + `onClick` |

## Arquivos NÃO alterados

- Nenhum componente de UI (`Button`, `Card`, `Input`, `IconButton`, etc.)
- Nenhuma cor — apenas a estratégia de aplicação do dark mode
