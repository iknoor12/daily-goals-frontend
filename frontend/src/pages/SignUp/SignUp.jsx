import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import './SignUp.css'

// Signup page with backend user registration
export default function SignUp({ isAuthed, onAuthSuccess }){
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    if (isAuthed) navigate('/home')
  }, [isAuthed, navigate])

  function submit(e){
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required')
      return
    }
    
    setLoading(true)
    setError('')
    
    fetch(`${apiBase}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim() })
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Registration failed')
        }
        return data
      })
      .then((user) => {
        const userData = { name: user.name, email: user.email }
        if (onAuthSuccess) onAuthSuccess(userData)
        navigate('/home')
      })
      .catch((err) => {
        setError(err.message || 'Registration failed')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="signup container">
      <form onSubmit={submit} className="auth-form">
        <h1>Create your account</h1>
        <p className="section-subtitle">Get started with focused daily goals.</p>
        {error && <p style={{color:'red', marginBottom:12}}>{error}</p>}
        <Input label="Name" value={name} onChange={e=>setName(e.target.value)} />
        <Input label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input label="Password" type="password" showToggle value={password} onChange={e=>setPassword(e.target.value)} />
        <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</Button>
      </form>
    </div>
  )
}
