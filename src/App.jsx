import { useState, Suspense, lazy } from 'react'
import { Route, BrowserRouter as Router, Routes, useLocation} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import './index.css'
import Navbar from './Components/Navbar'
import CustomContextMenu from './Components/CustomContextMenu'

// Lazy load components
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
)

const App = () => {
  const location = useLocation()
  
  return (
    <div className='relative min-h-screen w-full'>
      <Navbar />
      {/* <CustomContextMenu /> */}
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
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