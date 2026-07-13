/**
 * Fundo estático e sóbrio para quando o WebGL não está disponível ou falha.
 * O conteúdo do site permanece totalmente acessível no DOM (esta camada é
 * apenas decorativa e marcada como aria-hidden).
 */
export function StaticSceneFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        background:
          'radial-gradient(60% 45% at 72% 22%, rgba(121,173,214,0.18), transparent 70%),' +
          'radial-gradient(45% 35% at 20% 70%, rgba(228,178,60,0.12), transparent 70%),' +
          'radial-gradient(55% 40% at 50% 100%, rgba(62,156,122,0.10), transparent 70%)',
      }}
    />
  );
}
