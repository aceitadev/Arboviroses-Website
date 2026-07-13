/**
 * Conteúdo textual do site (pt-BR). Centralizado para facilitar manutenção.
 * Edite aqui todos os títulos, subtítulos e parágrafos das seções.
 */

export const ILLUSTRATIVE_LABEL = 'Dados ilustrativos • Protótipo de apresentação';

export const site = {
  shortTitle: 'Arboviroses',
  brand: 'Arboviroses & ML',
  projectTitle: 'O Uso de Machine Learning para Auxiliar na Previsão de Arboviroses Urbanas',
  institution: 'EEB Jacó Anderle',
  group: 'Turma 208',
  city: 'Florianópolis',
  year: '2026',
} as const;

export const opening = {
  title: 'Arboviroses',
  subtitle: 'Como dados e Machine Learning podem ajudar a antecipar períodos de maior risco.',
  meta: 'Projeto de pesquisa • EEB Jacó Anderle • 2026',
  scrollHint: 'Role para começar',
  sceneAlt:
    'Cena tridimensional clara com uma pequena ilha abstrata, poucos mosquitos estilizados e leves elementos de chuva e temperatura em movimento lento.',
} as const;

export const problem = {
  eyebrow: 'O problema',
  title: 'Calor, chuva e cidades criam o cenário ideal.',
  body: 'Temperaturas elevadas e água acumulada favorecem a reprodução do Aedes aegypti. Quando os casos começam a crescer, muitas respostas públicas chegam depois que o surto já começou.',
  factors: [
    {
      key: 'chuva',
      label: 'Chuva',
      caption: 'Água parada vira criadouro para as larvas.',
    },
    {
      key: 'temperatura',
      label: 'Temperatura',
      caption: 'O calor acelera o ciclo de vida do mosquito.',
    },
    {
      key: 'casos',
      label: 'Casos registrados',
      caption: 'O histórico mostra quando a transmissão se intensifica.',
    },
  ],
  sceneAlt:
    'Chuva caindo sobre recipientes abstratos que acumulam água, temperatura subindo e mosquitos surgindo gradualmente.',
} as const;

export const idea = {
  eyebrow: 'A ideia do projeto',
  title: 'E se os sinais fossem identificados antes?',
  body: 'O projeto cruza dados climáticos e registros anteriores para encontrar padrões que podem passar despercebidos em uma análise comum.',
  pillars: [
    { label: 'Séries temporais', caption: 'Casos, temperatura e chuva organizados ao longo do tempo.' },
    { label: 'Relações', caption: 'Como uma variável antecede mudanças em outra.' },
    { label: 'Camadas', caption: 'Combinações de sinais que revelam tendências.' },
  ],
  sceneAlt:
    'Elementos de chuva, temperatura e casos convertidos em um fluxo de dados que entra em um núcleo central representando o modelo.',
} as const;

export const howItWorks = {
  eyebrow: 'Como funciona',
  title: 'Dos dados brutos a uma linha do tempo que faz sentido.',
  intro:
    'O caminho vai de registros desorganizados até uma série temporal estruturada, pronta para o modelo aprender.',
  steps: [
    {
      number: '01',
      title: 'Coleta',
      caption: 'Reunimos casos registrados, temperatura e chuva ao longo dos anos.',
      detail: 'Fontes públicas de saúde e clima, semana a semana.',
    },
    {
      number: '02',
      title: 'Preparação',
      caption: 'Limpeza, padronização e organização em séries temporais.',
      detail: 'Preenchemos falhas e alinhamos tudo na mesma escala de tempo.',
    },
    {
      number: '03',
      title: 'Treinamento',
      caption: 'O modelo aprende com o histórico e identifica padrões recorrentes.',
      detail: 'Usa defasagens de casos, sazonalidade e temperatura anterior.',
    },
    {
      number: '04',
      title: 'Validação',
      caption: 'Comparação entre previsão e valores observados.',
      detail: 'Avaliada por métricas como o Erro Absoluto Médio (MAE).',
    },
  ],
  sceneAlt:
    'Um conjunto desorganizado de pontos de dados se reorganiza em uma linha temporal estruturada ao longo de quatro etapas.',
} as const;

