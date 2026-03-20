# Design System - Daily Constancy

## Visão Geral

Este documento descreve o sistema de design tokens utilizado no projeto Daily Constancy. Os tokens são definidos como variáveis CSS custom properties no arquivo `src/styles/design-tokens.css` e são usados por todos os componentes do design system (DS).

### Tecnologia

- **Vue 3** com Composition API
- **Quasar v2** Framework UI
- **Tailwind CSS** para utilitários de estilo
- **SCSS** para estilos customizados
- **TypeScript** para tipagem forte

### Princípios

- **Consistência**: Todos os componentes usam os mesmos tokens
- **Manutenibilidade**: Alterações centralizadas em um arquivo
- **Escalabilidade**: Fácil adicionar novos componentes e tokens
- **Dark Mode**: Suporte completo com cores adaptadas
- **Acessibilidade**: Foco visível e contraste adequado

---

## Cores Semânticas

As cores semânticas são usadas para传达 significado e estados específicos na interface.

### Primary

Cor principal da marca. Usada para ações primárias, elementos destacados e navegação ativa.

```css
--primary: #027BE3;
--primary-hover: #025bb0;
--primary-light: #63a4ff;
--primary-dark: #0059b3;
--primary-focus: rgba(2, 123, 227, 0.15);
```

**Uso:**
- Botões de ação principal
- Links ativos
- Elementos de navegação selecionados
- Elementos de destaque

**Dark Mode:**
```css
--primary: #3da1ff;
--primary-hover: #63a4ff;
--primary-light: #4cafff;
--primary-dark: #2d89e6;
```

### Secondary

Cor secundária/acento. Usada para ações alternativas e elementos complementares.

```css
--secondary: #26A69A;
--secondary-hover: #1f8a80;
--secondary-light: #5fd1c4;
--secondary-dark: #1a7a70;
--secondary-focus: rgba(38, 166, 154, 0.15);
```

**Uso:**
- Botões de ação secundária
- Elementos decorativos
- Tags e badges
- Informações complementares

**Dark Mode:**
```css
--secondary: #4fd1c5;
--secondary-hover: #7de3d8;
--secondary-light: #38b6ab;
--secondary-dark: #38b6ab;
```

### Success

Cor para estados positivos e feedback de sucesso.

```css
--success: #21BA45;
--success-hover: #1a8f35;
--success-light: #5cd67e;
--success-dark: #168a32;
--success-focus: rgba(33, 186, 69, 0.15);
```

**Uso:**
- Mensagens de sucesso
- Indicadores de conclusão
- Estados ativos de streaks
- Confirmações

**Dark Mode:**
```css
--success: #48bb78;
--success-hover: #68d391;
--success-light: #9ae6b4;
--success-dark: #38a169;
```

### Danger

Cor para estados negativos, destrutivos e de erro.

```css
--danger: #C10015;
--danger-hover: #990010;
--danger-light: #ff4d5f;
--danger-dark: #8d000f;
--danger-focus: rgba(193, 0, 21, 0.15);
```

**Uso:**
- Botões de deletar/excluir
- Mensagens de erro
- Avisos críticos
- Estados de falha

**Dark Mode:**
```css
--danger: #f56565;
--danger-hover: #fc8181;
--danger-light: #feb2b2;
--danger-dark: #e53e3e;
```

### Warning

Cor para estados de aviso e atenção.

```css
--warning: #F2C037;
--warning-hover: #d6a830;
--warning-light: #f9d76a;
--warning-dark: #d0a62f;
--warning-focus: rgba(242, 192, 55, 0.15);
```

**Uso:**
- Mensagens de aviso
- Estados de atenção
- Requer ação do usuário
- Dados importantes

**Dark Mode:**
```css
--warning: #ecc94b;
--warning-hover: #f6e05e;
--warning-light: #faf089;
--warning-dark: #d69e2e;
```

### Info

Cor para informações e dados neutros.

```css
--info: #31CCEC;
--info-hover: #28b3ce;
--info-light: #73dced;
--info-dark: #2ab0c9;
--info-focus: rgba(49, 204, 236, 0.15);
```

**Uso:**
- Mensagens informativas
- Dados neutros
- Estatísticas
- Tooltips

**Dark Mode:**
```css
--info: #63b3ed;
--info-hover: #90cdf4;
--info-light: #bee3f8;
--info-dark: #4299e1;
```

