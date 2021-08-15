import React, { useState, useEffect, Fragment, useContext } from 'react';
import PanelBuscadorVerAnuncio from '../components/PanelBuscadorVerAnuncio';
import clienteAxios, { axiosBackendCliente } from '../config/axios';
import Procesando from '../components/Processing';
import AdvertenciaBorrarAnuncio from '../components/AdvertenciaBorrarAnuncio';
import ContainerForAuth from '../components/ContainerForAuth';
import Head from 'next/head';
import { AuthContext } from '../context/AuthContext';

const EditarAnuncio = () => {

    const { Auth, usuarioAutenticado } = useContext(AuthContext);

    useEffect(() => {
        usuarioAutenticado("menu");
    // eslint-disable-next-line
    }, []);

    const [ borrar, guardarBorrar ] = useState(false);
    const [ anuncioActivo, guardaranuncioActivo ] = useState(null);

    const [ procesando, guardarProcesando ] = useState(false);
    const [ textoDeProceso, guardarTextoDeProceso ] = useState("Buscando datos");

    const [ todosLosAnuncios, guardartodosLosAnuncios ] = useState([]);

    const BuscarAnuncios = async () => {
        guardarProcesando(true);

        try {
            const resultado = await axiosBackendCliente.get('/api/anuncios/');

            guardarTextoDeProceso("Cargando datos");

            guardartodosLosAnuncios(resultado.data);

            setTimeout(() => {
                guardarProcesando(false);
            }, 1000);

        } catch (error) {
            console.log(error);

            guardartodosLosAnuncios([]);

            if(error.response.data.msg) {
                guardarTextoDeProceso(error.response.data.msg);
            } else {
                guardarTextoDeProceso("Error, intentalo de nuevo");
            }

            setTimeout(() => {
                guardarProcesando(false);
                guardarTextoDeProceso("Buscando datos");
            }, 1000);
        }
    }

    useEffect( () => {
        BuscarAnuncios();
    }, []);

    const [buscarPor, guardarBuscarPor ] = useState({
        titulo: ""
    });
    
    const onChange = e => {
        guardarBuscarPor({
            ...buscarPor,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        HacerBusqueda(buscarPor);
    }
    
    const HacerBusqueda = async (buscarPor) => {
        guardarProcesando(true);

        try {
            
            const resultado = await clienteAxios.post('/api/noticias/titulo/', buscarPor);
            
            guardarTextoDeProceso("Cargando datos");

            guardartodosLosAnuncios(resultado.data);

            setTimeout(() => {
                guardarProcesando(false);
            }, 1000);

        } catch (error) {
            console.log(error);

            guardartodosLosAnuncios([]);

            if(error.response.data.msg) {
                guardarTextoDeProceso(error.response.data.msg);
            } else {
                guardarTextoDeProceso("Error, intentalo de nuevo");
            }

            setTimeout(() => {
                guardarProcesando(false);
            }, 1000);
        }
    }

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
            {procesando ? (<Procesando processText={textoDeProceso} />) : 
                <Fragment> {borrar ? (
                    <AdvertenciaBorrarAnuncio 
                        noticia={anuncioActivo} 
                        guardarBorrar={guardarBorrar}
                        guardaranuncioActivo={guardaranuncioActivo}
                        guardarProcesando={guardarProcesando}
                        guardarTextoDeProceso={guardarTextoDeProceso}
                    />) 
                : 
                    (
                        <div className="contenedor-buscador-noticias">
                            <div className="buscador-noticias">
                                <div className="buscador-noticias-cabecera">
                                    <h3>Anuncios</h3>
                                    <form
                                            onSubmit={onSubmit}
                                        >
                                            <div className="campo-form buscador-noticias-cabecera-buscar">
                                                <input
                                                    className="btn-buscar-contenedor"
                                                    type="text"
                                                    id="buscarPor"
                                                    name="titulo"
                                                    placeholder="Escribe el titulo del anuncio..."
                                                    autoComplete="off"
                                                    onChange={onChange}
                                                    required
                                                />
                                                <input
                                                    type="submit"
                                                    className="btn-buscar"
                                                    value="buscar"
                                                />
                                            </div>
                                    </form>
                                </div>
                                <br/>
                                <h4 className="padding-noticias-recientes">Aquí tienes los últimos anuncios creados, pero puedes buscar más</h4> 
                                <div  className="buscador-noticias-cuerpo">
                                    
                                    <br/>
                                    { !todosLosAnuncios.length > 0 ? (
                                        <h4 className="padding-noticias-recientes">Ningún anuncio encontrado...</h4>
                                    ) : <Fragment>
                                    {todosLosAnuncios.map((noticia) => (
                                        <PanelBuscadorVerAnuncio
                                            titulo = {noticia.titulo}
                                            img = {noticia.img} 
                                            url = {noticia.url}
                                            key = {noticia._id}
                                            guardarBorrar={guardarBorrar}
                                            guardaranuncioActivo={guardaranuncioActivo}
                                            noticia={noticia}
                                        />
                                    ))}
                                    </Fragment>}
                                </div>
                            </div> 
                        </div>
                    )}
                </Fragment>
        }</ContainerForAuth>
    );
}

export default EditarAnuncio;