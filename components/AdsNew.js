import React, { useState, useEffect, Fragment } from 'react';
import AdsN from './AdsN';
import { axiosBackendCliente } from '../config/axios';

const AdsNew = () => {

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
        <div className="Asd-New">
            <center><p className="Asd-New--p">Publicidad</p></center>
                {BaseDatos ?
                    <Fragment>
                        {BaseDatos.map((anuncio) => (
                            <Fragment key = {anuncio._id}>
                                <AdsN
                                    img = {anuncio.img} 
                                    url = {anuncio.url}
                                />
                                <br/>
                            </Fragment>
                        ))}
                    </Fragment>
                : null}    
        </div>
    );
}

export default AdsNew;