export const map = {
  eyebrow: 'Onde',
  title: 'Florianópolis, com foco no Norte da Ilha.',
  body: 'A escola fica em Canasvieiras, no Norte da Ilha. Por isso, damos destaque a essa região para mostrar como a visualização de risco poderia funcionar localmente.',
  disclaimer:
    'Esta visualização é demonstrativa e não representa um alerta epidemiológico oficial.',
  markerApproxNote: 'Marcador de Canasvieiras em posição aproximada.',
  legendTitle: 'Legenda',
  focusLabel: 'Norte da Ilha',
  card: {
    place: 'Canasvieiras',
    tag: 'Área demonstrativa',
    subtitle: 'Visualização ilustrativa de risco',
    note: 'Valores fictícios, apenas para demonstração.',
  },
  sceneAlt:
    'Representação estilizada da ilha de Florianópolis, com o Norte da Ilha destacado, um marcador em Canasvieiras e uma área de risco ilustrativa.',
} as const;

export const forecast = {
  eyebrow: 'Previsão',
  title: 'Observado e previsto, lado a lado.',
  body: 'A linha da previsão surge a partir do histórico. A faixa mais clara mostra a incerteza: o modelo trabalha com tendências, não com números exatos.',
  disclaimer: 'Dados ilustrativos para demonstração do funcionamento.',
  purpose:
    'O objetivo não é acertar exatamente quantos casos ocorrerão, mas indicar antecipadamente quando o risco começa a aumentar.',
  selectLabel: 'Escolha a arbovirose',
  series: {
    observed: 'Observado',
    predicted: 'Previsto pelo modelo',
    band: 'Faixa de incerteza',
    forecastZone: 'Trecho de previsão',
  },
  summaryLabel: 'Resumo do gráfico',
  tableCaptionPrefix: 'Tabela de dados ilustrativos de',
} as const;

export const delivers = {
  eyebrow: 'O que o modelo pode entregar',
  title: 'Um sinal de alerta que chega mais cedo.',
  items: [
    {
      title: 'Identificar tendências',
      caption: 'Perceber quando os casos começam a ganhar força.',
    },
    {
      title: 'Antecipar períodos de risco',
      caption: 'Sinalizar semanas em que o cenário fica mais favorável ao aumento.',
    },
    {
      title: 'Apoiar a ação',
      caption: 'Ajudar campanhas, fiscalização e controle do mosquito a agir antes.',
    },
  ],
  note: 'O modelo funciona como apoio à decisão. Ele não substitui análises epidemiológicas nem decisões de profissionais da saúde.',
  sceneAlt:
    'Fluxo de dados convergindo para um sinal de alerta antecipado, representado de forma sóbria.',
} as const;

export const limitations = {
  eyebrow: 'Limitações',
  title: 'Prever não é adivinhar.',
  intro: 'Transparência faz parte do método. Estes são os limites conhecidos do projeto:',
  points: [
    'O clima não é o único fator envolvido.',
    'Comportamento humano e condições urbanas também influenciam.',
    'A qualidade da previsão depende da qualidade dos dados.',
    'Eventos extremos podem reduzir a precisão.',
    'O projeto ainda precisa de testes e validações adicionais.',
  ],
} as const;

export const about = {
  eyebrow: 'Sobre o projeto',
  title: site.projectTitle,
  teamLabel: 'Integrantes',
  advisorLabel: 'Orientadora',
  institutionLabel: 'Instituição',
  referencesLabel: 'Referências',
  referencesNote: 'Fontes consultadas ao longo da pesquisa.',
} as const;

export const closing = {
  title: 'Antecipar tendências pode significar mais tempo para prevenir.',
  subtitle: 'Tecnologia, dados e saúde pública trabalhando juntos.',
  backToTop: 'Voltar ao início',
  sceneAlt:
    'Composição final reunindo a ilha, o fluxo de dados, uma curva de previsão, elementos climáticos e um mosquito estilizado e discreto.',
} as const;

export const nav = {
  brandAria: 'Arboviroses e Machine Learning — início',
  openMenu: 'Abrir menu de navegação',
  closeMenu: 'Fechar menu de navegação',
  menuLabel: 'Navegação principal',
  progressLabel: 'Progresso da narrativa',
  skipToContent: 'Pular para o conteúdo',
} as const;

export const fallback = {
  webglTitle: 'Versão simplificada',
  webglBody:
    'Seu dispositivo não pôde exibir a cena 3D, mas todo o conteúdo do projeto continua disponível abaixo.',
} as const;
