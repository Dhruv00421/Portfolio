import { useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import React, { useEffect, useRef, useState } from 'react';
import Carousel from './Carousel.jsx';

function Rig({ height = -0.5 }) {
  const ref = useRef();
  const { gl } = useThree();
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragDistance, setDragDistance] = useState(0);
  const [radius, setRadius] = useState(3.4);

   useEffect(() => {
    const updateRadius = () => {
      const isMobile = window.innerWidth < 768;
      setRadius(isMobile ? 2.7 : 3.4);  // Adjust smaller for mobile
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      gl.domElement.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      setDragDistance((prev) => prev + Math.abs(deltaX) + Math.abs(deltaY));
      setRotation((prev) => prev - deltaX * 0.001);
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handlePointerUp = (e) => {
      setIsDragging(false);
      gl.domElement.style.cursor = 'grab';

      // If total drag distance is very small, treat it as a click
      if (dragDistance < 5) {
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        // e.target.dispatchEvent(clickEvent);
         e.target.click();
      }


      setDragDistance(0); // Reset drag distance
    };

    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging, dragStart, gl, dragDistance]);

  useFrame((state, delta) => {
    if (ref.current) {
      easing.damp(ref.current.rotation, 'y', -rotation, 0.1, delta);
    }
  });

  return (
    <group ref={ref} position={[0, height, 0]}>
      <Carousel radius={radius} />
    </group>
  );
}

export default Rig;