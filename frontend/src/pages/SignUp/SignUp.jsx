import React, {useState} from 'react'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import './SignUp.css'

// Simple signup page (no backend)
export default function SignUp(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  function submit(e){
    e.preventDefault()
    alert(`SignUp for ${name} <${email}>`)
  }

  return (
    <div className="signup container">
      <h1>Sign Up</h1>
      <form onSubmit={submit} className="auth-form">
        <Input label="Name" value={name} onChange={e=>setName(e.target.value)} />
        <Input label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <Button type="submit">Create Account</Button>
      </form>
    </div>
  )
}
