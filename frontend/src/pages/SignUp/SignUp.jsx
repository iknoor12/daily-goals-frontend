import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import './SignUp.css'

// Simple signup page (no backend)
export default function SignUp({ isAuthed, onAuthSuccess }){
  const navigate = useNavigate()
  const [name,setName] = useState('')
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
    <div className="signup container">
      <form onSubmit={submit} className="auth-form">
        <h1>Create your account</h1>
        <p className="section-subtitle">Get started with focused daily goals.</p>
        <Input label="Name" value={name} onChange={e=>setName(e.target.value)} />
        <Input label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <Button type="submit">Create Account</Button>
      </form>
    </div>
  )
}
