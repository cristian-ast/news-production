import React, { useEffect } from 'react';

const VistaPreviavideoEditar = ({videoURL, nuevaNoticia, guardarNuevaNoticia}) => {

    var videoDeLaNoticia;

    const ExtraerURLVideo = (link) => {

        let tamano = link.length;
        let indice = 0;
        let guardandoURL = false;
        let URL = "";

            while(tamano > indice) {
                // Este codigo solo funciona cuando el elace de Youtube empieza con https://www.youtube.com/watch?v=
                if ( (link.charAt(indice) ) === "=") {
                    indice++;
                    guardandoURL = true;
                    while(guardandoURL) {
                        if ((link.charAt(indice)) !== "&" ) {
                            URL += link.charAt(indice);
                        } else {
                            return URL;
                        }
                        indice++;
                        if (tamano <= indice) {
                            guardandoURL = false;
                        }
                    }
                } else {
                    // Este codigo solo funciona cuando el elace de Youtube empieza con https://youtu.be/
                    if ((tamano === indice + 1) && (URL.length === 0)) {
                        indice = 16;
                        while(tamano > indice) {
                            if ( indice === 16 ) {
                                indice++;
                                guardandoURL = true;
                                while(guardandoURL) {
                                    if ((link.charAt(indice)) !== "&" ) {
                                        URL += link.charAt(indice);
                                    } else {
                                        return URL;
                                    }
                                    indice++;
                                    if (tamano <= indice) {
                                        guardandoURL = false;
                                    }
                                }
                            }
                            indice++;
                        }
                        return URL;
                    }
                }
                indice++;
            }

        return URL;
    }



    // ver la url
    let ver = 0;
    let verURL = "";

    while ( ver < 30) {
        verURL += videoURL.charAt(ver);
        ver++
    }

    if(verURL ==="https://www.youtube.com/embed/") {
        
        videoDeLaNoticia = videoURL;

    } else {

        const miniURL = ExtraerURLVideo(videoURL);
        videoDeLaNoticia = `https://www.youtube.com/embed/${miniURL}`;

    }

    

    useEffect(() => {
        guardarNuevaNoticia({
            ...nuevaNoticia,
            video : videoDeLaNoticia
        })
    // eslint-disable-next-line
    }, [videoURL, videoDeLaNoticia]);

    return (
        <div className="contenedor-vista-previa-video">
            <iframe title="Video de Youtube" width="380" height="220" src={videoDeLaNoticia} frameBorder="0" ></iframe>
        </div>
    );
}

export default VistaPreviavideoEditar;