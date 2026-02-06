import type { CategoriaInfo } from './types/servico.ts';

export const WHATSAPP_NUMERO = '5521977724114';

export const CATEGORIAS: CategoriaInfo[] = [
  { id: 'churrasco', nome: 'Churrasco' },
  { id: 'combo', nome: 'Combos' },
  { id: 'openbar', nome: 'Open Bar' },
  { id: 'mesa', nome: 'Mesas' },
  { id: 'decoracao', nome: 'Decoracao' },
  { id: 'entretenimento', nome: 'Entretenimento' },
];

export const TAMANHOS_EMBARCACAO = [
  { id: 'ate36pes' as const, i18nKey: 'pricing.ate36' as const },
  { id: 'ate50pes' as const, i18nKey: 'pricing.ate50' as const },
  { id: 'acima50pes' as const, i18nKey: 'pricing.acima50' as const },
];

export const CONVIDADOS_MIN = 1;
export const CONVIDADOS_MAX = 50;
export const CONVIDADOS_DEFAULT = 10;

export const PRECO_CHURRASQUEIRA = 250;
