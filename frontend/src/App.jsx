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
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('isAuthed')
    setIsAuthed(stored === 'true')
    setUserName(localStorage.getItem('currentUserName') || '')
    setUserEmail(localStorage.getItem('currentUserEmail') || '')
  }, [])

  function handleAuthSuccess(user = {}) {
    localStorage.setItem('isAuthed', 'true')
    setIsAuthed(true)
    if (user.name) {
      localStorage.setItem('currentUserName', user.name)
      setUserName(user.name)
    }
    if (user.email) {
      localStorage.setItem('currentUserEmail', user.email)
      setUserEmail(user.email)
    }
  }

  function handleLogout() {
    localStorage.removeItem('isAuthed')
    localStorage.removeItem('currentUserName')
    localStorage.removeItem('currentUserEmail')
    setIsAuthed(false)
    setUserName('')
    setUserEmail('')
  }

  function RequireAuth({ children }) {
    if (!isAuthed) return <Navigate to="/login" replace />
    return children
  }

  return (
    <div className="app-container">
      <Navbar isAuthed={isAuthed} onLogout={handleLogout} userName={userName} />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthed ? '/home' : '/signup'} replace />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home userEmail={userEmail} />
              </RequireAuth>
            }
          />
          <Route
            path="/history"
            element={
              <RequireAuth>
                <History userEmail={userEmail} />
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
