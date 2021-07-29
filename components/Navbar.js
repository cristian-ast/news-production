import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import HomeIcon from '@material-ui/icons/Home';
import SportsCricketIcon from '@material-ui/icons/SportsCricket';
import PolicyIcon from '@material-ui/icons/Policy';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PollIcon from '@material-ui/icons/Poll';

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PersonIcon from '@material-ui/icons/Person';

import NavDrawer from './Drawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {

  const classes = useStyles();


  return (
    <div id ="do">
        <div className="navbar--moviles">
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <NavDrawer />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} style={{flexGrow: 2 }}>
                        Somos SFM
                    </Typography>

                </Toolbar>
            </AppBar>
        </div>
      
      <div className="navbar--computadoras">
        <Link href="/">
          <div className="navbar--computadoras--nombre navbarAuth--nombre__botton">
            <p>Somos SFM</p>
          </div>
        </Link> 

        <div className="navbar--computadoras--division">
          <p>|</p> 
        </div>
        
        <Link href="/actualidad">
          <div className="navbar--computadoras--boton" >
            <ImportContactsIcon style={{ fontSize: 20 }} /> <p>Actualidad</p> 
          </div>
        </Link>
        
        <Link href="/deportes">
          <div className="navbar--computadoras--boton">
            <SportsCricketIcon style={{ fontSize: 20 }} /> <p>Deportes</p> 
          </div>
        </Link>
        
        <Link href="/justicia">
          <div className="navbar--computadoras--boton">
            <PolicyIcon style={{ fontSize: 20 }} /> <p>Justicia</p> 
          </div>
        </Link>
        
        <Link href="/entretenimiento">
          <div className="navbar--computadoras--boton">
            <MusicNoteIcon style={{ fontSize: 20 }} /> <p>Entretenimiento</p> 
          </div>
        </Link>
        
        <Link href="/economia">
          <div className="navbar--computadoras--boton">
            <PollIcon style={{ fontSize: 20 }} /> <p>Economia</p> 
          </div>
        </Link>
        
        <div className="navbar--computadoras--division">
          <p>|</p> 
        </div>
        
        <Link href="/politicasDePrivacidad">
          <div className="navbar--computadoras--boton">
            <VerifiedUserIcon style={{ fontSize: 20 }} /> <p>Política de Privacidad </p> 
          </div>
        </Link>

        <div className="navbar--computadoras--division">
          <p>|</p> 
        </div>

        <Link href="/login">
          <div className="navbar--computadoras--boton">
            <PersonIcon style={{ fontSize: 20 }} /> <p>Mi cuenta</p> 
          </div>
        </Link>
      
        </div>
    </div>
  )
}

export default Navbar;