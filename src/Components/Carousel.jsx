import React from 'react'
import Card from './Card.jsx'
import { Links } from 'react-router-dom'

function Carousel({ radius = 3.4, count = 4 }) {
    const cardData = [
        { 
            title: "Hi, I'm Dhruv", 
            description: "I am a 3D Environment Artist and 3D artist to learn more check out the about section", 
            
        },
        { 
            title: "About me", 
            description: "Check out my brief intro",
            link: "/about"
        },
        { 
            title: "Projects", 
            description: "Check out my prjects and works",
            link: "/projects" 
        },
        { 
            title: "Contact", 
            description: "Lets connect and work together",
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