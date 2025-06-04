// models/EXREnvironment.jsx

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { EXRLoader } from 'three-stdlib'
import * as THREE from 'three'

const Envexr = ({ path, background = false }) => {
  const { scene } = useThree()

  useEffect(() => {
    const loader = new EXRLoader();
    loader.load(path, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      if (background) scene.background = texture;
    });

    return () => {
      scene.environment = null;
      if (background) scene.background = null;
    };
  }, [path, background, scene]);

  return null;
}

export default Envexr
