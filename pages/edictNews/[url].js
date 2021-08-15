import React, { useState, useEffect, useContext } from 'react';
import Spinner from '../../components/Spinner';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Processing from '../../components/Processing';
import { axiosBackendCliente } from '../../config/axios';
import Image from 'next/image';
import ContainerForAuth from '../../components/ContainerForAuth';
import Router from 'next/router';
import VistaPreviavideoEditar from '../../components/VistaPreviaVideoEditar';
import TextEditor from '../../components/TextEditor';
import { AuthContext } from '../../context/AuthContext';
import Head from 'next/head';

const EdictNews = ({data}) => {

    const { usuarioAutenticado } = useContext(AuthContext);

    useEffect(() => {        
        usuarioAutenticado("createNews");
    // eslint-disable-next-line
    }, []);

    const [ loading, setLoading ] = useState(false);
    const [ processText, setProcessText ] = useState("Cargando...");
    const [ newsContent, setNewsContent ] = useState(data.cuerpo[0]);
    // state de las alertas
    const [mostrarAlerta, guardarMostrarAlerta] = useState({
        mostrar: false,
        description : "Cada campo es requerido"
    });

    const [nuevaNoticia, guardarNuevaNoticia] = useState({
        _id: data._id,
        titulo : data.titulo,
        autor : data.autor,
        tipo : data.tipo,
        img : data.img,
        video : data.video,
        cuerpo : data.cuerpo
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
            cuerpo: [newsContent]
        })
        
    // eslint-disable-next-line
    }, [newsContent]);

    const revisarSiHayVideo = () => {
        if(data.video != "null"){
            return "Si"
        } else {
            return "No"
        }
    }
    
    const [ estadoVideo, guardarEstadoVideo ] = useState({
        siVideo : revisarSiHayVideo(),
        videoURL : data.video
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
        if (siVideo ==="No") {
            guardarNuevaNoticia({
                ...nuevaNoticia,
                video : "null"
            })
            guardarEstadoVideo({
                ...estadoVideo,
                videoURL : "null"
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

        if(nuevaNoticia.cuerpo[0].trim() === ""){
            
            guardarMostrarAlerta({
                ...mostrarAlerta,
                mostrar: true,
                description : "Debes de escribir algo de contenido en la noticia"
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
            
            const id = datos._id;
            await axiosBackendCliente.put(`/api/noticias/${id}`, datos);

            setProcessText("Noticia guardada de manera exitosa");

            setTimeout(() => {
                Router.push(`https://somossfm.com/noticias/${id}`);
            }, 1000);

        } catch (error) {
            console.log(error)
            setProcessText("Error, trata de nuevo");
           
            setTimeout(() => {
                guardarNuevaNoticia({
                    _id: data._id,
                    titulo : data.titulo,
                    autor : data.autor,
                    tipo : data.tipo,
                    img : data.img,
                    video : data.video,
                    cuerpo : data.cuerpo
                });
                setLoading(false);
                setProcessText("Cargando...");
            }, 1000);
        }
    }

    return (
        <ContainerForAuth>
            <Head>
                <meta charset="utf-8" />
                <title>Somos SFM - Edita una noticia </title>
                <meta name="description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Redressed&display=swap" rel="stylesheet" />
                {/*Open Graph / Facebook*/}
                <meta property="og:title" content="Somos SFM - Edita una noticia"/>
                <meta property="og:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
                <meta property="og:image" content="/img/logo.jpeg"></meta>
                {/* Twitter */}
                <meta property="twitter:title" content="Somos SFM - Edita una noticia"/>
                <meta property="twitter:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana"/>
                <meta property="twitter:image" content="/img/logo.jpeg"></meta>
            </Head>
            { loading ? (<Processing processText={processText} />) : 
                <div className="editor-noticias" >
                    <div className="contenedor-editor">
                        <h2 className="marginCuerpoTo">Editar noticia</h2>
                        <form
                                onSubmit={onSubmit}
                            >
                                <div className="panel-editor-campos">
                                    <label htmlFor="titulo">Título :</label>
                                    <input
                                        value={nuevaNoticia.titulo}
                                        className="campo-form campo-form-with-100"
                                        type="text"
                                        id="titulo"
                                        name="titulo"
                                        placeholder="Escribe el titulo de la noticia..."
                                        onChange={onChange}
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="panel-editor-campos">
                                    <label htmlFor="autor">Autor :</label>
                                    <input
                                        value={nuevaNoticia.autor}
                                        className="campo-form campo-form-with-100"
                                        type="text"
                                        id="autor"
                                        name="autor"
                                        placeholder="Escribe el autor de la noticia..."
                                        onChange={onChange}
                                        required
                                    />
                                </div>

                                <div className="panel-editor-campos">
                                    <label htmlFor="tipo">Tipo de noticia :</label>
                                    <select
                                        value={nuevaNoticia.tipo}
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
                                        defaultData={nuevaNoticia.cuerpo[0]}
                                    />
                                    <br/><br/>
                                </div>
                                <hr/>
                                <div className="panel-editor-campos">
                                    <label htmlFor="tipo">Video : </label>
                                    <select 
                                        id="tipo" 
                                        value={siVideo}
                                        onChange={onChangeVideo}
                                        name="siVideo"
                                        className="siVideo-campo-form"
                                    >
                                        <option value="No" >No</option>
                                        <option value="Si">Si</option>
                                    </select>
                                    <br/>
                                    {mostraSpinnerEnVideo ? (
                                        <div className="contenedorSpinner">
                                            <Spinner/>
                                        </div>
                                    ) : (<div>
                                    { (siVideo === "Si")? 
                                    (
                                        <div className="panel-editor-campos ">
                                            <label htmlFor="titulo">Link a Youtube video :</label>
                                            <input
                                                className="campo-form campo-form-with-100"
                                                type="text"
                                                id="titulo"
                                                name="videoURL"
                                                placeholder="Paste the video link here..."
                                                onChange={onChangeVideo}
                                            />
                                            <p><b>Importante: :</b> Antes de guardar la noticia asegurate de que el video cargue correctamente:</p>
                                            <VistaPreviavideoEditar
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
        </ContainerForAuth>
    );
}

EdictNews.getInitialProps = async (ctx) => {

    try {
      const id = ctx.query.url;
      // Esta parte la cambiare cuando modifique el backend
      const respuesta = await axiosBackendCliente.post('/api/noticias/id/', { _id : id });
      const data = respuesta.data;
      return {data}
    } catch (error) {
      const data = null;
      return {data}
    }
}

export default EdictNews;