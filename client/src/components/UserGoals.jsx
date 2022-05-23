import React, { useState } from 'react'
import {MdNotificationsActive} from "react-icons/md"
import {IoMdNotificationsOff} from "react-icons/io"
import {IoCheckmarkDoneOutline} from "react-icons/io5"

function UserGoals({goals, id, setId}) {
  const [cls, setCls] = useState("goal")
  const handleClick = (id_set) => {
    if(id_set === id){
      return setId("")
    }
    setId(id_set)
    setCls("goal-focus")
  }
  const allGoals = goals.map((goal, index) => <div className={id===goal._id? cls: "goal"} onClick={()=>handleClick(goal._id)} key={index}>
      <div>{goal.task}</div>
      {goal.completed ? <div className="completed"><IoCheckmarkDoneOutline/></div>:<div className="not-completed"><IoCheckmarkDoneOutline/></div>}
      {goal.reminder ? <div className="reminder-notify"><MdNotificationsActive/></div>:<div className="reminder"><IoMdNotificationsOff/></div>}
    </div>)
  return (
    <>
      {
        goals.length? <div className="user-goals">{allGoals}</div>: <div className="user-goals">No Goals yet click Add A Goal to add goals</div>
      }
    </>
  )
}

export default UserGoals