import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
   const { roles } = useSelector((state) => state.auth);
 if(!roles?.includes('admin')){
    return <Navigate to={"/auth/login"}></Navigate>
 } else{
    return children
 }

};

export default ProtectedRoute;
