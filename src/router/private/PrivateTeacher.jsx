import React from 'react'
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

function PrivateAdmin(props) {
  const teacher = useSelector(s => s.teacher)
  return teacher ? 
    <Route {...props}/>
    :
    <Redirect to="/login-teacher"/>
}

export default PrivateAdmin