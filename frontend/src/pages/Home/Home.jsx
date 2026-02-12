import React, {useEffect, useMemo, useState} from 'react'
import GoalCard from '../../components/GoalCard/GoalCard'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import './Home.css'

// Home page: lists active goals, allows adding/editing/deleting
export default function Home({ userEmail }){
  const apiBase = useMemo(() => {
    return import.meta.env.VITE_API_URL || 'http://localhost:5000'
  }, [])

  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (!userEmail) return
    let active = true
    setLoading(true)
    setError('')
    fetch(`${apiBase}/goals?userEmail=${encodeURIComponent(userEmail)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load goals')
        return res.json()
      })
      .then((data) => {
        if (active) setGoals(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (active) setError(err.message || 'Failed to load goals')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [apiBase, userEmail])

  const activeGoals = goals.filter(g => !g.deleted)
  const completedCount = activeGoals.filter(g => g.completed).length
  const percent = activeGoals.length ? Math.round((completedCount/activeGoals.length)*100) : 0

  function addGoal(){
    if (!title) return alert('Please enter a title')
    if (!userEmail) return alert('Missing user')
    const payload = { title, description, userEmail }
    fetch(`${apiBase}/goals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to create goal')
        return res.json()
      })
      .then((created) => {
        setGoals((prev) => [created, ...prev])
        setTitle('')
        setDescription('')
        setShowAdd(false)
      })
      .catch(() => alert('Failed to create goal'))
  }

  function toggleComplete(id){
    const target = goals.find(g => g.id === id)
    if (!target) return
    fetch(`${apiBase}/goals/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !target.completed })
      }
    )
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to update goal')
        return res.json()
      })
      .then((updated) => {
        setGoals(goals.map(g => g.id === id ? updated : g))
      })
      .catch(() => alert('Failed to update goal'))
  }

  function removeGoal(id){
    const ok = window.confirm('Delete this goal?')
    if (!ok) return
    fetch(`${apiBase}/goals/${id}`, { method: 'DELETE' })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to delete goal')
        return res.json()
      })
      .then(() => {
        setGoals(goals.map(g => g.id === id ? {...g, deleted:true} : g))
      })
      .catch(() => alert('Failed to delete goal'))
  }

  function editGoal(id){
    const newTitle = prompt('Enter new title')
    if (newTitle === null) return
    fetch(`${apiBase}/goals/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      }
    )
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to update goal')
        return res.json()
      })
      .then((updated) => {
        setGoals(goals.map(g => g.id === id ? updated : g))
      })
      .catch(() => alert('Failed to update goal'))
  }

  return (
    <div className="home-page container">
      <div className="home-hero">
        <div>
          <h1>Today's Goals</h1>
          <p>Track daily progress and keep momentum.</p>
        </div>
        <div className="hero-actions">
          <div className="progress-row">
            <ProgressBar percent={percent} />
          </div>
          <Button onClick={() => setShowAdd(s => !s)}>Add Goal</Button>
        </div>
      </div>

      {showAdd && (
        <div className="add-form">
          <Input label="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <Input label="Description" value={description} onChange={e=>setDescription(e.target.value)} />
          <div style={{display:'flex',gap:8}}>
            <Button onClick={addGoal}>Save</Button>
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="goals-list">
        {loading && <p className="muted">Loading goals...</p>}
        {!loading && error && <p className="muted">{error}</p>}
        {!loading && !error && activeGoals.length === 0 && <p className="muted">No goals yet. Add one to get started!</p>}
        {activeGoals.map(g => (
          <GoalCard key={g.id} goal={g} onToggleComplete={toggleComplete} onEdit={editGoal} onDelete={removeGoal} />
        ))}
      </div>
    </div>
  )
}
