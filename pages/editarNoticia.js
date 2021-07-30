import React, { useState, useEffect, Fragment, useContext } from 'react';
import PanelBuscadorVerNoticia from '../components/PanelBuscadorVerNoticia';
import clienteAxios from '../config/axios';
import Procesando from '../components/Processing';
import AdvertenciaBorrarNoticia from '../components/AdvertenciaBorrarNoticia';
import ContainerForAuth from '../components/ContainerForAuth';
import Head from 'next/head';
import { AuthContext } from '../context/AuthContext';

const EditarNoticia = () => {

    const { Auth, usuarioAutenticado } = useContext(AuthContext);

    useEffect(() => {
        usuarioAutenticado("menu");
    // eslint-disable-next-line
    }, []);

    const [ borrar, guardarBorrar ] = useState(false);
    const [ noticiaActiva, guardarNoticiaActiva ] = useState(null);

    const [ procesando, guardarProcesando ] = useState(false);
    const [ textoDeProceso, guardarTextoDeProceso ] = useState("Buscando datos");

    const [ todasLasNoticias, guardarTodasLasNoticias ] = useState([]);

    const BuscaNoticias = async () => {
        guardarProcesando(true);

        try {
            const resultado = await clienteAxios.get('/api/noticias/recientes/');

            guardarTextoDeProceso("Cargando datos");

            guardarTodasLasNoticias(resultado.data);

            setTimeout(() => {
                guardarProcesando(false);
            }, 1000);

        } catch (error) {
            console.log(error);

            guardarTodasLasNoticias([]);

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
        BuscaNoticias();
    }, []);

    /////////////////////////////////////////////////////////////

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

            guardarTodasLasNoticias(resultado.data);

            setTimeout(() => {
                guardarProcesando(false);
            }, 1000);

        } catch (error) {
            console.log(error);

            guardarTodasLasNoticias([]);

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
                    <AdvertenciaBorrarNoticia 
                        noticia={noticiaActiva} 
                        guardarBorrar={guardarBorrar}
                        guardarNoticiaActiva={guardarNoticiaActiva}
                        guardarProcesando={guardarProcesando}
                        guardarTextoDeProceso={guardarTextoDeProceso}
                    />) 
                : 
                    (
                        <div className="contenedor-buscador-noticias">
                            <div className="buscador-noticias">
                                <div className="buscador-noticias-cabecera">
                                    <h3>Noticias</h3>
                                    <form
                                            onSubmit={onSubmit}
                                        >
                                            <div className="campo-form buscador-noticias-cabecera-buscar">
                                                <input
                                                    className="btn-buscar-contenedor"
                                                    type="text"
                                                    id="buscarPor"
                                                    name="titulo"
                                                    placeholder="Escribe el titulo de la noticia..."
                                                    autocomplete="off"
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
                                <h4 className="padding-noticias-recientes">Aquí tienes las últimas noticias creadas, pero puedes buscar más</h4> 
                                <div  className="buscador-noticias-cuerpo">
                                    
                                    <br/>
                                    { !todasLasNoticias.length > 0 ? (
                                        <h4 className="padding-noticias-recientes">Ninguna noticia encontrada...</h4>
                                    ) : <Fragment>
                                    {todasLasNoticias.map((noticia) => (
                                        <PanelBuscadorVerNoticia
                                            titulo = {noticia.titulo}
                                            img = {noticia.img} 
                                            url = {noticia.url}
                                            key = {noticia._id}
                                            guardarBorrar={guardarBorrar}
                                            guardarNoticiaActiva={guardarNoticiaActiva}
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

export default EditarNoticia;