import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";

function FloatingSphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#22d3ee"
        emissiveIntensity={0.6}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function Scene({ children }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <ScrollControls pages={5} damping={0.2}>
        <Scroll>
          <FloatingSphere />
        </Scroll>

        <Scroll html>{children}</Scroll>
      </ScrollControls>
    </Canvas>
  );
        }
