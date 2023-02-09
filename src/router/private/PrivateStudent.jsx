import React from 'react'
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

function PrivateAdmin(props) {
  const student = useSelector(s => s.student)
  return student ? 
    <Route {...props}/>
    :
    <Redirect to="/login-student"/>
}

export default PrivateAdmin