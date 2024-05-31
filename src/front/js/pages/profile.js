import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import {  useNavigate } from "react-router-dom";



const Profile = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");

        if (!token) {
            navigate("/login");
        }    

    }, []);


    const handleLogOut = () => {
        actions.logOut();
        localStorage.removeItem("jwt-token");
        navigate("/login");
      };
    

    return( 
        <div>
        <h1>Esta vista es privada !!!</h1>
        <button onClick={handleLogOut}>Cerrar sesión</button>
      </div>
    )
}

export default Profile