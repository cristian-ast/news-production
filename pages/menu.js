import React, { useContext, useEffect, useState } from 'react';
import ContenedorMenu from '../components/ContenedorMenu';
import ContainerForAuth from '../components/ContainerForAuth';
import { AuthContext } from '../context/AuthContext';
import Processing from '../components/Processing';

const Menu = () => {

    const [ loading, setLoading ] = useState(true);
    const [ processText, setProcessText ] = useState("Loading...");

    // Extraer la información de autenticación
    const { usuarioAutenticado } = useContext(AuthContext);

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

        setLoading(false);

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