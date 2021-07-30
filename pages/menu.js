import React, { useContext, useEffect, useState } from 'react';
import ContenedorMenu from '../components/ContenedorMenu';
import ContainerForAuth from '../components/ContainerForAuth';
import { AuthContext } from '../context/AuthContext';
import Processing from '../components/Processing';
import Head from 'next/head';

const Menu = () => {

    const [ processText ] = useState("Loading...");
    const { Auth, usuarioAutenticado } = useContext(AuthContext);

    useEffect(() => {
        
        usuarioAutenticado("menu");

    // eslint-disable-next-line
    }, []);

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
            <Head>
                <meta charset="utf-8" />
                <title>Somos SFM</title>
                <meta name="description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Redressed&display=swap" rel="stylesheet" />
                {/*Open Graph / Facebook*/}
                <meta property="og:title" content="Somos SFM"/>
                <meta property="og:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
                <meta property="og:image" content="/img/logo.jpeg"></meta>
                {/* Twitter */}
                <meta property="twitter:title" content="Somos SFM"/>
                <meta property="twitter:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana"/>
                <meta property="twitter:image" content="/img/logo.jpeg"></meta>
            </Head>
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