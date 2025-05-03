
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import './App.css'
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/materials" element={<NotFound />} />
        <Route path="/video-tasks" element={<NotFound />} />
        <Route path="/chat" element={<NotFound />} />
        <Route path="/profile" element={<NotFound />} />
        <Route path="/progress" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
