import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import Head from 'next/head';
import axiosClient from '../config/axios';
import News from '../components/News';

export default function Home() {

  const [ data, setData ] = useState([]);

  const SearchData = async () => {
    try {
      const respuesta = await axiosClient.get('/api/noticias/recientes/');
      setData(respuesta.data);
        
    } catch (error) {
      console.log(error);
      setData([]);
    }
  }

  useEffect(() => {
    SearchData();
  }, []);

  return (
    <Container>
      <Head>
          <meta charset="utf-8" />
          <title>News</title>
          <meta name="description" content="This is a Web application about the news. If you want to upload news you only have to create an account and get started.  " />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Redressed&display=swap" rel="stylesheet" />
          {/*Open Graph / Facebook*/}
          <meta property="og:title" content="Somos SFM"/>
          <meta property="og:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
          <meta property="og:image" content="/img/logo.png"></meta>
          {/* Twitter */}
          <meta property="twitter:title" content="Somos SFM"/>
          <meta property="twitter:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana"/>
          <meta property="twitter:image" content="/img/logo.png"></meta>
      </Head>
      <div className="inicio">
        <div className="cuerpo">
          <div className="portada">
            <br/>
            <div className="contenido">
              <img src="/img/coverPage.jpg" className="imglogo" alt="logo"/>
            </div>
            <div className="contenerdorTextos">
              <div className="textos">
                <h2>Welcome to the best place for news</h2>
              </div>
            </div>
          </div>
          <div>
            <News data = {data} tipo="inicio"/>
          </div>
        </div>
      </div>
    </Container>
  )
}