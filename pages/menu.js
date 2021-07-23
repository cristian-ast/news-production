import React, { useContext, useEffect } from 'react';
import ContenedorMenu from '../components/ContenedorMenu';
import ContainerForAuth from '../components/ContainerForAuth';

const Menu = () => {

    // Extraer la información de autenticación
    //const { usuarioAutenticado } = useContext(AuthContext);

    // useEffect(() => {        
    //     usuarioAutenticado();
    // // eslint-disable-next-line
    // }, []);
    
    // const nombre = localStorage.getItem('nombre');
    // const email = localStorage.getItem('email');
    const nombre = "Cristian";
    const email = "Cristian@gmail.com"

    return (
        <ContainerForAuth>
            <div className="inicio">
                <div className="panel-contenedor sub-inicio">
                    <div className="contenedor-panel-editor marginCuerpoTo">
                            <ContenedorMenu nombre={nombre} email={email} /> 
                    </div>
                </div>
            </div>
        </ContainerForAuth>
    );
}

export default Menu;