import { useFrame, useThree } from '@react-three/fiber'
import { Html, Text } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import { easing } from 'maath'
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

function Card({ title, description, position, rotation, link }) {
  const navigate = useNavigate();
  const ref = useRef()
  const [hovered, hover] = useState(false)
  
  const pointerOver = (e) => {
    e.stopPropagation()
    hover(true)
    document.body.style.cursor = 'pointer'
  }
  
  const pointerOut = (e) => {
    e.stopPropagation()
    hover(false)
    document.body.style.cursor = 'default'
  }

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (link) {
      setTimeout(() => {
        navigate(link);
      }, 0); // Defer to allow scene pointer logic to settle
    }
  };

  
  // Create rounded rectangle geometry
  const createRoundedRectGeometry = (width, height, radius) => {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    
    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);
    
    return new THREE.ShapeGeometry(shape);
  }
  
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
  })
  
  return (
    <group 
      ref={ref} 
      position={position} 
      rotation={rotation}
      onPointerOver={pointerOver} 
      onPointerOut={pointerOut}
      onClick={handleClick} // Add this - the main fix!
    >
      {/* Rounded background plane */}
      <mesh>
        <primitive object={createRoundedRectGeometry(2, 1.5, 0.1)} />
        <meshBasicMaterial 
          color={hovered ? "#f0f0f0" : "#ffffff"} 
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Title text */}
      <Text
        position={[0, 0.3, 0.01]}
        fontSize={0.15}
        color={hovered ? "#333" : "#000"}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {title || "Card Title"}
      </Text>
      
      {/* Description text */}
      <Text
        position={[0, -0.1, 0.01]}
        fontSize={0.1}
        color="#666"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
        textAlign="center"
      >
        {description || "Card description"}
      </Text>
      
      {link && (
        <Html
          position={[0, -0.45, 0.02]} // Slightly in front of the card
          center
          transform // This makes it stick to the 3D transform of the parent
          occlude
          style={{ pointerEvents: 'auto' }}
        >
          <div
            style={{
              color: hovered ? '#2563eb' : '#1d4ed8',
              fontSize: '5px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            onClick={handleClick}
            onMouseEnter={pointerOver}
            onMouseLeave={pointerOut}
          >
            Visit page →
          </div>
        </Html>

      )}
    </group>
  )
}

export default Card