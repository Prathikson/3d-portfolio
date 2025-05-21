import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import {Mask} from "./Mask";
import HeroLights from "./HeroLights";
import RedSmoke from "./RedSmoke";
import { Suspense } from "react";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }} shadows>
      <ambientLight intensity={0.2} color="#1a1a40" />
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <Suspense fallback={null}>
        <HeroLights />

        <group
          scale={isMobile ? 0.7 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Mask />

          {/* Red smoke positioned properly at eyes */}
          <RedSmoke position={[-0.2, 0.5, 0.5]} />
          <RedSmoke position={[0.2, 0.5, 0.5]} />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
