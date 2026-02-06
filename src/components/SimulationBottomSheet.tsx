import { useState } from 'react';
import type { Servico } from '../types/servico.ts';
import type { TamanhoEmbarcacao, ResultadoSimulacao } from '../utils/calcularSimulacao.ts';
import { TAMANHOS_EMBARCACAO } from '../constants.ts';
import { formatCurrency } from '../utils/formatCurrency.ts';
import { WhatsAppCTA } from './WhatsAppCTA.tsx';
import type { createT } from '../i18n.ts';

interface SimulationBottomSheetProps {
  numConvidados: number;
  tamanhoEmbarcacao: TamanhoEmbarcacao;
  resultado: ResultadoSimulacao;
  servicosSelecionados: Servico[];
  temKitFesta: boolean;
  onIncrementar: () => void;
  onDecrementar: () => void;
  onConvidadosChange: (value: number) => void;
  onTamanhoChange: (t: TamanhoEmbarcacao) => void;
  t: ReturnType<typeof createT>;
}

export function SimulationBottomSheet({
  numConvidados,
  tamanhoEmbarcacao,
  resultado,
  servicosSelecionados,
  temKitFesta,
  onIncrementar,
  onDecrementar,
  onConvidadosChange,
  onTamanhoChange,
  t,
}: SimulationBottomSheetProps) {
  const [expandido, setExpandido] = useState(false);

  const temServicos = resultado.itens.length > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden">
      {/* Overlay */}
      {expandido && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setExpandido(false)}
        />
      )}

      {/* Sheet */}
      <div
        className={`
          relative z-40 rounded-t-2xl shadow-xl border-t
          transition-all duration-300
          ${expandido
            ? 'bg-white border-border-light max-h-[85vh] overflow-y-auto animate-slideUpSheet'
            : temServicos
              ? 'bg-ocean-deep border-ocean-deep'
              : 'bg-white border-border-light'}
        `}
      >
        {/* Collapsed bar */}
        <button
          onClick={() => setExpandido(!expandido)}
          className="w-full px-5 py-3.5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className={`w-8 h-1 rounded-full block ${expandido || !temServicos ? 'bg-border-light' : 'bg-white/30'}`} />
            {!expandido && temServicos && (
              <span className="font-heading text-sm font-medium text-white/90">
                {t('sim.verSimulacao')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            {temServicos && (
              <>
                <span className={`font-body text-sm ${expandido ? 'text-driftwood' : 'text-white/70'}`}>
                  {resultado.itens.length} {resultado.itens.length !== 1 ? t('sim.servicos') : t('sim.servico')}
                </span>
                <span className={`font-display font-bold text-lg ${expandido ? 'text-ocean-deep' : 'text-white'}`}>
                  {formatCurrency(resultado.total)}
                </span>
              </>
            )}
            <svg
              className={`w-5 h-5 transition-transform duration-250 ${expandido ? 'rotate-180 text-driftwood' : temServicos ? 'text-white/70' : 'text-driftwood'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </button>

        {/* Expanded content */}
        {expandido && (
          <div className="px-5 pb-5 space-y-4 animate-fadeIn">
            <h2 className="font-display font-bold text-lg text-ocean-deep">
              {t('sim.titulo')}
            </h2>

            {/* Guest count */}
            <div>
              <label className="font-heading text-sm font-medium text-charcoal block mb-2">
                {t('sim.convidados')}
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={onDecrementar}
                  className="w-10 h-10 rounded-lg bg-pearl-gray text-ocean-deep font-bold text-xl flex items-center justify-center"
                  aria-label={t('sim.diminuir')}
                >
                  -
                </button>
                <input
                  type="number"
                  value={numConvidados}
                  onChange={(e) => onConvidadosChange(Number(e.target.value))}
                  className="w-16 h-10 text-center font-heading font-semibold text-ocean-deep border border-border-light rounded-lg outline-none"
                  min={5}
                  max={50}
                />
                <button
                  onClick={onIncrementar}
                  className="w-10 h-10 rounded-lg bg-pearl-gray text-ocean-deep font-bold text-xl flex items-center justify-center"
                  aria-label={t('sim.aumentar')}
                >
                  +
                </button>
              </div>
            </div>

            {/* Boat size */}
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
                          : 'bg-pearl-gray text-driftwood'}
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

            {/* Selected services */}
            {temServicos && (
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

                {resultado.churrasqueiraInclusa && (
                  <p className="font-body text-xs text-success italic">
                    {t('sim.churrasqueiraInclusa')}
                  </p>
                )}

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
            )}

            <WhatsAppCTA
              servicosSelecionados={servicosSelecionados}
              total={resultado.total}
              numConvidados={numConvidados}
              temConsultar={resultado.temConsultar}
              t={t}
            />
          </div>
        )}
      </div>
    </div>
  );
}
