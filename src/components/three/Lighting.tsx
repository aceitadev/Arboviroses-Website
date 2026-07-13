'use client';

/** Iluminação suave e clara, sem sombras em tempo real caras. */
export function Lighting() {
  return (
    <>
      <hemisphereLight args={['#ffffff', '#cdd9e6', 0.95]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.05} color="#fff6e8" />
      <directionalLight position={[-5, 2.5, -3]} intensity={0.22} color="#cfe0ff" />
    </>
  );
}
