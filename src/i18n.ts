export type Idioma = 'pt' | 'en' | 'es';

const translations = {
  // Hero
  'hero.title': {
    pt: 'Servicos para seu Evento no Mar',
    en: 'Services for Your Event at Sea',
    es: 'Servicios para tu Evento en el Mar',
  },
  'hero.subtitle': {
    pt: 'Monte a experiencia perfeita para seu passeio de lancha. Selecione servicos, veja os detalhes e simule o custo total.',
    en: 'Build the perfect experience for your boat trip. Select services, view details and simulate the total cost.',
    es: 'Arma la experiencia perfecta para tu paseo en lancha. Selecciona servicios, ve los detalles y simula el costo total.',
  },

  // Categories
  'cat.todos': { pt: 'Todos', en: 'All', es: 'Todos' },
  'cat.churrasco': { pt: 'Churrasco', en: 'BBQ', es: 'Asado' },
  'cat.combo': { pt: 'Combos', en: 'Combos', es: 'Combos' },
  'cat.openbar': { pt: 'Open Bar', en: 'Open Bar', es: 'Open Bar' },
  'cat.mesa': { pt: 'Mesas', en: 'Boards', es: 'Mesas' },
  'cat.decoracao': { pt: 'Decoracao', en: 'Decoration', es: 'Decoracion' },
  'cat.entretenimento': { pt: 'Entretenimento', en: 'Entertainment', es: 'Entretenimiento' },

  // Service card
  'service.aPartirDe': { pt: 'a partir de', en: 'from', es: 'desde' },
  'service.porPessoa': { pt: '/pessoa', en: '/person', es: '/persona' },
  'service.minPessoas': { pt: 'min. {n} pessoas', en: 'min. {n} guests', es: 'min. {n} personas' },
  'service.selecionar': { pt: 'Selecionar', en: 'Select', es: 'Seleccionar' },
  'service.expandir': { pt: 'Expandir detalhes', en: 'Expand details', es: 'Expandir detalles' },
  'service.recolher': { pt: 'Recolher detalhes', en: 'Collapse details', es: 'Ocultar detalles' },
  'service.opcional': { pt: 'Opcional', en: 'Optional', es: 'Opcional' },
  'service.observacoes': { pt: 'Observacoes', en: 'Notes', es: 'Notas' },
  'service.cobrancaMinima': {
    pt: 'Cobranca minima de {n} pessoas sera aplicada',
    en: 'Minimum charge for {n} guests will apply',
    es: 'Se aplicara cargo minimo de {n} personas',
  },

  // Pricing table
  'pricing.valorServico': { pt: 'Valor do Servico', en: 'Service Price', es: 'Precio del Servicio' },
  'pricing.valoresPorPessoa': { pt: 'Valores por pessoa', en: 'Price per person', es: 'Precio por persona' },
  'pricing.valoresPorEmbarcacao': { pt: 'Valores por tamanho da embarcacao', en: 'Price by boat size', es: 'Precio por tamano de embarcacion' },
  'pricing.pessoas': { pt: 'pessoas', en: 'guests', es: 'personas' },
  'pricing.ate36': { pt: 'Ate 36 pes', en: 'Up to 36 feet', es: 'Hasta 36 pies' },
  'pricing.ate50': { pt: 'Ate 50 pes', en: 'Up to 50 feet', es: 'Hasta 50 pies' },
  'pricing.acima50': { pt: 'Acima de 50 pes', en: 'Over 50 feet', es: 'Mas de 50 pies' },
  'pricing.ate36detail': { pt: 'Bolo 15 fatias + 50 doces gourmet', en: '15-slice cake + 50 gourmet sweets', es: 'Pastel 15 porciones + 50 dulces gourmet' },
  'pricing.ate50detail': { pt: 'Bolo 20 fatias + 100 doces gourmet', en: '20-slice cake + 100 gourmet sweets', es: 'Pastel 20 porciones + 100 dulces gourmet' },
  'pricing.consultarValores': { pt: 'Consultar valores', en: 'Contact for pricing', es: 'Consultar precios' },

  // Simulation
  'sim.titulo': { pt: 'Simulador de Custo', en: 'Cost Simulator', es: 'Simulador de Costo' },
  'sim.convidados': { pt: 'Numero de convidados', en: 'Number of guests', es: 'Numero de invitados' },
  'sim.tamanhoEmbarcacao': { pt: 'Tamanho da embarcacao', en: 'Boat size', es: 'Tamano de embarcacion' },
  'sim.servicosSelecionados': { pt: 'Servicos selecionados', en: 'Selected services', es: 'Servicios seleccionados' },
  'sim.selecioneServicos': { pt: 'Selecione servicos ao lado para simular o custo', en: 'Select services to simulate the cost', es: 'Selecciona servicios para simular el costo' },
  'sim.incluso': { pt: 'Incluso', en: 'Included', es: 'Incluido' },
  'sim.churrasqueiraInclusa': { pt: 'Churrasqueira inclusa no pacote', en: 'Grill included in the package', es: 'Parrilla incluida en el paquete' },
  'sim.total': { pt: 'Total', en: 'Total', es: 'Total' },
  'sim.porPessoa': { pt: '/pessoa', en: '/person', es: '/persona' },
  'sim.servico': { pt: 'servico', en: 'service', es: 'servicio' },
  'sim.servicos': { pt: 'servicos', en: 'services', es: 'servicios' },
  'sim.verSimulacao': { pt: 'Ver simulacao', en: 'View estimate', es: 'Ver simulacion' },
  'sim.consultar': { pt: 'Consultar', en: 'Contact us', es: 'Consultar' },
  'sim.cobrancaMinima': { pt: 'min. {n} pax', en: 'min. {n} pax', es: 'min. {n} pax' },
  'sim.diminuir': { pt: 'Diminuir convidados', en: 'Decrease guests', es: 'Disminuir invitados' },
  'sim.aumentar': { pt: 'Aumentar convidados', en: 'Increase guests', es: 'Aumentar invitados' },

  // WhatsApp
  'whatsapp.falar': { pt: 'Falar no WhatsApp', en: 'Chat on WhatsApp', es: 'Hablar por WhatsApp' },
  'whatsapp.msgVazia': {
    pt: 'Ola! Gostaria de informacoes sobre os servicos adicionais para passeio de lancha.',
    en: 'Hello! I would like information about additional services for a boat trip.',
    es: 'Hola! Me gustaria informacion sobre los servicios adicionales para paseo en lancha.',
  },
  'whatsapp.msgIntro': {
    pt: 'Ola! Tenho interesse nos seguintes servicos para {n} convidados:',
    en: 'Hello! I am interested in the following services for {n} guests:',
    es: 'Hola! Me interesan los siguientes servicios para {n} invitados:',
  },
  'whatsapp.totalEstimado': { pt: 'Total estimado', en: 'Estimated total', es: 'Total estimado' },
  'whatsapp.maisInfo': {
    pt: 'Poderia me enviar mais informacoes?',
    en: 'Could you send me more information?',
    es: 'Podrian enviarme mas informacion?',
  },
  'whatsapp.consultar50pes': {
    pt: 'Obs: Kit Festa acima de 50 pes — consultar valores',
    en: 'Note: Party Kit over 50 feet — contact for pricing',
    es: 'Nota: Kit Fiesta mas de 50 pies — consultar precios',
  },

  // Footer
  'footer.marina': { pt: 'Marina da Gloria, Rio de Janeiro - RJ', en: 'Marina da Gloria, Rio de Janeiro - RJ', es: 'Marina da Gloria, Rio de Janeiro - RJ' },
  'footer.aviso': {
    pt: 'Valores sujeitos a alteracao. Acima de 25 pessoas, consulte.',
    en: 'Prices subject to change. For groups over 25, please inquire.',
    es: 'Precios sujetos a cambios. Para grupos de mas de 25, consulte.',
  },

  // Warnings
  'aviso.churrasqueiraInclusa': {
    pt: 'A taxa da churrasqueira ja esta inclusa no pacote de churrasco selecionado.',
    en: 'The grill fee is already included in the selected BBQ package.',
    es: 'La tarifa de la parrilla ya esta incluida en el paquete de asado seleccionado.',
  },
  'aviso.comboChurrasco': {
    pt: 'Voce selecionou um combo que ja inclui churrasco e tambem um pacote de churrasco separado.',
    en: 'You selected a combo that already includes BBQ and also a separate BBQ package.',
    es: 'Seleccionaste un combo que ya incluye asado y tambien un paquete de asado separado.',
  },
  'aviso.comboOpenbar': {
    pt: 'Voce selecionou um combo que ja inclui open bar e tambem um open bar separado.',
    en: 'You selected a combo that already includes open bar and also a separate open bar.',
    es: 'Seleccionaste un combo que ya incluye open bar y tambien un open bar separado.',
  },
} as const;

type TranslationKey = keyof typeof translations;

export function createT(idioma: Idioma) {
  return function t(key: TranslationKey, vars?: Record<string, string | number>): string {
    const entry = translations[key];
    if (!entry) return key;
    let text: string = entry[idioma] ?? entry['pt'];
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replaceAll(`{${k}}`, String(v));
      }
    }
    return text;
  };
}
