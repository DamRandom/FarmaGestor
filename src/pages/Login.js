import React from 'react';
import '../css/login.css';
import logo from '../assets/Farmagestor-removebg-preview.png';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/authContext";
import { types } from "../types/types";
import { useForm } from 'react-hook-form';
import '../css/button.css'

function Login() {
    const navegar = useNavigate();

    const { dispatch } = useContext(AuthContext);



    const { register, handleSubmit } = useForm();


    const onSubmit = handleSubmit(async data => {

        // const resp = await iniciarSesion(data);
        // console.log(resp)

        const accion = {
            type: types.login,
            payload: { usuario: data.usuario }
        }

        dispatch(accion);

        navegar('/', {
            replace: true
        });

    })

    return (
        <div className="logo_container">
            <img id="logo" src={logo} alt="FarmaGestor Logo" />
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                <form className='form-login' onSubmit={onSubmit}>
                    <div className="input-group">
                        <input 
                        type="text" 
                        id="username" 
                        name="username" 
                         placeholder="Usuario" 
                         {...register('username', { required: true })}
                         />
                    </div>
                    <div className="input-group password-container">
                        <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Contraseña" 
                        {...register('password', { required: true, minLength: 8})}
                        />
                    </div>
                    <div className="input-group">
                        <button type="login-submit">Aceptar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
