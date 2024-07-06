
// We have imported all the vsc ICONS 
import * as Icons from 'react-icons/vsc'
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

function SidebarLink({ linkTo, iconName, name, accountType }) {
    // Importing Icons present in 'vsc' class
    const Icon = Icons[iconName];
    const location = useLocation();
    const user = useSelector((state) => state.profile.user);



    return (
        <div>
            {
                (user.accountType === accountType || accountType == "All") ?
                    // Account type matches
                    (<NavLink to={linkTo}>
                        <div className={`flex flex-row gap-x-4 p-4 cursor-pointer hover:bg-richblack-800 text-white font-semibold items-center
                        ${(linkTo == location.pathname) ? (`bg-yellow-400 hover:bg-yellow-300`) : (``)}`}>

                            {/* Icon */}
                            <Icon></Icon>

                            {/* Name */}
                            <div>{name}</div>
                        </div>
                    </NavLink>)
                    :
                    // Account Tpe not matches
                    (<div></div>)
            }
        </div>
    )
}

export default SidebarLink;