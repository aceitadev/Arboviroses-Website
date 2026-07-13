/**
 * Conteúdo textual do site (pt-BR). Centralizado para facilitar manutenção.
 * Edite aqui todos os títulos, subtítulos e parágrafos das seções.
 */

export const ILLUSTRATIVE_LABEL = 'Dados ilustrativos • Protótipo de apresentação';

export const site = {
  shortTitle: 'Arboviroses',
  brand: 'Arboviroses',
  projectTitle: 'O Uso de Machine Learning para Auxiliar na Previsão de Arboviroses Urbanas',
  institution: 'EEB Jacó Anderle',
  group: 'Turma 208',
  city: 'Florianópolis',
  year: '2026',
  githubUrl: 'https://github.com/aceitadev/Arboviroses-AI',
  githubLabel: 'Ver modelo no GitHub',
} as const;

export const opening = {
  title: 'Arboviroses',
  tagline: 'Plataforma de Análise Epidemiológica & Inteligência Preditiva',
  subtitle:
    'Sinais climáticos e séries históricas transformados em indicadores antecipados de risco para a saúde pública.',
  meta: 'Projeto de Pesquisa Científica • EEB Jacó Anderle • Turma 208 • 2026',
  ctaPrimary: 'Explorar Previsão do Modelo',
  ctaGithub: 'Ver modelo no GitHub',
  scrollHint: 'Role para explorar o sistema',
  sceneAlt:
    'Cena tridimensional clara com uma pequena ilha abstrata, mosquitos estilizados anatômicos e leves elementos de chuva e temperatura em movimento lento.',
} as const;

export const problem = {
  eyebrow: 'O problema epidemiológico',
  title: 'Calor, precipitação e ambiente urbano criam o ciclo favorável ao surto.',
  body: 'Temperaturas elevadas e chuvas recorrentes aceleram o ciclo do Aedes aegypti. Quando os casos se tornam visíveis nos hospitais, a transmissão já está em pico. A intervenção pública requer sinais de alerta antecipados.',
  factors: [
    {
      key: 'chuva',
      label: 'Precipitação Pluvial',
      metric: 'Acumulado em mm',
      caption: 'Água parada no tecido urbano forma criadouros e eleva a densidade larval.',
    },
    {
      key: 'temperatura',
      label: 'Variação Térmica',
      metric: 'Média de temperatura (°C)',
      caption: 'O calor acelera a incubação viral no mosquito e encurta o ciclo reprodutivo.',
    },
    {
      key: 'casos',
      label: 'Série de Casos',
      metric: 'Notificações semanais',
      caption: 'O histórico epidemiológico reflete a dinâmica de contágio e suscetibilidade.',
    },
  ],
  sceneAlt:
    'Chuva caindo sobre recipientes abstratos que acumulam água, temperatura subindo e mosquitos surgindo gradualmente.',
} as const;

export const idea = {
  eyebrow: 'A proposta tecnológica',
  title: 'E se os sinais climáticos fossem identificados semanas antes do surto?',
  body: 'Nossa arquitetura combina séries temporais climáticas e históricas de saúde para identificar defasagens (lags) que precedem picos epidêmicos, transformando dados dispersos em suporte acionável à decisão.',
  pillars: [
    {
      label: 'Séries Temporais Alinhadas',
      tag: 'LAG CLIMÁTICO',
      caption: 'Organização estruturada de chuva, temperatura e casos na mesma resolução temporal.',
    },
    {
      label: 'Defasagem Temporal (Lags)',
      tag: 'ANTECIPAÇÃO',
      caption: 'Mapeamento de como o acúmulo térmico e hídrico antecede em semanas o aumento de casos.',
    },
    {
      label: 'Camadas Preditivas',
      tag: 'MACHINE LEARNING',
      caption: 'Reconhecimento automatizado de padrões sutilmente não-lineares nos dados observados.',
    },
  ],
  sceneAlt:
    'Elementos de chuva, temperatura e casos convertidos em um fluxo de dados que entra em um núcleo central representando o modelo.',
} as const;

export const howItWorks = {
  eyebrow: 'Arquitetura do sistema',
  title: 'Pipeline de processamento e aprendizado computacional.',
  intro:
    'Um fluxo de engenharia de dados em 4 fases transforma registros brutos em indicadores de alerta epidemiológico antecipado.',
  steps: [
    {
      number: '01',
      title: 'Coleta de Sinais',
      badge: 'INPUT BRUTO',
      caption: 'Reunião contínua de notificações epidemiológicas e dados agrometeorológicos.',
      detail: 'Séries históricas semanais de saúde pública e estações climáticas.',
    },
    {
      number: '02',
      title: 'Tratamento & Lags',
      badge: 'PREPROCESSAMENTO',
      caption: 'Harmonização de escalas temporais e cálculo de janelas de defasagem (lags de 2 a 4 semanas).',
      detail: 'Imputação de lacunas e normalização multivariada.',
    },
    {
      number: '03',
      title: 'Treinamento de ML',
      badge: 'MODELO',
      caption: 'O algoritmo aprende padrões de sazonalidade e sensibilidade térmica.',
      detail: 'Ajuste de hiperparâmetros e pesos das variáveis climáticas.',
    },
    {
      number: '04',
      title: 'Previsão & Incerteza',
      badge: 'OUTPUT PREDITIVO',
      caption: 'Projeção antecipada com banda explícita de intervalo de confiança.',
      detail: 'Avaliação quantitativa de desempenho (MAE / RMSE).',
    },
  ],
  sceneAlt:
    'Um conjunto desorganizado de pontos de dados se reorganiza em uma linha temporal estruturada ao longo de quatro etapas.',
} as const;

