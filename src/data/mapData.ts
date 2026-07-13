/**
 * Geometria estilizada da Ilha de Florianópolis para uma visualização 2.5D.
 *
 * FONTE: silhueta simplificada à mão, inspirada no contorno público do município
 * (limites do IBGE / OpenStreetMap, dados abertos). NÃO é cartografia precisa —
 * serve apenas para reconhecimento visual da ilha, do Norte e de Canasvieiras.
 * O marcador de Canasvieiras está em POSIÇÃO APROXIMADA.
 */

export const MAP_VIEWBOX = '0 0 120 170';

/** Contorno principal da ilha (silhueta estilizada). */
export const ISLAND_PATH =
  'M58 6 L70 10 L80 20 L84 33 L80 45 L88 55 L92 66 L85 74 L90 84 L88 96 L82 110 L76 124 L66 140 L58 152 L52 160 L48 150 L46 136 L42 122 L38 108 L42 96 L34 86 L38 74 L30 62 L34 50 L40 38 L44 26 L50 14 Z';

/** Destaque do Norte da Ilha (recortado contra a ilha). */
export const NORTE_REGION_PATH =
  'M50 14 L58 6 L70 10 L80 20 L84 33 L80 45 L66 50 L50 50 L40 38 L44 26 Z';

/** Continente (contexto, ao oeste) — desenhado de forma discreta. */
export const MAINLAND_PATH = 'M0 38 L18 42 L23 68 L17 96 L21 122 L0 132 Z';

/** Pontes ligando o continente à ilha (linhas sutis). */
export const BRIDGES: ReadonlyArray<{ x1: number; y1: number; x2: number; y2: number }> = [
  { x1: 23, y1: 70, x2: 33, y2: 73 },
  { x1: 22, y1: 78, x2: 31, y2: 84 },
];

/** Lagoa da Conceição (referência de reconhecimento, a leste). */
export const LAGOA = { cx: 79, cy: 82, rx: 4.5, ry: 12 } as const;

/** Marcador de Canasvieiras — posição APROXIMADA na costa norte. */
export const CANASVIEIRAS_MARKER = { x: 60, y: 17 } as const;

/** Zona de risco ILUSTRATIVA (não é alerta oficial). */
export const RISK_ZONE = { cx: 62, cy: 31, rx: 15, ry: 11 } as const;

/** Valores FICTÍCIOS exibidos na ficha de Canasvieiras. */
export const CANASVIEIRAS_METRICS = {
  temperature: '28,4 °C',
  precipitation: '180 mm',
  trend: 'em leve alta',
} as const;
