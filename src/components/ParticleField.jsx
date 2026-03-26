import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 3200;

/* ── 1. BUILD: Perfect Rotating Cube ── */
function buildCubeTargets() {
  const arr = new Float32Array(COUNT * 3);
  const side = 14;
  const step = 1.05; // Increased step size to physically expand the cube geometry
  let idx = 0;
  for (let x = 0; x < side; x++) {
    for (let y = 0; y < side; y++) {
      for (let z = 0; z < side; z++) {
        if (idx >= COUNT) break;
        arr[idx * 3] = (x - side / 2) * step;
        arr[idx * 3 + 1] = (y - side / 2) * step;
        arr[idx * 3 + 2] = (z - side / 2) * step;
        idx++;
      }
    }
  }
  while (idx < COUNT) {
    arr[idx * 3] = (Math.random() - 0.5) * 10; arr[idx * 3 + 1] = (Math.random() - 0.5) * 10; arr[idx * 3 + 2] = (Math.random() - 0.5) * 10;
    idx++;
  }
  return arr;
}

/* ── 2. UNDERSTAND: Pulsing Sphere ── */
function buildSphereTargets() {
  const arr = new Float32Array(COUNT * 3);
  const R = 7.0;
  for (let i = 0; i < COUNT; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    arr[i * 3] = R * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = R * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = R * Math.cos(phi);
  }
  return arr;
}

