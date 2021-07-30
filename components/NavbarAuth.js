import React, { useContext } from 'react';
import Link from 'next/link';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AuthContext } from '../context/AuthContext';
import Router from 'next/router';
import Button from '@material-ui/core/Button';

const NavbarAuth = () => {

  const { Auth, GuardarAuth } = useContext(AuthContext);

  const logOut = () => {
    
    GuardarAuth({
      token: null,
      autenticado: false
    });

    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');

    Router.push('/');
  }

  return (
    <div>
      <div className="navbarAuth">
        <Link href="/">
          <div className="navbarAuth--nombre navbarAuth--nombre__botton">
            <p>Somos SFM</p>
          </div>
        </Link>
        
        {Auth.autenticado ? (
          <div className="navbarAuth--boton" >
            <Button
                className="PanelBuscadorVerNoticia-img-botones z-index-b with-boton-menu"
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => logOut()}
                startIcon={<ExitToAppIcon />}
            >
                Cerrar sección
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default NavbarAuth;