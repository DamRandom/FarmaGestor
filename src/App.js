import { useEffect, useReducer } from 'react';
import { AuthContext } from './auth/authContext';
import { authReducer } from './auth/authReducer';
import './App.css';
import { AppRouter } from './routes/AppRoutes';

const init = () => {
    return JSON.parse(localStorage.getItem('usuario')) || { logged: false };
}

function App() {
    const [usuario, dispatch] = useReducer(authReducer, {}, init)

    useEffect(() => {
        if (!usuario) return;

        localStorage.setItem('usuario', JSON.stringify(usuario));
    }, [usuario]);

    return (
        <div className="app-container">
            <AuthContext.Provider value={{ usuario, dispatch }}>
                <AppRouter />
            </AuthContext.Provider>
        </div>
    )
}

export default App;
