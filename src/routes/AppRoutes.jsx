import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RutasPublicas } from "./RutasPublicas";
import { RutasPrivadas } from "./RutasPrivadas";
import { RouterInterno } from "./RouterInterno";
import Login from "../pages/Login";


export const AppRouter = () => {


    return (
        <BrowserRouter>
            <Routes>
            
                <Route path="/login" element={
                    <RutasPublicas>
                        <Login />
                    </RutasPublicas>
                } />
                
                <Route path="/*" element={
                    <RutasPrivadas >
                        <RouterInterno />
                    </RutasPrivadas>
                } />
            
            </Routes>
        </BrowserRouter>
    )
}