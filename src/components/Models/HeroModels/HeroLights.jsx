import * as THREE from "three";

const HeroLights = () => (
  <>
    {/* Main white spotlight for strong illumination */}
    <spotLight
      position={[2, 5, 6]}
      angle={0.3}
      penumbra={0.4}
      intensity={60}
      color="white"
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />

    {/* Soft red fill light from front-left */}
    <spotLight
      position={[-2, 3, 4]}
      angle={0.5}
      penumbra={0.6}
      intensity={20}
      color="#ff0000"
    />

    {/* Cool bluish white fill from above */}
    <spotLight
      position={[0, 5, 0]}
      angle={0.4}
      penumbra={0.3}
      intensity={30}
      color="#ffffff"
    />

    {/* Subtle purplish point light for mood */}
    <pointLight position={[1, 1, -2]} intensity={15} color="#720000" />

    {/* Ambient light with dark blackish tint for shadows */}
    <ambientLight intensity={0.15} color="#000000" />

    {/* RectAreaLight for soft front illumination */}
    <primitive
      object={new THREE.RectAreaLight("#ffffff", 8, 3, 2)}
      position={[0, 2, 5]}
      rotation={[-Math.PI / 6, 0, 0]}
      intensity={10}
    />
  </>
);

export default HeroLights;
