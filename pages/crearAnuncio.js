import React, { useState, useEffect, Fragment, useContext } from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import clienteAxios from '../config/axios';
import Processing from '../components/Processing';
import Head from 'next/head';
import ContainerForAuth from '../components/ContainerForAuth';
import Image from 'next/image';
import { axiosBackendCliente } from '../config/axios';
import { AuthContext } from '../context/AuthContext';
import Router from 'next/router';
import Spinner from '../components/Spinner';

const CrearAnuncio = (props) => {

    const { Auth, usuarioAutenticado } = useContext(AuthContext);

    useEffect(() => {        
        usuarioAutenticado("createNews");
    // eslint-disable-next-line
    }, []);

    const [ procesando, guardarProcesando ] = useState(false);
    const [ processText, setProcessText ] = useState("Cargando...");
    const  [ spinnerImage, setSpinnerImage ] = useState(false);

    const [nuevaNoticia, guardarNuevaNoticia] = useState({
        titulo : "",
        url : "No",
        img : ""
    });

    const onChange = e => {
        guardarNuevaNoticia({
            ...nuevaNoticia,
            [e.target.name] : e.target.value

        })
    }

    const [ archivos, setArchivos ] = useState(null);
    
    const subirArchivos = (e) => {
        setArchivos(e);
    }

    useEffect( () => {
        insertarArchivos();

    // eslint-disable-next-line
    }, [archivos]);

    const [ tipoEnlace, guardarTipoEnlace ] = useState({
        tipo : "No"
    });

    const onChangeTipoEnlace = e => {
        guardarWhatsAppMS({
            whatsappN : "",
            whatsappT : ""
        });

        guardarTipoEnlace({
            [e.target.name] : e.target.value
        });

        setEnlace({
            url : ""
        })

        guardarURL();
    }

    const [whatsAppMS, guardarWhatsAppMS ] = useState({
        whatsappN : "",
        whatsappT : ""
    });

    const [ enlace, setEnlace ] = useState({
        url : ""
    })

    const onChangeWM = e => {
        guardarWhatsAppMS({
            ...whatsAppMS,
            [e.target.name] : e.target.value
        })
    }

    const onChangeWeb = e => {
        setEnlace({
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        guardarURL();
    // eslint-disable-next-line
    },[whatsAppMS, enlace])

    const guardarURL = () => {
        const numero = whatsAppMS.whatsappN;
        const texto = encodeURI(whatsAppMS.whatsappT);
        
        const URL = `https://api.whatsapp.com/send?phone=1${numero}&text=${texto}`;

        if(tipoEnlace.tipo === "No") {
            guardarNuevaNoticia({
                ...nuevaNoticia,
                url :"No"
            })
        } else if (tipoEnlace.tipo === "WhatsApp") {
            guardarNuevaNoticia({
                ...nuevaNoticia,
                url : URL
            })
        } else if (tipoEnlace.tipo === "Web") {
            guardarNuevaNoticia({
                ...nuevaNoticia,
                url : enlace.url
            })
        }
    }

    const insertarArchivos = async () => {
        
        if(!archivos) {
            return
        }

        const f = new FormData();

        f.append("image", archivos[0]);
        setSpinnerImage(true);
        
        try {
            const respuesta =  await axiosBackendCliente.post('/api/anuncios/subir/', f);
            const imagenURL = respuesta.data;
            
            guardarNuevaNoticia({
                ...nuevaNoticia,
                img : imagenURL
            });

        } catch (error) {
            console.log(error.response);

            guardarNuevaNoticia({
                ...nuevaNoticia,
                img : ""
            });
        }   
        
        setSpinnerImage(false);
    }

    const volverAlMenu = () => {
        Router.push('/');
    }
    
    const onSubmit = e => {
        e.preventDefault();

        agregarNoticia(nuevaNoticia);
    }

    const agregarNoticia = async datos => {
        guardarProcesando(true);

        try {
            await axiosBackendCliente.post('/api/anuncios', datos);
            setProcessText("Anuncio guardado exitosamente");

            setTimeout(() => {
                Router.push('/')
            }, 1000);

        } catch (error) {

            if(error.response.data.msg) {
                setProcessText(error.response.data.msg);
            } else {
                setProcessText("Error, intentalo de nuevo");
            }

            setTimeout(() => {
                Router.isReadypush('/');
            }, 1000);
        }
    }

    return (
        <ContainerForAuth>
            <Head>
                <meta charset="utf-8" />
                <title>Somos SFM - Crea un anuncio </title>
                <meta name="description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Redressed&display=swap" rel="stylesheet" />
                {/*Open Graph / Facebook*/}
                <meta property="og:title" content="Somos SFM - Crea un anuncio"/>
                <meta property="og:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
                <meta property="og:image" content="/img/logo.jpeg"></meta>
                {/* Twitter */}
                <meta property="twitter:title" content="Somos SFM - Crea un anuncio"/>
                <meta property="twitter:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana"/>
                <meta property="twitter:image" content="/img/logo.jpeg"></meta>
            </Head>
        <Fragment>
        {procesando ? (<Processing processText={processText} />) : 
        <div className="editor-noticias" >
            <div className="contenedor-editor">
                <h2 className="marginCuerpoTo">Crear Nuevo Anuncio</h2>
                <form
                        onSubmit={onSubmit}
                    >
                        <div className="panel-editor-campos">
                            <label htmlFor="titulo">Título :</label>
                            <input
                                className="campo-form campo-form-with-100"
                                type="text"
                                id="titulo"
                                name="titulo"
                                placeholder="Escriba el título de la noticia..."
                                onChange={onChange}
                                autocomplete="off"
                                required
                            />
                        </div>
                        <br/>
                        <hr/>
                        <div className="panel-editor-campos">
                            <label htmlFor="autor">Enlace :</label>
                            <select 
                                id="tipo" 
                                onChange={onChangeTipoEnlace}
                                name="tipo"
                                className="siVideo-campo-form"
                            >
                                <option value="No" >No agregar ningún enlace</option>
                                <option value="WhatsApp">Enlace a chat de WhatsApp</option>
                                <option value="Web">Enlace a Página Web</option>
                            </select>
                        </div>
                        <br/>
                        { (tipoEnlace.tipo === "Web") ? 
                            (
                                <div className="panel-editor-campos ">
                                    <label htmlFor="url">Enlace a Página Web :</label>
                                    <input
                                        className="campo-form campo-form-with-100"
                                        type="text"
                                        id="url"
                                        name="url"
                                        placeholder="Pegar aquí el enlace de la Página Web..."
                                        onChange={onChangeWeb}
                                        required
                                    />
                                </div>
                            ) 
                        : null}
                        { (tipoEnlace.tipo === "WhatsApp") ? 
                            (
                                <div className="panel-editor-campos ">
                                    <div className="panel-editor-campos">
                                        <label><center>Enlace personalizado a chat de WhatsApp</center></label>
                                        <br/>
                                    </div>
                                    <label htmlFor="whatsappN">Número (+1) :</label>
                                    <input
                                        className="campo-form campo-form-with-70px"
                                        type="number"
                                        id="whatsappN"
                                        name="whatsappN"
                                        placeholder="Ej: 8095004000"
                                        onChange={onChangeWM}
                                        required
                                    />
                                    <br/>
                                    <label htmlFor="whatsappT">Mensaje :</label>
                                    <textarea
                                        style={{resize: "none"}}
                                        className="campo-form campo-textarea campo-form-with-100"
                                        id="whatsappT"
                                        name="whatsappT"
                                        placeholder="Escriba el Mensaje del chat..."
                                        onChange={onChangeWM}
                                        required
                                    />
                                </div>
                            ) 
                        : null}
                        <br/>
                        <hr/>
                        <div className="panel-editor-campos">
                            <label htmlFor="img">Imagen : <span style={{ fontWeight: 350}}>(Es recomendable que sea 500 x 500)</span></label>
                        
                                <input 
                                    className="campo-form" 
                                    type="file" 
                                    name="files" 
                                    accept=".pdf,.jpg,.png,.jpeg"
                                    onChange={ (e) => subirArchivos(e.target.files)}
                                    required
                                />
                                {spinnerImage ? (
                                    <div className="contenedorSpinner">
                                        <Spinner/>
                                    </div>
                                ) : (
                                    <div>
                                    {
                                        nuevaNoticia.img ? (
                                            <Image width={785} height={510} src={nuevaNoticia.img} className="panel-editor-campos-imagen" alt="Imagen de la noticia" />
                                        ) : (
                                            <Image width={785} height={510} src="/img/noImage.jpg" className="panel-editor-campos-imagen" alt="Imagen de la noticia" />
                                        )
                                    } 
                                    </div>
                                )}
                            <br/>
                        </div>
                        <br/>
                        <hr/>
                        <div className="panel-editor-campos panel-editor-botones">
                            <Button
                                type="reset"
                                className="PanelBuscadorVerNoticia-img-botones z-index-b"
                                color="secondary"
                                variant="contained"
                                size="small"
                                startIcon={<CancelIcon />}
                                onClick={volverAlMenu}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="PanelBuscadorVerNoticia-img-botones z-index-b"
                                color="primary"
                                variant="contained"
                                size="small"
                                startIcon={<SaveIcon />}
                            >
                                Guadar Cambios
                            </Button>
                        </div>
                        <br/>
                </form>
            </div>
        </div>
        }
        </Fragment>
        </ContainerForAuth>
    );
}

export default CrearAnuncio;