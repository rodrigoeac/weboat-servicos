import type { Idioma } from '../i18n.ts';
import type { createT } from '../i18n.ts';

interface HeroProps {
  t: ReturnType<typeof createT>;
  idioma: Idioma;
  onIdiomaChange: (idioma: Idioma) => void;
}

const IDIOMAS: { id: Idioma; flag: string; label: string }[] = [
  { id: 'pt', flag: '🇧🇷', label: 'Português' },
  { id: 'en', flag: '🇺🇸', label: 'English' },
  { id: 'es', flag: '🇪🇸', label: 'Español' },
];

export function Hero({ t, idioma, onIdiomaChange }: HeroProps) {
  const languagePills = (
    <div className="flex gap-1.5">
      {IDIOMAS.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onIdiomaChange(lang.id)}
          aria-label={lang.label}
          title={lang.label}
          className={`
            w-9 h-9 rounded-lg flex items-center justify-center text-xl leading-none transition-all
            ${idioma === lang.id
              ? 'bg-white/20 ring-2 ring-white scale-110'
              : 'bg-white/5 hover:bg-white/15 opacity-60 hover:opacity-100'}
          `}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );

  return (
    <section className="bg-ocean-deep text-white py-10 px-6 lg:py-14">
      <div className="max-w-5xl mx-auto relative">
        {/* Logo — always centered */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.svg"
            alt="WeBoat Brasil"
            className="h-8 lg:h-10"
          />
        </div>

        {/* Desktop language switcher — top right */}
        <div className="hidden lg:block absolute top-0 right-0">
          {languagePills}
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

        {/* Mobile language switcher — below heading */}
        <div className="flex justify-center mt-5 lg:hidden">
          {languagePills}
        </div>
      </div>
    </section>
  );
}
