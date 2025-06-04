import { useGLTF } from '@react-three/drei'
import React from 'react'

import skyScene from '../assets/3D/sky.glb'

function Sky() {
    const sky = useGLTF(skyScene);
    
  return (
    <mesh>
        <primitive object={sky.scene} />
    </mesh>
  )
}

export default Sky