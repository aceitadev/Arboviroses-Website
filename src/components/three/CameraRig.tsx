'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll/scrollState';
import { sampleCamera } from '@/lib/three/cameraKeyframes';
import { CAMERA_DAMP, damp } from '@/lib/three/scene';

/** Move a câmera pelo progresso do scroll. No mobile/reduzido, movimento menor. */
export function CameraRig({ reduced, spread }: { reduced: boolean; spread: number }) {
  const { camera } = useThree();
  const pos = useMemo(() => new THREE.Vector3(), []);
  const tgt = useMemo(() => new THREE.Vector3(), []);
  const current = useRef(new THREE.Vector3(0, 0.3, 0));

  useFrame((_, delta) => {
    sampleCamera(scrollState.progress, pos, tgt, spread);
    const dt = Math.min(delta, 0.05);

    if (reduced) {
      camera.position.copy(pos);
      current.current.copy(tgt);
    } else {
      camera.position.x = damp(camera.position.x, pos.x, CAMERA_DAMP, dt);
      camera.position.y = damp(camera.position.y, pos.y, CAMERA_DAMP, dt);
      camera.position.z = damp(camera.position.z, pos.z, CAMERA_DAMP, dt);
      current.current.x = damp(current.current.x, tgt.x, CAMERA_DAMP, dt);
      current.current.y = damp(current.current.y, tgt.y, CAMERA_DAMP, dt);
      current.current.z = damp(current.current.z, tgt.z, CAMERA_DAMP, dt);
    }
    camera.lookAt(current.current);
  });

  return null;
}
