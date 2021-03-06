import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../themeConfig';

const Container = (props) => (
    <ThemeProvider theme={theme}>
        <Navbar/>
            {props.children}
        <Footer/>
    </ThemeProvider> 
);

export default Container;