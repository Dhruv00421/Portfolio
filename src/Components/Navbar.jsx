import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xs'>
      <NavLink 
        to="/" 
        className="group w-10 h-10 rounded-lg bg-black flex items-center justify-center font-bold shadow-md overflow-hidden transition-all duration-300 hover:w-36"
      >
        <p className="text-white text-2xl whitespace-nowrap transition-all duration-300 group-hover:ml-2">
          <span className="inline-block group-hover:hidden">CG</span>
          <span className="hidden group-hover:inline-block">CG Craft</span>
        </p>
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium ml-auto '>  
        <NavLink to="/about"className={({ isActive }) =>
          `${isActive ? 'text-blue-500' : 'text-black'} hover:text-blue-500 transition-colors duration-300`
        }>
          About
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) =>
          `${isActive ? 'text-blue-500' : 'text-black'} hover:text-blue-500 transition-colors duration-300`
        }>
          Projects
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) =>
          `${isActive ? 'text-blue-500' : 'text-black'} hover:text-blue-500 transition-colors duration-300`
        }>
          Contact
        </NavLink>

      </nav>
      
    </header>
  )
}

export default Navbar