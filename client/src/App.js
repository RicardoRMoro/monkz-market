import React, { useEffect, useState} from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Inventory from './components/Inventory'
import Listagem from './components/Listagem'
import Profile from './components/Profile'
import './App.css'
import { Route, Routes } from "react-router-dom"

function App() {


  // pegando dados api backend json
  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {setBackendData(data)}
    )
  }, [])
  /////////////

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


      {/* {(typeof backendData.users === 'undefined') ? (
        <p>Loading...</p>
      ): (
        backendData.users.map((user, i) =>(
          <p key={i}>{user}</p>
        ))
      )} */}
       //isso aqui pode ser útil futuramente