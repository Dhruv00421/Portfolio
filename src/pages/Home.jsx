import React, { Suspense, useState, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { motion } from 'framer-motion'
import Loader from '../Components/Loader'
import Cube from '../models/Cube'
import FloatingCubes from '../models/FloatingCube'
import Rig from '../Components/Rig'
import arrow from "../assets/Icons/arrow.svg"; 
import { useLocation } from 'react-router-dom'

const Home = () => {

  const [isRotating, setIsRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false); 
  const [currentStage, setCurrentStage] = useState(null);
  const [onSwipeOffset, setOnSwipeOffset] = useState(null)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [mouseX, setMouseX] = useState(0);
  const [visibleStage, setVisibleStage] = useState(null);
  
  const [cubeProps, setCubeProps] = useState({
    scale: [1, 1, 1],
    position: [0, -0.3, 2],
    rotation: [0.1, 4.7, 0]
  });

  const updateCubeForScreenSize = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    setCubeProps({
      scale: isMobile ? [0.8, 0.8, 0.8] : isTablet ? [0.9, 0.9, 0.9] : [1, 1, 1],
      position: isMobile ? [0, -0.2, 1.2] : isTablet ? [0, -0.2, 1.5] : [0, -0.3, 2],
      rotation: [0.1, 4.7, 0],
    });
  };

  useEffect(() => {
    updateCubeForScreenSize();
    window.addEventListener('resize', updateCubeForScreenSize);
    return () => window.removeEventListener('resize', updateCubeForScreenSize);
  }, []);


  const [floatingProps, setFloatingProps] = useState({
    count: 30,
    radius: 3
  });

  const updateFloatingProps = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    setFloatingProps({
      count: isMobile ? 10 : isTablet ? 20 : 30,
      radius: isMobile ? 2 : isTablet ? 2.5 : 3
    });
  };

  useEffect(() => {
    updateFloatingProps();
    window.addEventListener('resize', updateFloatingProps);
    return () => window.removeEventListener('resize', updateFloatingProps);
  }, []);

  
  const location = useLocation()
  const isRoot = location.pathname === '/'

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  useEffect(() => {
    if (currentStage !== null) {
      setVisibleStage(currentStage);
      const timeout = setTimeout(() => setVisibleStage(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentStage]);

  useEffect(() => {
    if (!isRotating) return;

    const onMouseMove = (e) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      setMouseX(normalizedX);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      setMouseX(0);
    };
  }, [isRotating]);

  return (
    <motion.section 
      className='w-full min-h-screen h-[100dvh] pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28 relative bg-[#FAFAFA]'
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    > 
      <div className='absolute bottom-24 sm:bottom-32 md:bottom-20 lg:bottom-24 left-4 sm:left-8 md:left-12 lg:left-16 flex items-center gap-1.5 sm:gap-2 text-black font-medium text-[10px] sm:text-xs md:text-sm lg:text-base'>
        Swipe For more
        <img src={arrow} alt='arrow' className='w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 object-contain' />
      </div>
      
      <Canvas
        gl={{ toneMapping: useThree.ACESFilmicToneMapping }}
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ 
          near: 0.1, 
          far: 1000,
          fov: window.innerWidth < 768 ? 70 : window.innerWidth < 1024 ? 65 : 60
        }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, -3, 1]} intensity={10} />
          <directionalLight position={[-1, -3, 1]} intensity={10} />
          <ambientLight color={0x223344} intensity={10} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <FloatingCubes 
            count={floatingProps.count} 
            radius={floatingProps.radius} 
            height={window.innerWidth < 768 ? 0.15 : 0.2} 
            directionOffset={mouseOffset}
          />

          <Rig height={window.innerWidth < 768 ? -0.3 : -0.2} />
          
          <Cube
            position={cubeProps.position}
            rotation={cubeProps.rotation}
            scale={cubeProps.scale}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
            onSwipeOffset={onSwipeOffset}
            isDragging={isDragging} 
            setIsDragging={setIsDragging}
          />
        </Suspense>
      </Canvas>

      

      {!isRoot && (
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center z-20 bg-white/90 backdrop-blur-md"
        >
          <div className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-black">
            {location.pathname === '/about' && 'About Page'}
            {location.pathname === '/contact' && 'Contact Page'}
            {location.pathname === '/projects' && 'Projects Page'}
          </div>
        </motion.div>
      )}
    </motion.section>
  )
}

export default Home;