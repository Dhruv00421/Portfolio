import { useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import React, { useEffect, useRef, useState } from 'react';
import Carousel from './Carousel.jsx';

const TOUCH_MULTIPLIER = 0.008; // Slightly reduced for smoother control
const MOUSE_MULTIPLIER = 0.002;

function Rig({ height = -0.5 }) {
  const ref = useRef();
  const { gl } = useThree();
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragDistance, setDragDistance] = useState(0);
  const [radius, setRadius] = useState(3.4);
  const isTouch = useRef(false);
  const rotationTarget = useRef(0);
  const lastTouchTime = useRef(0);
  const velocity = useRef(0); // For momentum
  const lastDelta = useRef(0); // Track movement delta

  useEffect(() => {
    const updateRadius = () => {
      const isMobile = window.innerWidth < 768;
      setRadius(isMobile ? 2.7 : 3.4);
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e) => {
      setIsDragging(true);
      isTouch.current = false;
      setDragStart({ x: e.clientX, y: e.clientY });
      gl.domElement.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      setDragDistance((prev) => prev + Math.abs(deltaX) + Math.abs(deltaY));
      setRotation((prev) => {
        const newRot = prev - deltaX * MOUSE_MULTIPLIER;
        rotationTarget.current = newRot;
        return newRot;
      });

      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handlePointerUp = (e) => {
      setIsDragging(false);
      gl.domElement.style.cursor = 'grab';

      if (dragDistance < 5) {
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        e.target.click();
      }

      setDragDistance(0);
    };

    // Optimized touch handlers for mobile
    const handleTouchStart = (e) => {
      e.preventDefault(); // Prevent scrolling
      setIsDragging(true);
      isTouch.current = true;
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      gl.domElement.style.cursor = 'grabbing';
      lastTouchTime.current = performance.now();
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      
      e.preventDefault(); // Prevent scrolling
      
      // Throttle touch events for better performance
      const now = performance.now();
      if (now - lastTouchTime.current < 12) return; // Slightly faster updates for smoother feel
      lastTouchTime.current = now;

      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;
      const deltaX = clientX - dragStart.x;
      const deltaY = clientY - dragStart.y;

      setDragDistance((prev) => prev + Math.abs(deltaX) + Math.abs(deltaY));
      
      // Calculate velocity for momentum - reduced impact
      const rotationDelta = -deltaX * TOUCH_MULTIPLIER;
      velocity.current = rotationDelta * 0.6; // Reduce velocity by 40%
      lastDelta.current = rotationDelta;
      
      // Smooth rotation update
      rotationTarget.current += rotationDelta;
      setDragStart({ x: clientX, y: clientY });
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      setIsDragging(false);
      isTouch.current = false;
      gl.domElement.style.cursor = 'grab';
      setDragDistance(0);
      
      // Add momentum when touch ends - reduced momentum
      if (Math.abs(velocity.current) > 0.0005) { // Higher threshold to start momentum
        const momentumDecay = 0.88; // Faster decay (was 0.95)
        const addMomentum = () => {
          velocity.current *= momentumDecay;
          rotationTarget.current += velocity.current;
          
          if (Math.abs(velocity.current) > 0.0002) { // Higher threshold to stop momentum
            requestAnimationFrame(addMomentum);
          }
        };
        addMomentum();
      }
    };

    const canvas = gl.domElement;
    
    // Desktop pointer events
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);

    // Mobile touch events with passive: false for preventDefault
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointercancel', handlePointerUp);

      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isDragging, dragStart, gl, dragDistance]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Much smoother easing with different rates for different scenarios
      let dampingFactor;
      
      if (isDragging) {
        // Very responsive when actively dragging
        dampingFactor = isTouch.current ? 0.25 : 0.2;
      } else {
        // Smoother when settling
        dampingFactor = 0.08;
      }
      
      easing.damp(ref.current.rotation, 'y', -rotationTarget.current, dampingFactor, delta);
    }
  });

  return (
    <group ref={ref} position={[0, height, 0]}>
      <Carousel radius={radius} />
    </group>
  );
}

export default Rig;