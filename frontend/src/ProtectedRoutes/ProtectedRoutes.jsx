import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoutes = () => {
  
  const cookies = new Cookies();
  
  const token = cookies.get("TOKEN");
  /* Checking if user has token and authenticated he can access the private route else 
    he will be redirected to login page
  */
  return <> { token ? <Outlet /> : <Navigate to="/login"/>} </>;

}

export default ProtectedRoutes;