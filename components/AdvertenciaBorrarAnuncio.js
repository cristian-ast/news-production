import Button from '@material-ui/core/Button';
import { axiosBackendCliente } from '../config/axios';
import Router from 'next/router';

const AdvertenciaBorrarAnuncio = ({noticia, guardarBorrar, guardarNoticiaActiva, guardarProcesando, guardarTextoDeProceso}) => {

    const onClickBorrar = async () => {
        guardarBorrar(false);
        guardarNoticiaActiva(null);
        guardarProcesando(true);

        try {
            const id = noticia._id;
            const respuesta = await axiosBackendCliente.delete(`/api/noticias/${id}`);

            guardarTextoDeProceso(respuesta.data.msg);

            setTimeout(() => {
                Router.push('/');
            }, 1000);

        } catch (error) {

            if(error.response.data.msg) {
                guardarTextoDeProceso(error.response.data.msg);
            } else {
                guardarTextoDeProceso("Error, intentalo de nuevo");
            }

            setTimeout(() => {
                Router.push('/');
            }, 1000);
        }
    }

    const onClickCancelar = () => {
        guardarBorrar(false)
        guardarNoticiaActiva(null)
    }

    return (
        <div className="Contenedor-advertencia z-index-a">
            <div className="Contenedor-Procesando-advertencia">
                
                <div className="Contenedor-Procesando-advertencia-elcontenedor-de-vista-noticia">
                <h3 className="Contenedor-Procesando-advertencia-text">¿Estas seguro de borrar este anuncio?</h3>
                <br/>
                <br/>
                    <div 
                        style={{ backgroundImage: `url(${noticia.img})`, backgroundSize: "contain"}}
                        className="noticia--indivudual" 
                    >
                        <div className="titulo--noticia">
                            <p><b>{noticia.titulo.slice( 0 , 70) + "..."}</b></p>
                        </div>
                    </div>
                    <br/>
                    <div className="Contenedor-Procesando-advertencia-botones">
                        <Button
                            className="PanelBuscadorVerNoticia-img-botones z-index-b"
                            color="secondary"
                            size="small"
                            variant="contained"
                            onClick={onClickBorrar}
                        >
                            Si, estoy seguro
                        </Button>

                        <Button
                            className="PanelBuscadorVerNoticia-img-botones z-index-b"
                            color="primary"
                            size="small"
                            variant="contained"
                            onClick={onClickCancelar}
                        >
                            No, cancelar
                        </Button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}


export default AdvertenciaBorrarAnuncio;