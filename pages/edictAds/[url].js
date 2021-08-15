import React, { useState, useEffect, Fragment, useContext } from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Processing from '../../components/Processing';
import Head from 'next/head';
import ContainerForAuth from '../../components/ContainerForAuth';
import Image from 'next/image';
import { axiosBackendCliente } from '../../config/axios';
import { AuthContext } from '../../context/AuthContext';
import Router from 'next/router';
import Spinner from '../../components/Spinner';

const EdictAds = ({data}) => {

    console.log(data);

    const { Auth, usuarioAutenticado } = useContext(AuthContext);

    useEffect(() => {        
        usuarioAutenticado("createNews");
    // eslint-disable-next-line
    }, []);

    const [ procesando, guardarProcesando ] = useState(false);
    const [ processText, setProcessText ] = useState("Cargando...");
    const  [ spinnerImage, setSpinnerImage ] = useState(false);

    const [nuevaNoticia, guardarNuevaNoticia] = useState({
        titulo : data.titulo,
        url : data.url,
        img : data.img,
        _id : data._id
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

    // Revisar el URL
    // revisar cuantos parrafos tiene la noticia
    let URLInicial= "";

    for (let i = 0; i < 35; i++) {
        URLInicial += nuevaNoticia.url.charAt(i);
    }

    let estadoInicialTipo;
    let whatsappNicial;
    let whatsappTinicial;
    let estadoIniciaWeb;
    
    if (nuevaNoticia.url === "No") {
        estadoInicialTipo = "No";
        whatsappNicial = "";
        whatsappTinicial = "";
        estadoIniciaWeb = "";

    } else if(URLInicial === "https://api.whatsapp.com/send?phone") {
        
        
        estadoInicialTipo = "WhatsApp";
        estadoIniciaWeb = "";
        let numeroW = "";
        let textoW = "";
 
        // decodeURI()
        // https://api.whatsapp.com/send?phone=18093158252&text=Buenas%20Somos%20SFM.%20Deseo%20conocer%20m%C3%A1s%20sobre%20los%20anuncios%20en%20su%20portal%20de%20noticias.
        
        // primero extraigo el numero de la url
        for (let i = 0; i < nuevaNoticia.url.length; i++) {
            
            if (( i > 36) && ( i < 47 )) {
                numeroW += nuevaNoticia.url.charAt(i);
            }
            
            if ( i > 52 ) {
                textoW += nuevaNoticia.url.charAt(i);
            }
        }

        whatsappNicial = parseInt(numeroW);
        whatsappTinicial = decodeURI(textoW);

    } else {
        estadoInicialTipo = "Web";
        whatsappNicial = "";
        whatsappTinicial = "";
        estadoIniciaWeb = nuevaNoticia.url;
    }

    const [ tipoEnlace, guardarTipoEnlace ] = useState({
        tipo : estadoInicialTipo
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
        whatsappN : whatsappNicial,
        whatsappT : whatsappTinicial
    });

    const [ enlace, setEnlace ] = useState({
        url : estadoIniciaWeb
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
            //await axiosBackendCliente.post('/api/anuncios', datos);
            const id = datos._id;
            await axiosBackendCliente.put(`/api/anuncios/${id}`, datos);

            setProcessText("Anuncio guardado exitosamente");

            setTimeout(() => {
                Router.push('/menu')
            }, 1000);

        } catch (error) {
            setProcessText("Error, intentalo de nuevo");
            

            setTimeout(() => {
                Router.isReadypush('/menu');
            }, 1000);
        }
    }

    return (
        <ContainerForAuth>
            <Head>
                <meta charset="utf-8" />
                <title>Somos SFM - Editar Anuncio </title>
                <meta name="description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Redressed&display=swap" rel="stylesheet" />
                {/*Open Graph / Facebook*/}
                <meta property="og:title" content="Somos SFM - Editar Anuncio"/>
                <meta property="og:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
                <meta property="og:image" content="/img/logo.jpeg"></meta>
                {/* Twitter */}
                <meta property="twitter:title" content="Somos SFM - Editar Anuncio"/>
                <meta property="twitter:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana"/>
                <meta property="twitter:image" content="/img/logo.jpeg"></meta>
            </Head>
        <Fragment>
        {procesando ? (<Processing processText={processText} />) : 
        <div className="editor-noticias" >
            <div className="contenedor-editor">
                <h2 className="marginCuerpoTo">Editar Anuncio</h2>
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
                                placeholder="Escriba el título de la noticia..."
                                onChange={onChange}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <br/>
                        <hr/>
                        <div className="panel-editor-campos">
                            <label htmlFor="autor">Enlace :</label>
                            <select 
                                id="tipo" 
                                value={tipoEnlace.tipo}
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
                                        value={enlace.url}
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
                                        value={whatsAppMS.whatsappN}
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
                                        value={whatsAppMS.whatsappT}
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
                                />
                                {spinnerImage ? (
                                    <div className="contenedorSpinner">
                                        <Spinner/>
                                    </div>
                                ) : (
                                    <div>
                                    {
                                        nuevaNoticia.img ? (
                                            <Image width={500} height={500} src={nuevaNoticia.img} className="panel-editor-campos-imagen" alt="Imagen de la noticia" />
                                        ) : (
                                            <Image width={500} height={500} src="/img/noImage.jpg" className="panel-editor-campos-imagen" alt="Imagen de la noticia" />
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

EdictAds.getInitialProps = async (ctx) => {

    try {
      const id = ctx.query.url;
      const respuesta = await axiosBackendCliente.post('/api/anuncios/buscar', { _id : id });
      const data = respuesta.data[0];
      return {data}
    } catch (error) {
      const data = null;
      return {data}
    }
}

export default EdictAds;