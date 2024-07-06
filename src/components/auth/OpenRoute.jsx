
import {  useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function OpenRoute( {children} )
{
    const token = useSelector((state)=> state.auth.token);
  

    if(token == null)
        {
            return children;    
        }
        else{
            return <NavLink to='/dashboard'></NavLink>
        }
    
}

export default OpenRoute;