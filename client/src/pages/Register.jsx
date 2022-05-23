import React, { useState } from 'react'
import {FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

function Register({setLoading}) {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        if(!email || !password1 || !password2 || !name){
            setError("Please fill out all fields")
            setLoading(false)
            return
        }
        if(password1 === password2){
            const res = await fetch("http://localhost:5000/user/register",{
                method: "POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify({name, email, password:password1})
            })
            const data = await res.json()
            if(data.message){
                setError(data.message)
            }
            if(data.token){
                navigate("/login")
            }
        }else {
            setError("passwords don't match")
        }
        setLoading(false)
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="user"><FaUser/></div>
                <h3>Register To View, Add and Delete Goal</h3>
                <h3 className="error">{error? error: ""}</h3>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your username"/>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email address"/>
                <input type="password" value={password1} onChange={(e)=>setPassword1(e.target.value)} placeholder="Enter your password"/>
                <input type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)} placeholder="Confirm password"/>
                <input type="submit" value="Register"/>
                <p>Already have an account? <Link to="/login"><span className="link"> Login</span></Link></p>
            </form>
        </div>
    )
}

export default Register
