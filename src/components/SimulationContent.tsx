import { useState } from 'react';
import type { Servico } from '../types/servico.ts';
import type { TamanhoEmbarcacao, ResultadoSimulacao } from '../utils/calcularSimulacao.ts';
import { TAMANHOS_EMBARCACAO } from '../constants.ts';
import { formatCurrency } from '../utils/formatCurrency.ts';
import { WhatsAppCTA } from './WhatsAppCTA.tsx';
import { trackEvent } from '../utils/analytics.ts';
import type { createT } from '../i18n.ts';

interface SimulationContentProps {
  numConvidados: number;
  tamanhoEmbarcacao: TamanhoEmbarcacao;
  resultado: ResultadoSimulacao;
  servicosSelecionados: Servico[];
  temKitFesta: boolean;
  onIncrementar: () => void;
  onDecrementar: () => void;
  onConvidadosChange: (value: number) => void;
  onTamanhoChange: (t: TamanhoEmbarcacao) => void;
  onLimpar: () => void;
  t: ReturnType<typeof createT>;
}

export function SimulationContent({
  numConvidados,
  tamanhoEmbarcacao,
  resultado,
  servicosSelecionados,
  temKitFesta,
  onIncrementar,
  onDecrementar,
  onConvidadosChange,
  onTamanhoChange,
  onLimpar,
  t,
}: SimulationContentProps) {
  const [copiado, setCopiado] = useState(false);

  const handleCompartilhar = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
    trackEvent('share_link_click', {
      num_services: servicosSelecionados.length,
      num_guests: numConvidados,
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg text-ocean-deep">
          {t('sim.titulo')}
        </h2>
        {resultado.itens.length > 0 && (
          <button
            onClick={onLimpar}
            className="font-heading text-xs text-wave-blue hover:text-ocean-deep transition-colors"
          >
            {t('sim.limpar')}
          </button>
        )}
      </div>

      {/* Guest count */}
      <div>
        <label className="font-heading text-sm font-medium text-charcoal block mb-2">
          {t('sim.convidados')}
        </label>
        <div className="flex items-center gap-2" role="group" aria-label={t('sim.convidados')}>
          <button
            onClick={onDecrementar}
            className="w-10 h-10 rounded-lg bg-pearl-gray text-ocean-deep font-bold text-xl flex items-center justify-center hover:bg-border-light transition-colors"
            aria-label={t('sim.diminuir')}
          >
            -
          </button>
          <input
            type="number"
            value={numConvidados}
            onChange={(e) => onConvidadosChange(Number(e.target.value))}
            className="w-16 h-10 text-center font-heading font-semibold text-ocean-deep border border-border-light rounded-lg focus:border-ocean-deep focus:ring-1 focus:ring-ocean-deep outline-none"
            min={1}
            max={50}
            aria-live="polite"
          />
          <button
            onClick={onIncrementar}
            className="w-10 h-10 rounded-lg bg-pearl-gray text-ocean-deep font-bold text-xl flex items-center justify-center hover:bg-border-light transition-colors"
            aria-label={t('sim.aumentar')}
          >
            +
          </button>
        </div>
      </div>

      {/* Boat size (only when Kit Festa is selected) */}
      {temKitFesta && (
        <div>
          <label className="font-heading text-sm font-medium text-charcoal block mb-2">
            {t('sim.tamanhoEmbarcacao')}
          </label>
          <div className="flex gap-2">
            {TAMANHOS_EMBARCACAO.map((tam) => (
              <button
                key={tam.id}
                onClick={() => onTamanhoChange(tam.id)}
                className={`
                  flex-1 py-2 rounded-lg font-heading text-xs font-medium transition-colors
                  ${tamanhoEmbarcacao === tam.id
                    ? 'bg-ocean-deep text-white'
                    : 'bg-pearl-gray text-driftwood hover:bg-border-light'}
                `}
              >
                {t(tam.i18nKey)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {resultado.avisoKeys.length > 0 && (
        <div className="space-y-2">
          {resultado.avisoKeys.map((key) => (
            <div
              key={key}
              className="bg-warning-light border border-warning/30 rounded-lg px-3 py-2"
            >
              <p className="font-body text-xs text-warning">
                {t(key as Parameters<typeof t>[0])}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Selected services list */}
      {resultado.itens.length > 0 ? (
        <div className="space-y-2">
          <h3 className="font-heading text-sm font-medium text-driftwood">
            {t('sim.servicosSelecionados')}
          </h3>
          <div className="space-y-1.5">
            {resultado.itens.map((item) => (
              <div key={item.servico.id}>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-body text-charcoal truncate mr-2">
                    {item.servico.nome}
                  </span>
                  <span className="font-heading font-medium shrink-0">
                    {item.consultar ? (
                      <span className="text-wave-blue text-xs italic">
                        {t('sim.consultar')}
                      </span>
                    ) : item.preco === 0 ? (
                      <span className="text-success text-xs">
                        {t('sim.incluso')}
                      </span>
                    ) : (
                      <span className="text-ocean-deep">
                        {formatCurrency(item.preco)}
                      </span>
                    )}
                  </span>
                </div>
                {item.cobrancaMinima !== null && (
                  <p className="font-body text-xs text-warning mt-0.5">
                    {t('sim.cobrancaMinima', { n: item.cobrancaMinima })}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Churrasqueira status */}
          {resultado.churrasqueiraInclusa && (
            <p className="font-body text-xs text-success italic">
              {t('sim.churrasqueiraInclusa')}
            </p>
          )}

          {/* Divider + totals */}
          <div className="border-t border-border-light pt-3 mt-3 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-heading font-bold text-ocean-deep">
                {t('sim.total')}
              </span>
              <span className="font-display font-bold text-2xl text-ocean-deep">
                {formatCurrency(resultado.total)}
              </span>
            </div>
            <p className="font-body text-xs text-driftwood text-right">
              {formatCurrency(Math.round(resultado.valorPorPessoa))}{t('sim.porPessoa')}
            </p>
            {resultado.temConsultar && (
              <p className="font-body text-xs text-wave-blue italic text-right">
                + {t('pricing.consultarValores')}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="font-body text-sm text-driftwood text-center py-4">
          {t('sim.selecioneServicos')}
        </p>
      )}

      {/* WhatsApp CTA */}
      <WhatsAppCTA
        servicosSelecionados={servicosSelecionados}
        total={resultado.total}
        numConvidados={numConvidados}
        temConsultar={resultado.temConsultar}
        t={t}
      />

      {/* Share link button */}
      <button
        onClick={handleCompartilhar}
        className="
          flex items-center justify-center gap-2 w-full
          border border-ocean-deep text-ocean-deep
          font-heading font-medium text-sm
          py-2.5 px-4 rounded-xl
          hover:bg-ocean-deep/5 transition-colors
        "
      >
        {copiado ? (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {t('sim.linkCopiado')}
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {t('sim.compartilhar')}
          </>
        )}
      </button>
    </div>
  );
}
