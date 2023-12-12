import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
function Private(){
    const auth = sessionStorage.getItem("token");
    return auth? <Outlet/>:<Navigate to="/login"/>
}
export default Private;