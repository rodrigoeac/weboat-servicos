import type { Servico, SecaoServico } from '../types/servico.ts';
import type { Idioma } from '../i18n.ts';

function traduzirSecao(secao: SecaoServico, idioma: Idioma): SecaoServico {
  if (idioma === 'pt') return secao;

  const titulo = idioma === 'en'
    ? (secao.tituloEN ?? secao.titulo)
    : (secao.tituloES ?? secao.titulo);

  const itens = idioma === 'en'
    ? (secao.itensEN ?? secao.itens)
    : (secao.itensES ?? secao.itens);

  return { ...secao, titulo, itens };
}

export function traduzirServico(servico: Servico, idioma: Idioma): Servico {
  if (idioma === 'pt') return servico;

  const nome = idioma === 'en'
    ? (servico.nomeEN ?? servico.nome)
    : (servico.nomeES ?? servico.nome);

  const secoes = servico.secoes.map((s) => traduzirSecao(s, idioma));

  const staff = servico.staff
    ? {
        ...servico.staff,
        descricao: idioma === 'en'
          ? (servico.staff.descricaoEN ?? servico.staff.descricao)
          : (servico.staff.descricaoES ?? servico.staff.descricao),
      }
    : undefined;

  const opcionais = idioma === 'en'
    ? (servico.opcionaisEN ?? servico.opcionais)
    : (servico.opcionaisES ?? servico.opcionais);

  const observacoes = idioma === 'en'
    ? (servico.observacoesEN ?? servico.observacoes)
    : (servico.observacoesES ?? servico.observacoes);

  return { ...servico, nome, secoes, staff, opcionais, observacoes };
}