---

## Cores de Fundo e Texto

### Background Colors

```css
--bg-primary: #FFFFFF;      /* Fundo principal */
--bg-secondary: #F5F7FA;    /* Fundo secundário */
--bg-tertiary: #F0F2F5;     /* Fundo terciário */
```

**Dark Mode:**
```css
--bg-primary: #181a1b;
--bg-secondary: #1F2937;
--bg-tertiary: #2D3748;
```

### Text Colors

```css
--text-primary: #1F2937;    /* Texto principal */
--text-secondary: #6B7280;  /* Texto secundário */
--text-tertiary: #9CA3AF;   /* Texto terciário */
```

**Dark Mode:**
```css
--text-primary: #e8e6e3;
--text-secondary: #9CA3AF;
--text-tertiary: #718096;
```

---

## Border Radius

Sistema de bordas arredondadas para consistência visual.

```css
--radius-xs: 2px;    /* Badges, elementos pequenos */
--radius-sm: 4px;    /* Inputs, cards pequenos */
--radius-md: 8px;    /* Cards padrão, botões */
--radius-lg: 12px;   /* Modais, cards grandes */
--radius-xl: 16px;   /* Containers especiais */
```

### Padrões de Uso

- `radius-xs`: Badges, tags, pequenos indicadores
- `radius-sm`: Inputs, selects, botões pequenos, cards compactos
- `radius-md`: Cards padrão, botões normais, tabelas
- `radius-lg`: Modais, grandes containers, headers
- `radius-xl`: Containers especiais, cards hero

---

## Spacing

Sistema de espaçamento baseado em múltiplos de 4px para consistência.

```css
--space-1: 0.25rem;   /* 4px   - Espaço muito pequeno */
--space-2: 0.5rem;    /* 8px   - Espaço pequeno */
--space-3: 0.75rem;   /* 12px  - Espaço médio-pequeno */
--space-4: 1rem;      /* 16px  - Espaço padrão */
--space-5: 1.25rem;   /* 20px  - Espaço médio-grande */
--space-6: 1.5rem;    /* 24px  - Espaço grande */
--space-8: 2rem;      /* 32px  - Espaço muito grande */
--space-10: 2.5rem;   /* 40px  - Espaço extra grande */
--space-12: 3rem;     /* 48px  - Espaço enorme */
```

### Padrões de Uso

- `space-1`: Entre ícones e texto em elementos pequenos
- `space-2`: Entre itens em listas compactas
- `space-3`: Padding de elementos pequenos
- `space-4`: Padding padrão de cards, inputs
- `space-5`: Padding de botões, seções pequenas
- `space-6`: Padding de modais, grandes containers
- `space-8`: Seções principais, grandes containers
- `space-10`: Hero sections, grandes espaçamentos
- `space-12`: Seções muito grandes, hero completas

---

## Tipografia

### Font Weights

```css
--font-normal: 400;      /* Normal - Texto corpo */
--font-medium: 500;      /* Médio - Texto semi-destaque */
--font-semibold: 600;    /* Semibold - Títulos pequenos */
--font-bold: 700;        /* Bold - Títulos principais */
```

### Text Sizes

```css
--text-xs: 0.75rem;     /* 12px - Caption, labels pequenos */
--text-sm: 0.875rem;    /* 14px - Texto corpo padrão */
--text-base: 1rem;      /* 16px - Texto base */
--text-lg: 1.125rem;    /* 18px - Títulos de cards */
--text-xl: 1.25rem;     /* 20px - Subtítulos */
--text-2xl: 1.5rem;     /* 24px - Títulos de seção */
--text-3xl: 1.875rem;   /* 30px - Títulos de página */
```

### Font Family

```css
font-family: Inter, system-ui, -apple-system, sans-serif;
```

### Padrões de Uso

**Tamanhos:**
- `text-xs`: Captions, badges, tooltips, labels auxiliares
- `text-sm`: Texto de corpo padrão, descrições, metadados
- `text-base`: Texto base, conteúdo principal
- `text-lg`: Títulos de cards, subtítulos de seções
- `text-xl`: Subtítulos, headings de nível médio
- `text-2xl`: Títulos de seção, headings principais
- `text-3xl`: Títulos de página, hero headings

