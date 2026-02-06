import type { CategoriaServico } from '../types/servico.ts';
import { CATEGORIAS } from '../constants.ts';
import type { createT } from '../i18n.ts';

interface CategoryNavProps {
  categoriaAtiva: CategoriaServico | null;
  onSelect: (cat: CategoriaServico | null) => void;
  t: ReturnType<typeof createT>;
}

function handleCategoryClick(cat: CategoriaServico | null, onSelect: (cat: CategoriaServico | null) => void) {
  onSelect(cat);
  if (cat) {
    setTimeout(() => {
      document.getElementById(`cat-${cat}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}

export function CategoryNav({ categoriaAtiva, onSelect, t }: CategoryNavProps) {
  return (
    <nav className="sticky top-0 z-20 bg-sand-white/95 backdrop-blur-sm border-b border-border-light py-3 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button
            onClick={() => handleCategoryClick(null, onSelect)}
            className={`
              shrink-0 px-4 py-2 rounded-full font-heading text-sm font-medium transition-colors
              ${categoriaAtiva === null
                ? 'bg-ocean-deep text-white'
                : 'bg-pearl-gray text-driftwood hover:bg-border-light'}
            `}
          >
            {t('cat.todos')}
          </button>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id, onSelect)}
              className={`
                shrink-0 px-4 py-2 rounded-full font-heading text-sm font-medium transition-colors
                ${categoriaAtiva === cat.id
                  ? 'bg-ocean-deep text-white'
                  : 'bg-pearl-gray text-driftwood hover:bg-border-light'}
              `}
            >
              {t(`cat.${cat.id}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
