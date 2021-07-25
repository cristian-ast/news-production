import React, { createContext, useState } from 'react';
import { axiosBackendCliente } from '../config/axios';
import tokenAuth from '../config/token';

// crear el Contex
export const AuthContext = createContext();

// provider es donde se encuenran las funciones y state
const AuthProvider = (props) => {
    
    // crear el state del Context
    const [ Auth, GuardarAuth ] = useState({
        token : null,
        autenticado : false
    });

    const usuarioAutenticado = async () => {

        const token = localStorage.getItem('token');

        if(token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await axiosBackendCliente.get('/api/auth');
            
            const nombre = respuesta.data.usuario.nombre;
            const email = respuesta.data.usuario.email;

            localStorage.setItem('nombre', nombre);
            localStorage.setItem('email', email);

            GuardarAuth({
                token : token,
                autenticado : true
            });

        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('nombre');
            localStorage.removeItem('email');

            GuardarAuth({
                token : null,
                autenticado : false
            });
        }
    }

    return (
        <AuthContext.Provider
            value={{
                Auth,
                GuardarAuth,
                usuarioAutenticado
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;