/**
 * Fonte única da paleta do projeto (usada em Tailwind, CSS, SVG e Three.js).
 * Relaciona-se a saúde pública, clima, dados e prevenção. Contraste verificado
 * para texto AA sobre o fundo claro.
 */
export const palette = {
  /** Fundo principal branco levemente azulado. */
  bg: '#F4F7FB',
  /** Fundo um tom mais profundo, para blocos e profundidade sutil. */
  bgDeep: '#E7EEF6',
  /** Superfície de cartões/painéis. */
  surface: '#FFFFFF',
  /** Texto principal: azul-petróleo escuro. */
  ink: '#12303F',
  /** Texto secundário. */
  inkSoft: '#41586A',
  /** Texto auxiliar/legendas. */
  inkFaint: '#6C8194',
  /** Azul científico para destaques e ações. */
  science: '#1E6FB8',
  /** Azul científico profundo (hover/ativo). */
  scienceDeep: '#134B80',
  /** Amarelo suave: temperatura e alertas leves. */
  temp: '#E4B23C',
  /** Azul-claro: chuva/precipitação. */
  rain: '#79ADD6',
  /** Coral/vermelho: apenas áreas de risco. */
  risk: '#DC4E2A',
  /** Coral suave translúcido (preenchimento de zona de risco ilustrativa). */
  riskSoft: 'rgba(220, 78, 42, 0.16)',
  /** Verde discreto: prevenção/estabilidade. */
  prevent: '#3E9C7A',
  /** Linhas/bordas sutis. */
  line: '#D4E0EC',
} as const;

export type PaletteKey = keyof typeof palette;
