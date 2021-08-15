import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LanguageIcon from '@material-ui/icons/Language';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';

const PanelBuscadorVerAnuncio = ({titulo, img, guardarBorrar, guardaranuncioActivo, noticia}) => {
    const editarLink = `https://somossfm.com/edictAds/${noticia._id}`;

    return (
        <div className="PanelBuscadorVerNoticia-card">
            <div className="PanelBuscadorVerNoticia-img-botones">
                <div className="PanelBuscadorVerNoticia-p">
                    <p>{titulo}</p>
                </div>
                <div className="PanelBuscadorVerNoticia-img-buttons">
                    <Image width={100} height={100}  src={img} alt="Imagen de la noticia" />
                    <Button
                        className="PanelBuscadorVerNoticia-img-botones z-index-b"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                            guardarBorrar(true)
                            guardaranuncioActivo(noticia)
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
                
            </div>
            
        </div>
    );
}
    
export default PanelBuscadorVerAnuncio;