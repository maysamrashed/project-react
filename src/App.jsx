import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import { CartProvider } from './context/CartContext'; 
export default function App() {
  return (
    <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
  )
}
