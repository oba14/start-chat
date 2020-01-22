import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";



const PrivateRoute = ({ component: Component }) => {
  
  const auth = useSelector(state => state.auth)
  return (

    {...auth.isAuthenticated === true ? (
        <Component />
      ) : (
        <Redirect to="/login" />
      )
    }
  )
}


export default PrivateRoute;
