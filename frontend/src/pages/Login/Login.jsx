import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import './Login.css'

// Login page with backend user validation
export default function Login({ isAuthed, onAuthSuccess }){
  const navigate = useNavigate()
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
    if (!email.trim()) {
      setError('Please enter your email')
      return
    }
    
    setLoading(true)
    setError('')
    
    fetch(`${apiBase}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim() })
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Login failed')
        }
        return data
      })
      .then((user) => {
        const userData = { name: user.name, email: user.email }
        if (onAuthSuccess) onAuthSuccess(userData)
        navigate('/home')
      })
      .catch((err) => {
        const errorMsg = err.message || 'Login failed'
        if (errorMsg.includes('not found') || errorMsg.includes('sign up')) {
          alert(errorMsg)
          navigate('/signup')
        } else {
          setError(errorMsg)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="login container">
      <form onSubmit={submit} className="auth-form">
        <h1>Welcome back</h1>
        <p className="section-subtitle">Log in to track your goals and progress.</p>
        {error && <p style={{color:'red', marginBottom:12}}>{error}</p>}
        <Input label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input label="Password" type="password" showToggle value={password} onChange={e=>setPassword(e.target.value)} />
        <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
      </form>
    </div>
  )
}
