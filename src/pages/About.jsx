// import { useScroll } from "@react-three/drei";
import { useTransform, useScroll } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Home, Projects, Contact } from '../pages'

// icons
import blender from '../assets/Icons/Blender.svg';
import marmoset from '../assets/Icons/Marmoset.svg';
import godot from '../assets/Icons/Godot.svg';
import unity from '../assets/Icons/Unity.svg';
import unreal from '../assets/Icons/Unreal.svg';
import gaea from '../assets/Icons/Gaea.svg';
import vscode from '../assets/Icons/VScode.svg';
import visualStudio from '../assets/Icons/VisualStudio.svg';
import git from '../assets/Icons/Git.svg';
import flax from '../assets/Icons/Flax.svg';


const skills = [
  { 
    title: '3D Environments', 
    description: 'I create real-time 3D environments for games, with optimized assets and carefully crafted lighting to enhance both mood and performance.' 
  },

  { 
    title: '3D Models', 
    description: 'I design detailed 3D models with UV unwrapping and LODs, optimized specifically for game development.' 
  },

  { 
    title: 'C++', 
    description: 'I am learning low-level programming and have developed a Ping Pong ball game in C++ using the Raylib library, with ImGui integrated for the user interface.' 
  },

  { 
    title: 'OpenGL', 
    description: 'I am currently exploring the OpenGL API and working on a project that utilizes OpenGL with the GLFW library.' 
  },

  { 
    title: 'HTML', 
    description: 'I have used HTML since school and college, and have built several websites using it.' 
  },

  { 
    title: 'CSS', 
    description: 'I have developed websites using CSS alongside HTML, with a solid understanding of responsive and modern design principles.' 
  },

  { 
    title: 'JavaScript', 
    description: 'I have an intermediate understanding of JavaScript, having worked with various libraries and frameworks. I also have experience in backend development using Node.js, Express.js, and MongoDB with Mongoose.' 
  },
  
  { 
    title: 'C#', 
    description: 'I have a foundational knowledge of C# for game development in Unity, and am actively building games using Unity and C#.' 
  },
  
  { 
    title: 'Python', 
    description: 'I have a basic understanding of Python, with exposure to its applications in AI and machine learning during my studies in college.' 
  },

  { 
    title: 'React', 
    description: 'I have a basic understanding of React, including components and hooks. This portfolio was built using React.' 
  },

  { 
    title: 'Three.js', 
    description: 'I have developed a solid understanding of Three.js and the WebGL graphics API. This portfolio features a 3D cube animation powered by Three.js and integrated with React via react-three-fiber.' 
  },

  { 
    title: 'Prompt Engineering', 
    description: 'I have a basic understanding of prompt engineering and know how to craft effective prompts to guide AI models such as ChatGPT and image generation tools for desired outcomes.' 
  },
];


const tools = [
  {
    title: 'Blender',
    image: blender,
    description: 'I have been using Blender for 4–5 years to create 3D environments and models, completing numerous projects. I have expertise in materials, shader graphs, UV unwrapping, texturing, and lighting techniques with both Eevee and Cycles. I also have a basic understanding of rigging, animation, and geometry nodes.'
  },
  
  {
    title: 'Marmoset Toolbag',
    image: marmoset,
    description: 'I primarily use Marmoset Toolbag for baking high-poly models to low-poly models, as it is an excellent tool for texture baking.'
  },
  
  {
    title: 'Godot',
    image: godot,
    description: `I developed a 2D game in Godot to better understand game development workflows. I have a basic knowledge of GDScript and Godot's scene system.`
  },
  
  {
    title: 'Unity',
    image: unity,
    description: 'I am currently learning Unity and have a foundational understanding of its interface, components, and C# scripting. I am also developing environments and games using the engine.'
  },
  
  {
    title: 'Unreal Engine',
    image: unreal,
    description: 'I initially began learning Unreal Engine to create games and environments, gaining basic proficiency with its interface, Blueprints, and workflow. I had to pause further learning due to performance limitations on my laptop.'
  },

  {
    title: 'Gaea',
    image: gaea,
    description: 'This is a powerful terrain generator software that I use to create diverse terrains for many of my projects. I regularly import these terrains into Blender to enhance my scenes. I have a solid working knowledge of this software and leverage its features to efficiently produce high-quality landscapes.'
  },
  
  {
    title: 'VS Code',
    image: vscode,
    description: 'VS Code is my primary code editor, offering a powerful and flexible development environment with a wide range of extensions and features. Its lightweight and open-source nature make it ideal for my setup.'
  },
  
  {
    title: 'Visual Studio',
    image: visualStudio,
    description: 'I previously used Visual Studio for C++ development and created a game using the Raylib library. Though I now prefer VS Code for its lighter footprint, I appreciate Visual Studio’s robust compilation and debugging tools.'
  },
  
  {
    title: 'Git and GitHub',
    image: git,
    description: 'I use Git and GitHub for version control in my projects. I have a basic understanding of Git commands and repository management on GitHub.'
  },
  
  {
    title: 'Flax',
    image: flax,
    description: 'I am currently exploring Flax Engine, a lightweight alternative to Unreal Engine. I have a basic understanding of its interface and components and am using it to experiment with game and environment creation.'
  },
];


