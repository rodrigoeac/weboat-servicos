# WeBoat Servicos

Catalogo interativo de servicos adicionais para eventos em embarcacoes da WeBoat Brasil. O cliente navega pelos servicos, ve detalhes completos e simula o custo total.

**Producao:** https://weboat-servicos.vercel.app
**Repositorio:** https://github.com/rodrigoeac/weboat-servicos

---

## Stack

| Tecnologia | Versao | Papel |
|---|---|---|
| React | 19 | UI |
| TypeScript | 5.9 | Tipagem |
| Vite | 7 | Build / dev server |
| Tailwind CSS | 4 | Estilos (via `@theme` inline) |
| Vitest | 4 | Testes |
| PostCSS | 8 | Plugin `@tailwindcss/postcss` |
| Vercel | - | Deploy (auto-deploy no push para `main`) |

Sem bibliotecas de UI externas.

---

## Estrutura de Arquivos

```
weboat-servicos/
├── index.html                 # HTML com Google Fonts preload
├── package.json
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json              # Referencia app + node
├── tsconfig.app.json
├── tsconfig.node.json
├── public/
│   └── logo.svg               # Logo WeBoat (fundo escuro)
├── src/
│   ├── main.tsx               # Entry point React
│   ├── App.tsx                # Composicao principal
│   ├── index.css              # @theme com design tokens
│   ├── i18n.ts                # Sistema de traducao PT/EN/ES
│   ├── constants.ts           # Categorias, tamanhos, limites
│   ├── types/
│   │   └── servico.ts         # Tipos: Servico, FaixaPreco, etc.
│   ├── data/
│   │   └── servicos.ts        # 13 servicos completos
│   ├── hooks/
│   │   └── useSimulacao.ts    # Estado central do app
│   ├── utils/
│   │   ├── calcularSimulacao.ts  # Logica de calculo
│   │   └── formatCurrency.ts     # Formatacao BRL
│   ├── components/
│   │   ├── ErrorBoundary.tsx
│   │   ├── Hero.tsx               # Header com logo + i18n
│   │   ├── CategoryNav.tsx        # Pills de categoria (sticky)
│   │   ├── ServicesCatalog.tsx    # Lista agrupada por categoria
│   │   ├── ServiceCard.tsx        # Card expandivel com checkbox
│   │   ├── ServiceCardDetails.tsx # Secoes detalhadas
│   │   ├── PricingTable.tsx       # Tabela de faixas de preco
│   │   ├── PremiumBadge.tsx       # Badge premium gradiente
│   │   ├── SimulationPanel.tsx    # Sidebar desktop (sticky)
│   │   ├── SimulationBottomSheet.tsx # Bottom sheet mobile
│   │   ├── WhatsAppCTA.tsx        # Botao WhatsApp
│   │   └── Footer.tsx
│   └── __tests__/
│       ├── calcularSimulacao.test.ts  # 21 testes
│       └── servicos.test.ts           # 12 testes
```

---

## Design System

### Cores

| Token | Hex | Uso |
|---|---|---|
| Ocean Deep | `#1E3A5F` | Cor principal — headers, botoes ativos, textos destaque |
| Wave Blue | `#4A90B8` | Secundaria — links, badges, "consultar valores" |
| Sunset Gold | `#D4A853` | Acento — badge premium (gradiente com Ocean Deep) |
| Sand White | `#FAFAF8` | Fundo geral da pagina |
| Pearl Gray | `#F0F0EC` | Fundo cards secundarios, botoes inativos, tabelas |
| Charcoal | `#2D3436` | Texto principal |
| Driftwood | `#8B7E74` | Texto secundario — subtitulos, labels |
| Border Light | `#E8E6E1` | Bordas sutis |
| Warning | `#E67E22` | Alertas — conflitos, cobranca minima |
| Warning Light | `#FEF3E2` | Fundo dos alertas |
| Success | `#27AE60` | "Incluso", churrasqueira inclusa |
| WhatsApp | `#25D366` | Botao CTA |
| WhatsApp Hover | `#1EBE5D` | Hover do botao |

