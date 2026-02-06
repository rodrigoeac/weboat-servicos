import type { Servico } from '../types/servico.ts';

export type TamanhoEmbarcacao = 'ate36pes' | 'ate50pes' | 'acima50pes';

export interface ItemSimulacao {
  servico: Servico;
  preco: number;
  consultar: boolean;
  cobrancaMinima: number | null;
}

export interface ResultadoSimulacao {
  itens: ItemSimulacao[];
  churrasqueiraInclusa: boolean;
  total: number;
  valorPorPessoa: number;
  avisoKeys: string[];
  temConsultar: boolean;
}

export function calcularPrecoServico(
  servico: Servico,
  numPessoas: number,
  tamanhoEmbarcacao: TamanhoEmbarcacao,
): { preco: number | null; consultar: boolean; cobrancaMinima: number | null } {
  if (tamanhoEmbarcacao === 'acima50pes' && servico.tipo === 'por_embarcacao') {
    return { preco: null, consultar: true, cobrancaMinima: null };
  }

  switch (servico.tipo) {
    case 'fixo':
      return { preco: servico.precoFixo ?? null, consultar: false, cobrancaMinima: null };

    case 'por_embarcacao': {
      const tamanho = tamanhoEmbarcacao === 'acima50pes' ? 'ate50pes' : tamanhoEmbarcacao;
      return { preco: servico.precoPorEmbarcacao?.[tamanho] ?? null, consultar: false, cobrancaMinima: null };
    }

    case 'por_pessoa': {
      if (!servico.faixasPreco) return { preco: null, consultar: false, cobrancaMinima: null };

      const faixa = servico.faixasPreco.find(
        (f) => numPessoas >= f.min && numPessoas <= f.max,
      );

      if (faixa) {
        return { preco: faixa.valorPorPessoa * numPessoas, consultar: false, cobrancaMinima: null };
      }

      // Above max: use last bracket price
      const ultimaFaixa = servico.faixasPreco[servico.faixasPreco.length - 1];
      if (numPessoas > ultimaFaixa.max) {
        return { preco: ultimaFaixa.valorPorPessoa * numPessoas, consultar: false, cobrancaMinima: null };
      }

      // Below minimum: charge for the minimum number of people
      const primeiraFaixa = servico.faixasPreco[0];
      if (numPessoas < primeiraFaixa.min) {
        return {
          preco: primeiraFaixa.valorPorPessoa * primeiraFaixa.min,
          consultar: false,
          cobrancaMinima: primeiraFaixa.min,
        };
      }

      return { preco: null, consultar: false, cobrancaMinima: null };
    }

    default:
      return { preco: null, consultar: false, cobrancaMinima: null };
  }
}

export function getPrecoMinimo(servico: Servico): number | null {
  switch (servico.tipo) {
    case 'fixo':
      return servico.precoFixo ?? null;
    case 'por_embarcacao':
      return servico.precoPorEmbarcacao?.ate36pes ?? null;
    case 'por_pessoa': {
      if (!servico.faixasPreco?.length) return null;
      return servico.faixasPreco[servico.faixasPreco.length - 1].valorPorPessoa;
    }
    default:
      return null;
  }
}

export function getMinimoConvidados(servico: Servico): number {
  if (servico.tipo !== 'por_pessoa' || !servico.faixasPreco?.length) return 0;
  return servico.faixasPreco[0].min;
}

export function calcularSimulacao(
  servicosSelecionados: Servico[],
  numPessoas: number,
  tamanhoEmbarcacao: TamanhoEmbarcacao,
): ResultadoSimulacao {
  const itens: ItemSimulacao[] = [];
  const avisoKeys: string[] = [];

  const temChurrascoOuCombo = servicosSelecionados.some(
    (s) => s.excluiTaxaChurrasqueira,
  );
  const temChurrasqueiraSeparada = servicosSelecionados.some(
    (s) => s.id === 'utilizacao-churrasqueira',
  );

  const churrasqueiraInclusa = temChurrascoOuCombo && temChurrasqueiraSeparada;

  if (churrasqueiraInclusa) {
    avisoKeys.push('aviso.churrasqueiraInclusa');
  }

  const temCombo = servicosSelecionados.some((s) => s.categoria === 'combo');
  const temChurrascoIndividual = servicosSelecionados.some(
    (s) => s.categoria === 'churrasco' && s.id !== 'utilizacao-churrasqueira',
  );
  const temOpenBarIndividual = servicosSelecionados.some(
    (s) => s.categoria === 'openbar',
  );

  if (temCombo && temChurrascoIndividual) {
    avisoKeys.push('aviso.comboChurrasco');
  }
  if (temCombo && temOpenBarIndividual) {
    avisoKeys.push('aviso.comboOpenbar');
  }

  let temConsultar = false;

  for (const servico of servicosSelecionados) {
    if (servico.id === 'utilizacao-churrasqueira' && temChurrascoOuCombo) {
      itens.push({ servico, preco: 0, consultar: false, cobrancaMinima: null });
      continue;
    }

    const result = calcularPrecoServico(servico, numPessoas, tamanhoEmbarcacao);
    if (result.consultar) {
      temConsultar = true;
      itens.push({ servico, preco: 0, consultar: true, cobrancaMinima: null });
    } else if (result.preco !== null) {
      itens.push({ servico, preco: result.preco, consultar: false, cobrancaMinima: result.cobrancaMinima });
    }
  }

  const total = itens.reduce((sum, item) => sum + item.preco, 0);
  const valorPorPessoa = numPessoas > 0 ? total / numPessoas : 0;

  return {
    itens,
    churrasqueiraInclusa,
    total,
    valorPorPessoa,
    avisoKeys,
    temConsultar,
  };
}
