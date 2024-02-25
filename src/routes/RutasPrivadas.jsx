import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";





export const RutasPrivadas = ({ children }) => {

    const { usuario } = useContext(AuthContext);

    return usuario.logged ? children : <Navigate to='/login' />;
}
