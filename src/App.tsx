
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Profile from './pages/Profile'
import Materials from './pages/Materials'
import Chat from './pages/Chat'
import Challenges from './pages/Challenges'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import './App.css'
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Index /></Layout>} />
        <Route path="/materials" element={<Layout><Materials /></Layout>} />
        <Route path="/video-tasks" element={<Layout><NotFound /></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/progress" element={<Layout><NotFound /></Layout>} />
        <Route path="/challenges" element={<Layout><Challenges /></Layout>} />
        <Route path="/help" element={<Layout><NotFound /></Layout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
