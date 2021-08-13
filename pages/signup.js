import  React, { useState, useContext, Fragment, useEffect } from 'react';
import { axiosBackendCliente } from '../config/axios';
import Processing from '../components/Processing';
import Router from 'next/router';
import ContainerForAuth from '../components/ContainerForAuth';
import Button from '@material-ui/core/Button';
import LaunchIcon from '@material-ui/icons/Launch';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';
import Head from 'next/head';

const SignUp = (props) => {
    
    const [ loading, setLoading ] = useState(false);
    const [ processText, setProcessText ] = useState("Cargando...");

    const { Auth, usuarioAutenticado, GuardarAuth } = useContext(AuthContext);

    useEffect(() => {        
        usuarioAutenticado("menu");

    // eslint-disable-next-line
    }, []);

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        repetir: ''
    });

    // extraer de usuario
    const { nombre, email, password, repetir } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    // state de las alertas
    const [mostrarAlerta, guardarMostrarAlerta] = useState({
        mostrar: false,
        description : "Todos los campos son obligatorios"
    });

    // Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || repetir.trim() === '') {
            
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
        if(password.length < 6 || repetir.length < 6 ) {
            
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

        // Validar que las contraseñas sean iguales
        if(!(password === repetir) ){
            
            guardarMostrarAlerta({
                ...mostrarAlerta,
                description : "La contraseña debe ser iguales en ambos campos",
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
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
        }

        // registras nuevo usuario
        registrarUsuario(datos);

    }

    const registrarUsuario = async datos => {

        setLoading(true);

        try {
            const respuesta = await axiosBackendCliente.post('/api/usuarios', datos);

            localStorage.setItem('token', respuesta.data.token);
            GuardarAuth({
                toke: respuesta.data.token,
                autenticado: true
            })

            setProcessText("Usuario Creado Exitosamente");

            usuarioAutenticado();

            setTimeout(() => {
                Router.push('/menu');
            }, 1000);

        } catch (error) {

            setProcessText("Error, trata de nuevo");
            console.log(error);

            setTimeout(() => {
                Router.push('/signup');
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
                                <h2>Crear cuenta</h2>
                                <form
                                    onSubmit={onSubmit}
                                >
                                    <div className="campo-form">
                                        <label htmlFor="email">Nombre</label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Escribe tú nombre"
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="campo-form">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Escribe tú Email"
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
                                        <label htmlFor="repetir">Repite la contraseña</label>
                                        <input
                                            type="password"
                                            id="repetir"
                                            name="repetir"
                                            placeholder="Escribe tú contraseña de nuevo"
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
                                            Crear
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

export default SignUp;