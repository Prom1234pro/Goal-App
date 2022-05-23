import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"

function AddGoals({setLoading, goals, setGoals, id, setId, update, setUpdate}) {
    const [task, setTask] = useState("") 
    const [error, setError] = useState("")
    const navigate = useNavigate()
    // const [reminder, setReminder] = useState(false) 
    // const [date, setDate] = useState("") 
    // const [completed, setCompleted] = useState(false) 
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true)
        if(!task){
            setError("Please your task must not be empty")
            setLoading(false)
            return
        }
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/user/api/tasks",{
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json"
            },
            body: JSON.stringify({task})
        })
        const data = await res.json()
        setGoals([...goals, data])
        navigate("/")
        setLoading(false)
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:5000/user/api/tasks/${id}`,{
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json"
            },
            body: JSON.stringify({task})
        })
        // const data = await res.json()
        // console.log(data)
        setGoals(goals.map(goal => goal._id === id? {task, ...goal}: goal))
        setUpdate(false)
        navigate("/")
    }
    // eslint-disable-next-line array-callback-return
    const updating = goals.find(goal => goal._id === id)
    return (
        <div className="container">
        <form onSubmit={update? handleUpdate : handleSubmit}>
            <h3>{update? "Updating": "Add"} Goal {update? updating.task? updating.task : "":""}</h3>
            <h3 className="error">{error}</h3>
            <input className="add" type="text" value={task} onChange={(e)=>setTask(e.target.value)} placeholder={update?"Update Goal":"Add Goal"}/>
            {/* <input type="date" />
            <label>
                Set Reminder
                <input type="checkbox" />
            </label>
            <label>
                Completed
                <input type="checkbox" />
            </label> */}
            <input type="Submit" value={update? "Update Goal":"Save Goal"} />
        </form>
    </div>
  )
}

export default AddGoals