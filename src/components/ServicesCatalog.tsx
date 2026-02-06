import type { Servico, CategoriaServico } from '../types/servico.ts';
import { servicos } from '../data/servicos.ts';
import { CATEGORIAS } from '../constants.ts';
import { ServiceCard } from './ServiceCard.tsx';
import type { createT } from '../i18n.ts';

interface ServicesCatalogProps {
  categoriaAtiva: CategoriaServico | null;
  servicosSelecionadosIds: Set<string>;
  numConvidados: number;
  onToggle: (servico: Servico) => void;
  t: ReturnType<typeof createT>;
}

export function ServicesCatalog({
  categoriaAtiva,
  servicosSelecionadosIds,
  numConvidados,
  onToggle,
  t,
}: ServicesCatalogProps) {
  const categoriasFiltradas = categoriaAtiva
    ? CATEGORIAS.filter((c) => c.id === categoriaAtiva)
    : CATEGORIAS;

  return (
    <div className="space-y-8">
      {categoriasFiltradas.map((cat) => {
        const servicosCategoria = servicos.filter(
          (s) => s.categoria === cat.id,
        );
        if (servicosCategoria.length === 0) return null;

        return (
          <section key={cat.id} id={`cat-${cat.id}`}>
            <h2 className="font-display font-bold text-xl text-ocean-deep mb-4">
              {t(`cat.${cat.id}` as Parameters<typeof t>[0])}
            </h2>
            <div className="space-y-3">
              {servicosCategoria.map((servico) => (
                <ServiceCard
                  key={servico.id}
                  servico={servico}
                  selecionado={servicosSelecionadosIds.has(servico.id)}
                  numConvidados={numConvidados}
                  onToggle={onToggle}
                  t={t}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
