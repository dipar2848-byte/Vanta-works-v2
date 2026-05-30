import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useContext } from "react";
import * as THREE from "three";
import { ScrollContext } from "../motion/ScrollProvider";

function Particles() {
  const mesh = useRef();
  const progress = useContext(ScrollContext);

  const count = 1200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }

    return pos;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;

    mesh.current.rotation.y += 0.0008 + progress * 0.002;
    mesh.current.rotation.x += 0.0003;

    // subtle scroll-based drift
    mesh.current.position.y = -progress * 0.8;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.02}
        color={progress > 0.5 ? "#22d3ee" : "#7c3aed"}
        transparent
        opacity={0.7}
      />
    </points>
  );
}

function Lights() {
  const progress = useContext(ScrollContext);

  return (
    <>
      <ambientLight intensity={0.4 + progress * 0.3} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        color={progress > 0.5 ? "#22d3ee" : "#7c3aed"}
      />

      <pointLight
        position={[-5, -2, -2]}
        intensity={0.8}
        color="#a855f7"
      />
    </>
  );
}

export default function Scene() {
  const progress = useContext(ScrollContext);

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
      <color
        attach="background"
        args={[progress > 0.5 ? "#020617" : "#050014"]}
      />

      <Lights />
      <Particles />
    </Canvas>
  );
}