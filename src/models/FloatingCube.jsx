import React, { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'


const FloatingCubes = ({
  count = 5,
  radius = 1.8,
  height = 1.3,
  directionOffset = { x: 0, y: 0 },
}) => {
  const group = useRef()
  const { gl } = useThree()

  const cubes = useMemo(() => {
    return new Array(count).fill().map((_, i) => ({
      angle: (i / count) * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.5,
      yOffset: Math.random() * 0.5,
      scale: 0.1 + Math.random() * 0.1,
    }))
  }, [count])

  const angleOffsets = useRef(cubes.map(cube => cube.angle))
  const direction = useRef(0)
  const isDragging = useRef(false)
  const lastX = useRef(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handlePointerDown = (e) => {
    isDragging.current = true
    lastX.current = e.clientX
  }

  const handlePointerUp = () => {
    isDragging.current = false
    direction.current = 0
  }

  const handlePointerMove = (e) => {
    const rect = gl.domElement.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    setMouse({ x, y })

    if (!isDragging.current) return
    const deltaX = e.clientX - lastX.current
    direction.current = -deltaX * 0.002
    lastX.current = e.clientX
  }


  const handleTouchStart = (e) => {
    isDragging.current = true
    lastX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    if (!isDragging.current) return

    const clientX = e.touches[0].clientX
    const deltaX = clientX - lastX.current
    direction.current = -deltaX * 0.002 // same as desktop
    lastX.current = clientX
  }

  const handleTouchEnd = () => {
    isDragging.current = false
    direction.current = 0 // optional: reset direction, or let inertia continue
  }

  

  useEffect(() => {
    const canvas = gl.domElement

    // Desktop pointer events
    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointerup', handlePointerUp)
    canvas.addEventListener('pointermove', handlePointerMove)

    // Mobile touch events
    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchmove', handleTouchMove)
    canvas.addEventListener('touchend', handleTouchEnd)
    canvas.addEventListener('touchcancel', handleTouchEnd)

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointerup', handlePointerUp)
      canvas.removeEventListener('pointermove', handlePointerMove)

      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
      canvas.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [gl])


  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (isDragging.current) {
      for (let i = 0; i < count; i++) {
        angleOffsets.current[i] += direction.current
      }
    }

    if (!isDragging.current) {
      direction.current *= 0.95 // damping
    }

    const smoothMouseX = mouse.x * 0.2
    const smoothMouseY = mouse.y * 0.2

    group.current.children.forEach((child, i) => {
      const angle = angleOffsets.current[i]
      const { yOffset } = cubes[i]

      const offsetX = directionOffset.x * 0.5 + smoothMouseX
      const offsetZ = directionOffset.y * 0.5 + smoothMouseY

      child.position.set(
        Math.cos(angle) * radius + offsetX,
        height + Math.sin(t * 2 + i) * 0.1 + yOffset,
        Math.sin(angle) * radius + offsetZ
      )

      child.rotation.y += 0.01
      child.rotation.x += 0.005
    })
  })

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <mesh key={i} scale={cube.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            emissive="#ED8936"
            emissiveIntensity={1.5}
            roughness={0.1}
            metalness={1}
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

export default FloatingCubes
