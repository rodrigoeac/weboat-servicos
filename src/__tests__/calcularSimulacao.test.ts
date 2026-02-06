import { describe, it, expect } from 'vitest';
import {
  calcularPrecoServico,
  calcularSimulacao,
  getPrecoMinimo,
  getMinimoConvidados,
} from '../utils/calcularSimulacao.ts';
import { getServicoPorId } from '../data/servicos.ts';

describe('calcularPrecoServico', () => {
  it('calcula preco fixo corretamente (DJ)', () => {
    const dj = getServicoPorId('dj-com-equipamento')!;
    expect(calcularPrecoServico(dj, 10, 'ate36pes').preco).toBe(1500);
    expect(calcularPrecoServico(dj, 25, 'ate50pes').preco).toBe(1500);
  });

  it('calcula preco fixo corretamente (churrasqueira)', () => {
    const churr = getServicoPorId('utilizacao-churrasqueira')!;
    expect(calcularPrecoServico(churr, 10, 'ate36pes').preco).toBe(250);
  });

  it('calcula preco por pessoa com faixa exata', () => {
    const kit = getServicoPorId('kit-churrasco-simples')!;
    // 5 pessoas: R$150/pessoa = R$750
    expect(calcularPrecoServico(kit, 5, 'ate36pes').preco).toBe(750);
    // 10 pessoas: R$125/pessoa = R$1250
    expect(calcularPrecoServico(kit, 10, 'ate36pes').preco).toBe(1250);
    // 25 pessoas: R$100/pessoa = R$2500
    expect(calcularPrecoServico(kit, 25, 'ate36pes').preco).toBe(2500);
  });

  it('usa ultima faixa para mais de 25 pessoas', () => {
    const kit = getServicoPorId('kit-churrasco-simples')!;
    // 30 pessoas: R$100/pessoa (faixa 21-25) = R$3000
    expect(calcularPrecoServico(kit, 30, 'ate36pes').preco).toBe(3000);
  });

  it('cobra minimo de pessoas quando abaixo da faixa', () => {
    const openBar = getServicoPorId('open-bar-basico')!;
    // Open bar comeca em 7, entao 5 pessoas cobra por 7
    const result = calcularPrecoServico(openBar, 5, 'ate36pes');
    expect(result.preco).not.toBeNull();
    expect(result.cobrancaMinima).toBe(7);
  });

  it('calcula preco por embarcacao corretamente', () => {
    const festa = getServicoPorId('kit-festa-decoracao-premium')!;
    expect(calcularPrecoServico(festa, 10, 'ate36pes').preco).toBe(1850);
    expect(calcularPrecoServico(festa, 10, 'ate50pes').preco).toBe(2500);
  });

  it('retorna consultar para embarcacao acima de 50 pes', () => {
    const festa = getServicoPorId('kit-festa-decoracao-premium')!;
    const result = calcularPrecoServico(festa, 10, 'acima50pes');
    expect(result.consultar).toBe(true);
    expect(result.preco).toBeNull();
  });

  it('nao consultar para servicos fixos com acima50pes', () => {
    const dj = getServicoPorId('dj-com-equipamento')!;
    const result = calcularPrecoServico(dj, 10, 'acima50pes');
    expect(result.consultar).toBe(false);
    expect(result.preco).toBe(1500);
  });
});

describe('getPrecoMinimo', () => {
  it('retorna preco fixo para servicos fixos', () => {
    const dj = getServicoPorId('dj-com-equipamento')!;
    expect(getPrecoMinimo(dj)).toBe(1500);
  });

  it('retorna menor valor por pessoa (ultima faixa)', () => {
    const kit = getServicoPorId('kit-churrasco-simples')!;
    expect(getPrecoMinimo(kit)).toBe(100);
  });

  it('retorna preco ate36pes para por_embarcacao', () => {
    const festa = getServicoPorId('kit-festa-decoracao-premium')!;
    expect(getPrecoMinimo(festa)).toBe(1850);
  });
});

