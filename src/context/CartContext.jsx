import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (productId) => {
    const token = localStorage.getItem('userToken'); 
    try {
      const { data } = await axios.post(`https://ecommerce-node4.onrender.com/cart/`, 
        {
          productId: productId
        },
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      );
      setCart((prevCart) => [...prevCart, data.product]);
      console.log("Product added to cart:", data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};