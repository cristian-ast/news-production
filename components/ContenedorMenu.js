import { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';

const ContenedorMuenu = ({nombre, email}) => {
    return (
        <div className="contenedor-panel-editor-menu">
            <div className="contenedor-panel-editor-menu-opciones">
                <div className="contenedor-perfil">
                    <div className="contenedor-perfil-img">
                        <img src="img/bigUser.png" alt="Foto de Usuario"/>
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
                <h3>Menu</h3>
                <Link href="/CrearNoticia">
                    <Button
                        className="PanelBuscadorVerNoticia-img-botones z-index-b with-boton-menu"
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineIcon />}
                    >
                        Add a news
                    </Button>
                </Link>
                <br/>
                <Link href="/EditarNoticia">
                    <Button
                        className="PanelBuscadorVerNoticia-img-botones z-index-b with-boton-menu"
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                    >
                        edit a news
                    </Button>  
                </Link>
                <br/>
                <Link href="/EditarNoticia">
                    <Button
                        className="PanelBuscadorVerNoticia-img-botones z-index-b with-boton-menu"
                        size="small"
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                    >
                        Delete my account
                    </Button>  
                </Link>
                
                
            </div>    
        </div>
    );
}

export default ContenedorMuenu;