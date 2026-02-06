import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

const errorTexts = {
  'pt-BR': { title: 'Algo deu errado', body: 'Ocorreu um erro inesperado. Tente recarregar a pagina.', button: 'Recarregar' },
  en: { title: 'Something went wrong', body: 'An unexpected error occurred. Try reloading the page.', button: 'Reload' },
  es: { title: 'Algo salio mal', body: 'Ocurrio un error inesperado. Intenta recargar la pagina.', button: 'Recargar' },
} as const;

function getErrorText() {
  const lang = document.documentElement.lang;
  return errorTexts[lang as keyof typeof errorTexts] ?? errorTexts['pt-BR'];
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      const txt = getErrorText();
      return (
        <div className="min-h-screen flex items-center justify-center bg-sand-white p-8">
          <div className="text-center max-w-md">
            <h1 className="font-display text-2xl font-bold text-ocean-deep mb-4">
              {txt.title}
            </h1>
            <p className="font-body text-driftwood mb-6">
              {txt.body}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="font-heading font-semibold px-6 py-3 bg-ocean-deep text-white rounded-lg hover:bg-wave-blue transition-colors"
            >
              {txt.button}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
