import React from 'react';
import Link from 'next/link';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';

const NavbarAuth = (props) => {
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
        
        <Link href="/">
          <div className="navbarAuth--boton" >
            <ExitToAppIcon style={{ fontSize: 20 }} /> <p>Log out</p> 
          </div>
        </Link>
      
        </div>
    </div>
  )
}

export default NavbarAuth;