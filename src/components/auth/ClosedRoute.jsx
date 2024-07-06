
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function ClosedRoute( {children} )
{

    const token = useSelector((state)=>state.auth.token);

    if(token == null)
        {
            return <NavLink to='/login'></NavLink>
        }

        else{
            return children
        }
   
}

export default ClosedRoute;