import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Servico, CategoriaServico } from '../types/servico.ts';
import { servicos } from '../data/servicos.ts';
import {
  calcularSimulacao,
  type TamanhoEmbarcacao,
} from '../utils/calcularSimulacao.ts';
import { CONVIDADOS_DEFAULT, CONVIDADOS_MIN, CONVIDADOS_MAX } from '../constants.ts';
import { createT, type Idioma } from '../i18n.ts';
import { traduzirServico } from '../utils/traduzirServico.ts';

const validIds = new Set(servicos.map((s) => s.id));
const validTamanhos = new Set<TamanhoEmbarcacao>(['ate36pes', 'ate50pes', 'acima50pes']);
const validIdiomas = new Set<Idioma>(['pt', 'en', 'es']);

function readUrlState() {
  const params = new URLSearchParams(window.location.search);

  const lang = params.get('lang') as Idioma | null;
  const idioma: Idioma = lang && validIdiomas.has(lang) ? lang : 'pt';

  const g = Number(params.get('g'));
  const numConvidados = g >= CONVIDADOS_MIN && g <= CONVIDADOS_MAX ? g : CONVIDADOS_DEFAULT;

  const tam = params.get('tam') as TamanhoEmbarcacao | null;
  const tamanhoEmbarcacao: TamanhoEmbarcacao = tam && validTamanhos.has(tam) ? tam : 'ate36pes';

  const sRaw = params.get('s');
  const ids = sRaw ? sRaw.split(',').filter((id) => validIds.has(id)) : [];

  return { idioma, numConvidados, tamanhoEmbarcacao, ids: new Set(ids) };
}

export function useSimulacao() {
  const initial = useMemo(() => readUrlState(), []);

  const [idioma, setIdioma] = useState<Idioma>(initial.idioma);
  const [numConvidados, setNumConvidados] = useState(initial.numConvidados);
  const [servicosSelecionadosIds, setServicosSelecionadosIds] = useState<Set<string>>(
    initial.ids,
  );
  const [tamanhoEmbarcacao, setTamanhoEmbarcacao] =
    useState<TamanhoEmbarcacao>(initial.tamanhoEmbarcacao);
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaServico | null>(null);

  const t = useMemo(() => createT(idioma), [idioma]);

  useEffect(() => {
    const langMap = { pt: 'pt-BR', en: 'en', es: 'es' } as const;
    document.documentElement.lang = langMap[idioma];
  }, [idioma]);

  useEffect(() => {
    if (servicosSelecionadosIds.size === 0) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [servicosSelecionadosIds.size]);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (idioma !== 'pt') params.set('lang', idioma);
    if (numConvidados !== CONVIDADOS_DEFAULT) params.set('g', String(numConvidados));
    if (tamanhoEmbarcacao !== 'ate36pes') params.set('tam', tamanhoEmbarcacao);
    if (servicosSelecionadosIds.size > 0) params.set('s', [...servicosSelecionadosIds].join(','));

    const qs = params.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  }, [idioma, numConvidados, tamanhoEmbarcacao, servicosSelecionadosIds]);

  const servicosTraduzidos = useMemo(
    () => servicos.map((s) => traduzirServico(s, idioma)),
    [idioma],
  );

  const servicosSelecionados = useMemo(
    () => servicosTraduzidos.filter((s) => servicosSelecionadosIds.has(s.id)),
    [servicosTraduzidos, servicosSelecionadosIds],
  );

  const resultado = useMemo(
    () =>
      calcularSimulacao(servicosSelecionados, numConvidados, tamanhoEmbarcacao),
    [servicosSelecionados, numConvidados, tamanhoEmbarcacao],
  );

  const temKitFesta = servicosSelecionadosIds.has('kit-festa-decoracao-premium');

  const toggleServico = useCallback((servico: Servico) => {
    setServicosSelecionadosIds((prev) => {
      const next = new Set(prev);
      if (next.has(servico.id)) {
        next.delete(servico.id);
      } else {
        next.add(servico.id);
      }
      return next;
    });
  }, []);

  const incrementarConvidados = useCallback(() => {
    setNumConvidados((n) => Math.min(n + 1, CONVIDADOS_MAX));
  }, []);

  const decrementarConvidados = useCallback(() => {
    setNumConvidados((n) => Math.max(n - 1, CONVIDADOS_MIN));
  }, []);

  const limparSelecao = useCallback(() => {
    setServicosSelecionadosIds(new Set());
  }, []);

  const handleConvidadosChange = useCallback((value: number) => {
    const clamped = Math.max(CONVIDADOS_MIN, Math.min(CONVIDADOS_MAX, value));
    setNumConvidados(clamped);
  }, []);

  return {
    idioma,
    setIdioma,
    t,
    numConvidados,
    tamanhoEmbarcacao,
    categoriaAtiva,
    servicosSelecionadosIds,
    servicosSelecionados,
    servicosTraduzidos,
    resultado,
    temKitFesta,
    setTamanhoEmbarcacao,
    setCategoriaAtiva,
    toggleServico,
    incrementarConvidados,
    decrementarConvidados,
    handleConvidadosChange,
    limparSelecao,
  };
}
