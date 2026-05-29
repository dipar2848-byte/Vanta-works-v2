import { Canvas } from "@react-three/fiber";

function FloatingSphere() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#22d3ee"
        emissiveIntensity={0.25}
        metalness={0.4}
        roughness={0.7}
      />
    </mesh>
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
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <FloatingSphere />
    </Canvas>
  );
}