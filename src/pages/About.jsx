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
import vscode from '../assets/Icons/VScode.svg';
import visualStudio from '../assets/Icons/VisualStudio.svg';
import git from '../assets/Icons/Git.svg';
import github from '../assets/Icons/Github.svg';
import flax from '../assets/Icons/Flax.svg';


const skills = [
  { 
    title: '3D Environments', 
    description: 'I can create real-time 3D environments for games, with optimized assets and carefully crafted lighting to enhance mood and performance.' 
  },

  { 
    title: '3D Models', 
    description: 'I can create detailed 3D models with UV unwrapping and LODs optimized for games.' 
  },

  { 
    title: 'C++', 
    description: `I've been learning low-level programming and created a ping pong ball game in C++ using raylib, with ImGui integrated into it.`
  },

  { 
    title: 'OpenGl', 
    description: `I've recently been learning the OpenGL API and am currently working on a project using OpenGL with the GLFW library.`
  },

  { 
    title: 'HTML', 
    description: 'I learned HTML in school and college, and have created several websites using it.' 
  },

  { 
    title: 'CSS', 
    description: 'I learned CSS alongside HTML and have built several websites using both.' 
  },

  { 
    title: 'Javascript', 
    description: 'I learned JavaScript in college and have an intermediate understanding of it. I’ve worked with various libraries and frameworks, and also gained experience in backend development using Node.js, Express.js, and MongoDB with Mongoose.' 
  },
  
  { 
    title: 'C#', 
    description: 'I learned basic C# for game development in Unity, and I plan to start creating games using Unity and C#.' 
  },
  
  { 
    title: 'Python', 
    description: 'I have a basic understanding of Python and its applications in AI and machine learning, which I studied in college.' 
  },

  { 
    title: 'React', 
    description: `I have a basic understanding of React, including how it works, its components, and hooks. This portfolio was also built using React` 
  },

  { 
    title: 'Three.js', 
    description: `I've learned the Three.js library along with the WebGL graphics API, and have a solid understanding of how they work. This portfolio also uses Three.js for the 3D cube animation, integrated into React using react-three-fiber.`
  },

  { 
    title: 'Prompt Engineering', 
    description: `I have a basic understanding of prompt engineering, including how to craft effective prompts to guide AI models like ChatGPT and image generation tools. I know how prompts work and how to use them to get the desired output from AI models.`
  },

];

const tools = [
  {
    title: 'Blender',
    image: blender,
    description: `I've been using Blender for nearly 4-5 years to create 3D environments and models, and have completed many projects using it. I have a solid understanding of materials, shader graphs, UV unwrapping, and texturing. I'm also knowledgeable in lighting and rendering techniques using both Eevee and Cycles. Additionally, I have a basic understanding of rigging, animation, and geometry nodes in Blender.`
  },
  
  {
    title: 'Marmoset Toolbag',
    image: marmoset,
    description: 'I mainly use Blender for baking high-poly models to low-poly models, as it’s a powerful tool for texture baking.'
  },
  
  {
    title: 'Godot',
    image: godot,
    description: `I used Godot to create a 2D game as a way to understand the development process. I have a basic understanding of its scripting language, GDScript, as well as its scene system.`
  },
  
  {
    title: 'Unity',
    image: unity,
    description: `I've recently started learning Unity and have a basic understanding of its interface, components, and C# scripting. I've also begun creating environments and games using it.`
  },
  
  {
    title: 'Unreal Engine',
    image: unreal,
    description: 'I initially started learning Unreal Engine to create games and environments, and gained a basic understanding of its interface, Blueprints, and overall workflow. However, I had to switch due to performance issues on my laptop.'
  },
  
  {
    title: 'VS Code',
    image: vscode,
    description: `I use VS Code as my primary code editor for development, as it offers a great coding environment with powerful extensions and features. It's also open-source and lightweight, which makes it ideal for my laptop.`
  },
  
  {
    title: 'Visual Studio',
    image: visualStudio,
    description: `I previously used Visual Studio for C++ development, but I now prefer VS Code because Visual Studio is quite heavy for my laptop. I used it to develop a game using the Raylib library in C++, which automatically compiles and links all the necessary files and libraries to run the game.`
  },
  
  {
    title: 'Git and GitHub',
    image: git,
    description: 'I use Git and GitHub for version control in my projects. I have a basic understanding of Git commands and how to manage repositories on GitHub.'
  },
  
  {
    title: 'Flax',
    image: flax,
    description: `I recently started learning Flax Engine, which is essentially a lightweight alternative to Unreal Engine. I've been exploring it to create games and environments, and have a basic understanding of its interface and components.`
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
            Hi, I'm <span className="font-semibold">Dhruv</span>, a 3D environment artist and 3D artist. I started working as a 3D artist as a hobby about 5 years ago and have learned a lot about 3D art and computer graphics since then. I have been using Blender for almost 5 years and have created many environment scenes and 3D models. I have learned everything I know about 3D art and computer graphics through YouTube videos, online courses, and my own experimentation. I have a passion for creating realistic and immersive 3D environments, and I love the challenge of bringing my ideas to life through 3D art.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Right now, I am a student at <span className="font-semibold">Government Engineering College Bhavnagar</span>, pursuing a Bachelor of Engineering degree in Electronics and Communication. Through college, I have learned programming languages like <span className="font-semibold"> C, C++, Python, and JavaScript.</span> By learning these languages, I gained insight into computer graphics, how 3D rendering is done behind the scenes, and how real-time rendering works in games. This inspired me to start learning game development and the basic concepts using <span className="font-semibold">Unreal, Godot, and Unity</span>, as well as some game development frameworks like <span className="font-semibold">Raylib</span>. I have also created some games using these tools and learned the basic concepts of OpenGL.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Although I have learned a lot, my main passion is creating stunning 3D environments. I have started making environments for games in engines and have also begun developing games as a solo developer in Unity.
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
            <div className="relative w-full md:w-16 md:flex-shrink-0 mb-12 md:mb-0">
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
            <div className="relative w-full md:w-16 md:flex-shrink-0 mb-12 md:mb-0">
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