/* ── 3. INDUSTRY: Solar System ── */
function buildSolarTargets() {
  const arr = new Float32Array(COUNT * 3);
  const bodies = [
    { n: 900, r: 2.2, d: 0, s: 0 },
    { n: 500, r: 0.7, d: 6.0, s: 1.0 },
    { n: 600, r: 0.9, d: 10.0, s: 0.65 },
    { n: 600, r: 1.1, d: 14.0, s: 0.4 },
    { n: 600, r: 0.6, d: 17.5, s: 0.22 }
  ];
  let idx = 0;
  bodies.forEach((b) => {
    for (let i = 0; i < b.n; i++) {
      if (idx >= COUNT) break;
      const phi = Math.acos(1 - 2 * (i + 0.5) / b.n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      arr[idx * 3] = b.r * Math.sin(phi) * Math.cos(theta);
      arr[idx * 3 + 1] = b.r * Math.sin(phi) * Math.sin(theta);
      arr[idx * 3 + 2] = b.r * Math.cos(phi);
      idx++;
    }
  });
  return arr;
}

const LENS_COLORS = {
  build: [0.54, 0.36, 0.96],
  understand: [0.54, 0.36, 0.96],
  industry: [0.54, 0.36, 0.96],
};
const DEFAULT_COLOR = [0.65, 0.68, 0.95];

const ParticleField = ({ activeLens, scrollRef }) => {
  const { viewport } = useThree();
  const pointsRef = useRef();

  const { posArr, colArr, waveArr, phaseArr } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const wav = new Float32Array(COUNT * 3);
    const pha = new Float32Array(COUNT);
    
    for (let i = 0; i < COUNT; i++) {
        const t = i / COUNT;
        const x = (t * 2 - 1) * 26;
        const y = Math.sin(t * Math.PI * 1.8) * 4.5 - 2.5; 
        wav[i * 3] = x; 
        wav[i * 3 + 1] = y; 
        wav[i * 3 + 2] = (Math.random() - 0.5) * 12;
        
        pos[i * 3] = wav[i * 3]; 
        pos[i * 3 + 1] = Math.max(-999, Math.min(999, wav[i * 3 + 1])); // Prevent NaN corruption
        pos[i * 3 + 2] = wav[i * 3 + 2];
        
        col[i * 3] = DEFAULT_COLOR[0]; 
        col[i * 3 + 1] = DEFAULT_COLOR[1]; 
        col[i * 3 + 2] = DEFAULT_COLOR[2];
        
        pha[i] = Math.random() * Math.PI * 2;
    }
    return { posArr: pos, colArr: col, waveArr: wav, phaseArr: pha };
  }, []);

  const targets = useMemo(() => ({
    build: buildCubeTargets(),
    understand: buildSphereTargets(),
    industry: buildSolarTargets()
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array;
    const colors = pointsRef.current.geometry.attributes.color.array;

    const t = state.clock.getElapsedTime();
    const { mouse } = state;
    const scroll = scrollRef?.current && !isNaN(scrollRef.current) ? scrollRef.current : 0;
    const mx = (mouse.x * viewport.width) / 2, my = (mouse.y * viewport.height) / 2;
    const targetColor = (activeLens && LENS_COLORS[activeLens]) ? LENS_COLORS[activeLens] : DEFAULT_COLOR;
    const lerpSpeed = activeLens ? 0.045 : 0.012;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3, ph = phaseArr[i];
      let px = positions[i3], py = positions[i3 + 1], pz = positions[i3 + 2], tx, ty, tz;

      if (activeLens === 'build') {
        const sx = targets.build[i3], sy = targets.build[i3 + 1], sz = targets.build[i3 + 2];
        const rotY = t * 0.15;
        const rotX = Math.PI * 0.2; 

        let rx = sx * Math.cos(rotY) - sz * Math.sin(rotY);
        let rz = sx * Math.sin(rotY) + sz * Math.cos(rotY);
        let ry = sy;

        tx = rx;
        ty = ry * Math.cos(rotX) - rz * Math.sin(rotX);
        tz = ry * Math.sin(rotX) + rz * Math.cos(rotX);

      } else if (activeLens === 'understand') {
        const sx = targets.understand[i3], sy = targets.understand[i3 + 1], sz = targets.understand[i3 + 2];
        const dist = Math.sqrt(sx * sx + sy * sy + sz * sz);
        const wave = Math.sin(dist * 0.85 - t * 1.2) * 0.55;
        tx = (sx + sx / dist * wave); ty = (sy + sy / dist * wave); tz = (sz + sz / dist * wave);
      } else if (activeLens === 'industry') {
        // Engaging 3D Swirling Energy Wave
        const x = waveArr[i3]; 
        
        const spiralSpeed = 1.8;
        const waveSpeed = 1.0;
        
        // Central wave backbone
        const mainWave = Math.sin(x * 0.15 - t * waveSpeed) * 4.5;
        
        // Dynamic orbiting radius
        const swirlRadius = 2.5 + Math.sin(i * 0.02 + t) * 1.5;
        const swirlAngle = x * 0.25 + t * spiralSpeed + ph;
        
        tx = x + Math.cos(t * 0.5 + ph) * 0.8;
        ty = mainWave + Math.cos(swirlAngle) * swirlRadius;
        tz = Math.sin(swirlAngle) * swirlRadius;
      } else {
        tx = waveArr[i3] + Math.sin(t * 0.2 + ph) * 1.0;
        ty = waveArr[i3 + 1] + Math.cos(t * 0.25 + ph) * 1.0;
        tz = waveArr[i3 + 2] + Math.sin(t * 0.15 + ph) * 1.0;
      }

      const dx = mx - tx, dy = my - ty;
      const distSq = dx * dx + dy * dy;
      if (distSq < 250) { 
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / 15.8) * 1.2; 
        tx += dx * force;
        ty += dy * force;
      }

      // Add scroll offset perfectly mathematically to the target so transitioning interpolation is natively stable
      ty += scroll * 10.0;

      px += (tx - px) * lerpSpeed; py += (ty - py) * lerpSpeed; pz += (tz - pz) * lerpSpeed;
      
      positions[i3] = px; positions[i3 + 2] = pz; positions[i3 + 1] = py;
      colors[i3] += (targetColor[0] - colors[i3]) * 0.04; 
      colors[i3 + 1] += (targetColor[1] - colors[i3 + 1]) * 0.04; 
      colors[i3 + 2] += (targetColor[2] - colors[i3 + 2]) * 0.04;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={posArr} itemSize={3} usage={THREE.DynamicDrawUsage} />
        <bufferAttribute attach="attributes-color" count={COUNT} array={colArr} itemSize={3} usage={THREE.DynamicDrawUsage} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
};

export default ParticleField;
