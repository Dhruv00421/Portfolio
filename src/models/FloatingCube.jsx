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
  const touchStartTime = useRef(0)
  const touchStartX = useRef(0)
  const velocity = useRef(0)
  const isMobile = useRef(window.innerWidth < 768)
  const lastDeltaX = useRef(0)
  const currentRotation = useRef(0)

  const handlePointerDown = (e) => {
    isDragging.current = true
    lastX.current = e.clientX
    touchStartTime.current = Date.now()
    touchStartX.current = e.clientX
    velocity.current = 0
    lastDeltaX.current = 0
  }

  const handlePointerUp = () => {
    isDragging.current = false
    // Maintain the current rotation
    currentRotation.current = angleOffsets.current[0]
    // Apply a small velocity based on the last movement
    velocity.current = -lastDeltaX.current * (isMobile.current ? 0.3 : 0.15)
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current) {
      // Handle mouse movement without dragging for floating effect
      const rect = gl.domElement.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Calculate normalized position (-1 to 1)
      const normalizedX = (mouseX - centerX) / centerX;
      const normalizedY = (mouseY - centerY) / centerY;
      
      // Apply floating effect by updating mouse state
      setMouse({ x: normalizedX * 0.3, y: normalizedY * 0.3 });
      return;
    }

    const rect = gl.domElement.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    setMouse({ x, y })

    const deltaX = e.clientX - lastX.current
    lastDeltaX.current = -deltaX * (isMobile.current ? 0.005 : 0.002)
    direction.current = lastDeltaX.current
    lastX.current = e.clientX

    // Update current rotation
    currentRotation.current += direction.current
  }

  const handleTouchStart = (e) => {
    e.preventDefault()
    isDragging.current = true
    lastX.current = e.touches[0].clientX
    touchStartTime.current = Date.now()
    touchStartX.current = e.touches[0].clientX
    velocity.current = 0
    lastDeltaX.current = 0
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    if (!isDragging.current) return

    const clientX = e.touches[0].clientX
    const deltaX = clientX - lastX.current
    lastDeltaX.current = -deltaX * 0.005
    direction.current = lastDeltaX.current
    lastX.current = clientX

    // Update current rotation
    currentRotation.current += direction.current

    const rect = gl.domElement.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 2 - 1
    setMouse(prev => ({ ...prev, x }))
  }

  const handleTouchEnd = (e) => {
    e.preventDefault()
    isDragging.current = false
    // Maintain the current rotation
    currentRotation.current = angleOffsets.current[0]
    // Apply a small velocity based on the last movement
    velocity.current = -lastDeltaX.current * 0.1
  }

  useEffect(() => {
    const canvas = gl.domElement

    // Desktop pointer events
    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointerup', handlePointerUp)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerenter', () => {
      // Mouse entered canvas - floating effect will be active
    })
    canvas.addEventListener('pointerleave', () => {
      // Mouse left canvas - reset mouse position and resume normal behavior
      setMouse({ x: 0, y: 0 })
    })

    // Mobile touch events
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false })
    canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false })

    // Update mobile detection on resize
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768
    }
    window.addEventListener('resize', handleResize)

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointerup', handlePointerUp)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerenter', () => {})
      canvas.removeEventListener('pointerleave', () => {})

      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
      canvas.removeEventListener('touchcancel', handleTouchEnd)

      window.removeEventListener('resize', handleResize)
    }
  }, [gl])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (isDragging.current) {
      // Update all cubes based on current rotation
      for (let i = 0; i < count; i++) {
        angleOffsets.current[i] = currentRotation.current + (i * (2 * Math.PI / count))
      }
    } else {
      // Apply inertia when not dragging
      if (Math.abs(velocity.current) > 0.0001) {
        currentRotation.current += velocity.current
        // Update all cubes based on current rotation
        for (let i = 0; i < count; i++) {
          angleOffsets.current[i] = currentRotation.current + (i * (2 * Math.PI / count))
        }
        // Smoother damping
        velocity.current *= 0.92
      } else {
        velocity.current = 0
      }
    }

    const smoothMouseX = mouse.x * 0.5
    const smoothMouseY = mouse.y * 0.5

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
