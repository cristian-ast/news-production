import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import Head from 'next/head';
import axiosClient from '../config/axios';
import News from '../components/News';
import Processing from '../components/Processing';
import Image from 'next/image';

export default function Home() {

  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState([]);

  const SearchData = async () => {
    try {
      const respuesta = await axiosClient.get('/api/noticias/recientes/');
      setData(respuesta.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setData([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    SearchData();
  }, []);

  return (
    <Container>
      <Head>
        <meta charset="utf-8" />
        <title>Somos SFM</title>
        <meta name="description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Redressed&display=swap" rel="stylesheet" />
        {/*Open Graph / Facebook*/}
        <meta property="og:title" content="Somos SFM"/>
        <meta property="og:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana" />
        <meta property="og:image" content="/img/logo.jpeg"></meta>
        {/* Twitter */}
        <meta property="twitter:title" content="Somos SFM"/>
        <meta property="twitter:description" content="Página de noticias en la ciudad de San Francisco de Macorís, República Domnicana"/>
        <meta property="twitter:image" content="/img/logo.jpeg"></meta>
      </Head>
      <div className="inicio">
        <div className="cuerpo">
          <div className="portada">
            <br/>
            <div className="contenido">
              <Image width={900} height={600} src="/img/coverPage.jpg" className="imglogo" alt="logo"/>
            </div>
            <div className="contenerdorTextos">
              <div className="textos">
                <h2>Welcome to the best place for news</h2>
              </div>
            </div>
          </div>
          <div>
            { loading ? <Processing processText={"Cargando..."}/> : <News data = {data} tipo="inicio"/>}
          </div>
        </div>
      </div>
    </Container>
  )
}
