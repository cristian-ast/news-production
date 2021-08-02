import React, { useState, useEffect, Fragment } from 'react';
import Ads from './Ads';
import { axiosBackendCliente} from '../config/axios';

const AdsComputadora = () => {

    const [ BaseDatos, guardarBaseDatos] = useState(false);

    const BuscarLosAnuncios = async () => {

        try {
          const respuesta = await axiosBackendCliente.get('/api/anuncios/');
          guardarBaseDatos(respuesta.data);
            
        } catch (error) {
          console.log(error);
        }
    }
    
    useEffect(() => {
        BuscarLosAnuncios();
    }, []);
    
    return (
        <div className="Asd-computadora">
            <p className="Asd-computadora--p">Publicidad</p>
                
                {BaseDatos ? (
                    <Fragment> {
                        BaseDatos.map( (anuncio) => (
                            <Ads
                                img = {anuncio.img} 
                                url = {anuncio.url}
                                key = {anuncio.titulo}
                            />
                        ))
                    }</Fragment>
                ) : null}
        </div>
    );
}

export default AdsComputadora;