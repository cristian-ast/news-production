import  React, { useState, useContext, Fragment, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { axiosBackendCliente } from '../config/axios';
import Processing from '../components/Processing';
import Router from 'next/router';
import ContainerForAuth from '../components/ContainerForAuth';
import Button from '@material-ui/core/Button';
import LaunchIcon from '@material-ui/icons/Launch';
import Link from 'next/link';
import Head from 'next/head';

const LogIn = () => {
    
    const [ loading, setLoading ] = useState(false);
    const [ processText, setProcessText ] = useState("Cargando...");

    const { Auth, GuardarAuth, usuarioAutenticado } = useContext(AuthContext);

    useEffect(() => {        
        usuarioAutenticado("login");
    // eslint-disable-next-line
    }, []);

    // State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    // extraer de usuario
    const { email, password } = usuario;

    // state de las alertas
    const [mostrarAlerta, guardarMostrarAlerta] = useState({
        mostrar: false,
        description : "Todos los campos son obligatorios"
    });

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if(email.trim() === '' || password.trim() === '') {
            
            guardarMostrarAlerta({
                ...mostrarAlerta,
                mostrar: true,
                description : "Todos los campos son obligatorios"
            });

            setTimeout(() => {
              guardarMostrarAlerta({
                ...mostrarAlerta,
                mostrar: false,
                });

            }, 5000);

            return;
        }

        // Validar que las contraseñas sean minino de 6 caracteres
        if(password.length < 6) {
            
            guardarMostrarAlerta({
                ...mostrarAlerta,
                description : "La contraseña debe ser mínimo de 6 caracteres",
                mostrar: true
            });

            setTimeout(() => {
              guardarMostrarAlerta({
                ...mostrarAlerta,
                mostrar: false,
                });

            }, 5000);
            
            return;
        }

        const datos = {
            email: usuario.email,
            password: usuario.password,
        }

        // registras nuevo usuario
        iniciarSecion(datos);
    }

    const iniciarSecion = async datos => {
        setLoading(true);

        try {
            const respuesta = await axiosBackendCliente.post('/api/auth', datos);
            localStorage.setItem('token', respuesta.data.token);
            
            GuardarAuth({
                toke: respuesta.data.token,
                autenticado: true
            })

            usuarioAutenticado();

            setProcessText("Has iniciado sección de manera exitosa");

            setTimeout(() => {
                Router.push('/menu');
            }, 1000);

        } catch (error) {
           
            setProcessText("Error, trata de nuevo");
            console.log(error)

            GuardarAuth({
                token: null,
                autenticado: null
            });

            localStorage.removeItem('token');
            localStorage.removeItem('nombre');
            localStorage.removeItem('email');

            guardarUsuario({
                email: '',
                password: ''
            });
            
            setTimeout(() => {
                setLoading(false); 
                setProcessText("Cargando...");
            }, 1000);
        }    
    }

    return (
        <ContainerForAuth>
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
        { loading ? (<Processing processText={processText} />) : 
            <div className="inicio">
                <div className="sub-inicio">
                    <div className="sub-cuerpo">
                        <br/><br/><br/>
                        <div className="form-usuario marginCuerpoTo">
                            <div className="contenedor-form">
                                <h2>Iniciar sección</h2>
                                <form
                                    onSubmit={onSubmit}
                                >
                                    <div className="campo-form">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Escribe tú email"
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="campo-form">
                                        <label htmlFor="email">Contraseña</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Escribe tú contraseña"
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="campo-form">
                                        <Button
                                            color="primary"
                                            type="submit"
                                            size="small"
                                            variant="contained"
                                            startIcon={<LaunchIcon/>}
                                        >
                                            Entrar
                                        </Button>
                                    </div>
                                </form>
                                {mostrarAlerta.mostrar ? <div className="mostrarAlerta">{mostrarAlerta.description}</div> : null}
                            </div>      
                        </div> 
                    </div>
                </div>
            </div>}
        </ContainerForAuth>
    );
}

export default LogIn;