### Fontes

| Token | Familia | Uso |
|---|---|---|
| Display | Plus Jakarta Sans | Titulos grandes, totais |
| Heading | DM Sans | Subtitulos, labels, botoes, badges |
| Body | Source Sans 3 | Texto corrido, descricoes, itens |

### Sombras

| Token | Valor | Uso |
|---|---|---|
| shadow-sm | `0 1px 3px rgba(30,58,95,0.08)` | Cards repouso |
| shadow-md | `0 4px 12px rgba(30,58,95,0.12)` | Painel simulacao |
| shadow-card-hover | `0 8px 24px rgba(30,58,95,0.15)` | Cards hover (lift -4px) |

Todos definidos via `@theme` inline no `src/index.css`.

---

## Servicos (13)

| # | Servico | Tipo | Categoria | Premium |
|---|---|---|---|---|
| 1 | Utilizacao da Churrasqueira | Fixo R$250 | churrasco | - |
| 2 | Kit Churrasco Simples | Por pessoa (5-25+) | churrasco | - |
| 3 | Churrasco com Acompanhamentos | Por pessoa (7-25+) | churrasco | - |
| 4 | Combo Churrasco + Open Bar Basico | Por pessoa (7-25+) | combo | - |
| 5 | Combo Churrasco + Open Bar Premium | Por pessoa (7-25+) | combo | Premium |
| 6 | Open Bar Basico | Por pessoa (7-25+) | openbar | - |
| 7 | Open Bar Premium | Por pessoa (7-25+) | openbar | Premium |
| 8 | Mesa de Queijos & Vinhos | Por pessoa (7-25+) | mesa | - |
| 9 | Mesa de Snacks Premium | Por pessoa (7-25+) | mesa | Premium |
| 10 | Kit Festa e Decoracao Premium | Por embarcacao | decoracao | Premium |
| 11 | Kit Despedida de Solteira | Por pessoa (7-25+) | decoracao | - |
| 12 | DJ com Equipamento de Som | Fixo R$1.500 | entretenimento | - |
| 13 | Fotografo | Fixo R$800 | entretenimento | - |

Cada servico tem `secoes[]` com detalhamento completo (carnes, bebidas, acompanhamentos, etc.), `staff`, `opcionais` e `observacoes`.

---

## Regras de Negocio

### Precificacao

- **Fixo**: valor unico independente de convidados/embarcacao.
- **Por pessoa**: faixas de preco (ex: 5-10, 11-15, 16-20, 21-25). Acima de 25 pessoas usa o valor da ultima faixa.
- **Por embarcacao**: ate 36 pes, ate 50 pes, ou acima de 50 pes. Acima de 50 pes mostra "consultar valores com equipe comercial".

### Minimo de pessoas

Servicos `por_pessoa` tem minimo (ex: 7 pessoas para Open Bar). O cliente **pode** selecionar o servico mesmo abaixo do minimo — sera cobrado o valor minimo de pessoas, com aviso no checkout: "Cobranca minima de N pessoas sera aplicada".

### Churrasqueira

A taxa de R$250 da churrasqueira e automaticamente zerada quando um pacote de churrasco ou combo e selecionado (`excluiTaxaChurrasqueira: true`). O checkout mostra "Churrasqueira inclusa no pacote".

### Avisos de conflito

Se o cliente seleciona um combo + churrasco individual ou combo + open bar individual, um aviso suave aparece (nao bloqueia).

---

## Internacionalizacao (i18n)

- 3 idiomas: PT (padrao), EN, ES
- ~65 chaves de traducao em `src/i18n.ts`
- Funcao `createT(idioma)` retorna `t(key, vars?)` para interpolacao
- Seletor de idioma: mobile abaixo do titulo, desktop canto superior direito
- Traducoes cobrem: hero, categorias, cards, precos, simulacao, WhatsApp, footer, avisos
- Nomes dos servicos e detalhes permanecem em portugues (dados do catalogo)

---

## Layout

### Desktop (lg+)

