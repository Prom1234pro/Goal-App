import React from 'react'
import { Navigate } from 'react-router-dom'

const token = localStorage.getItem('token')
function ProtectedRoute({children}) {
    if(token){
        return (children)
    }else{
        return(
            <Navigate to="/login"/>
        )
    }
}

export default ProtectedRoute
