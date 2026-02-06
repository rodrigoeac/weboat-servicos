import type { Idioma } from '../i18n.ts';
import type { createT } from '../i18n.ts';

interface HeroProps {
  t: ReturnType<typeof createT>;
  idioma: Idioma;
  onIdiomaChange: (idioma: Idioma) => void;
}

const IDIOMAS: { id: Idioma; label: string }[] = [
  { id: 'pt', label: 'PT' },
  { id: 'en', label: 'EN' },
  { id: 'es', label: 'ES' },
];

export function Hero({ t, idioma, onIdiomaChange }: HeroProps) {
  return (
    <section className="bg-ocean-deep text-white py-10 px-6 lg:py-14">
      <div className="max-w-5xl mx-auto">
        {/* Top bar: logo + language switcher */}
        <div className="flex items-center justify-between mb-6">
          <img
            src="/logo.svg"
            alt="WeBoat Brasil"
            className="h-8 lg:h-10"
          />
          <div className="flex gap-1">
            {IDIOMAS.map((lang) => (
              <button
                key={lang.id}
                onClick={() => onIdiomaChange(lang.id)}
                className={`
                  px-2.5 py-1 rounded font-heading text-xs font-medium transition-colors
                  ${idioma === lang.id
                    ? 'bg-white text-ocean-deep'
                    : 'bg-white/15 text-white/70 hover:bg-white/25'}
                `}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
        {/* Heading */}
        <div className="text-center">
          <h1 className="font-display font-bold text-3xl lg:text-4xl mb-3">
            {t('hero.title')}
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}
