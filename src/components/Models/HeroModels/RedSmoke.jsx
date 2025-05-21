import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const RedSmoke = ({ position }) => {
  const group = useRef();
  const particles = useRef([]);
  const count = 20;

  if (particles.current.length === 0) {
    for (let i = 0; i < count; i++) {
      particles.current.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 0.15,
          0,
          (Math.random() - 0.5) * 0.15
        ),
        speed: 0.01 + Math.random() * 0.01,
        opacity: 1,
        scale: 0.2 + Math.random() * 0.3,
      });
    }
  }

  useFrame(() => {
    particles.current.forEach((p, i) => {
      p.pos.y += p.speed;
      p.opacity -= 0.007;
      if (p.opacity <= 0) {
        p.pos.set(
          (Math.random() - 0.5) * 0.15,
          0,
          (Math.random() - 0.5) * 0.15
        );
        p.opacity = 1;
      }

      const mesh = group.current.children[i];
      if (mesh) {
        mesh.position.copy(p.pos);
        mesh.material.opacity = p.opacity;
      }
    });
  });

  return (
    <group ref={group} position={position} renderOrder={999}>
      {particles.current.map((p, i) => (
        <mesh
          key={i}
          scale={p.scale}
          renderOrder={999}
          frustumCulled={false}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="red"
            emissive="red"
            emissiveIntensity={1}
            transparent
            opacity={p.opacity}
            depthWrite={false}
            depthTest={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

export default RedSmoke;
