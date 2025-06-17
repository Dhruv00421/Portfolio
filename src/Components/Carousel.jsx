import React from 'react'
import Card from './Card'
import { Links } from 'react-router-dom'

function Carousel({ radius = 3.4, count = 4 }) {
    const cardData = [
    { 
        title: "Hi, I'm Dhruv", 
        description: "I am a 3D Environment Artist and 3D Artist. To learn more about my journey and skills, explore the About section.", 
    },
    { 
        title: "About Me", 
        description: "Discover a brief introduction about me.",
        link: "/about"
    },
    { 
        title: "Projects", 
        description: "Explore my projects and professional work.",
        link: "/projects" 
    },
    { 
        title: "Contact", 
        description: "Let's connect and collaborate on new opportunities.",
        link: "/contact"
    },
]


    return Array.from({ length: count }, (_, i) => (
        <Card
            key={i}
            title={cardData[i]?.title}
            description={cardData[i]?.description}
            link={cardData[i]?.link}
            position={[
                Math.sin((i / count) * Math.PI * 2) * radius, 
                0, // height can be adjusted if needed
                Math.cos((i / count) * Math.PI * 2) * radius
            ]}
            rotation={[0, (i / count) * Math.PI * 2, 0]}
        />
    ))
}


export default Carousel