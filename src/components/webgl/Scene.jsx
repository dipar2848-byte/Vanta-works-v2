import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useContext } from "react";
import { ScrollContext } from "../motion/ScrollProvider";

function Core() {
  const { progress, section } = useContext(ScrollContext);
  const points = useRef();

  const count = 1600;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 16;
      p[i * 3 + 1] = (Math.random() - 0.5) * 16;
      p[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }

    return p;
  }, []);

  useFrame(() => {
    if (!points.current) return;

    // slow cinematic drift
    points.current.rotation.y += 0.0005 + section * 0.0003;

    // vertical storytelling movement
    points.current.position.y = -progress * 1.5;
  });

  const moods = [
    "#7c3aed", // hero
    "#ef4444", // problem
    "#22d3ee", // solution
    "#a855f7", // pricing
    "#22c55e"  // CTA
  ];

  const color = moods[section] || "#7c3aed";

  const bg = [
    "#050014",
    "#0a0303",
    "#020b10",
    "#0b0610",
    "#020807"
  ][section] || "#050014";

  return (
    <>
      <color attach="background" args={[bg]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color={color} />

      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial size={0.018} color={color} transparent opacity={0.75} />
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
      <Core />
    </Canvas>
  );
}