**Pesos:**
- `font-normal`: Texto de corpo, parágrafos, descrições
- `font-medium`: Labels, metadados, textos semi-destacados
- `font-semibold`: Títulos de cards, pequenos headings
- `font-bold`: Títulos principais, headings importantes

---

## Shadows

Sistema de sombras para criar hierarquia e profundidade.

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15);
```

**Dark Mode:**
```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.15);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.35), 0 10px 10px rgba(0, 0, 0, 0.25);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.4);
```

### Padrões de Uso

- `shadow-xs`: Badges, tags, elementos muito pequenos
- `shadow-sm`: Cards pequenos, tooltips, dropdowns
- `shadow-md`: Cards padrão, inputs elevados
- `shadow-lg`: Cards grandes, containers importantes
- `shadow-xl`: Modais, painéis flutuantes
- `shadow-2xl`: Notificações, popups, elementos elevados

---

## Dark Mode

### Ativação

O dark mode é ativado adicionando a classe `body.body--dark` ao elemento `<body>`.

### Implementação

Todos os tokens de cor, texto e sombra têm variantes para dark mode definidas no seletor `body.body--dark` do arquivo `design-tokens.css`.

### Cores Adaptadas

As cores semânticas são mais claras no dark mode para manter contraste adequado:

- **Primary**: De `#027BE3` para `#3da1ff`
- **Secondary**: De `#26A69A` para `#4fd1c5`
- **Success**: De `#21BA45` para `#48bb78`
- **Danger**: De `#C10015` para `#f56565`
- **Warning**: De `#F2C037` para `#ecc94b`
- **Info**: De `#31CCEC` para `#63b3ed`

### Sombras Ajustadas

As sombras no dark mode usam opacidade maior para compensar o fundo escuro:

- Base opacity aumenta de 0.05-0.15 para 0.15-0.4
- Mantém a hierarquia visual adequada

### Exemplo de Uso

```vue
<template>
  <q-btn
    class="theme-toggle"
    @click="toggleDarkMode"
  >
    {{ isDark ? '🌙' : '☀️' }}
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isDark = ref(false);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle('body--dark', isDark.value);
};
</script>
```

---

## Exemplos de Uso

### Usando Tokens CSS

```scss
.my-component {
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  box-shadow: var(--shadow-sm);

  &:hover {
    box-shadow: var(--shadow-md);
  }

  &__title {
    color: var(--text-primary);
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
  }

  &__description {
    color: var(--text-secondary);
    font-size: var(--text-sm);
    margin-top: var(--space-2);
  }
}
```

### Usando com Tailwind

Tailwind está configurado para alinhar com os tokens. Você pode usar classes utilitárias ou combinar com tokens customizados:

```vue
<template>
  <div class="bg-[var(--bg-primary)] p-[var(--space-4)] rounded-[var(--radius-md)]">
    <h3 class="text-[var(--text-xl)] font-[var(--font-semibold)]">
      Título
    </h3>
    <p class="text-[var(--text-sm)] text-[var(--text-secondary)]">
      Descrição
    </p>
  </div>
</template>
```

### Botão Customizado com Tokens

```scss
.custom-button {
  background-color: var(--primary);
  color: white;
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-6);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-hover);
    box-shadow: var(--shadow-md);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-focus);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

### Card Customizado com Tokens

```scss
.custom-card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-lg);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--divider-color);
  }

  &__title {
    color: var(--text-primary);
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    margin: 0;
  }

  &__body {
    padding: var(--space-4) 0;
    color: var(--text-secondary);
    font-size: var(--text-base);
  }
}
```

---

## Referências

- **Arquivo de Tokens**: `src/styles/design-tokens.css`
- **Tailwind Config**: `tailwind.config.js`
- **Quasar Config**: `src/styles/quasar.variables.scss`
- **Documentação de Componentes**: `COMPONENTS.md`
- **Guia de Desenvolvedores**: `AGENTS.md`

---

## Próximos Passos

Ao adicionar novos componentes ao design system:

1. **Use os tokens existentes** sempre que possível
2. **Adicione novos tokens** ao `design-tokens.css` se necessário
3. **Atualize esta documentação** com os novos padrões
4. **Teste em ambos os modos** (light e dark)
5. **Mantenha consistência** com os componentes existentes

---

**Última Atualização**: Março 2026
**Versão**: 1.0.0
