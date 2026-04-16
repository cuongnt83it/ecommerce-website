import { useState } from 'react'
import './App.css'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout' 
import { Route, Routes } from 'react-router-dom'
import Navbar from './compoments/Navbar'
import AuthProvider from './context/AuthContext'
import ProductDetails from './pages/ProductDetails'
import CartProvider from './context/CartContext'

const App = () => {
  
  return (
    <AuthProvider>
      <CartProvider>
      <div className="app">
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/checkout' element={<Checkout />} /> 
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      </CartProvider>
   </AuthProvider>
  )
}

export default App
