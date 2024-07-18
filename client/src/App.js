import React, { useEffect, useState} from 'react'
import Home from './components/Home'
import Navbar from './components/navbar/Navbar'
import Inventory from './components/Inventory'
import Listagem from './components/Listagem'
import Profile from './components/Profile'
import './styles/App.css'
import './components/navbar/navbar.css'
import { Route, Routes, Navigate } from "react-router-dom"

function App() {


  return (
    <>
     <Navbar />
     <div className= "container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listagem" element={<Listagem />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
     </div>
    </>
  )
}

export default App

