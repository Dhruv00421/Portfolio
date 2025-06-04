import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Code, Palette, Gamepad2, Globe, Zap, Instagram } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// icons
import artstation from '../assets/Icons/Artstation.svg';
import instagram from '../assets/Icons/Instagram.svg';
import linkedin from '../assets/Icons/Linkedin1.svg'

// projects img
// 3D environments
// import { animeSceneMain, animeScene1, animeScene2, animeScene3, animeScene4, animeScene5 } from '../assets/Images';
// import { winterWonderlandMain, winterWonderland1, winterWonderland2, winterWonderland3 } from '../assets/Images';
// import { moonLandscapeMain, moonLandscape1, moonLandscape2, moonLandscape3, moonLandscape4, moonLandscape5 } from '../assets/Images';
// import { battleArenaMain, battleArena1, battleArena2 } from '../assets/Images';
// import { cubeSceneMain, cubeScene1, cubeScene2, cubeScene3, cubeScene4, cubeScene5, cubeScene6 } from '../assets/Images';
// import { petrolSceneMain, petrolScene1, petrolScene2, petrolScene3, petrolScene4, petrolScene5 } from '../assets/Images';
// import { ruinsSceneMain, ruinsScene1, ruinsScene2, ruinsScene3, ruinsScene4 } from '../assets/Images';
// import { templeSceneMain, templeScene1, templeScene2, templeScene3, templeScene4, templeScene5, templeScene6, templeScene7 } from '../assets/Images';
// import { luminaraSceneMain, luminaraScene1, luminaraScene2, luminaraScene4 } from '../assets/Images';

// // 3D models
// import { swordMain, swordworkbench } from '../assets/Images';
// import { arcMain, arcworkbench } from '../assets/Images';
// import { gunMain, gun1, gun2 } from '../assets/Images';
// import { robotArmMain } from '../assets/Images';
// import { storageBoxMain, storageBox1, storageBox2 } from '../assets/Images';
// import { machineGunMain, machineGun1, machineGun2, machineGun3, machineGun4 } from '../assets/Images';
// import { saregamaMain, saregama1, saregama2, saregama3 } from '../assets/Images';
// import { assaultMain, assault1, assault2 } from '../assets/Images';
// import { robotMain, robot1, robot2, robot3 } from '../assets/Images';

// // Games
// import { pingPongBall } from '../assets/Images';
// import { knightGameMain } from '../assets/Images';

//environments