export const map = {
  eyebrow: 'Aplicação territorial',
  title: 'Monitoramento regional: Florianópolis & Norte da Ilha.',
  body: 'A instituição de pesquisa (EEB Jacó Anderle) localiza-se em Canasvieiras, Norte da Ilha. Apresentamos este recorte territorial para demonstrar como a plataforma de alerta pode ser contextualizada regionalmente.',
  disclaimer:
    'Esta visualização territorial é demonstrativa e não substitui os comunicados epidemiológicos oficiais da Vigilância em Saúde.',
  markerApproxNote: 'Marcador georreferenciado em Canasvieiras (posição ilustrativa).',
  legendTitle: 'Camadas de Risco',
  focusLabel: 'Norte da Ilha de Santa Catarina',
  card: {
    place: 'Canasvieiras • Norte da Ilha',
    tag: 'ÁREA DE VALIDAÇÃO DO PROTÓTIPO',
    subtitle: 'Painel Demonstrativo de Sensibilidade Climática',
    note: 'Valores e índices simulados para fins de demonstração acadêmica e tecnológica.',
  },
  sceneAlt:
    'Representação estilizada da ilha de Florianópolis, com o Norte da Ilha destacado, um marcador em Canasvieiras e uma área de risco ilustrativa.',
} as const;

export const forecast = {
  eyebrow: 'Módulo de previsão',
  title: 'Série observada vs. projeção preditiva.',
  body: 'A curva preditiva processa o histórico e projeta a tendência para o período subsequente. A faixa sombreada indica a incerteza estatística inerente à modelagem de sistemas biológicos.',
  disclaimer: 'Dados ilustrativos para demonstração do funcionamento técnico do modelo.',
  purpose:
    'O objetivo do modelo não é fornecer uma contagem pontual exata, mas sinalizar com antecedência a mudança de tendência e o gradiente de risco para apoiar ações preventivas.',
  selectLabel: 'Selecione a arbovirose analisada',
  series: {
    observed: 'Observado (Histórico)',
    predicted: 'Previsto pelo Modelo ML',
    band: 'Intervalo de Incerteza',
    forecastZone: 'Janela de Antecipação',
  },
  summaryLabel: 'Síntese de Projeção Epidemiológica',
  tableCaptionPrefix: 'Tabela de dados ilustrativos de',
} as const;

export const delivers = {
  eyebrow: 'Impacto e valor prático',
  title: 'Inteligência antecipada para a gestão de saúde pública.',
  items: [
    {
      title: 'Identificar Tendências Precoces',
      tag: 'ANÁLISE DE SÉRIE',
      caption: 'Detectar a inclinação positiva na taxa de infecção semanas antes da sobrecarga hospitalar.',
    },
    {
      title: 'Antecipar Períodos Críticos',
      tag: 'ALERTA CLIMÁTICO',
      caption: 'Sinalizar janelas temporais de alto risco combinando calor sustentado e acúmulo hídrico.',
    },
    {
      title: 'Apoiar Decisões de Bloqueio',
      tag: 'PREVENÇÃO ATIVA',
      caption: 'Fornecer base analítica para direcionar agentes de endemia e campanhas preventivas focadas.',
    },
  ],
  note: 'O sistema opera como ferramenta de suporte à decisão analítica. Não substitui o julgamento clínico nem as diretrizes da Vigilância Epidemiológica.',
  sceneAlt:
    'Fluxo de dados convergindo para um sinal de alerta antecipado, representado de forma sóbria.',
} as const;

export const limitations = {
  eyebrow: 'Transparência científica',
  title: 'Fronteiras e responsabilidade do modelo.',
  intro: 'O rigor científico exige clareza sobre o escopo e as limitações inerentes à modelagem preditiva:',
  points: [
    'Saneamento e determinantes sociais: Fatores de infraestrutura urbana não quantificados no clima afetam a incidência.',
    'Comportamento preventivo da população: Mobilizações locais de limpeza de criadouros alteram o ciclo natural.',
    'Qualidade e atraso de notificação: O modelo depende de registros epidemiológicos precisos e tempestivos.',
    'Anomalias climáticas extremas: Eventos meteorológicos atípicos podem aumentar o desvio padrão da previsão.',
    'Estágio de desenvolvimento: Protótipo de pesquisa escolar em processo contínuo de aprimoramento e validação.',
  ],
} as const;

export const about = {
  eyebrow: 'Sobre a pesquisa & código aberto',
  title: site.projectTitle,
  teamLabel: 'Pesquisadores & Integrantes',
  advisorLabel: 'Orientação',
  institutionLabel: 'Instituição & Turma',
  codeLabel: 'Código & Modelo Preditivo',
  codeDescription:
    'O código-fonte da aplicação, pipelines de dados e documentação técnica do modelo estão disponíveis publicamente em nosso repositório no GitHub.',
  referencesLabel: 'Referências Bibliográficas & Fontes de Dados',
  referencesNote: 'Bases científicas e governamentais consultadas durante a pesquisa.',
} as const;

export const closing = {
  title: 'Antecipar a tendência epidemiológica é ganhar tempo para salvar vidas.',
  subtitle: 'Ciência de dados, pesquisa escolar e tecnologia voltadas para a saúde pública.',
  backToTop: 'Voltar ao topo',
  ctaGithub: 'Ver código e modelo no GitHub',
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
  webglTitle: 'Modo de visualização otimizada',
  webglBody:
    'Seu dispositivo está operando no modo simplificado 2D. Todos os dados, gráficos e seções do projeto continuam plenamente interativos e acessíveis abaixo.',
} as const;
