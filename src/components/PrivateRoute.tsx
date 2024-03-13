import { useAppSelector } from "../store/store"
import { Outlet, Navigate } from "react-router-dom"


const PrivateRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user)

  return currentUser
    ? (<Outlet />)
    : (<Navigate to="/sign-in" />)
}

export default PrivateRoute