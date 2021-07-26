import React, { useContext, useEffect, useState } from 'react';
import ContenedorMenu from '../components/ContenedorMenu';
import ContainerForAuth from '../components/ContainerForAuth';
import { AuthContext } from '../context/AuthContext';
import Processing from '../components/Processing';
import Router from 'next/router';

const Menu = () => {

    const [ processText ] = useState("Loading...");
    const { Auth, usuarioAutenticado } = useContext(AuthContext);

    useEffect(() => {        
        usuarioAutenticado();
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(!Auth.autenticado) {
            Router.push('/login');
        }
    // eslint-disable-next-line
    }, [Auth.autenticado]);

    const [ userInf, setUserInf ] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {        
        usuarioAutenticado();
        setUserInf({
            name: localStorage.getItem('nombre'),
            email: localStorage.getItem('email')
        });
    // eslint-disable-next-line
    }, []);
    
    return (
        <ContainerForAuth>
            { userInf.name == "" ? (<Processing processText={processText} />) : 
                <div className="inicio">
                    <div className="panel-contenedor sub-inicio">
                        <div className="contenedor-panel-editor marginCuerpoTo">
                                <ContenedorMenu nombre={userInf.name} email={userInf.email} /> 
                        </div>
                    </div>
                </div>
            }
        </ContainerForAuth>
    );
}

export default Menu;