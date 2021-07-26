import  React, { useState, useContext, Fragment, useEffect } from 'react';
import { axiosBackendCliente } from '../config/axios';
import Processing from '../components/Processing';
import Router from 'next/router';
import ContainerForAuth from '../components/ContainerForAuth';
import Button from '@material-ui/core/Button';
import LaunchIcon from '@material-ui/icons/Launch';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';

const SignUp = (props) => {
    
    const [ loading, setLoading ] = useState(false);
    const [ processText, setProcessText ] = useState("Loading...");

    const { Auth, usuarioAutenticado, GuardarAuth } = useContext(AuthContext);

    useEffect(() => {        
        usuarioAutenticado("signup");

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

            setProcessText("Error, try again.");
            console.log(error);

            setTimeout(() => {
                Router.push('/signup');
            }, 1000);
        }
    }

    return (
        <ContainerForAuth>
        { loading ? (<Processing processText={processText} />) : 
            <div className="inicio">
                <div className="sub-inicio">
                    <div className="sub-cuerpo">
                        <br/><br/><br/>
                        <div className="form-usuario marginCuerpoTo">
                            <div className="contenedor-form">
                                <h2>Sing up</h2>
                                <form
                                    onSubmit={onSubmit}
                                >
                                    <div className="campo-form">
                                        <label htmlFor="email">Name</label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Enter your name"
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
                                            placeholder="Enter your email"
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="campo-form">
                                        <label htmlFor="email">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="campo-form">
                                        <label htmlFor="repetir">Repeat Password</label>
                                        <input
                                            type="password"
                                            id="repetir"
                                            name="repetir"
                                            placeholder="Enter your password again"
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
                                            Sign up
                                        </Button>
                                    </div>
                                </form>
                                {mostrarAlerta.mostrar ? <div className="mostrarAlerta">{mostrarAlerta.description}</div> : null}
                            </div>      
                        </div> 
                        <div>
                            <br/><br/>
                            <h2>Or log in to your account</h2>
                            <Link href="/login">
                                <Button
                                    size="small"
                                    variant="contained"
                                    startIcon={<LaunchIcon/>}
                                >
                                    Log in
                                </Button>
                            </Link>
                            <br/><br/>
                        </div>
                    </div>
                    
                </div>
            </div>}
        </ContainerForAuth>
    );
}

export default SignUp;