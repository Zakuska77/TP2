import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './pages/App'
import Detail from './pages/Detail'
import Login from './pages/Login'
import Sign from './pages/Sign'
import Episodes from './pages/Episodes'
import JouerEpisode from './pages/JouerEpisode'
import Historique from './pages/Historique'
import Navbar from './components/Navbar'
const Router = () => {
  return (
  <BrowserRouter>
  <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/details/:tvshowId" element={<Detail />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signUp" element={<Sign />} />
          <Route path="/episodes/:seasonId" element={<Episodes />} />
          <Route path="/play/:episodeId" element={<JouerEpisode />} />
          <Route path="/historique" element={<Historique />} />
        </Routes>
      </BrowserRouter>
  )
}

export default Router
