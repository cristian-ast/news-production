import  React, { useState, useContext, Fragment, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { axiosBackendCliente } from '../config/axios';
import Processing from '../components/Processing';
import Router from 'next/router';
import ContainerForAuth from '../components/ContainerForAuth';
import Button from '@material-ui/core/Button';
import LaunchIcon from '@material-ui/icons/Launch';
import Link from 'next/link';

const LogIn = () => {
    
    const [ loading, setLoading ] = useState(false);
    const [ processText, setProcessText ] = useState("Loading...");

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

            setProcessText("You have successfully logged in.");

            setTimeout(() => {
                Router.push('/menu');
            }, 1000);

        } catch (error) {
           
            setProcessText("Error, try again.");
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
                                <h2>Log in</h2>
                                <form
                                    onSubmit={onSubmit}
                                >
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
                                        <Button
                                            color="primary"
                                            type="submit"
                                            size="small"
                                            variant="contained"
                                            startIcon={<LaunchIcon/>}
                                        >
                                            Log in
                                        </Button>
                                    </div>
                                </form>
                                {mostrarAlerta.mostrar ? <div className="mostrarAlerta">{mostrarAlerta.description}</div> : null}
                            </div>      
                        </div> 
                        <div>
                            <br/><br/>
                            <h2>Or create an account</h2>
                            <Link href="/signup">
                                <Button
                                    size="small"
                                    variant="contained"
                                    startIcon={<LaunchIcon/>}
                                >
                                    Sign up
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

export default LogIn;