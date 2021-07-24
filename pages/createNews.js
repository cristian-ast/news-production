import React, { useState, useEffect, Fragment } from 'react';
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

// import CuerpoNoticia from './layout/CuerpoNoticia';
// import InfoNoticia from './layout/InfoNoticia';
// import SinImagen from './img/SinImagen.jpg';

const CreateNews = (props) => {

    const [ mostrarInfoNoticia, guardarInfoNoticia ] = useState(false);

    const [ loading, setLoading ] = useState(false);
    const [ processText, setProcessText ] = useState("Loading...");

    const [nuevaNoticia, guardarNuevaNoticia] = useState({
        titulo : "",
        autor : "",
        tipo : "",
        img : "",
        video : "null",
        cuerpo : [
            "",
            "",
            ""
        ]
    });

    const onChange = e => {
        guardarNuevaNoticia({
            ...nuevaNoticia,
            [e.target.name] : e.target.value

        })
    }
    
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

    const CambiaMostraSpinnerEnCuerpoNoticia = () => {
        GmostraSpinnerEnCuerpoNoticia(true);
        setTimeout(volverAFalso, 800);
    }

    const volverAFalso = () => {
        GmostraSpinnerEnCuerpoNoticia(false);
    }
    
    const  [mostraSpinnerEnVideo, GmostraSpinnerEnVideo ] = useState(false);

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

        const f = new FormData();

        f.append("image", archivos[0]);

        try {
            const respuesta =  await axiosBackendCliente.post('/api/noticias/subir/', f);
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
    }

    const volverAlMenu = () => {
        props.history.push('/');
    }
    
    const onSubmit = e => {
        e.preventDefault();

        agregarNoticia(nuevaNoticia);
    }

    const agregarNoticia = async datos => {
        setLoading(true);

        try {
            const respuesta = await axiosBackendCliente.post('/api/noticias', datos);
            setProcessText("Noticia guardada exitosamente");
            guardarNuevaNoticia(respuesta.data);

            setTimeout(() => {
                guardarInfoNoticia(true);
            }, 1000);

        } catch (error) {

            if(error.response.data.msg) {
                setProcessText(error.response.data.msg);
            } else {
                setProcessText("Error, intentalo de nuevo");
            }

            setTimeout(() => {
                Router.push('/');
            }, 1000);
        }
    }

    return (
        <ContainerForAuth>
            {/* {mostrarInfoNoticia ? (<InfoNoticia nuevaNoticia={nuevaNoticia}/>) : <Fragment> */}
                { loading ? (<Processing processText={processText} />) : 
                    <div className="editor-noticias" >
                        <div className="contenedor-editor">
                        <h2 className="marginCuerpoTo">Create a news</h2>
                        <form
                                onSubmit={onSubmit}
                            >
                                <div className="panel-editor-campos">
                                    <label htmlFor="titulo">Title :</label>
                                    <input
                                        className="campo-form campo-form-with-100"
                                        type="text"
                                        id="titulo"
                                        name="titulo"
                                        placeholder="Write the news' title..."
                                        onChange={onChange}
                                        autocomplete="off"
                                        required
                                    />
                                </div>
                                <div className="panel-editor-campos">
                                    <label htmlFor="autor">Author :</label>
                                    <input
                                        className="campo-form campo-form-with-100"
                                        type="text"
                                        id="autor"
                                        name="autor"
                                        placeholder="Write the author's name..."
                                        onChange={onChange}
                                        required
                                    />
                                </div>

                                <div className="panel-editor-campos">
                                    <label htmlFor="tipo">Type of news :</label>
                                    <select 
                                        name="tipo" 
                                        id="tipo" 
                                        className="campo-form campo-form-with-100"
                                        onChange={onChange}
                                        required
                                    >
                                        <option value="">--Please select an option--</option>
                                        <option value="Actualidad">Recent</option>
                                        <option value="Deportes">Sports</option>
                                        <option value="Justicia">Justice</option>
                                        <option value="Farandula">Entertainment</option>
                                        <option value="Economia">Economy</option>
                                    </select>
                                    <br/>
                                </div>
                                <hr/>
                                <div className="panel-editor-campos">
                                    <br/>
                                    <label htmlFor="img">Picture : <span style={{ fontWeight: 350}}>(It is recommended that it be 1000 x 514)</span></label>

                                        <input 
                                            className="campo-form" 
                                            type="file" 
                                            name="files" 
                                            accept=".pdf,.jpg,.png,.jpeg"
                                            onChange={ (e) => subirArchivos(e.target.files)}
                                            required
                                        />
                                    {
                                        nuevaNoticia.img ? (
                                            <Image width={785} height={510} src={nuevaNoticia.img} className="panel-editor-campos-imagen" alt="Imagen de la noticia" />
                                        ) : (
                                            <Image width={785} height={510} src="/img/noImage.jpg" className="panel-editor-campos-imagen" alt="Imagen de la noticia" />
                                        )
                                    }

                                    <br/>
                                </div>
                                <hr/>

                                {/* <CuerpoNoticia
                                    onChangeCuerpo={onChangeCuerpo}
                                    nCuerpo={nCuerpo.canParr}
                                /> */}

                                <div className="panel-editor-campos">
                                    <label htmlFor="tipo">Video : </label>
                                    <select 
                                        id="tipo" 
                                        onChange={onChangeVideo}
                                        name="siVideo"
                                        className="siVideo-campo-form"
                                    >
                                        <option value="false" >No</option>
                                        <option value="true">Yes</option>
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
                                            <label htmlFor="titulo">Link to Youtube video :</label>
                                            <input
                                                className="campo-form campo-form-with-100"
                                                type="text"
                                                id="titulo"
                                                name="videoURL"
                                                placeholder="Paste the video link here..."
                                                onChange={onChangeVideo}
                                                required
                                            />
                                            <p><b>Important: :</b> Before saving the news, make sure that the video loads correctly:</p>
                                            <VistaPreviavideo 
                                                videoURL={videoURL}
                                                nuevaNoticia={nuevaNoticia}
                                                guardarNuevaNoticia={guardarNuevaNoticia}
                                            />
                                        </div>
                                    )
                                    : null} </div>)}
                                </div>
                                <br/>
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
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="PanelBuscadorVerNoticia-img-botones z-index-b"
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        startIcon={<SaveIcon />}
                                    >
                                        Save changes
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