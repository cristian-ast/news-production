import React, { Fragment } from 'react';
import New from './New';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const News = ({data, tipo}) => {

    return (
        <div className="Ncontenedor--noticias">
            <div className="contenedor--noticias">
                <div className="contenedorNoticias--titulo">
                    <h3><DoubleArrowIcon/>
                        <span className="contenedorNoticias--titulo2">
                            {tipo}
                        </span>
                    </h3>
                </div>
                    {data ? (
                        <Fragment>
                            {data.map((data) => (
                                <Fragment key = {data._id} >
                                    <New
                                        titulo = {data.titulo}
                                        img = {data.img} 
                                        url = {data._id}
                                    />
                                </Fragment>
                            ))}
                        </Fragment>
                    ) : (
                        <Fragment>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <h3>No se han podido cargar las noticias</h3>
                        </Fragment>
                    )}
            </div>
        </div>
    );
}

export default News;