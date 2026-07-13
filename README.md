# Arboviroses & Machine Learning

Site institucional 3D, **mobile-first**, para apresentar em feira científica o projeto
**“O Uso de Machine Learning para Auxiliar na Previsão de Arboviroses Urbanas”**
(EEB Jacó Anderle • Turma 208 • Florianópolis • 2026).

É uma página narrativa longa, com uma cena 3D persistente controlada pelo scroll, que
explica como dados climáticos e históricos podem antecipar períodos de maior risco de
**dengue, zika e chikungunya** — com foco no Norte da Ilha e em **Canasvieiras**.

> ⚠️ **Todos os números, gráficos, mapas de calor e níveis de risco são ilustrativos**
> (protótipo de apresentação). Não representam dados epidemiológicos oficiais nem
> alertas reais. O formato das séries é inspirado na sazonalidade real observada no
> InfoDengue, mas os valores são fictícios.

---

## Visão geral

- **Uma página** com 10 seções (abertura → problema → ideia → como funciona → mapa →
  previsão → o que entrega → limitações → sobre → encerramento).
- **Canvas 3D fixo atrás do conteúdo** (React Three Fiber). A câmera e os objetos
  reagem ao progresso do scroll. O canvas é **sempre `pointer-events: none`** — todas
  as interações (mapa, gráfico, tooltips) são DOM/SVG.
- **Todo o conteúdo essencial vive no DOM.** Sem WebGL (ou se o 3D falhar), a experiência
  continua completa: textos, mapa SVG e gráfico SVG funcionam normalmente.
- **Acessível**: HTML semântico, foco visível, navegação por teclado, descrição textual
  das cenas 3D, resumo + tabela dos gráficos e suporte a `prefers-reduced-motion`.

## Tecnologias

- **Next.js 15** (App Router) + **React 19** + **TypeScript** estrito
- **Tailwind CSS 3**
- **React Three Fiber** + **@react-three/drei** + **three** (3D)
- **GSAP ScrollTrigger** (orquestração de scroll)
- **Framer Motion** (apenas o menu mobile)
- **Zustand** (estado leve de seção ativa)
- **Lucide React** (ícones)
- Gráfico e mapa em **SVG próprio** (sem dependência de biblioteca de gráficos)
- **Vitest** + Testing Library (unidade/DOM) e **Playwright** (fluxo/responsividade)
- ESLint + Prettier

## Instalar e executar

Requer Node 18.18+ (recomendado 20+). Usa **npm**.

```bash
npm install          # instala dependências
npm run dev          # desenvolvimento em http://localhost:3000
npm run build        # build de produção
npm run start        # serve o build de produção
```

