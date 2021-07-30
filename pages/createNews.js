import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Spinner from '../components/Spinner';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Processing from '../components/Processing';
import { axiosBackendCliente } from '../config/axios';
import Image from 'next/image';
import ContainerForAuth from '../components/ContainerForAuth';
import Router from 'next/router';
import VistaPreviavideo from '../components/VistaPreviavideo';
import TextEditor from '../components/TextEditor';
import { AuthContext } from '../context/AuthContext';

const CreateNews = (props) => {

    const { Auth, usuarioAutenticado } = useContext(AuthContext);

    useEffect(() => {        
        usuarioAutenticado("createNews");
    // eslint-disable-next-line
    }, []);

    const [ mostrarInfoNoticia, guardarInfoNoticia ] = useState(false);

    const [ loading, setLoading ] = useState(false);
    const [ processText, setProcessText ] = useState("Cargando...");
    const [ newsContent, setNewsContent ] = useState("");
    // state de las alertas
    const [mostrarAlerta, guardarMostrarAlerta] = useState({
        mostrar: false,
        description : "Cada campo es requerido"
    });

    const [nuevaNoticia, guardarNuevaNoticia] = useState({
        titulo : "",
        autor : "",
        tipo : "",
        img : "",
        video : "null",
        cuerpo : ""
    });

    const onChange = e => {
        guardarNuevaNoticia({
            ...nuevaNoticia,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        guardarNuevaNoticia({
            ...nuevaNoticia,
            cuerpo: newsContent
        })
    // eslint-disable-next-line
    }, [newsContent]);
    
    const [ estadoVideo, guardarEstadoVideo ] = useState({
        siVideo : false,
        videoURL : ""
    });

    const { siVideo, videoURL } = estadoVideo;

    const onChangeVideo = e => {
        guardarEstadoVideo({
            ...estadoVideo,
           [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        CambiaMostraSpinnerEnVideo();
        if ( (siVideo === "false") || (siVideo === false) ) {
            guardarNuevaNoticia({
                ...nuevaNoticia,
                video : "null"
            })
            guardarEstadoVideo({
                ...estadoVideo,
                videoURL : ""
            })
        }
    // eslint-disable-next-line
    }, [siVideo]);
    
    const  [ mostraSpinnerEnVideo, GmostraSpinnerEnVideo ] = useState(false);
    const  [ spinnerImage, setSpinnerImage ] = useState(false);

    const CambiaMostraSpinnerEnVideo = () => {
       GmostraSpinnerEnVideo(true);
       setTimeout(volverAFalsoVideo, 800);
    }

    const volverAFalsoVideo = () => {
       GmostraSpinnerEnVideo(false);
    }
    
    const [ archivos, setArchivos ] = useState(null);

    const subirArchivos = (e) => {
        setArchivos(e);
    }

    useEffect( () => {
        insertarArchivos();
    // eslint-disable-next-line
    }, [archivos]);

    const insertarArchivos = async () => {
        
        if(!archivos) {
            return
        }

        setSpinnerImage(true);

        const f = new FormData();

        f.append("image", archivos[0]);

        try {
            const respuesta =  await axiosBackendCliente.post('/api/noticias/subir/', f);
            const imagenURL = respuesta.data;
            
            guardarNuevaNoticia({
                ...nuevaNoticia,
                img : imagenURL
            });

            setSpinnerImage(false);

        } catch (error) {
            console.log(error.response);

            guardarNuevaNoticia({
                ...nuevaNoticia,
                img : ""
            });

            setSpinnerImage(false);
        }        
    }

    const volverAlMenu = () => {
        Router.push('/menu');
    }
    
    const onSubmit = e => {
        e.preventDefault();

        if(nuevaNoticia.cuerpo.trim() === ""){
            
            guardarMostrarAlerta({
                ...mostrarAlerta,
                mostrar: true,
                description : "Debes escribir algo de contenido a la noticia"
            });

            setTimeout(() => {
                guardarMostrarAlerta({
                  ...mostrarAlerta,
                  mostrar: false,
                  });
  
              }, 5000);
            return;
        }

        agregarNoticia(nuevaNoticia);
    }

    const agregarNoticia = async datos => {

        setLoading(true);

        try {
            const respuesta = await axiosBackendCliente.post('/api/noticias', datos);
            setProcessText("Noticia guardada de manera exitosa");
            guardarNuevaNoticia(respuesta.data);

            setTimeout(() => {
                guardarInfoNoticia(true);
            }, 1000);

            Router.push('/');

        } catch (error) {

            if(error.response.data.msg) {
                setProcessText(error.response.data.msg);
            } else {
                setProcessText("Error, trata de nuevo");
            }

            setTimeout(() => {
                Router.push('/');
            }, 1000);
        }
    }

    return (
        <ContainerForAuth>
            <Head>
                <meta charset="utf-8" />
                <title>Somos SFM - Crear una noticia </title>
                <meta name="description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Redressed&display=swap" rel="stylesheet" />
                {/*Open Graph / Facebook*/}
                <meta property="og:title" content="Somos SFM - Crear una noticia"/>
                <meta property="og:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
                <meta property="og:image" content="/img/logo.jpeg"></meta>
                {/* Twitter */}
                <meta property="twitter:title" content="Somos SFM - Crear una noticia"/>
                <meta property="twitter:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana"/>
                <meta property="twitter:image" content="/img/logo.jpeg"></meta>
            </Head>
            {/* {mostrarInfoNoticia ? (<InfoNoticia nuevaNoticia={nuevaNoticia}/>) : <Fragment> */}
                { loading ? (<Processing processText={processText} />) : 
                    <div className="editor-noticias" >
                        <div className="contenedor-editor">
                        <h2 className="marginCuerpoTo">Crear noticia</h2>
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
                                        placeholder="Escribe el título de la noticia..."
                                        onChange={onChange}
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="panel-editor-campos">
                                    <label htmlFor="autor">Autor :</label>
                                    <input
                                        className="campo-form campo-form-with-100"
                                        type="text"
                                        id="autor"
                                        name="autor"
                                        placeholder="Escribe el nombre del autor..."
                                        onChange={onChange}
                                        required
                                    />
                                </div>

                                <div className="panel-editor-campos">
                                    <label htmlFor="tipo">Tipo de noticia :</label>
                                    <select 
                                        name="tipo" 
                                        id="tipo" 
                                        className="campo-form campo-form-with-100"
                                        onChange={onChange}
                                        required
                                    >
                                        <option value="">--Por favor, selecciona una opcion--</option>
                                        <option value="Actualidad">Actualidad</option>
                                        <option value="Deportes">Deportes</option>
                                        <option value="Justicia">Justicia</option>
                                        <option value="Farandula">Entretenimiento</option>
                                        <option value="Economia">Economia</option>
                                    </select>
                                    <br/>
                                </div>
                                <hr/>
                                <div className="panel-editor-campos">
                                    <br/>
                                    <label htmlFor="img">Imagen : <span style={{ fontWeight: 350}}>(Se recomienda una resolución de 1000 x 514)</span></label>

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
                                
                                <div className="panel-editor-campos">
                                    <label>Escribe el contenido :</label>
                                    <br/><br/>
                                    <TextEditor 
                                        setNewsContent={setNewsContent}
                                    />
                                    <br/><br/>
                                </div>
                                <hr/>
                                <div className="panel-editor-campos">
                                    <label htmlFor="tipo">Video : </label>
                                    <select 
                                        id="tipo" 
                                        onChange={onChangeVideo}
                                        name="siVideo"
                                        className="siVideo-campo-form"
                                    >
                                        <option value="false" >No</option>
                                        <option value="true">Si</option>
                                    </select>
                                    <br/>
                                    {mostraSpinnerEnVideo ? (
                                        <div className="contenedorSpinner">
                                            <Spinner/>
                                        </div>
                                    ) : (<div>
                                    { (siVideo === "true") ? 
                                    (
                                        <div className="panel-editor-campos ">
                                            <label htmlFor="titulo">Link a Youtube video :</label>
                                            <input
                                                className="campo-form campo-form-with-100"
                                                type="text"
                                                id="titulo"
                                                name="videoURL"
                                                placeholder="Pega el Link del video aquí..."
                                                onChange={onChangeVideo}
                                                required
                                            />
                                            <p><b>Importante: :</b> Antes de guardar la noticia asegurate de que el video cargue correctamente:</p>
                                            <VistaPreviavideo 
                                                videoURL={videoURL}
                                                nuevaNoticia={nuevaNoticia}
                                                guardarNuevaNoticia={guardarNuevaNoticia}
                                            />
                                        </div>
                                    )
                                    : null} </div>)}
                                </div>
                                
                                <br/><br/><hr/>

                                {mostrarAlerta.mostrar ? <div className="mostrarAlerta">{mostrarAlerta.description}</div> : null}
                               
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
                                        Guardar cambios
                                    </Button>
                                </div>
                                <br/><br/><br/><br/>
                        </form>
                    </div>
                </div>
            }
            {/* </Fragment>} */}
        </ContainerForAuth>
    );
}

export default CreateNews;