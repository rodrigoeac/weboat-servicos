import { useState, useRef } from 'react';
import type { Servico } from '../types/servico.ts';
import { PremiumBadge } from './PremiumBadge.tsx';
import { ServiceCardDetails } from './ServiceCardDetails.tsx';
import { getPrecoMinimo, getMinimoConvidados } from '../utils/calcularSimulacao.ts';
import { formatCurrency } from '../utils/formatCurrency.ts';
import type { createT } from '../i18n.ts';

interface ServiceCardProps {
  servico: Servico;
  selecionado: boolean;
  numConvidados: number;
  onToggle: (servico: Servico) => void;
  t: ReturnType<typeof createT>;
}

export function ServiceCard({
  servico,
  selecionado,
  numConvidados,
  onToggle,
  t,
}: ServiceCardProps) {
  const [expandido, setExpandido] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!selecionado) {
      cardRef.current?.classList.remove('animate-selectPulse');
      // Force reflow to restart animation
      void cardRef.current?.offsetWidth;
      cardRef.current?.classList.add('animate-selectPulse');
    }
    onToggle(servico);
  };

  const minimoConvidados = getMinimoConvidados(servico);
  const abaixoMinimo = servico.tipo === 'por_pessoa' && minimoConvidados > 0 && numConvidados < minimoConvidados;

  const precoMinimo = getPrecoMinimo(servico);

  const precoLabel = (() => {
    if (servico.tipo === 'fixo') {
      return formatCurrency(servico.precoFixo!);
    }
    if (servico.tipo === 'por_embarcacao') {
      return `${t('service.aPartirDe')} ${formatCurrency(precoMinimo!)}`;
    }
    if (precoMinimo !== null) {
      return `${t('service.aPartirDe')} ${formatCurrency(precoMinimo)}${t('service.porPessoa')}`;
    }
    return '';
  })();

  return (
    <div
      ref={cardRef}
      className={`
        bg-white rounded-xl border transition-all duration-250
        ${selecionado ? 'border-ocean-deep shadow-lg ring-2 ring-ocean-deep/20' : 'border-border-light shadow-sm'}
        hover:-translate-y-1 hover:shadow-card-hover
      `}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={selecionado}
            onChange={handleToggle}
            className="mt-1 shrink-0 cursor-pointer"
            aria-label={`${t('service.selecionar')} ${servico.nome}`}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-heading font-semibold text-ocean-deep text-base leading-tight">
                {servico.nome}
              </h3>
              {servico.premium && <PremiumBadge />}
            </div>
            <p className="font-body text-sm text-driftwood mt-1">
              {precoLabel}
            </p>
            {minimoConvidados > 0 && (
              <p className="font-body text-xs text-driftwood mt-0.5">
                {t('service.minPessoas', { n: minimoConvidados })}
              </p>
            )}
          </div>
          <button
            onClick={() => setExpandido(!expandido)}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-pearl-gray transition-colors"
            aria-label={expandido ? t('service.recolher') : t('service.expandir')}
          >
            <svg
              className={`w-5 h-5 text-driftwood transition-transform duration-250 ${expandido ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Below-minimum note */}
        {abaixoMinimo && selecionado && (
          <p className="font-body text-xs text-warning mt-2">
            {t('service.cobrancaMinima', { n: minimoConvidados })}
          </p>
        )}

        {/* Expandable details with smooth animation */}
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: expandido ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden min-h-0">
            <ServiceCardDetails servico={servico} numConvidados={numConvidados} t={t} />
          </div>
        </div>
      </div>
    </div>
  );
}