Scripts úteis:

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
npm run test         # Vitest (lógica e DOM)
npm run e2e          # Playwright (sobe o dev server automaticamente)
npm run format       # Prettier --write
```

## Publicar na Vercel

O projeto é 100% estático/SSR **sem backend** — compatível direto com a Vercel.

1. Faça push do repositório para o GitHub.
2. Em **vercel.com → New Project**, importe o repositório.
3. **Importante:** este app está na subpasta `website/`. Em *Configure Project*, defina
   **Root Directory = `website`**.
4. Framework preset: **Next.js** (detectado). Build/instala automaticamente.
5. Deploy. Nenhuma variável de ambiente é necessária.

> Se publicar em domínio próprio, atualize `siteUrl` em `src/app/layout.tsx` e o
> `baseUrl` em `src/app/sitemap.ts` / `src/app/robots.ts`.

## Estrutura do projeto

```
src/
  app/                 layout, página, sitemap, robots, manifest
  components/
    layout/            SkipLink, Footer, ProgressIndicator, NarrativeController, JsonLd
    navigation/        Nav (barra desktop) + MobileMenu
    sections/          S1..S10 (uma por seção) + SectionShell
    three/             Canvas, cena, câmera, iluminação, fallback
      objects/         Island, MosquitoSwarm, Rain, TemperatureField,
                       DataFlow, ModelCore, ForecastCurve, AlertBeacon
    charts/            ForecastChart (SVG), DiseaseToggle, ChartLegend, ChartSummary
    map/               FloripaMap (SVG), MapInfoCard, MapLegend
    ui/                Button, Badge, Disclaimer, Reveal, Eyebrow, ScrollHint, BrandMark
  data/                conteúdo textual + datasets mock + equipe + referências + mapa
  hooks/               reduced-motion, in-view, scroll, qualidade, webgl, tamanho
  lib/                 dataset, chartGeometry, quality, three/*, scroll/*, format, palette
  styles/              globals.css (tokens, safe-area, dvh, reveal)
  types/               tipos do domínio
```

## Onde editar cada coisa

| O que | Arquivo |
|---|---|
| **Textos** (títulos, parágrafos, avisos) | `src/data/content.ts` |
| **Dados mock** por doença | `src/data/dengue.ts`, `zika.ts`, `chikungunya.ts` |
| **Como o dataset é montado** (faixa de incerteza, risco) | `src/lib/dataset.ts` |
| **Equipe / orientadora / instituição** | `src/data/team.ts` |
| **Referências** | `src/data/references.ts` |
| **Geometria e marcador do mapa** | `src/data/mapData.ts` |
| **Animação da câmera** (keyframes por seção) | `src/lib/three/cameraKeyframes.ts` |
| **Durações/janelas da narrativa 3D** | `src/lib/three/scene.ts` |
| **Objetos 3D** (substituir/ajustar) | `src/components/three/objects/*` |
| **Cores da marca / paleta** | `src/lib/palette.ts` + `src/styles/globals.css` |
| **Cores do gráfico** | `src/lib/chartColors.ts` |

### Ativar/desativar seções

Todas as seções são montadas em `src/app/page.tsx`. Para **remover** uma seção, apague
o componente correspondente (`<S6Forecast />` etc.) — a barra de progresso e a navegação
seguem funcionando. Os links do menu ficam em `src/lib/sections.ts` (`NAV_LINKS`).

### Substituir objetos 3D

Cada objeto em `src/components/three/objects/` segue o mesmo padrão: define seus
“estágios casa” (`HOMES`), aparece/anima apenas quando a seção ativa está a ±1 estágio
(correção de performance) e some suavemente fora disso. Basta criar um novo componente
no mesmo formato e incluí-lo em `src/components/three/Scene.tsx`.

## Testar no celular pela rede local

```bash
npm run dev:lan        # equivale a: next dev -H 0.0.0.0
```

Descubra o IP da sua máquina (ex.: `192.168.0.10`) e acesse
`http://192.168.0.10:3000` pelo celular na **mesma rede Wi-Fi**. Gere um QR Code
apontando para esse endereço para testar o fluxo real.

## Decisões de performance

- **Qualidade adaptativa** (`alta / média / baixa`) resolvida por largura, DPR,
  `deviceMemory`, `hardwareConcurrency` e movimento reduzido — nunca só por um sinal.
  A qualidade pode **cair** automaticamente em runtime (drei `PerformanceMonitor`), mas
  **não volta a subir** na mesma sessão.
- **DPR limitado** por tier (máx. 2 / 1,5 / 1).
- **Janela ativa ±1**: só as cenas da seção atual, anterior e seguinte rodam `useFrame`;
  as demais são pausadas e ocultadas.
- **Instancing** para chuva e fluxo de dados; **materiais reutilizados**; geometrias simples.
- **Sombra barata** por textura de gradiente (sem sombras em tempo real).
- **Sem pós-processamento, sem bloom.**
- **Nenhum `setState` por frame** — o scroll escreve em um estado transitório lido no
  `useFrame` e numa CSS var (barra de progresso).
- O **canvas 3D é carregado sob demanda** (`next/dynamic`, só no cliente); a abertura é
  leve e o conteúdo aparece imediatamente.
- Fontes **self-hosted** via `next/font` (sem requisição externa).

## Acessibilidade & movimento reduzido

Com `prefers-reduced-motion` ativo: a câmera não faz percursos longos (vai direto às
poses por seção), as animações de scroll viram estados estáticos, o gráfico já aparece
desenhado e o botão “Voltar ao início” não usa rolagem longa. Todo o conteúdo permanece
disponível.

## Fonte do mapa

A silhueta da Ilha de Florianópolis em `src/data/mapData.ts` é uma **simplificação
estilizada feita à mão**, inspirada no contorno público do município (limites do IBGE /
OpenStreetMap — dados abertos). **Não é cartografia precisa**: serve para reconhecimento
visual da ilha, do Norte e de Canasvieiras. O marcador de Canasvieiras está em
**posição aproximada**. Nenhuma API paga, chave de Mapbox ou Google Maps é usada.

## Limitações conhecidas

- Os dados são **ilustrativos**; não há integração com fontes em tempo real nesta versão.
- O mapa é estilizado (reconhecível, não exato) e o marcador é aproximado.
- O 3D é uma **camada de realce**: em aparelhos muito fracos ou sem WebGL, cai para um
  fundo estático — sem perda de conteúdo.
- O modelo é apoio à decisão; não substitui análises epidemiológicas oficiais.
```
