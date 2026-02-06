import type { Servico } from '../types/servico.ts';
import type { TamanhoEmbarcacao, ResultadoSimulacao } from '../utils/calcularSimulacao.ts';
import { SimulationContent } from './SimulationContent.tsx';
import type { createT } from '../i18n.ts';

interface SimulationPanelProps {
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

export function SimulationPanel(props: SimulationPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-border-light shadow-md p-5 sticky top-16">
      <SimulationContent {...props} />
    </div>
  );
}
