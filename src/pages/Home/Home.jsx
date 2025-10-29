import React, {useState} from 'react'
import GoalCard from '../../components/GoalCard/GoalCard'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import './Home.css'
import mock from '../../data/mockGoals'

// Home page: lists active goals, allows adding/editing/deleting
export default function Home(){
  // Use mock data initially
  const [goals, setGoals] = useState(mock)
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const activeGoals = goals.filter(g => !g.deleted)
  const completedCount = activeGoals.filter(g => g.completed).length
  const percent = activeGoals.length ? Math.round((completedCount/activeGoals.length)*100) : 0

  function addGoal(){
    if (!title) return alert('Please enter a title')
    const newGoal = {
      id: Date.now().toString(),
      title, description, completed:false, deleted:false, createdAt: new Date().toISOString()
    }
    setGoals([newGoal, ...goals])
    setTitle('')
    setDescription('')
    setShowAdd(false)
  }

  function toggleComplete(id){
    setGoals(goals.map(g => g.id === id ? {...g, completed: !g.completed} : g))
  }

  function removeGoal(id){
    setGoals(goals.map(g => g.id === id ? {...g, deleted:true} : g))
  }

  function editGoal(id){
    const newTitle = prompt('Enter new title')
    if (newTitle !== null) setGoals(goals.map(g => g.id===id ? {...g, title:newTitle} : g))
  }

  return (
    <div className="home-page container">
      <div className="home-header">
        <h1>Today's Goals</h1>
        <div className="progress-row">
          <ProgressBar percent={percent} />
          <div className="add-wrap">
            <Button onClick={() => setShowAdd(s => !s)}>Add Goal</Button>
          </div>
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
        {activeGoals.length === 0 && <p className="muted">No goals yet. Add one to get started!</p>}
        {activeGoals.map(g => (
          <GoalCard key={g.id} goal={g} onToggleComplete={toggleComplete} onEdit={editGoal} onDelete={removeGoal} />
        ))}
      </div>
    </div>
  )
}
