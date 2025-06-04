import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes, useLocation} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import './index.css'
import Navbar from './Components/Navbar'
import { Home, About, Projects, Contact } from './pages'
import CustomContextMenu from './Components/CustomContextMenu'



const App = () => {
  const location = useLocation()
  
  return (
    <>
      <Navbar />
      {/* <CustomContextMenu /> */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App



// function App() {

//   return (
//     <main className='bg-slate-300/20'>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/about' element={<About />} />
//           <Route path='/projects' element={<Projects />} />
//           <Route path='/contact' element={<Contact />} />
//         </Routes>
//       </Router>

//     </main>
//   )
// }