const projects = [
  {
    id: 1,
    title: "Anime Style Scene",
    category: "3D Environment",
    description: "This is my first scene in blender, inspired by anime aesthetics. I made different scenes before this one, but this is the first perfectly finished.",
    image: "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040440/scene2_kisy79.png",
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040440/scene2_kisy79.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040436/animeScene3_fkotnl.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040439/Scene1_ynmbhk.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040435/animeScene_lrazco.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040436/animeScene2_woaajx.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040444/animesceneworkbench_sfztcr.png",
    ],
    technologies: ["Blender", "Evee Engine"],
    type: "3D Art",
    links: {
      demo: "#",
      github: "#",
      behance: "#"
    }
  },
  {
    id: 2,
    title: "Winter Wonderland Scene",
    category: "3D Environment",
    description: "This scene I made for the winter wonderland challenge which host by kaizen (a wellknown youtuber). It features a castle in the middle of a snowy landscape with a snow flakes.",
    image: "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040558/winterwonder_psofp3.png",
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040558/winterwonder_psofp3.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040550/wintercastle_nlanve.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040556/wintercastleworkrandom_hbiit2.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040552/wintercastlework_vpvgeu.png",
    ],
    technologies: ["Blender", "Cycle Engine", "Evee Engine"  ],
    type: "3D Art",
    featured: true,
    links: {
      demo: "#",
      github: "#"
    }
  },
  {
    id: 3,
    title: "Lunar Landscape",
    category: "3D Environment",
    description: "This is another scene I created for the Kaizen Challenge, featuring a lunar landscape theme. This project helped me deepen my understanding of lighting and terrain creation.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040524/Moon_landscape4k_nvlgn0.png',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040524/Moon_landscape4k_nvlgn0.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040519/Moonlandscape_eib5iv.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040516/Moon4_Compo_qvexgm.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040526/moon8k_htchsg.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040521/Moon_workbench_qzpe47.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040518/moon8k_Clay_mkkz59.jpg",
    ],
    technologies: ["Blender", "Cycle Engine"],
    type: "3D Art",
    links: {
      github: "#",
      demo: "#"
    }
  },
  {
    id: 4,
    title: "Battle Arena",
    category: "3D Environment",
    description: "This scene is designed as a battle arena, which I created as an experimental project. I built it with the intention of exporting it to Unity for use in game development. I learned a lot about texturing and material creation in Blender while working on this project.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040457/main_jw4xgn.jpg',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040457/main_jw4xgn.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040458/Arena_stzz96.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040454/Arena_clay_l3apa2.jpg",
    ],
    technologies: ["Blender", "Cycle Engine"],
    type: "3D Art",
    links: {
      github: "#",
      demo: "#"
    }
  },
  {
    id: 5,
    title: "Cube Scene",
    category: "3D Environment",
    description: "This is one of my fully refined scenes created in Blender. It features a default cube setup with various lighting experiments, and helped me understand optimization techniques within Blender.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040469/Cubemain_lrriee.jpg',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040469/Cubemain_lrriee.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040474/Cube_1_so6upn.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040471/Cube2_zfmbmg.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040469/Cube_3_polodh.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040466/Cube_4_jni3gr.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040472/Cube_work_pmeepn.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040466/Cube_clay_taqqv5.png",
    ],
    technologies: ["Blender", "Cycle Engine"],
    type: "3D Art",
    links: {
      demo: "#",
      github: "#"
    }
  },
  {
    id: 6,
    title: "Petrol Pump Scene",
    category: "3D Environment",
    description: "This is another experimental project I created to test exterior lighting. The scene is inspired by the loading screen image from the game PUBG.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040554/Petrol_pump_main_cx4nxl.png',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040554/Petrol_pump_main_cx4nxl.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040569/Petrol_pump_1_kbib79.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040580/petrol_pump_2_nikfbl.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040581/petrol_pump_3_oqmkdx.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040543/Petrol_Pump_Workbench_dfqx7q.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040541/Petrol_Pump_clay_briors.png",
    ],
    technologies: ["Blender", "Cycle Engine"],
    type: "3D Art",
    links: {
      demo: "#",
      github: "#"
    }
  },
  
  {
    id: 7,
    title: "Temple Scene",
    category: "3D Environment",
    description: "This is one of my favorite scenes created in Blender, featuring a ruined temple in a cave. It is loast temple of the ancient civilization. This project helped me to understand volumetric lighting, texturing in detail, particle system in blender.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040560/TempleMain_irqyd8.jpg',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040560/TempleMain_irqyd8.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040567/Temple2_w9fm94.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040592/Temple3_nff8ps.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040547/Temple4_gtgklm.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040591/Temple5_uvrsfk.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040592/Temple6_olyl9v.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040571/Temple1_y5ro9d.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040577/Temple7_uqnjqk.png",
    ],
    technologies: ["Blender", "Cycle Engine"],
    type: "3D Art",
    links: {
      demo: "#",
      behance: "#"
    }
  },
  {
    id: 8,
    title: "Luminara Scene",
    category: "3D Environment",
    description: "This is my latest project, created for the KitBash3D Luminara Challenge. It depicts the lost city of Luminara, discovered by a group of explorers and later visited by many others. The project is not fully completed due to hardware limitations, as my system struggled to handle the high-detail assets.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040476/Luminaramain_pnpyuo.jpg',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040476/Luminaramain_pnpyuo.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040478/Luminara2_tysgg2.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040480/Luminara1_b3kklb.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040481/Luminara4_fljd7q.png",
    ],
    technologies: ["Blender", "Cycle Engine"],
    type: "3D Art",
    links: {
      demo: "#",
      behance: "#"
    }
  },

  {
    id: 9,
    title: "Ruins Scene",
    category: "3D Environment",
    description: "This is one of my favorite scenes created in Blender, featuring a ruined temple on a mountain. This project helped me learn a lot about lighting, texturing, clouds, camera angles, and composition. I also used several online assets to speed up the creation process. It also helped me understand the technical aspects of scene creation in Blender, particularly through the use of geometry nodes.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040567/Ruin-1_ih4gur.jpg',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040567/Ruin-1_ih4gur.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040569/Ruin_main_wxovlt.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040562/Ruin-2_okc6mr.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040573/Ruin_Workbench_ppxgyr.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040545/Ruin_Clay_na9sfr.jpg",
    ],
    technologies: ["Blender", "Cycle Engine"],
    type: "3D Art",
    links: {
      demo: "#",
      github: "#"
    }
  },
  
  {
    id: 10,
    title: "Sword",
    category: "3D Models",
    description: "This was my very first project in Blender, created while learning from YouTube tutorials. I modeled this sword to understand the basics of modeling, texturing, and rendering in Blender.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040784/Sword_x9b0es.jpg',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040784/Sword_x9b0es.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040818/Swordworkbench_q6pnox.png"
    ],
    technologies: ["Blender", "Evee Engine"],
    type: "3D Art",
    links: {
      demo: "#",
      behance: "#"
    }
  },
  
  {
    id: 11,
    title: "Arc Reactor",
    category: "3D Models",
    description: "This is my second project while learning Blender, where I created a arc reactor inspired by marvel Ironman movie.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040769/Arc_p401am.png',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040769/Arc_p401am.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040778/Arc_workbench_zaogcq.png",
    ],
    technologies: ["Blender", "Evee engine"],
    type: "3D Art",
    links: {
      demo: "#",
      behance: "#"
    }
  },
  
  
  {
    id: 12,
    title: "Guns",
    category: "3D Models",
    description: "These are different versions of guns created through a collaborative effort between me and my friend, although he has since moved on from the path of 3D art.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040755/Gun01_orfjdv.jpg',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040755/Gun01_orfjdv.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040757/Gun02_q9kg6h.jpg",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040799/Gun03_xap4nz.jpg",
    ],
    technologies: ["Blender", "Cycle Engine"],
    type: "3D Art",
    links: {
      demo: "#",
      behance: "#"
    }
  },
  
  {
    id: 13,
    title: "Robot Arm",
    category: "3D Models",
    description: "This is a robotic arm I created during an online course on hardsurface modeling in Blender.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040832/Arm_jjanzw.png',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040832/Arm_jjanzw.png"
    ],
    technologies: ["Blender", "Cycle Engine"],
    type: "3D Art",
    links: {
      demo: "#",
      behance: "#"
    }
  },
  
  {
    id: 14,
    title: "Machine Gun",
    category: "3D Models",
    description: `I created this model to deepen my understanding of hard surface modeling and Boolean operations in Blender. It's inspired by the game Boom Beach by Supercell.`,
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040776/Machine_compo_2_conw38.png',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040776/Machine_compo_2_conw38.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040762/Machine_compo_rbyv39.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040787/Machine_feu3pp.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040842/Machine_2_qv5g8v.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040826/Machine_2_Clay_xysl1n.png",
    ],
    technologies: ["Blender", "Cycle Engine"],
    type: "3D Art",
    links: {
      demo: "#",
      behance: "#"
    }
  },
  
  {
    id: 15,
    title: "Saregama",
    category: "3D Models",
    description: `This is another model I made to learn more about hardsurface modeling in Blender. It's a detailed model of a saregama, an old music player, which I created to understand themodeling and texturing in blender.`,
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040778/Saregama_composite_pm7x07.png',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040778/Saregama_composite_pm7x07.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040775/Saregama_w0mwpq.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040808/Saregama_2_fcqfxh.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040802/Saregama_Clay_ybqbgd.png",
    ],
    technologies: ["Blender", "Cycle Engine"],
    type: "3D Art",
    links: {
      demo: "#",
      behance: "#"
    }
  },
  
  {
    id: 16,
    title: "Assault Gun",
    category: "3D Models",
    description: "I created this detailed assault gun model for use in game engines. It still requires some optimization and UV unwrapping to be fully game-ready.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040765/Assault_Compo_xgbgfz.png',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040765/Assault_Compo_xgbgfz.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040825/Assault_ykd8fm.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040760/Assault_Clay_xyppjv.png",
    ],
    technologies: ["Blender", "Cycle Engine", "Unity"],
    type: "3D Art",
    links: {
      demo: "#",
      behance: "#"
    }
  },
  
  {
    id: 17,
    title: "Storage Box",
    category: "3D Models",
    description: `This is a storage box model I created for use in games. It is fully optimized, UV unwrapped, and ready for integration into game engines. You can download this model for free from my Fab marketplace: [Fab](https://www.fab.com/listings/84637ad9-e28f-4915-866d-41b5c882a00c).`,
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040781/Box_iqvrwv.png',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040781/Box_iqvrwv.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040813/StorageBox_p7gzgp.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040815/StorageBox_2_igspkz.png",
    ],
    technologies: ["Blender", "Cycle Engine", "Unity", "Marmoset Toolbag", "RizomUV", "Godot Engine"],
    type: "3D Art",
    links: {
      demo: "#",
      behance: "#"
    }
  },
  
  {
    id: 18,
    title: "Robot",
    category: "3D Models",
    description: "This is another recent project which was made with collaboration with my friend. It is a robot model which is fully rigged and animated. It will soon be available on fab for the games.",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040821/Robot_main_i3hjlq.png',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040821/Robot_main_i3hjlq.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040805/Robot_head_nnshhc.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040810/Robot_both_iirhuw.png",
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040829/Robot_main_Clay_zxwp97.png",
    ],
    technologies: ["Blender", "Cycle Engine", "Unity"],
    type: "3D Art",
    links: {
      demo: "#",
      behance: "#"
    }
  },
  
  {
    id: 19,
    title: "Ping Pong Ball Game",
    category: "Games",
    description: `This is a simple ping pong ball game which I made in C++ using raylib library with GLFW fro window management. I also integrate ImGui for the UI in it. It is completely made in C++ from scratch. You can download it from here: [Github Repo](https://github.com/Dhruv00421/Ping-pong-ball)`,
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040867/PingPongBall_shoy8e.png',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040867/PingPongBall_shoy8e.png",
    ],
    technologies: ["Blender", "Cycle Engine", "Unity"],
    type: "Game Development",
    links: {
      demo: "#",
      behance: "#"
    }
  },
  {
    id: 20,
    title: "Mini Knight Game",
    category: "Games",
    description: "This is a 2D mini knight game which is similar to mario. It was made in Godot Engine using GDScript. I made this game to learn the Godot Engine. You can download and play it from here: [Github Repo](https://github.com/Dhruv00421/Knight-godot-game)",
    image: 'https://res.cloudinary.com/dthacqaj3/image/upload/v1749040864/Knight_rtefmb.png',
    images: [
      "https://res.cloudinary.com/dthacqaj3/image/upload/v1749040864/Knight_rtefmb.png",
    ],
    technologies: ["Blender", "Cycle Engine", "Unity"],
    type: "Game Development",
    links: {
      demo: "#",
      behance: "#"
    }
  },

  // {
  //   id: 8,
  //   title: "Sci-Fi Spaceship Interior",
  //   category: "3D Environment",
  //   description: "Detailed spaceship interior with interactive elements, holographic displays, and atmospheric lighting designed for VR experience.",
  //   image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=500&fit=crop",
  //   technologies: ["Blender", "Unity", "VR SDK", "C#"],
  //   type: "3D Art",
  //   year: "2023",
  //   featured: true,
  //   links: {
  //     demo: "#",
  //     behance: "#"
  //   }
  // },
];

