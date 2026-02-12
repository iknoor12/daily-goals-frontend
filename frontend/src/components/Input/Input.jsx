import React, { useState } from 'react'
import './Input.css'

// Reusable input component
export default function Input({label, type, showToggle, ...props}){
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="input-wrap">
      {label && <label className="input-label">{label}</label>}
      <div className="input-field-wrap">
        <input className={`input-field${isPassword && showToggle ? ' has-toggle' : ''}`} type={inputType} {...props} />
        {isPassword && showToggle && (
          <button
            type="button"
            className="input-toggle"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword(s => !s)}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M2.1 3.5L20.5 21.9 21.9 20.5 19 17.6c1.9-1.2 3.5-2.9 4.8-5.1C20.6 7.2 16.6 4.5 12 4.5c-1.6 0-3.2.3-4.6.9L3.5 2.1 2.1 3.5zM8.8 6.3C9.8 5.9 10.9 5.7 12 5.7c4 0 7.5 2.3 9.8 6.3-1.1 1.8-2.5 3.2-4.2 4.3l-2.1-2.1c.3-.6.5-1.3.5-2 0-2.2-1.8-4-4-4-.7 0-1.4.2-2 .5L8.8 6.3zM3.2 12c1.1-1.8 2.5-3.2 4.2-4.3l2.1 2.1c-.3.6-.5 1.3-.5 2 0 2.2 1.8 4 4 4 .7 0 1.4-.2 2-.5l2.1 2.1c-1 .4-2.1.6-3.2.6-4 0-7.5-2.3-9.8-6.3z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 5c-5.1 0-9.6 3.1-12 7 2.4 3.9 6.9 7 12 7s9.6-3.1 12-7c-2.4-3.9-6.9-7-12-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6.5c-1.4 0-2.5 1.1-2.5 2.5S10.6 14.5 12 14.5 14.5 13.4 14.5 12 13.4 9.5 12 9.5z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
