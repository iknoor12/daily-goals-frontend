import React from 'react'
import './ProgressBar.css'

// Simple progress bar showing completion percent
export default function ProgressBar({percent=0}){
  const value = Math.max(0, Math.min(100, percent))
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className="progress-fill" style={{width:`${value}%`}} />
      </div>
      <div className="progress-text">{value}%</div>
    </div>
  )
}
