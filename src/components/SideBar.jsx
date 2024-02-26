import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import card from '../assets/farmagestor-card.png';
import '../css/SideBar.css';
import { AuthContext } from '../auth/authContext';
import { types } from '../types/types';
import '../css/deleteButton.css';

export function SideBar() {
    const [openMenu, setOpenMenu] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const sideBarRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setOpenModal(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleConfirm = () => {
        window.location.href = 'http://localhost:3000/';
    };

    const handlePrincipal = () => {
        window.location.href = 'http://localhost:3000/HomePage';
    };

    const handleLogout = () => {
        setOpenModal(false);
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
                className={`btnSideBar btn ${openMenu && "d-none"}`} onClick={() => setOpenMenu(true)}
            > ≣ </button>

            {openMenu && <div className="overlay"></div>}

            <div className={`sideBar col-md-3 p-3 ${openMenu ? "show" : ""}`} ref={sideBarRef}>

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
            {openModal && (
                <div className="modal-cerrarSesion" ref={modalRef}>
                    <label className='modal-titulo'>Cerrar Sesión</label>
                    <p className='modal-cerrar-sesion'>¿Está seguro de que desea cerrar su sesión actual?</p>
                    <div className="modal-buttons">
                        <button onClick={handleCerrarSesion}>Confirmar</button>
                        <button onClick={handleCloseModal}>Cancelar</button>
                    </div>

                </div>
            )}
        </>
    )
}
