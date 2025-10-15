import React from 'react'
import './Input.css'

// Reusable input component
export default function Input({label, ...props}){
  return (
    <div className="input-wrap">
      {label && <label className="input-label">{label}</label>}
      <input className="input-field" {...props} />
    </div>
  )
}
