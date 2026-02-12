import React from 'react'
import './GoalCard.css'

// GoalCard displays a single goal with title, description, checkbox and action buttons
export default function GoalCard({goal, onToggleComplete, onEdit, onDelete}){
  const hasDate = Boolean(goal.taskDate)
  const dateValue = hasDate
    ? new Date(goal.taskDate.length === 10 ? `${goal.taskDate}T00:00:00` : goal.taskDate)
    : null
  const dateLabel = dateValue
    ? dateValue.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : ''
  const dayLabel = dateValue
    ? dateValue.toLocaleDateString(undefined, { weekday: 'short' })
    : ''

  return (
    <div className={`goal-card ${goal.completed? 'completed':''}`}>
      <div className="goal-main">
        <label className="goal-check">
          <input type="checkbox" checked={goal.completed} onChange={() => onToggleComplete(goal.id)} />
        </label>
        <div className="goal-content">
          <h3>{goal.title}</h3>
          <p className="muted">{goal.description}</p>
          {hasDate && (
            <div className="goal-date muted">{dayLabel} • {dateLabel}</div>
          )}
        </div>
      </div>
      <div className="goal-actions">
        <button className="btn edit" onClick={() => onEdit(goal.id)}>Edit</button>
        <button className="btn delete" onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </div>
  )
}
