import React from 'react';
import NavbarAuth from './NavbarAuth';
import Footer from './Footer';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../themeConfig';

const ContainerForAuth = (props) => (
    <ThemeProvider theme={theme}>
        <NavbarAuth/>
            {props.children}
        <Footer/>
    </ThemeProvider>
);

export default ContainerForAuth;