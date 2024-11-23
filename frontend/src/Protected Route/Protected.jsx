import React from 'react'
import {useSelector} from "react-redux"
import {Outlet,Navigate} from "react-router-dom"

const Protected = () => {
    const islogin = useSelector(state => state.isLogin);
  return islogin?<Outlet/>:<Navigate to="/login"/>
}

export default Protected