describe('getMinimoConvidados', () => {
  it('retorna 0 para servicos fixos', () => {
    const dj = getServicoPorId('dj-com-equipamento')!;
    expect(getMinimoConvidados(dj)).toBe(0);
  });

  it('retorna min da primeira faixa para por_pessoa', () => {
    const kit = getServicoPorId('kit-churrasco-simples')!;
    expect(getMinimoConvidados(kit)).toBe(5);

    const openBar = getServicoPorId('open-bar-basico')!;
    expect(getMinimoConvidados(openBar)).toBe(7);
  });
});

describe('calcularSimulacao', () => {
  it('calcula total com multiplos servicos', () => {
    const kit = getServicoPorId('kit-churrasco-simples')!;
    const dj = getServicoPorId('dj-com-equipamento')!;

    const resultado = calcularSimulacao([kit, dj], 10, 'ate36pes');

    // kit: 10 * 125 = 1250, dj: 1500 → total 2750
    expect(resultado.total).toBe(2750);
    expect(resultado.itens).toHaveLength(2);
    expect(resultado.valorPorPessoa).toBe(275);
  });

  it('marca churrasqueira como inclusa quando tem pacote de churrasco', () => {
    const churrasqueira = getServicoPorId('utilizacao-churrasqueira')!;
    const kit = getServicoPorId('kit-churrasco-simples')!;

    const resultado = calcularSimulacao([churrasqueira, kit], 10, 'ate36pes');

    expect(resultado.churrasqueiraInclusa).toBe(true);
    // Churrasqueira deve ter preco 0
    const itemChurr = resultado.itens.find(
      (i) => i.servico.id === 'utilizacao-churrasqueira',
    );
    expect(itemChurr?.preco).toBe(0);
    // Total deve ser so o kit: 10 * 125 = 1250
    expect(resultado.total).toBe(1250);
  });

  it('avisa quando combo + churrasco individual sao selecionados juntos', () => {
    const combo = getServicoPorId('combo-churrasco-openbar-basico')!;
    const churrasco = getServicoPorId('churrasco-com-acompanhamentos')!;

    const resultado = calcularSimulacao([combo, churrasco], 10, 'ate36pes');

    expect(resultado.avisoKeys.length).toBeGreaterThan(0);
    expect(resultado.avisoKeys[0]).toContain('combo');
  });

  it('avisa quando combo + open bar individual sao selecionados juntos', () => {
    const combo = getServicoPorId('combo-churrasco-openbar-basico')!;
    const openBar = getServicoPorId('open-bar-basico')!;

    const resultado = calcularSimulacao([combo, openBar], 10, 'ate36pes');

    expect(resultado.avisoKeys.some((a) => a.includes('Openbar'))).toBe(true);
  });

  it('retorna totais zerados sem servicos', () => {
    const resultado = calcularSimulacao([], 10, 'ate36pes');

    expect(resultado.total).toBe(0);
    expect(resultado.valorPorPessoa).toBe(0);
    expect(resultado.itens).toHaveLength(0);
  });

  it('lida com servico por embarcacao', () => {
    const festa = getServicoPorId('kit-festa-decoracao-premium')!;

    const r36 = calcularSimulacao([festa], 10, 'ate36pes');
    expect(r36.total).toBe(1850);

    const r50 = calcularSimulacao([festa], 10, 'ate50pes');
    expect(r50.total).toBe(2500);
  });

  it('marca temConsultar quando embarcacao acima de 50 pes', () => {
    const festa = getServicoPorId('kit-festa-decoracao-premium')!;

    const resultado = calcularSimulacao([festa], 10, 'acima50pes');
    expect(resultado.temConsultar).toBe(true);
    expect(resultado.itens[0].consultar).toBe(true);
    expect(resultado.itens[0].preco).toBe(0);
  });

  it('marca cobrancaMinima quando abaixo do minimo', () => {
    const openBar = getServicoPorId('open-bar-basico')!;

    const resultado = calcularSimulacao([openBar], 5, 'ate36pes');
    expect(resultado.itens[0].cobrancaMinima).toBe(7);
    expect(resultado.total).toBeGreaterThan(0);
  });
});
