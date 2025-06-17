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
  const { camera } = useThree();
  const [isFacingFront, setIsFacingFront] = useState(true);

  useFrame(() => {
    if (ref.current) {
      const cardWorldPosition = new THREE.Vector3();
      ref.current.getWorldPosition(cardWorldPosition);

      const cameraToCard = new THREE.Vector3();
      cameraToCard.subVectors(cardWorldPosition, camera.position).normalize();

      const cardForward = new THREE.Vector3(0, 0, 1).applyQuaternion(ref.current.quaternion);

      const dot = cardForward.dot(cameraToCard);

      // dot > 0 → front facing camera
      setIsFacingFront(dot > 0);
    }
  });

  
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
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    const cardWidth = isMobile ? 1.2 : isTablet ? 1.4 : 1.5;
    const cardHeight = isMobile ? 0.9 : isTablet ? 0.9 : 1.2;
    const cardRadius = isMobile ? 0.08 : isTablet ? 0.09 : 0.1;
    
    const shape = new THREE.Shape();
    const x = -cardWidth / 2;
    const y = -cardHeight / 2;
    
    shape.moveTo(x, y + cardRadius);
    shape.lineTo(x, y + cardHeight - cardRadius);
    shape.quadraticCurveTo(x, y + cardHeight, x + cardRadius, y + cardHeight);
    shape.lineTo(x + cardWidth - cardRadius, y + cardHeight);
    shape.quadraticCurveTo(x + cardWidth, y + cardHeight, x + cardWidth, y + cardHeight - cardRadius);
    shape.lineTo(x + cardWidth, y + cardRadius);
    shape.quadraticCurveTo(x + cardWidth, y, x + cardWidth - cardRadius, y);
    shape.lineTo(x + cardRadius, y);
    shape.quadraticCurveTo(x, y, x, y + cardRadius);
    
    return new THREE.ShapeGeometry(shape);
  }
  
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
  })
  
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  // Calculate text positions based on card height
  const cardWidth = isMobile ? 1.2 : isTablet ? 1.4 : 1.5;
  const cardHeight = isMobile ? 0.8 : isTablet ? 0.9 : 1;
  const titleY = cardHeight * 0.4;
  const descY = -cardHeight * 0.1;
  const linkY = -cardHeight * 0.45;
  
  // Calculate text width with padding
  const textWidth = cardWidth * 0.85; // 85% of card width to leave some padding
  
  return (
    <group 
      ref={ref} 
      position={position} 
      rotation={rotation}
      onPointerOver={pointerOver} 
      onPointerOut={pointerOut}
      onClick={handleClick}
    >
      {/* Rounded background plane */}
      <mesh>
        <primitive object={createRoundedRectGeometry()} />
        <meshBasicMaterial 
          color={hovered ? "#f0f0f0" : "#ffffff"} 
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Title text */}
      <Text
        position={[0, titleY, 0.01]}
        fontSize={isMobile ? 0.12 : isTablet ? 0.13 : 0.15}
        color={hovered ? "#333" : "#000"}
        anchorX="center"
        anchorY="middle"
        maxWidth={textWidth}
        side={THREE.FrontSide}
        letterSpacing={0.02}
        lineHeight={1.2}
        overflowWrap="break-word"
      >
        {title || "Card Title"}
      </Text>
      
      {/* Description text */}
      <Text
        position={[0, descY, 0.01]}
        fontSize={isMobile ? 0.08 : isTablet ? 0.09 : 0.1}
        color="#666"
        anchorX="center"
        anchorY="middle"
        maxWidth={textWidth}
        textAlign="center"
        letterSpacing={0.01}
        lineHeight={1.4}
        overflowWrap="break-word"
      >
        {description || "Card description"}
      </Text>
      
      {link && (
        <Html
          position={[0, linkY, 0.02]}
          center
          transform
          occlude
          style={{ 
            pointerEvents: 'auto',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            color: hovered ? '#2563eb' : '#1d4ed8',
            width: `${textWidth * 100}px`,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: hovered ? '#2563eb' : '#1d4ed8',
              fontSize: isMobile ? '4px' : isTablet ? '4.5px' : '5px',
              cursor: 'pointer',
              textAlign: 'center',
              lineHeight: '1.2',
              letterSpacing: '0.5px',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
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