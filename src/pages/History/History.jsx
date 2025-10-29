import React from 'react'
import './History.css'
import mock from '../../data/mockGoals'

// History page: shows completed or deleted goals
export default function History(){
  const history = mock.filter(g => g.completed || g.deleted)
  return (
    <div className="history container">
      <h1>History</h1>
      {history.length === 0 && <p className="muted">No completed or deleted goals yet.</p>}
      <ul className="history-list">
        {history.map(h => (
          <li key={h.id} className={`history-item ${h.deleted? 'deleted':''}`}>
            <div>
              <strong>{h.title}</strong>
              <div className="muted small">{h.description}</div>
            </div>
            <div className="meta muted small">{h.deleted ? 'Deleted' : 'Completed'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
