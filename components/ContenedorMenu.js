import { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import Image from 'next/image';
import bigUser from '../public/img/bigUser.png';

const ContenedorMuenu = ({nombre, email}) => {
    return (
        <div className="contenedor-panel-editor-menu">
            <div className="contenedor-panel-editor-menu-opciones">
                <div className="contenedor-perfil">
                    <div className="contenedor-perfil-img">
                        <Image width={100} height={100} src={bigUser} alt="Foto de Usuario"/>
                    </div>
                    <div className="contenedor-perfil-descripcion">
                        {nombre ? 
                        (
                            <Fragment>
                                <p><b>{nombre}</b></p>
                                <p><b>{email}</b></p>
                            </Fragment>
                        )
                        :
                        (
                            <Fragment>
                                <p><b>No name</b></p>
                                <p><b>No email</b></p>
                            </Fragment>
                        )}
                        
                    </div>
                </div>
                <h3>Menú</h3>
                <Link href="/createNews">
                    <Button
                        className="PanelBuscadorVerNoticia-img-botones z-index-b with-boton-menu"
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineIcon />}
                    >
                        Crear noticia
                    </Button>
                </Link>
                <br/>
                <Link href="/edictNews">
                    <Button
                        className="PanelBuscadorVerNoticia-img-botones z-index-b with-boton-menu"
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                    >
                        Editar noticia
                    </Button>  
                </Link>
                <br/>
                <Link href="/edictNews">
                    <Button
                        className="PanelBuscadorVerNoticia-img-botones z-index-b with-boton-menu"
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineIcon />}
                    >
                        Crear anuncio
                    </Button>  
                </Link>
                <br/>
                <Link href="/edictNews">
                    <Button
                        className="PanelBuscadorVerNoticia-img-botones z-index-b with-boton-menu"
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                    >
                        Editar anuncio
                    </Button>  
                </Link>
                <br/>
            </div>    
        </div>
    );
}

export default ContenedorMuenu;