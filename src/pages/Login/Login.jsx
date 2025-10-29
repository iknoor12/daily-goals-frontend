import React, {useState} from 'react'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import './Login.css'

// Very simple login page (no auth wired)
export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  function submit(e){
    e.preventDefault()
    alert(`Login attempt for ${email}`)
  }

  return (
    <div className="login container">
      <h1>Login</h1>
      <form onSubmit={submit} className="auth-form">
        <Input label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}
