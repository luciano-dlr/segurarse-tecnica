import { Navigate, Route, Routes } from "react-router-dom"
import { LoginScreen } from "../pages/Login/Login.Screen"
import { HomeScreen } from "../pages/Home/Home.Screen"
import { UserScreen } from "../pages/User/User.Screen"
import { ProtectedRoute } from "./ProtectedRoute"

export const Navigation = () => {
    return (
        //Rutas Declaradas 
        <Routes >
            <Route element={< Navigate to={"/loginScreen"} />} index />
            <Route path="/loginScreen" element={< LoginScreen />} />
            <Route element={< ProtectedRoute />} >
                <Route path="/homeScreen" element={< HomeScreen />} />
                <Route path="/userScreen" element={< UserScreen />} />
            </Route>
        </Routes>
    )
}