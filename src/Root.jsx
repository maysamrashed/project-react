import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/user/Navbar/Navbar'
import Footer from './components/user/Footer/Footer'
export default function Root() {

  return (
    <>
        <Navbar />
        <Outlet/>
        <Footer />
    </>
  )
}
