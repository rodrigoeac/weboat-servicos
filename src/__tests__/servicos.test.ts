import { describe, it, expect } from 'vitest';
import { servicos, getServicoPorId, getServicosPorCategoria } from '../data/servicos.ts';
import { CATEGORIAS } from '../constants.ts';

describe('servicos data', () => {
  it('tem exatamente 13 servicos', () => {
    expect(servicos).toHaveLength(13);
  });

  it('todos os servicos tem id unico', () => {
    const ids = servicos.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('todos os servicos tem pelo menos uma secao', () => {
    for (const s of servicos) {
      expect(s.secoes.length).toBeGreaterThan(0);
    }
  });

  it('servicos por_pessoa tem faixasPreco', () => {
    const porPessoa = servicos.filter((s) => s.tipo === 'por_pessoa');
    for (const s of porPessoa) {
      expect(s.faixasPreco).toBeDefined();
      expect(s.faixasPreco!.length).toBeGreaterThan(0);
    }
  });

  it('servicos fixos tem precoFixo', () => {
    const fixos = servicos.filter((s) => s.tipo === 'fixo');
    for (const s of fixos) {
      expect(s.precoFixo).toBeDefined();
      expect(s.precoFixo).toBeGreaterThan(0);
    }
  });

  it('servicos por_embarcacao tem precoPorEmbarcacao', () => {
    const porEmb = servicos.filter((s) => s.tipo === 'por_embarcacao');
    for (const s of porEmb) {
      expect(s.precoPorEmbarcacao).toBeDefined();
      expect(s.precoPorEmbarcacao!.ate36pes).toBeGreaterThan(0);
      expect(s.precoPorEmbarcacao!.ate50pes).toBeGreaterThan(0);
    }
  });

  it('faixas de preco estao em ordem crescente de min', () => {
    for (const s of servicos) {
      if (!s.faixasPreco) continue;
      for (let i = 1; i < s.faixasPreco.length; i++) {
        expect(s.faixasPreco[i].min).toBeGreaterThan(s.faixasPreco[i - 1].min);
      }
    }
  });

  it('servicos premium estao marcados corretamente', () => {
    const premiums = servicos.filter((s) => s.premium);
    const premiumIds = premiums.map((s) => s.id);
    expect(premiumIds).toContain('combo-churrasco-openbar-premium');
    expect(premiumIds).toContain('open-bar-premium');
    expect(premiumIds).toContain('mesa-snacks-premium');
    expect(premiumIds).toContain('kit-festa-decoracao-premium');
    expect(premiums).toHaveLength(4);
  });
});

describe('getServicoPorId', () => {
  it('encontra servico existente', () => {
    const s = getServicoPorId('dj-com-equipamento');
    expect(s).toBeDefined();
    expect(s!.nome).toBe('DJ com Equipamento de Som');
  });

  it('retorna undefined para id inexistente', () => {
    expect(getServicoPorId('nao-existe')).toBeUndefined();
  });
});

describe('getServicosPorCategoria', () => {
  it('filtra por categoria', () => {
    const churrascos = getServicosPorCategoria('churrasco');
    expect(churrascos.length).toBeGreaterThan(0);
    for (const s of churrascos) {
      expect(s.categoria).toBe('churrasco');
    }
  });

  it('todas as categorias definidas tem pelo menos um servico', () => {
    for (const cat of CATEGORIAS) {
      const lista = getServicosPorCategoria(cat.id);
      expect(lista.length).toBeGreaterThan(0);
    }
  });
});
