import React, { useState, useEffect, useRef } from 'react';

const FloatingCubes = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCube, setHoveredCube] = useState(null);
  const [activeCube, setActiveCube] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 });
  const [touchVelocity, setTouchVelocity] = useState({ x: 0, y: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [isMouseInContainer, setIsMouseInContainer] = useState(false);
  const lastTouchTime = useRef(0);
  const touchTimeout = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastFrameTime = useRef(0);
  const isDraggingRef = useRef(false);
  const touchStartTimeRef = useRef(0);
  const touchStartPositionRef = useRef({ x: 0, y: 0 });
  const touchVelocityRef = useRef({ x: 0, y: 0 });
  const isAutoRotatingRef = useRef(true);
  const lastTouchTimeRef = useRef(0);
  const touchTimeoutRef = useRef(null);
  const rotationSpeedRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const dampingFactor = 0.95;
  const minSwipeDistance = 10;
  const maxRotationSpeed = 0.1;
  const autoRotationSpeed = 0.005;
  const touchSensitivity = 0.003;
  const swipeThreshold = 50;
  const swipeTimeout = 300;
  const rotationDamping = 0.95;
  const velocityDamping = 0.98;
  const minVelocity = 0.0001;
  const maxVelocity = 0.1;
  const touchStartTimeThreshold = 300;
  const touchDistanceThreshold = 10;
  const touchVelocityThreshold = 0.001;
  const autoRotationThreshold = 0.0001;
  const mouseSensitivity = 0.003; // Increased sensitivity for mouse movement without dragging
  const touchStartTimeRef2 = useRef(0);
  const touchStartPositionRef2 = useRef({ x: 0, y: 0 });
  const touchVelocityRef2 = useRef({ x: 0, y: 0 });
  const isDraggingRef2 = useRef(false);
  const rotationRef2 = useRef({ x: 0, y: 0 });
  const velocityRef2 = useRef({ x: 0, y: 0 });
  const lastFrameTimeRef2 = useRef(0);
  const isAutoRotatingRef2 = useRef(true);
  const lastTouchTimeRef2 = useRef(0);
  const touchTimeoutRef2 = useRef(null);
  const rotationSpeedRef2 = useRef({ x: 0, y: 0 });
  const dampingFactor2 = 0.95;
  const minSwipeDistance2 = 10;
  const maxRotationSpeed2 = 0.1;
  const autoRotationSpeed2 = 0.005;
  const touchSensitivity2 = 0.003;
  const swipeThreshold2 = 50;
  const swipeTimeout2 = 300;
  const rotationDamping2 = 0.95;
  const velocityDamping2 = 0.98;
  const minVelocity2 = 0.0001;
  const maxVelocity2 = 0.1;
  const touchStartTimeThreshold2 = 300;
  const touchDistanceThreshold2 = 10;
  const touchVelocityThreshold2 = 0.001;
  const autoRotationThreshold2 = 0.0001;

  // Update refs when state changes
  useEffect(() => {
    rotationRef.current = rotation;
    isDraggingRef.current = isDragging;
    touchStartTimeRef.current = touchStartTime;
    touchStartPositionRef.current = touchStartPosition;
    touchVelocityRef.current = touchVelocity;
    isAutoRotatingRef.current = isAutoRotating;
    lastTouchTimeRef.current = lastTouchTime.current;
    mousePositionRef.current = mousePosition;
  }, [rotation, isDragging, touchStartTime, touchStartPosition, touchVelocity, isAutoRotating, mousePosition, isMouseInContainer]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation frame update
  useEffect(() => {
    let animationFrameId;
    const updateRotation = (time) => {
      if (!lastFrameTime.current) {
        lastFrameTime.current = time;
      }
      const deltaTime = time - lastFrameTime.current;
      lastFrameTime.current = time;

      if (!isDraggingRef.current) {
        if (Math.abs(touchVelocityRef.current.x) > minVelocity || 
            Math.abs(touchVelocityRef.current.y) > minVelocity) {
          // Apply velocity-based rotation with increased sensitivity for mobile
          const newRotation = {
            x: rotationRef.current.x + touchVelocityRef.current.x * deltaTime * (isMobile ? 2 : 1),
            y: rotationRef.current.y + touchVelocityRef.current.y * deltaTime * (isMobile ? 2 : 1)
          };
          setRotation(newRotation);
          
          // Apply damping to velocity
          touchVelocityRef.current = {
            x: touchVelocityRef.current.x * velocityDamping,
            y: touchVelocityRef.current.y * velocityDamping
          };
        } else if (isAutoRotatingRef.current && !isMouseInContainer) {
          // Apply auto-rotation with increased speed for mobile, but only when mouse is not in container
          setRotation(prev => ({
            x: prev.x + autoRotationSpeed * deltaTime * (isMobile ? 1.5 : 1),
            y: prev.y + autoRotationSpeed * deltaTime * (isMobile ? 1.5 : 1)
          }));
        }
      }

      animationFrameId = requestAnimationFrame(updateRotation);
    };

    animationFrameId = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile, isMouseInContainer]);

  const handleTouchStart = (e) => {
    e.preventDefault(); // Prevent default touch behavior
    const touch = e.touches[0];
    const currentTime = Date.now();
    
    setTouchStartTime(currentTime);
    setTouchStartPosition({ x: touch.clientX, y: touch.clientY });
    setCurrentPosition({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
    setIsAutoRotating(false);
    setTouchVelocity({ x: 0, y: 0 });
    lastTouchTime.current = currentTime;
    
    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current);
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent default touch behavior
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTouchTime.current;
    
    if (deltaTime > 0) {
      const deltaX = touch.clientX - currentPosition.x;
      const deltaY = touch.clientY - currentPosition.y;
      
      // Calculate velocity based on movement with increased sensitivity for mobile
      const velocityX = deltaX / deltaTime;
      const velocityY = deltaY / deltaTime;
      
      // Update rotation based on touch movement with increased sensitivity for mobile
      setRotation(prev => ({
        x: prev.x + deltaX * (isMobile ? 0.008 : 0.005),
        y: prev.y + deltaY * (isMobile ? 0.008 : 0.005)
      }));
      
      // Update velocity with increased sensitivity for mobile
      setTouchVelocity({
        x: velocityX * (isMobile ? 0.008 : 0.005),
        y: velocityY * (isMobile ? 0.008 : 0.005)
      });
      
      setCurrentPosition({ x: touch.clientX, y: touch.clientY });
      lastTouchTime.current = currentTime;
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault(); // Prevent default touch behavior
    if (!isDragging) return;
    
    const currentTime = Date.now();
    const touchDuration = currentTime - touchStartTime;
    const deltaX = currentPosition.x - touchStartPosition.x;
    const deltaY = currentPosition.y - touchStartPosition.y;
    
    // Calculate final velocity with increased sensitivity for mobile
    const finalVelocityX = (deltaX / touchDuration) * (isMobile ? 0.008 : 0.005);
    const finalVelocityY = (deltaY / touchDuration) * (isMobile ? 0.008 : 0.005);
    
    // Set the final velocity
    setTouchVelocity({
      x: finalVelocityX,
      y: finalVelocityY
    });
    
    setIsDragging(false);
    
    // Start auto-rotation after a delay if the velocity is low
    if (Math.abs(finalVelocityX) < 0.001 && Math.abs(finalVelocityY) < 0.001) {
      touchTimeout.current = setTimeout(() => {
        setIsAutoRotating(true);
      }, 300);
    }
  };

  const handleMouseDown = (e) => {
    const currentTime = Date.now();
    setTouchStartTime(currentTime);
    setTouchStartPosition({ x: e.clientX, y: e.clientY });
    setCurrentPosition({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
    setIsAutoRotating(false);
    setTouchVelocity({ x: 0, y: 0 });
    lastTouchTime.current = currentTime;
    
    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) {
      // Handle mouse movement without dragging for floating effect
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate normalized position (-1 to 1)
        const normalizedX = (mouseX - centerX) / centerX;
        const normalizedY = (mouseY - centerY) / centerY;
        
        // Apply direct rotation based on mouse position for immediate response
        setRotation(prev => ({
          x: prev.x + normalizedY * 0.02, // Direct rotation based on Y position
          y: prev.y + normalizedX * 0.02  // Direct rotation based on X position
        }));
      }
      return;
    }
    
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTouchTime.current;
    
    if (deltaTime > 0) {
      const deltaX = e.clientX - currentPosition.x;
      const deltaY = e.clientY - currentPosition.y;
      
      const velocityX = deltaX / deltaTime;
      const velocityY = deltaY / deltaTime;
      
      // Update rotation based on mouse movement with increased sensitivity
      setRotation(prev => ({
        x: prev.x + deltaX * 0.005, // Increased sensitivity
        y: prev.y + deltaY * 0.005  // Increased sensitivity
      }));
      
      // Update velocity with increased sensitivity
      setTouchVelocity({
        x: velocityX * 0.005,
        y: velocityY * 0.005
      });
      
      setCurrentPosition({ x: e.clientX, y: e.clientY });
      lastTouchTime.current = currentTime;
    }
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    
    const currentTime = Date.now();
    const touchDuration = currentTime - touchStartTime;
    const deltaX = currentPosition.x - touchStartPosition.x;
    const deltaY = currentPosition.y - touchStartPosition.y;
    
    // Calculate final velocity with increased sensitivity
    const finalVelocityX = (deltaX / touchDuration) * 0.005;
    const finalVelocityY = (deltaY / touchDuration) * 0.005;
    
    setTouchVelocity({
      x: finalVelocityX,
      y: finalVelocityY
    });
    
    setIsDragging(false);
    
    if (Math.abs(finalVelocityX) < 0.001 && Math.abs(finalVelocityY) < 0.001) {
      touchTimeout.current = setTimeout(() => {
        setIsAutoRotating(true);
      }, 300);
    }
  };

  const handleMouseEnter = () => {
    setIsMouseInContainer(true);
    setIsAutoRotating(false);
  };

  const handleMouseLeave = () => {
    setIsMouseInContainer(false);
    setIsDragging(false);
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 300);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        height: '100%',
        touchAction: 'none', // Prevent default touch actions
        WebkitTouchCallout: 'none', // Prevent callout on iOS
        WebkitUserSelect: 'none', // Prevent selection on iOS
        userSelect: 'none', // Prevent selection
      }}
    >
      {/* Render your cubes here */}
    </div>
  );
};

export default FloatingCubes; 