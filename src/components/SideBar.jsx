import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import card from '../assets/farmagestor-card.png';
import '../css/SideBar.css';
import { AuthContext } from '../auth/authContext';
import { types } from '../types/types';

export function SideBar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const sideBarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
                setMenuAbierto(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOpenModal = () => {
        setModalAbierto(true);
    };

    const handleCloseModal = () => {
        setModalAbierto(false);
    };

    const handleConfirm = () => {
        window.location.href = 'http://localhost:3000/';
    };

    const handlePrincipal = () => {
        window.location.href = 'http://localhost:3000/HomePage';
    };

    const handleLogout = () => {
        setModalAbierto(false);
        handleOpenModal();
    };


    const navegar = useNavigate();
    const { dispatch } = useContext(AuthContext)

    const handleCerrarSesion = async () => {
        dispatch({ type: types.logout })
        navegar('/login', {
            replace: true
        });
    }


    return (
        <>
            <button
                className={`btnSideBar btn ${menuAbierto && "d-none"}`} onClick={() => setMenuAbierto(true)}
            > ≣ </button>

            {/* Capa semitransparente que cubre toda la página cuando el sidebar está abierto */}
            {menuAbierto && <div className="overlay"></div>}

            <div className={`sideBar col-md-3 p-3 ${menuAbierto ? "show" : ""}`} ref={sideBarRef}>

                <div className='logoWeb' >
                    <img className='farmaG-card' src={card} alt="Logo" onClick={handlePrincipal} />
                </div>

                <div className='contenedor-opciones'>

                    <div className={`sesionLinks `} >
                        <NavLink
                            className={({ isActive }) => 'linkNavegacion nav-item nav-link mb-2 ' + (isActive ? 'activo' : '')}
                            to="/UserManagement"
                        >
                            Gestionar Usuarios
                        </NavLink>

                    </div>

                    <div className={`sesionLinks `} >
                        <NavLink
                            className={({ isActive }) => 'linkNavegacion nav-item nav-link mb-2 ' + (isActive ? 'activo' : '')}
                            to="/MedicineManagement"
                        >
                            Gestionar Medicamentos
                        </NavLink>
                    </div>

                    <div className={`sesionLinks `} >
                        <NavLink
                            className={({ isActive }) => 'linkNavegacion nav-item nav-link mb-2 ' + (isActive ? 'activo' : '')}
                            to="/PatientManagement"
                        >
                            Gestionar Pacientes
                        </NavLink>
                    </div>

                    <div className={`sesionLinks `} >
                        <NavLink
                            className={({ isActive }) => 'linkNavegacion nav-item nav-link mb-2 ' + (isActive ? 'activo' : '')}
                            to="/SalesManagement"
                        >
                            Gestionar Ventas
                        </NavLink>
                    </div>
                    <div className={`sesionLinks `} >
                        <NavLink
                            className={({ isActive }) => 'linkNavegacion nav-item nav-link mb-2 ' + (isActive ? 'activo' : '')}
                            to="/DoctorManagement"
                        >
                            Gestionar Doctores
                        </NavLink>
                    </div>
                    <div className={`sesionLinks `} >
                        <NavLink
                            className={({ isActive }) => 'linkNavegacion nav-item nav-link mb-2 ' + (isActive ? 'activo' : '')}
                            to="/DateBookManagement"
                        >
                            Gestionar Libro de Vencimiento
                        </NavLink>
                    </div>
                </div>

                <div className='compartimiento'>
                    <button className="btn-close" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </div>
            {modalAbierto && (
                <div className="modal-cerrarSesion">
                    <div className="modal-content">
                        <h2>¿Estás seguro que deseas cerrar sesión?</h2>
                        <div className='botonesModal-cerrarSesion'>
                            <button onClick={handleCerrarSesion}>Confirmar</button>
                            <button onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
