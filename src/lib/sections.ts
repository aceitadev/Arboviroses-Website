/** Estrutura ordenada da narrativa e vínculos de navegação. */

export const SECTION_IDS = [
  'abertura',
  'problema',
  'ideia',
  'como-funciona',
  'mapa',
  'previsao',
  'entrega',
  'limitacoes',
  'sobre',
  'encerramento',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const SECTION_COUNT = SECTION_IDS.length;

export function sectionIndex(id: SectionId): number {
  return SECTION_IDS.indexOf(id);
}

export interface NavLink {
  id: SectionId;
  label: string;
}

/** Navegação mínima pedida: Projeto, Funcionamento, Mapa, Previsão, Equipe. */
export const NAV_LINKS: readonly NavLink[] = [
  { id: 'ideia', label: 'Projeto' },
  { id: 'como-funciona', label: 'Funcionamento' },
  { id: 'mapa', label: 'Mapa' },
  { id: 'previsao', label: 'Previsão' },
  { id: 'sobre', label: 'Equipe' },
];
