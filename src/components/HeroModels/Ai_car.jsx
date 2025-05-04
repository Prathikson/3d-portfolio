
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/ai_car.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh geometry={nodes.Cube042_plastic_smooth_0.geometry} material={materials.plastic_smooth} />
          <mesh geometry={nodes.Cube042_grill001_0.geometry} material={materials['grill.001']} />
        </group>
        <group position={[102.467, 38.235, 130]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={102.431}>
          <mesh geometry={nodes.rim_235001_rims_0.geometry} material={materials.rims} />
          <mesh geometry={nodes.rim_235001_chrome_0.geometry} material={materials.chrome} />
        </group>
        <group position={[102.467, 38.235, 130]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={127.369}>
          <mesh geometry={nodes.tire_001_R17001_rubber_tires_0.geometry} material={materials.rubber_tires} />
          <mesh geometry={nodes.tire_001_R17001_tire_protector_0.geometry} material={materials.tire_protector} />
        </group>
        <group position={[102.467, 38.235, -158.29]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={102.431}>
          <mesh geometry={nodes.rim_235002_rims_0.geometry} material={materials.rims} />
          <mesh geometry={nodes.rim_235002_chrome_0.geometry} material={materials.chrome} />
        </group>
        <group position={[102.467, 38.235, -158.29]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={127.369}>
          <mesh geometry={nodes.tire_001_R17002_rubber_tires_0.geometry} material={materials.rubber_tires} />
          <mesh geometry={nodes.tire_001_R17002_tire_protector_0.geometry} material={materials.tire_protector} />
        </group>
        <group position={[-102.397, 38.235, 130]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={100}>
          <mesh geometry={nodes.rim_235003_rims_0.geometry} material={materials.rims} />
          <mesh geometry={nodes.rim_235003_chrome_0.geometry} material={materials.chrome} />
        </group>
        <group position={[-102.449, 38.235, 130]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={127.369}>
          <mesh geometry={nodes.tire_001_R17003_rubber_tires_0.geometry} material={materials.rubber_tires} />
          <mesh geometry={nodes.tire_001_R17003_tire_protector_0.geometry} material={materials.tire_protector} />
        </group>
        <group position={[-102.449, 38.235, -158.29]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={127.369}>
          <mesh geometry={nodes.tire_001_R17004_rubber_tires_0.geometry} material={materials.rubber_tires} />
          <mesh geometry={nodes.tire_001_R17004_tire_protector_0.geometry} material={materials.tire_protector} />
        </group>
        <group position={[-102.397, 38.235, -158.29]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={100}>
          <mesh geometry={nodes.rim_235004_rims_0.geometry} material={materials.rims} />
          <mesh geometry={nodes.rim_235004_chrome_0.geometry} material={materials.chrome} />
        </group>
        <mesh geometry={nodes.Cube_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube001_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube002_glass_0.geometry} material={materials.glass} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube003_glass_0.geometry} material={materials.glass} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube004_grill_0.geometry} material={materials.grill} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube005_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube006_body_0.geometry} material={materials.body} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube007_body_0.geometry} material={materials.body} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube008_body_0.geometry} material={materials.body} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube009_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube010_body_0.geometry} material={materials.body} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube011_body_0.geometry} material={materials.body} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube012_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube013_lights_0.geometry} material={materials.lights} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube014_red_deco_0.geometry} material={materials.red_deco} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube015_red_deco_0.geometry} material={materials.red_deco} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube016_taillights_0.geometry} material={materials.taillights} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube017_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube018_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube019_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube020_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube021_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube022_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube023_grill_0.geometry} material={materials.grill} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube024_blocker_0.geometry} material={materials.blocker} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube025_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube026_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube027_grill001_0.geometry} material={materials['grill.001']} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube028_red_deco_0.geometry} material={materials.red_deco} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube029_red_deco_0.geometry} material={materials.red_deco} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube033_red_deco_0.geometry} material={materials.red_deco} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube034_red_deco_0.geometry} material={materials.red_deco} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube035_red_deco_0.geometry} material={materials.red_deco} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube036_red_deco_0.geometry} material={materials.red_deco} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube037_red_deco_0.geometry} material={materials.red_deco} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube038_red_deco_0.geometry} material={materials.red_deco} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube039_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube040_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube041_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube043_grill_0.geometry} material={materials.grill} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube044_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube045_grill_0.geometry} material={materials.grill} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube046_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube047_blocker_0.geometry} material={materials.blocker} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.Cube048_plastic_smooth_0.geometry} material={materials.plastic_smooth} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh geometry={nodes.shadow_shadow_0.geometry} material={materials.shadow} rotation={[-Math.PI / 2, 0, 0]} scale={440.234} />
      </group>
    </group>
  )
}

useGLTF.preload('/ai_car.glb')
