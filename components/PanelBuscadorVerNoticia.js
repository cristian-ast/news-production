import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LanguageIcon from '@material-ui/icons/Language';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';

const PanelBuscadorVerNoticia = ({titulo, img, guardarBorrar, guardarNoticiaActiva, noticia}) => {

    const link = `https://somossfm.com/noticias/${noticia._id}`;
    const editarLink = `https://somossfm.com/edictNews/${noticia._id}`;

    return (
        <div className="PanelBuscadorVerNoticia-card">
            <div className="PanelBuscadorVerNoticia-img-botones">
                <Image width={100} height={56}  src={img} alt="Imagen de la noticia" />
                <Button
                    className="PanelBuscadorVerNoticia-img-botones z-index-b"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                        guardarBorrar(true)
                        guardarNoticiaActiva(noticia)
                    }}

                >
                    Borrar
                </Button>
                <Button
                    className="PanelBuscadorVerNoticia-img-botones z-index-b"
                    color="primary"
                    size="small"
                    onClick={() =>{
                        Router.push(editarLink);
                    }}

                    startIcon={<EditIcon />}
                >
                    Editar
                </Button>
            </div>
            <div className="PanelBuscadorVerNoticia-p">
                <p>{titulo}</p>
            </div>
            <Link href={link} target="_blanck">
                <Button
                    className="PanelBuscadorVerNoticia-img-botones z-index-b"
                    color="primary"
                    size="small"
                    variant="contained"
                    startIcon={<LanguageIcon />}
                >
                    Abrir la noticia
                </Button>
            </Link>
        </div>
    );
}
    
export default PanelBuscadorVerNoticia;