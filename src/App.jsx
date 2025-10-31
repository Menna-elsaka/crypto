import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'

function App() {

  return (
    <>
     <Navbar/>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
     </Routes>
    </>
  )
}

export default App
