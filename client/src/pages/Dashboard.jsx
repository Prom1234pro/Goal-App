import React from 'react'
import Nav from '../components/Nav'
import UserGoals from '../components/UserGoals'

function Dashboard({goals, setGoals, id, setId, update, setUpdate, user}) {
    const deleteGoal = async(id)=>{
        const token = localStorage.getItem("token")
        if(token){
            await fetch(`http://localhost:5000/user/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token,
                  }
            })
            setGoals(goals.filter(goal => goal._id !== id))
        }
    }
    const getGoal = async(id)=>{
        const token = localStorage.getItem("token")
        if(token){
            const res = await (await fetch(`http://localhost:5000/user/api/tasks/${id}`, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            })).json()
            return res
        }
    }
    const setReminder = async(id)=>{
        const goal = await getGoal(id)
        const token = localStorage.getItem("token")
        if(token){
            await fetch(`http://localhost:5000/user/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({...goal, reminder: !goal.reminder})
            })
            // const data = await res.json()
            // console.log(data)
            setGoals(goals.map(goal => goal._id === id? {...goal, reminder: !goal.reminder}: goal))
        }
    }
    const setToCompleted = async(id)=>{
        const goal = await getGoal(id)
        const token = localStorage.getItem("token")
        if(token){
            await fetch(`http://localhost:5000/user/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({...goal, completed: !goal.completed})
            })
            // const data = await res.json()
            // console.log(data)
            console.log("printed")
            setGoals(goals.map(goal => goal._id === id? {...goal, completed: !goal.completed}: goal))
        }
    }
    const handleEvents = async(type, id)=>{
        switch (type) {
            case "DELETE":
                return await deleteGoal(id)
            case "SETREMINDER":
                return await setReminder(id)
            case "SETTOCOMPLETED":
                return await setToCompleted(id)
            default: return
        }
    }
    return (
        <div className="dashboard">
            <Nav handleEvents={handleEvents} id={id} setUpdate={setUpdate} goals={goals}/>
            <h3 className="goals-header">{user? user.name: "Users"} {goals.length? "Goals": "add some goals"}</h3>
            <UserGoals goals={goals} id={id} setId={setId}/>
        </div>
    )
}

export default Dashboard