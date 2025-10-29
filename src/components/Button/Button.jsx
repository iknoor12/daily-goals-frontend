import React from 'react'
import './Button.css'

// Simple button component with variant prop
export default function Button({children, onClick, variant='primary', ...rest}){
  return (
    <button className={`app-btn ${variant}`} onClick={onClick} {...rest}>{children}</button>
  )
}
