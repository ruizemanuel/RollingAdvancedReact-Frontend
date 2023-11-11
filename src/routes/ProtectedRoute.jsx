import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
   const { status, roles } = useSelector((state) => state.auth);
   console.log(roles);
 if(status === 'no-authenticated' && !roles?.includes('admin')){
    return <Navigate to={"/auth/login"}></Navigate>
 } else{
    return children
 }

};

export default ProtectedRoute;











