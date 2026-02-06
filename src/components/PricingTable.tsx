import type { Servico } from '../types/servico.ts';
import { formatCurrency } from '../utils/formatCurrency.ts';
import type { createT } from '../i18n.ts';

interface PricingTableProps {
  servico: Servico;
  numConvidados?: number;
  t: ReturnType<typeof createT>;
}

export function PricingTable({ servico, numConvidados, t }: PricingTableProps) {
  if (servico.tipo === 'fixo') {
    return (
      <div className="bg-pearl-gray rounded-lg p-4">
        <div className="font-heading font-semibold text-ocean-deep text-sm mb-2">
          {t('pricing.valorServico')}
        </div>
        <div className="flex justify-between items-center bg-white rounded-md px-3 py-2">
          <span className="font-body text-sm text-charcoal">{servico.nome}</span>
          <span className="font-heading font-semibold text-ocean-deep">
            {formatCurrency(servico.precoFixo!)}
          </span>
        </div>
      </div>
    );
  }

  if (servico.tipo === 'por_embarcacao' && servico.precoPorEmbarcacao) {
    return (
      <div className="bg-pearl-gray rounded-lg p-4">
        <div className="font-heading font-semibold text-ocean-deep text-sm mb-2">
          {t('pricing.valoresPorEmbarcacao')}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center bg-white rounded-md px-3 py-2">
            <div>
              <span className="font-body text-sm text-charcoal">{t('pricing.ate36')}</span>
              <span className="block text-xs text-driftwood">
                {t('pricing.ate36detail')}
              </span>
            </div>
            <span className="font-heading font-semibold text-ocean-deep">
              {formatCurrency(servico.precoPorEmbarcacao.ate36pes)}
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-md px-3 py-2">
            <div>
              <span className="font-body text-sm text-charcoal">{t('pricing.ate50')}</span>
              <span className="block text-xs text-driftwood">
                {t('pricing.ate50detail')}
              </span>
            </div>
            <span className="font-heading font-semibold text-ocean-deep">
              {formatCurrency(servico.precoPorEmbarcacao.ate50pes)}
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-md px-3 py-2">
            <div>
              <span className="font-body text-sm text-charcoal">{t('pricing.acima50')}</span>
            </div>
            <span className="font-heading font-semibold text-wave-blue text-sm italic">
              {t('pricing.consultarValores')}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (servico.tipo === 'por_pessoa' && servico.faixasPreco) {
    return (
      <div className="bg-pearl-gray rounded-lg p-4">
        <div className="font-heading font-semibold text-ocean-deep text-sm mb-2">
          {t('pricing.valoresPorPessoa')}
        </div>
        <div className="space-y-1.5">
          {servico.faixasPreco.map((faixa) => {
            const isActive = numConvidados !== undefined && numConvidados >= faixa.min && numConvidados <= faixa.max;
            const isAboveMax = numConvidados !== undefined && faixa === servico.faixasPreco![servico.faixasPreco!.length - 1] && numConvidados > faixa.max;
            const highlight = isActive || isAboveMax;
            return (
            <div
              key={`${faixa.min}-${faixa.max}`}
              className={`flex justify-between items-center rounded-md px-3 py-2 transition-colors ${highlight ? 'bg-ocean-deep/10 ring-1 ring-ocean-deep/30' : 'bg-white'}`}
            >
              <span className="font-body text-sm text-charcoal">
                {faixa.min === faixa.max
                  ? `${String(faixa.min).padStart(2, '0')} ${t('pricing.pessoas')}`
                  : `${String(faixa.min).padStart(2, '0')}-${String(faixa.max).padStart(2, '0')} ${t('pricing.pessoas')}`}
              </span>
              <span className="font-heading font-semibold text-ocean-deep">
                {formatCurrency(faixa.valorPorPessoa)}
              </span>
            </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
