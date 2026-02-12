import React, { useEffect, useMemo, useState } from 'react'
import './History.css'

// History page: shows all goals (active, completed, and deleted)
export default function History({ userEmail }){
  const apiBase = useMemo(() => {
    return import.meta.env.VITE_API_URL || 'http://localhost:5000'
  }, [])

  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userEmail) return
    let active = true
    setLoading(true)
    setError('')
    fetch(`${apiBase}/goals?userEmail=${encodeURIComponent(userEmail)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load history')
        return res.json()
      })
      .then((data) => {
        if (active) setGoals(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (active) setError(err.message || 'Failed to load history')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [apiBase, userEmail])

  const history = goals
  return (
    <div className="history container">
      <h1 className="section-title">History</h1>
      <p className="section-subtitle">Review all goals, including active, completed, and deleted.</p>
      {loading && <p className="muted">Loading history...</p>}
      {!loading && error && <p className="muted">{error}</p>}
      {!loading && !error && history.length === 0 && <p className="muted">No goals yet.</p>}
      <ul className="history-list">
        {history.map(h => (
          <li key={h.id} className={`history-item ${h.deleted? 'deleted':''}`}>
            <div>
              <strong>{h.title}</strong>
              <div className="muted small">{h.description}</div>
              {h.taskDate && (
                <div className="muted small">
                  {new Date(h.taskDate.length === 10 ? `${h.taskDate}T00:00:00` : h.taskDate).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              )}
            </div>
            <div className="meta muted small">
              {h.deleted ? 'Deleted' : h.completed ? 'Completed' : 'Active'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
