import { Hero } from './components/Hero.tsx';
import { CategoryNav } from './components/CategoryNav.tsx';
import { ServicesCatalog } from './components/ServicesCatalog.tsx';
import { SimulationPanel } from './components/SimulationPanel.tsx';
import { SimulationBottomSheet } from './components/SimulationBottomSheet.tsx';
import { Footer } from './components/Footer.tsx';
import { useSimulacao } from './hooks/useSimulacao.ts';

export default function App() {
  const {
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
  } = useSimulacao();

  return (
    <div className="min-h-screen bg-sand-white flex flex-col">
      <Hero t={t} idioma={idioma} onIdiomaChange={setIdioma} />
      <CategoryNav
        categoriaAtiva={categoriaAtiva}
        onSelect={setCategoriaAtiva}
        t={t}
      />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 lg:px-6">
        <div className="lg:flex lg:gap-6">
          {/* Catalog — 2/3 on desktop */}
          <div className="lg:w-2/3">
            <ServicesCatalog
              categoriaAtiva={categoriaAtiva}
              servicosSelecionadosIds={servicosSelecionadosIds}
              numConvidados={numConvidados}
              servicos={servicosTraduzidos}
              onToggle={toggleServico}
              t={t}
            />
          </div>

          {/* Sidebar — 1/3 on desktop */}
          <aside className="hidden lg:block lg:w-1/3">
            <SimulationPanel
              numConvidados={numConvidados}
              tamanhoEmbarcacao={tamanhoEmbarcacao}
              resultado={resultado}
              servicosSelecionados={servicosSelecionados}
              temKitFesta={temKitFesta}
              onIncrementar={incrementarConvidados}
              onDecrementar={decrementarConvidados}
              onConvidadosChange={handleConvidadosChange}
              onTamanhoChange={setTamanhoEmbarcacao}
              t={t}
            />
          </aside>
        </div>
      </main>

      {/* Bottom padding on mobile to account for bottom sheet */}
      <div className="h-20 lg:hidden" />

      <Footer t={t} />

      {/* Mobile bottom sheet */}
      <SimulationBottomSheet
        numConvidados={numConvidados}
        tamanhoEmbarcacao={tamanhoEmbarcacao}
        resultado={resultado}
        servicosSelecionados={servicosSelecionados}
        temKitFesta={temKitFesta}
        onIncrementar={incrementarConvidados}
        onDecrementar={decrementarConvidados}
        onConvidadosChange={handleConvidadosChange}
        onTamanhoChange={setTamanhoEmbarcacao}
        t={t}
      />
    </div>
  );
}
