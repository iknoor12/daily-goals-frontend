import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

// Navbar with links to main pages
export default function Navbar(){
  return (
    <nav className="navbar">
      <div className="nav-brand">Daily Goals</div>
      <div className="nav-links">
        <NavLink to="/" className={({isActive}) => isActive? 'active':''}>Home</NavLink>
        <NavLink to="/history" className={({isActive}) => isActive? 'active':''}>History</NavLink>
        <NavLink to="/login" className={({isActive}) => isActive? 'active':''}>Login</NavLink>
        <NavLink to="/signup" className={({isActive}) => isActive? 'active':''}>SignUp</NavLink>
      </div>
    </nav>
  )
}
