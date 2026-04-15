import { useState } from 'react'
import './App.css'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout' 
import { Route, Routes } from 'react-router-dom'
import Navbar from './compoments/Navbar'

function App() {
  
  return (
   <div className="app">
     <Navbar />
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/checkout' element={<Checkout />} /> 
        <Route path='*' element={<NotFound />} />
     </Routes>
   </div>
  )
}

export default App
