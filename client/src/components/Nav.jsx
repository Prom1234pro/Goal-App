import React from 'react'
import { useNavigate } from 'react-router-dom'

function Nav({handleEvents, id, setUpdate, goals}) {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    const addGoal = () => {
        setUpdate(false)

        navigate("/addgoal")
    }
    const updateGoal = () => {
        navigate("/addgoal")
        setUpdate(true)
    }
    const goal = goals.find(goal => goal._id === id)
    return (
        <div className="nav">
            <button onClick={addGoal}>Add A Goal</button>
            {
                id&&<>
                <button onClick={updateGoal}>Update Goal</button>
                <button onClick={()=>handleEvents("SETTOCOMPLETED", id)}>{goal? goal.completed? "Reset Completed":"Set to Completed":"Set to Completed"}</button>
                <button onClick={()=>handleEvents("SETREMINDER", id)}>{goal? goal.reminder?"Reset Reminder":"Set Reminder" :"Set Reminder"}</button>
                <button onClick={()=>handleEvents("DELETE", id)}>Delete</button>
                </>
            }
            <button onClick={handleLogout} className="btn">Logout</button>
        </div>
    )
}

export default Nav