const About = () => {
   const skillSectionRef = useRef(null);
  const toolsSectionRef = useRef(null);
  const skillsLineRef = useRef(null);
  const toolsLineRef = useRef(null);
  const [skillsLineHeight, setSkillsLineHeight] = useState(0);
  const [toolsLineHeight, setToolsLineHeight] = useState(0);
  
  // These refs should actually be assigned to DOM elements
  const skillsCardsRef = useRef(null);
  const toolsCardsRef = useRef(null);

  // Track scroll progress with better offset configuration
  const { scrollYProgress: skillsScrollProgress } = useScroll({
    target: skillSectionRef,
    offset: ["start 0.8", "end 0.2"], // Start animation when section is 80% in view
  });

  const { scrollYProgress: toolsScrollProgress } = useScroll({
    target: toolsSectionRef,
    offset: ["start 0.8", "end 0.2"],
  });

  // Improved line height calculation
  useLayoutEffect(() => {
    const updateLineHeights = () => {
      if (skillsCardsRef.current) {
        const height = skillsCardsRef.current.offsetHeight;
        if (height > 0) {
          setSkillsLineHeight(height);
        }
      }
      if (toolsCardsRef.current) {
        const height = toolsCardsRef.current.offsetHeight;
        if (height > 0) {
          setToolsLineHeight(height);
        }
      }
    };

    // Multiple attempts to get the correct height
    updateLineHeights();
    
    const timeoutId1 = setTimeout(updateLineHeights, 100);
    const timeoutId2 = setTimeout(updateLineHeights, 500);
    
    window.addEventListener("resize", updateLineHeights);

    return () => {
      window.removeEventListener("resize", updateLineHeights);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, []);

  // Cube animations with fallback values
  const skillsCubeY = useTransform(
    skillsScrollProgress,
    [0, 1],
    [0, Math.max(100, skillsLineHeight - 24)] // Fallback to 100px if height is 0
  );
  const skillsCubeRotation = useTransform(skillsScrollProgress, [0, 1], [0, 360]);

  const toolsCubeY = useTransform(
    toolsScrollProgress,
    [0, 1],
    [0, Math.max(100, toolsLineHeight - 24)] // Fallback to 100px if height is 0
  );
  const toolsCubeRotation = useTransform(toolsScrollProgress, [0, 1], [0, 360]);

  // Your existing getCardTransforms function remains the same...
  const getCardTransforms = (index, totalCards, scrollProgress) => {
    const cardSpacing = 0.2 / totalCards;
    const fadeInDuration = 0.2;
    const fadeOutStart = 0.9999 - fadeInDuration;

    const fadeInStart = Math.max(0, index * cardSpacing);
    const fadeInEnd = Math.min(0.8, fadeInStart + fadeInDuration);

    const opacityFadeIn = useTransform(scrollProgress, [fadeInStart, fadeInEnd], [0, 1]);
    const opacityFadeOut = useTransform(scrollProgress, [fadeOutStart, 1], [1, 0.8]);

    const opacity = useTransform([opacityFadeIn, opacityFadeOut], ([fadeIn, fadeOut]) => Math.min(fadeIn, fadeOut));
    const translateY = useTransform(scrollProgress, [fadeInStart, fadeInEnd], [30, 0]);

    return { opacity, translateY };
  };

  return (
    <motion.section
      id="about" 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 10 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-6 relative overflow-hidden "
    >
      <div className="max-w-6xl mx-auto text-gray-800 space-y-16">
        {/* About Me */}
        <div>
          <h2 className="text-4xl font-bold mb-6 border-b-4 border-gray-300 inline-block">
            About Me
          </h2>
          <p className="text-lg leading-relaxed">
            Hi, I'm <span className="font-semibold">Dhruv</span>, a <span className="font-semibold">3D Environment Artist</span> and <span className="font-semibold">3D Artist</span>, whose journey began as a hobby and passion for digital art. Since I started exploring 3D in <span className="font-semibold">2020</span>, this creative pursuit has evolved into a professional discipline rooted in a deep appreciation for visual storytelling and computer graphics.

            Over the years, I’ve developed a strong foundation in 3D art, working extensively with <span className="font-semibold">Blender</span> to design immersive environments and detailed models. As a self-taught artist, I’ve built my skills through YouTube tutorials, online courses, and countless hours of hands-on experimentation.

            My work is fueled by a passion for crafting atmospheric, realistic worlds and turning ideas into visually compelling experiences. I thrive on creative challenges and enjoy pushing the boundaries of what's possible through 3D art.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            I am currently pursuing a <span className="font-semibold">Bachelor of Engineering</span> in <span className="font-semibold">Electronics and Communication</span> at Government Engineering College, Bhavnagar. Throughout my academic journey, I have gained hands-on experience with programming languages such as <span className="font-semibold">C, C++, Python</span>, and <span className="font-semibold">JavaScript</span>. Learning these languages has deepened my understanding of computer graphics, the core principles of 3D rendering, and the inner workings of real-time graphics in games. This foundation sparked my interest in game development and led me to explore game engines and tools like <span className="font-semibold">Unreal Engine, Godot, Unity</span>, and lightweight frameworks such as <span className="font-semibold">Raylib</span>. Through these platforms, I have developed a few games and acquired a foundational grasp of <span className="font-semibold">OpenGL</span>.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            While I continue to expand my knowledge and skillset, my core passion lies in designing captivating 3D environments. Recently, I have been focused on creating immersive scenes for games using various game engines and have begun developing my own games as a solo developer, primarily working with <span className="font-semibold">Unity</span>.
          </p>

        </div>


        {/* Skills Section */}
        <section ref={skillSectionRef} className="relative py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold border-b-4 border-gray-300 inline-block">
              Skills
            </h2>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Left Line */}
            <div className="relative w-full md:w-16 md:flex-shrink-0 mb-12 md:mb-0 -z-10">
              <div
                ref={skillsLineRef}
                className="absolute left-1/2 md:left-8 top-0 w-1 bg-gray-300 transform -translate-x-1/2"
                style={{ height: skillsLineHeight ? `${skillsLineHeight}px` : "800px" }} // Fallback height
              />
              <motion.div
                className="absolute w-6 h-6 bg-blue-500 shadow-lg rounded-sm"
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: 0,
                  y: skillsCubeY,
                  rotate: skillsCubeRotation,
                }}
              />
            </div>

            {/* Cards - ASSIGN THE REF HERE */}
            <div ref={skillsCardsRef} className="flex-1 space-y-12">
              {skills.map((skill, i) => {
                const { opacity, translateY } = getCardTransforms(
                  i,
                  skills.length,
                  skillsScrollProgress
                );
                return (
                  <motion.div
                    key={i}
                    style={{ opacity, y: translateY }}
                    className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-blue-300"
                  >
                    <h3 className="text-xl font-semibold text-blue-600 mb-3">
                      {skill.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {skill.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section ref={toolsSectionRef} className="relative py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold border-b-4 border-gray-300 inline-block">
              Tools I Use
            </h2>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Left Line */}
            <div className="relative w-full md:w-16 md:flex-shrink-0 mb-12 md:mb-0 -z-10">
              <div
                ref={toolsLineRef}
                className="absolute left-1/2 md:left-8 top-0 w-1 bg-gray-300 transform -translate-x-1/2"
                style={{ height: toolsLineHeight ? `${toolsLineHeight}px` : "800px" }} // Fallback height
              />
              <motion.div
                className="absolute w-6 h-6 bg-green-500 shadow-lg rounded-sm"
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: 0,
                  y: toolsCubeY,
                  rotate: toolsCubeRotation,
                }}
              />
            </div>

            {/* Cards - ASSIGN THE REF HERE */}
            <div ref={toolsCardsRef} className="flex-1 space-y-12">
              {tools.map((tool, i) => {
                const { opacity, translateY } = getCardTransforms(
                  i,
                  tools.length,
                  toolsScrollProgress
                );
                return (
                  <motion.div
                    key={i}
                    style={{ opacity, y: translateY }}
                    className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-green-300"
                  >
                    {tool.image && (
                      <img
                        src={tool.image}
                        alt={`${tool.title} logo`}
                        className="w-12 h-12 object-contain mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold text-green-600 mb-3">
                      {tool.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {tool.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16 flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 w-full max-w-xs">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              See My Works and Projects
            </h3>
            <Link
              to="/projects"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium"
            >
              View Projects
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 w-full max-w-xs">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Get In Touch
            </h3>
            <Link
              to="/contact"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium"
            >
              Contact Me
            </Link>
          </div>
        </section>
        

        
      </div>
    </motion.section>
  );
};

export default About;
