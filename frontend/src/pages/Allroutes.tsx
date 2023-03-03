import React from 'react'
import{Routes, Route} from "react-router-dom"
import Game from '../components/Game'
import Loader from '../components/Loader'
const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Loader/>}>
       Loader Page
      </Route>
      <Route path="/game" element={<Game/>}>
       Game Page
      </Route>
    </Routes>
  )
}

export default Allroutes