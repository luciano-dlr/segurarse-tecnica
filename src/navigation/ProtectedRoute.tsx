import { useAuthStore } from '../zustand/authStorage'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {

  const { user } = useAuthStore()

  return (
    user ? <Outlet /> : <Navigate to={"/loginScreen"} />
  )
}


