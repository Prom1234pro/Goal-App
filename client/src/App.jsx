import React, { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import AddGoals from './components/AddGoals';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute';

function App({setLoading}) {
  const [goals, setGoals] = useState([])
  const [user, setUser] = useState("")
  const [id, setId] = useState("")
  const [update, setUpdate] = useState(false)
  useEffect(()=>{
    let token = localStorage.getItem('token')
    const getGoals = async() => {
        const res = await (await fetch("http://localhost:5000/user/api/tasks",{
          headers: {
            "Authorization": "Bearer " + token,
          }
        })).json()
        return res
    }
    const todoItemsSet = async() =>{
        const items = await getGoals()
        setGoals(items)
    }
    const getUser = async () =>{
      const res = await (await fetch("http://localhost:5000/user",{
          headers: {
            "Authorization": "Bearer " + token,
          }
        })).json()
        return res
    }
    const userSet = async () =>{
      setLoading(true)
      const userI = await getUser()
      setUser(userI)
      setLoading(false)
    }
    if(token){
      todoItemsSet()
      userSet()

    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute>
            <Dashboard goals={goals} setGoals={setGoals} id={id} setId={setId} update={update} setUpdate={setUpdate} user={user} />
          </ProtectedRoute>}/>
          <Route path="/login" element={<Login setLoading={setLoading}/>}/>
          <Route path="/register" element={<Register setLoading={setLoading}/>} />
          <Route path="/addgoal" element={<ProtectedRoute>
            <AddGoals setLoading={setLoading} goals={goals} setGoals={setGoals} id={id} setId={setId} update={update} setUpdate={setUpdate} />
          </ProtectedRoute>}/>
        </Routes>  
      </BrowserRouter>
  )
}

export default App
