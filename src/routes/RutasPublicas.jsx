import { useContext } from "react"
import { AuthContext } from "../auth/authContext"
import { Navigate } from "react-router-dom";



export const RutasPublicas = ({ children }) => {

    const { usuario } = useContext(AuthContext);

    return usuario.logged ? <Navigate to='/' /> : children;
}
