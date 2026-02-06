import type { Servico } from '../types/servico.ts';

export const servicos: Servico[] = [
  // ==================== 1. CHURRASQUEIRA ====================
  {
    id: 'utilizacao-churrasqueira',
    nome: 'Utilizacao da Churrasqueira',
    categoria: 'churrasco',
    tipo: 'fixo',
    premium: false,
    precoFixo: 250,
    secoes: [
      {
        titulo: 'O que esta incluido',
        itens: [
          'Tripulacao na churrasqueira',
          '02 sacos de gelo escama (20kg cada)',
          '01 saco de gelo filtrado (10kg)',
          'Carvao',
        ],
      },
    ],
    observacoes: [
      'Na contratacao de qualquer pacote de churrasco, nao e necessario pagar novamente a taxa de churrasqueira.',
      'Em embarcacoes maiores, o valor da churrasqueira pode variar por conta da quantidade de tripulantes e gelo oferecido.',
    ],
  },

  // ==================== 2. KIT CHURRASCO SIMPLES ====================
  {
    id: 'kit-churrasco-simples',
    nome: 'Kit Churrasco Simples',
    categoria: 'churrasco',
    tipo: 'por_pessoa',
    premium: false,
    excluiTaxaChurrasqueira: true,
    faixasPreco: [
      { min: 5, max: 5, valorPorPessoa: 150 },
      { min: 6, max: 7, valorPorPessoa: 140 },
      { min: 8, max: 10, valorPorPessoa: 125 },
      { min: 11, max: 15, valorPorPessoa: 115 },
      { min: 16, max: 20, valorPorPessoa: 105 },
      { min: 21, max: 25, valorPorPessoa: 100 },
    ],
    staff: { descricao: 'Tripulacao na churrasqueira', quantidade: 1 },
    secoes: [
      {
        titulo: 'Comidas',
        itens: [
          'Picanha',
          'Contra file',
          'Linguica',
          'Drumete',
          'Pao de alho',
          'Farofa pronta',
        ],
      },
      {
        titulo: 'Bebidas',
        itens: [
          'Coca-Cola',
          'Guarana',
          'Agua mineral',
        ],
      },
    ],
    opcionais: ['Cerveja Heineken: R$ 8 por unidade'],
  },

  // ==================== 3. CHURRASCO COM ACOMPANHAMENTOS ====================
  {
    id: 'churrasco-com-acompanhamentos',
    nome: 'Churrasco com Acompanhamentos',
    categoria: 'churrasco',
    tipo: 'por_pessoa',
    premium: false,
    excluiTaxaChurrasqueira: true,
    faixasPreco: [
      { min: 7, max: 10, valorPorPessoa: 160 },
      { min: 11, max: 15, valorPorPessoa: 155 },
      { min: 16, max: 20, valorPorPessoa: 150 },
      { min: 21, max: 25, valorPorPessoa: 145 },
    ],
    staff: { descricao: '1 Churrasqueiro', quantidade: 1 },
    secoes: [
      {
        titulo: 'Carnes Premium',
        itens: [
          'Picanha',
          'Bife de Chorizo',
          'Picanha Suina',
          'Linguica Toscana',
          'Drumete',
        ],
      },
      {
        titulo: 'Aperitivos de Entrada',
        itens: [
          'Queijo coalho',
          'Pao de alho',
          'Linguica',
        ],
      },
      {
        titulo: 'Acompanhamentos',
        itens: [
          'Arroz branco',
          'Farofa crocante',
          'Salada de batata com aioli',
          'Vinagrete',
        ],
      },
      {
        titulo: 'Bebidas',
        itens: [
          'Refrigerantes',
          'Agua com e sem gas',
          'Sucos',
        ],
      },
    ],
    opcionais: ['Cerveja Heineken: R$ 8 por unidade'],
  },

  // ==================== 4. COMBO CHURRASCO + OPEN BAR BASICO ====================
  {
    id: 'combo-churrasco-openbar-basico',
    nome: 'Combo Churrasco + Open Bar Basico',
    categoria: 'combo',
    tipo: 'por_pessoa',
    premium: false,
    excluiTaxaChurrasqueira: true,
    faixasPreco: [
      { min: 7, max: 10, valorPorPessoa: 230 },
      { min: 11, max: 15, valorPorPessoa: 220 },
      { min: 16, max: 20, valorPorPessoa: 215 },
      { min: 21, max: 25, valorPorPessoa: 205 },
    ],
    staff: { descricao: '1 Barman e 1 Churrasqueiro', quantidade: 2 },
    secoes: [
      {
        titulo: 'Carnes Premium',
        itens: [
          'Picanha',
          'Bife de Chorizo',
          'Picanha Suina',
          'Linguica Toscana',
          'Drumete',
        ],
      },
      {
        titulo: 'Aperitivos de Entrada',
        itens: [
          'Queijo coalho',
          'Pao de alho',
          'Linguica',
        ],
      },
      {
        titulo: 'Acompanhamentos',
        itens: [
          'Arroz branco',
          'Farofa crocante',
          'Salada de batata com aioli',
          'Vinagrete',
        ],
      },
      {
        titulo: 'Drinks',
        itens: [
          'Caipirinha',
          'Caipvodka',
          'Gin tonica',
          'Gin com frutas vermelhas',
          '1 rodada de shot (Bananinha ou Tequila)',
        ],
      },
      {
        titulo: 'Bebidas',
        itens: [
          'Vodka Smirnoff, Cachaca Pitu ou 51, Gin Seagers',
          'Cerveja 2,5L por pessoa: Brahma ou Original',
          'Coca-Cola (normal e zero), Guarana, agua com e sem gas, sucos naturais',
        ],
      },
      {
        titulo: 'Frutas disponiveis (escolha ate 4)',
        itens: [
          'Limao',
          'Maracuja',
          'Abacaxi',
          'Melancia',
          'Tangerina',
          'Caju',
        ],
      },
    ],
  },

  // ==================== 5. COMBO CHURRASCO + OPEN BAR PREMIUM ====================
  {
    id: 'combo-churrasco-openbar-premium',
    nome: 'Combo Churrasco + Open Bar Premium',
    categoria: 'combo',
    tipo: 'por_pessoa',
    premium: true,
    excluiTaxaChurrasqueira: true,
    faixasPreco: [
      { min: 7, max: 10, valorPorPessoa: 250 },
      { min: 11, max: 15, valorPorPessoa: 240 },
      { min: 16, max: 20, valorPorPessoa: 235 },
      { min: 21, max: 25, valorPorPessoa: 220 },
    ],
    staff: { descricao: '1 Barman e 1 Churrasqueiro', quantidade: 2 },
    secoes: [
      {
        titulo: 'Carnes Premium',
        itens: [
          'Picanha',
          'Bife de Chorizo',
          'Picanha Suina',
          'Linguica Toscana',
          'Drumete',
        ],
      },
      {
        titulo: 'Aperitivos de Entrada',
        itens: [
          'Queijo coalho',
          'Pao de alho',
          'Linguica',
        ],
      },
      {
        titulo: 'Acompanhamentos',
        itens: [
          'Arroz branco',
          'Farofa crocante',
          'Salada de batata com aioli',
          'Vinagrete',
        ],
      },
      {
        titulo: 'Drinks Especiais',
        itens: [
          'Caipirinha',
          'Caipvodka',
          'Gin tonica',
          'Gin com frutas vermelhas',
          'Moscow Mule',
          'Fitzgerald',
          '1 rodada de shot (Bananinha ou Tequila)',
        ],
      },
      {
        titulo: 'Bebidas Premium',
        itens: [
          'Vodka Absolut, Cachaca Sagatiba, Gin Gordon\'s',
          'Cerveja 2,5L por pessoa: Heineken ou Stella',
          'Coca-Cola (normal e zero), Guarana, agua com e sem gas, sucos naturais',
        ],
      },
      {
        titulo: 'Frutas disponiveis (escolha ate 4)',
        itens: [
          'Limao',
          'Maracuja',
          'Abacaxi',
          'Melancia',
          'Morango',
          'Tangerina',
          'Caju',
        ],
      },
    ],
  },

  // ==================== 6. OPEN BAR BASICO ====================
  {
    id: 'open-bar-basico',
    nome: 'Open Bar Basico',
    categoria: 'openbar',
    tipo: 'por_pessoa',
    premium: false,
    faixasPreco: [
      { min: 7, max: 10, valorPorPessoa: 150 },
      { min: 11, max: 15, valorPorPessoa: 145 },
      { min: 16, max: 20, valorPorPessoa: 140 },
      { min: 21, max: 25, valorPorPessoa: 135 },
    ],
    staff: { descricao: '1 Barman', quantidade: 1 },
    secoes: [
      {
        titulo: 'Drinks',
        itens: [
          'Caipirinha',
          'Caipvodka',
          'Gin tonica',
          'Gin com frutas vermelhas',
          '1 rodada de shot (Bananinha ou Tequila)',
        ],
      },
      {
        titulo: 'Bebidas',
        itens: [
          'Vodka Smirnoff, Cachaca Pitu ou 51, Gin Seagers',
          'Cerveja 2,5L por pessoa: Brahma ou Original',
          'Coca-Cola (normal e zero), Guarana, agua com e sem gas, sucos naturais',
        ],
      },
      {
        titulo: 'Frutas disponiveis (escolha ate 4)',
        itens: [
          'Limao',
          'Maracuja',
          'Abacaxi',
          'Melancia',
          'Tangerina',
          'Caju',
        ],
      },
    ],
  },

  // ==================== 7. OPEN BAR PREMIUM ====================
  {
    id: 'open-bar-premium',
    nome: 'Open Bar Premium',
    categoria: 'openbar',
    tipo: 'por_pessoa',
    premium: true,
    faixasPreco: [
      { min: 7, max: 10, valorPorPessoa: 180 },
      { min: 11, max: 15, valorPorPessoa: 175 },
      { min: 16, max: 20, valorPorPessoa: 170 },
      { min: 21, max: 25, valorPorPessoa: 160 },
    ],
    staff: { descricao: '1 Barman', quantidade: 1 },
    secoes: [
      {
        titulo: 'Drinks Especiais',
        itens: [
          'Caipirinha',
          'Caipvodka',
          'Gin tonica',
          'Gin com frutas vermelhas',
          'Moscow Mule',
          'Fitzgerald',
          '1 rodada de shot (Bananinha ou Tequila)',
        ],
      },
      {
        titulo: 'Bebidas Premium',
        itens: [
          'Vodka Absolut, Cachaca Sagatiba, Gin Gordon\'s',
          'Cerveja 2,5L por pessoa: Heineken ou Stella',
          'Coca-Cola (normal e zero), Guarana, agua com e sem gas, sucos naturais',
        ],
      },
      {
        titulo: 'Frutas disponiveis (escolha ate 4)',
        itens: [
          'Limao',
          'Maracuja',
          'Abacaxi',
          'Melancia',
          'Morango',
          'Tangerina',
          'Caju',
        ],
      },
    ],
  },

  // ==================== 8. MESA DE QUEIJOS & VINHOS ====================
  {
    id: 'mesa-queijos-vinhos',
    nome: 'Mesa de Queijos & Vinhos',
    categoria: 'mesa',
    tipo: 'por_pessoa',
    premium: false,
    faixasPreco: [
      { min: 7, max: 10, valorPorPessoa: 140 },
      { min: 11, max: 15, valorPorPessoa: 130 },
      { min: 16, max: 20, valorPorPessoa: 125 },
      { min: 21, max: 25, valorPorPessoa: 115 },
    ],
    secoes: [
      {
        titulo: 'Queijos',
        itens: [
          'Brie',
          'Gouda',
          'Parmesao em lascas',
          'Minas Padrao',
          'Gorgonzola',
        ],
      },
      {
        titulo: 'Acompanhamentos',
        itens: [
          'Uvas, damasco seco, mix de castanhas',
          'Geleia de frutas vermelhas, mel',
          'Paes variados (ciabatta, grissini)',
          'Azeitonas verdes',
        ],
      },
      {
        titulo: 'Vinhos',
        itens: [
          'Branco (Chardonnay ou Sauvignon Blanc)',
          'Espumante Brut',
        ],
      },
      {
        titulo: 'Bebidas',
        itens: [
          'Coca-Cola (normal e zero), Guarana, agua com e sem gas, sucos naturais',
        ],
      },
    ],
  },

  // ==================== 9. MESA DE SNACKS PREMIUM ====================
  {
    id: 'mesa-snacks-premium',
    nome: 'Mesa de Snacks Premium',
    categoria: 'mesa',
    tipo: 'por_pessoa',
    premium: true,
    faixasPreco: [
      { min: 7, max: 10, valorPorPessoa: 150 },
      { min: 11, max: 15, valorPorPessoa: 140 },
      { min: 16, max: 20, valorPorPessoa: 130 },
      { min: 21, max: 25, valorPorPessoa: 120 },
    ],
    secoes: [
      {
        titulo: 'Classicos da Mesa',
        itens: [
          'Quiches grandes (Alho-poro / Tomate seco)',
          'Mini wraps frios (Peru com cream cheese)',
          'Focaccia artesanal com azeite trufado',
          'Grissinos crocantes com parmesao e ervas',
        ],
      },
      {
        titulo: 'Tabuas & Finger Foods',
        itens: [
          'Tabua de Frios e Queijos (gorgonzola, prato, bola, peito de peru, azeitona, uva, tomatinho, presunto)',
          'Espetinhos Caprese com reducao de balsamico',
          'Mix de nuts e frutas secas',
        ],
      },
      {
        titulo: 'Refrescantes & Acompanhamentos',
        itens: [
          'Caponata + torradas',
          'Ovos de codorna temperados',
          'Tabua de frutas (morango, uva, kiwi e melancia)',
          'Cesta de paes + trio de pastas artesanais',
        ],
      },
      {
        titulo: 'Bebidas',
        itens: [
          'Coca-Cola (normal e zero), Guarana, agua com e sem gas, sucos naturais',
        ],
      },
    ],
    observacoes: [
      'Alguns itens podem nao ter disponibilidade no dia. As quantidades serao ajustadas para compensar a falta de um deles.',
    ],
  },

  // ==================== 10. KIT FESTA E DECORACAO PREMIUM ====================
  {
    id: 'kit-festa-decoracao-premium',
    nome: 'Kit Festa e Decoracao Premium',
    categoria: 'decoracao',
    tipo: 'por_embarcacao',
    premium: true,
    precoPorEmbarcacao: {
      ate36pes: 1850,
      ate50pes: 2500,
    },
    secoes: [
      {
        titulo: 'Mesa e Doces',
        itens: [
          'Mesa de bolo decorada',
          'Bolo (quantidade de fatias varia conforme tamanho da embarcacao)',
          'Doces gourmet (quantidade varia conforme tamanho da embarcacao)',
          '10 cupcakes decorados',
        ],
      },
      {
        titulo: 'Decoracao Externa',
        itens: [
          'Ornamentacao externa personalizada',
          'Arco de bolas decorativo',
          'Ornamentacao natural com flores e folhagens',
        ],
      },
      {
        titulo: 'Acessorios e Conforto',
        itens: [
          'Almofadas decorativas',
          'Faixa tematica personalizada',
        ],
      },
    ],
    observacoes: [
      'Ate 36 pes: Bolo 15 fatias + 50 doces gourmet',
      'Ate 50 pes: Bolo 20 fatias + 100 doces gourmet',
      'Acima de 50 pes, consulte valores especiais',
      'Decoracao avulsa, somente bolos e doces, ou personalizacao: consulte valores',
    ],
  },

  // ==================== 11. KIT DESPEDIDA DE SOLTEIRA ====================
  {
    id: 'kit-despedida-solteira',
    nome: 'Kit Despedida de Solteira',
    categoria: 'decoracao',
    tipo: 'por_pessoa',
    premium: false,
    faixasPreco: [
      { min: 7, max: 10, valorPorPessoa: 150 },
      { min: 11, max: 15, valorPorPessoa: 145 },
      { min: 16, max: 20, valorPorPessoa: 140 },
      { min: 21, max: 25, valorPorPessoa: 135 },
    ],
    secoes: [
      {
        titulo: 'Itens Personalizados',
        itens: [
          'Cupcakes (2 modelos)',
          'Docinhos (3 por pessoa)',
          'Canudos tematicos',
          'Bexigas metalizadas',
          'Faixa "Noiva" + faixas "Time da Noiva"',
          'Adesivos ou tatuagens temporarias',
          'Plaquinhas para fotos',
        ],
      },
      {
        titulo: 'Extras',
        itens: [
          'Shot especial',
          'Bolo tematico',
          'Tabua de doces (Fini, marshmallow, pirulitos, balas azedinhas)',
          'Copinhos com Nutella e morango',
          'Kits ressaca (Engov + agua de coco + KitKat)',
          'Copos de shot personalizados',
        ],
      },
    ],
  },

  // ==================== 12. DJ COM EQUIPAMENTO DE SOM ====================
  {
    id: 'dj-com-equipamento',
    nome: 'DJ com Equipamento de Som',
    categoria: 'entretenimento',
    tipo: 'fixo',
    premium: false,
    precoFixo: 1500,
    staff: { descricao: 'DJ profissional', quantidade: 1 },
    secoes: [
      {
        titulo: 'Servico completo',
        itens: [
          'DJ profissional',
          'Equipamento de som completo',
          'Playlist personalizada',
          'Duracao do evento',
        ],
      },
    ],
  },

  // ==================== 13. FOTOGRAFO ====================
  {
    id: 'fotografo',
    nome: 'Fotografo',
    categoria: 'entretenimento',
    tipo: 'fixo',
    premium: false,
    precoFixo: 800,
    staff: { descricao: 'Fotografo profissional', quantidade: 1 },
    secoes: [
      {
        titulo: 'Servico completo',
        itens: [
          'Fotografo profissional',
          'Fotos editadas em alta resolucao',
          'Entrega digital',
        ],
      },
    ],
  },
];

export function getServicoPorId(id: string): Servico | undefined {
  return servicos.find((s) => s.id === id);
}

export function getServicosPorCategoria(categoria: string): Servico[] {
  return servicos.filter((s) => s.categoria === categoria);
}
