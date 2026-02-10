import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import History from './pages/History/History'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

// Main application component: defines routes and shared Navbar
export default function App() {
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('isAuthed')
    setIsAuthed(stored === 'true')
  }, [])

  function handleAuthSuccess() {
    localStorage.setItem('isAuthed', 'true')
    setIsAuthed(true)
  }

  function handleLogout() {
    localStorage.removeItem('isAuthed')
    setIsAuthed(false)
  }

  function RequireAuth({ children }) {
    if (!isAuthed) return <Navigate to="/login" replace />
    return children
  }

  return (
    <div className="app-container">
      <Navbar isAuthed={isAuthed} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthed ? '/home' : '/signup'} replace />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/history"
            element={
              <RequireAuth>
                <History />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login isAuthed={isAuthed} onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/signup" element={<SignUp isAuthed={isAuthed} onAuthSuccess={handleAuthSuccess} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
