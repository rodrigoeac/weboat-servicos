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

export function useSimulacao() {
  const [idioma, setIdioma] = useState<Idioma>('pt');
  const [numConvidados, setNumConvidados] = useState(CONVIDADOS_DEFAULT);
  const [servicosSelecionadosIds, setServicosSelecionadosIds] = useState<Set<string>>(
    new Set(),
  );
  const [tamanhoEmbarcacao, setTamanhoEmbarcacao] =
    useState<TamanhoEmbarcacao>('ate36pes');
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaServico | null>(null);

  const t = useMemo(() => createT(idioma), [idioma]);

  useEffect(() => {
    const langMap = { pt: 'pt-BR', en: 'en', es: 'es' } as const;
    document.documentElement.lang = langMap[idioma];
  }, [idioma]);

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
  };
}
