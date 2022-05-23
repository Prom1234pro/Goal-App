import React, { useState } from 'react'
import {FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

function Login({setLoading}) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true)
        if(!email || !password){
            setError("Please fill out all fields")
            setLoading(false)
            return
        }
        const res = await fetch("http://localhost:5000/user/login",{
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({email, password})
        })
        const data = await res.json()
        if(data.token){
            localStorage.setItem("token", data.token)
            navigate("/")
        }
        if(data.message){
            setError(data.message)
        }
        setLoading(false)
        window.location.reload(true)
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="user"><FaUser/></div>
                <h3>Login To View, Add and Delete Goal</h3>
                <h3 className="error">{error? error: ""}</h3>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email address"/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
                <input type="submit" value="Login"/>
                <p>Don't have an account? <Link to="/register"><span className="link">Register</span></Link></p>
            </form>
        </div>
    )
}

export default Login
