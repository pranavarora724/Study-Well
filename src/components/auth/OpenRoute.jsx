
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function OpenRoute( {children} )
{
    const token = useSelector((state)=> state.auth.token);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(token)
        {
            navigate('/dashboard/my-profile');
        }
    })
  

    if(token == null)
        {
            return children;    
        }
        else{
            return <NavLink to='/dashboard'></NavLink>
        }
    
}

export default OpenRoute;