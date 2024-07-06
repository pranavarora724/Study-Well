// This will prevent non-authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRouteStudent({ children }) {
  const { token } = useSelector((state) => state.auth.token)
  const { user } = useSelector((state) => state.profile.user)


  if (user.accountType == "Student") {
    return children
  } else {
    return <Navigate to="/dashboard/my-profile" />
  }
}

export default PrivateRouteStudent
