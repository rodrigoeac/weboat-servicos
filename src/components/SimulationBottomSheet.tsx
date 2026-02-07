import { useState, useRef, useEffect } from 'react';
import type { Servico } from '../types/servico.ts';
import type { TamanhoEmbarcacao, ResultadoSimulacao } from '../utils/calcularSimulacao.ts';
import { formatCurrency } from '../utils/formatCurrency.ts';
import { SimulationContent } from './SimulationContent.tsx';
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
  onLimpar: () => void;
  t: ReturnType<typeof createT>;
}

export function SimulationBottomSheet({
  resultado,
  t,
  ...contentProps
}: SimulationBottomSheetProps) {
  const [expandido, setExpandido] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!expandido) {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement;

    const sheet = sheetRef.current;
    if (!sheet) return;

    const focusFirst = () => {
      const focusable = sheet.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable[0]?.focus();
    };
    focusFirst();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandido(false);
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = sheet.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    sheet.addEventListener('keydown', handleKeyDown);
    return () => sheet.removeEventListener('keydown', handleKeyDown);
  }, [expandido]);

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
        ref={sheetRef}
        role={expandido ? 'dialog' : undefined}
        aria-modal={expandido ? true : undefined}
        aria-label={expandido ? t('sim.titulo') : undefined}
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
          <div className="px-5 pb-5">
            <SimulationContent
              {...contentProps}
              resultado={resultado}
              t={t}
            />
          </div>
        )}
      </div>
    </div>
  );
}
