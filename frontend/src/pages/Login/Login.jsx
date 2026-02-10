import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import './Login.css'

// Very simple login page (no auth wired)
export default function Login({ isAuthed, onAuthSuccess }){
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  useEffect(() => {
    if (isAuthed) navigate('/home')
  }, [isAuthed, navigate])

  function submit(e){
    e.preventDefault()
    if (onAuthSuccess) onAuthSuccess()
    navigate('/home')
  }

  return (
    <div className="login container">
      <form onSubmit={submit} className="auth-form">
        <h1>Welcome back</h1>
        <p className="section-subtitle">Log in to track your goals and progress.</p>
        <Input label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}
