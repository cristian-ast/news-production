import React, { createContext, useState } from 'react';

// crear el Contex
export const EditarNoticiaContext = createContext();

// provider es donde se encuenran las funciones y state
const EditarNoticiaProvider = (props) => {

    // crear el state del Context
    const [ modificarNoticia, guardarModificarNoticia ] = useState({
        titulo : "",
        url : "",
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

    return (
        <EditarNoticiaContext.Provider
            value={{
                modificarNoticia,
                guardarModificarNoticia
            }}
        >
            {props.children}
        </EditarNoticiaContext.Provider>
    )
}

export default EditarNoticiaProvider;