"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Globe() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03; // slower spin
      ref.current.rotation.z = 0.41 + Math.sin(t * 0.25) * 0.02; // gentle tilt wobble
    }
  });

  return (
    <group>
      {/* Atmosphere glow */}
      <Sphere args={[1.23, 64, 64]}>
        <meshBasicMaterial
          color="#4ac8ff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Earth (stylized night view, no external textures) */}
      <Sphere ref={ref} args={[1.2, 64, 64]}>
        <meshPhongMaterial
          color={new THREE.Color("#14203d")}
          emissive={new THREE.Color("#1a2b57")}
          emissiveIntensity={0.2}
          specular={new THREE.Color("#2e7ea1")}
          shininess={8}
        />
      </Sphere>

      {/* distant stars */}
      <Stars radius={60} depth={30} count={4000} factor={3} saturation={0} fade speed={0.2} />
    </group>
  );
}

export default function DeepGlobe() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-55">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.6], fov: 52 }}>
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 2, 2]} intensity={0.65} />
        <directionalLight position={[-3, -2, -4]} intensity={0.25} />
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      </Canvas>
    </div>
  );
}