const categories = ["All", "3D Environment", "3D Models", "Games"];

const typeIcons = {
  "3D Art": Palette,
  "Game Development": Gamepad2,
  "Programming": Code,
  "Web Development": Globe
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const containerRef = useRef(null);
  // Add near top of the component


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 h-18">
            My Projects
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const IconComponent = typeIcons[project.type] || Code;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      
                      className="w-full h-full object-cover transition-transform duration-500 "
                      
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <IconComponent className="text-white" size={20} />
                    </div>
                    {/* <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.links.demo && (
                        <a href={project.links.demo} className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30">
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {project.links.github && (
                        <a href={project.links.github} className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30">
                          <Github size={16} />
                        </a>
                      )}
                    </div> */}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        {project.category}
                      </span>
                      {/* <span className="text-gray-400 text-xs">{project.year}</span> */}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            
          </AnimatePresence>
        </motion.div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Me On</h2>
          <div className="flex justify-center flex-wrap gap-6">
            {[
              { name: "GitHub", href: "https://github.com/Dhruv00421", icon: <Github size={24} /> },
              { 
                name: "ArtStation", 
                href: "https://www.artstation.com/cgcraft041", 
                // icon: <img src="/artstation-icon.svg" 
                icon: <img src={artstation}
                alt="ArtStation" 
                className="w-6 h-6" /> },
              { name: "Instagram", href: "https://www.instagram.com/cg_crafts_041/", icon: <img src={instagram} alt="Behance" className="w-6 h-6" /> },
              { name: "LinkedIn", href: "https://www.linkedin.com/in/dhruv-bamaniya-998862261/", icon: <img src={linkedin} alt="LinkedIn" className="w-6 h-6" /> },
            ].map((platform) => (
              <motion.a
                key={platform.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-gray-800 font-medium"
              >
                {platform.icon}
                {platform.name}
              </motion.a>
            ))}
          </div>
        </motion.div>


        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Let's Create Something Amazing Together
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              I'm always excited to work on new projects and collaborate with creative minds.
              Whether it's 3D environments, game development, or innovative web experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg"
              >
                {/* <Zap className="mr-2" size={20} /> */}
                  Connect
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors shadow-lg border"
              >
                {/* <Github className="mr-2" size={20} /> */}
                About Me
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>

              <div className="flex overflow-x-auto space-x-4 mb-4">
                {(selectedProject.images || [selectedProject.image]).map((img, i) => (
                  <img
                    key={`${img}-${i}`}
                    src={img}
                    alt={`screenshot-${i}`}
                    onClick={() => setZoomedImage(img)}
                    className="w-60 h-36 object-cover rounded-lg shadow"
                  />
                ))}
              </div>

              {/* <p className="text-gray-600 mb-4">{selectedProject.description}</p> */}
              <div className="text-gray-600 mb-4">
                <ReactMarkdown
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} className="text-blue-700 hover:underline" target="_blank" />
                    )
                  }}
                >
                  {selectedProject.description}
                </ReactMarkdown>
              </div>



              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-sm rounded">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {selectedProject.links.demo && (
                  <a href={selectedProject.links.demo} target="_blank" className="text-blue-600 hover:underline">
                    Live Demo
                  </a>
                )}
                {selectedProject.links.github && (
                  <a href={selectedProject.links.github} target="_blank" className="text-blue-600 hover:underline">
                    GitHub
                  </a>
                )}
                {selectedProject.links.behance && (
                  <a href={selectedProject.links.behance} target="_blank" className="text-blue-600 hover:underline">
                    Behance
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {zoomedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center"
                onClick={() => setZoomedImage(null)}
              >
                <img
                  src={zoomedImage}
                  alt="Zoomed"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
        )}

      </AnimatePresence>
    </section>
  );
};

export default Projects;
