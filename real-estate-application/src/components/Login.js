import {useNavigate, Link} from "react-router-dom"
import React, {useEffect, useState} from "react" 
import axios from "axios"
import '../../src/styles/login.css'
function Login() {
  const history=useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  async function handleSubmit(e){
    e.preventDefault();
    try{
      console.log("Trying to connect to {email}")
      await axios.post("http://localhost:8000/", {
        
        email, password
      })
      .then(res=>{
        if(res.data.status=="success"){
          history("/home", {state:res.data.user})

        }
        else if(res.data.status=="failure"){
          alert(res.data.message)

        }
      })
      .catch(e=>{
        alert("wrong details")
        console.log(e)
      })
    }catch(e){
      console.log(e)
    }
  }
  return (
    <div className="login-container">
    <header className="header">
      <h1>RealFind</h1>
      <h3>Where you find the REAL deals.</h3>
    </header>

    <div className="content-container">
      <div className="left-section">
        <h2>Hey, Find your real home with us!</h2>
      </div>

      <div className="right-section">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input type="submit" value="Login" />
          </form>
          
          <p>
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login