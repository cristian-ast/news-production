import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import { AuthContext } from '../context/AuthContext';
import Router from 'next/router';
import Button from '@material-ui/core/Button';

const NavbarAuth = () => {

  const { Auth, GuardarAuth, usuarioAutenticado } = useContext(AuthContext);

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
        <div className="navbarAuth--nombre">
          <p>News</p>
        </div>

        <Link href="/">
          <div className="navbarAuth--boton">
              <HomeIcon style={{ fontSize: 20 }}/> <p>Home</p> 
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
                Log out
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default NavbarAuth;