```
┌──────────────────────────────────┐
│          Hero (logo + i18n)      │
├──────────────────────────────────┤
│       CategoryNav (sticky)       │
├──────────────────┬───────────────┤
│   Catalogo 2/3   │ Simulador 1/3 │
│                  │   (sticky)     │
├──────────────────┴───────────────┤
│            Footer                │
└──────────────────────────────────┘
```

### Mobile

```
┌──────────────────┐
│   Hero + i18n    │
├──────────────────┤
│  CategoryNav     │ ← scroll horizontal
├──────────────────┤
│  Catalogo (full) │
├──────────────────┤
│     Footer       │
├──────────────────┤
│  Bottom Sheet    │ ← fixo, bg-ocean-deep quando tem servicos
└──────────────────┘
```

O bottom sheet colapsado fica **branco** sem servicos e **ocean-deep com texto branco** quando servicos estao selecionados, com CTA "Ver simulacao".

---

## Componentes Principais

### ServiceCard
Card expandivel com checkbox. Mostra nome, badge premium, preco resumido ("a partir de R$X/pessoa"), minimo de pessoas. Ao expandir mostra `ServiceCardDetails` com secoes detalhadas e `PricingTable`.

### SimulationPanel (desktop) / SimulationBottomSheet (mobile)
- Input de convidados (+/-)
- Seletor de tamanho de embarcacao (so aparece com Kit Festa selecionado — ate 36, ate 50, acima 50 pes)
- Lista de servicos selecionados com precos individuais
- Indicadores: "Consultar" para >50pes, "Incluso" para churrasqueira, "min. N pax" para cobranca minima
- Avisos de conflito traduzidos
- Total + valor por pessoa
- Botao WhatsApp com mensagem pre-montada

### WhatsAppCTA
Monta mensagem com lista de servicos, total, numero de convidados. Se >50pes selecionado, adiciona nota de "consultar valores". Mensagem traduzida conforme idioma ativo.

---

## Tipos Principais

```typescript
interface Servico {
  id: string;
  nome: string;
  categoria: CategoriaServico;   // 'churrasco' | 'combo' | 'openbar' | 'mesa' | 'decoracao' | 'entretenimento'
  tipo: TipoPreco;               // 'por_pessoa' | 'fixo' | 'por_embarcacao'
  premium: boolean;
  faixasPreco?: FaixaPreco[];     // para tipo 'por_pessoa'
  precoFixo?: number;             // para tipo 'fixo'
  precoPorEmbarcacao?: { ate36pes: number; ate50pes: number };
  excluiTaxaChurrasqueira?: boolean;
  staff?: { descricao: string; quantidade: number };
  secoes: { titulo: string; itens: string[] }[];
  opcionais?: string[];
  observacoes?: string[];
}

interface ItemSimulacao {
  servico: Servico;
  preco: number;
  consultar: boolean;          // true para >50pes em por_embarcacao
  cobrancaMinima: number | null; // numero minimo quando abaixo da faixa
}

interface ResultadoSimulacao {
  itens: ItemSimulacao[];
  churrasqueiraInclusa: boolean;
  total: number;
  valorPorPessoa: number;
  avisoKeys: string[];         // chaves i18n dos avisos
  temConsultar: boolean;       // algum item precisa consultar
}
```

---

## Comandos

```bash
# Desenvolvimento
npm run dev          # Vite dev server (localhost:5173)

# Build
npm run build        # tsc -b && vite build

# Preview
npm run preview      # Serve o build em localhost:4173

# Testes
npm run test         # Vitest run (33 testes)
npm run test:watch   # Vitest modo watch
```

---

## Deploy

O deploy e automatico via Vercel. Qualquer push para `main` dispara um novo build.

```bash
# Deploy manual (se necessario)
vercel --prod --yes
```

---

## Dados de Referencia

Os dados dos 13 servicos foram extraidos do catalogo WhatsApp (`weboat-servicos-whatsapp.html`) com detalhamento completo de cada pacote. Os precos seguem a mesma estrutura do app de propostas (`weboat-proposal`), porem com descricoes muito mais ricas para exibicao ao cliente.
