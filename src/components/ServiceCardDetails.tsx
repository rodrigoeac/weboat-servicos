import type { Servico } from '../types/servico.ts';
import { PricingTable } from './PricingTable.tsx';
import type { createT } from '../i18n.ts';

interface ServiceCardDetailsProps {
  servico: Servico;
  t: ReturnType<typeof createT>;
}

export function ServiceCardDetails({ servico, t }: ServiceCardDetailsProps) {
  return (
    <div className="mt-4 space-y-4">
      {servico.secoes.map((secao) => (
        <div key={secao.titulo}>
          <h4 className="font-heading font-semibold text-sm text-wave-blue mb-2">
            {secao.titulo}
          </h4>
          <ul className="space-y-1 pl-4">
            {secao.itens.map((item) => (
              <li
                key={item}
                className="font-body text-sm text-charcoal relative before:content-['•'] before:absolute before:-left-3 before:text-wave-blue"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {servico.staff && (
        <div className="bg-wave-blue/10 rounded-lg px-4 py-2.5 text-center">
          <span className="font-heading text-sm font-medium text-wave-blue">
            {servico.staff.descricao}
          </span>
        </div>
      )}

      {servico.opcionais && servico.opcionais.length > 0 && (
        <div className="bg-warning-light border-l-4 border-warning rounded-r-lg px-4 py-2.5">
          <span className="font-heading text-xs font-semibold text-warning block mb-1">
            {t('service.opcional')}
          </span>
          {servico.opcionais.map((opt) => (
            <span key={opt} className="font-body text-sm text-charcoal block">
              {opt}
            </span>
          ))}
        </div>
      )}

      <PricingTable servico={servico} t={t} />

      {servico.observacoes && servico.observacoes.length > 0 && (
        <div className="bg-pearl-gray rounded-lg px-4 py-3">
          <span className="font-heading text-xs font-semibold text-driftwood block mb-1">
            {t('service.observacoes')}
          </span>
          {servico.observacoes.map((obs) => (
            <p key={obs} className="font-body text-xs text-driftwood">
              {obs}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
