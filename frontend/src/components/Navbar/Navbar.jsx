import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

// Navbar with links to main pages
export default function Navbar({ isAuthed, onLogout }){
  const navigate = useNavigate()

  function handleLogout(){
    if (onLogout) onLogout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">Daily Goals Tracker</div>
      <div className="nav-links">
        {isAuthed ? (
          <>
            <NavLink to="/home" className={({isActive}) => isActive? 'active':''}>Home</NavLink>
            <NavLink to="/history" className={({isActive}) => isActive? 'active':''}>History</NavLink>
            <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({isActive}) => isActive? 'active':''}>Login</NavLink>
            <NavLink to="/signup" className={({isActive}) => isActive? 'active':''}>SignUp</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
