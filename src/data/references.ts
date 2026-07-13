/**
 * Referências científicas em formato compacto (sem URLs longas no corpo).
 * `source` é o rótulo curto exibido; `detail` descreve o tipo de fonte.
 */

export interface Reference {
  source: string;
  detail: string;
}

export const references: readonly Reference[] = [
  {
    source: 'Ministério da Saúde',
    detail: 'Boletins e orientações sobre arboviroses no Brasil.',
  },
  {
    source: 'InfoDengue',
    detail: 'Dados de alerta e séries históricas de casos por município.',
  },
  {
    source: 'Scientific Reports',
    detail: 'Estudos sobre modelagem climática e transmissão de arboviroses.',
  },
  {
    source: 'Acta Tropica',
    detail: 'Pesquisas sobre ecologia do Aedes aegypti e fatores ambientais.',
  },
];
