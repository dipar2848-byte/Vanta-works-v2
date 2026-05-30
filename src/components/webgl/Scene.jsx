import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useContext } from "react";
import * as THREE from "three";
import { ScrollContext } from "../motion/ScrollProvider";

function SceneCore() {
  const progress = useContext(ScrollContext);
  const points = useRef();

  const count = 1500;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 14;
      p[i * 3 + 1] = (Math.random() - 0.5) * 14;
      p[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }

    return p;
  }, []);

  useFrame(() => {
    if (!points.current) return;

    // global rotation drift
    points.current.rotation.y += 0.0006 + progress * 0.002;
    points.current.rotation.x += 0.0002;

    // vertical story drift
    points.current.position.y = -progress * 1.2;
  });

  const moodColor = useMemo(() => {
    if (progress < 0.25) return "#7c3aed"; // HERO - purple
    if (progress < 0.5) return "#ef4444";  // PROBLEM - red tension
    if (progress < 0.75) return "#22d3ee"; // SOLUTION - cyan
    return "#22c55e"; // CTA - growth green
  }, [progress]);

  const bgColor = useMemo(() => {
    if (progress < 0.25) return "#050014";
    if (progress < 0.5) return "#0a0303";
    if (progress < 0.75) return "#020b10";
    return "#020807";
  }, [progress]);

  return (
    <>
      {/* dynamic background */}
      <color attach="background" args={[bgColor]} />

      {/* lighting mood shift */}
      <ambientLight intensity={0.4 + progress * 0.4} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        color={moodColor}
      />

      <pointLight position={[-5, -3, -2]} intensity={0.8} color="#a855f7" />

      {/* particles */}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          size={0.018}
          color={moodColor}
          transparent
          opacity={0.75}
        />
      </points>
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none"
      }}
    >
      <SceneCore />
    </Canvas>
  );
}