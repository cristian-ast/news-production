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
                        News
                    </Typography>

                </Toolbar>
            </AppBar>
        </div>
      
      <div className="navbar--computadoras">
        <Link href="/">
          <div className="navbar--computadoras--nombre navbarAuth--nombre__botton">
            <p>News</p>
          </div>
        </Link> 

        <div className="navbar--computadoras--division">
          <p>|</p> 
        </div>
        
        <Link href="/recent">
          <div className="navbar--computadoras--boton" >
            <ImportContactsIcon style={{ fontSize: 20 }} /> <p>Recent</p> 
          </div>
        </Link>
        
        <Link href="/sports">
          <div className="navbar--computadoras--boton">
            <SportsCricketIcon style={{ fontSize: 20 }} /> <p>Sports</p> 
          </div>
        </Link>
        
        <Link href="/justice">
          <div className="navbar--computadoras--boton">
            <PolicyIcon style={{ fontSize: 20 }} /> <p>Justice</p> 
          </div>
        </Link>
        
        <Link href="/entertainment">
          <div className="navbar--computadoras--boton">
            <MusicNoteIcon style={{ fontSize: 20 }} /> <p>Entertainment</p> 
          </div>
        </Link>
        
        <Link href="/economy">
          <div className="navbar--computadoras--boton">
            <PollIcon style={{ fontSize: 20 }} /> <p>Economy</p> 
          </div>
        </Link>
        
        <div className="navbar--computadoras--division">
          <p>|</p> 
        </div>
        
        <Link href="/privacyPolicies">
          <div className="navbar--computadoras--boton">
            <VerifiedUserIcon style={{ fontSize: 20 }} /> <p> Privacy policies</p> 
          </div>
        </Link>

        <div className="navbar--computadoras--division">
          <p>|</p> 
        </div>

        <Link href="/login">
          <div className="navbar--computadoras--boton">
            <PersonIcon style={{ fontSize: 20 }} /> <p>My account</p> 
          </div>
        </Link>
      
        </div>
    </div>
  )
}

export default Navbar;