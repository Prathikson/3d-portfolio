
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Mask(props) {
  const { nodes, materials } = useGLTF('/models/oni_mask.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.material} />
      <mesh geometry={nodes.Object_6.geometry} material={materials['.005']} />
    </group>
  )
}

useGLTF.preload('/models/oni_mask.glb')
