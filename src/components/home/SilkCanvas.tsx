"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Custom shader source for silk waving simulation
const SilkShader = {
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Primary flowing waves
      float waveX = sin(pos.x * 1.2 + uTime * 0.8) * cos(pos.y * 0.8 + uTime * 0.5) * 0.35;
      float waveY = sin(pos.y * 1.5 + uTime * 0.9) * 0.2;
      
      // Dynamic mouse interaction reactive ripple
      float dist = distance(uv, uMouse);
      float mouseRipple = 0.0;
      if (dist < 0.8) {
        mouseRipple = sin(dist * 12.0 - uTime * 4.0) * (0.8 - dist) * 0.25;
      }

      pos.z += waveX + waveY + mouseRipple;
      vElevation = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      // Create editorial gloss overlay based on displacement elevation
      float mixFactor = (vElevation + 0.55) * 0.85;
      mixFactor = clamp(mixFactor, 0.0, 1.0);

      vec3 finalColor = mix(uColor1, uColor2, mixFactor);
      
      // Subtle vignette and glow parameters
      float alpha = 0.45 + (vElevation * 0.25);
      alpha = clamp(alpha, 0.25, 0.9);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

interface SilkMeshProps {
  color1: string;
  color2: string;
}

function SilkMesh({ color1, color2 }: SilkMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Mouse uniform mapping
  const mouseState = useRef({ x: 0.5, y: 0.5 });

  // Uniform declaration
  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
    };
  }, [color1, color2]);

  useFrame((state) => {
    const { clock, pointer } = state;
    
    // Update time and mouse uniforms with strict checks
    if (materialRef.current) {
      const uniforms = materialRef.current.uniforms;
      if (uniforms && uniforms.uTime && uniforms.uMouse) {
        uniforms.uTime.value = clock.getElapsedTime();
        
        // Interpolate mouse coordinates smoothly (lerp)
        const targetX = (pointer.x + 1) * 0.5; // Map from [-1, 1] to [0, 1]
        const targetY = (pointer.y + 1) * 0.5;
        
        mouseState.current.x += (targetX - mouseState.current.x) * 0.05;
        mouseState.current.y += (targetY - mouseState.current.y) * 0.05;
        
        (uniforms.uMouse.value as THREE.Vector2).set(
          mouseState.current.x,
          mouseState.current.y
        );
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width * 1.1, viewport.height * 1.1, 1]}>
      <planeGeometry args={[1.5, 1.5, 96, 96]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={SilkShader.vertexShader}
        fragmentShader={SilkShader.fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function SilkCanvas() {
  // Curated color theme for dark / light: warm beige to soft cashmere champagne
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden opacity-90 dark:opacity-75">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, depth: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        {/* Ivory champagne to warm amber silk gradient */}
        <SilkMesh color1="#F9F6F0" color2="#E3D2C0" />
      </Canvas>
    </div>
  );
}
