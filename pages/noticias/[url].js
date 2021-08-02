import React, { useContext, useEffect } from 'react';
import Container from '../../components/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import Head from 'next/head';
import copy from 'copy-to-clipboard';
import axiosClient from '../../config/axios';
import Image from 'next/image';
import { Markup } from 'interweave';
import AdsComputadora from '../../components/AdsComputadora';
import AdsNew from '../../components/AdsNew';
import { AuthContext } from '../../context/AuthContext';
import EditIcon from '@material-ui/icons/Edit';

const NewsPage = ({data}) => {

  const { Auth, usuarioAutenticado } = useContext(AuthContext);

    useEffect(() => {
      usuarioAutenticado("noticia");
      console.log(Auth);
    // eslint-disable-next-line
    }, []);

  // Debo cambiar los enlaces luego
  const link = `https://somossfm.com/noticia/${data._id}`;
  const linkEditar = `https://somossfm.com/edictNews/${data._id}`;
  const shareOnFacebook = `https://www.facebook.com/sharer/sharer.php?u=https%3A//https://somossfm.com/${data._id}`;
  
  const clickCopy = () => {
      copy(link);
      alert('Enlace copiado');
  }

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Augosto",
    "Septiember",
    "Octubre",
    "Noviembre",
    "Deciembre",
  ];

  const date = new Date(data.fecha);
  const month = months[date.getMonth()];
  const day =parseInt(date.getDate());
  const year = date.getFullYear();

  return (
    <Container>
          <div className="inicio">
              <div className="cuerpo--noticias">
                  <Head>
                      <title>{data.titulo}</title>
                      <meta name="description" content={data.cuerpo[0].slice( 0 , 95) + "..."} />
                      {/*Open Graph / Facebook*/}
                      <meta property="og:title" content={data.titulo}/>
                      <meta property="og:description" content={data.cuerpo[0].slice( 0 , 95) + "..."} />
                      <meta property="og:image" content={data.img}></meta>
                      {/* Twitter */}
                      <meta property="twitter:title" content={data.titulo}/>
                      <meta property="twitter:description" content={data.cuerpo[0].slice( 0 , 95) + "..."}/>
                      <meta property="twitter:image" content={data.img}></meta>
                  </Head>
                  <div className="cuerpo--noticias--cabecera">
                      {data.video == "null"
                      ?
                        (
                          <Image width={570} height={320} src={data.img} alt="imagen" />
                        )
                      :
                        (
                          <iframe className="cuerpo--noticias--video" src={data.video} frameBorder="0" ></iframe>
                        )
                      }
                      <div className="cuerpo--noticias--titulo__fecha">
                          <p className="cuerpo--noticias--titulo"><b>{data.titulo}</b></p>
                          <p className="cuerpo--noticias--fecha">{data.tipo} {'>>'} {month} {day}, {year}</p>
                          <div className="contenedor-info-noticia-cuerpo-opciones">
                            <a href={shareOnFacebook} target="_blanck" className="contenedor-info-boton">
                                <Button
                                    className="z-index-b contenedor-info-noticia-cuerpo-botones" 
                                    color="primary"
                                    size="small"
                                    variant="contained"
                                    startIcon={<FacebookIcon/>}
                                >
                                   Compartir
                                </Button>
                            </a>
                            <div className="contenedor-info-boton">
                                <Button
                                    className="z-index-b contenedor-info-noticia-cuerpo-botones"
                                    size="small"
                                    variant="contained"
                                    startIcon={<LinkIcon/>}
                                    onClick={clickCopy}
                                >
                                    Copiar
                                </Button>
                            </div>
                            {Auth.autenticado ? (
                              <a href={linkEditar} target="_blanck" className="contenedor-info-boton">
                                <Button
                                    className="z-index-b contenedor-info-noticia-cuerpo-botones"
                                    size="small"
                                    variant="contained"
                                    startIcon={<EditIcon/>}
                                >
                                  Editar
                                </Button>
                              </a>
                            ) : null}
                          </div>
                      </div>
                  </div>
                  <div className="Ncuerpo--noticias--desarrollo">
                    <div className="cuerpo--noticias--desarrollo">
                      <Markup content={data.cuerpo[0]} />
                    </div>
                    <AdsNew/>
                  </div>
              </div>
              <AdsComputadora/>
          </div>
      </Container> 
  );
}

NewsPage.getInitialProps = async (ctx) => {

    try {
      const id = ctx.query.url;
      // Esta parte la cambiare cuando modifique el backend
      const respuesta = await axiosClient.post('/api/noticias/id/', { _id : id });
      const data = respuesta.data;
      return {data}
    } catch (error) {
      const data = null;
      return {data}
    }
}

export default NewsPage;