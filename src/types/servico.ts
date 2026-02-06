export interface FaixaPreco {
  min: number;
  max: number;
  valorPorPessoa: number;
}

export interface SecaoServico {
  titulo: string;
  itens: string[];
}

export interface Staff {
  descricao: string;
  quantidade: number;
}

export interface PrecoPorEmbarcacao {
  ate36pes: number;
  ate50pes: number;
}

export type CategoriaServico =
  | 'churrasco'
  | 'openbar'
  | 'combo'
  | 'mesa'
  | 'decoracao'
  | 'entretenimento';

export type TipoPreco = 'por_pessoa' | 'fixo' | 'por_embarcacao';

export interface Servico {
  id: string;
  nome: string;
  categoria: CategoriaServico;
  tipo: TipoPreco;
  premium: boolean;
  faixasPreco?: FaixaPreco[];
  precoFixo?: number;
  precoPorEmbarcacao?: PrecoPorEmbarcacao;
  excluiTaxaChurrasqueira?: boolean;
  staff?: Staff;
  secoes: SecaoServico[];
  opcionais?: string[];
  observacoes?: string[];
}

export interface CategoriaInfo {
  id: CategoriaServico;
  nome: string;
}
