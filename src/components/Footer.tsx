import type { createT } from '../i18n.ts';

interface FooterProps {
  t: ReturnType<typeof createT>;
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-ocean-deep text-white/70 py-8 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-2">
        <p className="font-heading font-semibold text-white text-base">
          WeBoat Brasil
        </p>
        <p className="font-body text-sm">
          {t('footer.marina')}
        </p>
        <p className="font-body text-sm">
          {t('footer.aviso')}
        </p>
        <p className="font-body text-xs text-white/50 mt-4">
          &copy; {new Date().getFullYear()} WeBoat Brasil.
        </p>
      </div>
    </footer>
  );
}
