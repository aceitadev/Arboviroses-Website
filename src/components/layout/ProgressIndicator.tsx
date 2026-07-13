/** Indicador de progresso fino e discreto (usa CSS var, sem re-render). Decorativo. */
export function ProgressIndicator() {
  return (
    <div
      aria-hidden="true"
      className="pt-safe pointer-events-none fixed inset-x-0 top-0 z-[60]"
    >
      <div className="h-0.5 w-full bg-transparent">
        <div
          className="h-full origin-left bg-science/80"
          style={{ transform: 'scaleX(var(--narrative-progress, 0))' }}
        />
      </div>
    </div>
  );
}
